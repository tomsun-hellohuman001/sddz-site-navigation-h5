<style>
    .store-title {
        font-size: 16px;
        font-weight: bold;
        color: #ed9f05;
    }

    .store-nav,
    .store-address {
        font-size: 12px;
    }
</style>
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
</style>

<template>
    <div style="height: 100%;">
        <div style="width:100%;height: 75%" id="storeMap">

        </div>
        <group>
            <cell value="">
                <div slot="icon">
                    <p>{{storeObj.storeName}}</p>
                    <p class="vux-label-desc" style="">地址: {{storeObj.storeAddress}}</p>
                    <p class="vux-label-desc" style="">联系人: {{storeObj.storeConstants}}</p>
                    <p class="vux-label-desc" style="">电话: <a :href="storeTel()" style="color:#0648af">{{storeObj.storePhone}}</a><a
                            class="phone-icon" :href="storeTel()"></a></p>
                </div>
            </cell>

        </group>
    </div>
</template>


<script>
    import {Cell, Group} from 'vux'
    import onerror from '../assets/error.png'
    import gps from '../util/gps';


    export default {
        data () {
            return {
                onerror: onerror,
                userHistory: false,
                list: [],
                storeObj: {
                    title: '',
                    tel: '',
                    detail: '',
                },
                location: null,
                bdMap: null,
                infoWindow: null,
                myCity: null,
                myPosition: {}
            }
        },

        mounted () {
            this.myPosition = this.$store.state.location || JSON.parse(sessionStorage.location);

            this.getMyLocation();

//	this.storeObj=JSON.parse(localStorage.storeDetail)
            this.storeObj = this.$route.params.infoobj || JSON.parse(sessionStorage.storeinfoobj);
            if (this.storeObj.lat && this.storeObj.lng) {
                this.location = gps.bd_encrypt(this.storeObj.lat, this.storeObj.lng);
            }
            this.bdMap = new BMap.Map("storeMap", {minZoom: 5});
            var point = null;
            if (this.location) {
                point = new BMap.Point(this.location.lng, this.location.lat);
                this.bdMap.centerAndZoom(new BMap.Point(this.location.lng, this.location.lat), 14);
            }
            this.bdMap.clearOverlays();

            // this.bdMap.enableScrollWheelZoom();
            let self = this;

            if (point) {
                let marker = new BMap.Marker(point);
                marker.addEventListener("click", (evt) => {
                    if (this.infoWindow && !this.infoWindow.isOpen()) {
                        this.bdMap.openInfoWindow(this.infoWindow, point);
                    }
                })
                this.bdMap.addOverlay(marker);
                let geoc = new BMap.Geocoder();
                geoc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    self.myCity = addComp.city;
                    self.showStoreInfo(point);
                });
            }
            self.$store.commit({
                type: 'updatetitlename',
                titlename: this.storeObj.storeName,
            });

        },
        methods: {
            showStoreInfo (point) {
                /*     let myPosition = this.$store.state.location;
                     if(!myPosition.lat){

                     }*/
                let href = `http://api.map.baidu.com/direction?origin=latlng:${this.myPosition.lat},${this.myPosition.lng}|name:我的位置&destination=latlng:${this.location.lat},${this.location.lng}|name:${this.storeObj.storeName}&mode=walking&region=${this.myCity}&output=html&src=yourCompanyName|yourAppName`;
                let sContent = `<div"><div class="store-title">${this.storeObj.storeName}</div><div class="store-address">${this.storeObj.storeAddress}</div><a class="store-nav" href="${href}">导航</a></div>`;
                var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
                infoWindow.setWidth(250);
                infoWindow.setHeight(80);
                infoWindow.disableCloseOnClick();
                this.infoWindow = infoWindow;
                console.log(href, this.myPosition, point)
                this.bdMap.openInfoWindow(infoWindow, point);
            },
            getMyLocation () {
                let self = this;
                if (!this.myPosition.lat) {

                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(function (r) {
                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                            self.myPosition = r.point;
                            console.log(self.myPosition)
                        } else {
                            console.error("获取地址失败", r)
                        }
                    });
                } else {
                    this.myPosition = gps.bd_encrypt(this.myPosition.lat, this.myPosition.lng);
                }
            },
            storeTel () {
                return "tel:" + this.storeObj.storePhone;
            }

        },
        components: {
            Cell, Group,
        },

    }
</script>
