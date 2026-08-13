import next from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
const config = [
	{ ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'] },
	...next,
	prettier,
];

export default config;
