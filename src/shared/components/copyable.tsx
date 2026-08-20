'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * People paste phone numbers, email addresses and banking details into other
 * apps. Giving them a one-tap copy is a small thing that removes real friction.
 */
export function Copyable({
	value,
	label,
	className,
}: {
	value: string;
	label: string;
	className?: string;
}) {
	const [copied, setCopied] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(timer.current), []);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			clearTimeout(timer.current);
			timer.current = setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard unavailable (insecure context or denied) — the adjacent
			// link still works, so there is nothing to recover from here.
		}
	};

	return (
		<>
			<button
				type="button"
				onClick={copy}
				aria-label={copied ? `${label} copied` : `Copy ${label}`}
				className={cn(
					'ease-fluid inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-500 hover:bg-white/10',
					className,
				)}
			>
				{copied ? (
					<Check strokeWidth={1.5} className="size-3.5" aria-hidden />
				) : (
					<Copy strokeWidth={1.5} className="size-3.5" aria-hidden />
				)}
			</button>
			<span role="status" aria-live="polite" className="sr-only">
				{copied ? `${label} copied to clipboard` : ''}
			</span>
		</>
	);
}
