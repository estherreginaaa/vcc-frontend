import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				coffee: {
					'50': '#f4f3f2',
					'100': '#e4dfdd',
					'200': '#cbc2bd',
					'300': '#ad9d97',
					'400': '#95817a',
					'500': '#85716b',
					'600': '#725f5c',
					'700': '#5d4d4b',
					'800': '#504343',
					'900': '#473c3d',
					'950': '#272121',
				},
			},
		},
	},
	plugins: [],
};

export default config;
