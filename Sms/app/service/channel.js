"use strict";

const Service = require("egg").Service;

class Channel extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Channel.listChannel({
      offset,
      limit,
    });
  }

  async find(id) {
    const task = await this.ctx.model.Channel.findChannelById(id);
    return task;
  }

  async create(channel) {
    let obj = await this.ctx.model.Channel.createChannel(channel);
    return obj;
  }

  async update({ id, updates }) {
    const result = await this.ctx.model.Channel.updateChannel({ id, updates });
    return result;
  }

  async delete(id) {
    const result = await this.ctx.model.Channel.delChannelById(id);
    return result;
  }
}

module.exports = Channel;
