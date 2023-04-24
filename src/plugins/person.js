export default {
	install(app, options) {
		const person = {
			name: 'Vue3',
			say() {
				alert('person name: ' + this.name);
			},
			...options,
		};
		app.config.globalProperties.$person = person;
		app.provide('person', person);
	},
};
