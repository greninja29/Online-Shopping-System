import React, { useEffect, useState } from "react";
import { db } from "../config/Fireconfig";
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";

export default function Employee() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [quantity, setquantity] = useState(0);

  const inv_ref = collection(db, "inventory");

  const location = useLocation();
  const navigate = useNavigate();
  const handleAddItem = async () => {
    try {
      await addDoc(inv_ref, {
        type: type,
        name: name,
        cost: cost,
        quantity: quantity
      })
      alert("success");
      setCost(0); setName(""); setType(""); setquantity(0);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(location);
    if (location?.state?.userType !== "employee") {
      navigate(`/${location.userType}`);
    }
    if (location.state === null) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div className=" p-4 flex flex-col gap-3">
        <label>Item Type </label>
        <input
          type="text"
          placeholder="Type...."
          className="border rounded border-black"
          onChange={(e) => {
            setType(e.target.value);
          }}
          value={type}
        />
        <br />
        <label>Name</label>
        <input
          type="text"
          placeholder="Name...."
          className="border rounded border-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <br />
        <label>Cost</label>
        <input
          type="text"
          placeholder="cost...."
          className="border rounded border-black"
          onChange={(e) => {
            setCost(e.target.value);
          }}
          value={cost}
        />
        <br />
        <label>Quantity</label>
        <input
          type="text"
          placeholder="Quantity...."
          className="border rounded border-black"
          onChange={(e) => {
            setquantity(e.target.value);
          }}
          value={quantity}
        />
        <br />
        <button className="p-2 bg-cyan-600 rounded text-white" onClick={() => { handleAddItem() }}>
          Add Item
        </button>

      </div>
    </div>
  );
}
