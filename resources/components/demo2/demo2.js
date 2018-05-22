/*
    author：junyang9
    time：2018/5/20
*/
require.config(requireConfig); // require配置对象写在了require.js库文件的最后，在这里也需要用config配置方法引用一下
require(['jquery', 'layui', 'ko'], function($, layui, ko) {
    var layer = layui.layer;
    function User() {
        this.user = {
            name: 'Lucy',
            age: 25,
            do: 'Lucy do something' // 注意：do是关键字不能单独放到外面定义和引用，否则报错
        }
        this.dothis = 'Lucy do something'
    }
    ko.applyBindings(new User(), document.getElementById('main'));
})