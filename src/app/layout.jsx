import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Chess Game",
  description: "Chess Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">{children}</body>
    </html>
  );
}
