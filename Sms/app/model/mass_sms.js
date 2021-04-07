const moment = require("moment");
module.exports = (app) => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const MassSms = app.model.define(
    "MassSms",
    {
      Id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      massId: {
        type: INTEGER(11),
        defaultValue: "",
      },
      mobile: {
        type: STRING(15),
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
      tableName: "mass_sms",
    }
  );

  MassSms.associate = function() {
    app.model.MassSms.hasOne(app.model.Mass, {sourceKey:'massId',foreignKey: 'Id'});
  };

  MassSms.listMassSms = async function ({ offset = 0, limit = 10,userId = 0 }) {
    return this.findAndCountAll({
      offset,
      limit,
      include: [{
        model: app.model.Mass,
        attributes:['Id','content'],
        where:{
          userId:userId
        }
      }],
      order: [
        ["Id", "desc"],
      ],
    });
  };

  MassSms.listMassSmsByMassId = async function ({ offset = 0, limit = 10, massId=0 }) {
    let condition = {
        offset,
        limit,
        include: [{
          model: app.model.Mass,
          attributes:['Id','content']
        }],
        order: [
          ["Id", "desc"],
        ],
    };

    if(massId != 0){
        condition.where = {};
        condition.where.massId = massId;
    }

    return this.findAndCountAll(condition);
  };

  MassSms.findMassSmsById = async function (id) {
    const masssms = await this.findByPk(id);
    if (!masssms) {
      throw new Error("user not found");
    }
    return masssms;
  };

  MassSms.createMassSms = async function (masssms, transaction) {
    return await this.create(masssms, {
      transaction: transaction,
    });
  };

  MassSms.updateMassSms = async function ({ id, updates }) {
    const masssms = await this.findByPk(id);
    if (!masssms) {
      throw new Error("MassSms not found");
    }
    return masssms.update(updates);
  };

  MassSms.delMassSmsById = async function (id, transaction) {
    return await this.destroy({
      transaction: transaction,
      where: {
        Id: id,
      },
    });
  };

  MassSms.delMassSmsByMassId = async function (massId, transaction) {
    return await this.destroy({
      transaction: transaction,
      where: {
        Id: massId,
      },
    });
  };

  MassSms.searchByMobile = async function ({
    offset = 0,
    limit = 10,
    mobile = "",
    userId = 0,
  }) {
    let condition = {
      offset,
      limit,
      include: [{
        model: app.model.Mass,
        attributes:['Id','content'],
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

  return MassSms;
};
