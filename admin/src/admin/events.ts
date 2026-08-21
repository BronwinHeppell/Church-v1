import {
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export const EVENTS = 'events';

const IMAGES = 'images';

export type AdminEvent = {
	id: string;
	title: string;
	shortDescription: string;
	additionalInformation: string;
	location: string;
	date: string;
	image: string;
};

export type EventDraft = Omit<AdminEvent, 'id'>;

export const emptyDraft = (): EventDraft => ({
	title: '',
	shortDescription: '',
	additionalInformation: '',
	location: '',
	date: '',
	image: '',
});

const readExtra = (data: Record<string, unknown>) =>
	(data.additionalInformation as string) ?? (data.longDescription as string) ?? '';

const readDate = (value: unknown): string => {
	let d: Date | null = null;

	if (value && typeof value === 'object' && 'toDate' in value) {
		d = (value as Timestamp).toDate();
	} else if (typeof value === 'string') {
		const parsed = new Date(value);
		if (!Number.isNaN(parsed.getTime())) d = parsed;
	}

	if (!d) return '';
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
		d.getDate(),
	).padStart(2, '0')}`;
};

const toEvent = (id: string, data: Record<string, unknown>): AdminEvent => ({
	id,
	title: (data.title as string) ?? '',
	shortDescription: (data.shortDescription as string) ?? '',
	additionalInformation: readExtra(data),
	location: (data.location as string) ?? '',
	date: readDate(data.date),
	image: (data.image as string) ?? '',
});

const toFirestore = (draft: EventDraft) => ({
	title: draft.title.trim(),
	shortDescription: draft.shortDescription.trim(),
	additionalInformation: draft.additionalInformation.trim(),
	location: draft.location.trim(),
	image: draft.image,
	date: Timestamp.fromDate(new Date(`${draft.date}T12:00:00`)),
});

export async function listEvents(): Promise<AdminEvent[]> {
	const snapshot = await getDocs(collection(db, EVENTS));
	return snapshot.docs
		.map((d) => toEvent(d.id, d.data()))
		.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEvent(id: string): Promise<AdminEvent | null> {
	const snap = await getDoc(doc(db, EVENTS, id));
	return snap.exists() ? toEvent(snap.id, snap.data()) : null;
}

export async function createEvent(draft: EventDraft): Promise<string> {
	const created = await addDoc(collection(db, EVENTS), toFirestore(draft));
	return created.id;
}

export async function saveEvent(id: string, draft: EventDraft): Promise<void> {
	await updateDoc(doc(db, EVENTS, id), toFirestore(draft));
}

export async function removeEvent(event: AdminEvent): Promise<void> {
	await deleteDoc(doc(db, EVENTS, event.id));

	if (event.image) {
		try {
			await deleteObject(ref(storage, `${IMAGES}/${event.image}`));
		} catch {}
	}
}

const safeName = (name: string) =>
	name
		.toLowerCase()
		.replace(/[^a-z0-9.]+/g, '-')
		.replace(/(^-|-$)/g, '');

export async function uploadEventImage(file: File): Promise<string> {
	const stamp = Date.now().toString(36);
	const filename = `${stamp}-${safeName(file.name)}`;
	await uploadBytes(ref(storage, `${IMAGES}/${filename}`), file);
	return filename;
}

export async function imageUrl(filename: string): Promise<string | null> {
	if (!filename) return null;
	try {
		return await getDownloadURL(ref(storage, `${IMAGES}/${filename}`));
	} catch {
		return null;
	}
}
