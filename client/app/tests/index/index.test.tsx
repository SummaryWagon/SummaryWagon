import { render, screen } from "@testing-library/react";
import Home from "../index/page";

describe("Home", () => {
  test("renders without crashing", async () => {
    render(await Home());
    expect(screen.getByText("welcome to next.js!")).toBeInTheDocument();
  });
});
