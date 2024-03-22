import { Link } from "react-router-dom"

function SignUP(){
 return(
        <>
        <form action="http://localhost:8000/signup" method="POST" className="flex flex-col w-[50vw] mt-20 border-2 p-10 rounded items-center">
         <h1 className="text-3xl antialiased font-bold ">SignUp</h1>
         <input type="text" name="name" placeholder="Please Enter UserName"/>
         <input type="text" name="email" placeholder="Please Enter Mail"/>
         <input type="password" name="password" placeholder="Please Enter Password"/>
         <button className="bg-black text-white  w-[50%] p-2 rounded mt-4 border-gray-500 border-[0.5px]" type="submit ">SignUP</button>
         <p className="mt-2">Have Account? <Link to="/login" className="text-blue-400"> Please Login</Link></p>
        </form>
        </>
    )
}
export default SignUP