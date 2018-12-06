var url_d = "/ouyan_api/"
import axios from "axios"
export default {
    install(Vue, options) {
        Vue.prototype.get = function (url) {
            this.$axios.get(url_d + url).then((res) => {
                console.log(res.data);
            })
        }

        Vue.prototype.post = function (url, dtat, call) {
            let th = this

            axios({
                method: 'post',
                url: url_d + url,
                data: dtat
            }).then((res) => {
                if (res.data.code < 0) {
                    th.$message.error(res.data.msg);
                    return
                }
                call(res.data)
            });




        }

        Vue.prototype.time = function (t) {
            let time = new Date()
            let Year = time.getFullYear(),
                Month = time.getMonth() + 1,
                Data = time.getDate() < 10 ? 0 + '' + time.getDate() : time.getDate()
            Month < 10 ? Month = 0 + '' + Month : Month = Month
            return Year + "-" + Month + "-" + Data
        }

        Vue.prototype.time_d = function (t) {
            let time = new Date()
            time.setTime(t)
            let Year = time.getFullYear(),
                Month = time.getMonth() + 1,
                Data = time.getDate() < 10 ? 0 + '' + time.getDate() : time.getDate(),
                hour = time.getHours() < 10 ? 0 + '' + time.getHours() : time.getHours(),
                Minutes = time.getMinutes() < 10 ? 0 + '' + time.getMinutes() : time.getMinutes(),
                Seconds = time.getSeconds() < 10 ? 0 + '' + time.getSeconds() : time.getSeconds()
            Month < 10 ? Month = 0 + '' + Month : Month = Month
            return Year + "-" + Month + "-" + Data + " " + hour + ":" + Minutes + ":" + Seconds
        }
        Vue.prototype.hf = function (url) {
            this.$router.push(url)
        }


        Vue.prototype.sx = function (url) { //刷新
            location.reload()
        }




    }
}
