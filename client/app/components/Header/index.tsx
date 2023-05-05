import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import SignUpBtn from "./components/SignupBtn/SignupBtn";
import LoginBtn from "./components/LoginBtn/LoginBtn";
import LogoutBtn from "./\bcomponents/LogoutBtn/LogoutBtn";

interface HeaderProps {
  session: any;
}

export default function Header({ session }: HeaderProps) {
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
        {!session ? ( // 로그인이 되어있을 때
          <>
            <LoginBtn></LoginBtn>
            <Link href="/register" className={styles.menu}>
              <SignUpBtn />
            </Link>
          </>
        ) : (
          <LogoutBtn></LogoutBtn>
        )}
      </div>
    </div>
  );
}
