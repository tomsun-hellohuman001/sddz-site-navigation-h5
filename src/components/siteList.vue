<template>
    <div class="store" style="">
        <siteSearch
                :filter.sync="filter"
                :serveList.sync="serveList"
                :query="query"
                @switchCity="switchCity"
                ref="siteSearch"
        >
        </siteSearch>
 <div @click="hideCard" style="overflow:auto;height:100%">
        <div style="height: 1px; " class="vux-1px-t">&nbsp;</div>
        <div class="sss" @scroll='aaa'>
            <div class="store-detail " style="border-bottom:1px solid #C7C7C7;" v-for="(item,index) in showlist" :key='index'>
                <div class="detil" @click="toStoreDetail(item)">
                    <!--加油站名-->
                    <Row>
                      <Col span="18" style="text-overflow: ellipsis; word-break: keep-all;overflow : hidden;">
                      <span style="font-size: 18px;color: #7dd2ee;width:80%">{{item.name}}</span>
                      </Col> 
                      <Col span="6">
                        <div class="top" style="margin-top: 0px;margin-right:5px;"  @click="toStoreDetail(item)">
                            <span>
                                <img src="./../assets/images/positionFlag.png" style="margin-top:0px;"/>
                                {{item.distance===''?'0.00 Km':item.distance + " Km"}}
                            </span>
                        </div>
                       
                      </Col> 
                      </Row>
                      <Row>
                      <Col span="19" style="text-overflow: ellipsis; word-break: keep-all; overflow: hidden;">
                      <span>{{item.cityName}}{{item.areaName}}{{item.address}}</span>
                      </Col> 
                      <Col span="5" style="margin-bottom:0px;">
                      <div class="" @click="toStoreDetail(item)" style="margin-right:6px;margin-bottom:0px;padding-bottom:0px;">
                        <div class="" style="display:inline;margin-left:2px;">
                            <span class="call">
                              <span>
                                <a :href="'tel:' + item.tel">
                                    <img src="./../assets/images/call.png" style="  vertical-align:middle;"/>
                                </a>
                              </span>
                               <span style="  vertical-align:middle;display:inline;">&nbsp;</span>
                            </span>
                            <span class="boundary" >|&nbsp;</span>
                            <span class="navigation" >
                                <a @click="openLocation(item)">
                                    <img src="./../assets/images/navigation.png" style="  vertical-align:middle;"/>
                                </a>
                            </span>
                        </div>
                    </div>
                      </Col> 
                    </Row>
                    
                    <!--地址-->
                    
                    <!--优惠信息-->
                    <Row>
                    <span v-if="item.discount !== null && item.discount !== ''">优惠信息：{{item.discount}}</span>
                    </Row>
                    <!--产品-->
                    <Row>
                    <span>
                        <Button v-for="(te,sindex) in item.stationProductList" :key='sindex' size="small" shape="circle" style="border-color: #e3e5e8 !important;color: #e3e5e8 !important;margin-right:2px;padding: 1px 7px 0px;font-size: 10px;">{{te.name}} <span style="color:#F86338">{{te.listingPrice}}</span>元/升</Button>
                    </span>
                    </Row>
                    <Row>
                    <!--服务-->
                    <span style="width: 75%;">
                        <span v-for="(s, sindex) in filterServe(item.serve)" :key='sindex' style="position:relative;margin-left:3px;">
                            <img :src="require(`./../${s.ext1}`)" style="position:inherit;bottom:-4px;"/>
                            <span>{{s.dictName}}</span>
                            <!--<span v-if="sindex<item.serve.split(',').length-1">、</span>-->
                        </span>
                    </span>
                    </Row>
                </div>
            </div>
            <div style="margin-left:5px;color:#666">{{bottom}}</div>
        </div>
        </div>
    </div>
