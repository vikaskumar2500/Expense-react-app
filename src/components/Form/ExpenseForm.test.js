import { screen, render as rltRender, fireEvent } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";
import { Provider } from "react-redux";
import store from "../../store/store";

const render = (component) =>
  rltRender(<Provider store={store}>{component}</Provider>);

test("check the Daily expenses text", () => {
  render(<ExpenseForm />);
  
  const text = screen.getByRole("Daily expenses");
  expect(text).toBeInTheDocument();
});
