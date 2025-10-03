import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  }, []);

  return <div>Logging in with Google...</div>;
};

export default GoogleSuccess;
