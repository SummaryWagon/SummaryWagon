import { NextApiRequest, NextApiResponse } from "next";
import { clientDB } from "@/util/database";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body.id === "" || req.body.pwd === "") {
      return res.status(400).json({ message: "Invalid input" });
    }
    try {
      const db = (await clientDB).db("forum");
      const userCollection = db.collection("user");
      const check = await userCollection.findOne({ id: req.body.id });
      if (check) {
        return res.status(400).json({ message: "ID already exists" });
      }
      const result = await userCollection.insertOne({
        id: req.body.id,
        password: req.body.pwd,
      });
      return res.status(200).redirect(302, "/list");
    } catch {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
