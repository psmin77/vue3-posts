<template>
	<AppLoading v-if="loading"></AppLoading>

	<AppError v-else-if="error" :message="error.message"></AppError>

	<div v-else>
		<h1>{{ post.title }}</h1>
		<p>{{ post.content }}</p>
		<hr class="my-4" />
		<p class="text-muted">
			{{ $dayjs(post.createAt).format('YYYY-MM-DD HH:mm:ss') }}
		</p>

		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message"></AppError>

		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						Loading...
					</template>
					<template v-else>삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { deletePost } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';

const props = defineProps({
	id: [String, Number],
});
const router = useRouter();

const { data: post, error, loading } = useAxios(`/posts/${props.id}`);
const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostList' });
		},
		onError: err => {
			removeError.value = err;
		},
	},
);

const remove = async () => {
	if (confirm('삭제하시겠습니까?')) {
		execute();
	} else return;
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style></style>
