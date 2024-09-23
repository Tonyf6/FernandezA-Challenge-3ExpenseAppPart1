import axios from "axios";
import { useState, useEffect } from "react";
import categories from "../categories";
import { BASE_URL } from "../../constant";
import { Expense } from "../../App";

interface ExpenseFormProps {
  fetchData: () => void;
  currentData?: Expense;
}

const ExpenseForm = ({ fetchData, currentData }: ExpenseFormProps) => {
  const [expense, setExpense] = useState({
    id: currentData?.id || 0,
    description: currentData?.description || '',
    amount: currentData?.amount || '',
    category: currentData?.category || ''
  });

  useEffect(() => {
    if (currentData) {
      setExpense({
        id: currentData.id,
        description: currentData.description,
        amount: currentData.amount,
        category: currentData.category,
      });
    }
  }, [currentData]);

  const handleSubmit = () => {
    if (expense.id) {
      // Editing existing expense
      axios.put(`${BASE_URL}/Expense/${expense.id}`, expense)
        .then(() => {
          fetchData();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      // Adding a new expense
      axios.post(`${BASE_URL}/Expense/`, expense)
        .then(() => {
          fetchData();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          id="description"
          type="text"
          className="form-control"
          value={expense.description}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          id="amount"
          type="number"
          className="form-control"
          value={expense.amount}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
          id="category"
          className="form-select"
          value={expense.category}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        type="button"
        className="btn btn-outline-primary"
      >
        {expense.id ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default ExpenseForm;
