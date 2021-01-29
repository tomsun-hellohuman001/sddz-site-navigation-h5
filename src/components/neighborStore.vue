<template>
  <div class="store">
    <div style="height: 1px; " class="vux-1px-t">&nbsp;</div>
    <div class="sss" @scroll='aaa'>
      <div class="store-detail vux-1px-b" v-for="(item,index) in showlist" :key='index'>
        <div class="detil" @click="toStoreDetail(item)">
          <p>{{item.storeName}}</p>
          <span>{{item.storeAddress}}</span>
        </div>

        <div class="dis" @click="toStoreDetail(item)">
          <img width="40" style="float: right; margin: 0px 0px 0px 15px;border-radius: 7px;"
            src="../assets/location.png">
          <p>{{item.distance===""?"":item.distance + " Km"}}</p>
        </div>
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
      align-items: center;
      min-height: 70px;
      padding: 8px;

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
            /*.detil{
                width: 70%;
      }*/
    }
  }

</style>
<script>
  import {Cell, Group} from 'vux'
  import gps from '../util/gps';

  export default {
    data () {
      return {
        userHistory: false,
        list: [],
        changdu: 15,
        checkInt: null
      }
    },
    created () {
      const self = this
      this.$wechat.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          self.$store.commit({
            type: 'updatelocation',
            location: {lat: res.latitude, lng: res.longitude},
          });
        }
      });
    },
    mounted () {
      this.$store.commit({
        type: 'updatetitlename',
        titlename: "附近门店",
      });
      this.checkPosition();
            // this.query()
    },
    computed: {
      showlist () {
        let result = [];
        if (this.changdu >= this.list.length) {
          result = this.list
        }
        result = this.list.filter((obj, index) => {
          return index < this.changdu;
        });
        return result;
      },
      location () {
        return this.$store.state.location;
      }
    },
    watch: {
      location (current, old) {
        this.rebuildList(current);
      }
    },
    methods: {
      aaa (e) {
        if (e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20) {
          this.changdu < this.list.length ? (this.changdu += 15) : (this.changdu = this.list.length)
        }

      },
      toStoreDetail (param) {
//				localStorage.storeDetail = JSON.stringify(param)
                sessionStorage.storeinfoobj = JSON.stringify(param)
                this.$router.push({
                    name: 'storeDetail', params: {
                        infoobj: param,
                    }
                })
            },
            rebuildList (current) {
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
            query () {
                this.$store.commit('updateLoadingStatus', true)
                this.ajax.QUERY_STORELIST({showMsg: false}).then((res) => {
                    let location = this.$store.state.location || localStorage.location;
                    this.list = res.data.obj.map((obj, i) => {
                        let selflocation = gps.bd_decrypt(obj.lat, obj.lng)
                        obj.lat = selflocation.lat
                        obj.lng = selflocation.lng
                        obj.distance = (gps.distance(location, selflocation) / 1000).toFixed(2)
                        if (isNaN(obj.distance)) {
                            obj.distance = "";
                        }
                        return obj
                    }).sort((o1, o2) => {
                        if (typeof (o1) === "String") {
                            return 1;
                        }
                        return o1.distance - o2.distance;
                    })
                    this.$store.commit('updateLoadingStatus', false)
                }).catch(msg => {
                    this.log(msg)
                    this.$store.commit('updateLoadingStatus', false)
                })
            },
            checkPosition () {
            /*    this.checkInt = setInterval(() => {
                    let location = this.$store.state.location || localStorage.location;
                    if (location != null && location.lat && location.lng) {
                        this.query();
                        clearInterval(this.checkInt);
                    }
                }, 100);*/
                this.query();
            }
        },
        components: {
            Cell,
            Group,
        },
    }
</script>
