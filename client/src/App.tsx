import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import Createaccount from "./expense-tracker/components/CreateAccount";
import Login from "./expense-tracker/components/Login";
import { BASE_URL } from "./constant";
import axios from "axios";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    setIsLoading(true);
    axios
      .get(BASE_URL + "Expense")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Function to check if the user is authenticated by token
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/create-account" element={<Createaccount />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <>
              <h1 className="text-center">Expense Tracker</h1>
              <div className="container">
                <div className="mb-5">
                  <ExpenseForm fetchData={fetchExpenses} />
                </div>

                <div className="m-5">
                  <ExpenseFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) => setSelectedCategory(category)}
                  />
                </div>
                <div className="m-5">
                  {error && <p>{error}</p>}
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <ExpenseList
                      expenses={expenses}
                      category={selectedCategory}
                      setExpenseArray={setExpenses}
                      fetchData={fetchExpenses}
                    />
                  )}
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
