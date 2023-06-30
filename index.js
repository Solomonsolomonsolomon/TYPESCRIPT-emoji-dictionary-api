require('dotenv').config()
const express=require('express');
const app=express();
const emojiDictionary=require('./emojidictionary.json');
const emoji=require('emoji-dictionary');
const cluster=require('cluster');
const server=require('http').createServer(app)
const {cpus}=require('os');
const {genAPIKEY,getDate,verifyAPIKEY}=require('./utils/functions');
const home=require('./routes/home.routes')
const apiUsers=require('./apiusers.json')
const cors=require('cors')
app.use(express.json())
app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended:true}))
const fs=require('fs');
//routes go here
console.log(getDate())
//registering for an api key
app.get('/register',(req,res)=>{
    res.sendFile(require('path').join(__dirname,'index.html'))
})
app.post('/newUser',(req,res)=>{
   let emailAlreadyExists= apiUsers.find(email=>{
       return email.email==(req.body.email||req.body.hostname);
    })
    if(emailAlreadyExists){
              res.status(400).json({err:'you already registered for an api key'})
    }else{
        let key=genAPIKEY();
        let {hostname,email}=req.body;
        console.log(req.body)
       const oldFile=fs.readFile('./apiusers.json',(err,data)=>{
        let json=JSON.parse(data)
        {
            hostname,email,key 
        }
        json.push(  {
           "hostname":hostname,
           "email":email,
            "key":key,
            calls:[getDate(),25]
            
        });
        fs.writeFile('./apiusers.json',JSON.stringify(json),(err=>{
            if(err){
                  console.log(err);
            }
        }))
       })
       res.json({msg:`your api key is ${key}`})
    }
})

app.use(verifyAPIKEY, home)//home route
app.use(verifyAPIKEY, require('./routes/search.routes'))//search route
app.use(verifyAPIKEY, require('./routes/random.routes'))//random route
const port=process.env.PORT||7777;
app.listen(port)
/*
if(cluster.isPrimary){
    console.log(`master thread ${process.pid} launched ${cpus().length} worker threads`)
    for(i=0;i<cpus().length;i++){
        cluster.fork();
    }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
else{
      server.listen(port,()=>{
        console.log(`listening for process ${process.pid} `)
      })    
      console.log(`worker thread ${process.pid} started`);
} 

*/