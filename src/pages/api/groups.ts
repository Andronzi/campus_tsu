import type { NextApiRequest, NextApiResponse } from 'next';

export type Group = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Group[]>
) {
  res.status(200).json([{ name: "Компьютерные науки"}, { name: "Иностранные языки"}]);
}
