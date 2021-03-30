var app = new Vue({
    el: '#content',
    delimiters: ['${', '}'],
    components: {
      'header-menu': HeaderMenu,
    },
    data() {
      return {
        search_value:'',
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
                key: 'smsCount',
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
                            this.chcekSms(params.index)
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
            {
                Id:1,
                name:'2021-03-25光大银行催收信息',
                smsCount:10000,
            }
        ],
        currentPage:0,
        total:0,
        modal1:false,
        loading:false,
        taskForm:{

        },
        uploadActionUrl:'',
        recordCount:'',
        channel:'',
        channelList: [
          {
            value: 'channel1',
            label: '中国电信'
          },
          {
            value: 'channel2',
            label: '中国联通'
          },
          {
            value: 'channel3',
            label: '中国移动'
          },
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
      }
    },
    methods: {
        searchClick(){

        },
        clickCreateTask(){
            this.modal1 = true;
        },
        pageChange(){

        },
        createTask(){

        },
        cancelCreateTask(){

        },
        uploadSuccess(){

        },
        uploadError(){

        },
        beforeUpload(){

        },
        chcekSms(index){
            this.modal2 = true;
        },
        smsPageChange(){

        }
    },
    mounted() {

    },
    created() {}
  });
