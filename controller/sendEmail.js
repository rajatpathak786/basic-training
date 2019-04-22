const nodemailer = require("nodemailer");
const emptrainingtable = require('../models').empTraingTable;
const emptable = require('../models').empTable;
const moduletable = require('../models').moduleTable;

// async..await is not allowed in global scope, must use a wrapper
let sendEmail = async (obj) => {

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: obj.sender, // sender address
    to: obj.receiver, // list of receivers
    subject: obj.subject, // Subject line
    text: `${obj.employeeName} ${obj.moduleName} ${obj.taskName} ${obj.doc} `, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
(req,res) => {
  let obj = {};
  if (req.query.name) {
    let nowDate = new Date()
    emptable.findAll({
      attributes:['id','empEmail'],
      where:{
        name: req.query.name
      }
    })
    .then((empid)=>{
      emptrainingtable.findAll({
        attributes:['id','rId','moduleId','taskId'],
        where:{
          eId: empid[0].id,
          //taskId: req.id
        }
      })
      .then((modulename) => {
        moduletable.findAll({
          attributes: ['moduleName'],
          where:{id: modulename[0].moduleId}
        })
        .then((taskname) => {
          tasktable.findAll({
            attributes: ['taskName'],
            where:{id: modulename[0].taskId[i]}
          })
          .then((reviewmail) => {
            emptable.findAll({
              attributes: ['empEmail'],
              where:{id: modulename[0].rId}
            })
            .then((ret) => {
              emptrainingtable.findAll({
                attributes: ['expectedDateOfCompletion'],
                where:{id: modulename[0].id}
              })
              .then((doc) => {
                obj.recEmail = empid[0].empEmail;
                obj.senEmail = ret[0].empEmail;
                obj.subject = `Complete ${taskname[0].moduleName} ${reviewmail[0].taskName}`;
                obj.empName =  req.query.name;
                obj.moduleName = taskname[0].moduleName;
                obj.taskName = reviewmail[0].taskName;
                obj.doc = doc[0].expectedDateOfCompletion;
              })
            })            
          })
        })        
      })     
    })
  }
}
sendEmail({sender: 'vkjvivek7@gmail.com',
receiver:'rajatpathak786@gmail.com',
subject:'Assignment no. completed',
employeeName:'Rajat Pathak',
moduleName:'Nodejs',
taskName:'Nodejs task',
doc:'23/06/2019'})



/*

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


*/