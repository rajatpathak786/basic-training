import Responder from '../../server/expressResponder'
import taskInsert from '../services/Task/taskInsert'
import taskDelete from '../services/Task/taskDelete'
import taskFetchId from '../services/Task/taskFetchId'
import taskUpdate from '../services/Task/taskUpdate'
import taskGet from '../services/Task/taskGet'
import taskFetch from '../services/Task/taskFetch'

export default class FileController {

  static async taskInsert(req, res) {
    const variable = req.body;
    const taskInsertResult = await taskInsert.execute(variable)
    if (taskInsertResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, taskInsertResult.error)
    }
  }
  static async taskDelete(req, res) {
    const variable = req.query;
    const taskDeleteResult = await taskDelete.execute(variable)
    if (taskDeleteResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, taskDeleteResult.error)
    }
  }
  static async taskFetchId(req, res) {
    const variable = req.query;
    const taskFetchIdResult = await taskFetchId.execute(variable)
    if (taskFetchIdResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, taskFetchIdResult.error)
    }
  }
  static async taskUpdate(req, res) {
    const variable = req.body;
    const taskUpdateResult = await taskUpdate.execute(variable)
    if (taskUpdateResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, taskUpdateResult.error)
    }
  }
  static async taskGet(req, res) {
    const variable = 'send json in format\n taskname:';
    const taskGetResult = await taskGet.execute(variable)
    if (taskGetResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, taskGetResult.error)
    }
  }
  static async taskFetch(req, res) {
    const variable = 'Post response in Json format\ntaskname:';
    const taskFetchResult = await taskFetch.execute(variable)
    if (taskFetchResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, taskFetchResult.error)
    }
  }
}
