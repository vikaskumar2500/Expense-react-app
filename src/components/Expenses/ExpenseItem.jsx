import { Col, Row } from "react-bootstrap";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  return (
    <Row key={props.id} className="mb-3 expense-item">
      <Col>{props.category}</Col>
      <Col>{props.desc}</Col>
      <Col className="price">₹{props.price}</Col>
    </Row>
  );
};

export default ExpenseItem;
