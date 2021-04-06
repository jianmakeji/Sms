var app = new Vue({
    el: '#content',
    delimiters: ['${', '}'],
    components: {
      'header-menu': HeaderMenu,
    },
    data() {
      return {
        search_value:'',
        searchTag:0,
        columns:[
            {
                title: 'ID',
                key: 'Id',
                align: 'center',
                width:80
              },{
                title: '任务名称',
                key: 'name',
                align: 'center',
              },
              {
                title: '发送数量',
                key: 'sendCount',
                align: 'center',
              },
              {
                title: '通道名称',
                render: (h, params) => {
                  return h("span", this.tableData[params.index].channel.name);
                },
                align: 'center',
              },
              {
                title: '操作',
                key: 'action',
                width: 300,
                align: 'center',
                render: (h, params) => {
                  return h('div', [
                    h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                          },
                        on: {
                          click: () => {
                            this.sendSms(params.index)
                          }
                        }
                    }, '发送'),

                    h('Button', {
                        props: {
                          type: 'primary',
                          size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                          },
                        on: {
                          click: () => {
                            this.checkSms(params.index)
                          }
                        }
                    }, '查看短信'),

                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.checkStatus(params.index)
                        }
                      }
                    }, '查看发送情况'),

                  ]);
                }
              },
        ],
        tableData:[

        ],
        updateOrCreate:0,
        currentPage:1,
        total:0,
        pageSize:10,
        modal1:false,
        loading:false,
        taskForm:{
          channelId:0,
          name:'',
          excelFileName:''
        },
        uploadActionUrl: '/file/uploadExcelFile/1',
        recordCount:'',
        channel:'',
        channelList: [

        ],
        modal2:false,
        smsColumn:[
            {
                title: 'ID',
                key: 'Id',
                align: 'center',
                width: 80,
              },{
                title: '手机号码',
                key: 'mobile',
                align: 'center',
              },
              {
                title: '短信内容',
                key: 'content',
                align: 'center',
                width: 300,
              },
              {
                title: '发送状态',
                render: (h, params) => {
                  let status = this.tableData[params.index].status;
                  if( status == 1){
                    return h("span", '已发送');
                  }
                  else if(status == 2){
                    return h("span",'未发送');
                  }
                  else if(status == 3){
                    return h("span",'发送中');
                  }
                  else if(status == 4){
                    return h("span",'成功');
                  }
                  else if(status == 5){
                    return h("span",'失败');
                  }
                },
                align: 'center',
              },
              {
                title: '发送结果',
                key: 'result',
                align: 'center',
              },
              {
                title: '操作',
                key: 'action',
                width: 200,
                align: 'center',
                render: (h, params) => {
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.repeatSend(params.index)
                        }
                      }
                    }, '重新发送'),

                  ]);
                }
              },
        ],
        smsTableData:[],
        smsTotal:0,
        smsCurrentPage:1,
      }
    },
    methods: {
        searchClick(){
          if(this.search_value == ''){
            this.searchTag = 0;
            this.currentPage = 1;
            this.loadingTask();
          }
          else{
            this.searchTag = 1;
            this.currentPage = 1;
            this.loadingSearchTask();
          }
        },
        clickCreateTask(){
            this.modal1 = true;
        },
        pageChange(){
          if(this.searchTag == 0){
            this.loadingTask();
          }
          else{
            this.loadingSearchTask();
          }
        },
        createTask(){
          if(this.taskForm.name == ''){
            this.$Message.error('请输入任务名称！');
            return;
          }

          if(this.taskForm.channelId == 0){
            this.$Message.error('请选择通道名称！');
            return;
          }

          if(this.taskForm.excelFileName == ''){
            this.$Message.error('请上传Excel文件！');
            return;
          }

          let that = this;
          if(this.updateOrCreate == 0){
            $.ajax({
                url: '/api/task',
                type: 'post',
                data: that.taskForm,
                success(res){
                    that.loading = false;
                    if (res.status == 200) {
                      that.loadingTask();
                      that.modal1 = false;
                      that.$Message.info('创建成功！');
                    } else {
                      that.$Notice.error({title:'创建失败！',desc:res.data});
                    }

                }
            });
          }
          else{
            $.ajax({
                url: '/api/task/'+this.channelForm.Id,
                type: 'put',
                data: that.taskForm,
                success(res){
                    that.loading = false;
                    if (res.status == 200) {
                      that.loadingTask();
                      that.modal1 = false;
                      that.$Message.info('更新成功！');
                    } else {
                      that.$Notice.error({title:'更新失败！',desc:res.data});
                    }

                }
            });
          }
        },
        cancelCreateTask(){

        },
        uploadSuccess(response, file, fileList) {
          if(response.status == 200){
            this.recordCount = '当前总共需要上传' + response.countRecord + '条数据。';
            this.taskForm.excelFileName = response.filename;
            this.$Message.info('上传成功');
          }
          else{
            console.log(response.message);
            this.$Message.error('上传失败' + response.message);
          }
        },
        uploadError(error, file, fileList) {
          this.$Message.error('上传失败' + error);
        },
        beforeUpload(){

        },
        checkSms(index){
            this.modal2 = true;
            this.loadingSmsByTaskId();
        },
        smsPageChange(page){
          this.smsCurrentPage = page;
          this.loadingSmsByTaskId();
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
      loadingSearchTask(){
        let that = this;
          $.ajax({
              url: '/api/task/searchByName',
              type: 'get',
              data: {
                limit:that.pageSize,
                offset:(that.currentPage - 1) * that.pageSize,
                name:that.search_value,
              },
              success(res){
                  if (res.status == 200) {
                    that.total = res.data.count;
                    that.tableData = [];
                    let rows = res.data.rows;
                    that.tableData.push(...rows);
                  } else {
                    that.$Notice.error({title:'加载失败',desc:res.message});
                  }
              }
        });
      },
      loadingTask(){
        let that = this;
          $.ajax({
              url: '/api/task',
              type: 'get',
              data: {
                limit:that.pageSize,
                offset:(that.currentPage - 1) * that.pageSize
              },
              success(res){
                  if (res.status == 200) {
                    that.total = res.data.count;
                    that.tableData = [];
                    let rows = res.data.rows;
                    that.tableData.push(...rows);
                  } else {
                    that.$Notice.error({title:'加载失败',desc:res.message});
                  }
              }
        });
      },
      loadingSmsByTaskId(taskId){
        let that = this;
        $.ajax({
              url: '/api/tasksms',
              type: 'get',
              data: {
                limit:that.pageSize,
                offset:(that.smsCurrentPage - 1) * that.pageSize,
                taskId:taskId,
              },
              success(res){
                  if (res.status == 200) {
                    that.smsTotal = res.data.count;
                    that.smsTableData = [];
                    let rows = res.data.rows;
                    that.smsTableData.push(...rows);
                  } else {
                    that.$Notice.error({title:'加载失败',desc:res.message});
                  }
              }
        });
      },
      checkStatus(index){
        let data = this.smsTableData[index];
      }
    },
    mounted() {
      this.loadingChannel();
      this.loadingTask();
    },
    created() {}
  });
