import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

const ExpenseTracker = ({ tripId }) => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    category: "",
    description: "",
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, [tripId]);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/expenses/${tripId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data = await response.json();
      setExpenses(data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      showAlert("Failed to load expenses", "error");
    }
  };

  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...newExpense,
          tripId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      showAlert("Expense added successfully", "success");
      setNewExpense({ amount: "", category: "", description: "" });
      fetchExpenses(); // Fetch updated expenses
    } catch (error) {
      console.error("Error adding expense:", error);
      showAlert("Failed to add expense", "error");
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/expenses/${expenseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      showAlert("Expense deleted successfully", "success");
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      showAlert("Failed to delete expense", "error");
    }
  };

  const calculateTotalExpense = () => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    );
  };

  const getMostSpentCategory = () => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] =
        (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {});

    const mostSpent = Object.entries(categoryTotals).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", 0]
    );

    return {
      category: mostSpent[0],
      amount: mostSpent[1],
    };
  };

  const getHighestSingleExpense = () => {
    if (expenses.length === 0) return { amount: 0, category: "" };
    const highest = expenses.reduce(
      (max, curr) => (Number(curr.amount) > Number(max.amount) ? curr : max),
      expenses[0]
    );
    return {
      amount: highest.amount,
      category: highest.category,
    };
  };

  return (
    <div
      id="expense-tracker"
      className="bg-white rounded-lg shadow-md p-6 ml-72 mr-8"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      {alert && (
        <div
          className={`mb-4 ${
            alert.type === "error" ? "bg-red-50" : "bg-green-50"
          } p-2 rounded-md`}
        >
          {alert.message}
        </div>
      )}

      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Expense Tracker
      </h3>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Total Expense Card */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-2">Total Expense</h4>
          <p className="text-2xl font-bold">₹{calculateTotalExpense()}</p>
          <p className="text-sm text-gray-600">total spent on the plan</p>
        </div>

        {/* Most Spent Category Card */}
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-2">Most Spent Category</h4>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold ml-20">
              ₹{getMostSpentCategory().amount}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            {getMostSpentCategory().category}
          </p>
        </div>

        {/* Highest Single Expense Card */}
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-2">Highest Single Expense</h4>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-bold ml-20">
              ₹{getHighestSingleExpense().amount}
            </p>
          </div>
          <p className="text-sm text-gray-600">
            spent on {getHighestSingleExpense().category}
          </p>
        </div>
      </div>

      <form onSubmit={handleAddExpense} className="mb-12">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <select
              name="category"
              value={newExpense.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Food">Food</option>
              <option value="Commute">Commute</option>
              <option value="Shopping">Shopping</option>
              <option value="Gifts">Gifts</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <input
              type="text"
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
        >
          Add Expense
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left pl-11">Amount</th>
              <th className="px-4 py-2 text-left pl-11">Category</th>
              <th className="px-4 py-2 text-left pl-11">Description</th>
              <th className="px-4 py-2 text-left pl-11">Date</th>
              <th className="px-4 py-2 text-left pl-11">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">₹{expense.amount}</td>
                  <td className="border px-4 py-2">{expense.category}</td>
                  <td className="border px-4 py-2">{expense.description}</td>
                  <td className="border px-4 py-2">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteExpense(expense._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
                      aria-label={`Delete expense of ₹${expense.amount} for ${expense.category}`}
                    >
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTracker;
