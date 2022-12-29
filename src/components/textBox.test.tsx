import { render, screen, userEvent } from "../utils/test-utils";
import { Textbox } from "./Textbox";

describe("Textbox", async () => {
  it("should render", async () => {
    render(<Textbox label="Test label" />);

    const tag = screen.getByRole("textbox", {
      name: /test label/i,
    });

    screen.logTestingPlaygroundURL();

    expect(tag).toBeInTheDocument();
  });

  it("can edit", async () => {
    render(<Textbox label="Test label" />);

    const tag = screen.getByRole("textbox", {
      name: /test label/i,
    });

    expect(tag).toBeInTheDocument();
    await userEvent.type(tag, "test text");
    expect(tag).toHaveValue("test text");
  });
});
