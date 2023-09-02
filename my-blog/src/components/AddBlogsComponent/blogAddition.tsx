import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function BlogAdditionComponent() {
  const[title,setTitle]=useState("");
  const[description,setDescription]=useState("");
  const[author,setAuthor]=useState("");
  const router=useRouter();

  const handleTitle=(e:any)=>{
    setTitle(e.target.value);
  }
  const handleDescription=(e:any)=>{
    setDescription(e.target.value);
  }
  const handleAuther=(e:any)=>{
    setAuthor(e.target.value);
  }

  const handleSubmit=async()=>{
    const response=await fetch('http://localhost:3000/api/postBlogs',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({title,description,author}),
    });
    if(response.ok){
      const data=await response.json();
      router.push('/Home');
    }else{
      throw new Error('failed to create an article');
    }
  };

  return (
    <div className="bg-black p-8 flex-column justify-center items-center h-screen">
        <div className="text-white text-xl my-5">Your Blog</div>
      <div className="bg-white p-8 rounded shadow-md w-100">
        <div className="mb-4">
          <label htmlFor="title" className="text-black block mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="py-2 px-3 w-full rounded border-gray-300"
            onChange={handleTitle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="text-black block mb-1">
            Description:
          </label>
          <textarea
            id="description"
            className="py-2 px-3 w-full h-40 rounded border-gray-300 resize-none"
            onChange={handleDescription}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="text-black block mb-1">
            Author:
          </label>
          <input
            type="text"
            id="title"
            className="py-2 px-3 w-full rounded border-gray-300"
            onChange={handleAuther}
          />
        </div>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Add Blog
        </Button>
      </div>
    </div>
  );
}

