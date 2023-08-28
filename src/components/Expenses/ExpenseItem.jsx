import { Button } from "react-bootstrap";
import "./ExpenseItem.css";
import { UserAuth } from "../../store/AuthContext";

const ExpenseItem = (props) => {
  const { expense } = props;
  const { onEditExpense, deleteExpense } = UserAuth();

  const fetchedExpenses = async (id) => {
    try {
      const response = await fetch(
        "https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      const responseKeys = Object.keys(data);
      const targetKey = responseKeys.find((key) => data[key].id === id);
      // console.log(data[targetKey]);
      if(!targetKey) return
      const resObject = { targetExpense: data[targetKey], targetKey };
      return resObject;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const deleteExpenseFromFirebase = async (key) => {
    try {
      await fetch(
        `https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${key}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const editButtonHandler = async (expense, id) => {
    onEditExpense(expense);
    deleteExpense(id);
    const responseData = await fetchedExpenses(id);
    if(responseData) {
      const { targetKey } = responseData;
      deleteExpenseFromFirebase(targetKey);
    }
  };

  const deleteButtonHandler = async (id) => {
    deleteExpense(id);
    const responseData = await fetchedExpenses(id);
    if(responseData) {
      const { targetKey } = responseData;
      deleteExpenseFromFirebase(targetKey);
    }
    
  };

  return (
    <tr key={props.id}>
      <td>{props.category}</td>
      <td>{props.desc}</td>
      <td className="price">₹{props.price}</td>
      <td>
        <Button
          variant="success"
          className="edit-button"
          onClick={editButtonHandler.bind(null, expense, props.id)}
        >
          edit
        </Button>
      </td>
      <td>
        <Button
          variant="outline-danger"
          className="delete-button"
          onClick={deleteButtonHandler.bind(null, props.id)}
        >
          delete
        </Button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
