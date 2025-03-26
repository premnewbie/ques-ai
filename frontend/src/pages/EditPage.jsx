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

const EditPage = () => {
  const { id, fileId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { user, logout } = useAuthStore();
  const { projectName, getProjectFiles, getFile, file } = useProjectStore();

  const navigate = useNavigate();

  useEffect(() => {
    getProjectFiles(id);
    getFile(id, fileId);
  }, [getProjectFiles, id, getFile, fileId]);

  return (
    <div className="grid grid-cols-4 p-2 ml-3">
      <div className="flex flex-col h-[95vh] justify-between">
        <div className="flex flex-col gap-10">
          <h2 className="text-purple-800 text-2xl font-bold ml-5">Ques.AI</h2>
          <div className="shadow-md font-semibold">
            <p className="text-purple-800 flex gap-2 my-10 ml-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add your Podcast(s)
            </p>
            <p className="flex gap-2 mb-10 ml-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Create & Repurpose
            </p>
            <p className="flex gap-2 mb-10 ml-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
                />
              </svg>
              Podcast Widget
            </p>
            <p className="flex gap-2 mb-10 ml-10">
              <RiVipDiamondLine />
              Add your Podcast(s)
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 p-2 text-gray-50 bg-purple-600 font-bold rounded-[100%]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </div>
        <div>
          <div className="flex gap-3 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p className="mb-2 font-bold">Help</p>
          </div>
          <hr className="text-gray-400" />
          <div className="flex items-center shadow-md w-[250px] h-25">
            <h1 className="bg-yellow-400 rounded-lg text-4xl font-semibold m-3 p-2">
              {user.username[0].toUpperCase() + user.username[1].toUpperCase()}
            </h1>
            <div className="text-gray-600">
              <h3 className="font-semibold text-sm">{user.username}</h3>
              <p className="font-semibold text-xs">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 p-5">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <GoHome size={20} />
            <Link to={"/"}>Home Page / </Link>
            <p> {projectName} /</p>
            <p className="font-bold text-purple-600"> Add Your Podcast</p>
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
            <div className="flex gap-4 items-center font-bold text-2xl">
              <IoArrowBackSharp onClick={() => navigate(`/project/${id}`)} />
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
          <div className="p-5">
            <h3 className="text-purple-700 font-semibold text-xl mt-5">
              Speaker
            </h3>
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
