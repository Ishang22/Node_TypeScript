
export default class UserObject {

  public User ={
    userId    :  String ,
    name      :  String ,
    username  :  String ,
    email     :  String ,
    password  :  String ,
    picUrl    :  String,
    address   :
      {
        street   :  String,
        suite    :  String,
        city     :  String,
        zipcode  :  String,
        geo: {
          lat  :  String,
          lng  :  String
        }
      },
    phone     :  String,
    website   :  String,
    company   : {
      name        : String,
      catchPhrase : String,
      bs          : String
    }
  };

  public Post = {
  userId  : String ,
  postId  : String ,
  title   : String ,
  body    : String ,
  comment : [
    {
      postId : String,
      name   : String,
      email  : String,
      body   : String,
    }
  ]
  };

};

