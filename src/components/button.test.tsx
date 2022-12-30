import { render, screen, userEvent } from "../utils/test-utils";
import { Button } from "./Button";

describe("Button", async () => {
  it("should render the button", () => {
    render(
      <Button title="My title" color="#ff0000" disabled={true} opacity={1} />
    );

    screen.logTestingPlaygroundURL();

    expect(screen.getByText("My title")).toBeInTheDocument();

    const mybutton = screen.getByRole("button", { name: /my title/i });

    expect(mybutton).toHaveAttribute("disabled");
    expect(mybutton).toBeVisible();
  });

  it("button show not be visible", () => {
    render(
      <Button title="My title" color="#ff0000" disabled={true} opacity={0} />
    );

    screen.logTestingPlaygroundURL();

    const mybutton = screen.getByRole("button", { name: /my title/i });

    expect(mybutton).not.toBeVisible();
  });
});
