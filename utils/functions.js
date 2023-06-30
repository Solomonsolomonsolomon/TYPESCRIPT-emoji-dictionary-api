let users=require('./../apiusers.json')
const fs=require('fs')
module.exports.genAPIKEY=()=>{
   let char='01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
 let key=[];
 for(i=0;i<26;i++){
    key.push(char[Math.floor(Math.random()*char.length+1)]);
    apikey=key.join('')
   
 }
 return apikey;
}
module.exports.getDate=()=>{
 // let dateandtime= JSON.stringify(new Date())
 // let date=dateandtime.split('T');
//let split=date[0].split('"');
 // return split[1];
 let now=new Date()
 const hour = now.getHours();
 const minute = now.getMinutes();
 return  `${hour}:${minute}`
}

//middleware function for verifying the api key
module.exports.verifyAPIKEY= async(req,res,next)=>{
    let todaysDate=this.getDate();
    count=null;
   let key=req.headers['apikey']
   await fs.readFile('./apiusers.json',async (err,userBuffer)=>{
    
if(err){
 console.log(err)
}
let data=JSON.parse(userBuffer);

let newData=data.map((user,index)=>{
        if(data[index].key==key){
           
            if(data[index].calls[0]==todaysDate){
                if(data[index].calls[1]>0){
                    data[index].calls[1]--;
                    next();
                }else{
                  count=true;
                }
            
              
            }else {
                count=null;
                data[index].calls[0] = todaysDate;
                data[index].calls[1] = 25;  
                next()
              }
            }
            return user; // return the updated user object
          });
if(count){
    res.json({err:"you have exceeded your calls for now.please contact the developer or try again later"})
}
 

fs.writeFileSync('./apiusers.json',JSON.stringify(newData))

           });  
}