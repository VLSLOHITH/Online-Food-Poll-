const express = require('express');
const router=express.Router();

const Pusher=require('pusher');

const pusher = new Pusher({
    appId: "1475660",
    key: "199c9e1a2c14e5fc9391",
    secret: "00e2397a94f4804ad1ef",
    cluster: "ap2",
    useTLS: true
  });

router.get('/',(req,res)=>{
    res.send('POLL');
} );

router.post('/',(req,res)=>{
    pusher.trigger("os-poll", "os-vote", {
        points:1 ,
        os:req.body.os
      });
      return res.json({sucess:true ,message: 'Thank You For Voting'});
});

module.exports=router;