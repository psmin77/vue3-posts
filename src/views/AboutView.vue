<template>
	<div>
		<h1>About View</h1>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="$router.push('/')">
			HOME으로 이동
		</button>
		<h3>Store</h3>
		<p>counter: {{ counter }}</p>
		<p>doubleCount: {{ doubleCount }}</p>
		<p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
		<button @click="increment()">Click!</button>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log('route.path: ', route.path);

const store = useCounterStore();
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
const { increment } = store;
counter.value = 100;
</script>

<style></style>
