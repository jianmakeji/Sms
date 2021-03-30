'use strict'

const Controller = require('egg').Controller;
const BaseController = require('./BaseController');

class TaskSmsController extends BaseController{
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.taskSms.list(query);
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async listTaskSmsByMassId() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      taskId: ctx.helper.parseInt(ctx.query.taskId),
    };

    try{
      const result = await ctx.service.taskSms.listTaskSmsByTaskId(query);
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.taskSms.find(ctx.helper.parseInt(ctx.params.id));
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
      await ctx.service.taskSms.createTaskSms(data);
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
      mobile:body.mobile,
      content:body.content
    };

    try{
      await ctx.service.taskSms.update({ id, updates });
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
      await ctx.service.taskSms.del(id);
      super.success('删除成功!');
    }
    catch(e){
      super.failure(e.message);
    }
  }


  async searchByMobile(){
    const ctx = this.ctx;
    const limit = ctx.helper.parseInt(ctx.query.limit);
    const offset = ctx.helper.parseInt(ctx.query.offset);
    const content = ctx.query.mobile;
    const query = {
      limit:limit,
      offset:offset,
      mobile:mobile
    };
    try{
      let result = await ctx.service.taskSms.searchByMobile(query);
      super.success(result);
    }
    catch(e){
        console.log(e);
      super.failure('获取数据失败');
    }
  }

}

module.exports = TaskSmsController;
