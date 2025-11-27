import React, { Children } from "react"
import ReactDOM from "react-dom/client"
import Header from "./pages/header.js"
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"
import Body from "./pages/Body.js"
import Login from "./pages/Login.js"
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
                }
            ]
        }
    ]
) 

const root=ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router}/>)