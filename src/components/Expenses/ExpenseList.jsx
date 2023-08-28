import "./ExpenseList.css";
import { UserAuth } from "../../store/AuthContext";
import { Container, Table } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  const { expenses, totalPrice } = UserAuth();
 
  return (
    <Container className="expense-container">
      <h3>Daily Expenses List</h3>
      <div className="table-head">
        <Table className="table" responsive>
          <thead >
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Spent money</th>
              <th colSpan={2} className="buttons">
                Buttons
              </th>
            </tr>
          </thead>

          <tbody className="title-body">
            {expenses.map((expense) => (
              <ExpenseItem {...expense} key={expense.id} expense={expense} />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="total-price">
        <span className="text">Total Spent Money:</span>
        <span className="money">₹{totalPrice}</span>
      </div>
    </Container>
  );
};

export default ExpenseList;
