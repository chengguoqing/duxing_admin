var fs = require('fs');
var express = require('express');
var router = express.Router();
var comm = require('./comm');
var Mysql = require('node-mysql-promise');
var tengxun_sc = require('../util/tengxun_sc');

var sender = require('./SmsSender');
sender.config.sdkappid = 1400046691;
sender.config.appkey = '69e8f1574cc92cb690bfa63a8d39a05c';


var mysql = Mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kiss1001',
    database: 'ouyan'
});

//验证码集合
let yacode = new Set(),
    shuju_d = []
let ur_l = "https://duxinggj.com"

router.post("/fasongyz", function (req, res, next) { //发送验证码
    var user_xn = {}
    user_xn.phone = req.body.phone
    user_xn.time = new Date().getTime()
    user_xn.code = comm.randomnum()
    //    yacode.add(user_xn)
    shuju_d.push(user_xn)
    let s_sdf = {}
    s_sdf.code = 0
    s_sdf.msg = "验证码发送成功！"
    sender.singleSmsSend(0, '86', user_xn.phone, '验证码为' + user_xn.code + '(独行工匠，90秒内有效)如非本人操作，请忽略本短信');
    s_sdf.data = user_xn
    res.json(s_sdf)

})

router.post("/yanzenma", function (req, res, next) { //绑定
    let sd_df = {},
        re_s = res
    var sd_sdf = ""
    shuju_d.map((a, idx) => {
        if (new Date().getTime() - a.time > 90000) {
            shuju_d.splice(idx, 1);
        } else {
            if (a.phone == req.body.bm_phone) {
                sd_sdf = a.code
            }
        }
    })
    if (sd_sdf == req.body.code) {
        sd_df.code = 0
        sd_df.msg = "活动报名成功！"
        delete req.body.code

        req.body.add_time = new Date().getTime()
        charu('user_act', {
            act_id: req.body.act_id,
            user_id: req.body.user_id
        }, req, res, function (data) {
            if (data.type == 'exist') {
                sd_df.code = "-1"
                sd_df.msg = "您已报名该活动！"
            }
            res.json(sd_df)
        })

    } else {
        sd_df.code = -1
        sd_df.msg = "验证码错误或已过期"
        res.json(sd_df)
    }

})





//小程序 -首页
router.get('/get_index', function (req, res, next) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    let index_fo = {}
    cx('banner', req, res, function (data) {
        index_fo.banner = data.data
        req.body.is_shouye = 1
        tjcx('xiangqing', req, res, function (data) {
            index_fo.tuijian = data.data
            sd_der.data = index_fo
            res.json(sd_der)
        })
    })
})
//登录小程序
router.post('/denglu_xc', function (req, res, next) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    charu('user_info', {
        nickName: req.body.nickName
    }, req, res, function (data) {
        req.body.id = data.id
        xiugai('user_info', req, res, function (data) {
            sd_der.data = {}
            sd_der.data.id = req.body.id

            res.json(sd_der)
        })
    })
})
//获取用户信息
router.post('/get_user', function (req, res, next) {
    cx('user_info', req, res)
})
//获取用户指定信息
router.post('/get_user_id', function (req, res, next) {
    tjcx('user_info', req, res)
})


//删除用户信息
router.post('/del_user', function (req, res, next) {
    del('user_info', req, res)
})

//登录
router.post('/loading', function (req, res, next) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    mysql.table('user_gl').where(req.body).select().then(function (data) {
        sd_der.code = "0"
        sd_der.msg = "登录成功"
        sd_der.data = data
        if (data.length <= 0) {
            sd_der.code = "-1"
            sd_der.msg = "用户名或密码错误"

        }
        res.json(sd_der)
    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "登录失败"
        sd_der.data = err
        res.json(sd_der)
    })

})

/**
 * @api {post} /up_img 上传图片到腾讯云
 * @apiGroup util
 * @apiSuccess {String} code 状态码.
 * @apiSuccess {String} msg  状态信息.
 * @apiSuccess {String} data  图片数据.
 
 */
//上传图片
router.post('/up_img', function (req, res, next) {
    //    let msg
    let sd_der = {
        code: 0,
        msg: ""
    }
    var zt = {}
    zt.code = 0
    comm.up_img(req, res, function (data) {
        var path_s = data.replace(/\\/g, "/");
        zt.msg = "请求成功"
        //        zt.data =url_er+ path_s


        tengxun_sc.test_up(path_s.split("uploads/")[1], function (data_er) {
            zt.data = data_er
            res.json(zt)
        })

    })
})

//添加标签
router.post("/add_bq", function (req, res, next) {
    charu('biaoqian', {
        name: req.body.name
    }, req, res)
})
//获取标签
router.post("/get_bq", function (req, res, next) {
    cx('biaoqian', req, res)
})

//修改标签
router.post("/xg_bq", function (req, res, next) {
    xiugai('biaoqian', req, res)
})
//删除标签
router.post("/del_bq", function (req, res, next) {
    del('biaoqian', req, res)
})



