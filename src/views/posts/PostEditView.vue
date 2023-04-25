<template>
	<div>
		<h1>게시글 수정</h1>
		<hr class="my-4" />
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
				<button class="btn btn-primary">수정</button>
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
const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setPost(data);
	} catch (error) {
		console.log(error);
		myAlert(error.message);
	}
};

const setPost = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
};
fetchPost();

// 수정하기
const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		vSuccess('수정이 완료되었습니다.');
		router.push({ name: 'PostDetail', params: { id } });
	} catch (error) {
		console.log(error);
		myAlert(error.message);
	}
};

const goDetailPage = () => router.push({ name: 'PostDetail', params: { id } });
</script>

<style></style>
