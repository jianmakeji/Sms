'use strict';

const BaseController = require('./BaseController');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const Excel = require('exceljs');

class FileController extends BaseController {

    async uploadExcelFile() {
        const ctx = this.ctx;
        let fileType = ctx.params.fileType;
        let fileTagget = '';
        let taskId = 0;
        let templateId = 0;

        if(!fs.existsSync(ctx.helper.basePath)){
          fs.mkdirSync(ctx.helper.basePath);
        }

        if (fileType == 1){
          fileTagget = path.join(ctx.helper.basePath, ctx.helper.task);
        }

        if(!fs.existsSync(fileTagget)){
          fs.mkdirSync(fileTagget);
        }

        let result = {
          status:200
        };

        const stream = await ctx.getFileStream();

        try {

          const filename = ctx.helper.randomString(8) + path.extname(stream.filename);

          const target = path.join(fileTagget, filename);
          const writeStream = fs.createWriteStream(target);
          await awaitWriteStream(stream.pipe(writeStream));

          let countRecord = 0;
          var workbook = new Excel.Workbook();
          await workbook.xlsx.readFile(target)
          .then(function() {
            var worksheet = workbook.getWorksheet(1);
            if(worksheet.rowCount > 1){
              countRecord = worksheet.rowCount - 1;
            }
          });

          result.countRecord = countRecord;
          result.filename = filename;
        } catch (err) {
            //如果出现错误，关闭管道
          ctx.logger.error(err.message);
          await sendToWormhole(stream);
          result.status = 500;
          result.message = err.message;
        }
        //文件响应
        ctx.body = result;
    }

