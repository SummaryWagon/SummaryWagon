import { NextApiRequest, NextApiResponse } from "next";
import { clientDB } from "@/util/database";
import bcrypt from "bcrypt";
import { redirect } from "next/dist/server/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // 이메일, 비밀번호 빈칸인지 확인
    if (req.body.email === "" || req.body.password === "") {
      return res.status(400).json({ message: "Invalid input" });
    }
    // 이메일 중복 확인
    const db = (await clientDB).db("dbEarlyDev");
    const userCollection = db.collection("user_cred");
    const check = await userCollection.findOne({ email: req.body.email });
    // 중복이면 에러
    if (check) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    await db.collection("user_cred").insertOne(req.body);
    res.status(200).json({ message: "success" });
  }
}
