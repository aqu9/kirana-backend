import { Injectable } from '@nestjs/common';
import {google} from "googleapis"
import { Stream } from 'stream';
import { UploadedFile } from '@nestjs/common/decorators';
import { config } from 'dotenv';
config();


const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async upload(file) {
    const bufferStream = new Stream.PassThrough();
    bufferStream.end(file.buffer)
    try {
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname, //This can be name of your choice
          mimeType: file.mimeType,
        },
        media: {
          mimeType: file.mimeType,
          body: bufferStream,
        },
      });
      console.log(response.data);

      const fileId = response.data.id;
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
  
      /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
      const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
      });
      console.log(result.data);
      return result.data
  
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(@UploadedFile() file: Express.Multer.File,){
    try {

     const fileURLS = await this.upload(file);
      // for (let f = 0; f < file.length; f += 1) {
      //  const test=  await this.upload(file[f]);
      //   data.append(test)
      // }
  
      // console.log(body);
      return fileURLS
    } catch (f) {
      console.log(f)
    }
  }
}
