import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);

  const login = (data) => dispatch(loginUser(data));
  const logoutUser = () => dispatch(logout());

  return { user, status, login, logoutUser };
};
