<template>
	<div>
		<h1>게시글 목록</h1>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>

		<hr class="my-4" />
		<AppGrid :items="posts" v-slot="{ item }" colClass="col-4">
			<PostItem
				:title="item.title"
				:content="item.content"
				:created-at="item.createAt"
				@click="goPage(item.id)"
			></PostItem>
		</AppGrid>

		<AppPagination
			:pageCount="pageCount"
			:currentPage="params._page"
			@page="page => (params._page = page)"
		></AppPagination>

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
import AppGrid from '@/components/AppGrid.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagination from '@/components/AppPagination.vue';
import { getPosts } from '@/api/posts';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);
const params = ref({
	_sort: 'createAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});
const totalCount = ref(0); // pagination
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// 리스트 불러오기
const fetchPosts = async () => {
	try {
		const { data, headers } = await getPosts(params.value);
		posts.value = data;
		totalCount.value = headers['x-total-count'];
	} catch (error) {
		console.log(error);
	}
};
watchEffect(fetchPosts);

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
