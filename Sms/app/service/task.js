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

  async create(task){
    const result = await this.ctx.model.Task.createTask(task);
    return result;
  }

  async update({ id, updates }){
    const result = await this.ctx.model.Task.updateTask({ id, updates });
    return result;
  }

  async delete(id){
    const result = await this.ctx.model.Task.delTaskById(id);
    return result;
  }

  async searchByName({ offset = 0, limit = 10,name='' }){
    const result = await this.ctx.model.Task.searchByName({offset,limit,name});
    return result;
  }
}

module.exports = Task;
