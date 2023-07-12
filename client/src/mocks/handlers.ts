import { rest } from "msw";

export const handlers = [
  rest.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/remainCnt`,
    (req, res, ctx) => {
      return res(ctx.json({ remain_cnt: 1 }));
    }
  ),
];
