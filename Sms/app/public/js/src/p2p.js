var app = new Vue({
    el: '#content',
    delimiters: ['${', '}'],
    components: {
      'header-menu': HeaderMenu,
    },
    data() {
      return {
        search_value:'',
        currentPage:0,
        total:0,
        columns:[],
        tableData:[],
        modal1:false,
        modal2:false,
        modalTitle:'',
        loading:false,
        uploadActionUrl: '',
        recordCount:'',
        taskForm:{

        },
        totalTemplate:0,
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
      createData(){

      },
      cancelCreateData(){

      },
      formatDate(str){
        return str.substr(0,10);
      },
      templatePageChange(){

      },
      sendClick(){
        this.modal2 = true;
      },
      beforeUpload(){

      },
      uploadSuccess(){

      },
      uploadError(){

      },
      sendData(){

      },
      cancelSendData(){

      }
    },
    mounted() {

    },
    created() {}
  });
