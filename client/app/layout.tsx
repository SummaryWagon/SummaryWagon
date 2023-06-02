import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ReactQueryProvider from "@/util/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SummaryWagon",
  description: "Three-sentence summary of using GPT",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
