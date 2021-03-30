"use strict";

const Service = require("egg").Service;

class TaskSms extends Service {

  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.TaskSms.listTaskSms({
      offset,
      limit,
    });
  }

  async find(id) {
    const task = await this.ctx.model.TaskSms.findTaskSmsById(id);
    return task;
  }

  async create(tasksms) {
    const result = await this.ctx.model.TaskSms.createTaskSms(tasksms);
    return result;
  }

  async update({ id, updates }) {
    const result = await this.ctx.model.TaskSms.updateTaskSms({ id, updates });
    return result;
  }

  async delete(id) {
    const result = await this.ctx.model.TaskSms.delTaskSmsById(id);
    return result;
  }

  async findTaskSmsByMobile(mobile) {
    const result = await this.ctx.model.TaskSms.findTaskSmsByMobile(mobile);
    return result;
  }

  async searchByMobile({ offset = 0, limit = 10, mobile = "" }) {
    const result = await this.ctx.model.TaskSms.searchByMobile({
      offset,
      limit,
      mobile,
    });
    return result;
  }
}

module.exports = TaskSms;
