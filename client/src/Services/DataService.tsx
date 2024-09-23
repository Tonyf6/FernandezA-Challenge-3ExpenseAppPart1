const BASE_URL = 'http://localhost:5281/api/'; // Replace with your actual backend API URL

const DataServices = {
  // Create a new account
  createAccount: async (data: { username: string, email: string, password: string }) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create account');
    }
    return response.json();
  },

  // Login to the account
  login: async (data: { email: string, password: string }) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json(); // Return token and user data
  },

  // Fetch all expenses
  fetchExpenses: async () => {
    const response = await fetch(`${BASE_URL}/Expense`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    return response.json(); // Expected to return the list of expenses
  },

  // Create a new expense
  createExpense: async (expense: { description: string; amount: number; category: string }) => {
    const response = await fetch(`${BASE_URL}/Expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error('Failed to create expense');
    }
    return response.json();
  },

  // Update an existing expense
  updateExpense: async (id: number, updatedExpense: { description: string; amount: number; category: string }) => {
    const response = await fetch(`${BASE_URL}/Expense/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedExpense),
    });
    if (!response.ok) {
      throw new Error('Failed to update expense');
    }
    return response.json();
  },

  // Delete an expense
  deleteExpense: async (id: number) => {
    const response = await fetch(`${BASE_URL}/Expense/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete expense');
    }
    return response.json(); // Optionally return success message
  },
};

export default DataServices;
