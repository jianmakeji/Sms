var app = new Vue({
    el: '#content',
    delimiters: ['${', '}'],
    components: {
      'header-menu': HeaderMenu,
    },
    data() {
      return {
        modal1:false,
        loading:false,
        search_value:'',
        currentPage:0,
        total:0,
        columns:[],
        tableData:[],
        taskForm:{
          name:'',
          money:'',
          remark:''
        }
      }
    },
    methods: {
      createChannel(){

      },
      cancelCreateChannel(){

      },
      searchClick(){

      },
      clickCreateChannel(){
        this.modal1 = true;
      },
      pageChange(){

      }
    },
    mounted() {

    },
    created() {}
  });
