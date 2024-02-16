import { icons } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { colorSet, type ColorType } from 'styles/color';
import { cn } from '@/lib/utils';

export type LucideIconProps = HTMLAttributes<HTMLOrSVGElement> & {
	name: keyof typeof icons;
	color?: ColorType;
	size?: number;
};

function LucideIcon({ name, color = 'black', size = 16, ...props }: LucideIconProps) {
	const SelectLucideIcon = icons[name];

	const isClickEvent = !!props.onClick;
	const pointerStyle = isClickEvent ? 'cursor-pointer' : '';

	return (
		<SelectLucideIcon
			color={colorSet[color] as string}
			size={size}
			className={cn(pointerStyle, props.className)}
			{...props}
		/>
	);
}

export default LucideIcon;
