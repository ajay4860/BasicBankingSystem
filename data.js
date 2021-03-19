const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

var conn=mongoose.connnection;

const contactSchema  = new mongoose.Schema({
    
    name:String,
    account_number:String,
    amount:Number
  });

  var Contact = mongoose.model('Contact', contactSchema);

  module.exports=Contact;