import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import SignUpBtn from "../login/\bcomponents/SignupBtn/SignupBtn";

export default function Header(props: any) {
  return (
    <div className={styles.header}>
      <Link href="/" className="logo">
        <Image
          src="/logo.svg"
          alt="Vercel Logo"
          width={100}
          height={100}
          priority
        />
      </Link>
      <Link href="/register" className={styles.menu}>
        <SignUpBtn />
      </Link>
    </div>
  );
}
