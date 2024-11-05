import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const { success, message, jwtToken, name } = data;

      if (!success) {
        handleError(message || 'Login failed');
        throw new Error(message || 'Login failed');
      }

      handleSuccess(message || 'Login Successfully');
      
      // Store token and name in localStorage
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('name', name);

      console.log('Login successful:', data);

      // Navigate to the dashboard after a short delay
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div style={{boxshadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"}} className="flex items-center justify-center min-h-screen">
      <div className="w-[350px] p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <p className="text-center text-gray-600">Enter your email and password to access your account.</p>

        <form onSubmit={loginUser} className="mt-6">
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

          <button type="submit" className="w-full py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800">
            Log in
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-black hover:underline">
            Register
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}
