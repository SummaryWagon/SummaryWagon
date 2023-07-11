import { render, screen } from "@testing-library/react";
import Home from "./index";

describe("<RemainingCount/>", () => {
  //   test("카운트가 없을 때", async () => {
  //     render(await Home({ userEmail: "
  // }));
  //     expect(screen.getByText("welcome to next.jx!")).toBeInTheDocument();
  //   });

  test("이메일이 없을때", () => {
    render(<Home userEmail={""} />);
    expect(
      screen.getByText("*과금 문제로 횟수 제한이 있습니다.")
    ).toBeInTheDocument();
  });
});
