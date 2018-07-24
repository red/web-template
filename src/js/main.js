import Vue from 'vue';

// import site components
import * as comps from '../../../../src/js/components';

Vue.component('accordion-toggle', {
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

new Vue({
	el: '#app',
	data: {
		isMainMenuOpen: false
	},
	components: Object.assign({}, comps.default)
});
