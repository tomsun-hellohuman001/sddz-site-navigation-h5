<template>
	<div id="app" :style="outsideStyle">
		<!-- <div v-show="$route.meta.showTitle!==false">

			<div class="mycard-title " :style="style1" >


       <a style="color: black;font-size: 16px;" href="javascript:history.back(-1)"> <i class="mintui mintui-back"></i></a>
				<span v-show="!$route.meta.showtabitem">{{ $store.state.titlename||$route.params.titlename||$route.meta.title}}</span>
				<span   v-show="$store.state.operationflag" style="right: 25px;position: absolute;z-index: 100;" @click='opreation($route.meta&&$route.meta.operation&&$route.meta.operation.operaprop||"")' >
					{{$store.state.operationflag?($route.meta.operation&&$route.meta.operation.operationText):''}}
				</span>

				<tab v-show="$route.meta.showtabitem" style="max-width: 50%; margin:0 auto;background-color: #ec748a;">
					<tab-item @click.native='$router.replace({ name: "buy"  })' style="color: white;" :selected="'buy'==$route.name">商品</tab-item>
					<tab-item @click.native='$router.replace({ name: "buydetail"  })' style="color: white;" :selected="'buydetail'==$route.name">详情</tab-item>
					<tab-item @click.native='$router.replace({ name: "buycomment"  })' style="color: white;" :selected="'buycomment'==$route.name">评价</tab-item>

				</tab>
			</div>
		</div> -->

		<loading v-model="isLoading"></loading>
		<transition :name="classname" >
			<router-view :style="routerflag" ></router-view>
		</transition>

		<div class="tabs " v-show="showBottomFlag === true && showcolletFlag === false"><!--暂时关闭入口-->
      <div v-model="selected"   class="mint-tabbar is-fixed" style="color: #666666;">
        <a href="javascript:void(0)" class="mint-tab-item"  id="homepage"  selected @click="goto({name:'homepage'})"  >
          <div class="mint-tab-item-icon">
            <img slot="icon"   :src="selected==='homepage'?imgObj.zyactive:imgObj.zypng">
          </div>
          <div class="mint-tab-item-label">
            首页
          </div>
        </a>
        <a href="javascript:void(0)" class="mint-tab-item"  id="activity"  @click="goto({name:'bookCategory'})"  >
          <div class="mint-tab-item-icon">
            <img slot="icon" :src="selected==='bookCategory'?imgObj.hdactive:imgObj.hdpng" >
          </div>
          <div class="mint-tab-item-label">
            分类
          </div>
        </a>
        <a href="javascript:void(0)" class="mint-tab-item" id="integral"  @click="goto({name:'addCookbook'})"  >
          <div class="mint-tab-item-icon">
            <img slot="icon"  :src="selected==='addCookbook'?imgObj.jfactive:imgObj.jfpng">
          </div>
          <div class="mint-tab-item-label">
              发布菜谱
          </div>
        </a>
        <a href="javascript:void(0)" class="mint-tab-item" id="mine"  @click="goto({name:'mine'})"  >
          <div class="mint-tab-item-icon">
            <img slot="icon"   :src="selected==='mine'?imgObj.wdactive:imgObj.wdpng">
          </div>
          <div class="mint-tab-item-label">
              我的
          </div>
        </a>
      </div>
		</div>
		<div v-show="showac2">
<!--		<actionsheet v-model="showac2" :menus="menus3" show-cancel
			@on-click-menu-self='$router.push({name:"neighborStore"})'
			@on-click-menu-mail="$router.push({name:'exchange2',params:{exflag:true}})"
			></actionsheet>-->
		<actionsheet v-model="showac2" :menus="menus3" show-cancel
			@on-click-menu-mail="$router.push({name:'exchange2',params:{exflag:true}})"
			></actionsheet>
		</div>
	</div>
