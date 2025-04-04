import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

// const API_URL = "http://localhost:5000/api";
const API_URL = 'https://ques-ai-9s2t.onrender.com/api'
axios.defaults.withCredentials = true;

export const useProjectStore = create((set, get) => ({
  projects: [],
  projectName: "",
  files: [],
  file: "",
  isLoading: false,
  fetchingProject: false,
  addProject: async (title) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/projects`, {
        title,
      });
      set((state) => ({
        projects: [...state.projects, response.data.project],
      }));
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error from AddProject function in projectStore");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getProjects: async () => {
    set({ fetchingProject: true });
    try {
      const response = await axios.get(`${API_URL}/auth/projects`);
      if (response.data.projects && response.data.projects.length > 0) {
        set({ projects: response.data.projects });
        return;
      } else {
        set({ projects: [] });
        console.log("No project is available");
        return;
      }
    } catch (error) {
      console.log(
        "Error from getProjects function in project Store",
        error.response
      );
    } finally {
      set({ fetchingProject: false });
    }
  },

  getProjectFiles: async (pid) => {
    set({ fetchingProject: true });

    try {
      const response = await axios.get(`${API_URL}/auth/projects/${pid}`);
      set({
        files: response.data.project.files,
        projectName: response.data.project.title,
      });
    } catch (error) {
      console.log(
        "Error from getProjectFiles function in project Store",
        error.response
      );
    } finally {
      set({ fetchingProject: false });
    }
  },

  addFile: async (title, description, pid) => {
    set({ fetchingProject: true });

    try {
      const response = await axios.post(`${API_URL}/auth/projects/${pid}/files`, {
        name: title,
        description,
      });
      const file = response.data.file;

      file.updatedAt = new Date().toISOString();

      set((state) => ({ files: [...state.files, file] }));
    } catch (error) {
      console.log(
        "Error from addFile function in project Store",
        error.response
      );
    } finally {
      set({ fetchingProject: false });
    }
  },

  getFile: async (id, fileId) => {
    set({isLoading: true})
    try {
      const response = await axios.get(
        `${API_URL}/auth/projects/${id}/files/${fileId}`
      );
      const filteredFile = await response.data.file;
      set({ file: filteredFile });
    } catch (error) {
      console.log(
        "Error from getFIle function in project Store",
        error.response
      );
    }finally{
      set({isLoading: false})
    }
  },

  deleteFile: async (id, fileId) => {
    try {
      await axios.delete(`${API_URL}/auth/projects/${id}/files/${fileId}`);
      set({ files: get().files.filter((file) => file.fileId !== fileId) });
    } catch (error) {
      console.log(
        "Error from deleteFIle function in project store",
        error.response
      );
    }
  },

  editFile: async (id, fileId, description) => {
    try {
      const response = await axios.put(
       `${API_URL}/auth/projects/${id}/files/${fileId}`,
        {
          description,
        }
      );
      const updatedFile = response.data.file;
      set({ file: updatedFile });
    } catch (error) {
      console.log(
        "Error from editFIle function in project store",
        error.response
      );
    }
  },
}));
