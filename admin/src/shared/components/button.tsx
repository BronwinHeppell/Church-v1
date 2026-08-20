import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'font-ui rounded-base ease-fluid inline-flex items-center justify-center whitespace-nowrap text-[0.9375rem] transition-[background-color,border-color,color,transform,box-shadow,opacity] duration-500 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				solid:
					'bg-accent text-accent-ink hover:bg-accent-deep hover:shadow-[0_14px_30px_-18px_rgb(20_33_28/0.7)]',
				outline: 'border-line text-ink hover:border-accent hover:text-accent border',
				ghost: 'text-ink hover:text-accent',
				onImage:
					'text-on-image border border-[rgb(255_255_255/0.5)] backdrop-blur-sm hover:border-[rgb(255_255_255/0.85)] hover:bg-[rgb(255_255_255/0.12)]',
			},
			size: {
				default: 'h-11 px-5',
				sm: 'h-9 px-3.5',
				lg: 'h-12 px-6',
			},
		},
		defaultVariants: {
			variant: 'solid',
			size: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
