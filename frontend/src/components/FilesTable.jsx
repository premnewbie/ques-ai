import React, { useState } from "react";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} | ${hours}:${minutes}`;
}

const FilesTable = ({ files,deleteFile,pid }) => {
  const [filteredFiles, setFilteredFiles] = useState(files);

  const handleDelete = (fileId) => {
    deleteFile(pid, fileId);
    setFilteredFiles((file) => file.fileId !== fileId);
  };

  return (
    <div>
      {filteredFiles.length > 0 &&
        filteredFiles?.map((file, ind) => (
          <div
            key={file._id}
            className="grid grid-cols-7 items-center text-gray-500 px-3 py-2 mt-2 place-content-center h-15 font-bold"
          >
            <p>{ind + 1}</p>
            <p className="col-span-2">{file.name}</p>
            <p className="col-span-2">{formatTimestamp(file.updatedAt)}</p>
            <div className="col-span-2">
              <button className="rounded-l-lg border border-gray-400 p-1 px-2">
                View
              </button>
              <button
                className="rounded-r-lg border text-red-400 border-gray-400 p-1 px-2"
                onClick={() => handleDelete(file.fileId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FilesTable;
