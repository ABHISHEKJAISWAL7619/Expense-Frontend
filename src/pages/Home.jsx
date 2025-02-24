import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'antd';

const Home = () => {

  const [clicked, setclicked] = useState(false); 
  const [arr, setArr] = useState([]); //[{},{}]
  const [selectedId, setselectedId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  let updatedNameRef = useRef()
  let updatedDateRef = useRef()
  let updatedPriceRef = useRef()
  let snoRef = useRef(); //document.getElementbyId('input')
  let placeRef = useRef();
  let priceRef = useRef();
  let dateRef = useRef();
  let headingRef = useRef()

  let user = JSON.parse(localStorage.getItem('expenseLogin'))
  
  // console.log(selectedId)


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async() => {

    let obj = {};
    if(updatedDateRef.current.value){
      obj.date = updatedDateRef.current.value
    }
    if(updatedNameRef.current.value){
      obj.expenseName = updatedNameRef.current.value
    }
    if(updatedPriceRef.current.value){
      obj.price = updatedPriceRef.current.value
    }

    // console.log(obj)
    // let obj = {
    //   expenseName : updatedNameRef.current.value,
    //   price: updatedPriceRef.current.value, 
    //   date:updatedDateRef.current.value 
    // }
    

    let res = await axios.put(`https://expensebackend-x1x7.onrender.com/api/expense/update/${selectedId}`,obj);
    let data = res.data;
    console.log(data)
    getData()

    updatedDateRef.current.value = "";
    updatedPriceRef.current.value = "";
    updatedNameRef.current.value = "";
    setIsModalOpen(false);
  };

 


  // console.log(user)



    const handleSubmit = async(e)=>{
        e.preventDefault()
     
        let obj={
         
            expenseName:placeRef.current.value,
            price:priceRef.current.value,
            date:dateRef.current.value,
            userId:user._id
        }

        console.log(obj)
        let res = await axios.post('https://expensebackend-x1x7.onrender.com/api/expense/create',obj);
        let data = res.data;
        // console.log(data)
        setclicked(!clicked)
        snoRef.current.value = ""
        placeRef.current.value = ""
        priceRef.current.value = ""
        dateRef.current.value = ""
        // getData()
        // console.log(headingRef.current.innerHTML)
      
        // console.log(e.target)
        // console.log("running")
    }
   

    const getData = async()=>{
      let res = await axios.get(`https://expensebackend-x1x7.onrender.com/api/expense/getexpense/${user._id}`);
      let data = res.data
      // console.log(data.expenses) //[{}. {}]
      setArr(data.expenses)
    }



    const handleUpdate = (ans,i)=>{
      // console.log(ans)
      setselectedId(ans._id)
      // console.log(i)
      showModal()
    }

    const handleDelete = async(ans)=>{
     let id = ans._id
      let res = await axios.delete(`https://expensebackend-x1x7.onrender.com/api/expense/delete/${id}`)
      let data = res.data
      // console.log(data)
      getData()

    }

    const [searchvalue, setsearchvalue] = useState(""); //s
    const handleSearchChanger = (e)=>{
      // console.log(e.target.value)
      let value = e.target.value //s
      setsearchvalue(value)
    }

    // console.log(arr)
    let filteredExpense;  //undefined
    if(searchvalue){
     filteredExpense = arr.filter((ele)=>ele.expenseName.toLowerCase().includes(searchvalue.toLowerCase()));
    // console.log(filteredExpense)
    }
    else{
      filteredExpense = arr  
    }

    console.log(filteredExpense) //[{},{},{},{}]


    
    useEffect(()=>{

      getData()
    },[clicked])

   
    const [seletctedId, setseletctedId] = useState("");
    const [seletctedObj, setseletctedObj] = useState("");

    console.log(seletctedObj)
    console.log(selectedId)

    const handleDoubleClick = (ans,i)=>{
      // console.log(ans,i)
      setseletctedId(ans._id);
      setseletctedObj(ans)

    }
  

    const handleInputChange = (e)=>{
      console.log(e.target.value)
      setseletctedObj({...seletctedObj , [e.target.name]:e.target.value })

    }
  return (
    <div>
      {/* <h1 ref={headingRef}>This is Home page</h1> */}

   

      <form
  action=""
  className="bg-black my-3 p-5 flex flex-wrap justify-center gap-4 max-w-full mx-auto rounded-md"
>
  <input
    ref={snoRef}
    className="py-2 px-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/6"
    type="number"
    placeholder="Enter sno"
  />
  <input
    ref={placeRef}
    className="py-2 px-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/6"
    type="text"
    placeholder="Enter a place"
  />
  <input
    ref={priceRef}
    className="py-2 px-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/6"
    type="number"
    placeholder="Enter a price"
  />
  <input
    ref={dateRef}
    className="py-2 px-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/6"
    type="date"
  />
  <button
    onClick={handleSubmit}
    className="bg-blue-500 py-2 px-6 rounded-md text-white w-full sm:w-1/3 md:w-1/4 lg:w-1/6"
  >
    Add Item
  </button>
</form>

<div className="my-4 bg-red-400 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto p-2 rounded-md">
  <input
    onChange={handleSearchChanger}
    type="text"
    className="w-full border border-yellow-400 py-2 px-4 rounded-md"
    placeholder="Filter expense using place..."
  />
</div>

<div className="relative overflow-x-auto">
  <table className="min-w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 py-3">Sno</th>
        <th scope="col" className="px-4 py-3">Place</th>
        <th scope="col" className="px-4 py-3">Price</th>
        <th scope="col" className="px-4 py-3">Date</th>
        <th scope="col" className="px-4 py-3"></th>
      </tr>
    </thead>
    <tbody>
      {filteredExpense.map((ele, i) => (
        ele._id === seletctedId ? (
          <tr key={ele._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {i + 1}
            </th>
            <td className="py-4">
              <input
                name="expenseName"
                onChange={handleInputChange}
                type="text"
                className="w-full px-2 py-1 border rounded"
              />
            </td>
            <td className="py-4">
              <input
                name="price"
                onChange={handleInputChange}
                type="text"
                className="w-full px-2 py-1 border rounded"
              />
            </td>
            <td className="py-4">
              <input
                name="date"
                onChange={handleInputChange}
                type="date"
                className="w-full px-2 py-1 border rounded"
              />
            </td>
            <td className="py-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleDelete(ele)}
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => handleUpdate(ele, i)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                Update
              </button>
            </td>
          </tr>
        ) : (
          <tr key={ele._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              onDoubleClick={() => handleDoubleClick(ele, i)}
              scope="row"
              className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {i + 1}
            </th>
            <td onDoubleClick={() => handleDoubleClick(ele, i)} className="py-4">
              {ele.expenseName}
            </td>
            <td onDoubleClick={() => handleDoubleClick(ele, i)} className="py-4">
              {ele.price}
            </td>
            <td onDoubleClick={() => handleDoubleClick(ele, i)} className="py-4">
              {ele.date}
            </td>
            <td className="py-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleDelete(ele)}
                className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => handleUpdate(ele, i)}
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
              >
                Update
              </button>
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
</div>



<div>
  <Modal
    title="Update Expense Details"
    open={isModalOpen}
    onCancel={handleCancel}
    onOk={handleOk}
  >
    <div className="flex flex-col gap-4">
      <label htmlFor="expenseName" className="text-sm font-medium">
        Expense Name
      </label>
      <input
        id="expenseName"
        ref={updatedNameRef}
        className="w-full py-2 px-4 border outline-none border-blue-950 rounded-md"
        type="text"
        placeholder="Enter the expense name to update.."
      />
      <label htmlFor="price" className="text-sm font-medium">
        Price
      </label>
      <input
        id="price"
        ref={updatedPriceRef}
        className="w-full py-2 px-4 border outline-none border-blue-950 rounded-md"
        type="number"
        placeholder="Enter the price to update"
      />
      <label htmlFor="date" className="text-sm font-medium">
        Date
      </label>
      <input
        id="date"
        ref={updatedDateRef}
        className="w-full py-2 px-4 border outline-none border-blue-950 rounded-md"
        type="date"
      />
    </div>
  </Modal>
</div>




    </div>
  )
}

export default Home
