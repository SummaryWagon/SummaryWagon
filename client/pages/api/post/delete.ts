import { NextApiRequest, NextApiResponse } from "next";
import { clientDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session = await getServerSession(req, res, authOptions);

  if (!session) return res.status(500).json({ message: "로그인 하세요" });
  else {
    if (req.method === "DELETE") {
      // 작성자 체크
      if (
        req.body.author !== session.user?.email &&
        session.user?.role !== "Admin"
      )
        return res.status(500).json({ message: "권한이 없습니다" });
      try {
        console.log("여기옴?");
        const db = (await clientDB).db("forum");
        const result = await db.collection("post").deleteOne({
          _id: new ObjectId(req.body.id),
        });
        // console.log(result);
        if (result.deletedCount === 1) {
          return res.status(200).json({ message: "삭제되었습니다" });
        } else {
          return res.status(500).json({ message: "Something went wrong" });
        }
      } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
}
