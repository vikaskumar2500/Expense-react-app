import { expenseActions } from "../store";

const fetchExpenseData = () => {
  const email = localStorage.getItem("userEmail");
  const modifiedEmail = email
    .replace("@gmail.com", "")
    .replace(".", "")
    .replace("_", "");
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/${modifiedEmail}/expenses.json`
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      return data?.expenses || [];
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
