new Vue({
    el: "#leaderboard",
    delimiters: ["<%", "%>"],
    data() {
        return {
            boards : {},
            mode : 'std',
            mods : 'vn',
            sort : 'pp',
            load : false,
            no_player : false, // soon
        }
    },
    created() { 
        var vm = this;
        vm.mode = mode
        vm.mods = mods
        vm.sort = sort
        vm.LoadLeaderboard(sort, mode, mods)
        if (window.location.hostname != "127.0.0.1") {
            $("#leaderboard").prepend("<div class='noti-banner noti-banner--warning'><div class='noti-banner--col noti-banner--col--icon'></div><div class='noti-banner--col noti-banner--col--label'><div class='noti-bannertype'>Warning</div><div class='noti-bannertext'>You are using "+window.location.hostname+"</div></div><div class='noti-banner--col'>Now <b>It doesn't have cors for API</b>. That's why <b>users in leaderboard doesn't appear</b> because it's have cors error and <b>it's will work with <a href='http://127.0.0.1:5000"+window.location.pathname+"'>127.0.0.1</a> only</b>. I will implemented later</div></div>")
        }
    },
    methods: {
        LoadLeaderboard(sort, mode, mods) {
            var vm = this;
            if (window.event){
                window.event.preventDefault();
            }
            vm.load = true;
            vm.mode = mode;
            vm.mods = mods;
            vm.sort = sort;
            window.history.replaceState('', document.title, "/leaderboard/" + vm.mode + "/" + vm.sort + "/" + vm.mods);
            vm.$axios.get("http://127.0.0.1:5000/api/get_leaderboard", { params: { 
                mode: mode, 
                sort: sort, 
                mods: mods,
            }})
            .then(function(response){
                vm.boards = response.data;
                vm.load = false;
            });
        }, 
        scoreFormat(score){ 
            var addCommas = this.addCommas;
            if (score > 1000 * 1000){
                if(score > 1000 * 1000 * 1000)
                    return addCommas((score / 1000000000).toFixed(2))+" billion";
                return addCommas((score / 1000000).toFixed(2))+" million";
            }
            return addCommas(score);
        },    
        addCommas(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },   
    },
    computed: {
    }
});