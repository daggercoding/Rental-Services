import {createContext, useState,useEffect} from "react";

export const RandomContext = createContext()

function Context ({children}){

   let [filterData,setFilterData]=useState("")
   let [datac,setData]=useState([])
   let [checkList,setCheckList]=useState([])
   let [login,setLogin]=useState(document.cookie.includes("token"))
   
  useEffect(()=>{
    fetch("http://localhost:8000/getitems")
    .then((resp)=>{
      return resp.json()})
    .then((item)=>{setData([...item.data.reverse()])})
    .catch((err)=>console.log(err.message))
  },[])

   return(
   <>
   <RandomContext.Provider value={{datac,filterData,setFilterData,setCheckList,checkList,login,setLogin}}>
    {children}
   </RandomContext.Provider>
   </>
   )
}
export default Context