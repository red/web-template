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
			firstName: '',
			lastName: '',
			address1: '',
			address2: '',
			email: '',
			// errors
			firstNameError: null,
			lastNameError: null,
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

			if (this.validateFirstName()) {
				errors = true;
			}
			if (this.validateLastName()) {
				errors = true;
			}
			if (this.validateAddress1()) {
				errors = true;
			}
			if (this.validateAddress2()) {
				errors = true;
			}
			if (this.validateEmail()) {
				errors = true;
			}

			if (!errors) {
				this.submitForm({
					firstName: this.firstName,
					lastName: this.lastName,
					address1: this.address1,
					address2: this.address2,
					email: this.email
				});
			}
		},
		updateFirstName(name) {
			this.firstName = name;
		},
		updateLastName(name) {
			this.lastName = name;
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
		validateFirstName() {
			let err = null;
			if (!this.firstName) {
				err = 'Cannot leave the first name blank';
			}
			this.firstNameError = err;
			return err;
		},
		validateLastName() {
			let err = null;
			if (!this.lastName) {
				err = 'Cannot leave the last name blank';
			}
			this.lastNameError = err;
			return err;
		},
		validateAddress1() {
			let err = null;
			if (!this.address1) {
				err = 'Cannot leave this address line blank';
			}
			this.address1Error = err;
			return err;
		},
		validateAddress2() {
			let err = null;
			if (!this.address2) {
				err = 'Cannot leave this address line blank';
			}
			this.address2Error = err;
			return err;
		},
		validateEmail() {
			let err = null;
			if (!this.email) {
				err = 'Cannot leave the email blank';
			}
			if (!err && !this.isValidEmailRegex(this.email)) {
				err = 'Must use a valid email';
			}
			this.emailError = err;
			return err;
		},
		isValidEmailRegex(email) {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		}
	},
	components: {
		labeledInput
	},
	template: `
		<div>
			<form @submit="submit">
				<legend class="avenir-black font-bold text-grey-darker text-2xl no-underline">
					Billing Information for your DiaGrammar Purchase
				</legend>
				<labeled-input 
					name="firstName"
					label="First name"
					:change="updateFirstName"
					:value="firstName"
					:error="firstNameError"
				/>
				<labeled-input 
					name="lastName"
					label="Last name"
					:change="updateLastName"
					:value="lastName"
					:error="lastNameError"
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

export { initialForm };
