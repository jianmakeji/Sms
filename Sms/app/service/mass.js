"use strict";

const Service = require("egg").Service;

class Mass extends Service {
  async list({ offset = 0, limit = 10, userId = 0 }) {
    return this.ctx.model.Mass.listMass({
      offset,
      limit,
      userId
    });
  }

  async find(id) {
    const task = await this.ctx.model.Mass.findMassById(id);
    return task;
  }

  async create(data) {
    let content = data.content;
    let channel = data.channel;
    let mobiles = data.mobiles;
    let mass = {
      channel:channel,
      content:content
    };
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      let obj = await this.ctx.model.Mass.createMass(mass,transaction);
      let massId = obj.Id;
      let mobileArray = mobiles.split(',');
      for (let mobile of mobileArray){
        if(mobile != ''){
          let massSms = {
            mobile:mobile,
            massId:massId,
          };
          await this.ctx.model.MassSms.createMassSms(massSms,transaction);
        }
      }
      await transaction.commit();
      return true
    } catch (e) {
      await transaction.rollback();
      return false
    }

  }

  async update({ id, updates }) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.Mass.updateMass({ id, updates });
      await transaction.commit();
      return true
    } catch (e) {
      await transaction.rollback();
      return false
    }
  }

  async delete(id) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.Mass.delMassById(id);
      await this.ctx.model.MassSms.delMassByMassId(id);
      await transaction.commit();
      return true
    } catch (e) {
      await transaction.rollback();
      return false
    }
  }

  async searchByContent(content) {
    const result = await this.ctx.model.Mass.searchByContent(content);
    return result;
  }
}

module.exports = Mass;
