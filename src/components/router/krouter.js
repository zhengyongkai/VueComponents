let Vue;
// 实现一个插件  挂载$router
class VueRouter {
    constructor(options){
        this.$options = options;
        Vue.util.defineReactive(this,'current','/')
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this))
    }
    onHashChange(){
        this.current = window.location.hash.slice(1)
    }
}
VueRouter.install = function(_Vue){
    // 保存构造函数 ， 可以在VueRouter 类使用
    Vue = _Vue;
    // 挂载 $router
    // 获取根实例选项
    Vue.mixin({
        beforeCreate() {
            // APP 根实例 HelloWorld 
            // 确保根实例的时候才执行
            if(this.$options.router){
                // 挂载
               Vue.prototype.$router = this.$options.router
            }
        },
    })
    // 实现两个全局组件
    Vue.component('router-link',{
        props:{
            to:{
                type:String,
                require:true
            }
        },
        render(h) {
            // <a href=''>abc</a>
            // h(tag,data,childern)
         return   h('a',{ attrs:{ href:'#'+this.to }},this.$slots.default)
        },
    })
    Vue.component('router-view',{
        render(h) {
            let component = null;
            this.$router.$options.routes.forEach(route => {
                if(route.path === this.$router.current){
                    component = route.component;
                }
            })
            return h(component)
        },
    })
}
export default VueRouter;