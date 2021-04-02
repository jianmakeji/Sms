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
            width: 800,
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
        tableData:[
          {
            Id:1,
            mobile:'19996969696',
            content:'尊敬的xxxxxxxxxxxxxxxxxxxxxx',
            status:5,
            result:'该号码不存在'
          }
        ],
        currentPage:0,
        total:0,
        status:'',
        statuslList: [
          {
            value: 'status1',
            label: '已发送'
          },
          {
            value: 'status2',
            label: '未发送'
          },
          {
            value: 'status3',
            label: '发送中'
          },
          {
            value: 'status4',
            label: '成功'
          },
          {
            value: 'status5',
            label: '失败'
          },
        ],
        category:'category1',
        categorylList: [
          {
            value: 'category1',
            label: '群发短信'
          },
          {
            value: 'category2',
            label: '任务短信'
          },

        ],
      }
    },
    methods: {
      searchClick(){

      },
      pageChange(){

      }
    },
    mounted() {

    },
    created() {}
  });
