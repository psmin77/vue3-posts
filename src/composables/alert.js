import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export const useAlert = () => {
	const { alerts } = storeToRefs(useAlertStore());
	const { myAlert, vSuccess } = useAlertStore();
	return {
		alerts,
		myAlert,
		vSuccess,
	};
};
