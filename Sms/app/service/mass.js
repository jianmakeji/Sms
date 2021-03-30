"use strict";

const Service = require("egg").Service;

class Mass extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Mass.listMass({
      offset,
      limit,
    });
  }

  async find(id) {
    const task = await this.ctx.model.Mass.findMassById(id);
    return task;
  }

  async create(mass) {
    const result = await this.ctx.model.Mass.createMass(mass);
    return result;
  }

  async update({ id, updates }) {
    const result = await this.ctx.model.Mass.updateMass({ id, updates });
    return result;
  }

  async delete(id) {
    const result = await this.ctx.model.Mass.delMassById(id);
    return result;
  }

  async searchByContent(content) {
    const result = await this.ctx.model.Mass.searchByContent(content);
    return result;
  }
}

module.exports = Mass;
