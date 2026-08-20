'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/shared/components/button';
import { AdminShell } from '@/admin/shell';
import {
	createEvent,
	emptyDraft,
	getEvent,
	imageUrl,
	saveEvent,
	uploadEventImage,
	type EventDraft,
} from '@/admin/events';

const fieldClass =
	'font-ui border-line bg-surface text-ink rounded-base ease-fluid w-full border px-3.5 py-2.5 text-[0.9375rem] transition-colors duration-300 focus:border-accent';

const labelClass = 'font-ui text-ink block text-xs tracking-[0.14em] uppercase';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function Field({
	label,
	hint,
	children,
}: {
	label: string;
	hint?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mt-6">
			<label className={labelClass}>
				{label}
				<span className="mt-2 block normal-case">{children}</span>
			</label>
			{hint && <p className="font-ui text-muted mt-2 text-xs">{hint}</p>}
		</div>
	);
}

function EventEditor() {
	const params = useSearchParams();
	const id = params.get('id');
	const editing = Boolean(id);
	const router = useRouter();

	const [draft, setDraft] = useState<EventDraft>(emptyDraft());
	const [state, setState] = useState<'loading' | 'ready' | 'missing'>(
		editing ? 'loading' : 'ready',
	);
	const [preview, setPreview] = useState<string | null>(null);
	const [uploading, setUploading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState('');
	const fileRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!id) return;
		let cancelled = false;

		(async () => {
			try {
				const found = await getEvent(id);
				if (cancelled) return;
				if (!found) {
					setState('missing');
					return;
				}
				const { id: _ignored, ...rest } = found;
				setDraft(rest);
				setState('ready');
				if (rest.image) setPreview(await imageUrl(rest.image));
			} catch (e) {
				console.error('Could not load event', e);
				if (!cancelled) setState('missing');
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [id]);

	const set = <K extends keyof EventDraft>(key: K, value: EventDraft[K]) =>
		setDraft((d) => ({ ...d, [key]: value }));

	const pickImage = async (file: File | undefined) => {
		if (!file) return;
		if (!file.type.startsWith('image/')) {
			setError('That file is not an image.');
			return;
		}
		if (file.size > MAX_IMAGE_BYTES) {
			setError('Images must be under 5MB. Please resize it and try again.');
			return;
		}

		setError('');
		setUploading(true);
		// Show the local file straight away rather than waiting on the round trip.
		setPreview(URL.createObjectURL(file));
		try {
			set('image', await uploadEventImage(file));
		} catch (e) {
			console.error('Upload failed', e);
			setError('The image did not upload. Check your connection and try again.');
			setPreview(null);
		} finally {
			setUploading(false);
		}
	};

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!draft.title.trim()) {
			setError('Give the event a title.');
			return;
		}
		if (!draft.date) {
			setError('Pick a date, otherwise the website cannot place the event.');
			return;
		}

		setError('');
		setSaving(true);
		try {
			if (id) await saveEvent(id, draft);
			else await createEvent(draft);
			router.push('/events');
		} catch (err) {
			console.error('Could not save event', err);
			setError('Could not save. Check your Firestore permissions and try again.');
			setSaving(false);
		}
	};

	if (state === 'loading') {
		return (
			<p role="status" className="font-ui text-muted text-sm">
				Loading event…
			</p>
		);
	}

	if (state === 'missing') {
		return (
			<div role="alert">
				<h1 className="font-display text-[2rem] leading-tight">Event not found</h1>
				<p className="font-ui text-muted mt-3 text-sm">
					It may have been deleted from another device.
				</p>
				<Button asChild variant="outline" className="mt-6">
					<Link href="/events">Back to events</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="max-w-2xl">
			<Link
				href="/events"
				className="font-ui text-muted hover:text-ink ease-fluid inline-flex items-center gap-2 text-sm transition-colors duration-300"
			>
				<ArrowLeft strokeWidth={1.5} className="size-4" aria-hidden />
				Events
			</Link>

			<h1 className="font-display mt-6 text-[2rem] leading-tight">
				{editing ? 'Edit event' : 'New event'}
			</h1>

			<form onSubmit={submit} className="mt-8" noValidate>
				<Field label="Title">
					<input
						value={draft.title}
						onChange={(e) => set('title', e.target.value)}
						required
						className={fieldClass}
					/>
				</Field>

				<Field label="Date" hint="Events dated before today stop showing on the website.">
					<input
						type="date"
						value={draft.date}
						onChange={(e) => set('date', e.target.value)}
						required
						className={`${fieldClass} numerals`}
					/>
				</Field>

				<Field label="Location">
					<input
						value={draft.location}
						onChange={(e) => set('location', e.target.value)}
						placeholder="Corpus Christi, Garsfontein"
						className={fieldClass}
					/>
				</Field>

				<Field
					label="Short description"
					hint="Shown directly under the event title. Line breaks are kept."
				>
					<textarea
						value={draft.shortDescription}
						onChange={(e) => set('shortDescription', e.target.value)}
						rows={4}
						className={`${fieldClass} resize-y`}
					/>
				</Field>

				<Field
					label="Extra detail"
					hint={'Hidden behind "More details" on the website. Leave empty and no toggle appears.'}
				>
					<textarea
						value={draft.additionalInformation}
						onChange={(e) => set('additionalInformation', e.target.value)}
						rows={6}
						className={`${fieldClass} resize-y`}
					/>
				</Field>

				<div className="mt-6">
					<p className={labelClass}>Image</p>

					<div className="border-line rounded-base mt-2 flex flex-wrap items-center gap-5 border p-4">
						<div className="border-line bg-raised rounded-frame relative size-24 shrink-0 overflow-hidden border">
							{preview ? (
								<Image
									src={preview}
									alt=""
									fill
									sizes="96px"
									unoptimized
									className="object-cover"
								/>
							) : (
								<span className="font-ui text-muted grid h-full place-items-center text-xs">
									None
								</span>
							)}
						</div>

						<div className="min-w-0">
							<input
								ref={fileRef}
								type="file"
								accept="image/*"
								onChange={(e) => pickImage(e.target.files?.[0])}
								className="sr-only"
							/>
							<div className="flex flex-wrap items-center gap-2">
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="gap-2"
									disabled={uploading}
									onClick={() => fileRef.current?.click()}
								>
									<Upload strokeWidth={1.5} className="size-3.5" aria-hidden />
									{uploading ? 'Uploading…' : draft.image ? 'Replace' : 'Upload'}
								</Button>
								{draft.image && !uploading && (
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="gap-1.5"
										onClick={() => {
											set('image', '');
											setPreview(null);
											if (fileRef.current) fileRef.current.value = '';
										}}
									>
										<X strokeWidth={1.5} className="size-3.5" aria-hidden />
										Remove
									</Button>
								)}
							</div>
							<p className="font-ui text-muted mt-2 truncate text-xs">
								{draft.image ? draft.image : 'JPEG or PNG, under 5MB.'}
							</p>
						</div>
					</div>
				</div>

				{error && (
					<p role="alert" className="font-ui mt-6 text-sm text-[#8c2f2f]">
						{error}
					</p>
				)}

				<div className="border-line mt-9 flex flex-wrap items-center gap-3 border-t pt-7">
					<Button type="submit" size="lg" disabled={saving || uploading}>
						{saving ? 'Saving…' : editing ? 'Save changes' : 'Create event'}
					</Button>
					<Button asChild variant="ghost" size="lg">
						<Link href="/events">Cancel</Link>
					</Button>
				</div>
			</form>
		</div>
	);
}

export default function EventEditPage() {
	return (
		<AdminShell>
			{/* useSearchParams needs a boundary in a statically exported route. */}
			<Suspense
				fallback={
					<p role="status" className="font-ui text-muted text-sm">
						Loading…
					</p>
				}
			>
				<EventEditor />
			</Suspense>
		</AdminShell>
	);
}
