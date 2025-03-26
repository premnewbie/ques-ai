import { useEffect, useState, } from "react";
import logopurple from "../assets/logopurple.png";
import projecthero from "../assets/projecthero.png";
import { useProjectStore } from "../store/projectStore";
import BasicModal from "../components/BasicModal";
import AddProject from "../components/AddProject";
import { useNavigate } from "react-router-dom";

function extractDateOrTime(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);

  const isToday = now.toISOString().slice(0, 10) === date.toISOString().slice(0, 10);

  if (isToday) {
    return date.toISOString().slice(11, 19);
  } else {
    return date.toISOString().slice(0, 10);
  }
}

const HomePage = () => {
  const { projects, getProjects,fetchingProject } = useProjectStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();



  useEffect(() => {
    getProjects();
  }, [getProjects]);

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
    <div className="p-5">
      <div className="flex justify-between py-5">
        <div className="flex gap-2">
          <img src={logopurple} alt="logo" className="w-12 h-12" />
          <h2 className="text-purple-800 text-2xl font-bold">Ques.AI</h2>
        </div>
        <div className="flex gap-2">
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
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
        </div>
      </div>
      {projects?.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center w-[50%] h-auto mx-auto">
          <h1 className="text-purple-800 text-3xl font-bold">
            Create a New Project
          </h1>
          <img src={projecthero} alt="hero-image" className="w-[50%] h-auto" />
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>
          <button className="bg-[#211935] text-center text-white font-semibold p-3 rounded-md flex items-center gap-3 cursor-pointer"  onClick={openModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 bg-white text-black rounded-[100%]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create New Project
          </button>
        </div>
      )}
      {projects?.length > 0 && (
        <div >
          <div className="flex justify-between mb-10">
            <h2 className="text-purple-800 text-xl font-bold">Projects</h2>
            <button className="bg-[#211935] text-center text-white font-semibold p-3 rounded-md flex items-center gap-3 cursor-pointer"  onClick={openModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 bg-white text-black rounded-[100%]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create New Project
            </button>
          </div>
          <div className="grid grid-cols-4">
            {projects?.map((project) => (
              <div
                key={project._id}
                className="shadow-md bg-blue-50 w-[250px] h-25 rounded-lg flex items-center cursor-pointer"
                onClick={() => navigate(`/project/${project._id}`)}
              >
                <h1 className="bg-yellow-400 rounded-lg text-4xl font-semibold mx-3 p-4">
                  {project.title.split(" ").length > 1
                    ? project.title.split(" ")[0][0].toUpperCase()  +
                      project.title.split(" ")[1][0].toUpperCase() 
                    : project.title[0].toUpperCase() +
                      project.title[1].toUpperCase()}
                </h1>
                <div>
                  <p className="text-purple-800 font-bold">
                    {project.title}
                  </p>
                  <p className="font-semibold text-sm">{project.files.length} files</p>
                  <p className="text-xs text-gray-500">Last edited at {extractDateOrTime(project.updatedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <BasicModal isOpen={isModalOpen} handleClose={closeModal}>
        <AddProject closeModal={closeModal} />
      </BasicModal>
    </div>
  );
};

export default HomePage;
