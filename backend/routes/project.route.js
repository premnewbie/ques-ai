import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { 
  addProject, 
  getProjects, 
  getProject, 
  addFile, 
  editFile, 
  deleteFile, 
  getFile 
} from "../controllers/project.controller.js";

const router = Router();


router.route("/auth/projects")
  .post(protectRoute, addProject)
  .get(protectRoute, getProjects);

router.route("/auth/projects/:id")
  .get(protectRoute, getProject);

router.route("/auth/projects/:id/files")
  .post(protectRoute, addFile);

router.route("/auth/projects/:id/files/:fileId")
  .get(protectRoute, getFile)
  .put(protectRoute, editFile)
  .delete(protectRoute, deleteFile);

export default router;