import Vue from 'vue';

let accordion = Vue.component('accordion-toggle', {
	// &#x25B2; // up
	// &#x25BC; // down
	template: `
		<div :class="{ 'is-open': toggle }" @click="toggle = !toggle">
			<slot></slot>
		</div>
	`,
	data() {
		return { toggle: false };
	}
});

export { accordion };
