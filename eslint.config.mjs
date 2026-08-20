import next from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
const config = [
	// The admin portal is a separate package with its own lint config.
	{ ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'admin/**'] },
	...next,
	prettier,
];

export default config;
