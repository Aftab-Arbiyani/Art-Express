import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

//commonStorage configuration
const multerDynamicStorage = (folderName: string) => {
  return multer.diskStorage({
    destination: function (_req: any, _file: any, cb: any) {
      const finalPath = './public/uploads/' + folderName;
      if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath, { recursive: true });
      }
      cb(null, finalPath);
    },
    filename: function (_req: any, file: any, cb: any) {
      const pathStr = `${uuid()}${path.extname(file.originalname)}`;
      cb(null, pathStr);
    },
  });
};

//filters list
const commonImageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/) && !(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(null, false);
  } else {
    cb(null, true);
  }
};

export const categoryImage = multer({
  storage: multerDynamicStorage('category'),
  fileFilter: commonImageFilter
});

export const profileImageUpload = multer({
  storage: multerDynamicStorage('profile'),
  fileFilter: commonImageFilter
});

export const artMedium = multer({
  storage: multerDynamicStorage('medium'),
  fileFilter: commonImageFilter
});