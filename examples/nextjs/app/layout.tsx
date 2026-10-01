import "tensile/reset.css";
import "tensile/styles.css";
import "./app.css";

export const metadata = { title: "Tensile on Next.js" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
