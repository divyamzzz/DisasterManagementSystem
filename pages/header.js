import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const header=()=>{
    const{user,setUser,logout}=useAuth();
    const navigate=useNavigate();
    const handlelogout=()=>{
        logout();   
        navigate('/');
    }
    return(
        <div className="Header-Section">
            <div className="header-content  h-20  text-black text-3xl font-bold m-2 bg-green-50 rounded-2xl">
                <ul className="flex justify-between p-5">
                    <li>Disater Watch</li>
                    <li>{user?.name?`Hello Welcome to the App ${user?.name}`:`Hello Welcome to the App`}</li>
                     <li className="border-2 cursor-pointer rounded-2xl p-1" onClick={()=>navigate("/userposts")}>Create Post</li>
                    {user!=null&&<li><button className="border-2 cursor-pointer rounded-2xl p-1" onClick={handlelogout}>Logout</button></li>}
                   
                </ul>
                
            </div>
        </div>
    )
}
export default header;