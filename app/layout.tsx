import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";



export const metadata: Metadata = {
  title: "Silicon",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
      <script defer src="https://kit.fontawesome.com/41c8b474e2.js" crossOrigin="anonymous"></script>
      </head>
      <body className="wrapper">
        <Header/>

        {children}
        <Footer/>

      </body>
    </html>
  );
}
