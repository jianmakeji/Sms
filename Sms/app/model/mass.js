const moment = require('moment');
module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Mass = app.model.define('mass', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: INTEGER(11),
      allowNull: false
    },
    channelId:{
      type: INTEGER(11),
      allowNull: false
    },
    content:{
      type: STRING(520),
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
    tableName: 'mass'
  });

  Mass.associate = function() {
    app.model.Mass.hasMany(app.model.MassSms,{sourceKey:'Id',foreignKey: 'massId'});
    app.model.Task.hasOne(app.model.Channel,{sourceKey:'channelId',foreignKey: 'Id'});
  };

  Mass.listMass = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      include: [{
        model: app.model.Channel,
        attributes:['Id','name']
      }],
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  Mass.findMassById = async function (id) {
    const mass = await this.findByPk(id);
    if (!mass) {
      throw new Error('user not found');
    }
    return mass;
  }

  Mass.createMass = async function (mass,transaction) {
    return await this.create(mass,{
      transaction:transaction
    });
  }

  Mass.updateMass = async function ({ id, updates }) {
    const mass = await this.findByPk(id);
    if (!mass) {
      throw new Error('Mass not found');
    }
    return mass.update(updates);
  }

  Mass.delMassById = async function (id,transaction) {
    return await this.destroy({
      transaction:transaction,
      where:{
        Id:id
      }
    });
  }

  Mass.searchByContent = async function({ offset = 0, limit = 10, content='' }){

    let condition = {
      offset,
      limit,
      include: [{
        model: app.model.Channel,
        attributes:['Id','name']
      }],
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    };

    if(content != null && content !=''){
      condition.where = {};
      condition.where.content = {
        [app.Sequelize.Op.like]: '%'+content+'%'
      }
    }

    return this.findAndCountAll(condition);
  }

  return Mass;
};
