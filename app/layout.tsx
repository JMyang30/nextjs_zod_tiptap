import './globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
