<template>
  <div class="box">
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>
<script>
export default {
  name: "map-view",
  mounted() {
    this.initAMap();
  },
  beforeDestroy() {
    this.map?.destroy();
  },
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initAMap() {
      const that = this;
      that.map = new AMap.Map("container", {
        viewMode: '2D', //默认使用 2D 模式
        zoom: 11, //地图级别
        center: [116.397428, 39.90923], //地图中心点
      })
      // AMap.plugin('AMap.Geolocation', function () {
      //   const Geolocation = new AMap.Geolocation({
      //     panToLocation: true,
      //   })
      //   Geolocation.getCurrentPosition(function (status, result) {
      //     alert(status, result)
      //   })
      //   that.map.addControl(Geolocation)
      // })
      const startLngLat = [116.379028, 39.865042] //起始点坐标
      const endLngLat = [116.427281, 39.903719] //终点坐标
      //引入和创建驾车规划插件
      AMap.plugin(["AMap.Driving"], function () {
        const driving = new AMap.Driving({
          map: that.map,
          panel: "panel", //参数值为你页面定义容器的 id 值<div id="my-panel"></div>
        });
        //获取起终点规划线路
        driving.search(startLngLat, endLngLat, function (status, result) {
          if (status === "complete") {
            //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
            //查询成功时，result 即为对应的驾车导航信息
            console.log(result);
          } else {
            console.log("获取驾车数据失败：" + result);
          }
        });
      });
      // AMap.plugin(["AMap.PlaceSearch"], function () {
      //   const placeSearch = new AMap.PlaceSearch({
      //     pageSize: 5, // 单页显示结果条数
      //     pageIndex: 1, // 页码
      //     panel: "panel", // 结果列表将在此容器中进行展示。
      //     autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      //   });
      //   placeSearch.search('北京大学', function (status, result) {
      //     console.log(status, result);
      //   }); //关键字查询
      // });
    },
  },
};
</script>
<style scoped>
.custom-content-marker {
  position: relative;
  width: 25px;
  height: 34px;
}

.custom-content-marker img {
  width: 100%;
  height: 100%;
}

.custom-content-marker .close-btn {
  position: absolute;
  top: -6px;
  right: -8px;
  width: 15px;
  height: 15px;
  font-size: 12px;
  background: #ccc;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 15px;
  box-shadow: -1px 1px 1px rgba(10, 10, 10, .2);
}

.custom-content-marker .close-btn:hover{
  background: #666;
}
.box {
  width: 100vw;
  height: 100vh;
}
#panel {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 10px;
  right: 10px;
  width: 280px;
}
</style>
