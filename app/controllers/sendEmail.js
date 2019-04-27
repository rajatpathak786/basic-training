import Responder from '../../server/expressResponder'
import sendEmail from '../services/email/sendEmail'
import sendEmailParams from '../services/email/sendEmailParams'

export default class sendEmail {

  static async sendEmail(req, res) {
    const variable = req.body;
    const sendEmailResult = await sendEmail.execute(variable)
    if (sendEmailResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, sendEmailResult.error)
    }
  }
  static async sendEmailParams(req, res) {
    const variable = 'Send post request for sending email in JSON format:\nname:\nmnane:';
    const sendEmailParamsResult = await sendEmailParams.execute(variable)
    if (sendEmailParamsResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, sendEmailParamsResult.error)
    }
  }
 
}
