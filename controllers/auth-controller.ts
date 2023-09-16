import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import response from "../utils/response";
import dbService from "../utils/dbService";

import userModel from "../models/user-model";
import userTokenModel from "../models/user-token-model";
import { EmailService } from "../middleware/send-mail";
import otpModel from "../models/otp-model";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
  });
};

const isTokenExpired = async (token) => {
  try {
    const valid = await jwt.verify(token, process.env.SECRET);
    if (valid) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return true;
  }
};

const createUserToken = async (payload, fk_table) => {
  const [token, isExist] = await dbService.findOrCreate(
    userTokenModel,
    { [fk_table]: payload[fk_table] },
    payload
  );
  const isExpired = await isTokenExpired(token.token);
  if (isExist && isExpired) {
    await dbService.updateByPk(userTokenModel, payload, token.id);
    // New Token
    return payload.token;
  }
  return token.token;
};

const signupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const device = req.headers["user-agent"];
    const ip = req.ip;

    // already email exist
    const where = {
      email: email,
    };
    const already = await dbService.findOne(userModel, where);
    if (already) {
      return response.badRequest(
        { message: "Email is already exist", data: { email: email } },
        res
      );
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await dbService.create(userModel, {
      email,
      password: hashPassword,
    });

    const result = await user.save();

    //generate random code
    const code = Math.floor(100000 + Math.random() * 100000);

    await dbService.findOrCreate(
      otpModel,
      { fk_user: user.id, is_verified: false, otp_type: 'sign_up' },
      { otp: code }
    );

    const emailService = new EmailService();

    emailService.sendMail({
      to: email,
      subject: 'Email Verification | Art Mart',
      text: `Your Otp is: ${code}`
    });

    // generate token
    const token = await generateToken(user.id);

    // store token and other details of user
    result.token = await createUserToken({
      fk_user: result.id,
      token,
      device,
      ip,
    }, 'fk_user');

    return response.successResponse(
      { message: "Signup Successful", data: { id: result.id, token: token } },
      res
    );
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const device = req.headers["user-agent"];
    const ip = req.ip;

    // find user
    const user = await dbService.findOne(userModel, { email });
    if (!user) {
      return response.badRequest(
        { message: "Email or password is wrong!", data: {} },
        res
      );
    }

    // compare the password
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      return response.badRequest(
        { message: "Email or password is wrong!", data: {} },
        res
      );
    }

    // generate token
    const token = await generateToken(user.id);

    // store token and other details of user
    user.token = await createUserToken({
      fk_user: user.id,
      token,
      device,
      ip,
    }, 'fk_user');
    return response.successResponse(
      { message: "Login Successful", data: { id: user.id, token: user.token } },
      res
    );
  } catch (error) {
    return response.failureResponse(error, res);
  }
};

const authController = {
  signupUser,
  login,
};

export default authController;