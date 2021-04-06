'use strict'

const Controller = require('egg').Controller;
const BaseController = require('./BaseController');
const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');

class TaskController extends BaseController{
  async index() {
    const ctx = this.ctx;
    let userId = ctx.helper.parseInt(ctx.user.Id);
    if(ctx.user){
      if(ctx.user.roles[0].name == 'admin'){
        userId = 0;
      }
    }
    else{
      userId = -1;
    }
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      userId:userId
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
    let fileTagget = path.join(ctx.helper.basePath, ctx.helper.task);
    let body = ctx.request.body;
    let filename = body.excelFileName;
    //let userId = ctx.helper.parseInt(ctx.user.Id);
    let userId = 1;
    let countRecord = 0;
    var workbook = new Excel.Workbook();
    let smsList = [];
    let target = path.join(fileTagget,filename);
    await workbook.xlsx.readFile(target).then(function() {
      var worksheet = workbook.getWorksheet(1);
      if(worksheet.rowCount > 1){
        worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
          if (rowNumber != 1){
              let smsObj = {
                mobile : row.getCell(1).value,
                content : row.getCell(2).value,
              };
              smsList.push(smsObj);
          }
        });
        countRecord = smsList.length;
      }
    });
    let taskObj = {
      channel:body.channel,
      userId:userId,
      name:body.name,
      sendCount:countRecord,
    };
    try{
      await ctx.service.task.create(taskObj,smsList);

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
    let filename = body.excelFileName;
    let userId = ctx.helper.parseInt(ctx.user.Id);
    let countRecord = 0;
    var workbook = new Excel.Workbook();
    let smsList = [];
    let target = path.join(fileTagget,filename);
    await workbook.xlsx.readFile(target).then(function() {
      var worksheet = workbook.getWorksheet(1);
      if(worksheet.rowCount > 1){
        worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
          if (rowNumber != 1){
              let smsObj = {
                mobile : row.getCell(1).value,
                content : row.getCell(2).value,
              };
              smsList.push(smsObj);
          }
        });
        countRecord = smsList.length;
      }
    });
    let taskObj = {
      channel:body.channel,
      userId:userId,
      name:body.name,
      sendCount:countRecord,
    };

    try{
      await ctx.service.task.update({ id, taskObj, smsList});
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
    if(ctx.user){
      if(ctx.user.roles[0].name == 'admin'){
        userId = 0;
      }
    }
    else{
      userId = -1;
    }

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
