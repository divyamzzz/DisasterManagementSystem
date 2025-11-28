import React, { Children } from "react"
import ReactDOM from "react-dom/client"
import Header from "./pages/header.js"
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"
import Body from "./pages/Body.js"
import Login from "./pages/Login.js"
import { AuthProvider } from "./context/AuthContext.js"
import UserPosts from "./pages/UserPosts.js"
const App=()=>{
    return(
        <div className="app">
            
            <Header/>
            <Outlet/>
           
        </div>
    )
}
const router=createBrowserRouter(
    [
        {
            path:"/",
            element:<App/>,
            children:[
                {
                    path:"/",
                    element:<Login/>
                },
                {
                    path:"/home",
                    element:<Body/>
                },
                {
                    path:"/userposts",
                    element:<UserPosts/>
                }
            ]
        }
    ]
) 

const root=ReactDOM.createRoot(document.getElementById("root"))
root.render(
<AuthProvider><RouterProvider router={router}/>
</AuthProvider>)