import {createContext, useState} from "react";

export const RandomContext = createContext()

function Context ({children}){
   // let [login,setLogin]=useState(document.cookie.includes("token"))
   let [login,setLogin]=useState(localStorage.getItem("token")?true:false)
   let [count,setCount]=useState(0)
   let [name,setName] = useState("")
   return(
   <>
   <RandomContext.Provider value={{login,setLogin,count,setCount,name,setName}}>
    {children}
   </RandomContext.Provider>
   </>
   )
}
export default Context