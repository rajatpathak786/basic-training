import Responder from '../../server/expressResponder'
import moduleDelete from '../services/Module/moduleDelete'
import moduleFetchId from '../services/Module/moduleFetchId'
import moduleInsert from '../services/Module/moduleInsert'
import moduleUpdate from '../services/Module/moduleUpdate'
import moduleFetch from '../services/Module/moduleFetch'
import moduleGet from '../services/Module/moduleGet'

export default class Module {

  static async moduleFetchId(req, res) {
    const variable = req.query;
    const moduleFetchIdResult = await moduleFetchId.execute(variable)
    if (moduleFetchIdResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, moduleFetchIdResult.error)
    }
  }
  static async moduleInsert(req, res) {
    const variable = req.body;
    const moduleInsertResult = await moduleInsert.execute(variable)
    if (moduleInsertResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, moduleInsertResult.error)
    }
  }
  static async moduleUpdate(req, res) {
    const variable = req.body
    const moduleUpdateResult = await moduleUpdate.execute(variable)
    if (moduleUpdateResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, moduleUpdateResult.error)
    }
  }
  static async moduleDelete(req, res) {
    const variable = req.body;
    const moduleDeleteResult = await moduleDelete.execute(variable)
    if (moduleDeleteResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, moduleDeleteResult.error)
    }
  }
  static async moduleFetch(req, res) {
    const variable = 'Post Json in format: \nmodulename:'
    const moduleFetchResult = await moduleFetch.execute(variable)
    if (moduleFetchResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, moduleFetchResult.error)
    }
  }
  static async moduleGet(req, res) {
    const variable = 'Post Json in format: \n modulename:\n taskId:';
    const moduleGetResult = await moduleGet.execute(variable)
    if (moduleGetResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, moduleGetResult.error)
    }
  }
}
