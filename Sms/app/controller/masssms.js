'use strict'

const Controller = require('egg').Controller;
const BaseController = require('./BaseController');

class MassSmsController extends BaseController{
  async index() {
    const ctx = this.ctx;
    let userId = ctx.helper.parseInt(ctx.user.Id);
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      userId:userId
    };

    try{
      const result = await ctx.service.massSms.list(query);
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async listMassSmsByMassId() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      massId: ctx.helper.parseInt(ctx.query.massId),
    };

    try{
      const result = await ctx.service.massSms.listMassSmsByMassId(query);
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.massSms.find(ctx.helper.parseInt(ctx.params.id));
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
      await ctx.service.massSms.createMass(data);
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
      content:body.content
    };

    try{
      await ctx.service.massSms.update({ id, updates });
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
      await ctx.service.massSms.del(id);
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
    const mobile = ctx.query.mobile;
    const status = ctx.helper.parseInt(ctx.query.status);
    //let userId = ctx.helper.parseInt(ctx.user.Id);

    let userId = 1;
    const query = {
      limit:limit,
      offset:offset,
      mobile:mobile,
      userId:userId,
      status:status
    };
    try{
      let result = await ctx.service.massSms.searchByMobile(query);
      super.success(result);
    }
    catch(e){
        console.log(e);
      super.failure('获取数据失败');
    }
  }

}

module.exports = MassSmsController;
