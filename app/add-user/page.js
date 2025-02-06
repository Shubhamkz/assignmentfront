"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddUser = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `https://assignmentback-pdc2.onrender.com/artists`,
        {
          name: name,
        }
      );

      if (res.data.success) {
        alert("User Added Successfully");
        router.push("/");
      } else {
        alert("Failed to add user");
      }
    } catch (error) {
      alert(
        `Error occurred while posting artist ${
          error.message || error.data.message
        }`
      );
      console.log(
        `Error occurred while posting artist ${
          error.message || error.data.message
        }`
      );
    }
  };

  return (
    <div className="flex justify-center items-center mt-40 flex-col">
      <h1 className="font-bold text-2xl text-gray-700 "> Artist Name </h1>
      <input
        onChange={(e) => setName(e.target.value)}
        className="w-96 bg-white border-2 border-gray-800 px-6 py-3"
      ></input>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Add{" "}
      </button>
    </div>
  );
};

export default AddUser;
