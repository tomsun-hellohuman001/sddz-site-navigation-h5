export const QUERY_STORELIST='/wechat/storeInfo/getNkStoreInfoList'
export const QUERY_IMGPATH='/wechat/imgServer/getImgPath'
export const WX_SDKSINGCFG='/user/wxGasApi//getWxMpInfo'
//Modify by yangdaobing 20201231 切换新平台接口 
// export const QUERY_SITELIST='/wechat/siteInfo/getAll'
export const QUERY_SITELIST='/user/wxGasApi/stationNnavigate'
// export const QUERY_DICTIONARIES = '/wechat/dictionaries/getDictsByType'
export const QUERY_DICTIONARIES = '/admin/dictionary/getDictionaryByType'
export const QUERY_AREA_CHILDREN = '/admin/chinaArea/getRegionByPid'

export const QUERY_AREABYID = '/wechat/area/getById'

export const INSERT_CAR_APPLY = '/wechat/carInspectionApply/add'
export const GET_OPEN_ID = '/wechat/mall/index'

export const WX_OPEN_ID_EXIST =  '/wechat/carInspectionApply/existOpenId'
export const WX_GET_CONTACT_DATA =  '/wechat/carInspectionContact/pages'
export const WX_GET_APPLY_DATA =  '/wechat/carInspectionApply/getApply'


export const DRIVER_APPLY = '/wechat/driverApply/add'
export const DRIVER_GETBYID = '/wechat/driverApply/getByOpenId'
export const DRIVER_WAITCAR_BY_GOODS = '/wechat/driverApply/getWaitCarByGoodsType'
export const DRIVER_CONFIRM_IN = '/wechat/driverApply/confirmIn'
export const DRIVER_FINAL_MESSAGE = '/wechat/driverApply/getFinalMessage'
export const DRIVER_IS_WAIT = '/wechat/driverApply/isWait'


export const MANAGER_LOGIN = '/wechat/manager/login'
export const MANAGER_ADD_WHITE = '/wechat/manager/addWhiteCars'
export const DRIVER_ALL_WHITE = '/wechat/manager/getAllWhite'
export const DRIVER_CONTACT_DATA =  '/wechat/driverContact/pages'

export const ADD_DRIVER_MESSAGE = '/wechat/driverApply/addDriverMessage'

