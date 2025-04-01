import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";
import { GoHome } from "react-icons/go";
import { useAuthStore } from "../store/authStore";
import wifi from "../assets/wifi.png";
import youtube from "../assets/youtube.png";
import upload from "../assets/upload.png";
import upload2 from "../assets/upload2.png";
import BasicModal from "../components/BasicModal";
import AddFile from "../components/AddFile";
import { IoIosLogOut } from "react-icons/io";
import { GoBell } from "react-icons/go";
import formatTimestamp from "../assets/helper/formatTimestamp";
import Sidebar from "../components/Sidebar";

const ProjectPage = () => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { projectName, getProjectFiles, fetchingProject, files, deleteFile } =
    useProjectStore();

  const { user, logout } = useAuthStore();

  const navigate = useNavigate();

  const handleDelete = (fileId) => {
    console.log("Handle delete has been called");
    deleteFile(params.id, fileId);
    getProjectFiles(params.id);
  };

  useEffect(() => {
    getProjectFiles(params.id);
  }, [getProjectFiles, params.id]);

  if (fetchingProject) {
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
      <Sidebar user={user} openModal={openModal} />
      <div className="col-span-3 p-5">
        <div className="flex justify-between">
          <div className="flex gap-2  font-semibold text-gray-600 cursor-pointer">
            <GoHome size={20} />
            <Link to={"/"}>Home Page / </Link>
            <p className="text-purple-700 font-bold"> {projectName}</p>
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
        <h1 className="text-3xl font-bold my-5">Add Podcast</h1>
        <div className="grid grid-cols-3 gap-5 m-5">
          <div className="flex shadow-md gap-5 p-3 rounded-xl cursor-pointer border border-gray-300">
            <div>
              <h1 className="font-bold text-2xl">RSS Feed</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit. Dolor lorem sit.
              </p>
            </div>
            <img src={wifi} alt="wifi-icon" className="w-15 h-15" />
          </div>
          <div className="flex shadow-md gap-5 p-3 rounded-xl cursor-pointer border border-gray-300">
            <div>
              <h1 className="font-bold text-2xl">Youtube Video</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit. Dolor lorem sit.
              </p>
            </div>
            <img src={youtube} alt="youtube-icon" className="w-15 h-15" />
          </div>
          <div
            className="flex shadow-md gap-5 p-3 rounded-xl cursor-pointer border border-gray-300"
            onClick={openModal}
          >
            <div>
              <h1 className="font-bold text-2xl">Upload files</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit. Dolor lorem sit.
              </p>
            </div>
            <img src={upload} alt="upload-icon" className="w-15 h-15" />
          </div>
        </div>
        <div className="px-10 py-2 shadow-lg mx-5 mt-30 rounded-lg  border border-gray-300">
          {files?.length > 0 && (
            <>
              <h1 className="font-bold text-xl">Your Files</h1>
              <div className="font-bold grid grid-cols-7 bg-gray-200 text-gray-600 px-3 py-2 mt-2">
                <p>No.</p>
                <p className="col-span-2">Name</p>
                <p className="col-span-2">Upload Date & Time</p>
                <p className="col-span-2">Action</p>
              </div>
            </>
          )}

          {files.length > 0 &&
            files?.map((file, ind) => (
              <div
                key={file._id}
                className="grid grid-cols-7 items-center text-gray-500 px-3 py-2 mt-2 place-content-center h-15 font-bold"
              >
                <p>{ind + 1}</p>
                <p className="col-span-2">{file.name}</p>
                <p className="col-span-2">{formatTimestamp(file.updatedAt)}</p>
                <div className="col-span-2">
                  <button
                    className="rounded-l-lg border border-gray-400 p-1 px-2 cursor-pointer"
                    onClick={() =>
                      navigate(`/project/${params.id}/edit/${file.fileId}`)
                    }
                  >
                    View
                  </button>
                  <button
                    className="rounded-r-lg border text-red-400 border-gray-400 p-1 px-2 cursor-pointer"
                    onClick={() => handleDelete(file.fileId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          {files?.length === 0 && (
            <div
              className="flex flex-col items-center py-5 pb-5 gap-5"
            >
              <img
                src={upload2}
                alt="upload-icon"
                className="w-30 h-30 gap-4"
              />
              <p className="font-semibold text-lg">
                Select a file or drag and drop here (Podcast Media or
                Transcription Text)
              </p>
              <p className="text-gray-500 text-sm">
                MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
              </p>
              <span className="px-5 py-2 border border-purple-700 text-purple-700 font-semibold rounded-4xl">
                Select File
              </span>
            </div>
          )}
        </div>
      </div>
      <BasicModal isOpen={isModalOpen} handleClose={closeModal}>
        <AddFile closeModal={closeModal} />
      </BasicModal>
    </div>
  );
};

export default ProjectPage;
