import Responder from '../../server/expressResponder'
import SampleService from '../services/sample/sampleService'

export default class FileController {

  static async get(req, res) {
    const variable = 1
    const sampleServiceResult = await SampleService.execute(variable)
    if (sampleServiceResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, sampleServiceResult.error)
    }
  }

}
