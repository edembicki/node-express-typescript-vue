/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-prettier',
	],
	env: {
		'vue/setup-compiler-macros': true,
	},
	rules: {
		'vue/multi-word-component-names': 'off',
		'prettier/prettier': ['warn', { singleQuote: true, useTabs: true }],
		'no-unused-vars': 'off',
	},
	ignorePatterns: ['*.config.js'],
};
