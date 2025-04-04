import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";


const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login"); // Redirect to login if not authenticated
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, [navigate]);

  return user;
};

export default useAuth;
