import { render, screen, userEvent } from "../utils/test-utils";
import { Title } from "./Title";

describe("Title", async () => {
  it("should render the title", () => {
    render(<Title title="My title" />);

    // screen.logTestingPlaygroundURL();

    expect(screen.getByText("My title")).toBeInTheDocument();

    const mintag = screen.getByLabelText("Titlebox");

    expect(mintag.classList.contains("title")).toBe(true);
  });
});
