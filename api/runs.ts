import type { VercelRequest, VercelResponse } from "@vercel/node";
import data from "../db.json";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json(data.runs);
}
