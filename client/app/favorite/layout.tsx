import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Favorite from "./page";
import FavoriteKeywords from "./components/FavoriteKeywords/FavoriteKeywords";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "test",
  description: "GPT-powered Tech Forum for the Latest Tech Information",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1 className={styles.title}>🚀 favorite tech</h1>
      <FavoriteKeywords></FavoriteKeywords> {children}
    </div>
  );
}
