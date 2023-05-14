<template>
	<AppCard>
		<h5 class="card-title">{{ title }}</h5>
		<p class="card-text">{{ content }}</p>
		<p class="text-muted">{{ createDate }}</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<button class="btn p-0" @click.stop="$emit('modal')">
					<i class="bi bi-arrows-angle-expand"></i>
				</button>
			</div>
		</template>
	</AppCard>
</template>

<script setup>
import { computed, inject } from 'vue';
import AppCard from '../app/AppCard.vue';

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	createdAt: {
		type: [String, Date, Number],
	},
});
defineEmits(['modal']);
const dayjs = inject('dayjs');
const createDate = computed(() =>
	dayjs(props.createdAt).format('YYYY-MM-DD HH:mm:ss'),
);
</script>

<style></style>
