import { NextApiRequest, NextApiResponse } from "next";
import { clientDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.title === "" || req.body.content === "") {
      return res.status(400).json({ message: "Invalid input" });
    }
    try {
      const db = (await clientDB).db("forum");
      const result = await db.collection("post").updateOne(
        { _id: new ObjectId(req.body.id) },
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
          },
        }
      );
      return res.status(200).redirect(302, "/list");
    } catch {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
