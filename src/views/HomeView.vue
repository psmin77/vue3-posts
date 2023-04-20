<template>
	<div>
		<h1>Home View</h1>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">ABOUT으로 이동</button>

		<hr class="my-4" />

		<AppGrid :items="list" v-slot="{ item }" colClass="col-3">
			<AppCard>{{ item }}</AppCard>
		</AppGrid>
	</div>
</template>

<script setup>
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
	router.push('/about');
};

const list = ref(['사과', '바나나', '포도', '딸기']);
</script>

<style></style>
