Component({
  data: {},
  properties: {
    item:{
      type:Object,
      value:{}
    }
  },
  methods: {
    itemClick(event){
      const iid=event.currentTarget.dataset.iid
      wx.navigateTo({
        url: `/pages/detail/detail?iid=${iid}`,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  }
})