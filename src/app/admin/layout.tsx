import type { Metadata } from 'next';
import { AuthProvider } from '@/admin/auth-context';

export const metadata: Metadata = {
	title: 'Admin | Corpus Christi Anglican Church',
	// Never let the admin into an index, and do not follow links out of it.
	robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return <AuthProvider>{children}</AuthProvider>;
}
