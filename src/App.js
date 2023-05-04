import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Customer from "./components/Customer";
import Employee from "./components/Employee";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>

    </div>
  );
}

export default App;
