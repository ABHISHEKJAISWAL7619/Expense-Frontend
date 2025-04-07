import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  let nameRef = useRef()  
  let emailRef = useRef()
  let passwordRef = useRef()
  let navigate = useNavigate()
  

  const handleSubmit = async(e)=>{
    e.preventDefault()
    // console.log("running")
    let obj = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value
    }
    console.log(obj)

    let res = await fetch('https://expensebackend-x1x7.onrender.com/api/users/create',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(obj)
    })

    let data = await res.json();
    console.log(data)

    if(data.success){
      navigate('/')
      // navigator('/login')
    }
    else{
      alert(data.msg)
    }

  }

  return (
    <div className='h-[100vh] flex items-center bg-slate-900'>
      
    
       

<form className="max-w-sm mx-auto w-[500px]">
  <div className="mb-5">
  <h1 className='font-bold h-18  dark:text-white  ' >Signup page </h1>
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
    <input ref={nameRef} type="text" id="name" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-50 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your name" required />
  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input ref={emailRef} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input ref={passwordRef} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='enter your password' required />
  </div>
 
  <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  <span className='text-white'>Already have a Account <Link to={"/"} >Click here</Link>  </span>
</form>


    </div>
  )
}

export default Signup
