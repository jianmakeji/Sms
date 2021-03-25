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

  },
  mounted() {

  },
  created() {}
})
