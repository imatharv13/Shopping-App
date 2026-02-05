import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux' // redux hooks
import {registerUser, googleLogin, logOutUser} from '../features/auth/authThunks' // async thunk for register
import {clearAuthError} from '../features/auth/authslice' // action to clear error
import {Link, useNavigate} from 'react-router-dom' // routing helpers
import { toast } from 'react-toastify' // toast notification

const Register = () => {

  const dispatch = useDispatch(); // to dispatch redux actions
  const navigate = useNavigate(); // to navigate programmatically

  // extracting auth state from redux store
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // local state for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // This useEffect is not needed for registration flow
  // Registration redirects to login page directly after success
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);

  // handles input change (controlled inputs)
  // ❗ removed clearAuthError from here to avoid input reset issue
  const handleChange = (e) => {
    setFormData({
      ...formData, // keep previous values
      [e.target.name]: e.target.value, // update specific field
    });
  };

  // handles form submission
  const handleSubmit = async (e) => {
  e.preventDefault(); // prevent page reload

  try {
    // Dispatch registration thunk - creates account but doesn't log user in
    await dispatch(registerUser(formData)).unwrap();

    // Show success message
    toast.success("Registration successful! Please login with your credentials.");

    // Reset form fields
    setFormData({
      name: '',
      email: '',
      password: '',
    });

    // Redirect to login page after successful registration
    // User must manually login after creating account
    navigate('/login');

  } catch (error) {
    // Show error message and stay on registration page
    toast.error(error || "Registration failed. Please try again.");
  }
};

  const handleGoogleLogin = async () => {
    try {
      await dispatch(googleLogin()).unwrap();
      // For registration flow, sign out immediately after Google auth
      // so user needs to login manually
      await dispatch(logOutUser()).unwrap();
      toast.success("Account created with Google! Please login.");
      // redirect to login page
      navigate('/login');
    } catch (error) {
      toast.error(error || "Google registration failed. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600'>
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8">

        {/* heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>

        {/* error message */}
        {error && (
          <p className="bg-red-500 text-white text-sm p-2 rounded mb-3">
            {error}
          </p>
        )}

        {/* registration form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* name input */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Full Name:
            </label>
            <input 
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg outline-none"
            />
          </div>

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
            {loading ? 'Creating Account' : 'Register'}
          </button>

          <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition mt-3"
    type="button"
    onClick={handleGoogleLogin}
    disabled={loading}>
        {/* https://www.svgrepo.com/show/475656/google-color.svg */}
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-6 h-6"/>
        {loading ? 'Processing...' : 'Sign up with Google'}
      </button>

        </form>

        {/* login link */}
        <p className="text-white text-sm text-center mt-6">
          Already have an account ?{" "}
          <Link to="/login" className="underline font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;



// login page 
// 1 same as reg and navigate to reg page for create an account 

