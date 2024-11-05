import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    // Validate that all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      return handleError("All fields are required");
    }

    // Validate password match
    if (password !== confirmPassword) {
      return handleError("Passwords do not match");
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();
      const { success, message, error } = data;

      if (!success) {
        const errorMessage = error?.details?.[0]?.message || message || 'Registration failed';
        handleError(errorMessage);
        throw new Error(errorMessage);
      }

      handleSuccess(message || 'Registered Successfully');
      console.log('Register successful:', data);

      // Redirect to login page after successful registration
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.error('Register error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[350px] p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        <p className="text-center text-gray-600">Create a new account to get started.</p>

        <form onSubmit={registerUser} className="mt-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mr-96" >Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mr-96">Email</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mr-96">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mr-44">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-black"
            />
          </div>

          <button type="submit" className="w-full py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800">
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-black hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
