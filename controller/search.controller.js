

const emojiDictionary=require('./../emojidictionary.json')
module.exports.search=(req,res)=>{
    const {search}=req.params;
    const result=emojiDictionary.filter(emoji=>{
     return emoji.name===search||emoji.emoji==search||emoji.tags.includes(search);
    })
    if(result.length){
     res.status(200).json(result)
    }else{
     res.status(400).json({err:"error no emoji(s) found matching that description"})
    }
    
 }