/*
    author：junyang9
    time：2018/5/20
*/
require.config(requireConfig); // require配置对象写在了require.js库文件的最后，在这里也需要用config配置方法引用一下
require(['jquery', 'layui', 'ko', "text!../../components/header/header.html"], function($, layui, ko, header) {
    var layer = layui.layer;
    var vm = {
        projectName: 'knockout项目'
    };
    layer.msg('hello');
    ko.applyBindings(vm);
    // $('#target').html(require("text!目标按钮对应的页面.html"));
    $('#header').html(header);
})