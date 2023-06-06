import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import HistoryIcon from "@/public/icon/HistoryIcon.svg";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Link href={"/hot"} className={styles.title_container}>
        <Image
          className={styles.title_logo}
          src={HistoryIcon}
          height={40}
          width={40}
          alt=""
        ></Image>
        <h2 className={styles.title}>히스토리</h2>
      </Link>
      {children}
    </div>
  );
}
