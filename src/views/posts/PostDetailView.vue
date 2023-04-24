<template>
	<div>
		<h1>{{ post.title }}</h1>
		<p>{{ post.content }}</p>
		<hr class="my-4" />
		<p class="text-muted">
			{{ $dayjs(post.createAt).format('YYYY-MM-DD HH:mm:ss') }}
		</p>

		<hr class="my-4" />
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
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getPostById, deletePost } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
	id: [String, Number],
});
const router = useRouter();
const post = ref({});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(props.id);
		setPost(data);
	} catch (error) {
		console.log(error);
	}
};

const setPost = ({ title, content, createAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createAt = createAt;
};
fetchPost();

const remove = async () => {
	try {
		if (confirm('삭제하시겠습니까?')) {
			await deletePost(props.id);
			router.push({ name: 'PostList' });
		} else return;
	} catch (error) {
		console.log(error);
	}
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style></style>
