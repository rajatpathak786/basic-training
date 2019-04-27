const nodemailer = require("nodemailer");
const emptrainingtable = require('../models').empTraingTable;
const emptable = require('../models').empTable;
const moduletable = require('../models').moduleTable;

let sendEmail = async (obj) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass 
    }
  });
  let info = await transporter.sendMail({
    from: obj.sender, 
    to: obj.receiver, 
    subject: obj.subject, 
    text: `Hi ${obj.employeeName},\n${obj.moduleName} ${obj.taskName} task must be completed by ${obj.doc} `, // plain text body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

let sendEmailParams = (req, res) => {
  res.send('Send post request for sending email in JSON format:\nname:\nmnane:')
}

let sendMail = (req,res) => {
  let obj = {};
  console.log(obj);
  if (req.body.name) {
    let nowDate = new Date()
    emptable.findAll({
      attributes:['id','empEmail'],
      where:{
        empName: req.body.name
      }
    })
    .then((moduletaskid) => {
      moduletable.findAll({
        attributes: ['id', 'taskId'],
        where: {moduleName: req.body.mname}
      })
      .then((empid) => {
        let length = empid[0].taskId.length;
        for (let i = 0; length > i; i++) {
        emptrainingtable.findAll({
          attributes:['id','reviewerId','moduleId','taskId'],
          where:{
            empId: moduletaskid[0].id,
            taskId: empid[0].taskId[i]
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
                where:{id: modulename[0].reviewerId}
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
                  sendEmail({sender: obj.senEmail, receiver: obj.recEmail, subject: obj.subject, employeeName: obj.empName, moduleName: obj.moduleName, taskName: obj.taskName, doc: obj.doc});
                })
              })            
            })
          })        
        })     
      }})
    })
  }
}

module.exports = {
  sendMail, 
  sendEmailParams
}