'use strict';

const Service = require('egg').Service;

class Users extends Service {
  async list({
    offset = 0,
    limit = 10
  }) {
    return this.ctx.model.Users.listUsers({
      offset,
      limit
    });
  }

  async find(id) {
    const user = await this.ctx.model.Users.findUserById(id);
    return user;
  }

  async createUser(user) {
    if (user.mobile == '' || user.mobile == null){
      throw new Error('用户手机号不能为空');
    }
    else{
      const userObj = await this.ctx.model.Users.findUserByMobile(user.mobile);
      if (userObj){
        throw new Error('用户已经存在');
      }
      else{
        let transaction;
        try {
          transaction = await this.ctx.model.transaction();
          const helper = this.ctx.helper;
          user.password = helper.cryptoPwd(helper.cryptoPwd(user.password));
          const createUserObj = await this.ctx.model.Users.createUser(user,transaction);
          await this.ctx.model.UserRole.creteUserRole(createUserObj.Id, user.role, transaction);
          await transaction.commit();
          return createUserObj;
        } catch (e) {
          await transaction.rollback();
          return false;
        }
      }
    }
  }

  async loginFindByUserWithMobile(mobile){
    return await this.ctx.model.Users.loginFindByUserWithMobile(mobile);
  }

  async update({
    id,
    updates
  }) {
    return this.ctx.model.Users.updateUser({
      id,
      updates
    });
  }

  async del(id) {
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      await this.ctx.model.Users.delUserById(id, transaction);
      await this.ctx.model.UserRole.delUserRoleByUserId(id,transaction);
      await transaction.commit();
      return true
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      return false
    }

  }
}

module.exports = Users;
