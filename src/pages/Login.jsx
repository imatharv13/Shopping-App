import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { googleLogin, logUser } from '../features/auth/authThunks'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // extracting auth state from redux store
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // local state for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // handles input change (controlled inputs)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch login thunk and unwrap to handle success/error properly
      await dispatch(logUser(formData)).unwrap();
      toast.success("Login successful!");

      // Reset form fields
      setFormData({
        email: '',
        password: '',
      });

      // Navigation will be handled by useEffect when isAuthenticated becomes true

    } catch (error) {
      // Show error message and stay on login page
      toast.error(error || "Login failed. Please try again.");
    }
  };

  // Redirect to Home page when authentication state changes
  // This ensures redirect only happens after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await dispatch(googleLogin()).unwrap();
      toast.success("Google login successful!");
      // Navigation will be handled by useEffect when isAuthenticated becomes true
    } catch (error) {
      toast.error(error || "Google login failed. Please try again.");
    } 
  };


  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600'>
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8">

        {/* heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        {/* error message */}
        {error && (
          <p className="bg-red-500 text-white text-sm p-2 rounded mb-3">
            {error}
          </p>
        )}

        {/* login form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* email input */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Email:
            </label>
            <input 
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email@gmail.com"
              className="w-full px-4 py-2 rounded-lg outline-none"
            />
          </div>

          {/* password input */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Password:
            </label>
            <input 
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg outline-none"
            />
          </div>

          {/* submit button */}
          <button className="w-full bg-white text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-200">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition mt-3"
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}>
        {/* https://www.svgrepo.com/show/475656/google-color.svg */}

        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-6 h-6"/>
        {loading ? 'Processing...' : 'Login with Google'}

      </button>

        </form>

        {/* register link */}
        <p className="text-white text-sm text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="underline font-semibold">
            Register
          </Link>
        </p>

      </div>
      
      
    </div>
  );
}

export default Login
