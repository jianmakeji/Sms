var app = new Vue({
  el: '#content',
  delimiters: ['${', '}'],
  components:{
    'header-menu': HeaderMenu,
  },
  data(){
    return {
      modal1: false,
      pageSize:10,
      currentPage:1,
      loading1:true,
      total:0,
      updateOrCreate:0,
      roleList: [{
          value: 1,
          label: '管理员'
        },
        {
          value: 2,
          label: '普通用户'
        }
      ],
      userForm:{
        username:'',
        mobile:'',
        role:'',
        status:'',
        password:'',
      },
      columns: [{
          title: '编号',
          key: 'Id',
          align: 'center',
        },
        {
          title: '姓名',
          key: 'username',
          align: 'center',
        },
        {
          title: '手机号码',
          key: 'mobile',
          align: 'center',
        },
        {
          title: '角色',
          render: (h, params) => {
            let roles = this.tableData[params.index].roles;
            let roleName = '';
            roles.forEach((role)=>{
              roleName = roleName + role.description;
            });
            return h("span", roleName);
          },
          align: 'center',
        },
        {
          title: '创建时间',
          key: 'createAt',
          align: 'center',
        },
        {
          title: '状态',
          render: (h, params) => {
            if(this.tableData[params.index].status == 0){
              return h("span", '启用');
            }
            else{
              return h("span",'关闭');
            }
          },
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
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
                    this.edit(params.index);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除'),
            ]);
          }
        },
      ],
      tableData: [
      ]
    }
  },
  methods:{
    show:function(index){
      this.modal1 = true;
    },
    add:function(){
      this.modal1 = true;
      this.updateOrCreate = 0;
      this.userForm.username = '';
      this.userForm.mobile = '';
      this.userForm.role = '';
      this.userForm.status = '';
      this.userForm.password = '';
    },
    edit:function(index){
      this.modal1 = true;
      this.updateOrCreate = 1;
      let object = this.tableData[index];
      this.userForm.Id = object.Id;
      this.userForm.username = object.username;
      this.userForm.mobile = object.mobile;
      this.userForm.role = object.roles[0].Id;
      if(object.status == 0){
        this.userForm.status = '启用';
      }
      else{
        this.userForm.status = '关闭';
      }
    },
    remove:function(index){
      let that = this;
      let Id = this.tableData[index].Id;
      this.$Modal.confirm({
        title: '确定需要删除该用户么？',
        content: `点击确认后会进行删除，请谨慎操作`,
        onOk:function(){
          $.ajax({
              url: '/api/user/' + Id,
              type: 'delete',
              success(res){
                  if (res.status == 200) {
                    that.loadingData();
                    that.$Message.success('删除成功!');
                  } else {
                    that.$Message.error('删除失败!');
                  }
              }
          });

        },
        onCancel:function(){
          this.$Message.success('取消删除!');
        }
      });
    },
    messageWarningFn (text) {
      this.$Message.warning(text);
      setTimeout(() => {
        this.loading1 = false;
        this.$nextTick(() => {
          this.loading1 = true;
        })
      }, 500)
    },
    ok () {
      if(this.userForm.name == ''){
        this.messageWarningFn("请填写用户姓名！");
        return;
      }

      if(this.userForm.mobile == ''){
        this.messageWarningFn("请填写电话号码！");
        return;
      }

      if(this.userForm.role == ''){
        this.messageWarningFn("请选择角色！");
        return;
      }

      let that = this;
      if(this.updateOrCreate == 0){
        $.ajax({
            url: '/api/user',
            type: 'post',
            data: that.userForm,
            success(res){
                that.loading = false;
                if (res.status == 200) {
                  that.loadingData();
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
            url: '/api/user/'+this.userForm.Id,
            type: 'put',
            data: that.userForm,
            success(res){
                that.loading = false;
                if (res.status == 200) {
                  that.loadingData();
                  that.modal1 = false;
                  that.$Message.info('更新成功！');
                } else {
                  that.$Notice.error({title:'更新失败！',desc:res.data});
                }

            }
        });
      }
    },
    cancel () {

    },
    changeSelect:function(){

    },
    changeCondition:function(params){
      if(params == '启用'){
        this.userForm.status = 0;
      }
      else{
        this.userForm.status = 1;
      }
    },
    loadingData(){
      let that = this;
      $.ajax({
          url: '/api/user',
          type: 'get',
          data: {
            limit:that.pageSize,
            offset:(that.currentPage - 1) * that.pageSize
          },
          success(res){
              if (res.status == 200) {
                that.total = res.data.count;
                that.tableData = [];
                that.tableData.push(...res.data.rows);
              } else {
                that.$Notice.error({title:'导入失败',desc:res.message});
              }
          }
      });
    },
    pageChange(page){
      this.currentPage = page;
      this.loadingData();
    }
  },
  mounted() {
    this.loadingData();
  },
  created() {
  }
})
