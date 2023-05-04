import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="dark:bg-gray-800 flex justify-center p-3">
      <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white" >
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
        SUPER-MARKET AUTOMATION SOFTWARE
      </a>
      {/* <div className="bg-cyan-600 p-4 flex justify-between text-white font-bold">
        <div className="text-2xl">SuperMarket Automation Software</div>
        <div className=" space-x-3">
          <Link className="bg-black p-2 rounded" to="/">
            home
          </Link>
          <Link className="bg-black p-2 rounded" to="customer">
            customer
          </Link>
          <Link className="bg-black p-2 rounded" to="employee">
            employee
          </Link>
          <Link className="bg-black p-2 rounded" to="manager">
            manager
          </Link>
        </div>
      </div> */}
      {/* <div className="b p-3 text-3xl font-bold text-white">SUPER-MARKET AUTOMATION SOFTWARE</div> */}
    </div >
  );
}
