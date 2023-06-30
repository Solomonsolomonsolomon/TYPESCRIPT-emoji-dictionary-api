


const emojiDictionary=require('./../emojidictionary.json');
module.exports.random=(req,res)=>{
    res.status(400).json({err:"you didnt specify a number"})
}
module.exports.randomNumber=(req,res)=>{
    const {number}=req.params;
    let random=[];
    if(number && number>0){
        
        let randomEmojis=[]
        for(i=0;i<number;i++){
                    random.push(Math.floor(Math.random()*(emojiDictionary.length+1)))
        }
        for(i in random){
            randomEmojis.push(emojiDictionary[random[i]])
        }
       
        res.json(randomEmojis)
    }else{
        res.status(400).json({err:'you didnt specify a number'})
    }
  
}