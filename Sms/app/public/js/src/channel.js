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
        pageSize:10,
        currentPage:1,
        currentPage:1,
        total:0,
        columns:[
          {
            title: '编号',
            key: 'Id',
            align: 'center',
          },
          {
            title: '通道名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '每条计费金额',
            key: 'money',
            align: 'center',
          },
          {
            title: '备注信息',
            key: 'remark',
            align: 'center',
          },
          {
            title: '创建时间',
            key: 'createAt',
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
        channelData:[

        ],
        updateOrCreate:0,
        channelForm:{
          name:'',
          money:'',
          remark:''
        }
      }
    },
    methods: {
      createChannel(){
        if(this.channelForm.name == ''){
          this.$Message.error('请输入通道名称！');
          return;
        }

        if(this.channelForm.money == ''){
          this.$Message.error('请输入每条计费金额！');
          return;
        }

        if(this.channelForm.remark == ''){
          this.$Message.error('请输入备注信息！');
          return;
        }

        let that = this;
        if(this.updateOrCreate == 0){
          $.ajax({
              url: '/api/channel',
              type: 'post',
              data: that.channelForm,
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
              url: '/api/channel/'+this.channelForm.Id,
              type: 'put',
              data: that.channelForm,
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
      clearForm(){
        this.channelForm.name = '';
        this.channelForm.money = '';
        this.channelForm.remark = '';
      },
      cancelCreateChannel(){
        this.clearForm();
      },
      edit:function(index){
        this.modal1 = true;
        this.updateOrCreate = 1;
        let object = this.channelData[index];
        this.channelForm.name = object.name;
        this.channelForm.money = object.money;
        this.channelForm.remark = object.remark;
        this.channelForm.Id = object.Id;
      },
      remove:function(index){
        let that = this;
        let Id = this.channelData[index].Id;
        this.$Modal.confirm({
          title: '确定需要删除该记录么？',
          content: `点击确认后会进行删除，请谨慎操作`,
          onOk:function(){
            $.ajax({
                url: '/api/channel/' + Id,
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
      searchClick(){

      },
      clickCreateChannel(){
        this.modal1 = true;
        this.clearForm();
      },
      pageChange(page){
        this.currentPage = page;
        this.loadingData();
      },
      loadingData(){
        let that = this;
        $.ajax({
            url: '/api/channel',
            type: 'get',
            data: {
              limit:that.pageSize,
              offset:(that.currentPage - 1) * that.pageSize
            },
            success(res){
                if (res.status == 200) {
                  that.total = res.data.count;
                  that.channelData = [];
                  that.channelData.push(...res.data.rows);
                } else {
                  that.$Notice.error({title:'加载失败',desc:res.message});
                }
            }
        });
      }
    },
    mounted() {

    },
    created() {
      this.loadingData();
    }
  });
