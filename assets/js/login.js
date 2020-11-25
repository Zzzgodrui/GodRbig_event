$(function () {
    $("#gotoRegi").click(function () {
        $(".regiBox").show();

        $(".loginBox").hide();
    });

    $("#gotoLogin").click(function () {
        $(".loginBox").show();

        $(".regiBox").hide();
    })

    let form = layui.form;
    let layer = layui.layer;

    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repass: function (value) {
            //密码框的内容
            let pwd = $(".regiBox input[name=password]").val();
            if (value !== pwd) {
                //return 后面的内容就是提示文字
                return "两次输入的密码不一致!";
            }
        }
    });

    //注册ajax代码
    $("#regiForm").on("submit", function (e) {
        e.preventDefault();

        let data = $(this).serialize();
        //直接发送ajax请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("注册失败" + res.message);
                }

                layer.msg("注册成功");
                $("#gotoLogin").click();
            }
        })
    });

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        let data = $(this).serialize();
        //直接发送ajax请求
        $.ajax({
            type: "POST",
            url: "/api/login",
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("登陆失败!!密码错误")
                }



                localStorage.setItem("token", res.token);
                layer.msg("登录成功，即将去后台主页", {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    location.href = "index.html"
                });
            }
        })
    })
});

