import { Background } from "@/components/background/Background";
import "./globals.css";

export const metadata = {
  title: "Digital Money App ",
  description: "Desafío profesional Front-end (Digital-House) ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="h-screen max-h-screen flex items-center justify-center">
        {children}
        <Background />
      </body>
    </html>
  );
}
