import { useState } from "react";
import youtube from "../assets/youtube.png";
import { useParams } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";

const AddFile = ({ closeModal }) => {

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const params = useParams();
    const {addFile} = useProjectStore();

    const handleUpload = (e) => {
        e.preventDefault();
        addFile(title,description,params.id);
        closeModal();
    }


  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <img
            src={youtube}
            alt="youtube-logo"
            className="w-15 h-15 rounded-[100%]"
          />
          <h1 className="text-2xl font-bold mt-3">Upload From Youtube</h1>
        </div>
        <span
          className="text-2xl p-2 bg-gray-200 font-bold cursor-pointer"
          onClick={closeModal}
        >
          X
        </span>
      </div>
      <div className="mt-3">
        <form onSubmit={handleUpload}>
          <label>Name:</label>
          <input
            type="text"
            value={title}
            className="w-full h-10 border border-gray-400 rounded-md mb-3 p-2"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Transcript:</label>
          <textarea
            type="text"
            value={description}
            className="w-full h-25 border border-gray-400 rounded-md p-2"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end mt-5">
            <button type="submit" className="px-3 p-2 bg-purple-600 font-bold text-white rounded cursor-pointer">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFile;