</template>
<style type="text/css" lang="less">
    .store {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
        width: 100%;
        .sss {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        .store-detail {
            display: flex;
            justify-content: space-between;
            min-height: 70px;
            padding: 8px;
            .detil {
                width: 100%;
                position: relative;
                > span {
                    display: block;
                    width: 100%;
                }
            }
            .dis {
                position: absolute;
                right: 0;
                top: 0;
                width: 30%;
                height: 100%;
                .top, .bottom {
                    position:absolute;
                    right:0;
                }
                .top {
                    top:0;
                }
                .bottom {
                    width: 100%;
                    bottom: 0;
                    > div {
                        position:absolute;
                        bottom: 0;
                    }
                    .call {
                        right:27px;
                        img {
                            position: absolute;
                            left: -19px;
                            bottom: 1px;
                        }
                    }
                    .boundary {
                        right: 21px;
                    }
                    .navigation {
                        bottom:-3px;
                        right:0;
                    }
                }
            }

            h4 {
                font-size: 18px;
            }
            span {
                color: #666666;
            }
            a {
                color: #666666;
                text-align: center;
            }
            img {
                height: 20px;
                width: 20px;
            }
          }
    }


</style>
<script>
  import {Cell, Group} from 'vux'
  import gps from '../util/gps';
  import siteSearch from './siteSearch'
  import { log } from 'util';

  export default {
    data() {
      return {
        userHistory: false,
        list: [],
        changdu: 15,
        checkInt: null,
        serveList: [],
        position:{},
        filter: {
          name: '',
          belong: '',
          slider: 100,
          sort: 'NEAREST',
          city: null,
        },
        bottom:''
      }
    },
    created() {
      console.error(this.$route.query);
      if(this.$route.query && this.$route.query.c){
        this.$store.commit('updateCompanyId', this.$route.query.c)
      }
      const self = this
      this.$wechat.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          console.log("updateLocation"+JSON.stringify(res));
          self.$store.commit({
            type: 'updatelocation',
            location: {lat: res.latitude, lng: res.longitude},
          });
          self.position = {lat: res.latitude, lng: res.longitude};
          self.query({lat: res.latitude, lng: res.longitude});
        },
        error: (res) => {
          console.error(res);
         //alert("ERRRR");
         // alert(res);
        },
         fail: (res) => {
           console.error(res);
          //console.log(res);
          //alert("ERRRR");
          //alert(res);
        },
      });
      
    },
    mounted() {
      this.$store.commit({
        type: 'updatetitlename',
        titlename: "附近门店",
      });
      this.checkPosition();
      if(typeof(this.$route.query.name) !='undefined' )
      {
      this.$refs.siteSearch.nameBefore = this.$route.query.name;
      }
      if(typeof(this.$route.query.distance) != 'undefined')
      {
        this.$refs.siteSearch.sliderBefore = this.$route.query.distance;
        this.sliderBefore = this.$route.query.distance;
        this.filter.slider = this.$route.query.distance;
      }
    //  this.query();
    },
    computed: {
      showlist() {
        let result = [];
        if (this.changdu >= this.list.length) {
          result = this.list
        }
        result = this.list.filter((obj, index) => {
          return index < this.changdu;
        });
        return result;
      },
      location() {
        return this.$store.state.location;
      }
    },
    watch: {
      location(current, old) {
        this.rebuildList(current);
        this.query();
      },
      position(val){
        this.query(val);
      }
    },
    methods: {
      hideCard()
      {
        // alert("abc")
        this.$refs.siteSearch.distanceShow = false;
        this.$refs.siteSearch.sortShow = false;
        this.$refs.siteSearch.filterShow = false;
      },
      aaa(e) {
        if (e.tarquery.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
          this.changdu < this.list.length ? (this.changdu += 15) : (this.changdu = this.list.length)
        }

      },
      toStoreDetail(param) {
//				localStorage.storeDetail = JSON.stringify(param)
//         sessionStorage.storeinfoobj = JSON.stringify(param)
//         this.$router.push({
//           name: 'storeDetail', params: {
//             infoobj: param,
//           }
//         })
      },
      rebuildList(current) {
        let location = current;
        this.list.forEach((val, idx, arr) => {
          val.distance = (gps.distance(location, val) / 1000).toFixed(2)
          if (isNaN(val.distance)) {
            val.distance = "未知";
          }
        });
        this.list = this.list.sort((o1, o2) => {
          if (typeof (o1) === "String") {
            return 1;
          }
          return o1.distance - o2.distance;
        })
      },
      query(position) {
        let self = this
        this.$store.commit('updateLoadingStatus', true)
        let location = this.$store.state.location || localStorage.location || self.position;
        this.ajax.QUERY_SITELIST({
          showMsg: false,
          data: {
            belong: parseInt(this.filter.belong),
            name: this.filter.name,
            sort: this.filter.sort,
            city: this.filter.city,
            distance:this.filter.slider,
            targetLat:location && location.lat,
            targetLng:location && location.lng,
            companyId:this.$store.state.companyId
          }
        }).then((res) => {
          let location = this.$store.state.location || localStorage.location || self.position;
          // self.list = res.data.obj.map((obj, i) => {
          self.list = res.data && res.data.data&& res.data.data.map((obj, i) => {
            let selflocation = gps.bd_decrypt(obj.latitude, obj.longitude)
            //console.log("lat is " + obj.latitude);
            //console.log("lng is " + obj.longitude);
            // obj.latitude = selflocation.lat
            // obj.longitude = selflocation.lng
            obj.distance = (gps.distance(location, selflocation) / 1000).toFixed(2)
            if (isNaN(obj.distance)) {
              obj.distance = "0";
            }
            console.log("now distance is " + obj.distance)
            return obj
          })
          console.log("distance is " + self.filter.slider);
    
          self.list = self.list.filter(f => parseFloat(f.distance) <= parseFloat(self.filter.slider))
          if (this.filter.sort === 'NEAREST') {
            self.list = self.list.sort((o1, o2) => {
              if (typeof (o1) === "String") {
                return 1;
              }
              return o1.distance - o2.distance;
            })
          }
          if(self.list.length > 0){
            self.bottom = '已经到底啦'
          }else{
            self.bottom = '没有找到加油站'
          }
          this.$store.commit('updateLoadingStatus', false)
        }).catch(msg => {
          this.log(msg)
          this.$store.commit('updateLoadingStatus', false)
        })
      },
      checkPosition() {
        /*    this.checkInt = setInterval(() => {
                let location = this.$store.state.location || localStorage.location;
                if (location != null && location.lat && location.lng) {
                    this.query();
                    clearInterval(this.checkInt);
                }
            }, 100);*/
        this.query();
      },
      filterServe(serves) {
        return this.serveList.filter(m => serves && serves.indexOf(m.dictCode) > -1)
      },
      navigatorPath(item) {
        let location = this.$store.state.location || localStorage.location;
        return `http://api.map.baidu.com/direction?origin=latlng:${location.lat || 36.692402812829},${location.lng || 117.14777001086}|name:我的位置&
        destination=latlng:${item.lat},${item.lng}|name:${item.name}&mode=driving&region=${item.cityName}&output=html&src=yourCompanyName|yourAppName`
      },
      openLocation(item) {
        let location = gps.bd_decrypt(item.lat, item.lng)
        wx.openLocation({
          // 进行此算法是修正百度地图所产生的坐标点偏移
          latitude: location.lat,
          longitude: location.lng,
          name: item.name,
          address: item.addr,
          scale: 15,
          infoUrl: '',
        });
      },
      switchCity() {
        this.query()
      },
    },
    components: {
      Cell,
      Group,
      siteSearch,
    },
  }
</script>
