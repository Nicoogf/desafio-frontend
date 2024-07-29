import "./globals.css";

export const metadata = {
  title: "Digital Money App ",
  description: "Desafío profesional Front-end (Digital-House) ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="">
        {children}
      </body>
    </html>
  );
}
