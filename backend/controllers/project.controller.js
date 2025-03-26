import mongoose from "mongoose";
import Project from "../models/project.model.js";

export const addProject = async (req, res) => {
  const { title } = req.body;
  const user = req.user;
  try {
    const project = await Project.create({
      title,
      user,
      files: [],
    });

    return res
      .status(200)
      .json({ project, message: "project added successfully" });
  } catch (error) {
    console.log("Error from the addProject function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (projects.length === 0) {
      return res.status(400).json({ message: "No project found" });
    }
    return res.status(200).json({ projects });
  } catch (error) {
    console.log("Error from the get project function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);

    return res.status(200).json({ project });
  } catch (error) {
    console.log("Error from the get project function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addFile = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const file = { fileId: new mongoose.Types.ObjectId(), name, description };

    project.files.push(file);

    await project.save();

    return res.status(200).json({ file });
  } catch (error) {
    console.log("Error from the addFile function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editFile = async (req, res) => {
  try {
    const {  description } = req.body;
    const { id, fileId } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const fileIndex = project.files.findIndex(
      (file) => fileId.toString() === fileId
    );
    if (fileIndex === -1) {
      return res.status(404).json({ message: "File not found" });
    }

    project.files[fileIndex].description =
      description || project.files[fileIndex].description;

    await project.save();

    const file = project.files[fileIndex];

    console.log(file)

    return res.status(200).json({ file });
  } catch (error) {
    console.log("Error from the EditFile function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id, fileId } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const fileIndex = project.files.findIndex(
      (file) => file.fileId.toString() === fileId
    );
    if (fileIndex === -1) {
      return res.status(404).json({ message: "File not found" });
    }

    project.files.splice(fileIndex, 1);

    await project.save();

    const updatedProject = await Project.findById(id).populate("files");

    return res.status(200).json({ updatedProject });
  } catch (error) {
    console.log("Error from the EditFile function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFile = async (req,res) => {
  
  try {
    const { id, fileId } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const filteredFile = project.files.filter((file) => file.fileId.toString() === fileId);

    const file = filteredFile[0];

    return res.status(200).json({ file });
  } catch (error) {
    console.log("Error from the getFile function", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
