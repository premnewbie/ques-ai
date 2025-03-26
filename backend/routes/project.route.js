import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { addFile, addProject, deleteFile, editFile, getProject, getProjects,getFile } from "../controllers/project.controller.js";


const router = Router();

router.post("/auth/add-project",protectRoute,addProject);

router.post("/auth/:id/add-file",protectRoute,addFile);

router.put("/auth/:id/edit-file/:fileId",protectRoute,editFile);

router.delete("/auth/project/:id/delete-file/:fileId",protectRoute,deleteFile);

router.get("/auth/get-projects",protectRoute,getProjects);

router.get("/auth/get-project/:id",protectRoute,getProject);

router.get("/auth/project/:id/get-file/:fileId",protectRoute,getFile);

export default router;