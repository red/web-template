import Vue from 'vue';

const success = Vue.component('success-component', {
	props: ['formData', 'license'],
	template: `
		<div>
			<div class="avenir-black font-bold text-grey-darker text-2xl no-underline">
				Congratulations, {{ formData.firstName }}!
			</div>
			<div class="mt-4">
				Your DiaGrammar license is
				<div class="my-3">
					<strong>
						{{ license }}
					</strong>
				</div>
				You should receive a confirmation email shortly.
			</div>
		</div>
	`
});

export { success };
