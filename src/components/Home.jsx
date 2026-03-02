import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setvalue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId");

    const dispatch = useDispatch();

    const allPastes = useSelector((state)=>state.paste.pastes)

    useEffect(()=>{
        if(pasteId){
            const paste = allPastes.find((p)=>p._id === pasteId);
            setTitle(paste.title);
            setvalue(paste.content)
        }
    },[pasteId])

    function createPaste(){
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }

        // after creation or updatetion
        setTitle('');
        setvalue('');
        setSearchParams({});

    }

    return (
        <div className="w-full flex justify-center px-4 py-6">
            
            <div className="w-full max-w-5xl">
            
            {/* Title + Button */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
                
                <input
                className="w-full md:flex-1 p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter Title Here"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />

                <button
                onClick={createPaste}
                className="px-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>

            {/* Textarea Section */}
            <div className="mt-6 relative">
                
                <button
                className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                onClick={() => {
                    navigator.clipboard.writeText(value);
                    toast.success("Copied To Clipboard");
                }}
                >
                <i className="fa-regular fa-copy text-white text-sm"></i>
                </button>

                <textarea
                className="w-full bg-zinc-900 text-white p-5 pr-16 rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={value}
                placeholder="Enter Content Here"
                onChange={(e)=>setvalue(e.target.value)}
                rows={20}
                />
            </div>

            </div>
        </div>
    )
}

export default Home
