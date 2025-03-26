import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
   title: { type: String, required: true },
   user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
   files: [
      {
         fileId: { type: mongoose.SchemaTypes.ObjectId, required: true },  
         name: { type: String, required: true },  
         description: { type: String },  
         updatedAt: { type: Date, default: Date.now }, 
      }
   ]
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
