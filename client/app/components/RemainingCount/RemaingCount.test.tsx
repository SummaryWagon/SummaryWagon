
import { render, screen } from "@testing-library/react";
import Home from "./index";
import { server } from "@/src/mocks/server";
import { rest } from "msw";
import { delay } from "@/app/tests/utils";
describe("<RemainingCount/>", () => {
  // test("에러가 발생했을때", async () => {
  //   server.use(
  //     rest.get(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/remainCnt/?email=""`,
  //       (req, res, ctx) => {
  //         return res(ctx.status(500));
  //       }
  //     )
  //   );

  //   render(<Home userEmail={""}></Home>);
  //   const error = await screen.findByText("로그인이 필요합니다.");
  //   expect(error).toBeInTheDocument();
  // });

  // test("이메일이 없을때", () => {
  //   render(<Home userEmail={""} />);
  //   expect(
  //     screen.getByText("*과금 문제로 횟수 제한이 있습니다.")
  //   ).toBeInTheDocument();
  // });

  test("1회 남았을때", async () => {
    const params = "tmsprqo@naver.com";
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/remainCnt`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              remain_cnt: 1,
            })
          );
        }
      )
    );

    render(<Home userEmail={params}></Home>);
    await delay(1000);
    const remainCnt = await screen.findByText("0");

    expect(remainCnt).toBeInTheDocument();
  });
});
