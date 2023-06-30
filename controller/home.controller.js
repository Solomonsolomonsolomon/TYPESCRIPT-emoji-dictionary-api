




const emojiDictionary=require('./../emojidictionary.json')
module.exports.home=(req,res)=>{
    let allEmojis=[]
   for(i in emojiDictionary){
    allEmojis.push({
        emoji:emojiDictionary[i].emoji,
        name:emojiDictionary[i].name
    } 
    )
   }
   res.status(200).json(allEmojis)
}

module.exports.oneemoji=(req,res)=>{
    let {emojiname}=req.params;
    console.log(emojiname)
    let name=emojiDictionary.find(name=>{
       return name.name===emojiname||name.emoji===emojiname;
    })
    if(name){
        res.status(200).json(name);
     }else{
       res.json({err:'no emoji matching that description'})
     }
    }