$(function () {

    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验新密码和原密码是否一致
        newPwd: function (value, item) {
            let oldPwd = $("[name=oldPwd]").val();

            console.log(oldPwd, value);

            if (value === oldPwd) {
                return "新密码跟原密码不能一样";
            }
        },

        samePwd: function (value) {
            let newPwd = $("[name=newPwd]").val();

            if (value !== newPwd) {
                return "两次输入的新密码不一致";
            }
        }
    })

    let $form = $("#pwdForm");

    $form.on("submit", function (e) {
        e.preventDefault();

        let data = $(this).serialize();

        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("原密码错误!");
                }

                layer.msg("重置密码成功!")

                $form.get(0).reset();
            }
        })
    })
})