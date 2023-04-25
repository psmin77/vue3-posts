import { ref } from 'vue';
const alerts = ref([]);

export function useAlert() {
	// alert
	const myAlert = (message, type = 'error') => {
		alerts.value.push({ message, type });
		setTimeout(() => {
			alerts.value.shift();
		}, 2000);
	};
	const vSuccess = message => myAlert(message, 'success');
	return { alerts, myAlert, vSuccess };
}
