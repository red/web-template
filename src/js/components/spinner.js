import Vue from 'vue';

import '../../styles/spinner.css';

let spinner = Vue.component('spinner-component', {
	data() {
		return {};
	},
	template: `
		<div class="spinner"></div>
	`
});

export { spinner };
