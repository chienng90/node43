import multer, { diskStorage } from "multer";
import path from "path";

// Function to rename the file while keeping the extension
const renameFile = (name) => {
  const newName = Date.now(); // Use current timestamp for uniqueness
  const lastDotIndex = name.lastIndexOf(".");

  // If there's no dot or it's the first character, there's no extension
  if (lastDotIndex <= 0) return newName.toString();

  // Extract the file extension and combine it with the new name
  return newName + name.slice(lastDotIndex);
};

const multimedia = multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(process.cwd(), "public")); // Use path.join for cross-platform compatibility
    },
    filename: (req, file, callback) => {
      callback(null, renameFile(file.originalname));
    },
  }),
});

export default multimedia;
