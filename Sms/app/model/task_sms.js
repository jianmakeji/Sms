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
        defaultValue: "",
      },
      sendResult: {
        type: STRING(30),
        allowNull: true,
      },
      createAt: {
        type: DATE,
        allowNull: false,
        defaultValue: app.Sequelize.literal("CURRENT_TIMESTAMP"),
        get() {
          return moment(this.getDataValue("createAt")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
    },
    {
      tableName: "task_sms",
    }
  );

  TaskSms.listTaskSms = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [
        ["createAt", "desc"],
        ["Id", "desc"],
      ],
    });
  };

  TaskSms.findTaskSmsById = async function (id) {
    const tasksms = await this.findByPk(id);
    if (!tasksms) {
      throw new Error("user not found");
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

  TaskSms.searchByMobile = async function ({
    offset = 0,
    limit = 10,
    mobile = "",
  }) {
    let condition = {
      offset,
      limit,
      order: [
        ["createAt", "desc"],
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
