"use strict";

const Service = require("egg").Service;

class P2p extends Service {

  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.P2p.listP2p({
      offset,
      limit,
    });
  }

  async find(id) {
    const task = await this.ctx.model.P2p.findP2pById(id);
    return task;
  }

  async create(p2p) {
    const result = await this.ctx.model.P2p.createP2p(p2p);
    return result;
  }

  async update({ id, updates }) {
    const result = await this.ctx.model.P2p.updateP2p({ id, updates });
    return result;
  }

  async delete(id) {
    const result = await this.ctx.model.P2p.delP2pById(id);
    return result;
  }

  async findP2pByMobile(mobile){
    const result = await this.ctx.model.P2p.findP2pByMobile(mobile);
    return result;
  }

  async searchByMobile({ offset = 0, limit = 10,mobile='' }) {
    const result = await this.ctx.model.P2p.searchByMobile({offset,limit,mobile});
    return result;
  }
}

module.exports = P2p;
