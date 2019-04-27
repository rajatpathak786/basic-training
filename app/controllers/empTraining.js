import Responder from '../../server/expressResponder'
import empTrainingInsert from '../services/EmpTraining/empTrainingInsert'
import updateDrift from '../services/EmpTraining/updateDrift'
import empTrainingGet from '../services/EmpTraining/empTrainingGet'
import trelloUpdateBoard from '../services/EmpTraining/trelloUpdateBoard'
import trelloUpdateCard from '../services/EmpTraining/trelloUpdateCard'
import trelloUpdateList from '../services/EmpTraining/trelloUpdateList'
import updateDriftParams from '../services/EmpTraining/updateDriftParams'

export default class EmpTraining {

  static async empTrainingInsert(req, res) {
    const variable = req.body;
    variable.date=new Date();
    variable.endDate = new Date();
    variable.endDate = new Date(this.variable.endDate.setDate(this.variable.date.getDate() + 5));
    const empTrainingInsertResult = await empTrainingInsert.execute(variable)
    if (empTrainingInsertResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, empTrainingInsertResult.error)
    }
  }
  static async updateDrift(req, res) {
    const variable = req.body;
    variable.endDate = new Date();
    variable.Date = new Date();
    const updateDriftResult = await updateDrift.execute(variable)
    if (updateDriftResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, updateDriftResult.error)
    }
  }
  static async empTrainingGet(req, res) {
    const variable = 'Send Post in JSON format\neid:\nrid:\nmodulename:\ntaskstatus:';
    const empTrainingGetResult = await empTrainingGet.execute(variable)
    if (empTrainingGetResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, empTrainingGetResult.error)
    }
  }
  static async trelloUpdateBoard(req, res) {
    const variable = req.body;
    const trelloUpdateBoardResult = await trelloUpdateBoard.execute(variable)
    if (trelloUpdateBoardResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, trelloUpdateBoardResult.error)
    }
  }
  static async trelloUpdateCard(req, res) {
    const variable = req.body;
    const trelloUpdateCardResult = await trelloUpdateCard.execute(variable)
    if (trelloUpdateCardResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, trelloUpdateCardResult.error)
    }
  }
  static async trelloUpdateList(req, res) {
    const variable = req.body;
    const trelloUpdateListResult = await trelloUpdateList.execute(variable)
    if (trelloUpdateListResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, trelloUpdateListResult.error)
    }
  }
  static async updateDriftParams(req, res) {
    const variable = 'Send Post in JSON format:\nmoduleId:\ntaskId:\ndrift:\nremTasks:';
    const updateDriftParamsResult = await updateDriftParams.execute(variable)
    if (updateDriftParamsResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, updateDriftParamsResult.error)
    }
  }
  static async updateDriftParams(req, res) {
    const variable = 'Send Post in JSON format:\nmoduleId:\ntaskId:\ndrift:\nremTasks:';
    const updateDriftParamsResult = await updateDriftParams.execute(variable)
    if (updateDriftParamsResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, updateDriftParamsResult.error)
    }
  }
}
