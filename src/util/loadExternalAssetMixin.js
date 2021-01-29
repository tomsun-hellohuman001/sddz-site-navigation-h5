const loadExternalAssetMixin = {
  methods:{
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
    }
  }
}
export default loadExternalAssetMixin
