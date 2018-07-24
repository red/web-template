module.exports = {
	// https://github.com/stylelint/stylelint/issues/1973#issuecomment-264695959
	extends: require.resolve('stylelint-config-standard'),
	rules: {
		'at-rule-empty-line-before': null,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['extends', 'tailwind', 'variants', 'responsive', 'screen']
			}
		],
		indentation: 'tab',
		'length-zero-no-unit': null,
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': null
	},
	ignoreFiles: 'public/**/*.css'
};
