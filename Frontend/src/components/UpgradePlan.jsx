import React ,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UpgradePlan.css";
import Upgrade from "./Upgrade";
import axios from "axios";
import { updateProfile } from "../store/userSlice";

const UpgradePlan = () => {
  const user = useSelector((state) => state.user); // assuming you store tenant info here
  const dispatch = useDispatch();
  const role = user.role;
  const [tenant, setTenant] = useState(user.tenant);
  
  
  
  const handleUpgrade = async () => {
    if (role === 'member') return;
    try {
      console.log(tenant);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/tenants/${tenant}/upgrade`,
        {},
        { withCredentials: true }
      );
      setTenant(tenant);
      localStorage.setItem("user", JSON.stringify({ ...user, plan: "pro" }));
      dispatch(updateProfile({plan: "pro" }));
    } catch (err) {
      console.error("Upgrade failed", err);
    }
  };


  return (
    <div className="upgrade-container">
      <Upgrade onUpgrade={handleUpgrade}/>
    </div>
  );
};

export default UpgradePlan;