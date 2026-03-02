import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

const Pastes = () => {

  const pastes = useSelector((state)=>state.paste.pastes)

  const [searchTerm, setSearchTerm] = useState("")

  const dispatch = useDispatch();

  const filterData = pastes.filter((paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId));
  }

  function formatDate(dateString){
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  function handleShare(paste) {
    const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content.slice(0, 100),
        url: shareUrl,
      })
      .then(() => toast.success("Shared Successfully"))
      .catch(() => toast.error("Sharing Cancelled"));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link Copied to Clipboard");
    }
  }

  return (
    <div className="w-full flex justify-center px-4 py-6">
      
      <div className="w-full max-w-5xl">

        {/* Search Input */}
        <input
          className="w-full p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
        />

        {/* Paste Cards */}
        {/* All Pastes Section */}
        <div className="mt-8">

          <h2 className="text-3xl font-bold text-white mb-6">
            All Pastes
          </h2>

          <div className="flex flex-col gap-6">
            {
              filterData.length > 0 ? (
                filterData.map((paste) => (
                  
                  <div
                    key={paste?._id}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 shadow-md"
                  >

                    {/* Top Row: Title + Actions */}
                    <div className="flex justify-between items-start gap-4">

                      {/* Title */}
                      <h2 className="text-lg font-semibold text-white break-words">
                        {paste.title}
                      </h2>

                      {/* Action Icons */}
                      <div className="flex items-center gap-2">

                        <a
                          href={`/?pasteId=${paste?._id}`}
                          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-blue-500 transition"
                          title="Edit"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </a>

                        <a
                          href={`/pastes/${paste?._id}`}
                          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-green-500 transition"
                          title="View"
                        >
                          <i className="fa-regular fa-eye"></i>
                        </a>

                        <button
                          onClick={()=>handleDelete(paste?._id)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-red-500 transition"
                          title="Delete"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>

                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(paste?.content)
                            toast.success("Copied To Clipboard")
                          }}
                          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 transition"
                          title="Copy"
                        >
                          <i className="fa-regular fa-copy"></i>
                        </button>

                        <button
                          onClick={() => handleShare(paste)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-purple-500 transition"
                          title="Share"
                        >
                          <i className="fa-solid fa-share-nodes"></i>
                        </button>

                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-gray-400 mt-3 line-clamp-2 break-words text-left">
                      {paste.content}
                    </p>

                    {/* Date */}
                    <div className="text-xs text-gray-500 mt-4 text-right">
                      {formatDate(paste.createdAt)}
                    </div>

                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-10">
                  No Pastes Found
                </div>
              )
            }
          </div>

        </div>

      

      </div>
    </div>
  )
}

export default Pastes
