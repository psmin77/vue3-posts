<template>
	<div>
		<h1>게시글 목록</h1>
		<hr class="my-4" />
		<div class="row g-3">
			<div class="col-4" v-for="(p, index) in posts" :key="index">
				<PostItem
					:title="p.title"
					:content="p.content"
					:created-at="p.createAt"
					@click="goPage(p.id)"
				></PostItem>
			</div>
		</div>
		<hr class="my-4" />
		<AppCard>
			<PostDetailView :id="1"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const posts = ref([]);

const fetchPosts = () => {
	posts.value = getPosts();
};
fetchPosts();

const router = useRouter();
const propsId = ref({});
const goPage = id => {
	propsId.value = id;
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
</script>

<style></style>
