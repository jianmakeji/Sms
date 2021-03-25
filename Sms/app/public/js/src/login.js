function IEVersion() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6; //IE版本<=7
    }
  } else if (isEdge) {
    return 'edge'; //edge
  } else if (isIE11) {
    return 11; //IE11
  } else {
    return -1; //不是ie浏览器
  }
}

var ieVersion = IEVersion();

if(ieVersion != -1 && ieVersion != 'edge'){
  $.toast({
      heading: 'Warning',
      text: '您请使用最新版谷歌或者edge浏览器',
      showHideTransition: 'fade',
      position: 'mid-center',
      icon: 'error'
  })
}
else{
  new Vue({
      el: '#loginPanel',
      data: {
          formItem: {
            username:'',
            password:''
          }
      },
      methods: {
        handleSubmit:function(){
          if(this.formItem.username == '' || this.formItem.username == null){
            this.$Message.info('请填写用户名!');
            return;
          }

          if(this.formItem.password == '' || this.formItem.password == null){
            this.$Message.info('请填写密码!');
            return;
          }

          document.getElementById("loginForm").submit();

        },
        handleReset:function(){
          this.formItem.username = "";
          this.formItem.password = "";
        }
      }
  })
}
