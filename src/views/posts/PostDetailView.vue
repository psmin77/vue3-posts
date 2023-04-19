<template>
	<div>
		<h1>{{ detail.title }}</h1>
		<p>{{ detail.content }}</p>
		<hr class="my-4" />
		<p class="text-muted">{{ detail.createAt }}</p>

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
				<button class="btn btn-outline-danger">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { getPostById } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
	id: String,
});

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;

const detail = ref({});
const initDetail = () => {
	const data = getPostById(props.id);
	detail.value = { ...data };
};
initDetail();

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
	router.push({ name: 'PostEdit', params: { id: props.id } });
</script>

<style></style>
