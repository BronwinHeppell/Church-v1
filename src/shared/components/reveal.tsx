export type RevealKind = 'rise' | 'fade' | 'veil';
type Common = {
	children: React.ReactNode;
	className?: string;
	kind?: RevealKind;
	as?: 'div' | 'li' | 'article' | 'section';
	delay?: number;
	stagger?: number;
};

// Text and lists are available immediately. Photo entrances live in the image wrapper.
export function Reveal({ children, className, as: Tag = 'div' }: Common) {
	return <Tag className={className}>{children}</Tag>;
}
export const RevealGroup = Reveal;
export const RevealItem = Reveal;
