import { useState } from "react";
import youtube from "../assets/youtube.png";
import { useProjectStore } from "../store/projectStore";

const EditFile = ({ closeModal, id, fileId }) => {
  const { editFile, file } = useProjectStore();
  const [desc, setDesc] = useState(file.description);

  const handleSave = (e) => {
    e.preventDefault();
    editFile(id, fileId, desc);
    closeModal();
  };

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
          className="flex items-center justify-center text-2xl p-2 font-semibold cursor-pointer w-10 h-10 rounded-full hover:bg-gray-300"
          onClick={closeModal}
        >
          <span>X</span>
        </span>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSave}>
          <label className="mb-1">Name</label>
          <input
            type="text"
            value={file.name}
            className="w-full h-10 border border-gray-400 rounded-md mb-3 p-2"
            readOnly
          />
          <label className="mb-1">Transcript</label>
          <textarea
            type="text"
            value={desc}
            className="w-full h-25 border border-gray-400 rounded-md p-2"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <div className="flex justify-end mt-5 gap-3">
            <button
              className="px-3 p-2 bg-red-600 font-bold text-white rounded cursor-pointer"
              onClick={closeModal}
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-3 p-2 bg-purple-600 font-bold text-white rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFile;
