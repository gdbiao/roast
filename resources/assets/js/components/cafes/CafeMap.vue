import {ROAST_CONFIG} from '../../config.js';

<style lang="scss">
    div#cafe-map {
        width: 100%;
        height: 400px;
    }
</style>

<template>
  <div id="cafe-map">

  </div>
</template>

<script>
  export default {
      props: {
  'latitude': {  // 经度
      type: Number,
      default: function () {
          return 120.21
      }
  },
  'longitude': {  // 纬度
      type: Number,
      default: function () {
          return 30.29
      }
  },
  'zoom': {   // 缩放级别
      type: Number,
      default: function () {
          return 4
      }
  }
},
data() {
  return {
      markers: [],
      infoWindows: []
  }
},

computed: {
   cafes(){
       return this.$store.getters.getCafes;
   }
},

mounted() {
   this.map = new AMap.Map('cafe-map', {
       center: [this.latitude, this.longitude],
       zoom: this.zoom
   });

// 清除并重构点标记
this.clearMarkers();
this.buildMarkers();
},

methods: {
   // 为所有咖啡店创建点标记
   buildMarkers() {
    // 初始化点标记数组
    this.markers = [];

    // 自定义点标记图标
    var image = ROAST_CONFIG.APP_URL + '/storage/img/coffee-marker.png';
    var icon = new AMap.Icon({
        image: image,  // 图像 URL
        imageSize: new AMap.Size(19, 33)  // 设置图标尺寸
    });

    // 遍历所有咖啡店创建点标记
    for (var i = 0; i < this.cafes.length; i++) {

        // 为每个咖啡店创建点标记并设置经纬度
        var marker = new AMap.Marker({
            position: AMap.LngLat(parseFloat(this.cafes[i].latitude), parseFloat(this.cafes[i].longitude)),
            title: this.cafes[i].name,
            icon: icon,  // 通过 icon 对象设置自定义点标记图标来替代默认蓝色图标
        });

        // 将点标记放到数组中
        this.markers.push(marker);
    }

    // 将所有点标记显示到地图上
    this.map.add(this.markers);
},
clearMarkers() {
    // 遍历所有点标记并将其设置为 null 从而从地图上将其清除
    for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
    }
}
},

watch: {
    // 一旦 cafes 有更新立即重构地图点标记
    cafes () {
        this.clearMarkers();
        this.buildMarkers();
    }
}

  }
</script>