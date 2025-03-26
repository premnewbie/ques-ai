import React, { useEffect, useState } from "react";
import { useProjectStore } from "../store/projectStore";

const AddProject = ({ closeModal }) => {
  const { addProject } = useProjectStore();
  const [title, setTitle] = useState("");
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setEmpty(false);
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (title === "") {
      setEmpty(true);
      return;
    }
    addProject(title);
    closeModal();
  };

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold mb-5">Create Project</h1>
      <p className="text-gray-600">Enter Project Name:</p>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          className="w-full border border-gray-400 h-15 rounded-lg p-4"
          placeholder="Type Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {empty && <p className="text-red-500">Project name can't be empty</p>}
        <div className="flex gap-2 justify-end items-center mt-10">
          <button
            className="text-red-400 font-semibold bg-gray-200 px-5 py-2 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-700 font-semibold text-white px-5 py-2 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
