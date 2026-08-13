import { cn } from '@/lib/utils';

type SectionTitleProps = {
	children: React.ReactNode;
	className?: string;
	as?: 'h1' | 'h2';
	id?: string;
};

export function SectionTitle({ children, className, as: Tag = 'h2', id }: SectionTitleProps) {
	return (
		<Tag
			id={id}
			className={cn('font-display text-[1.75rem] leading-tight md:text-[2.375rem]', className)}
		>
			{children}
		</Tag>
	);
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
}: {
	eyebrow?: string;
	title: React.ReactNode;
	sub?: string;
}) {
	return (
		<div className="mx-auto max-w-2xl text-center">
			{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
			<SectionTitle className={eyebrow ? 'mt-2' : undefined}>{title}</SectionTitle>
			{sub && <Lede className="mx-auto mt-3 text-base">{sub}</Lede>}
		</div>
	);
}
