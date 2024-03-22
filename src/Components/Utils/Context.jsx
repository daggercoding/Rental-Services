import {createContext} from "react";

export const RandomContext = createContext()

function Context ({children}){

   return(
   <>
   <RandomContext.Provider value={{name:"vishal"}}>
    {children}
   </RandomContext.Provider>
   </>
   )
}
export default Context