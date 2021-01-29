
 
//设置临界值,这个值可根据自己的需求进行设定，默认就3000也差不多了
let shakeThreshold = 3000;
//设置最后更新时间，用于对比
let lastUpdate = 0;
//设置位置速率
let curShakeX=0;
let curShakeY=0
let curShakeZ=0
let lastShakeX=0
let lastShakeY=0
let lastShakeZ=0

// let shake_options = {
//     preload  : 'auto'
// }
// for(let key in shake_options){
//     if(shake_options.hasOwnProperty(key) && (key in shakeAudio)){
//         shakeAudio[key] = shake_options[key];
//     }
// }
export default function isYao(event){
 
    //获得重力加速
    let acceleration =event.accelerationIncludingGravity;
 
    //获得当前时间戳
    let curTime = new Date().getTime();
 
    if ((curTime - lastUpdate)> 100) {
 
        //时间差
        let diffTime = curTime -lastUpdate;
            lastUpdate = curTime;
 
 
        //x轴加速度
        curShakeX = acceleration.x;
        //y轴加速度
        curShakeY = acceleration.y;
        //z轴加速度
        curShakeZ = acceleration.z;
 
        let speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;
 
        if (speed > shakeThreshold) {
            //TODO 相关方法，比如：
            // let bg=require('../assets/aojiao.png')
            //     document.body.style.backgroundImage=`url(${bg})`;
            //播放音效
           
            return true
            //播放动画
            // $('.shake_box').addClass('shake_box_focus');
            // clearTimeout(shakeTimeout);
            // let shakeTimeout = setTimeout(function(){
            //     $('.shake_box').removeClass('shake_box_focus');
            // },1000)
        }
 
        lastShakeX = curShakeX;
        lastShakeY = curShakeY;
        lastShakeZ = curShakeZ;
            // shakeAudio.play();
            // alert(shakeAudio)
        return false
    }
}
 
 
//预加摇一摇声音
