import { cache } from "react";
interface IKeywordArticle {
  keyword: string;
  limit: number;
  page: number;
}

export const getKeywordArticle = async (
  keyword: string,
  limit: number,
  page: number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/category/${keyword}?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    return data.articles;
  }
};
