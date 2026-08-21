import {
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	serverTimestamp,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export const LEAFLETS = 'leaflets';

const FOLDER = 'leaflets';

export const MAX_LEAFLET_BYTES = 20 * 1024 * 1024;

export type Leaflet = {
	id: string;
	date: string;
	file: string;
	originalName: string;
};

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

const toLeaflet = (id: string, data: Record<string, unknown>): Leaflet => ({
	id,
	date: readDate(data.date),
	file: (data.file as string) ?? '',
	originalName: (data.originalName as string) ?? '',
});

export async function listLeaflets(): Promise<Leaflet[]> {
	const snapshot = await getDocs(collection(db, LEAFLETS));
	return snapshot.docs
		.map((d) => toLeaflet(d.id, d.data()))
		.filter((l) => l.file)
		.sort((a, b) => b.date.localeCompare(a.date));
}

const safeName = (name: string) =>
	name
		.toLowerCase()
		.replace(/\.pdf$/, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '') || 'leaflet';

export async function uploadLeaflet(file: File, date: string): Promise<void> {
	const filename = `${date}-${safeName(file.name)}.pdf`;

	await uploadBytes(ref(storage, `${FOLDER}/${filename}`), file, {
		contentType: 'application/pdf',
		contentDisposition: `attachment; filename="pew-leaflet-${date}.pdf"`,
		cacheControl: 'public, max-age=3600',
	});

	await addDoc(collection(db, LEAFLETS), {
		date: Timestamp.fromDate(new Date(`${date}T12:00:00`)),
		file: filename,
		originalName: file.name,
		uploadedAt: serverTimestamp(),
	});
}

export async function removeLeaflet(leaflet: Leaflet): Promise<void> {
	await deleteDoc(doc(db, LEAFLETS, leaflet.id));
	try {
		await deleteObject(ref(storage, `${FOLDER}/${leaflet.file}`));
	} catch {}
}

export async function leafletUrl(file: string): Promise<string | null> {
	if (!file) return null;
	try {
		return await getDownloadURL(ref(storage, `${FOLDER}/${file}`));
	} catch {
		return null;
	}
}
