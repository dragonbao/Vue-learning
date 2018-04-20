window.onload=function(){
    "use strict";
   
    // Vue.component(
    //     "my-component",{
    //         template:`
    //         <section class="container">
    //     <div class="searchbox">
    //         <input type="text" class="keywords" value="">
    //         <input type="button" value="search">
    //     </div>
    //     <ul class="list">
    //         <li>html css</li>
    //         <li>html5+css3</li>
    //         <li>javascript</li>
    //         <li>vue.js</li>
    //         <li>react</li>
    //         <li>jquery</li>
    //     </ul>
    // </section>`
    //     }); 
      //vue组件全局注册时，放在顶部或new Vue对象之前才生效，否则报错.
      Vue.component(
        "ul-list",  
        {
            props:["childlist"],
            template:` <ul class="list">
           <li v-for="item of childlist" @click="setvalue(item)">{{item}}</li>  
        </ul>`,
        methods:{
            setvalue(item){
                //子组件中点击事件发生，要传值给父组件.
                //父组件告知子组件状态变化，传值就可以了，通过props["属性名称"],
                //子组件给父组件传值告知变化，则需要用到自定义事件.$emit.
                //子组件被点击时，告知父组件value值变化@click="selectValueHandle(item)".
                this.$emit("receive",item);
            }
        }
        }

    );
       
        var app = new Vue({
            el:".wrap",
            data:{
                newcomponent:"new component",
                item1:[
                    "java",
                    "javascript",
                    "jquery",
                    "php",
                    "more"
                ],
                item2:[
                    "wait",
                    "i",
                    "know",
                    "you"
                ]
            },
            components:{
                "myComponent":{//自定义组件的名称可以采用烤串发或者驼峰法数书写，都是有效的。
                    //接收父组件传值时，只能采用驼峰法接收.
                    props:["btnValue","list"],
                    data:function(){
                        return {
                            selected:false,
                                val:""
                        }
                    },
                        template:`
                        <section class="container">
                    <div class="searchbox">
                        <input type="text" class="keywords" :value="val"  @click="selected=!selected">
                        <input type="button" :value="btnValue">
                    </div>
                    <ul-list v-show="selected" :childlist="list" @receive="changeValue" ></ul-list>
                </section>`,
                methods:{
                    changeValue(item){
                        // alert("i'm touched,value="+item)@receive="changeValue":value="val";
                        this.val = item;

                    }
                }
                },
                
                }       
        });  
    }
        //js文件放在Vue对象创建之后，否则找不到要获取的元素。
        // var select = document.getElementsByClassName("list")[0];
        // var search = document.getElementsByClassName("keywords")[0];
        // select.onclick=function(e){
        //     var event = window.event||e;
        //     var target = event.target||srcElement;
            // if(target.)
            // console.log(target.tagName);
            // search.value = target.innerHTML;
            // target.tagName.toUpperCase() ==="LI" ?search.value = target.innerHTML:"";
            // search.value = target.innerHTML;
        // }
   
// }