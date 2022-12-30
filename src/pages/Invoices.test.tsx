import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "../utils/test-utils";
import Invoices from "./Invoices";
import Store from "../store";

describe("Invoices", async () => {
  it("should render and load invoices", async () => {
    render(
      <Store>
        <Invoices />
      </Store>
    );
    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));

    const items = screen.getAllByRole("button", { name: /payed/i });
    expect(items).toHaveLength(2);
    expect(screen.getByText("Jan 3, 2023")).toBeInTheDocument();
    /*
      expect(screen.getByText("Number of tasks: 2")).toBeInTheDocument();
      expect(screen.getByText("Number of invoices: 2")).toBeInTheDocument();
      expect(
        screen.getByText("Logged time last 30 days: ~ 2 hours")
      ).toBeInTheDocument();*/
  });
});
