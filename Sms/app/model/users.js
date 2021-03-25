const moment = require('moment');
module.exports = app => {

  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Users = app.model.define('users', {
    Id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username:{
      type: STRING(10),
      allowNull: true
    },
    mobile: {
      type: STRING(15),
      allowNull: true
    },
    password: {
      type: STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    status:{
      type: INTEGER(11),
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
    tableName: 'users'
  });

  Users.associate = function() {

    app.model.Users.belongsToMany(app.model.Roles, {
      through: {
        model: app.model.UserRole,
        unique: false
      },
      foreignKey: 'userId',
      constraints: false
    });
  };

  Users.listUsers = async function ({ offset = 0, limit = 10 }) {
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        app.model.Roles
      ]
    });
  }

  Users.findUserById = async function (id) {
    const user = await this.findByPk(id,{
      include:[
        app.model.Roles
      ]
    });
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  Users.createUser = async function (user,transaction) {
    return await this.create(user,{
      transaction:transaction
    });
  }

  Users.updateUser = async function ({ id, updates }) {
    const user = await this.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user.update(updates);
  }

  Users.delUserById = async function (id,transaction) {
    return await this.destroy({
      transaction:transaction,
      where:{
        Id:id
      }
    });
  }

  Users.findUserByMobile = async function(mobile){
    return await this.findOne({
      where:{
        mobile:mobile
      },
      include:[
        {
          model: app.model.Roles,
          through:{
            attributes:['userId','roleId'],
          },
          attributes:['Id','name']
        }
      ],
      attributes:['Id','username','mobile']
    });
  }

  Users.loginFindByUserWithMobile = async function (mobile){
    return await this.findOne({
      where:{
        mobile:mobile,
        status:0
      },
      include:[
        {
          model: app.model.Roles,
          through:{
            attributes:['userId','roleId'],
          },
          attributes:['Id','name']
        }
      ],
      attributes:['Id','username','mobile','password']
    });
  }

  Users.updatePwdWithMobile = async function(mobile, newPwd){
    return await this.update({
      password:newPwd
    },{
      where:{
        mobile:mobile
      }
    });
  }


  Users.searchByUsername = async function({ offset = 0, limit = 10, username='' }){

    let condition = {
      offset,
      limit,
      order: [[ 'createAt', 'desc' ], [ 'Id', 'desc' ]],
      include:[
        app.model.Roles
      ]
    };

    if(username != null && username !=''){
      condition.where = {};
      condition.where.username = {
        [app.Sequelize.Op.like]: '%'+username+'%'
      }
    }

    return this.findAndCountAll(condition);
  }

  return Users;
};
