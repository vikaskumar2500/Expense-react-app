import { useEffect, useRef } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import "./ExpenseForm.css";
import { v4 as uuidv4 } from "uuid";
import { expenseActions } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = ({value}) => {
  const moneyInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const edit = useSelector((state) => state.expense.edit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit !== null || edit !== undefined) {
      moneyInputRef.current.value = edit.price;
      descriptionInputRef.current.value = edit.desc;
      categoryInputRef.current.value = edit.category;
    }
  }, [edit]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      price: +moneyInputRef.current.value,
      desc: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };

    // addExpense by using redux.🤨
    dispatch(expenseActions.addExpense([expense]));

    moneyInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "default";
  };

  return (
    <Form
      className="daily-expense-form bg-body-tertiary"
      onSubmit={formSubmitHandler}
    >
      <h3>Daily expenses</h3>
      <FormGroup className="form-group">
        <FormLabel htmlFor="spent-money">Spent money</FormLabel>
        <Form.Control
          type="number"
          id="spent-money"
          min={1}
          step={1}
          ref={moneyInputRef}
          required
        />
      </FormGroup>

      <FormGroup className="form-group">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Form.Control
          type="text"
          id="description"
          ref={descriptionInputRef}
          required
        />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel htmlFor="category">Category</FormLabel>
        <Form.Select
          aria-label="Default select"
          id="category"
          ref={categoryInputRef}
          required
        >
          <option value="default">Select categories</option>
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
          <option value="clothes">Clothes</option>
          <option value="Movies">Movies</option>
        </Form.Select>
      </FormGroup>

      <Button type="submit" variant="success">
        Add Expenses
      </Button>
    </Form>
  );
};

export default ExpenseForm;