var app = new Vue({
  el: '#content',
  delimiters: ['${', '}'],
  components: {
    'header-menu': HeaderMenu,
  },
  data() {
    return {
      sms_content:'',
      mobile_content:'',
      mobileCount:0,
      channelId:0,
      loading:false,
      modal1:false,
      modalTitle:'上传Excel文件',
      mobileCount:0,
      accept:'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      uploadDesc:'注意：请上传后缀名为.xlsx的Excel文件',
      fileTag:0,
      channelList: [

      ],
      blockWords:[],
    }
  },
  methods: {
    parseFiles(){

    },
    checkMobileNum(mobile) {
      let PATTERN_CHINAMOBILE = /^(((13[456789])|(14[78])|(15[0125789])|(178)|(18[2348])|(198))\d{8})|(((1440)|(1703)|(1705)|(1706))\d{7})/;
      let PATTERN_CHINAUNICOM =/^((13[012])|(145])|(15[56])|(16[67])|(17[0156])|(18[56]))\d{8}$/;
      let PATTERN_CHINATELECOM =/^(((133)|(153)|(17[37])|(18[019])|(19[19]))\d{8})|(((1349)|(1410)|(1700)|(1701)|(1702)|(1740))\d{7})$/;

      if (PATTERN_CHINATELECOM.test(mobile)) {
        return 1;
      } else if (PATTERN_CHINAMOBILE.test(mobile)) {
        return 2;
      } else if (PATTERN_CHINAUNICOM.test(mobile)) {
        return 3;
      } else {
        return 4;
      }
    },
    importTxt(){
      this.modalTitle = '上传TXT文件';
      this.accept = 'text/plain';
      this.uploadDesc = '注意：请上传后缀名为.txt的TXT文件';
      this.modal1 = true;
      this.fileTag = 2;
    },
    importExcel(){
      this.modalTitle = '上传Excel文件';
      this.accept = 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      this.uploadDesc = '注意：请上传后缀名为.xlsx的Excel文件';
      this.modal1 = true;
      this.fileTag = 1;
    },
    uploadSuccess(){

    },
    checkBlockWords(){
      if(this.sms_content == ''){
        this.$Message.error('没有需要检测的内容！');
        return;
      }
      for(let i = 0; i < this.blockWords.length; i++){
        if (this.sms_content.includes(this.blockWords[i])){
          this.$Message.error('关键词【 ' + this.blockWords[i] + ' 】为屏蔽词');
          break;
        }
      }
      this.$Message.success('没有包含屏蔽词！');
    },
    filterErrorNumber(){
      if(this.mobile_content == ''){
        this.$Message.error('请输入或者导入号码！');
        return;
      }
      let result = '';
      let mobileArray = this.mobile_content.split(',');
      for (let i = 0; i < mobileArray.length; i++){
        if(this.checkMobileNum(mobileArray[i]) != 4){
          result = result + mobileArray[i] + ',';
        }
      }
      this.mobile_content = result;
      this.$Message.success('过滤完毕！');
      this.mobileCount = this.mobile_content.split(',').length - 1;
    },
    filterRepeatNumber(){
      if(this.mobile_content == ''){
        this.$Message.error('请输入或者导入号码！');
        return;
      }
      let result = [];
      let mobileArray = this.mobile_content.split(',');
      for (let i = 0; i < mobileArray.length; i++){
        if(mobileArray[i] != '' && !result.includes(mobileArray[i])){
          result.push(mobileArray[i]);
        }
      }
      let mobiles = '';
      for(let mobile of result){
        mobiles = mobiles + mobile + ',';
      }
      this.mobile_content = mobiles;
      this.$Message.success('过滤完毕！');
      this.mobileCount = this.mobile_content.split(',').length - 1;
    },
    uploadError(){

    },
    beforeUpload(file){
      let that = this;
      if(this.fileTag == 2){
        var reader = new FileReader();
        reader.onload = function() {
           if(reader.result) {
            that.mobile_content = reader.result;
            that.mobileCount = that.mobile_content.split(',').length - 1;
           }
        };
        reader.readAsText(file);
      }
      else if(this.fileTag == 1){
        var fileReader = new FileReader();
        fileReader.onload = function(ev) {
        try {
            var data = ev.target.result
            var workbook = XLSX.read(data, {
                type: 'binary'
            }) // 以二进制流方式读取得到整份excel表格对象
            var mobiles = []; // 存储获取到的数据
            // 表格的表格范围，可用于判断表头是否数量是否正确
            var fromTo = '';
            // 遍历每张表读取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    mobiles = mobiles.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));

                    break; // 如果只取第一张表，就取消注释这行
                }
            }
            let mobileStr = '';
            for(let mobile of mobiles){
              for(let value in mobile){
                if(value != '__rowNum__'){
                  mobileStr = mobileStr + mobile[value] + ',';
                }
              }
            }
            that.mobile_content = mobileStr;
            that.mobileCount = that.mobile_content.split(',').length - 1;
          } catch (e) {
              console.log(e);
              return;
          }
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file);
      }
      return false;
    },
    loadingChannel(){
      let that = this;
        $.ajax({
              url: '/api/channel',
              type: 'get',
              data: {
                limit:100,
                offset:0
              },
              success(res){
                  if (res.status == 200) {
                    that.total = res.data.count;
                    that.channelList = [];
                    let rows = res.data.rows;
                    for (let i = 0; i < rows.length; i++){
                      let obj = {};
                      obj.label = rows[i].name;
                      obj.value = rows[i].Id;
                      that.channelList.push(obj);
                    }
                  } else {
                    that.$Notice.error({title:'加载失败',desc:res.message});
                  }
            }
      });
    },
    clearBtnClick(){
      this.mobile_content = '';
      this.sms_content = '';
    },
    sendSms(){
      if(this.sms_content == ''){
        this.$Message.error('没有需要发送的内容！');
        return;
      }

      if(this.mobile_content == ''){
        this.$Message.error('没有需要发送的号码！');
        return;
      }

      if(this.channelId == 0){
        this.$Message.error('请选择发送通道！');
        return;
      }

      let that = this;
       $.ajax({
          url: '/api/mass',
          type: 'post',
          data: {
            content:that.sms_content,
            mobiles:that.mobile_content,
            channelId:that.channelId
          },
          success(res){
            if (res.status == 200) {
              that.$Message.success('提交成功！');
            } else {
              that.$Notice.error({title:'提交失败',desc:res.message});
            }
          }
      });
    }
  },
  mounted() {
    this.loadingChannel();
  },
  created() {}
})
