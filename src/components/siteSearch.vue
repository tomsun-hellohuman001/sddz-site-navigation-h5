/**
*
* ━━━━━━神兽出没━━━━━━
*      ┏┓     ┏┓
*     ┏┛┻━━━━━┛┻┓
*     ┃          ┃
*     ┃    ━     ┃
*     ┃  ┳┛  ┗┳ ┃
*     ┃          ┃
*     ┃    ┻     ┃
*     ┃          ┃
*     ┗━┓     ┏━┛  Code is far away from bug with the animal protecting
*        ┃     ┃    神兽保佑,代码无bug
*         ┃     ┃
*         ┃     ┗━━━┓
*         ┃         ┣┓
*         ┃        ┏┛
*         ┗┓┓┏━┳┓┏┛
*          ┃┫┫ ┃┫┫
*          ┗┻┛ ┗┻┛
*
* ━━━━━━感觉萌萌哒━━━━━━
*/
/**
* 站点导航搜索
* @author Mr.han
* @date 2019/3/27 10:20
*/
<style lang="less">
    .siteSearch {
        .filter-list {
            a {
                color: black;
            }
            &-btn {
                .ivu-col a {
                    position: relative;
                    img {
                        position: absolute;
                        bottom: 0px;
                        right: -23px;
                    }
                }
            }
        }
        .belong-filter {
            margin: 10px 0;
            .ivu-btn {
                margin-left: 1%;
                &-hover {
                    color: #57a3f3;
                    background-color: #daeaf7;
                    border-color: #57a3f3;
                }
            }
        }
        .float {
            width: 100%;
            max-height: 70vh;
            overflow: auto;
            margin: 5px 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 4px;
            -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
            box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
            position: absolute;
            z-index: 900;
        }
    }
</style>
<template>
    <div :class="`${prefix}`">
        <div style="height:50px;margin-top:3px">
            <div class="mint-searchbar" style="margin-left:5px;background: transparent;width: 98%;  ">
                <div class="mint-searchbar-inner" style="height:30px;border: 1px solid rgb(217, 217, 217); ">
                  <i class="mintui mintui-search" style="font-size: 16px;" @click="inputBlur"></i>
                  <input type="search" placeholder="请输入加油站名称或详细地址" v-model="nameBefore" class="mint-searchbar-core" style="font-size: 12px;padding-left:10px;" @keyup="inputBlur" >
                </div>
                <div>
                    <a @click="goto">
                        <img :src="require(`./../assets/images/${isSite?'map':'list'}.png`)" style="height:20px;width:20px;margin-left:10px" />
                        <!--<img v-if="!isSite" src="./../assets/images/list.png" style="height:30px;width:30px;" />-->
                    </a>
                </div>
            </div>
        </div>
        <div class="filter-list">
            <Card dis-hover :padding="0" :bordered="false">
                <Row class="filter-list-btn" style="padding-bottom:10px;border-bottom:1px solid #d9d9d9;">
                    <Col :span="colSpan" :offset="offset">
                        <a @click="showFilter('distanceShow')">
                            距您{{filter.slider}}Km<img src="./../assets/images/down.png" :style="distanceShow?{transform:'rotate(180deg)'}:{}">
                        </a>
                    </Col>
                    <Col v-if="showSort" :span="colSpan" :offset="offset">
                        <a @click="showFilter('sortShow')">
                            <span v-text="sortLabel"></span>
                            <img src="./../assets/images/down.png" :style="sortShow?{transform:'rotate(180deg)'}:{}">
                        </a>
                    </Col>
                    <Col :span="colSpan" :offset="offset">
                        <a @click="showFilter('filterShow')">
                            <span v-text="cascaderLabel || '筛选'"></span>
                            <img src="./../assets/images/down.png" :style="filterShow?{transform:'rotate(180deg)'}:{}">
                        </a>
                    </Col>
                </Row>
            </Card>
            <Card v-show="distanceShow||sortShow||filterShow" class="float" :style="{'min-height': filterShow?'40vh':''}" dis-hover :padding="0" :bordered="false">
                <Row style="margin:10px 0;">
                    <Col v-if="distanceShow">
                        <div>距离我{{sliderBefore}}Km</div>
                        <div style="margin:10px 0;">
                            <Range v-model="sliderBefore" :min="1" :max="1000" :step="10" bar-height></Range>
                        </div>
                        <Button type="primary" long style="margin-top:20px;" @click="saveSlider">确定</Button>
                    </Col>
                    <Col v-if="sortShow">
                        <CellGroup @on-click="sortBy">
                            <Cell v-for="l in sortByList" :key="l.value" :title="l.label" :name="l.value" :selected="l.value==sort"/>
                        </CellGroup>
                    </Col>
                    <Col v-show="filterShow" >
                        <Cascader v-model="cascader" :data="cascaderData" :load-data="loadData" :clearable="true" @on-change="saveCascader"></Cascader>
                        <!-- <Button type="primary" long style="margin-top:200px;" @click="saveSlider">确定</Button> -->
                    </Col>
                </Row>
            </Card>
        </div>
        <div class="belong-filter" style="display: none;">
            <Card dis-hover style="padding-left:5px;" :padding="0" :bordered="false">
                <Button v-for="b in belongList" :key="b.dictId" :class="b.dictCode==filter.belong?'ivu-btn-hover':''" size="small" @click="filterBelong(b.dictCode)" shape="circle">{{b.dictName}}</Button>
            </Card>
        </div>
    </div>
