import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from "../config/Fireconfig";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import Cart from "./Cart";
import itemsImages from '../assets/items.json'

export default function Customer() {
  const [items, setItems] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(0);

  const [cartState, setCartState] = useState(false);
  const [cartList, setCartList] = useState([]);

  // const [totalItems,setTotalItems] = useState(0);
  // const [totalCost,setTotalCost] = useState(0);  

  const [key, setKey] = useState("");
  const itemsRef = collection(db, "inventory");

  const [fruits, setFruits] = useState(itemsImages.itemsImages);

  const location = useLocation();
  const navigate = useNavigate();

  const getItems = async () => {
    const data = await getDocs(itemsRef);
    // console.log(typeof data);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setItems(filteredData);
  };

  const handleSearch = () => {
    let searchResult = items.filter((item) => item.name === key);
    setSearchResult(searchResult);
    setKey("")
  };

  const handleAddToCart = async (item) => {
    const itemDoc = doc(db, "inventory", item.id);
    try {
      if ((item.quantity - cartQuantity) >= 0) {
        await updateDoc(itemDoc, {
          quantity: item.quantity - cartQuantity,
        });
        let temp = { name: item.name, quantity: cartQuantity, cost: item.cost * cartQuantity }
        let arr = cartList;
        arr.push(temp);
        setCartList(arr)
        getItems();
        setSearchResult([]);
        alert("item added to cart");
      }
      else {
        alert("The entered quantity not available")
      }
    }
    catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    getItems();
    console.log(location);
    if (location?.state?.userType !== "customer") {
      navigate(`/${location.userType}`);
    }
    if (location.state === null) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>
        <div className="bg-black p-4 flex justify-between" >
          <div className=" text-white">
            <label>Give name of item</label>
            <input
              onChange={(e) => setKey(e.target.value)}
              type="text"
              className="border-2 rounded mx-4 text-black"
              value={key}
            />
            <button
              onClick={() => handleSearch()}
              className="bg-gray-500 p-3 rounded"
            >
              Search
            </button>
          </div>
          <div className="">
            <button className="p-2 rounded bg-yellow-600 text-white font-bold" onClick={() => setCartState(!cartState)}>Cart</button>
          </div>
        </div>
        <div className="p-4 bg-gray-500 ">
          {/* <Cart state={cartState} list={cartList} cost={totalCost} items={totalItems} /> */}
          <Cart state={cartState} list={cartList} setList={setCartList} />
          <span className="font-bold">Search results....</span>
          <br />
          <div className="space-y-2 space-x-2 grid grid-cols-2">
            {searchResult?.map((item) => (
              <div className="p-4 rounded bg-sky-900 text-white ">
                <div>
                  <h1 className="text-5xl font-bold pb-4">{item.type}</h1>
                  <span className="mr-2">{item.name}</span>
                  <span className="p-2">₹{item.cost}</span>
                  <div>
                    <label>Available Quantity : </label>
                    <span>{item.quantity}</span>
                  </div>
                </div>
                <div className="py-4">
                  <h1>Enter the required quantity : </h1>
                  <input
                    className="rounded my-2 py-2 text-black"
                    type="number"
                    onChange={(e) => setCartQuantity(e.target.value)}
                    placeholder="quantity...."
                  />
                  <button
                    className="inline bg-yellow-500 text-black p-2 rounded mx-3"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 grid grid-cols-3 gap-3">
          {items.map((item) => (
            <div className=" flex flex-wrap items-start bg-sky-900 p-4 rounded text-white gap-4">
              <div className="bg-sky-900 p-4 rounded text-white space-y-2">
                <h1 className="text-3xl font-bold">{item.type}</h1>
                <h1>{item.name}</h1>
                <h1>₹{item.cost}</h1>
                <span>available Quanity:</span>
                <h1>{item.quantity}</h1>
              </div>
              <div className="">
                {fruits.map((element) => {
                  if (item.name.toLowerCase() === element.name.toLowerCase()) {
                    console.log(item.name)
                    return (<div>
                      <img src={element.image} alt="" className="object-scale-down h-40 w-40 rounded-3xl" />
                    </div>)
                  } else {
                    console.log("else")
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
