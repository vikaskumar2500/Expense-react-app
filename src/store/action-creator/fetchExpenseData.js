import { expenseActions } from "../store";

const fetchExpenseData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // console.log(data);
      return data.expenses || [];
    };

    try {
      const expenses = await fetchData();
      dispatch(expenseActions.replaceExpense(expenses));
    } catch (error) {
      alert(error.message);
    }
  };
};

export default fetchExpenseData;
