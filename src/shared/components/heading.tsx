import { cn } from '@/lib/utils';

type SectionTitleProps = {
	children: React.ReactNode;
	className?: string;
	as?: 'h1' | 'h2' | 'h3';
	id?: string;
};

export function SectionTitle({ children, className, as: Tag = 'h2', id }: SectionTitleProps) {
	return (
		<Tag id={id} className={cn('font-display text-title', className)}>
			{children}
		</Tag>
	);
}

export function Em({ children }: { children: React.ReactNode }) {
	return <em className="font-display italic">{children}</em>;
}

export function Eyebrow({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <p className={cn('eyebrow', className)}>{children}</p>;
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
	return <p className={cn('prose-body text-muted', className)}>{children}</p>;
}

export function SectionHeader({
	eyebrow,
	title,
	sub,
	align = 'center',
	className,
}: {
	eyebrow?: string;
	title: React.ReactNode;
	sub?: string;
	align?: 'center' | 'start';
	className?: string;
}) {
	const centered = align === 'center';

	return (
		<div className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
			{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
			<SectionTitle className={eyebrow ? 'mt-4' : undefined}>{title}</SectionTitle>
			{sub && <Lede className={cn('mt-4 text-base', centered && 'mx-auto')}>{sub}</Lede>}
		</div>
	);
}
