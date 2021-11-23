import multer from "multer";
import {v4} from 'uuid';
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "files/");
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const uploads = multer({ storage: storage });
  
  export default uploads ;