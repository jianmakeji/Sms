"use strict";

const Service = require("egg").Service;

class Task extends Service {

  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Task.listTask({
      offset,
      limit,
    });
  }

  async find(id) {
    const task = await this.ctx.model.Task.findTaskById(id);
    return task;
  }

  async create(taskObj,smsList){
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      let obj = await this.ctx.model.Task.createTask(taskObj,transaction);
      for (let smsObj of smsList){
        let taskSms = {
            taskId:obj.Id,
            mobile:smsObj.mobile,
            content:smsObj.content,
        };
        await this.ctx.model.TaskSms.createTaskSms(taskSms,transaction);
      }
      await transaction.commit();
      return true
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return false
    }
  }

  async update({ id, updates, smsList }){
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const result = await this.ctx.model.Task.updateTask({ id, updates });
      await this.ctx.model.TaskSms.delTaskSmsByTaskId(id,transaction);
      for (let smsObj of smsList){
        let taskSms = {
            taskId:id,
            mobile:smsObj.mobile,
            content:smsObj.content,
        };
        await this.ctx.model.TaskSms.createTaskSms(taskSms,transaction);
      }
      await transaction.commit();
      return true
    } catch (e) {
      await transaction.rollback();
      return false
    }
  }

  async delete(id){
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.Task.delTaskById(id,transaction);
      await this.ctx.model.TaskSms.delTaskSmsByTaskId(id,transaction);
      await transaction.commit();
      return true
    } catch (e) {
      await transaction.rollback();
      return false
    }
  }

  async searchByName({ offset = 0, limit = 10,name='' }){
    const result = await this.ctx.model.Task.searchByName({offset,limit,name});
    return result;
  }
}

module.exports = Task;
