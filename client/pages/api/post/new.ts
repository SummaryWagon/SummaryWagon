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
      if (req.body.title === "" || req.body.content === "") {
        return res.status(400).json({ message: "Invalid input" });
      }
      try {
        req.body.author = session.user?.email;
        const db = (await clientDB).db("forum");
        const result = await db.collection("post").insertOne({
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
        });
        return res.status(200).redirect(302, "/list");
      } catch {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
}
