import { Background } from "@/components/background/Background";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Digital Money App ",
  description: "Desafío profesional Front-end (Digital-House) ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <AuthProvider>
        <body className="h-screen max-h-screen flex items-center justify-center">
          {children}
          <Background />
        </body>
      </AuthProvider>
    </html>
  );
}
