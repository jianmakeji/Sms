'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/index', controller.home.index);
  router.get('/', controller.home.login);
  router.get('/task', controller.home.task);
  router.get('/user', controller.home.user);
  router.get('/p2p', controller.home.p2p);
  router.get('/smsManage', controller.home.smsManage);
  router.get('/channel', controller.home.channel);
  router.get('/logout', controller.home.logout);

  router.resources('task', '/api/task', controller.task);
  router.resources('tasksms', '/api/tasksms', controller.tasksms);
  router.resources('p2p', '/api/p2p', controller.p2p);
  router.resources('mass', '/api/mass', controller.mass);
  router.resources('masssms', '/api/masssms', controller.masssms);
  router.resources('user', '/api/user', controller.user);
  router.resources('channel', '/api/channel', controller.channel);

};
