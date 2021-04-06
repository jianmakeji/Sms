const moment = require('moment');
module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN,FLOAT } = app.Sequelize;

  const Channel = app.model.define('channel', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: STRING(15),
      allowNull: true
    },
    money:{
      type: FLOAT,
      allowNull: true
    },
    remark:{
      type: STRING(255),
      allowNull: true
    },
    createAt: {
      type: DATE,
      allowNull: false,
      defaultValue: app.Sequelize.literal('CURRENT_TIMESTAMP'),
      get(){
        return moment(this.getDataValue('createAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    tableName: 'channel'
  });

  Channel.listChannel = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  Channel.findChannelById = async function (id) {
    const Channel = await this.findByPk(id);
    if (!Channel) {
      throw new Error('user not found');
    }
    return Channel;
  }

  Channel.createChannel = async function (channel) {
    console.log('=====:'+channel);
    return await this.create(channel);
  }

  Channel.updateChannel = async function ({ id, updates }) {
    const Channel = await this.findByPk(id);
    if (!Channel) {
      throw new Error('Channel not found');
    }
    return Channel.update(updates);
  }

  Channel.delChannelById = async function (id,transaction) {
    return await this.destroy({
      transaction:transaction,
      where:{
        Id:id
      }
    });
  }

  return Channel;
};
