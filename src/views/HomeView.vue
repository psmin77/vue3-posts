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

		<hr class="my-4" />
		<h2>{{ person.name }}</h2>
		<div class="btn btn-primary" @click="person.say">click person</div>
	</div>
</template>

<script>
export default {
	created() {
		console.log(this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goAboutPage = () => {
	router.push('/about');
};

const list = ref(['사과', '바나나', '포도', '딸기']);
const person = inject('person');
</script>

<style></style>
