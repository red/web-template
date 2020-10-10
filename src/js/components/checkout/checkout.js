import Vue from 'vue';

let labeledInput = Vue.component('labeled-input', {
	props: ['name', 'change', 'value', 'label', 'error'],
	methods: {
		onInput(e) {
			this.change(e.target.value);
		}
	},
	template: `
		<div>
			<label
				class="text-grey-darker block text-base mt-4 mb-1"
				:for="name"
			>
				{{ label }}
			</label>
			<input 
				class="text-input"
				:value="value"
				:name="name"
				:id="name"
				@input="onInput"
			/>
			<span
				class="text-red text-sm"
				v-if="error"
			>
				{{ error }}
			</span>
		</div>
	`
});

let initialForm = Vue.component('initial-form', {
	props: ['submitForm'],
	data() {
		return {
			// fields
			firstname: '',
			lastname: '',
			address1: '',
			address2: '',
			email: '',
			// errors
			firstnameError: null,
			lastnameError: null,
			address1Error: null,
			address2Error: null,
			emailError: null
		};
	},
	methods: {
		submit(e) {
			e.preventDefault();
			e.stopPropagation();

			let errors;

			if (
				this.validateFirstname() ||
				this.validateLastname() ||
				this.validateAddress1() ||
				this.validateAddress2() ||
				this.validateEmail()
			) {
				errors = true;
			}

			if (!errors) {
				this.submitForm({
					firstname: this.firstname,
					lastname: this.lastname,
					address1: this.address1,
					address2: this.address2,
					email: this.email
				});
			} else {
				console.log('there are errors');
			}
		},
		updateFirstname(name) {
			this.firstname = name;
		},
		updateLastname(name) {
			this.lastname = name;
		},
		updateAddress1(address) {
			this.address1 = address;
		},
		updateAddress2(address) {
			this.address2 = address;
		},
		updateEmail(email) {
			this.email = email;
		},
		validateFirstname() {
			let err = null;
			if (!this.firstname) err = 'Cannot leave the first name blank';
			this.firstnameError = err;
			return err;
		},
		validateLastname() {
			let err = null;
			if (!this.lastname) err = 'Cannot leave the last name blank';
			this.lastnameError = err;
			return err;
		},
		validateAddress1() {
			let err = null;
			if (!this.address1) err = 'Cannot leave this address line blank';
			this.address1Error = err;
			return err;
		},
		validateAddress2() {
			let err = null;
			if (!this.address2) err = 'Cannot leave this address line blank';
			this.address2Error = err;
			return err;
		},
		validateEmail() {
			let err = null;
			if (!this.email) err = 'Cannot leave the email blank';
			this.emailError = err;
			return err;
		}
	},
	components: {
		labeledInput
	},
	template: `
		<div class="card max-w-md m-auto">
			<form @submit="submit">
				<legend class="avenir-black font-bold text-grey-darker text-2xl no-underline">
					Billing Information for your DiaGrammar Purchase
				</legend>
				<labeled-input 
					name="firstname"
					label="First name"
					:change="updateFirstname"
					:value="firstname"
					:error="firstnameError"
				/>
				<labeled-input 
					name="lastname"
					label="Last name"
					:change="updateLastname"
					:value="lastname"
					:error="lastnameError"
				/>
				<labeled-input 
					name="address1"
					label="Address line 1"
					:change="updateAddress1"
					:value="address1"
					:error="address1Error"
				/>
				<labeled-input 
					name="address2"
					label="Address line 2"
					:change="updateAddress2"
					:value="address2"
					:error="address2Error"
				/>
				<labeled-input 
					name="email"
					label="Email"
					:change="updateEmail"
					:value="email"
					:error="emailError"
				/>
				<button
					class="btn-outline btn-outline-red bg-transparent cursor-pointer mt-8"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	`
});

let checkout = Vue.component('checkout-component', {
	data() {
		return {
			showInitialForm: true
		};
	},
	methods: {
		handleSubmission(data) {
			console.log(data);
		}
	},
	components: {
		initialForm
	},
	template: `
		<div v-if="showInitialForm">
			<initial-form :submit-form="handleSubmission"></initial-form>
		</div>
		<span v-else>TODO</span>
	`
});

export { checkout };
