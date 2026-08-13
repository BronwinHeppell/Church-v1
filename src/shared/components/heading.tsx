import { cn } from '@/lib/utils';

type SectionTitleProps = {
	children: React.ReactNode;
	className?: string;
	as?: 'h1' | 'h2';
	id?: string;
};

export function SectionTitle({ children, className, as: Tag = 'h2', id }: SectionTitleProps) {
	return (
		<Tag id={id} className={cn('font-display text-3xl leading-[1.1] md:text-[2.75rem]', className)}>
			{children}
		</Tag>
	);
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
	return <p className={cn('prose-body text-muted', className)}>{children}</p>;
}
