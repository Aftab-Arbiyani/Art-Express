import response from '../utils/response';
import validate from '../utils/index';
import fs from 'fs';

const validationMiddleware = (schema: any) => {
  return (req: any, res: any, next: any) => {
    const isValid: any = validate(req.body, schema);
    if (isValid.error) {
      if (req?.file && fs.existsSync(req.file.path)) {
        fs.rmSync(req.file.path);
      }
      return response.validationError({ message: 'Validation Error!', data: isValid.error }, res);
    } else {
      next();
    }
  };
};

export default validationMiddleware;
