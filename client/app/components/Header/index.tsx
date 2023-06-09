'use client'
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import SignUpBtn from "./components/SignupBtn/SignupBtn";
import LoginBtn from "./components/LoginBtn/LoginBtn";
import LogoutBtn from "./\bcomponents/LogoutBtn/LogoutBtn";
import { useRouter, usePathname } from "next/navigation";
interface HeaderProps {
  session: any;
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogoClick = () => {
    if (pathname === "/") {
      location.reload(); // Reload the current page if already on the main page
    } else {
      router.push("/"); // Navigate to the main page if on a different page
    }
  };

  return (
    <div className={styles.header}>
      <div onClick={handleLogoClick} className={styles.logo}>
        <Image src="/logo.svg" alt="ED Logo" width={70} height={70} priority />
      </div>
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
