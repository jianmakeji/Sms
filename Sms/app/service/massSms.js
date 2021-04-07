"use strict";

const Service = require("egg").Service;

class MassSms extends Service {

  async list({ offset = 0, limit = 10, userId = 0 }) {
    return this.ctx.model.MassSms.listMassSms({
      offset,
      limit,
      userId,
    });
  }

  async find(id) {
    const task = await this.ctx.model.MassSms.findMassSmsById(id);
    return task;
  }

  async create(masssms) {
    const result = await this.ctx.model.MassSms.createMassSms(masssms);
    return result;
  }

  async update({ id, updates }) {
    const result = await this.ctx.model.MassSms.updateMassSms({ id, updates });
    return result;
  }

  async delete(id) {
    const result = await this.ctx.model.MassSms.delMassSmsById(id);
    return result;
  }

  async listMassSmsByMassId({ offset = 0, limit = 10, massId = 0 }) {
    const result = await this.ctx.model.MassSms.listMassSmsByMassId({
      offset,
      limit,
      massId,
    });
    return result;
  }

  async searchByMobile({ offset = 0, limit = 10, mobile='',userId = 0, }) {
    const result = await this.ctx.model.MassSms.searchByMobile({offset, limit, mobile,userId});
    return result;
  }

}

module.exports = MassSms;
