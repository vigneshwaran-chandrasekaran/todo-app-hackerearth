const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
	parser: '@babel/eslint-parser',
	extends: [
		'airbnb',
		'prettier',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
	env: {
		jest: true,
		browser: true,
		node: true,
		es6: true,
	},
	parserOptions: {
		ecmaVersion: 8,
		requireConfigFile: false,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		babelOptions: {
			presets: ['@babel/preset-react'],
		},
	},
	rules: {
		'prettier/prettier': ['error', prettierOptions],
		'arrow-body-style': [2, 'as-needed'],
		'class-methods-use-this': 0,
		'import/imports-first': 0,
		'import/newline-after-import': 0,
		'import/no-dynamic-require': 0,
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'react/jsx-props-no-spreading': 'off',
		'import/no-named-as-default': 0,
		'import/no-webpack-loader-syntax': 0,
		'import/prefer-default-export': 0,
		// allow paren-less arrow functions
		'arrow-parens': process.env.NODE_ENV === 'production' ? 2 : 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'jsx-a11y/aria-props': 2,
		'jsx-a11y/heading-has-content': 0,
		'jsx-a11y/label-has-associated-control': [
			2,
			{
				// NOTE: If this error triggers, either disable it or add
				// your custom components, labels and attributes via these options
				// See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
				controlComponents: ['Input'],
			},
		],
		'jsx-a11y/label-has-for': 0,
		'jsx-a11y/mouse-events-have-key-events': 2,
		'jsx-a11y/role-has-required-aria-props': 2,
		'jsx-a11y/role-supports-aria-props': 2,
		'max-len': 0,
		'import/order': [
			'error',
			{
				'newlines-between': 'never',
				groups: [
					['builtin', 'external'],
					['internal', 'parent', 'sibling', 'index', 'unknown'],
				],
			},
		],
		'newline-per-chained-call': 0,
		'no-confusing-arrow': 0,
		'no-console': 0,
		'no-unused-vars': 2,
		'no-multiple-empty-lines': 2,
		'no-use-before-define': 0,
		'prefer-template': 2,
		'react/destructuring-assignment': 2,
		'react-hooks/rules-of-hooks': 'error',
		'react/jsx-closing-tag-location': 2,
		'react/forbid-prop-types': 0,
		'react/jsx-first-prop-new-line': [2, 'multiline'],
		'react/jsx-no-target-blank': 0,
		'react/jsx-uses-vars': 2,
		'react/require-default-props': 0,
		'react/require-extension': 0,
		'react/self-closing-comp': 0,
		'react/sort-comp': 0,
		'require-yield': 0,
		'import/no-unresolved': [2, { caseSensitive: false }],
		// suppress errors for missing 'import React' in files
		'react/react-in-jsx-scope': 'off',
		// allow jsx syntax in js files (for next.js project)
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // should add ".ts" if typescript project
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'function-declaration',
			},
		],
		'no-param-reassign': 0,
		'react/jsx-no-bind': [
			2,
			{
				ignoreDOMComponents: true,
				ignoreRefs: true,
				allowArrowFunctions: true,
				allowFunctions: true,
				allowBind: true,
			},
		],
		'no-underscore-dangle': 0,
		// camelcase off only for this project, from backend they have used many underscore variable
		camelcase: 0,
		'import/no-cycle': 0,
		'no-constructor-return': 0,
		'react/button-has-type': 2,
		'react/no-adjacent-inline-elements': 2,
		'react/no-array-index-key': 2,
		'react/no-arrow-function-lifecycle': 2,
		'react/no-invalid-html-attribute': 2,
		'react/no-multi-comp': 2,
		'react/no-typos': 2,
		'react/no-unstable-nested-components': 2,
		'react/no-unused-prop-types': 2,
		'react/no-unused-state': 2,
		'react/prefer-exact-props': 2,
		'react/jsx-child-element-spacing': 2,
		'react/jsx-closing-bracket-location': 2,
		'no-duplicate-imports': 2,
		'no-unreachable-loop': 2,
		'block-scoped-var': 2,
		'default-case': 2,
		'default-case-last': 2,
		'default-param-last': 2,
		'dot-notation': 2,
		'react/prop-types': 2,
		'prefer-const': 1,
		'react/display-name': 0,
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				moduleDirectory: ['node_modules', 'src/'],
			},
		},
	},
};
