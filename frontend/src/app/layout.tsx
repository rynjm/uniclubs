import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { getSessionUser } from "@/actions/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniClubs | The Future of Campus Life",
  description: "Manage clubs, events, and sponsorships in one AI-powered platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();

  return (
    <html lang="en">
      <body className={inter.className} style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        <Navbar user={user} />
        <main>{children}</main>

        <footer style={{
          textAlign: 'center',
          padding: '4rem 0',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          <p>© 2024 UniClubs Platform. Powered by Student Innovation.</p>
        </footer>
      </body>
    </html>
  );
}
