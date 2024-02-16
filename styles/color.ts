export const colorSet = {
	red: '#fabfb7',
	yellow: '#fdf9c4',
	orange: '#ffda9e',
	purple: '#c5c6c8',
	blue: '#b2e2f2',
	black: '#333333',
} as const;

export type ColorType = keyof typeof colorSet;
