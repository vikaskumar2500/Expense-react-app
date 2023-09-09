const sendExpenseData = (expenses) => {
  const email = localStorage.getItem("userEmail");
  const modifiedEmail = email
    .replace("@gmail.com", "")
    .replace(".", "")
    .replace("_", "");
  // console.log(modifiedEmail);
  return async (dispatch) => {
    const sendData = async () => {
      const response = await fetch(
        `https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/${modifiedEmail}/expenses.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenses),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
    };

    try {
      await sendData();
      console.log("Sent expense data successfully");
    } catch (error) {
      alert(error.message);
    }
  };
};

export default sendExpenseData;
