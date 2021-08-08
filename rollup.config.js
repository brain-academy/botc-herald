import json from '@rollup/plugin-json'
import scss from 'rollup-plugin-scss'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	{
		input: 'src/index.ts',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'esm' },
		],
		plugins: [
			typescript(),
			scss(),
			json()
		],
		external: Object.keys(pkg.peerDependencies || {}),
	},
]
