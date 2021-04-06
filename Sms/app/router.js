'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminAuthCheck = app.middleware.adminAuthCheck();
  const pageAuthCheck = app.middleware.pageAuthCheck();

  router.get('/index', controller.home.index);
  router.get('/', controller.home.login);
  router.get('/task', controller.home.task);
  router.get('/user', controller.home.user);
  router.get('/p2p', controller.home.p2p);
  router.get('/smsManage', controller.home.smsManage);
  router.get('/channel', controller.home.channel);
  router.get('/logout', controller.home.logout);
  router.get('/manageIndex', controller.home.manageIndex);
  router.get('/relogin', controller.home.relogin);
  router.get('/logout', controller.home.logout);

  router.post('/login',app.passport.authenticate('local', {
    successReturnToOrRedirect : '/manageIndex',successFlash: true,
    failureRedirect: '/relogin',failureFlash: true }));

  router.resources('task', '/api/task', controller.task);
  router.resources('tasksms', '/api/tasksms', controller.tasksms);
  router.resources('p2p', '/api/p2p', controller.p2p);
  router.resources('mass', '/api/mass', controller.mass);
  router.resources('masssms', '/api/masssms', controller.masssms);
  router.resources('user', '/api/user', controller.user);
  router.resources('channel', '/api/channel', controller.channel);

  router.post('/file/uploadExcelFile/:fileType',  controller.file.uploadExcelFile);
  router.post('/file/importSmsData/:fileType',  controller.file.importSmsData);
  router.get('/api/task/searchByName', controller.task.searchByName);
};
