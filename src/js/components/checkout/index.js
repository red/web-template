import Vue from 'vue';
import { initialForm } from './initialForm';
import { spinner } from '../spinner';
import { success } from './success';
import { failure } from './failure';

let paddleWrapper = Vue.component('paddle-wrapper', {
	props: ['return', 'toLoading', 'toFailure', 'toSuccess', 'formData'],
	data() {
		return {
			loading: true
		};
	},
	methods: {
		returnToPrevious() {
			this.return({});
		}
	},
	mounted() {
		let data = this.formData;
		let passthrough = JSON.stringify(data);

		let paddleConfig = {
			title: 'DiaGrammar',
			product: 616859,
			email: data.email,
			passthrough,
			allowQuantity: false,
			loadCallback: () => {
				this.loading = false;
			},
			successCallback: ({ checkout }) => {
				let interval;
				let cancel = false;
				let count = 0;

				const handleSuccess = ls => {
					clearInterval(interval);
					cancel = true;
					let licenses = [];
					let count = 0;
					for (const l of ls) {
						count += 1;
						licenses.push({
							n: ('  ' + count).slice(-3),
							l: l
						});
					}
					this.toSuccess(licenses);
				};

				const handleFailure = () => {
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
								handleSuccess(r.data);
							}
						})
						.catch(handleFailure);
				};

				request();
				interval = setInterval(request, 3000);

				this.toLoading();

				return true;
			}
		};

		// if (window.innerWidth > 550) {
		// 	// If desktop, show inline, else use overlay. Paddle inline checkout is not
		// 	// responsive.
		// 	Object.assign(paddleConfig, {
		// 		method: 'inline',
		// 		frameTarget: 'inline-checkout',
		// 		frameInitialHeight: 500,
		// 		frameStyle: 'width:495px; min-width:495px; background-color: transparent; border: none;'
		// 	});
		// }

		window.Paddle.Checkout.open(paddleConfig);
	},
	components: { spinner },
	template: `
		<div class="content flex flex-col justify-between flex-1">
			<div class="relative">
				<div v-bind:class="[loading ? 'invisible' : '', 'inline-checkout']"></div>
				<div v-bind:class="[loading ? '' : 'invisible h-0 w-0', 'absolute pin place-content-center']">
					<spinner-component></spinner-component>
				</div>
			</div>
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
			formData: {},
			licenses: ''
		};
	},
	methods: {
		toInitialForm() {
			this.formData = {};
			this.showing = this.views.initialForm;
		},
		toPaddleWrapper(data) {
			this.formData = data;
			this.showing = this.views.paddleWrapper;
		},
		toLoadingView() {
			this.showing = this.views.loadingView;
		},
		toSuccessView(licenses) {
			this.licenses = licenses;
			this.showing = this.views.successView;
		},
		toFailureView() {
			this.showing = this.views.failureView;
		}
	},
	components: {
		spinner,
		initialForm,
		paddleWrapper,
		success,
		failure
	},
	template: `
		<div class="card max-w-md m-auto w-min-content min-w-sm min-h-sm flex flex-col justify-between">
			<div v-if="showing === views.initialForm">
				<initial-form :submit-form="toPaddleWrapper"></initial-form>
			</div>
			<div
				v-else-if="showing === views.paddleWrapper"
				class="flex-1 flex flex-col justify-between"
			>
				<paddle-wrapper
					:return="toInitialForm"
					:to-loading="toLoadingView"
					:to-failure="toFailureView"
					:to-success="toSuccessView"
					:form-data="formData"
				></paddle-wrapper>
			</div>
			<div
				v-else-if="showing === views.loadingView"
				class="absolute pin place-content-center"
			>
				<spinner-component></spinner-component>
			</div>
			<div v-else-if="showing === views.successView">
				<success-component :form-data="formData" :licenses="licenses">
				</success-component>
			</div>
			<div v-else-if="showing === views.failureView">
				<failure-component></failure-component>
			</div>
		</div>
	`
});

export { checkout };
