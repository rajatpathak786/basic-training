const babel = require("babel-core");
import Responder from '../../server/expressResponder'
import employeeInsert from '../services/Employee/employeeInsert'
import employeeDelete from '../services/Employee/employeeDelete'
import employeeUpdate from '../services/Employee/employeeUpdate'
import employeeFetchId from '../services/Employee/employeeFetchId'
import employeeFetch from '../services/Employee/employeeFetch'
import employeeGet from '../services/Employee/employeeGet'

export default class Employee {

  static async postEmployeeInsert(req, res) {
    const variable = req.body;
    const employeeInsertResult = await employeeInsert.execute(variable)
    if (employeeInsertResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, employeeInsertResult.error)
    }
  }
  
  static async getemployeeDelete(req, res) {
    const variable = req.query;
    const employeeDeleteResult = await employeeDelete.execute(variable)
    if (employeeDeleteResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, employeeDeleteResult.error)
    }
  }
  static async getemployeeFetchId(req, res) {
    const variable = req.query;
    const employeeFetchIdResult = await employeeFetchId.execute(variable)
    if (employeeFetchIdResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, employeeFetchIdResult.error)
    }
  }
  static async getemployeeUpdate(req, res) {
    const variable = req.body;
    const employeeUpdateResult = await employeeUpdate.execute(variable)
    if (employeeUpdateResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, employeeUpdateResult.error)
    }
  }
  static async getemployeeFetch(req, res) {
    const variable = 'post data in Json format\nname:';
    const employeeFetchResult = await employeeFetch.execute(variable)
    if (employeeFetchResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, employeeFetchResult.error)
    }
  }
  static async getemployeeGet(req, res) {
    const variable = 'send post request in json format\n name: \nemail:';
    const employeeGetResult = await employeeGet.execute(variable)
    if (employeeGetResult.successful) {
      Responder.success(res, { variable })
    } else {
      Responder.operationFailed(res, employeeGetResult.error)
    }
  }
}
