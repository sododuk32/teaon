import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: '태움',
	description: '',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='kr'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
