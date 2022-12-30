import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "../utils/test-utils";
import Home from "./Home";
import Store from "../store";

describe("Home", async () => {
  it("should render and load home", async () => {
    render(
      <Store>
        <Home />
      </Store>
    );
    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));

    //screen.logTestingPlaygroundURL();

    expect(screen.getByText("Number of projects: 2")).toBeInTheDocument();
    expect(screen.getByText("Number of tasks: 2")).toBeInTheDocument();
    expect(screen.getByText("Number of invoices: 2")).toBeInTheDocument();
    expect(
      screen.getByText("Logged time last 30 days: ~ 2 hours")
    ).toBeInTheDocument();
  });
});
