Component({
  data: {
    navbarList:['商品','参数','评论','推荐'],
    currentIndex:0
  },
  properties: {},
  methods: {
    back(){
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    },
    itemClick(event){
      const index=event.currentTarget.dataset.index
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('titleClick',index)
    },
    setIndex(index){
      this.setData({
        currentIndex:index
      })
    }
  }
})