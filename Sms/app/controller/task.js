'use strict'

const Controller = require('egg').Controller;
const BaseController = require('./BaseController');

class TaskController extends BaseController{
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.task.list(query);
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.task.find(ctx.helper.parseInt(ctx.params.id));
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
      let data = ctx.request.body;
      await ctx.service.task.createTask(data);
      super.success('创建成功!');
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    let body = ctx.request.body;
    let updates = {
      name:body.name,
    };

    try{
      await ctx.service.task.update({ id, updates });
      super.success('更新成功!');
    }
    catch(e){
      console.log(e);
      super.failure(e.message);
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.task.del(id);
      super.success('删除成功!');
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async searchByName(){
    const ctx = this.ctx;
    const limit = ctx.helper.parseInt(ctx.query.limit);
    const offset = ctx.helper.parseInt(ctx.query.offset);
    const name = ctx.query.name;
    const query = {
      limit:limit,
      offset:offset,
      name:name
    };
    try{
      let result = await ctx.service.task.searchByName(query);
      super.success(result);
    }
    catch(e){
        console.log(e);
      super.failure('获取数据失败');
    }
  }

}

module.exports = TaskController;
