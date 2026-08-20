import { prefix } from '../core/prefix';

export function Wordmark({ width = 168, className }: { width?: number; className?: string }) {
	const aspect = 305.25 / 69.75;
	const url = `url(${prefix}/static/logo/nav_logo.svg)`;

	return (
		<span
			role="img"
			aria-label="Corpus Christi Anglican Church"
			className={className}
			style={{
				display: 'block',
				width,
				height: width / aspect,
				backgroundColor: 'currentColor',
				WebkitMaskImage: url,
				maskImage: url,
				WebkitMaskRepeat: 'no-repeat',
				maskRepeat: 'no-repeat',
				WebkitMaskSize: 'contain',
				maskSize: 'contain',
				WebkitMaskPosition: 'center',
				maskPosition: 'center',
			}}
		/>
	);
}
