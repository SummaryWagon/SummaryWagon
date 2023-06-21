import { cache } from "react";
export const getRemainCnt = cache(async (userEmail: string) => {
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
  console.log('남은 횟수:',data);
  return data.remain_cnt;
});
