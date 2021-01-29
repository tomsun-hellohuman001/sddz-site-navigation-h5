//modules: {
//      layout,
//      sysResource,
//      business,
//      sysRole
//  },
const action={}
const getters={}

let card='',MonthId='',productid='',tempaddressobj='',tempinvoice='',imgpath='',location={};
let temptoaddressobj='',titlename='',dingdanobj='',operationflag='',buydingdanobj='',presentcardurl='',productpid=''
let exchangeflag='',userinfo={},scrollheight=''
let buyobj={}
if(sessionStorage.temptoaddressobj){
    temptoaddressobj=JSON.parse(sessionStorage.temptoaddressobj)
}
if(sessionStorage.titlename){
    titlename=sessionStorage.titlename
}
if(sessionStorage.dingdanobj){
    dingdanobj=JSON.parse(sessionStorage.dingdanobj)
}

if(sessionStorage.operationflag){
    operationflag=sessionStorage.operationflag
}
if(sessionStorage.buydingdanobj){
    buydingdanobj=JSON.parse(sessionStorage.buydingdanobj)
}
if(sessionStorage.presentcardurl){
    presentcardurl=JSON.parse(sessionStorage.presentcardurl)
}
if(sessionStorage.productpid){
    productpid=sessionStorage.productpid
}

if(sessionStorage.buyobj){
    buyobj=JSON.parse(sessionStorage.buyobj)
}
if(sessionStorage.location){
	location=JSON.parse(sessionStorage.location)
}

if(sessionStorage.scrollheight){
    scrollheight=sessionStorage.scrollheight
}




if(sessionStorage.card){
    card=JSON.parse(sessionStorage.card)
}
if(sessionStorage.MonthId){
    MonthId=JSON.parse(sessionStorage.MonthId)
}
if(sessionStorage.productid){
    productid=JSON.parse(sessionStorage.productid)
}
if(sessionStorage.tempaddressobj){
    tempaddressobj=JSON.parse(sessionStorage.tempaddressobj)
}
if(sessionStorage.tempinvoice){
    tempinvoice=JSON.parse(sessionStorage.tempinvoice)
}
if(sessionStorage.imgpath){
    imgpath=sessionStorage.imgpath
}


if(sessionStorage.exchangeflag){
    exchangeflag=sessionStorage.exchangeflag
}
if(sessionStorage.userinfo){
    userinfo=JSON.parse(sessionStorage.userinfo)
}


const mutations = {
	updateLoadingStatus(state, isLoading) {
		state.isLoading = isLoading
	},
	updatedWindowSize(state) {
		state.windowSize = {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		}
	},
	updateDirection(state, direction) {
		state.direction = direction
	},


	updatecardobj (state, payload) {
		sessionStorage.card=JSON.stringify(payload.obj)
	    state.card = payload.obj
	},
	updateMonthId (state, payload) {
		sessionStorage.MonthId=JSON.stringify(payload.obj)
	    state.MonthId = payload.obj
	},
	updateproductid (state, payload) {
		sessionStorage.productid=JSON.stringify(payload.productid)
	    state.productid = payload.productid
	},


	uptempaddressobj(state, payload) {
		sessionStorage.tempaddressobj=JSON.stringify(payload.tempaddressobj)
	    state.tempaddressobj = payload.tempaddressobj
	},
	uptempinvoice(state, payload) {
		sessionStorage.tempinvoice=JSON.stringify(payload.tempinvoice)

	    state.tempinvoice = payload.tempinvoice
	},
	updateimgpath(state, payload) {
		sessionStorage.imgpath=JSON.stringify(payload.imgpath)
	    state.imgpath = payload.imgpath
	},
	updateCompanyId(state, companyId="") {
		sessionStorage.companyId=companyId
	    state.companyId = companyId
	},



	temptoaddressobj(state, payload) {
		sessionStorage.temptoaddressobj=JSON.stringify(payload.temptoaddressobj)
	    state.temptoaddressobj = payload.temptoaddressobj
	},
	updatetitlename(state, payload) {
		sessionStorage.titlename=payload.titlename
	    state.titlename = payload.titlename
	},
	updatedingdanobj(state, payload) {
		sessionStorage.dingdanobj=JSON.stringify(payload.dingdanobj)
	    state.dingdanobj = payload.dingdanobj
	},


	updateoperationflag(state, payload) {
		sessionStorage.operationflag=payload.operationflag
	    state.operationflag = payload.operationflag
	},


	updatebuydingdanobj(state, payload) {
		sessionStorage.buydingdanobj=JSON.stringify(payload.buydingdanobj)
	    state.buydingdanobj = payload.buydingdanobj
	},
	updatepresentcardurl(state, payload) {
		sessionStorage.presentcardurl=JSON.stringify(payload.presentcardurl)
	    state.presentcardurl = payload.presentcardurl
	},


	updateproductpid(state, payload) {
		sessionStorage.productpid=JSON.stringify(payload.productpid)
	    state.productpid = payload.productpid
	},


	updatelocation(state, payload) {
		sessionStorage.location = JSON.stringify(payload.location)
		// localStorage.location = JSON.stringify(payload.location)
	    state.location = payload.location
	},
	updatebuyobj(state, payload) {
	 	payload.buyobj&&(sessionStorage.buyobj=JSON.stringify(payload.buyobj))
	    state.buyobj={...state.buyobj,...payload}
	},

	updateexchangeflag(state, payload) {
		sessionStorage.exchangeflag=payload.exchangeflag
	    state.exchangeflag = payload.exchangeflag
	},

	updateuserinfo(state, payload) {
		sessionStorage.userinfo = JSON.stringify(payload.userinfo)
	    state.userinfo = payload.userinfo
	},

	updatescrollheight(state, payload) {
		sessionStorage.scrollheight = payload.scrollheight
	    state.scrollheight = payload.scrollheight
	},

}

const state = {
	isLoading: false,
	windowSize: {
		width: '',
		height: ''
	},
	direction:'forward',
	openid:'12345678',
  	photoUrl:'',
	card:card,//兑换页面exchange流程
	MonthId:MonthId,
	productid:productid,//主题产品id
	productpid:productpid,//产品id
	tempaddressobj:tempaddressobj,//存储地址
	tempinvoice:tempinvoice,//存储发票
	imgpath:imgpath,
	test:'',
	temptoaddressobj:temptoaddressobj,
	titlename:titlename,//标题存储，
	dingdanobj:dingdanobj,//订单对象存储（我的
	operationflag:operationflag,//右上角 操作按钮
	buydingdanobj:buydingdanobj,//订单对象存储（购买
	presentcardurl:presentcardurl,
	location:location,
	buyobj:buyobj,
	userinfo:userinfo,
	exchangeflag:'',
	scrollheight:scrollheight,
	companyId:''
}
export default {
	state,
	mutations
}
