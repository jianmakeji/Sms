'use strict'

const Controller = require('egg').Controller;
const BaseController = require('./BaseController');

class P2pController extends BaseController{
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    try{
      const result = await ctx.service.p2p.list(query);
      super.success(result);
    }
    catch(e){
      super.failure(e.message);
    }
  }

  async show() {
    const ctx = this.ctx;
    try{
      const result = await ctx.service.p2p.find(ctx.helper.parseInt(ctx.params.id));
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
      await ctx.service.p2p.createP2p(data);
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
      content:body.content,
      mobile:body.mobile,
    };

    try{
      await ctx.service.p2p.update({ id, updates });
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
      await ctx.service.p2p.del(id);
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
    const query = {
      limit:limit,
      offset:offset,
      mobile:mobile
    };
    try{
      let result = await ctx.service.p2p.searchByMobile(query);
      super.success(result);
    }
    catch(e){
        console.log(e);
      super.failure('获取数据失败');
    }
  }

}

module.exports = P2pController;
