const nodemailer = require("nodemailer");
const emptrainingtable = require('../models').empTraingTable;
const emptable = require('../models').empTable;
const moduletable = require('../models').moduleTable;
const tasktable = require('../models').taskTable;

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
      console.log('emp id       '+moduletaskid[0].id+'     empEmail   '+moduletaskid[0].empEmail);
      moduletable.findAll({
        attributes: ['id', 'taskId'],
        where: {moduleName: req.body.mname}
      })
      .then(async(empid) => {
        console.log('module id       '+empid[0].id+'     taskId(array)   '+empid[0].taskId);
        let length = empid[0].taskId.length;
        for (let i = 0; length > i; i++) {
        await emptrainingtable.findAll({
          attributes:['id','reviewerId','moduleId','taskId','expectedDateOfCompletion'],
          where:{
            empId: moduletaskid[0].id,
            taskId: empid[0].taskId[i]
          }
        })
        .then(async(modulename) => {
          console.dir (modulename);
          console.log(`emp training id ${modulename[0].id} reviwid ${modulename[0].reviewerId} moduleId ${modulename[0].moduleId} taskId ${modulename[0].taskId} expDOC ${modulename[0].expectedDateOfCompletion}`)
          await moduletable.findAll({
            attributes: ['moduleName'],
            where:{id: modulename[0].moduleId}
          })
          .then(async(taskname) => {
            await tasktable.findAll({
              attributes: ['taskName'],
              where:{id: modulename[0].taskId[i]}
            })
            .then(async(reviewmail) => {
              await emptable.findAll({
                attributes: ['empEmail'],
                where:{id: modulename[0].reviewerId}
              })
              .then(async(ret) => {
                await emptrainingtable.findAll({
                  attributes: ['expectedDateOfCompletion'],
                  where:{id: modulename[0].id}
                })
                .then(async(doc) => {
                  obj.recEmail = moduletaskid[0].empEmail;
                  obj.senEmail = ret[0].empEmail;
                  obj.subject = `Complete ${taskname[0].moduleName} ${reviewmail[0].taskName}`;
                  obj.empName =  req.query.name;
                  obj.moduleName = taskname[0].moduleName;
                  obj.taskName = reviewmail[0].taskName;
                  obj.doc = doc[0].expectedDateOfCompletion;
                  console.log(obj);
                  await sendEmail({sender: obj.senEmail, receiver: obj.recEmail, subject: obj.subject, employeeName: obj.empName, moduleName: obj.moduleName, taskName: obj.taskName, doc: obj.doc});
                })
              })            
            })
          })        
       // modulename[0].expectedDateOfCompletion
        })     
      }})
    })
  }
}

module.exports = {
  sendMail, 
  sendEmailParams
}