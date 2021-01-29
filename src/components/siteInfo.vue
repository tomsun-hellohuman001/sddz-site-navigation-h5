<style scoped>
group {
  padding: 0 0 20px 0;
  width: 100%;
  height: 25%;
}

.phone-icon {
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 10px;
  -webkit-background-size: 20px 20px;
  background-size: 20px 20px;
  background-image: url("../assets/phone.png");
}
.origin-icon {
  display: inline-block;
  position: absolute;
  margin-top: -45px;
  width: 35px;
  height: 35px;
  right: 10px;
  -webkit-background-size: 35px 35px;
  background-size: 35px 35px;
  background-image: url("../assets/images/origin.jpg");
}
.siteinfo a {
  color: #666666;
}
.siteinfo img {
  height: 20px;
  width: 20px;
}
.siteinfo .vux-label-desc {
  margin-left: 5px;
}
</style>

<template>
  <div class="siteinfo" :style="heightStyle">
    <siteSearch
      :filter.sync="filter"
      :serveList.sync="serveList"
      :showSort="showSort"
      :query="queryAndInitMap"
      @switchCity="searchCity"
      ref="siteSearch"
    ></siteSearch>
    <div @click="hideCard" style="width:100%;height: 80%" id="siteMap"></div>
    <a href="javascript:void(0)" class="origin-icon" @click="siteOrigin"></a>
    <div
      v-show="showflag === true"
      style="position: absolute;bottom: 0;width: 100%;background-color:#fff;padding:10px 5px;"
    >
      <div slot="icon">
        <div style="position:relative;width: 100%;">
          <Row>
            <Col span="18">
          <div class style="margin-left: 5px;">
            <div style="font-size: 18px;color: black;width:262px">{{siteObj.name}}</div>
          </div>
          </Col>
          <Col span="6">
          <div class style="position:absolute;right:0;top:0;">
            <p class="vux-label-desc" style="margin-top: 0px;">
              <a :href="siteTel()" style="position:relative;margin-left:3px;">
                <img src="./../assets/images/call.png" style="position:inherit;bottom:-4px;" />
                <span>|</span>
              </a>
              <a href="javascript:void(0);" @click="openLocation(siteObj)" style="margin-left:6px">
                <img
                  src="./../assets/images/navigation.png"
                  style="position: relative;bottom: -4px;margin-right: 8px;"
                />
              </a>
            </p>
          </div>
          </Col>
          <Col span="24" style="margin-top:8px;">
          <div class style="width: 100%;">
            <p class="vux-label-desc" style>{{siteObj.cityName}}{{siteObj.areaName}}{{siteObj.addr}}</p>
            <p
              class="vux-label-desc"
              v-if="siteObj.discount !== null && siteObj.discount !== ''"
            >优惠信息：{{siteObj.discount}}</p>
            <p class="vux-label-desc">
              <Button
                v-for="(te,sindex) in siteObj.productList"
                :key="sindex"
                size="small"
                shape="circle"
                style="border-color: #e3e5e8 !important;color: #e3e5e8 !important;margin-right:2px;color:#666;padding: 1px 7px 0px;font-size: 10px;"
              >
                {{te.name}}
                <span style="color:#F86338">{{te.price}}</span>元/升
              </Button>
            </p>
            <p class="vux-label-desc">
              <span
                v-for="(s, index) in filterServe(siteObj.serve)"
                :key="index"
                style="position:relative;margin-left:3px;"
              >
                <img :src="require(`./../${s.ext1}`)" style="position:inherit;bottom:-4px;" />
                {{s.dictName}}
              </span>
            </p>
          </div>
          </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Cell, Group } from "vux";
import gps from "../util/gps";
import siteSearch from "./siteSearch";

