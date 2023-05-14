<template>
	<AppLoading v-if="loading"></AppLoading>

	<AppError v-if="error" :message="error.message"></AppError>

	<div v-else>
		<h1>게시글 수정</h1>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message"></AppError>

		<PostForm
			v-model:title="post.title"
			v-model:content="post.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-dark"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						Loading...
					</template>
					<template v-else>수정</template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert.js';
import { useAxios } from '@/hooks/useAxios';

const { myAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data: post, error, loading } = useAxios(`/posts/${id}`);

const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{
		method: 'patch',
	},
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('수정이 완료되었습니다.');
			router.push({ name: 'PostDetail', params: { id } });
		},
		onError: err => {
			myAlert(err.message);
		},
	},
);
const edit = async () => {
	execute({
		...post.value,
	});
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style></style>
