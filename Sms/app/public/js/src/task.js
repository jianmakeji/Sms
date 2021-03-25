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
                            this.sendSms(params.index)
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

        }
    },
    mounted() {

    },
    created() {}
  });
