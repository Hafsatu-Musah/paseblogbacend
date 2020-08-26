const express = require('express');
const app = express();
// const path = require('path');
app.use(express.json()) 
app.use(express.urlencoded({extended: true}));

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://express:express1234@covid19.z2ije.mongodb.net/PaseBlog?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const Post = mongoose.model('post', {post: String, image: String, title: String, catogories:[String], tags:[String], date: String, author: String});


//get all post
app.get('/', async (req, res)=>{
    await Post.find({}, (err, result) =>{
        if(result){
            res.json(result);
        }else{
            res.json(err);
        }
    });
});


// get post
app.get('/post/:id', async (req, res)=>{
    Post.findById(req.params.id, req.body, (err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    });
});

//add  Post
app.post('/post', (req, res)=>{
    Post.create(req.body, (err, result)=>{
        if(!err){
            res.json(result);
        }else{
            res.json(err);
        }
    });
});



// update post
app.put('/post/:id', async(req, res)=>{
    await Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, result)=>{
        if(!err){
            res.json(result);
        }else{
            res.json(err);
        }
    });
});

//delete post
app.delete('/post/:id', async(req, res)=>{
    await Post.findByIdAndRemove(req.params.id, (err, result)=>{
        if(!err){
            res.json(result);
        }else{
            res.json(err);
        }
    });
});


app.listen(5050, '127.0.0.1', ()=>{
    console.log('server is running on https://127.0.0.1:5050');
})