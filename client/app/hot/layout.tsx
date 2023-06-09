import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Favorite from "./page";
import FavoriteKeywords from "./components/HotKeywords/HotKeywords";
import Image from "next/image";
import HotTopicIcon from "@/public/icon/HotTopicIcon.svg";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Link href={"/hot"} className={styles.title_container}>
        <Image
          className={styles.title_logo}
          src={HotTopicIcon}
          height={40}
          width={40}
          alt=""
        ></Image>
        <h2 className={styles.title}>트렌드 토픽</h2>
      </Link>
      {/* <FavoriteKeywords></FavoriteKeywords> */}
      {children}
    </div>
  );
}
