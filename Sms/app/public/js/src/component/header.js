var HeaderMenu = {
  data: function () {
    return {
      username:this.username,
      rolename:this.rolename,
      activename:this.activename,
    }
  },
  props:['username','rolename','activename'],
  methods: {
    menuClick(name) {
      if (name == 1) {
        window.location.href = '/index';
      } else if (name == '1-1') {
        window.location.href = '/index';
      } else if (name == '1-2') {
        window.location.href = '/p2p';
      }else if (name == 2) {
        window.location.href = '/task';
      } else if (name == '3') {
        window.location.href = '/smsManage';
      } else if (name == 4) {
        window.location.href = '/channel';
      } else if (name == 5) {
        window.location.href = '/user';
      }else if (name == 6) {
        this.logoutClick();
      }

    },
    logoutClick:function(){
      window.location.href = '/logout';
    }
  },
  created() {

  },
  //'<menu-item name="4" v-if="rolename == \'admin\'">' +
  template:'<i-header>'+
      '<i-menu mode="horizontal" theme="dark" @on-select="menuClick" :active-name="activename">' +
          '<div class="layout-logo">木圣科技信使系统</div>' +
          '<div class="layout-nav">' +
          '<menu-item name="1">' +
                '<icon type="md-filing"></icon>' +
                '群发短信' +
            '</menu-item>' +
            '<menu-item name="2">' +
                '<icon type="md-filing"></icon>' +
                '任务短信' +
            '</menu-item>' +
            '<menu-item name="3">' +
                '<icon type="md-mail"></icon>' +
                '短信管理' +
            '</menu-item>' +
            '<menu-item name="4">' +
                '<icon type="md-crop"></icon>' +
                '通道管理' +
            '</menu-item>' +
            '<menu-item name="5">' +
                '<icon type="md-contacts"></icon>' +
                '用户管理' +
            '</menu-item>' +
          '</div>' +
          '<div class="layout-logout">' +
            '<menu-item name="6">' +
                '<icon type="md-close"></icon>' +
                '{{username}} &nbsp退出' +
            '</menu-item>' +
          '</div>' +
      '</i-menu>' +
  '</i-header>',

}
