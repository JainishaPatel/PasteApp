import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state)=>state.paste.pastes);

  const paste = allPastes.filter((p)=> p._id === id)[0];

  console.log(paste)

  // useEffect(()=>{
  //     if(pasteId){
  //         const paste = allPastes.find((p)=>p._id === pasteId);
  //         setTitle(paste.title);
  //         setvalue(paste.content)
  //     }
  // },[pasteId])

  return (
    <div className="w-full flex justify-center px-4 py-6">
      
      <div className="w-full max-w-5xl">

        {/* Title */}
        <div className="mb-6">
          <input
            className="w-full p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 focus:outline-none"
            type="text"
            value={paste?.title}
            disabled
          />
        </div>

        {/* Textarea Section */}
        <div className="relative">
          
          <button 
            className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
            onClick={() => {
              navigator.clipboard.writeText(paste?.content);
              toast.success("Copied To Clipboard");
            }}
          >
            <i className="fa-regular fa-copy text-white text-sm"></i>
          </button>

          <textarea 
            className="w-full bg-zinc-900 text-white p-5 pr-16 rounded-xl border border-zinc-700 resize-none"
            value={paste?.content}
            disabled
            rows={20}
          />   

        </div>

      </div>
    </div>
  )
}

export default ViewPaste

