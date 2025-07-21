export const metadata = {
  title: "Note App",
  description: "Final exam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
