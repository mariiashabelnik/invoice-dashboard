import { render, screen, userEvent } from "../utils/test-utils";
import { Input } from "./Input";

describe("Input", async () => {
  it("should render the input", () => {
    render(
      <Input
        name="email"
        type="email"
        error={undefined}
        placeholder="Email"
        label="Email Address"
        aria-label="Email Address"
      />
    );

    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /email address/i,
      })
    ).toBeInTheDocument();
  });

  it("should change input value", async () => {
    render(
      <Input
        name="email"
        type="email"
        error={undefined}
        placeholder="Email"
        label="Email Address"
        aria-label="Email Address"
      />
    );

    const input = screen.getByRole("textbox", {
      name: /email address/i,
    });
    screen.logTestingPlaygroundURL();

    expect(input).toBeInTheDocument();

    await userEvent.type(input, "apa");
    expect(input).toHaveValue("apa");
  });

  /*
  it("should render the input with error", () => {
    render(
      <Input
        name="email"
        type="email"
        placeholder="Email"
        label="Email Address"
        aria-label="Email Address"
        error="Please enter your email"
      />
    );
    expect(
      screen.getByRole("textbox", {
        name: /email address/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter your email"
    );
  }); */
});
