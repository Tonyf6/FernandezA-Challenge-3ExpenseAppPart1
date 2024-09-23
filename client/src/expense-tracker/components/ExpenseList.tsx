import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constant';
import { Expense } from '../../App';
import ExpenseForm from './ExpenseForm';

interface ExpenseListProps {
  expenses: Expense[];
  setExpenseArray: React.Dispatch<React.SetStateAction<Expense[]>>;
  category: string;
  fetchData: () => void;
}

const ExpenseList = ({ expenses, setExpenseArray, category, fetchData }: ExpenseListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentData, setCurrentData] = useState<Expense | null>(null);

  const onDelete = (id: number) => {
    axios
      .delete(`${BASE_URL}/Expense/${id}`)
      .then(() => {
        setExpenseArray(expenses.filter((expense) => expense.id !== id));
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setCurrentData(expense);
  };

  const onSave = () => {
    fetchData();
    setEditingId(null);
  };

  return (
    <>
      {editingId && currentData ? (
        <ExpenseForm fetchData={onSave} currentData={currentData} />
      ) : (
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {category === "All"
              ? expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(expense.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => onEdit(expense)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              : expenses
                  .filter((expense) => expense.category === category)
                  .map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.description}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.category}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(expense.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => onEdit(expense)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>
                {expenses
                  .reduce((acc, expense) => {
                    const amount = typeof expense.amount === 'number' ? expense.amount : parseFloat(expense.amount) || 0;
                    return acc + amount;
                  }, 0)
                  .toFixed(2)}
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default ExpenseList;
