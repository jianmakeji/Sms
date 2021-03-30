const moment = require('moment');
module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Task = app.model.define('task', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: STRING(255),
      allowNull: true
    },
    sendCount: {
      type: INTEGER(11),
      defaultValue: ''
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
    tableName: 'task'
  });

  Task.associate = function() {
    app.model.Task.hasMany(app.model.TaskSms,{sourceKey:'Id',foreignKey: 'taskId'});
  };

  Task.listTask = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    });
  }

  Task.findTaskById = async function (id) {
    const task = await this.findByPk(id);
    if (!task) {
      throw new Error('user not found');
    }
    return task;
  }

  Task.createTask = async function (task,transaction) {
    return await this.create(task,{
      transaction:transaction
    });
  }

  Task.updateTask = async function ({ id, updates }) {
    const task = await this.findByPk(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task.update(updates);
  }

  Task.delTaskById = async function (id,transaction) {
    return await this.destroy({
      transaction:transaction,
      where:{
        Id:id
      }
    });
  }

  Task.searchByName = async function({ offset = 0, limit = 10, name='' }){

    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
    };

    if(name != null && name !=''){
      condition.where = {};
      condition.where.name = {
        [app.Sequelize.Op.like]: '%'+name+'%'
      }
    }

    return this.findAndCountAll(condition);
  }

  return Task;
};
