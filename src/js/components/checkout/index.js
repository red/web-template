import Vue from 'vue';
import { initialForm } from './initialForm';

let paddleWrapper = Vue.component('paddle-wrapper', {
	props: ['return', 'initialFormData'],
	data() {
		return {};
	},
	methods: {
		returnToPrevious() {
			this.return({});
		}
	},
	mounted() {
		let data = this.initialFormData;
		let passthrough = `["${data.firstName}" "${data.lastName}" "${data.address1}" "${
			data.address2
		}"]`;

		let paddleConfig = {
			title: 'DiaGrammar',
			product: 616859,
			email: data.email,
			passthrough,
			coupon: '3F8063B8',
			successCallback: (...args) => {
				console.log('args?', ...args);
			}
		};

		if (window.innerWidth > 550) {
			// If desktop, show inline, else use overlay. Paddle inline checkout is not
			// responsive.
			Object.assign(paddleConfig, {
				method: 'inline',
				frameTarget: 'inline-checkout',
				frameInitialHeight: 500,
				frameStyle: 'width:495px; min-width:495px; background-color: transparent; border: none;'
			});
		}

		window.Paddle.Checkout.open(paddleConfig);
	},
	template: `
		<div>
			<button @click="returnToPrevious">Return to previous form</button>
			<div class="inline-checkout max-w-md m-auto"></div>
		</div>
	`
});

let checkout = Vue.component('checkout-component', {
	data() {
		return {
			showInitialForm: true,
			initialFormData: {}
		};
	},
	methods: {
		switchForms(data) {
			console.log(data);
			this.initialFormData = data;
			this.showInitialForm = !this.showInitialForm;
		}
	},
	components: {
		initialForm,
		paddleWrapper
	},
	template: `
		<div v-if="showInitialForm">
			<initial-form :submit-form="switchForms"></initial-form>
		</div>
		<div v-else>
			<paddle-wrapper
				:return="switchForms"
				:initial-form-data="initialFormData"
			></paddle-wrapper>
		</div>
	`
});

export { checkout };
