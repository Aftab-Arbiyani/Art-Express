import jwt from 'jsonwebtoken';
import dbService from '../utils/dbService';
import user_token from '../models/user-token-model';
import response from '../utils/response';

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return response.unAuthorizedRequest(res);
    }
    const token = authHeader.split(' ')[1];
    const validate = await jwt.verify(token, process.env.SECRET);
    if (validate) {
      const findToken = await dbService.findOne(user_token, { fk_user: validate.id, token });

      if (!findToken) {
        return response.unAuthorizedRequest(res);
      }
      next();
    }
  } catch (error) {
    return response.unAuthorizedRequest(res);
  }
};

export default verifyToken;
