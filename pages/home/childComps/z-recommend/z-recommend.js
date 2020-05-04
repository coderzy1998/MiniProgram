Component({
  data: {
    isLoad:false
  },
  properties: {
    recommend:{
      type:Array,
      value:[]
    }
  },
  methods: {
    imgLoad(){
      if(!this.data.isLoad){
        this.triggerEvent('imgLoad')
        this.data.isLoad=true
      }
    }
  }
})