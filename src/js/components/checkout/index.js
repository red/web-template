import Vue from 'vue';
import { initialForm } from './initialForm';

let paddleWrapper = Vue.component('paddle-wrapper', {
	props: ['return', 'advance', 'initialFormData'],
	data() {
		return {};
	},
	methods: {
		returnToPrevious() {
			this.return({});
		},
		toLoadingView() {
			this.advance();
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
			successCallback: () => {
				this.advance();
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
		<div class="content">
			<div class="inline-checkout"></div>
			<a
				class="ml-4"
				@click="returnToPrevious"
			>
				Restart checkout
			</a>
		</div>
	`
});

let checkout = Vue.component('checkout-component', {
	data() {
		return {
			views: {
				initialForm: 0,
				paddleWrapper: 1,
				loadingView: 2,
				successView: 3,
				failureView: 4
			},
			showing: 0, // initialForm
			initialFormData: {}
		};
	},
	methods: {
		toInitialForm() {
			this.initialFormData = {};
			this.showing = this.views.initialForm;
		},
		toPaddleWrapper(data) {
			this.initialFormData = data;
			this.showing = this.views.paddleWrapper;
		},
		toLoadingView() {
			this.initialFormData = {};
			this.showing = this.views.loadingView;
		},
		toSuccessView() {
			this.showing = this.views.successView;
		},
		toFailureView() {
			this.showing = this.views.failureView;
		}
	},
	components: {
		initialForm,
		paddleWrapper
	},
	template: `
		<div class="card max-w-md m-auto w-min-content min-w-sm">
			<div v-if="showing === views.initialForm">
				<initial-form :submit-form="toPaddleWrapper"></initial-form>
			</div>
			<div v-else-if="showing === views.paddleWrapper">
				<paddle-wrapper
					:return="toInitialForm"
					:advance="toLoadingView"
					:initial-form-data="initialFormData"
				></paddle-wrapper>
			</div>
			<div v-else-if="showing === views.loadingView">Loading</div>
			<div v-else-if="showing === views.successView">Success</div>
			<div v-else-if="showing === views.failureView">Failure</div>
		</div>
	`
});

export { checkout };
