import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import SignUpBtn from "./components/SignupBtn/SignupBtn";
import LoginBtn from "./components/LoginBtn/LoginBtn";

export default function Header(props: any) {
  return (
    <div className={styles.header}>
      <Link href="/" className="logo">
        <Image
          src="/logo.svg"
          alt="Vercel Logo"
          width={70}
          height={70}
          priority
        />
      </Link>
      <div className={styles.menuContainer}>
        <LoginBtn></LoginBtn>
        <Link href="/register" className={styles.menu}>
          <SignUpBtn />
        </Link>
      </div>
    </div>
  );
}
