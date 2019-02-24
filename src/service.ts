import * as https from 'https';



export default class ServiceController {


  public getUserInfo = () => {
    return new Promise((resolve, reject)=>{
      https.get('https://jsonplaceholder.typicode.com/users', (resp) => {
        let data: any = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end',  () => {
          resolve(JSON.parse(data));
        });
     });
    })
};



  public getUserPosts = (userId) => {
    return new Promise((resolve, reject)=>{
      https.get('https://jsonplaceholder.typicode.com/posts?userId='+userId, (resp) => {
        let data: any = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end',  () => {
          resolve(JSON.parse(data));
        });
      });
    })
  };




  public getPostComment = (postId) => {
    return new Promise((resolve, reject)=>{
      https.get('https://jsonplaceholder.typicode.com/comments?postId='+postId, (resp) => {
        let data: any = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end',  () => {
          resolve(JSON.parse(data));
        });
      });
    })
  };




}