//添加管理员
router.post("/add_gl", function (req, res, next) {
    charu('user_gl', {
        user_name: req.body.user_name
    }, req, res)
})
//获取管理员
router.post("/get_gl", function (req, res, next) {
    cx('user_gl', req, res)
})
//查询
router.post("/ss_gl", function (req, res, next) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    let chs_dd = `%${req.body.user_name}%`

    mysql.table('user_gl').where({
        user_name: ['LIKE', chs_dd]
    }).select().then(function (data) {
        sd_der.code = 0
        sd_der.msg = "查询成功"
        sd_der.data = {}
        sd_der.data.data = data
        res.json(sd_der)

    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "查询失败"
        sd_der.data = err

        res.json(sd_der)
    })

})
//删除管理员
router.post("/del_gl", function (req, res, next) {
    del('user_gl', req, res)
})
//修改管理员权限
router.post("/xg_gl", function (req, res, next) {
    xiugai('user_gl', req, res)
})




//添加banner
router.post("/add_banner", function (req, res, next) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    mysql.table('banner').add(req.body).then(function (data) {
        sd_der.code = 0
        sd_der.msg = "添加成功"
        sd_der.data = data
        res.json(sd_der)
    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "添加失败"
        res.json(sd_der)
    })
})
//获取轮播图
router.post("/get_banner", function (req, res, next) {
    cx('banner', req, res)

})
//修改轮播图
router.post("/xg_banner", function (req, res, next) {
    xiugai('banner', req, res)
})

//删除轮播图 
router.post("/sc_banner", function (req, res, next) {
    del('banner', req, res)
})





//添加详情
router.post("/add_xq", function (req, res, next) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    mysql.table('xiangqing').add(req.body).then(function (data) {
        sd_der.code = 0
        sd_der.msg = "添加成功"
        sd_der.data = data
        res.json(sd_der)
    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "添加失败"
        res.json(sd_der)
    })
})
//获取详情
router.post("/get_xq", function (req, res, next) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    mysql.table('xiangqing').where(req.body).select().then(function (data) {
        sd_der.code = 0
        sd_der.msg = "查询成功"
        sd_der.data = data[0]
        res.json(sd_der)
    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "查询失败"
        res.json(sd_der)
    })
})
//获取详情列表
router.post("/get_xqlist", function (req, res, next) {
    tjcx('xiangqing', req, res)
})
//删除详情列表
router.post("/del_xq", function (req, res, next) {
    del('xiangqing', req, res)
})
//修改详情
router.post("/xgai_xq", function (req, res, next) {
    xiugai('xiangqing', req, res)
})

//修改
function xiugai(text, req, res, call) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    let fg_drt = req.body

    mysql.table(text).where({
        id: req.body.id
    }).update(fg_drt).then(function (affectRows) {
        sd_der.code = 0
        sd_der.msg = "修改成功"
        try {
            call(affectRows)
        } catch (e) {
            res.json(sd_der)
        }

    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "修改失败"
        res.json(sd_der)
    })
}
//删除
function del(text, req, res) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    let sd_weh = {}
    sd_weh.id = req.body.id
    mysql.table(text).where(sd_weh).delete().then(function (affectRows) {
        sd_der.code = 0
        sd_der.msg = "删除成功"
        res.json(sd_der)
    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "删除失败"
        res.json(sd_der)
    })
}

//分页查询
function cx(text, req, res, call) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    let id_d = req.body.page || 1
    mysql.table(text).order('id DESC').page(id_d, 15).countSelect().then(function (data) {
        sd_der.code = 0
        sd_der.msg = "查询成功"
        sd_der.data = data
        try {
            call(data)
        } catch (e) {
            res.json(sd_der)
        }


    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "查询失败"
        res.json(sd_der)
    })
}

//条件分页查询
function tjcx(text, req, res, call) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    let id_d = req.body.page || 1,
        sd_ddf = {}
    if (req.body.type) {
        sd_ddf.type = req.body.type
    }
    if (req.body.is_shouye) {
        sd_ddf.is_shouye = req.body.is_shouye
    }
    if (req.body.id) {
        sd_ddf.id = req.body.id
    }

    mysql.table(text).where(sd_ddf).order('id DESC').page(id_d, 15).countSelect().then(function (data) {
        sd_der.code = 0
        sd_der.msg = "查询成功"
        sd_der.data = data
        try {
            call(data)
        } catch (e) {
            res.json(sd_der)
        }


    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "查询失败"
        res.json(sd_der)
    })
}


//插入
/**
    text =表名
    tiaojian=重复值的条件   json对象  如 
    {
        user_name: req.body.user_name
    }
**/
function charu(text, tiaojian, req, res, call) {
    let sd_der = {
        code: 0,
        msg: ""
    }
    mysql.table(text).thenAdd(req.body, tiaojian, true).then(function (data) {
        sd_der.code = 0
        sd_der.msg = "添加成功"
        sd_der.data = data
        if (data.type == 'exist') {
            try {
                call(data)
            } catch (e) {
                sd_der.code = "-1"
                sd_der.msg = "请不要重复添加"
                res.json(sd_der)
            }

        } else {
            res.json(sd_der)
        }

    }).catch(function (err) {
        sd_der.code = "-1"
        sd_der.msg = "添加失败"
        res.json(sd_der)
    })
}



module.exports = router;
