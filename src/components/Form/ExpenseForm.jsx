import { useRef } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const moneyInputRef = useRef();
  const descriptionInputRef = useRef();
  // const categoryInputRef = useRef();

  return (
    <Form className="daily-expense-form">
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
        <Form.Select aria-label="Default select" id="category">
          <option>Select categories</option>
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </Form.Select>
      </FormGroup>

      <Button variant="success">Add Expenses</Button>
    </Form>
  );
};

export default ExpenseForm;
