import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "../utils/test-utils";
import CreateInvoice from "./CreateInvoice";
import Store from "../store";

describe("CreateInvoice", async () => {
  it("should render and load createInvoice", async () => {
    render(
      <Store>
        <CreateInvoice />
      </Store>
    );
    await waitForElementToBeRemoved(() => screen.queryByLabelText("loading"));

    // screen.logTestingPlaygroundURL();

    const customerTextbox = screen.getByRole("textbox", { name: /customer/i });

    expect(customerTextbox).toBeInTheDocument();
    await userEvent.type(customerTextbox, "test customer");
    expect(customerTextbox).toHaveValue("test customer");

    // expect(screen.getByText("200")).toBeInTheDocument();

    const priceTextbox = screen.getByRole("spinbutton", { name: /price/i });

    expect(priceTextbox).toBeInTheDocument();
    expect(priceTextbox).toHaveValue(100);
    await userEvent.clear(priceTextbox);
    await userEvent.type(priceTextbox, "200");
    expect(priceTextbox).toHaveValue(200);
  });
});
