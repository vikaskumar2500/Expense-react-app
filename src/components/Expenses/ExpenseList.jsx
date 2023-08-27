import "./ExpenseList.css";
import { UserAuth } from "../../store/AuthContext";
import { Col, Container, Row } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  const { expenses } = UserAuth();

  return (
    <Container className="expense-container">
      <h2>Daily Expenses List</h2>
      <Row className="title expenses-title">
        <Col>Category</Col>
        <Col>Description</Col>
        <Col>Spent money</Col>
      </Row>
      {expenses.map((expense) => (
        <ExpenseItem {...expense} key={expense.id} />
      ))}
    </Container>
  );
};

export default ExpenseList;
