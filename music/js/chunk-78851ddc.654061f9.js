(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78851ddc"],{"2cba":function(t,e,r){"use strict";r("b76a")},"45b7":function(t,e,r){"use strict";r("687e")},"687e":function(t,e,r){},9639:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"my-container"},[r("van-cell",{staticClass:"header"},[r("div",{attrs:{slot:"icon"},slot:"icon"},[r("van-image",{attrs:{round:"",fit:"cover",width:"70",height:"70",src:t.userAvatar}})],1),r("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(t.userName)+" ")])]),r("div",{staticClass:"my-icon"},[r("div",{staticClass:"icon-item"},[r("van-icon",{attrs:{name:"music"}}),r("span",[t._v("本地下载")])],1),r("div",{staticClass:"icon-item"},[r("van-icon",{attrs:{name:"play-circle"}}),r("span",[t._v("最近播放")])],1),r("div",{staticClass:"icon-item"},[r("van-icon",{attrs:{name:"shopping-cart"}}),r("span",[t._v("绿胶会员")])],1),r("div",{staticClass:"icon-item"},[r("van-icon",{attrs:{name:"friends"}}),r("span",[t._v("我的好友")])],1),r("div",{staticClass:"icon-item"},[r("van-icon",{attrs:{name:"good-job"}}),r("span",[t._v("收藏和赞")])],1),r("div",{staticClass:"icon-item"},[r("van-icon",{attrs:{name:"point-gift"}}),r("span",[t._v("获得礼物")])],1)]),r("van-cell",{staticClass:"love-list",attrs:{icon:t.loveList.coverImgUrl,title:t.loveList.name,value:t.loveList.trackCount+"首"},on:{click:function(e){return t.openLovelist()}}}),r("div",{staticClass:"list-group"},[r("van-cell-group",t._l(t.otherlist,(function(e,n){return r("van-cell",{key:n,staticClass:"other-list",attrs:{icon:e.coverImgUrl,title:e.name,value:e.trackCount+"首"},on:{click:function(r){return t.openPlaylist(e)}}})})),1)],1),r("van-popup",{staticClass:"close-sheet",style:{width:"100%",height:" 100%"},attrs:{closeable:"","close-icon-position":"top-left","get-container":"body",position:"right"},on:{"click-close-icon":function(e){return t.closeSheet()}},model:{value:t.palylistshow,callback:function(e){t.palylistshow=e},expression:"palylistshow"}},[r("playList",{attrs:{playList:t.listItem}})],1)],1)},i=[],o=r("fd6a"),a=(r("28fd"),r("a9b6"),r("b775")),s=function(t){return Object(a["a"])({method:"GET",url:"/user/detail",params:t})},c=function(t){return Object(a["a"])({method:"GET",url:"/user/playlist",params:t})},l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"sheet-container"},[r("div",{staticClass:"sheet-header"},[r("div",{staticClass:"sheet"},[t._v("歌单")]),r("van-cell",[r("div",{staticClass:"sheetImg",attrs:{slot:"icon"},slot:"icon"},[r("van-image",{attrs:{width:"85",height:"85",src:t.playList.coverImgUrl}})],1),r("div",{staticClass:"sheetName",attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.playList.name))]),r("div",{staticClass:"creatName",attrs:{slot:"title"},slot:"title"},[r("van-image",{staticStyle:{"margin-right":"13px","margin-left":"13px"},attrs:{round:"",width:"25",height:"25",src:t.sheetCreator.avatarUrl}}),t._v(" "+t._s(t.sheetCreator.nickname))],1)])],1),r("van-cell-group",t._l(t.listItem,(function(e,n){return r("van-cell",{key:n,attrs:{label:e.ar[0].name+"-"+e.al.name,title:n+1+" _"+e.name},on:{click:function(e){return t.openListMusic(n)}}},[r("van-icon",{attrs:{name:"music-o"}})],1)})),1)],1)},u=[],h=r("ed3b"),f=(r("e186"),r("c284"),function(t){return Object(a["a"])({method:"GET",url:"/playlist/detail",params:t})}),p={props:{playList:{type:Object,require:!0}},components:{},data:function(){return{listItem:[],musicshow:!1,musicBoxShow:!1,musicItem:{},sheetInfo:{},sheetCreator:{}}},computed:{},created:function(){},mounted:function(){this.sheetCreator=this.playList.creator,this.showList()},methods:{showList:function(){var t=this;return Object(h["a"])(regeneratorRuntime.mark((function e(){var r,n,i,o,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.commit("statusModule/showLoading"),r=t.playList.id,n={id:r,cookie:sessionStorage.getItem("cookie")},e.next=5,f(n);case 5:i=e.sent,o=i.data,t.listItem=o.playlist.tracks,a=[],t.listItem.forEach((function(t){a.push(t)})),t.$store.commit("musicModule/setSongs",a),t.$store.commit("statusModule/hideLoading");case 12:case"end":return e.stop()}}),e)})))()},openListMusic:function(t){this.$store.commit("musicModule/setSongindex",t),this.$store.commit("statusModule/handlemusic")}},watch:{playList:{handler:function(t,e){this.playList=t,this.sheetCreator=t.creator,this.showList()},deep:!0,immediate:!1}}},v=p,d=(r("2cba"),r("45b7"),r("cba8")),m=Object(d["a"])(v,l,u,!1,null,"ccd48334",null),y=m.exports,g=r("7736"),w={components:{playList:y},data:function(){return{loveList:{},otherlist:[],palylistshow:!1,listItem:""}},computed:Object(o["a"])({},Object(g["b"])({userName:"userModule/GET_NAME",userAvatar:"userModule/GET_AVATAR"})),created:function(){},mounted:function(){this.initData()},methods:{initData:function(){var t=this,e=[],r={uid:sessionStorage.getItem("id")};s(r).then((function(e){var r=e.data.profile;t.$store.commit("userModule/SET_NAME",r.nickname),t.$store.commit("userModule/SET_AVATAR",r.avatarUrl)})),c(r).then((function(r){e=r.data.playlist,t.loveList=e[0],t.otherlist=e.filter((function(t,e){return e>0}))}))},openPlaylist:function(t){this.$store.commit("statusModule/hideLayout"),this.listItem=t,this.palylistshow=!0},openLovelist:function(){this.$store.commit("statusModule/hideLayout"),this.palylistshow=!0,this.$store.state.islayoutShow=!1,this.listItem=this.loveList},closeSheet:function(){this.$store.state.islayoutShow=!0,this.$store.commit("statusModule/showLayout")}}},b=w,L=(r("dc87"),Object(d["a"])(b,n,i,!1,null,"6b29e936",null));e["default"]=L.exports},b76a:function(t,e,r){},bf99:function(t,e,r){},dc87:function(t,e,r){"use strict";r("bf99")},e186:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(T){c=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var i=e&&e.prototype instanceof m?e:m,o=Object.create(i.prototype),a=new I(n||[]);return o._invoke=k(t,r,a),o}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(T){return{type:"throw",arg:T}}}t.wrap=l;var h="suspendedStart",f="suspendedYield",p="executing",v="completed",d={};function m(){}function y(){}function g(){}var w={};c(w,o,(function(){return this}));var b=Object.getPrototypeOf,L=b&&b(b(S([])));L&&L!==r&&n.call(L,o)&&(w=L);var _=g.prototype=m.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(i,o,a,s){var c=u(t[i],t,o);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(h).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,s)}))}s(c.arg)}var i;function o(t,n){function o(){return new e((function(e,i){r(t,n,e,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function k(t,e,r){var n=h;return function(i,o){if(n===p)throw new Error("Generator is already running");if(n===v){if("throw"===i)throw o;return M()}r.method=i,r.arg=o;while(1){var a=r.delegate;if(a){var s=C(a,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=u(t,e,r);if("normal"===c.type){if(n=r.done?v:f,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=v,r.method="throw",r.arg=c.arg)}}}function C(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,C(t,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var i=u(n,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,d;var o=i.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,d):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function S(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function r(){while(++i<t.length)if(n.call(t,i))return r.value=t[i],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:M}}function M(){return{value:e,done:!0}}return y.prototype=g,c(_,"constructor",g),c(g,"constructor",y),y.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},x(E.prototype),c(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,r,n,i,o){void 0===o&&(o=Promise);var a=new E(l(e,r,n,i),o);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(_),c(_,s,"Generator"),c(_,o,(function(){return this})),c(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=S,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function i(n,i){return s.type="throw",s.arg=t,r.next=n,i&&(r.method="next",r.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var i=n.arg;O(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:S(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=n}catch(i){"object"===typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}},ed3b:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("a9b6");function n(t,e,r,n,i,o,a){try{var s=t[o](a),c=s.value}catch(l){return void r(l)}s.done?e(c):Promise.resolve(c).then(n,i)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(i,o){var a=t.apply(e,r);function s(t){n(a,i,o,s,c,"next",t)}function c(t){n(a,i,o,s,c,"throw",t)}s(void 0)}))}}}}]);
//# sourceMappingURL=chunk-78851ddc.654061f9.js.map