    async importSmsData(){
      const ctx = this.ctx;
      let fileType = ctx.params.fileType;

      let fileTagget = '';
      let taskId = ctx.request.body.taskId;
      let templateId = ctx.request.body.templateId;
      let filename = ctx.request.body.filename;
      let userId = ctx.helper.parseInt(ctx.user.Id);

      if (fileType == 1){
        fileTagget = path.join(ctx.helper.basePath, ctx.helper.guangda);
      }
      else if (fileType == 2){
        fileTagget = path.join(ctx.helper.basePath, ctx.helper.suning);
      }
      else if (fileType == 3){
        fileTagget = path.join(ctx.helper.basePath, ctx.helper.picc);
      }
      else if (fileType == 4){
        fileTagget = path.join(ctx.helper.basePath, ctx.helper.mashang);
      }
      else if (fileType == 5){
        fileTagget = path.join(ctx.helper.basePath, ctx.helper.sunshine);
      }
      let result = {
        status:200
      };

      try {
        const target = path.join(fileTagget, filename);

        let guangdaList = [];
        let suningList = [];
        let piccList = [];
        let mashangList = [];
        let sunshineList = [];

        let countRecord = 0;
        var workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(target)
        .then(function() {
          var worksheet = workbook.getWorksheet(1);
          if(worksheet.rowCount > 1){

            if(fileType == 1){
              worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {

                if (rowNumber != 1){
                  let guangdaObj = {
                    userId:userId,
                    taskId:taskId,
                    templateId:templateId,
                    letterNo : row.getCell(1).value,
                    name : row.getCell(2).value,
                    card1 : row.getCell(3).value,
                    card2 : row.getCell(4).value,
                    idNum : row.getCell(5).value,
                    ownDate : row.getCell(6).value + '-' + row.getCell(7).value + '-' +row.getCell(8).value,
                    ownCount : row.getCell(9).value,
                    orgName : row.getCell(10).value,
                    lawer : row.getCell(11).value,
                    sendDate : row.getCell(12).value + '-' + row.getCell(13).value + '-' +row.getCell(14).value,
                    mobile : row.getCell(15).value,
                    assistant:row.getCell(16).value,
                    assistantTel:row.getCell(17).value,
                  };
                  guangdaList.push(guangdaObj);
                }
              });
              countRecord = guangdaList.length;
            }
            else if(fileType == 2){
              worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
                if (rowNumber != 1){
                  let suningObj = {
                    userId:userId,
                    taskId:taskId,
                    templateId:templateId,
                    name : row.getCell(1).value,
                    startDate : row.getCell(2).value + '-' + row.getCell(3).value + '-' +row.getCell(4).value,
                    endDate : row.getCell(5).value + '-' + row.getCell(6).value + '-' +row.getCell(7).value,
                    ownCount : row.getCell(8).value,
                    lawDate : row.getCell(9).value + '-' + row.getCell(10).value + '-' +row.getCell(11).value,
                    lawer : row.getCell(12).value,
                    contact : row.getCell(13).value,
                    mobile : row.getCell(14).value,
                    letterNo : row.getCell(15).value,
                    accountName : row.getCell(16).value,
                    bankName : row.getCell(17).value,
                    accountNo : row.getCell(18).value,
                  };

                  suningList.push(suningObj);
                }
              });
              countRecord = suningList.length;
            }
            else if(fileType == 3){
              worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {

                if (rowNumber != 1){
                  let piccObj = {
                    userId:userId,
                    taskId:taskId,
                    templateId:templateId,
                    letterNo : row.getCell(1).value,
                    name : row.getCell(2).value,
                    orgName : row.getCell(3).value,
                    cardNum : row.getCell(4).value,
                    ownCount : row.getCell(5).value,
                    ownDate : row.getCell(6).value + '-' + row.getCell(7).value + '-' +row.getCell(8).value,
                    lawer : row.getCell(9).value,
                    contact : row.getCell(10).value,
                    mobile : row.getCell(11).value,
                  };
                  piccList.push(piccObj);
                }
              });
              countRecord = piccList.length;
            }
            else if(fileType == 4){
              worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
                if (rowNumber != 1){

                  let mashangObj = {
                    userId:userId,
                    taskId:taskId,
                    templateId:templateId,
                    letterNo : row.getCell(1).value,
                    name : row.getCell(2).value,
                    startDate : row.getCell(3).value + '-' + row.getCell(4).value + '-' +row.getCell(5).value,
                    loanCount:row.getCell(6).value,
                    endDate : row.getCell(7).value + '-' + row.getCell(8).value + '-' +row.getCell(9).value,
                    ownCount : row.getCell(10).value,
                    ownDate : row.getCell(11).value,
                    lawer : row.getCell(12).value,
                    contact : row.getCell(13).value,
                    mobile : row.getCell(14).value,
                  };
                  mashangList.push(mashangObj);
                }
              });
              countRecord = mashangList.length;
            }
            else if(fileType == 5){
              worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
                if (rowNumber != 1){
                  let sunshineObj = {
                    userId:userId,
                    taskId:taskId,
                    templateId:templateId,
                    letterNo : row.getCell(1).value,
                    name : row.getCell(2).value,
                    contractNo : row.getCell(3).value,
                    ownDate : row.getCell(4).value + '-' + row.getCell(5).value + '-' +row.getCell(6).value,
                    ownCount:row.getCell(7).value,
                    letterDate : row.getCell(8).value + '-' + row.getCell(9).value + '-' +row.getCell(10).value,
                    lawer : row.getCell(11).value,
                    contact : row.getCell(12).value,
                    mobile : row.getCell(13).value,
                  };
                  sunshineList.push(sunshineObj);
                }
              });
              countRecord = sunshineList.length;
            }
          }
        });
        if(fileType == 1){
          try{
            let size = guangdaList.length;
            let newArr = [];
            let num = 500;
            let index = 0;
            for (let i = 0; i < size; i++) {
                  if (i % num === 0 && i !== 0) { // 可以被 10 整除
                      newArr.push(guangdaList.slice(index, i));
                      index = i;
                  };
                  if ((i + 1) === size) {
                      newArr.push(guangdaList.slice(index, (i + 1)));
                  }
            };

            for(let i = 0; i < newArr.length; i++){
              await ctx.service.letterObject.bulkCreateLetterObject(newArr[i],fileType,taskId);
            }
          }
          catch(e){
            countRecord = 0;
            result.status = 500;
            ctx.logger.error(e.message);
            result.message = e.message;
          }
        }
        else if(fileType == 2){
          try{
            let size = suningList.length;
            let newArr = [];
            let num = 500;
            let index = 0;
            for (let i = 0; i < size; i++) {
                  if (i % num === 0 && i !== 0) { // 可以被 10 整除
                      newArr.push(suningList.slice(index, i));
                      index = i;
                  };
                  if ((i + 1) === size) {
                      newArr.push(suningList.slice(index, (i + 1)));
                  }
            };

            for(let i = 0; i < newArr.length; i++){
              await ctx.service.letterObject.bulkCreateLetterObject(newArr[i],fileType,taskId);
            }

          }
          catch(e){
            countRecord = 0;
            result.status = 500;
            ctx.logger.error(e.message);
            result.message = e.message;
          }
        }
        else if(fileType == 3){
          try{
            let newArr = [];
            let size = piccList.length;
            let num = 500;
            let index = 0;
            for (let i = 0; i < size; i++) {
                  if (i % num === 0 && i !== 0) {
                      newArr.push(piccList.slice(index, i));
                      index = i;
                  };
                  if ((i + 1) === size) {
                      newArr.push(piccList.slice(index, (i + 1)));
                  }
            };

            for(let i = 0; i < newArr.length; i++){
              await ctx.service.letterObject.bulkCreateLetterObject(newArr[i],fileType,taskId);
            }
          }
          catch(e){
            countRecord = 0;
            result.status = 500;
            ctx.logger.error(e.message);
            result.message = e.message;
          }
        }
        else if(fileType == 4){
          try{
            let size = mashangList.length;
            let newArr = [];
            let num = 500;
            let index = 0;
            for (let i = 0; i < size; i++) {
                  if (i % num === 0 && i !== 0) {
                      newArr.push(mashangList.slice(index, i));
                      index = i;
                  };
                  if ((i + 1) === size) {
                      newArr.push(mashangList.slice(index, (i + 1)));
                  }
            };

            for(let i = 0; i < newArr.length; i++){
              await ctx.service.letterObject.bulkCreateLetterObject(newArr[i],fileType,taskId);
            }
          }
          catch(e){
            countRecord = 0;
            result.status = 500;
            ctx.logger.error(e.message);
            result.message = e.message;
          }
        }
        else if(fileType == 5){
          try{
            let size = sunshineList.length;
            let newArr = [];
            let num = 500;
            let index = 0;
            for (let i = 0; i < size; i++) {
                  if (i % num === 0 && i !== 0) {
                      newArr.push(sunshineList.slice(index, i));
                      index = i;
                  };
                  if ((i + 1) === size) {
                      newArr.push(sunshineList.slice(index, (i + 1)));
                  }
            };

            for(let i = 0; i < newArr.length; i++){
              await ctx.service.letterObject.bulkCreateLetterObject(newArr[i],fileType,taskId);
            }
          }
          catch(e){
            countRecord = 0;
            result.status = 500;
            ctx.logger.error(e.message);
            result.message = e.message;
          }
        }
        result.countRecord = countRecord;
      } catch (err) {
          //如果出现错误，关闭管道
        ctx.logger.error(err.message);
        await sendToWormhole(stream);
        result.status = 500;
        result.message = err.message;
        console.log(err);
      }
      //文件响应
      ctx.body = result;
    }

    async deleteFile(){
      const ctx = this.ctx;
      const fileType = ctx.params.fileType;
      let userId = ctx.user.Id;

      let dir = '';
      if (fileType == 1){
        dir = ctx.helper.postgraduatePath;
      }
      else if (fileType == 2){
        dir = ctx.helper.undergraduatePath;
      }

      try{
        let filePath = path.join(ctx.helper.basePath, dir, ctx.query.filename);
        if(fs.existsSync(filePath)){
          fs.unlinkSync(filePath);
        }
        super.success('删除成功!');
      }
      catch(e){
        super.failure(e);
      }

    }

    async uploadImagesFile() {
        const ctx = this.ctx;
        let fileType = ctx.params.fileType;
        let fileTagget = '';

        if(!fs.existsSync(ctx.helper.imagesBasePath)){
          fs.mkdirSync(ctx.helper.imagesBasePath);
        }

        if (fileType == 1){
          fileTagget = path.join(ctx.helper.imagesBasePath, ctx.helper.postgraduateImagesPath);
        }
        else if (fileType == 2){
          fileTagget = path.join(ctx.helper.imagesBasePath, ctx.helper.undergraduateImagesPath);
        }

        if(!fs.existsSync(fileTagget)){
          fs.mkdirSync(fileTagget);
        }

        let result = {
          status:200
        };

        const stream = await ctx.getFileStream();

        try {

          const filename = ctx.helper.randomString(8) + path.extname(stream.filename);

          const target = path.join(fileTagget, filename);
          const writeStream = fs.createWriteStream(target);
          await awaitWriteStream(stream.pipe(writeStream));
          if(fileType == 1){
            result.imagePath = ctx.helper.imagesBaseUrl + ctx.helper.postgraduateImagesPath + filename;
          }
          else{
            result.imagePath = ctx.helper.imagesBaseUrl + ctx.helper.undergraduateImagesPath + filename;
          }
          result.filename = filename;
        } catch (err) {
            //如果出现错误，关闭管道
          ctx.logger.error(err.message);
          await sendToWormhole(stream);
          result.status = 500;
          result.message = err.message;
        }
        //文件响应
        ctx.body = result;
    }
}

module.exports = FileController;
