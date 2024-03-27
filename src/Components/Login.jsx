import { Link } from "react-router-dom"

function Login(){
    return(  
        <form  action="http://localhost:8000/login" method="POST" className="flex flex-col w-[50vw] mt-20 border-2 p-10 rounded items-center " >
         <h1 className="text-3xl antialiased font-bold">LOGIN</h1>
         <input type="text" name="name" placeholder="UserName"/>
         <input type="password" name="password" placeholder="Password"/>
         <button className="bg-black text-white w-[50%] p-2 rounded mt-4 border-gray-500 border-[0.5px] " type="submit">Login</button>
         <p className="mt-2">Dont't Have Account? <Link to="/signup" className="text-blue-400"> Please SignUp</Link></p>
        </form>
    )
}
export default Login