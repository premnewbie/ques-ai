import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useProjectStore } from "../store/projectStore";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiVipDiamondLine } from "react-icons/ri";
import { GoBell, GoHome } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { Modal } from "@mui/material";
import EditFile from "../components/EditFile";
import BasicModal from "../components/BasicModal";
import Sidebar from "../components/Sidebar";

const EditPage = () => {
  const { id, fileId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { user, logout } = useAuthStore();
  const { projectName, getProjectFiles, getFile, file, isLoading } = useProjectStore();

  const navigate = useNavigate();

  useEffect(() => {
    getProjectFiles(id);
    getFile(id, fileId);
  }, [getProjectFiles, id, getFile, fileId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 p-2 ml-3">
      <Sidebar user={user} openModal={null} />
      <div className="col-span-3 p-5 ml-75 w-[100%]">
        <div className="flex justify-between">
          <div className="flex gap-2  font-semibold text-gray-600 cursor-pointer">
            <GoHome size={20} />
            <Link to={"/"}>Home Page / </Link>
            <Link to={`/project/${id}`}>{projectName} / </Link>
            <p className="font-bold text-purple-600"> {file.name} </p>
          </div>
          <div className="flex gap-5">
            <div className="text-black p-2 border border-gray-400 rounded-4xl">
              <GoBell />
            </div>
            <div
              className="text-red-500 p-2 border border-gray-400 rounded-4xl"
              onClick={logout}
            >
              <IoIosLogOut />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-2 items-center font-bold text-2xl cursor-pointer">
              <IoArrowBackSharp className="w-11 h-11 p-2 rounded-full hover:bg-gray-200" onClick={() => navigate(`/project/${id}`)} />
              <h1>Edit Transcript</h1>
            </div>
            <div>
              <button
                className="text-white px-5 py-2 bg-black rounded cursor-pointer"
                onClick={openModal}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="p-5 border border-gray-300 rounded-lg shadow-md  mt-10">
            <h3 className="text-purple-700 font-semibold text-xl">Speaker</h3>
            <p className="mt-10 text-wrap">{file.description}</p>
          </div>
        </div>
      </div>
      <BasicModal isOpen={isModalOpen} handleClose={closeModal}>
        <EditFile
          closeModal={closeModal}
          title={file.name}
          description={file.description}
          id={id}
          fileId={fileId}
        />
      </BasicModal>
    </div>
  );
};

export default EditPage;
