import { Router } from 'express';
import Controller from './master.controller';
import * as  multipart from 'connect-multiparty';
const multipartMiddleware =  multipart();
const user: Router = Router();
const controller = new Controller();


user.get('/fetchAllUsers', controller.fetchAllUsers);

user.get('/fetchAllPost', controller.fetchAllPost);

user.post('/addUserImage',multipartMiddleware, controller.addUserImage);

user.get('/getAllUsers', controller.getAllUsers);

user.get('/getAllPost', controller.getAllPost);

export default user;
