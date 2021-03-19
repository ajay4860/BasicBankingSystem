const express=require("express");
const fs=require("fs");
const path=require("path");
const port=80;
const app=express();
mongoose=require('mongoose');
const bodyparser=require("body-parser")

var Contact=require('./modules/data');
const { find } = require("./modules/data");
const { checkServerIdentity } = require("tls");

var employee=Contact.find({});

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded());


 

app.set('view engine' ,'ejs');
app.set('views' ,path.join(__dirname ,'views'));

function check(data,amount){
    var newdata;
    data.forEach(element => {
        newdata=element.amount+amount;
    });
    return newdata;
}

function checkamount(data,amount){
    var newamount;
    data.forEach((element=>{
        newamount=element.amount-amount;
    }))
    return newamount;
}

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.get('/customers',(req,res)=>{
    Contact.find({},(err,data)=>{
        if(err){
            console.log('there is an error');
        }
        else{
            res.render('customers.ejs',{title:'ENTER THE DETAILS OF THE INDIVIDUAL',records:data});
        }
    })
})

app.post('/customers',(req,res)=>{
    var data=new Contact(req.body);
    Contact.find({account_number:data.account_number},(err,da)=>{
        if(err){
            console.log('there is an error');
        }
        else{
            res.render('individual.ejs',{records:da})
        }
    })
})


app.get('/amountForm',(req,res)=>{
    res.render('amountForm.ejs');
})

app.post('/amountForm',(req,res)=>{
    var mydata=new Contact(req.body);
    Contact.find({name:mydata.name},(err,rec)=>{
        if(err){
             console.log('there is an error');
        }
        else{
            var newamount=checkamount(rec,mydata.amount);
            Contact.updateOne({name:mydata.name},{$set:{amount:newamount}},(err,data)=>{
                if(err){
                    console.log('there is an error');
                }
                else{
                    console.log('updated');
                }
            })
        }
    })
    Contact.find({account_number:mydata.account_number},(err,data)=>{
        if(err){
            console.log('there is an error');
        }
        else{
            var newdata=check(data,mydata.amount);
            
           Contact.updateOne({account_number:mydata.account_number},{$set: {amount:newdata}},(err,da)=>{
               if(err){
                   console.log('there is an error');
               }
               else{
                   console.log(da);
                   Contact.find({},(err,records)=>{
                       if(err){
                           console.log('there is an error');
                       }
                       else{
                           res.render('customers.ejs',{title:'MONEY TRANSFERRED SUCCESSFULLY !!!',records:records});
                       }
                   })
               }
           })
        }
    })
})

app.listen(port,()=>{
    console.log("the application is started");
});

