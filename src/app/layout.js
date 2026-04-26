import "./globals.css";

export const metadata = {
  title: 'CodeBook',
  description: 'Practice coding problems with your team.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
