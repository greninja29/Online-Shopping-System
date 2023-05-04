import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'; 

// import {useUpdateEffect} from 'react-use';
const Cart = (props) => {
     
    const [totalItems,setTotalItems] = useState(0);
    const [totalCost,setTotalCost] = useState(0); 
    
    const generateBill = () =>{
      const doc = new jsPDF();
      const tableColumn = ["Name", "quantity", "cost"];
      const tableRows = [];  
      
      props.list.forEach((item)=>{
        const dataRow = [item.name,item.quantity,item.cost];
        tableRows.push(dataRow);
      });
      
      doc.setFontSize(16);
      doc.text("---------------------------------------------Bill--------------------------------------------",10,10);
      doc.setFontSize(10);      
      doc.text(`Number Of Items: ${totalItems}`, 10, 20);      
      const tableendpos = doc.autoTable(tableColumn,tableRows,{startY:30}).autoTableEndPosY();
      doc.text(`Total Cost: ${totalCost}`,10,tableendpos+20);
      doc.save("my-pdf-document.pdf");
      props.setList([]);
    }

    // useEffect(()=>{
    //   let num = props.list.length;
    //   let sum=0;
    //   props.list.forEach(element => {
    //     sum=sum+element.cost;
    //   });
    //   setTotalCost(sum);
    //   setTotalItems(num);
    // },[])

    
        //InfiniteExecution

    useEffect(()=>{
      let num = props.list.length;
      let sum=0;
      props.list.forEach(element => {
        sum=sum+element.cost;
      });
      setTotalCost(sum);
      setTotalItems(num);
    })


  return (
    <div className={props.state===true?"":"hidden"} >
      <div className='p-2 absolute inset-y-40 right-0 bg-gray-800 h-fit w-1/3 mr-5 rounded'>
        <h1 className='font-bold text-white text-2xl p-3'>Cart Items...</h1>
        <div className='space-y-3'>
         {props.list.map((item)=>(
          <div className='bg-yellow-600 m-2 text-white rounded p-2'>
              <div className=' font-bold'>
                {item.name}
              </div>
              <div>
                {item.quantity}
              </div>
              <div>
                ₹{item.cost}
              </div>
          </div>
         ))}
        </div>
        <div className='text-white p-2'>
          <div>
            <h1>
              summary....
            </h1>
            <div>
              <label >Total Quantity : </label>
              <span>{totalItems}</span>
            </div>
            <div>
              <label >Total Cost : </label>
              <span>{totalCost}</span>
            </div>
          </div> 
        </div>
        <div className='flex items-center justify-center mt-3'>
           <button onClick={()=>generateBill()} className='bg-blue-700 text-white font-bold p-2 rounded'>Buy and print bill</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
