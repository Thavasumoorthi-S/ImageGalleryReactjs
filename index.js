const express=require('express');
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const cors=require('cors')
const imagemodel=require('./model/imagemodel');

const app=express();
app.use(bodyparser.json({limit:'10mb'}));

app.use(bodyparser.urlencoded({ limit:'10mb',extended: true }));
app.use(cors())


mongoose.connect('mongodb://127.0.0.1:27017/imagegallery').then(res=>{
    console.log("database connected successfully")
}).catch(err=>{
    console.log(" database  connection error")
})



app.get('/getitem',(req,res)=>{
    imagemodel.find().then(item=>{
        res.json(item)
    }).catch(err=>{
        res.json(err)
    })
})


app.post('/upload',(req,res)=>{
        imagemodel.create(req.body).then(item=>{
        res.json(item)
    }).catch(err=>res.json(err))
})



mongodb://localhost:27017

app.listen(8000,()=>{
    console.log("server is running on port 8000")
})