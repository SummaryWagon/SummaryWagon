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
          alt="ED Logo"
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
          <>
            <LogoutBtn></LogoutBtn>
            {/* <Image
              src={session.user.image}
              alt={session.user.name}
              width={40}
              height={40}
              className={styles.userImage}
            /> */}
          </>
        )}
      </div>
    </div>
  );
}
