<template>
	<nav class="mt-5" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item">
				<a
					class="page-link"
					:class="isPrevPage"
					href="#"
					aria-label="Previous"
					@click="$emit('page', currentPage - 1)"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="page-item"
				:class="{ active: currentPage === page }"
			>
				<a
					class="page-link"
					href="#"
					:value="page"
					@click="$emit('page', page)"
					>{{ page }}</a
				>
			</li>
			<li class="page-item">
				<a
					class="page-link"
					:class="isNextPage"
					href="#"
					aria-label="Next"
					@click="$emit('page', currentPage + 1)"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	pageCount: Number,
	currentPage: Number,
});
defineEmits(['page']);

const isPrevPage = computed(() => ({ disabled: props.currentPage < 2 }));
const isNextPage = computed(() => ({
	disabled: props.currentPage >= props.pageCount,
}));
</script>

<style></style>
