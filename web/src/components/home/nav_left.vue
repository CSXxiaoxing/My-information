<template>
    <Col span="5" class-name="m-left">
        <ul @click='postText'>
            <li>
                {{main_L.headline}}
            </li>
            <li v-for='(data, idx) in main_L.Arial' :key='data'
            :class='main_L.active == idx+1 ? "active":""'>{{data}}</li>
        </ul>
    </Col>
</template>

<script type="text/javascript">

export default {
    name: 'nav_left',
    data: function(){
        return {
            main_L: {   // 左侧导航条
                headline: '分类目录',   // 头部标题
                Arial: [ 'JavaScript', 'HTML', 'ES6 / ES7 / ES8', 'vue', 'React', 'Angular', 'Nodejs', 'PHP', 'MySql', 'MongoDB', 'Svn / Git', 'UI框架', '其余未归类'],  // 二级标题
                active: 0,
            },
        }
    },
    mounted: function(){
        $Csx.http.post('/text_url',{
            kid: 1
        }).then( res => {
            this.$emit('urlData', res)
        })
    },
    methods: {
        postText: function(e){
            let idx = this.main_L.Arial.indexOf(e.target.innerText)+1;
            this.main_L.active = idx;
            if (idx > 0){
                $Csx.http.post('/text_url',{
                    kid: idx
                }).then( res => {
                    this.$emit('urlData', res)
                })
            }
        }
    }
}

</script>
