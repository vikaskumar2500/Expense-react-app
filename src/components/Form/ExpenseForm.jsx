import { useRef } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import "./ExpenseForm.css";
import { UserAuth } from "../../store/AuthContext";
import { v4 as uuidv4 } from "uuid";

const ExpenseForm = () => {
  const moneyInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  const { addExpense } = UserAuth();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      price: moneyInputRef.current.value,
      desc: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    addExpense(expense);
    try {
      const response = await fetch(
        "https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      console.log(data);

      moneyInputRef.current.value = "";
      descriptionInputRef.current.value = "";
      categoryInputRef.current.value = "";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Form className="daily-expense-form" onSubmit={formSubmitHandler}>
      <h3>Daily expenses</h3>
      <FormGroup className="form-group">
        <FormLabel htmlFor="spent-money">Spent money</FormLabel>
        <Form.Control
          type="number"
          id="spent-money"
          min={1}
          step={1}
          ref={moneyInputRef}
        />
      </FormGroup>

      <FormGroup className="form-group">
        <FormLabel htmlFor="description">Description</FormLabel>
        <Form.Control type="text" id="description" ref={descriptionInputRef} />
      </FormGroup>
      <FormGroup className="form-group">
        <FormLabel htmlFor="category">Category</FormLabel>
        <Form.Select
          aria-label="Default select"
          id="category"
          ref={categoryInputRef}
        >
          <option>Select categories</option>
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </Form.Select>
      </FormGroup>

      <Button type="submit" variant="success">
        Add Expenses
      </Button>
    </Form>
  );
};

export default ExpenseForm;
