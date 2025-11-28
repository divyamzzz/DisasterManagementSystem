import React,{useContext,createContext,useState, useEffect} from "react";
import axios from "axios";
import Base_URl from "../url";
import { useNavigate } from "react-router-dom";
const AuthContext=createContext();

export const AuthProvider=({children})=>{
   
    const [user,setUser]=useState(null);
    
     useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored userDetails:", e);
        localStorage.removeItem("userDetails");
      }
    }
  }, []);
    const login=async(email,password)=>{
        try{
        const payload={
            email:email,
            password:password
        }
        const res= await axios.post(`${Base_URl}/Login/login`,payload)
        if(res.status===200){
        setUser(res.data);
      localStorage.setItem("userDetails", JSON.stringify(res.data));
        return {success:true};
        }
        else{
            return {success:false,message:"Login Failed"};
        }
    
     } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        message: err?.response?.data?.message || "Something went wrong",
      };
    } finally {
      
    }
    };
    const logout=()=>{
        setUser(null);
        localStorage.removeItem("userDetails");
       
    }
    const value={
        user,
        setUser,
        login,logout
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);