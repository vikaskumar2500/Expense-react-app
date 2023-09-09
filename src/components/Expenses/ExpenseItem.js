import { Button } from "react-bootstrap";
import "./ExpenseItem.css";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../store/store";

const ExpenseItem = (props) => {
  const { expense } = props;
  // console.log(expense);
  const dispatch = useDispatch();

  const fetchedExpenses = async (id) => {
    try {
      const response = await fetch(
        "https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
      );
      const data = await response.json();
      // console.log(data);
      if (!response.ok) throw new Error(data?.error);

      const targetIndex = data?.expenses.findIndex(
        (expense) => expense.id === id
      );
      return targetIndex;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const deleteExpenseFromFirebase = async (id) => {
    console.log(id);
    try {
      await fetch(
        `https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const editButtonHandler = async (expense, id) => {
    // editExpense by redux.
    dispatch(expenseActions.editExpense(expense));

    // deleteExpense by redux.
    dispatch(expenseActions.deleteExpense(id));

    try {
      const targetIndex = await fetchedExpenses(id);
      deleteExpenseFromFirebase(targetIndex);
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteButtonHandler = async (id) => {
    // deleted by using redux.
    dispatch(expenseActions.deleteExpense(id));
    try {
      const targetIndex = await fetchedExpenses(id);
      deleteExpenseFromFirebase(targetIndex);
    } catch (error) {
      alert(error.message);
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
