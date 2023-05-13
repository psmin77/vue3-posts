<template>
	<AppLoading v-if="loading"></AppLoading>

	<AppError v-if="error" :message="error.message"></AppError>

	<div v-else>
		<h1>게시글 수정</h1>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message"></AppError>

		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
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
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert.js';
const { myAlert, vSuccess } = useAlert();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({
	title: null,
	content: null,
});

// 상세내용 불러오기
const error = ref(null);
const loading = ref(false);
const fetchPost = async () => {
	try {
		loading.value = true;
		const { data } = await getPostById(id);
		setPost(data);
	} catch (err) {
		error.value = err;
	} finally {
		loading.value = false;
	}
};

const setPost = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
};
fetchPost();

// 수정하기
const editError = ref(null);
const editLoading = ref(false);
const edit = async () => {
	try {
		editLoading.value = true;
		await updatePost(id, { ...form.value });
		vSuccess('수정이 완료되었습니다.');
		router.push({ name: 'PostDetail', params: { id } });
	} catch (err) {
		editError.value = err;
		myAlert(err.message);
	} finally {
		editLoading.value = false;
	}
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style></style>
