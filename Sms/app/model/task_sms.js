const moment = require("moment");
module.exports = (app) => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const TaskSms = app.model.define(
    "TaskSms",
    {
      Id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      taskId: {
        type: INTEGER(11),
        defaultValue: "",
      },
      mobile: {
        type: STRING(15),
        allowNull: true,
      },
      content: {
        type: STRING(255),
        allowNull: true,
      },
      sendStatus: {
        type: INTEGER(8),
        allowNull: true,
      },
      sendResult: {
        type: STRING(30),
        allowNull: true,
      }
    },
    {
      tableName: "task_sms",
    }
  );

  TaskSms.associate = function() {
    app.model.TaskSms.hasOne(app.model.Task, {sourceKey:'taskId',foreignKey: 'Id'});
  };

  TaskSms.listTaskSms = async function ({ offset = 0, limit = 10,userId=0 }) {
    return this.findAndCountAll({
      offset,
      limit,
      include: [{
        model: app.model.Task,
        attributes:['Id','name'],
        where:{
          userId:userId
        }
      }],
      order: [
        ["Id", "desc"],
      ],
    });
  };

  TaskSms.listTaskSmsByTaskId = async function ({ offset = 0, limit = 10, taskId=0 }) {
    let condition = {
        offset,
        limit,
        order: [
          ["Id", "desc"],
        ],
    };

    if(taskId != 0){
        condition.where = {};
        condition.where.taskId = taskId;
    }

    return this.findAndCountAll(condition);
  };

  TaskSms.findTaskSmsById = async function (id) {
    const tasksms = await this.findByPk(id);
    if (!tasksms) {
      throw new Error("tasksms not found");
    }
    return tasksms;
  };

  TaskSms.createTaskSms = async function (tasksms, transaction) {
    return await this.create(tasksms, {
      transaction: transaction,
    });
  };

  TaskSms.updateTaskSms = async function ({ id, updates }) {
    const tasksms = await this.findByPk(id);
    if (!tasksms) {
      throw new Error("TaskSms not found");
    }
    return tasksms.update(updates);
  };

  TaskSms.delTaskSmsById = async function (id, transaction) {
    return await this.destroy({
      transaction: transaction,
      where: {
        Id: id,
      },
    });
  };

  TaskSms.delTaskSmsByTaskId = async function (taskId, transaction) {
    return await this.destroy({
      transaction: transaction,
      where: {
        taskId: taskId,
      },
    });
  };

  TaskSms.searchByMobile = async function ({
    offset = 0,
    limit = 10,
    mobile = "",
    userId = 0,
  }) {
    let condition = {
      offset,
      limit,
      include: [{
        model: app.model.Task,
        attributes:['Id','name'],
        where:{
          userId:userId
        }
      }],
      order: [
        ["Id", "desc"],
      ],
    };

    if (mobile != null && mobile != "") {
      condition.where = {};
      condition.where.mobile = {
        [app.Sequelize.Op.like]: "%" + mobile + "%",
      };
    }

    return this.findAndCountAll(condition);
  };

  return TaskSms;
};
