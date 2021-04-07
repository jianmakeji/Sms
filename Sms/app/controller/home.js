'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async login() {
    const { ctx } = this;
    await ctx.render('login.html',{});
  }

  async index() {
    const { ctx } = this;
    await ctx.render('index.html',{});
  }

  async task() {
    const { ctx } = this;
    await ctx.render('task.html',{});
  }

  async user() {
    const { ctx } = this;
    await ctx.render('user.html',{});
  }

  async smsManage() {
    const { ctx } = this;
    await ctx.render('smsManage.html',{});
  }

  async p2p() {
    const { ctx } = this;
    await ctx.render('p2p.html',{});
  }

  async channel() {
    const { ctx } = this;
    await ctx.render('channel.html',{});
  }

  async logout(){
    const ctx = this.ctx;
    ctx.logout();
    await ctx.render('login.html');
  }

  async manageIndex(){
    const ctx = this.ctx;
    if(ctx.isAuthenticated()){
      ctx.redirect('/index');
    }
    else{
      ctx.redirect('/login');
    }
  }

  async relogin(){
    const ctx = this.ctx;
    await ctx.render('login.html', {
      message:'用户名或者密码错误!'
    });

  }
}

module.exports = HomeController;
