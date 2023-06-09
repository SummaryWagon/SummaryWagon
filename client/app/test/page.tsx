'use client'
import { ObjectId } from "mongodb";
interface Article {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  link: string;
  summary: string[];
  categories: string[];
}

const fetchData = async (params: string): Promise<Article> => {
  console.log("fetch in", params);
  // console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${params}`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log("res", res);
  // console.log(data);
  return res.json();
};

export default async function test() {
  const data = await fetchData("6454fa571d3bfee7230729d9");
  // console.log(data);

  return (
    <div>
      <h4>회원 가입</h4>
      <form action="/api/login/login" method="POST">
        <input type="text" name="id" placeholder="아이디" />
        <input type="text" name="pwd" placeholder="비밀번호" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
