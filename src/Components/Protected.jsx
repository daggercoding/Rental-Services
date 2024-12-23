import React, { useEffect } from 'react'
import { useContext } from 'react'
import { RandomContext } from './Utils/Context'
import { useNavigate } from 'react-router-dom'


const Protected = ({Children}) => {
  let{login} = useContext(RandomContext)

  const Navigate = useNavigate()

    // useEffect(()=>{
    //   if(!login){
    //     Navigate("/login")
    //   }
    // },[Navigate])
   //vishal changes for netlify
    useEffect(()=>{
      if(!login){
        Navigate("/login")
      }
    },[Navigate,login])

  return (
    <Children/>
  )
}

export default Protected
