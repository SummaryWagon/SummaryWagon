'use client'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function BackButton() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    router.back();
  };

    return (
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
    );
}

export default BackButton;
