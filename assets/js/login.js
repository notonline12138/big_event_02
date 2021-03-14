$(function () {

    //点击跳转注册
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击跳转登录
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义验证规则

    // layui中需要通过layui对象引入form对象
    let form = layui.form;

    console.log(form);
    form.verify({
        //密码验证
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //确认密码
        repwd: function (value, item) {
            var pwd = $('.reg-box input[name="password"]').val();
            // console.log(value, item);

            if (value !== pwd) {
                return '两次密码输入不一致!';
            }
        }
    })



    //注册功能
    let layer = layui.layer;
    // console.log(layer);

    // 注册
    $('#form-reg').on('submit', function (e) {
        // 阻止默认事件 否则会直接提交
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $('.reg-box input[name="username"]').val(),
                password: $('.reg-box input[name="password"]').val(),
            },
            dataType: 'json',
            success: (res) => {
                console.log(res)
                if (res.status != 0) {
                    //弹出提示
                    return layer.msg(res.message, { icon: 5 });
                } else {
                    layer.msg(res.message, { icon: 6 });
                    //触发点击事件回到登录界面
                    $('#link-login').click();
                    //清空表单
                    $('#form-reg')[0].reset();
                }
            }
        })
    })

    //登录
    $('#form-login').on('submit', function (e) {
        // 阻止默认事件 否则会直接提交
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: {
                username: $('.login-box input[name="username"]').val(),
                password: $('.login-box input[name="password"]').val(),
            },
            dataType: 'json',
            success: (res) => {
                console.log(res)
                if (res.status != 0) {
                    //弹出提示
                    return layer.msg(res.message, { icon: 5 });
                } else {
                    layer.msg(res.message, { icon: 6 });
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';

                }
            }
        })
    })








})