import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				shake: {
					"0%, 100%": { transform: "translateY(-5)" },
          			"50%": { transform: "translateY(-5px)" },
				},
				aurora: {
					from: {
					  backgroundPosition: "50% 50%, 50% 50%",
					},
					to: {
					  backgroundPosition: "350% 50%, 350% 50%",
					},
				  },
			},
			animation: {
				rocket: "shake 4s ease-in-out infinite",
				aurora: "aurora 60s linear infinite",
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
