<template>
	<div>
		<h1 @click="visibleForm = !visibleForm">게시글 등록</h1>
		<hr class="my-4" />
		<AppError v-if="error" :message="error.message"></AppError>

		<PostForm
			v-if="visibleForm"
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-dark me-2"
					@click="goListPage"
				>
					목록
				</button>
				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						Loading...
					</template>
					<template v-else>저장</template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert.js';
import { useAxios } from '@/hooks/useAxios';
const { myAlert, vSuccess } = useAlert();
const router = useRouter();
const form = ref({
	title: null,
	content: null,
});
const { error, loading, execute } = useAxios(
	'/posts',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostList' });
			vSuccess('등록이 완료되었습니다.');
		},
		onError: err => {
			myAlert(err.message);
		},
	},
);
const save = async () => {
	execute({ ...form.value, createAt: Date.now() });
};

const goListPage = () => router.push({ name: 'PostList' });
const visibleForm = ref(true);
</script>

<style></style>
