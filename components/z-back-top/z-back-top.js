Component({
  data: {},
  properties: {},
  methods: {
    backTop(){
      wx.pageScrollTo({
        scrollTop:0,
        duration:500
      })
    }
  },
  externalClasses:['back']
})