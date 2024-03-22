import {createContext} from "react";
import { useState } from "react";

export const RandomContext = createContext()

function Context ({children}){

let [loginForm,setLoginForm]=useState(false)

   return(
   <>
   <RandomContext.Provider value={{loginForm,setLoginForm}}>
    {children}
   </RandomContext.Provider>
   </>
   )
}
export default Context