export default {
  data() {
    return {
      userHistory: false,
      list: [],
      siteObj: {
        title: "",
        tel: "",
        detail: "",
        href: "",
        productList: [],
        discount: null,
        serve: "",
        cityName: "",
        areaName: ""
      },
      location: null,
      infoWindow: null,
      city: null,
      myCity: null,
      myPosition: {},
      curPosition: {},
      showflag: false,
      map: null,
      center: null,
      circle: null,
      radius: 20000,
      markFlag: false,
      showSort: false,
      filter: {
        name: "",
        belong: "",
        slider: 100,
        sort: "NEAREST",
        city: null
      },
      serveList: [],
      heightStyle: "height: 100%;"
    };
  },
  created() {
    const self = this;
    var u = navigator.userAgent;
    if (/android/i.test(u)) {
      this.heightStyle = "height: 100%;";
    } else if (/ipad|iphone|mac/i.test(u)) {
      this.heightStyle = "height: 90%;";
    } else {
      this.heightStyle = "height: 100%;";
    }
    this.$wechat.getLocation({
      type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: res => {
        self.$store.commit({
          type: "updatelocation",
          location: { lat: res.latitude, lng: res.longitude }
        });
      }
    });
  },
  mounted() {
    this.myPosition =
      this.$store.state.location || JSON.parse(sessionStorage.location);
    this.$refs.siteSearch.nameBefore = this.$route.query.name;
    this.$refs.siteSearch.sliderBefore = this.$route.query.distance;
    this.sliderBefore = this.$route.query.distance;
    this.filter.slider = this.$route.query.distance;
    this.filter.name = this.$refs.siteSearch.nameBefore;
    //this.filter.sliderBefore = 
    this.query();
    this.getMyLocation();
  },
  methods: {
     hideCard()
      {
        // alert("abc")
        this.$refs.siteSearch.distanceShow = false;
        this.$refs.siteSearch.sortShow = false;
        this.$refs.siteSearch.filterShow = false;
      },
    initBelong() {
      this.ajax
        .QUERY_DICTIONARIES({
          data: {type:"belong"},
          showMsg: false
        })
        .then(res => {
          console.log(res);
          if (res.data.result) {
            this.belongList = [
              {
                dictId: "",
                dictCode: "",
                dictName: "全部"
              }
            ];
            this.belongList.push(...res.data.obj);
          }
        });
    },
    showFilter(key) {
      let keyStatus = this[key];
      this.distanceShow = false;
      this.sortShow = false;
      this.filterShow = false;
      this[key] = !keyStatus;
    },
    query() {
      let param = {};
      if (this.filter.city !== "") {
        param.city = this.filter.city;
      }
      if (this.filter.belong !== "") {
        param.belong = parseInt(this.filter.belong);
      }
      if (this.filter.name !== "") {
        param.name = this.filter.name;
      }
      param.companyId = this.$store.state.companyId;
      this.ajax
        .QUERY_SITELIST({ showMsg: false, data: param })
        .then(res => {
          let location = this.$store.state.location || localStorage.location;
          this.list = res.data.obj
            /* .map((obj, i) => {
              return obj;
            })
            .sort((o1, o2) => {
              if (typeof o1 === "String") {
                return 1;
              }
              return o1.distance - o2.distance;
            }); */
        })
        .catch(msg => {
          this.log(msg);
        });
    },
    initMap() {
      this.map = new BMap.Map("siteMap", { minZoom: 5 });
      this.center = new BMap.Point(this.myPosition.lng, this.myPosition.lat); // 中心点
      this.radius = 20000; // 指定范围半径
      if (this.filter.slider !== "") {
        this.radius = this.filter.slider * 1000;
      }

      // 圆形覆盖物
      this.circle = new BMap.Circle(this.center, this.radius, {
        strokeColor: "#daeaf7",
        StrokeStyle: "solid",
        strokeWeight: 1,
        strokeOpacity: 0.8, // 轮廓
        fillColor: "#daeaf7",
        fillOpacity: 0.5, // 填充
        enableEditing: false // 是否启用形状编辑
      });

      this.startup();
    },
    queryAndInitMap() {
      this.markFlag = false;
      this.showflag = false;
      this.map = new BMap.Map("siteMap", { minZoom: 5 });
      this.center = new BMap.Point(this.myPosition.lng, this.myPosition.lat); // 中心点
      this.radius = 20000; // 指定范围半径
      if (this.filter.slider !== "") {
        this.radius = this.filter.slider * 1000;
      }

      // 圆形覆盖物
      this.circle = new BMap.Circle(this.center, this.radius, {
        strokeColor: "#daeaf7",
        StrokeStyle: "solid",
        strokeWeight: 1,
        strokeOpacity: 0.8, // 轮廓
        fillColor: "#daeaf7",
        fillOpacity: 0.5, // 填充
        enableEditing: false // 是否启用形状编辑
      });
      let param = {};
      if (this.filter.city !== "") {
        param.city = this.filter.city;
      }
      if (this.filter.belong !== "") {
        param.belong = parseInt(this.filter.belong);
      }
      if (this.filter.name !== "") {
        param.name = this.filter.name;
      }
      param.companyId = this.$store.state.companyId;
      this.ajax
        .QUERY_SITELIST({ showMsg: false, data: param })
        .then(res => {
          let location = this.$store.state.location || localStorage.location;
          this.list = res.data.obj
            .map((obj, i) => {
              return obj;
            })
            .sort((o1, o2) => {
              if (typeof o1 === "String") {
                return 1;
              }
              return o1.distance - o2.distance;
            });
          this.startup();
        })
        .catch(msg => {
          this.log(msg);
        });
    },
    getMyLocation() {
      let self = this;
      if (!this.myPosition.lat) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            self.myPosition = r.point;
            self.curPosition.lng = r.point.lng;
            self.curPosition.lat = r.point.lat;
            self.myCity = r.address.city;
            self.queryAndInitMap();
            console.log(self.myPosition);
          } else {
            console.error("获取地址失败", r);
          }
        });
      } else {
        this.myPosition = gps.bd_encrypt(
          this.myPosition.lat,
          this.myPosition.lng
        );
        this.queryAndInitMap();
      }
    },
    siteTel() {
      return "tel:" + this.siteObj.tel;
    },
    siteOrigin() {
      this.map.centerAndZoom(this.center, 10);
    },
    openLocation(item) {
      //alert('abc');
      let location = gps.bd_decrypt(item.lat, item.lng);
      wx.openLocation({
        // 进行此算法是修正百度地图所产生的坐标点偏移
        latitude: location.lat,
        longitude: location.lng,
        name: item.name,
        address: item.addr,
        scale: 15,
        infoUrl: ""
      });
    },
    // 渲染圆形范围内、外的点
    render() {
      let self = this;
      for (var i = 0; i < this.list.length; i++) {
        let point = new BMap.Point(this.list[i].lng, this.list[i].lat);
        // 判断是否在圆内
        if (BMapLib.GeoUtils.isPointInCircle(point, this.circle)) {
          let geoc = new BMap.Geocoder();
          geoc.getLocation(point, function(rs) {
            var addComp = rs.addressComponents;
            self.city = addComp.city;
          });
          var marker = new BMap.Marker(point);
          let obj = this.list[i];
          marker.addEventListener("click", function(e) {
            self.markFlag = true;
            self.showflag = true;
            self.siteObj = {};
            //let href = `http://api.map.baidu.com/direction?origin=latlng:${self.myPosition.lat},${self.myPosition.lng}|name:我的位置&destination=latlng:${obj.lat},${obj.lng}|name:${obj.name}&mode=driving&region=${self.city}&output=html&src=yourCompanyName|yourAppName`;
            //  obj.href = href;
            self.siteObj = obj;
          });
          this.map.addOverlay(marker);
          // marker.setAnimation(BMAP_ANIMATION_BOUNCE); // 圆内点添加动画
        }
      }
    },
    // 初始化
    startup() {
      // 添加地图控件
      this.map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      var size = new BMap.Size(100, 10);
      this.map.addControl(
        new BMap.CityListControl({
          anchor: BMAP_ANCHOR_TOP_LEFT,
          offset: size
        })
      );
      this.map.enableScrollWheelZoom(true);

      var myIcon = new BMap.Icon(
        require("../assets/images/mylocation.png"),
        new BMap.Size(15, 35),
        {}
      );
      var marker = new BMap.Marker(this.center, { icon: myIcon });
      // 监听圆形半径变化事件
      let self = this;
      let flag = true;
      this.circle.addEventListener("lineupdate", function(e) {
        if (flag) {
          self.circle.disableMassClear(); // 禁止circle在 map.clearOverlays 方法中被清除
          self.map.clearOverlays(); // 结合circle.disableMassClear(); 清除所有marker而保留circle；
          self.map.addOverlay(marker);
          self.render();
        }
        flag = false;
      });
      this.map.addEventListener("click", function(e) {
        if (!self.markFlag) {
          self.showflag = false;
        }
        self.markFlag = false;
      });
      // 设置中心点坐标、地图级别
      this.map.centerAndZoom(this.center, 10);
      this.map.addOverlay(this.circle);
    },
    searchCity(param) {
      this.filter.city = param.id;
      var city = param.cityName; //'北京';
      var local = new BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map }
      });
      local.search(city);
      let self = this;
      let geoc = new BMap.Geocoder();
      if (this.myCity !== city) {
        geoc.getPoint(city, function(rs) {
          self.myPosition.lat = rs.lat;
          self.myPosition.lng = rs.lng;
          self.queryAndInitMap();
        });
      } else {
        this.myPosition.lat = this.curPosition.lat;
        this.myPosition.lng = this.curPosition.lng;
        this.queryAndInitMap();
      }
    },
    filterServe(serves) {
      return this.serveList.filter(m => serves.indexOf(m.dictCode) > -1);
    }
  },
  components: {
    Cell,
    Group,
    siteSearch
  }
};
</script>
