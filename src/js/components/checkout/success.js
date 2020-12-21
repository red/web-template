import Vue from 'vue';

const success = Vue.component('success-component', {
	props: ['formData', 'licenses'],
	template: `
		<div>
			<div class="avenir-black font-bold text-grey-darker text-2xl no-underline">
				Congratulations, {{ formData.firstName }}!
			</div>
			<div class="mt-4">
				Your DiaGrammar <span v-if="licenses.length == 1">license is</span><span v-else>licenses are</span>:
				<div class="my-3">
					<div v-for="license in licenses">
						<code v-if="licenses.length > 1">{{ license.n }}.  </code><strong><code style="background-color:#ddd;">{{ license.l }}</code></strong></br>
					</div>
				</div>
				You should receive a confirmation email shortly.
			</div>
		</div>
	`
});

export { success };
