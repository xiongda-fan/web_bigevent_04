//入口函数
$(function() {
    //1. 点击去注册账号 隐藏登陆区域 显示注册区域
    $("#link_reg").on('click', function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    //2. 点击去去登录 隐藏注册区域 显示登录区域
    $("#link_login").on('click', function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    //3. 自定义密码校验规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //确认密码验证规则
        repwd: function(value) {
            var pwd = $(".reg-box input[name=password]").val();
            //比较
            if (pwd !== value) {
                return "两次密码输入不一致！"
            }
        }
    });

    //4. 注册功能
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
        //阻止表单默认提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function(res) {
                //判断返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("注册成功，请登录！");
                //手动切换到登陆表单
                $("#link_login").click();
                //重置form表单
                $("#form_reg").reset();
            }
        })
    })


    //5. 登录功能（给form标签绑定事件，button按钮触发提交事件）
    $("#form_login").on("submit", function(e) {
        //阻止表单的默认提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                //判断返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提示信息 保存token 跳转页面
                layer.msg("恭喜您，登陆成功！");
                //保存token 未来的接口要使用token
                localStorage.setItem("token", res.tokrn);
                //跳转
                location.href = "/index.html";
            }
        })
    })
})