</template>
<script>
  import {Range} from 'vux'

  export default {
    name: 'siteSearch',
    components: {
      Range
    },
    props: {
      filter: {
        type: Object,
        default() {
          return {
            name: '',
            belong: '',
            slider: 100,
            sort: 'NEAREST',
            city: null,
          }
        }
      },
      query: {
        type: Function,
      },
      showSort: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        prefix: 'siteSearch',
        belongList: [],
        distanceShow: false,
        sortShow: false,
        filterShow: false,
        nameBefore: '',
        sliderBefore: 1000,
        sort: 'NEAREST',
        sortByList: [
          {
            label: '按距离最近',
            value: 'NEAREST',
          },
          {
            label: '按价格最低',
            value: 'LOWPRICE',
          },
          {
            label: '按价格最高',
            value: 'HIGHTPRICE',
          },
        ],
        cascader: [],
        cascaderLabel: '',
        cascaderData: [],
      }
    },
    created() {
      this.$emit('update:filter', {...this.filter, slider: this.sliderBefore})
    },
    /**
     * el被新创建的vm.替换并挂载到实例上去之后调用该钩子
     */
    mounted() {
      this.ajax.QUERY_DICTIONARIES({
        data: {type:"belong"},
        showMsg: false,
      }).then(res => {
        if (res&&res.data&&res.data.data) {
          this.belongList = [
            {
              dictId: '',
              dictCode: '',
              dictName: '全部'
            }
          ]
          this.belongList.push(...res.data.data)
          this.ajax.QUERY_DICTIONARIES({
            data: {type:"serve"},
            showMsg: false,
          }).then(res => {
            if (res&&res.data&&res.data.data) {
              this.$emit('update:serveList', res.data.data)
            }
          })
        }
      })
      this.ajax.QUERY_AREA_CHILDREN({
        showMsg: false,
        data: {pid: 1}
      }).then(res => {
        if (res&& res.data&& res.data.data) {
          this.cascaderData = this.formatData(res.data.data)
          console.log(this.cascaderData)
          this.cascaderData.unshift({label:"全部",value:"0"})
          console.log("++" + this.cascaderData)
        }
      })
    },
    /**
     * 计算属性将被混入到 Vue 实例中。
     * 所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
     */
    computed: {
      offset() {
        return 1
      },
      filterSize() {
        let total = 3
        return !this.showSort ? total - 1 : total
      },
      colSpan() {
        return parseInt(24 / this.filterSize) - this.offset
      },
      sortLabel () {
        switch (this.sort) {
          case 'NEAREST':
            return '距离最近'
            break
          case 'LOWPRICE':
            return '价格最低'
            break
          case 'HIGHTPRICE':
            return '价格最高'
            break
          default:
            return '排序'
          break
        }
      },
      isSite () {
        return location.hash.indexOf('site') > -1
      },
    },
    /**
     * 一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。
     * Vue 实例将会在实例化时调用 ()，遍历 watch 对象的每一个属性。
     */
    watch: {
      nameBefore(cur) {
        this.$emit('update:filter', {...this.filter, name: cur})
        if (cur === '') {
          this.query()
        }
      },
    },
    /**
     * methods将被混入到 Vue 实例中。
     * 可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。
     * 方法中的 this 自动绑定为 Vue 实例。
     */
    methods: {
      hideCard(){
        //alert('test');
      },
      filterBelong(belongCode) {
        this.$emit('update:filter', {...this.filter, belong: belongCode})
        this.query()
      },
      showFilter(key) {
        let keyStatus = this[key]
        this.distanceShow = false
        this.sortShow = false
        this.filterShow = false
        this[key] = !keyStatus
      },
      saveSlider() {
        this.$emit('update:filter', {...this.filter, slider: this.sliderBefore})
        this.distanceShow = false
        this.query()
      },
      sortBy(key) {
        this.$emit('update:filter', {...this.filter, sort: key})
        this.sort = key
        this.sortShow = false
        this.query()
      },
      loadData(item, callback) {
        item.loading = true;
        this.ajax.QUERY_AREA_CHILDREN({
          showMsg: false,
          data: {pid: item.value}
        }).then(res => {
          if (res&&res.data&&res.data.data) {
            item.children = this.formatData(res.data.data)
          }
          item.loading = false;
          callback();
        })
      },
      formatData(data) {
        data.map(m => {
          m.value = m.id
          m.label = m.name
          if (m.level < 3) {
            m.children = []
            m.loading = false
          }
        })
        return data
      },
      saveCascader(value, selectedData) {
        if(value[0] == "0"){
          this.cascaderLabel = "筛选";
          this.filterShow = false;
          this.$emit('update:filter', {...this.filter, city: ""})
          this.$emit('switchCity', {})
          return;
        }
        this.$emit('update:filter', {...this.filter, city: value[1]})
        let cityName = selectedData.find(f => f.level === 3).name
        if (cityName === '市辖区'||cityName === '县') {
          cityName = selectedData.find(f => f.level === 2).name
        }
        let param = {
          id: value[1],
          cityName: cityName
        }
        this.$emit('switchCity', param)
        this.cascaderLabel = cityName
        this.filterShow = false
      },
      goto () {
        let hash = 'siteList'
        if (this.isSite) {
          hash = 'siteInfo'
        }
        //location.hash = '#/' + hash
         this.$router.push({
          name: hash,
          query:{
            name: this.nameBefore,
            distance:this.sliderBefore
          }
        })
      },
      inputBlur () {
        this.$nextTick(() => {
          if (this.nameBefore !== '') {
            this.query()
          }
        })
      },
    },
  }
</script>
