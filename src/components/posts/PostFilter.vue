<template>
	<form @submit.prevent>
		<div class="row g-3">
			<div class="col">
				<input
					:value="title"
					@input="changeTitle"
					type="text"
					class="form-control"
				/>
			</div>
			<div class="col">
				<select
					class="form-select"
					:value="limit"
					@input="$emit('update:limit', $event.target.value)"
				>
					<option value="6">6개씩 보기</option>
					<option value="12">12개씩 보기</option>
					<option value="18">18개씩 보기</option>
				</select>
			</div>
		</div>
	</form>
</template>

<script setup>
defineProps({
	title: String,
	limit: [Number, String],
});
const emit = defineEmits(['update:title', 'update:limit']);

const changeTitle = e => {
	setTimeout(() => {
		emit('update:title', e.target.value);
	}, 500);
};
</script>

<style></style>
