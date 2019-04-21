let submitGet = (req, res) => {
  res.send('Send Post in JSON format\neid:\nmodulename:\ntaskname:');
  res.end();    
}
let submitUpdate = (req, res) => {
  //update task status
}
module.exports = {
  submitGet,
  submitUpdate
}