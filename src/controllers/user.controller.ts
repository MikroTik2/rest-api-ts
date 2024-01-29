import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import config from '../config';

const createUser = async (req: Request, res: Response) => {
     try {

          const user = new User(req.body);
          const ChkUser = await User.findOne({
               email: { $eq: req.body.email },
          }).exec();

          if (ChkUser) return res.status(400).json('такой пользыватель уже есть дурень');

          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(req.body.password, salt);
          user.password = hash;

          await user.save();

          const token = jwt.sign({ _id: user }, config.JWT_SECRET as string, {
               expiresIn: config.EXPIRES_IN,
          });

          res.cookie('auth-token', token, {
               maxAge: 3600 * 24,
               secure: true,
          });

          res.status(201).json({
               success: true,
               user: user,
          });

     } catch (err) {
          res.status(500).json({ message: "Interval server error: ", err });
     };
};

const loginUser = async (req: Request, res: Response) => {
     try {

          const { email, password } = req.body;
          const user = (await User.findOne({ email: { $eq: email }})) as any;

          if (!user) return res.status(500).json('user credentials');

          if (!bcrypt.compareSync(password, user.password))
               return res.status(404).json('Wrong credentionals')
    
          const token = jwt.sign({ _id: user }, config.JWT_SECRET as string, {
               expiresIn: config.EXPIRES_IN,
          });

          res.cookie('auth-token', token, {
               maxAge: 3600 * 24,
               secure: true,
          });

          res.status(200).json({
               success: true,
               user,
          });

     } catch (err) {
          res.status(500).json({ message: 'Internal server error: ', err })
     };
};

const getAllUser = async (req: Request, res: Response) => {
     const users = await User.find();

     res.status(200).json({
          success: true,
          users,
     });
};

const getUserId = async (req: Request, res: Response) => {
     const user = (await User.findOne({ _id: req.params.id })) as any;

     if (!user) return res.status(404).json({ success: false, message: "user does not exists" });
     res.status(200).json({
          success: true,
          user,
     });
};

const updateUser = async (req: Request, res: Response) => {
     const user = (await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })) as any;

     res.status(200).json({
          success: true,
          user,
     });
};

const deleteUser = async (req: Request, res: Response) => {
     const user = (await User.findByIdAndDelete({ _id: req.params.id })) as any;

     res.status(200).json({
          success: true,
          user,
     });
};

export default {
     createUser,
     loginUser,
     getAllUser,
     getUserId,
     updateUser,
     deleteUser,
};