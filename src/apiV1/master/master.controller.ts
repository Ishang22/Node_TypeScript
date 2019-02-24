import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import config from "../../config/config";
import * as fs from 'fs';
import * as Path  from 'path';
import Service from "../../service";
const  service = new Service();
import masterObject from './master.template';
const  masterObject1 = new masterObject();


export default class MasterController {


  public fetchAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {

        const step1    : any = await service.getUserInfo();
        let   mongoUrl : string;
        let   conn     : any;
        const Schema   : any = new mongoose.Schema(masterObject1.User);
        let   model1   : any;
        let   userData : any;

      for (const value of step1)
         {
           value.userId   = value.id;
            value.password = await bcrypt.hash("Gmail@123", config.SALT_ROUNDS);   // Setting default password to Gmail@123
            mongoUrl       = "mongodb://localhost:27017/User"+ value.id;
            conn           = await mongoose.connect(mongoUrl, { useNewUrlParser: true });
            model1         = conn.model('User'+value.id, Schema);
            userData       = await new model1(value);
            userData.save();
          }

      res.status(200).send({
        statusCode : 200,
        success    : true,
        data       : null
      });

    }catch(err){
        res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public fetchAllPost = async (req: Request, res: Response): Promise<any> => {
    try {

      const step1    : any = await service.getUserInfo();
      let   step2    : any ;
      let   step3    : any ;
      const Schema   : any = new mongoose.Schema(masterObject1.Post);
      let   mongoUrl : string;
      let   conn     : any;
      let   model1   : any;
      let   postData : any;


      for (const value of step1)
      {
        step2 = await service.getUserPosts(value.id);

        for(const posts of step2)
        {
          step3         = await service.getPostComment(posts.id);
          posts.comment = step3;
          mongoUrl       = "mongodb://localhost:27017/User"+ value.id;
          conn           = await mongoose.connect(mongoUrl, { useNewUrlParser: true });
          model1         = conn.model('Post'+value.id, Schema);
          postData       = await new model1(posts);
          postData.save();
        }
      }

      res.status(200).send({
        statusCode : 200,
        success    : true,
        data       : null
      });

    }catch(err){
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };


  public addUserImage = async (req: any, res: Response): Promise<any> => {
    try {

      const directoryPath = Path.resolve(".")+"/images/"+req.files.image.originalFilename;
      console.log(req.files.image,directoryPath);
      fs.writeFile(directoryPath,req.files.image.path, async (err)=> {
        if(err) {
          return console.log(err);
        }

        /////////////////////////////////////////////////////////////
      const Schema   : any = new mongoose.Schema(masterObject1.User);
      const mongoUrl       = "mongodb://localhost:27017/User1";
      const conn           = await mongoose.connect(mongoUrl, { useNewUrlParser: true });
      const User21           = conn.model('user1', Schema);


        const userUpdated = await User21.updateOne(
          {userId: JSON.parse(JSON.stringify(req.body)).id},
          {
            $set: {
              picUrl: directoryPath
            }
          },
          { new: true }
        );

        if (!userUpdated) {
          return res.status(404).send({
            success: false,
            message: 'User not found',
            data: null
          });
        }

        res.status(200).send({
          success: true,
          data: userUpdated
        });


      });
    }catch(err){
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

}