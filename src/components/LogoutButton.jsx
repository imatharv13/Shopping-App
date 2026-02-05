import { useDispatch } from "react-redux";
import { logOutUser } from "../features/auth/authThunks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await dispatch(logOutUser()).unwrap();
            toast.success("Logged out successfully!");
            navigate('/login'); // redirect to login page after logout
        } catch (error) {
            toast.error(error || "Logout failed. Please try again.");
        }   
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
            Logout
        </button>
    );
}
export default LogoutButton;    