</template>
<!--$router.push({name:"exchange1"})-->
<script>
	import { Loading, Tab, TabItem, Tabbar ,Actionsheet} from 'vux'
	import { mapState, mapMutations } from 'vuex'
	import bind from './assets/bind.png'
	import home from './assets/home.png'
	import mine from './assets/mine.png'
	import bindactivate from './assets/bindactivate.png'
	import homeactivate from './assets/homeactivate.png'
	import mineactivate from './assets/mineactivate.png'
  import zypng from './assets/images/zy.png'
  import zyactive from './assets/images/zyactive.png'
  import hdpng from './assets/images/hd.png'
  import hdactive from './assets/images/hdactive.png'
  import jfpng from './assets/images/jf.png'
  import jfactive from './assets/images/jfactive.png'
  import wdpng from './assets/images/wd.png'
  import wdactive from './assets/images/wdactive.png'
  import Vue from 'vue'
	export default {
		name: 'app',
		data() {
			return {
				index:null,
				lastIndex:null,
        selected:this.$route.name,
        imgObj:{
          zypng:zypng,
          zyactive:zyactive,
          hdpng:hdpng,
          hdactive:hdactive,
          jfpng:jfpng,
          jfactive:jfactive,
          wdpng:wdpng,
          wdactive:wdactive
        },
				style1: {
					'position': 'fixed',
					'top': ' 0px',
					'width': '100%',
          'font-size': '16px',
				},
				style2: {
					'margin-top': '44px'
				},
				style3: {
//					'margin-bottom':  '50px'
				},
				outsideStyle:{
					'height': global.windowHeight + 'px'
				},
				innerheight2:{
					'-webkit-overflow-scrolling': 'touch',
//					'overflow': 'auto',
//					'height': '100%'
				},
				innerheight3:{
					'height': global.windowHeight-94 + 'px'
				},

				bind: bind,
				home: home,
				mine: mine,
				bindactivate: bindactivate,
				homeactivate: homeactivate,
				mineactivate: mineactivate,
				showac2:false,
				 menus2: {
			        first: '新卡激活',
			        old: '老卡拉取'
			      },
			      menus3: {
//			        self: '门店兑换',
			        mail: '公司邮寄',

            },
        showBottomFlag: false,
        showcolletFlag:false,
		};
		},
		components: {
			Loading,
			Tab,
			TabItem,
			Tabbar,Actionsheet
		},
		methods:{
			onself(){
				this.$router.push({name:"neighborStore"})
			},
			ongift(){
				this.$router.push({name:"presenter"})
			},
			onmail(){
				this.$router.push({name:'exchange2',params:{cardtype:this.$store.state.card&&this.$store.state.card.cardType||''}})
			},
		},
		watch:{
			$route(newroute,oldroute){
         let productId = newroute.params.productId || newroute.query.productId;
        if(productId !== undefined && productId !== null){
          this.showBottomFlag = true
          this.showcolletFlag = true
          let obj = {}
          obj.id = productId;
          sessionStorage.bookDetailobj = JSON.stringify(obj)
          sessionStorage.setItem('productId',true)
          this.$router.push({
            name: 'cookbookDetail', params: {
                bookDetailobj: obj,
            }
          })
        }
        if(newroute.fullPath.indexOf('/menu') !== -1){
          this.showBottomFlag = true
        }
        if(newroute.fullPath.indexOf('/cookbookDetail') !== -1){
          this.showcolletFlag = true
        }else{
          this.showcolletFlag = false
        }
			 this.selected=newroute.name
				this.index=newroute.meta.index||null
				this.lastIndex=oldroute.meta.index||null
//				console.log("===",this.$route.meta.Auth&&this.$route.meta.Auth.length&&this.$route.meta.Auth.length!=0)
				if(this.$route.meta.Auth&&this.$route.meta.Auth.length&&this.$route.meta.Auth.length!=0||false){
					this.log(this.$route.meta.Auth.length)
					for(let i=0;i<this.$route.meta.Auth.length;i++){
						if(this.$store.state[this.$route.meta.Auth[i]]==''){
//							this.$route.replace({name:'mainpage'})
							this.log("缺失字段:"+this.$route.meta.Auth[i])
							this.$router.replace({ name: "mainpage" })

							return ''
						}else{
							this.log("pass")
						}
					}
				}
			},
		},
		computed: {
			...mapState([
				'direction',
				 'isLoading'
			]),
			classname() {
				if(this.index&&this.lastIndex){
					return this.index>this.lastIndex?'pop-in' : 'pop-out'
				}
				return this.direction === 'forward' ? 'pop-in' : 'pop-out'
			},
			routerflag: function() {

				/*$route.meta.showTab 50*/
				/*$route.meta.showTitle!==false  44*/

				let temp1={},temp2={}
				if(this.$route.meta.showTitle==false) {
//					return this.innerheight2
					temp1=this.innerheight2
				} else {
					temp1={...this.innerheight2}
//					return {...this.style2,...this.innerheight2}
				}
				if(this.$route.meta.showTab==true){
					temp2=this.style3
				}
				return {...temp1,...temp2}
			},
		},

		created() {


			this.updatedWindowSize()
			window.addEventListener('resize', this.updatedWindowSize)

		},
		mounted(){

			this.geturl()
      //this.locaton()
		},
		methods: {
			...mapMutations([
				'updatedWindowSize'
			]),
			toexchange(){
			},
			goto(page){
        this.$router.push(page)
      },
      loadScript(src, callback) {
        if (!(typeof callback === 'function')) {
          callback = function() {}
        }
        var check = document.querySelectorAll(`script[src="${src}"]`)
        if (check.length > 0) {
          check[0].addEventListener('load', function() {
            callback()
          })
          callback()
          return
        }
        var script = document.createElement('script')
        var head = document.getElementsByTagName('head')[0]
        script.type = 'text/javascript'
        script.charset = 'UTF-8'
        script.src = src
        if (script.addEventListener) {
          script.addEventListener('load', function() {
            callback()
          }, false)
        } else if (script.attachEvent) {
          script.attachEvent('onreadystatechange', function() {
            var target = window.event.srcElement
            if (target.readyState === 'loaded') {
              callback()
            }
          })
        }
        head.appendChild(script)
      },
			geturl(){
				this.ajax.QUERY_IMGPATH({method:'get',showMsg:false}).then((res) => {
					this.log(res.data.obj)
					this.$store.commit({
					  type: 'updateimgpath',
					  imgpath: res.data.obj
					})
				}).catch(msg => {

				});

                let currentUrl = location.href;
                if (currentUrl.indexOf("#") > 0) {
                    currentUrl = currentUrl.split('#')[0];
                }
        let self = this
      this.loadScript('http://res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
        this.ajax.WX_SDKSINGCFG({ data: {url:currentUrl,mpName:"正宏智慧加油"}}).then((res) => {
		  //wx
            wx.config({
                debug: process.env.NODE_ENV === 'production'?false:true, // false:true,开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看
      //						    debug: true, // false:true,开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看
                appId: res.data.data.appid, // 公众号
                timestamp: res.data.data.timestamp, // 必填，时间戳
                nonceStr: res.data.data.nonceStr, // 必填，随机串
                signature: res.data.data.signature,// 必填，签名后密文
                jsApiList: ['getLocation', 'openLocation', 'updateAppMessageShareData', 'updateTimelineShareData','onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，添加card权限，choosecard获取本地全码列表，opencard打开一个卡券看详情
          });
          this.locaton(self);

        }).catch(msg => {
            this.log(msg)
        })
      });

			},
			locaton(self){
				  wx.ready(()=>{
				 	  wx.getLocation({
				        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					    success:  (res)=> {
					        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
					        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
					        self.$store.commit({
					        	type:'updatelocation',
					        	location:{lat:latitude,lng:longitude},
					        })
					    }
					});
				 })

			},
			opreation(name){
				if(name==''){
					this.$router.push({name:"exchange1",params:{type:"new"}})
					return ;
				}
				this[name]=true
			},
      back() {
				this.$router.back()
			},
      Message(Text) {
        Vue.$vux.toast.show({
          text: Text,
          position: 'bottom',
          type: 'text',
          width: 'auto'
        })
      }
		},

	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
	@import '~vux/src/styles/1px.less';
	body {
		background-color: #fbf9fe;
	}
	.weui-mask_transparent{
		z-index: 99998 !important;
	}
	.weui-toast{
		z-index: 99999 !important;
	}
	.weui-actionsheet{
		z-index: 99999 !important;
	}
	.mycard-title {
		z-index: 9999;
    text-align: left;
    background-color:#edb918;
    padding-left: 15px;color: #333;    line-height: 44px;
		img{
			top:10px;left: 25px;position: absolute;z-index: 100;
		}
	}

	.isActive {
		color: #edd33b
	}

	.tabs {
		padding-top: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		height: 45px;
		align-items: center;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background: #ffffff;
		font-size: 13px;
		z-index: 999;
		.tabitem {
			text-align: center;
			img{
				width:22px
			}
		}
		p {
			margin: 0;
			padding: 0;
		}
	}

	.pop-in-enter-active,
	.pop-in-leave-active,
	.pop-out-enter-active,
	.pop-out-leave-active {
		position: fixed;
		top: 0px;
		bottom: 0px;
		width: 100%;
		background: #fbf9fe;
		transition-duration: 250ms;
		transition-timing-function: cubic-bezier(0.4, 0.6, 0.2, 1);
		-webkit-transition-property: opacity, -webkit-transform;
		transition-property: opacity, transform;
	}

	.pop-out-enter {
		transform: translate3d(-33%, 0, 0);
		opacity: 0.8;
		z-index: 1;
	}

	.pop-out-enter-to {
		transform: translate3d(0, 0, 0);
		opacity: 1;
		z-index: 1;
	}

	.pop-out-leave {
		transform: translate3d(0, 0, 0);
		opacity: 1;
		z-index: 2;
	}

	.pop-out-leave-to {
		transform: translate3d(100%, 0, 0);
		opacity: 1;
		z-index: 2;
	}

	.pop-in-enter {
		transform: translate3d(100%, 0, 0);
		opacity: 1;
		z-index: 2;
	}

	.pop-in-enter-to {
		transform: translate3d(0, 0, 0);
		opacity: 1;
		z-index: 2;
	}

	.pop-in-leave {
		transform: translate3d(0, 0, 0);
		opacity: 0.8;
		z-index: 1;
	}

	.pop-in-leave-to {
		transform: translate3d(-33%, 0, 0);
		opacity: 0;
		z-index: 1;
	}

	.pop-in-enter-active {
		box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
	}

	.pop-out-leave-active {
		box-shadow: -5px 0 3px rgba(0, 0, 0, .15);
	}
</style>
