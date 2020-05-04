import debounce from '../../../../utils/utils'
Component({
  data: {
    counter: 0,
    imgLength: 0
  },
  properties: {
    detailInfo: {
      type: Object,
      value: {}
    }
  },
  observers: {
    detailInfo(newV) {
      if (newV.detailImage) {
        let newImgLength = newV.detailImage[0].list.length
        this.setData({
          imgLength: newImgLength
        })
      }
    },
  },
  methods: {
    imgLoad() {
      this.setData({
        counter: this.data.counter + 1,
      })
      if (this.data.counter == this.data.imgLength) {
        this.triggerEvent('imgLoad')
      }
    }
  },

})