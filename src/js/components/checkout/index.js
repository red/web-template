import Vue from 'vue';
import { initialForm } from './initialForm';
import { spinner } from '../spinner';

let paddleWrapper = Vue.component('paddle-wrapper', {
	props: ['return', 'toLoading', 'toFailure', 'toSuccess', 'initialFormData'],
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
		let passthrough = JSON.stringify(data);

		let paddleConfig = {
			title: 'DiaGrammar',
			product: 616859,
			email: data.email,
			passthrough,
			coupon: '3F8063B8',
			successCallback: ({ checkout }) => {
				let interval;
				let cancel = false;
				let count = 0;

				const handleError = e => {
					// TODO
					console.error(e);
				};

				const handleSuccess = () => {
					console.log('handle success');
					clearInterval(interval);
					cancel = true;
					this.toSuccess();
				};

				const handleFailure = () => {
					console.log('handle failure');
					clearInterval(interval);
					cancel = true;
					this.toFailure();
				};

				const request = () => {
					if (count === 5) {
						handleFailure();
						return;
					} else {
						count++;
					}
					fetch('https://api.redlake-tech.com/license/pull', {
						method: 'POST',
						headers: {
							Connection: 'Keep-Alive',
							'Keep-Alive': 'max=5',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							checkout_id: checkout.id
						})
					})
						.then(r => {
							if (cancel) {
								clearInterval(interval);
								return;
							}
							return r.json();
						})
						.then(r => {
							if (!r) {
								return;
							}
							if (r.status) {
								handleSuccess();
							}
						})
						.catch(handleError);
				};

				request();
				interval = setInterval(request, 3000);

				console.log(checkout.id);
				this.toLoading();
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
		spinner,
		initialForm,
		paddleWrapper
	},
	template: `
		<div class="card max-w-md m-auto w-min-content min-w-sm min-h-sm">
			<div v-if="showing === views.initialForm">
				<initial-form :submit-form="toPaddleWrapper"></initial-form>
			</div>
			<div v-else-if="showing === views.paddleWrapper">
				<paddle-wrapper
					:return="toInitialForm"
					:to-loading="toLoadingView"
					:to-failure="toFailureView"
					:to-success="toSuccessView"
					:initial-form-data="initialFormData"
				></paddle-wrapper>
			</div>
			<div v-else-if="showing === views.loadingView">
				<spinner-component></spinner-component>
			</div>
			<div v-else-if="showing === views.successView">Success</div>
			<div v-else-if="showing === views.failureView">
				Unable to confirm that the checkout process was successful. Please check your emails for confirmation.
			</div>
		</div>
	`
});

export { checkout };
