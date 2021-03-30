const moment = require('moment');
module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const P2p = app.model.define('p2p', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mobile:{
      type: STRING(15),
      allowNull: true
    },
    content: {
      type: STRING(512),
      allowNull: true
    },
    sendStatus: {
      type: INTEGER(8),
      defaultValue: ''
    },
    sendResult:{
      type: STRING(30),
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
    tableName: 'p2p'
  });

  P2p.listP2p = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  P2p.findP2pById = async function (id) {
    const p2p = await this.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    return p2p;
  }

  P2p.createP2p = async function (p2p,transaction) {
    return await this.create(p2p,{
      transaction:transaction
    });
  }

  P2p.updateP2p = async function ({ id, updates }) {
    const p2p = await this.findByPk(id);
    if (!p2p) {
      throw new Error('p2p not found');
    }
    return p2p.update(updates);
  }

  P2p.delP2pById = async function (id,transaction) {
    return await this.destroy({
      transaction:transaction,
      where:{
        Id:id
      }
    });
  }

  P2p.findP2pByMobile = async function(mobile){
    return await this.findOne({
      where:{
        mobile:mobile
      }
    });
  }

  P2p.searchByMobile = async function({ offset = 0, limit = 10, mobile='' }){

    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    };

    if(mobile != null && mobile !=''){
      condition.where = {};
      condition.where.mobile = {
        [app.Sequelize.Op.like]: '%'+mobile+'%'
      }
    }

    return this.findAndCountAll(condition);
  }

  return P2p;
};
