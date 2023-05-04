import React, { useEffect, useState } from "react";
import { db } from "../config/Fireconfig";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const Manager = () => {
  const [items, setItems] = useState([]);
  const [updatedCost, setUpdatedCost] = useState(0);
  const itemsRef = collection(db, "inventory");

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

  const handleUpdate = async (id) => {
    const itemDoc = doc(db, "inventory", id);
    try {
      await updateDoc(itemDoc, {
        cost: updatedCost,
      });
      setUpdatedCost(0);
      document.getElementById("cost-id").value = "";
      getItems();

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const itemDoc = doc(db, "inventory", id);
    try {
      await deleteDoc(itemDoc);
      getItems();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();

    if (location?.state?.userType !== "manager") {
      navigate(`/${location.userType}`);
    }
    if (location.state === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="space-y-4 grid grid-cols-2  p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-sky-900 m-4 rounded text-white p-4 flex space-x-5 items-start"
        >
          <div className="px-2 space-y-2">
            <h1 className="text-2xl font-bold">{item.type}</h1>
            <h1>{item.name}</h1>
            <h1>₹{item.cost}</h1>
            <h1 className="font-bold">Item id :-</h1>
            <h1>{item.id}</h1>
          </div>
          <div className="px-4 space-y-2">
            <h1 className="font-bold">Update details:</h1>
            <h1>update cost:</h1>
            <input
              id="cost-id"
              type="number"
              className="border-2 border-slate-600 rounded p-2 text-black"
              placeholder="newCost...."
              onChange={(e) => setUpdatedCost(e.target.value)}
            />
            <br />
            <button
              onClick={() => handleUpdate(item.id)}
              className="bg-yellow-600 font-bold p-1 rounded"
            >
              update
            </button>
            <button onClick={() => handleDelete(item.id)} className="ml-3 p-1 bg-red-600 rounded">Delete Item</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Manager;
