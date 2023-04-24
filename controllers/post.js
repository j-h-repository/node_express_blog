import Post from "../models/post"
import User from "../models/user"

//make a "delete" and "edit" post function


export const createPost = async (req, res) =>{
    const {u,cat, content, t, k} = req.body;

    if(["fp", 'tech', "history"].includes(cat) && u ){

        if(content !== "<p></br></p>"){
            console.log("searching for existing user")
            try{
                const log = await User.findById({"_id":u})
                
                    console.log("logging post in DB");
                    const post = new Post({
                        category: cat,
                        title:t,
                        content: content,
                        createdBy: u,
                        keywords: k,
                        
                    });
                    try{
                        console.log("saving post")
                        post.save();
                        console.log(post)
                        res.json({"good":true})
                    } catch(err){
                        res.json({"good": false})
                    }
                
            } catch(err){
                return res.json({"good":"user is invalid"});
            }  
        } else{
            return res.json({"good":"No content entered"})
        }     
    } else{
        console.log("bad category")
    }
}


export const getFpPost = async (req,res)=>{
    try{
        const fpPosts = await Post.find({category: {$in: "fp"}})
        .populate("createdBy", "username")
        .sort({createdAt:-1})
        console.log(bodyPosts)
        console.log("send")
        res.json(fpPosts)
    } catch(err){
        console.log(err)
    }   
}

export const getTechPost = async (req,res)=>{
    
    try{
        const techPosts = await Post.find({category: {$in: "tech"}})
        .populate("createdBy", "username")
        .sort({createdAt:-1})
       
        res.json(techPosts)
    } catch(err){
        console.log(err)
    }   
}

export const getHistoryPost = async (req,res)=>{
    try{
        const historyPosts = await Post.find({category: {$in: "history"}})
        .populate("createdBy", "username")
        .sort({createdAt:-1})
        console.log("send")
        res.json(historyPosts)
    } catch(err){
        console.log(err)
    }   
}

export const deletePost = async (req, res)=>{
    const list = req.body;
    console.log(list)
    try{
        for(let i=0; i<list.length; i++){
            const post = await Post.findByIdAndDelete(list[i])
        }
        res.json({"good":true})
    } catch(err){
        console.log(err)
    }
}

export const getPost = async(req, res)=>{
    const {id} = req.params
    try{
        const post = await Post.findById({"_id":id})
        res.json(post)
    } catch(err){
        console.log(err)
    }
}

export const editPost = async(req, res)=>{
    const {pid,cat, content, t, k}= req.body
    const post = await Post.findByIdAndUpdate(pid, {"category": cat,"content":content,"title":t,"keywords":k}, {new:true})
    res.json({"good":true})
    //const post = await Post.findByIdAndUpdate(req.params.id, req.body)
}