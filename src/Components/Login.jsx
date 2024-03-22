import { useState} from "react"


function Login(){

    const [toggle, setToggle] = useState(false);
    
    function handleSign(){
        setToggle(!toggle);
    }
    

    return(
        <>
        {!toggle?(
        <form action="http://localhost:8000/login" method="POST" className="flex flex-col w-[50vw] mt-4 border-2 p-10 rounded items-center " >
         <h1 className="text-3xl antialiased font-bold">LOGIN</h1>
         <input type="text" name="name" placeholder="UserName"/>
         <input type="password" name="password" placeholder="Password"/>
         <button className="bg-black text-white w-[80%] p-2 rounded mt-4" type="submit">Login</button>
         <p className="mt-2">Dont't Have Account? <a className="text-blue-400"  onClick={handleSign}> Please SignUp</a></p>
        </form>
        ):(
        <form action="http://localhost:8000/signup" method="POST" className="flex flex-col w-[50vw] mt-4 border-2 p-10 rounded items-center">
         <h1 className="text-3xl antialiased font-bold  ">SignUp</h1>
         <input type="text" name="name" placeholder="Please Enter UserName"/>
         <input type="text" name="email" placeholder="Please Enter Mail"/>
         <input type="password" name="password" placeholder="Please Enter Password"/>
         <button className="bg-black text-white w-[80%] p-2 rounded mt-4" type="submit ">SignUP</button>
         <p className="mt-2">Have Account? <a className="text-blue-400" onClick={handleSign}> Please Login</a></p>
        </form>
        )};
        </>
    )
}
export default Login