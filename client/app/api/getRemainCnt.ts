import { cache } from "react";
export const getRemainCnt = async (userEmail: string) => {
  if (!userEmail) return -1;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/remainCnt/?email=${userEmail}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (!data) return -1;
  return data.remain_cnt;
};
