import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Danil Kurmayev — Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
