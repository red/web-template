import Vue from 'vue';

const failure = Vue.component('failure-component', {
	template: `
		<div>
			<div class="avenir-black font-bold text-grey-darker text-2xl no-underline">
				Something went wrong
			</div>
			<div class="mt-4">
				Unable to confirm that the checkout process was successful. Please check your emails for confirmation of your DiaGrammar purchase. If no confirmation email arrives in the next few minutes, or for any other inquiries, please <a href="/contact/">Contact Us</a>!
			</div>
		</div>
	`
});

export { failure };
