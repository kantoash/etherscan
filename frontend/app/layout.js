import Header from "../components/Header";
import "../styles/globals.css";

export default async function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body className="bg-gray-800 h-screen p-3 max-w-7xl mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
