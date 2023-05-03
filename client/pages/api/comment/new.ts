import { NextApiRequest, NextApiResponse } from "next";
import { clientDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    if (req.method === "POST") {
      if (req.body.comment === "") {
        return res.status(400).json({ message: "Invalid input" });
      }
      try {
        const db = (await clientDB).db("forum");
        const result = await db.collection("comment").insertOne({
          comment: req.body.comment,
          author: session.user?.email,
          post_id: req.body.post_id,
        });
        return res.status(200).json({ message: "댓글 작성 성공" });
      } catch {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
}
