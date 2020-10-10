import Vue from 'vue';

let labeledInput = Vue.component('labeled-input', {
	props: ['name', 'change', 'value', 'label'],
	methods: {
		onInput(e) {
			this.change(e.target.value);
		}
	},
	template: `
		<div>
			<label
				class="text-grey-darker block text-base mt-4 mb-1"
				v-bind:for="name"
			>
				{{ label }}
			</label>
			<input 
				class="text-input"
				v-bind:value="value"
				v-bind:name="name"
				v-bind:id="name"
				@input="onInput"
			/>
		</div>
	`
});

let checkout = Vue.component('checkout-component', {
	data() {
		return {
			firstname: '',
			lastname: '',
			address1: '',
			address2: '',
			email: ''
		};
	},
	methods: {
		submitData(e) {
			console.log(this.firstname, this.lastname, this.address1, this.address2, this.email);
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
		}
	},
	components: {
		labeledInput
	},
	template: `
		<div class="card max-w-md m-auto">
			<form>
				<legend class="avenir-black font-bold text-grey-darker text-2xl no-underline">
					Billing Information for your DiaGrammar Purchase
				</legend>
				<labeled-input 
					name="firstname"
					v-bind:change="updateFirstname"
					v-bind:value="firstname"
					label="First name"
				/>
				<labeled-input 
					name="lastname"
					v-bind:change="updateLastname"
					v-bind:value="lastname"
					label="Last name"
				/>
				<labeled-input 
					name="address1"
					v-bind:change="updateAddress1"
					v-bind:value="address1"
					label="Address line 1"
				/>
				<labeled-input 
					name="address2"
					v-bind:change="updateAddress2"
					v-bind:value="address2"
					label="Address line 2"
				/>
				<labeled-input 
					name="email"
					v-bind:change="updateEmail"
					v-bind:value="email"
					label="Email"
				/>
				<button @click="submitData" class="btn-outline btn-outline-red bg-transparent cursor-pointer mt-8" type="button">
					Submit
				</button>
			</form>
		</div>
	`
});

export { checkout };
