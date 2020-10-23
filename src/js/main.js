import Vue from 'vue';

// import site components
// import * as comps from '../../../../src/js/components';
import { accordion } from './components/accordion';
import { checkout } from './components/checkout';

new Vue({
	el: '#app',
	data: {
		isMainMenuOpen: false
	},
	components: {
		accordion,
		checkout
	}
});
