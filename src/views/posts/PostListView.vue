<template>
	<div>
		<h1>게시글 목록</h1>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>

		<hr class="my-4" />
		<AppLoading v-if="loading"></AppLoading>

		<AppError v-else-if="error" :message="error.message"></AppError>

		<template v-else>
			<AppGrid :items="posts" v-slot="{ item }" colClass="col-4">
				<PostItem
					:title="item.title"
					:content="item.content"
					:created-at="item.createAt"
					@click="goPage(item.id)"
					@modal="openModal(item)"
				></PostItem>
			</AppGrid>

			<AppPagination
				:pageCount="pageCount"
				:currentPage="params._page"
				@page="page => (params._page = page)"
			></AppPagination>
		</template>

		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:create-at="modalCreateAt"
			/>
		</Teleport>

		<template v-if="posts && posts.length > 0">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="posts[0].id"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostDetailView from './PostDetailView.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppLoading from '@/components/app/AppLoading.vue';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const params = ref({
	_sort: 'createAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });

// pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreateAt = ref('');
const openModal = item => {
	show.value = true;
	modalTitle.value = item.title;
	modalContent.value = item.content;
	modalCreateAt.value = item.createAt;
};

// 상세페이지 이동
const goPage = id => {
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
</script>

<style></style>
