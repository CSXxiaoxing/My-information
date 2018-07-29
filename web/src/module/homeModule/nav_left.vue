<template>
    <Col span="5" class-name="m-left">
        <ul>
            <li>
                {{main_L.headline}}
            </li>
            <li v-for='data in main_L.Arial' :key='data'>{{data}}</li>
        </ul>
    </Col>
</template>

<script type="text/javascript">

export default {
    name: 'name',
    data: function(){
        return {
            main_L: {   // 左侧导航条
                headline: '分类目录',   // 头部标题
                Arial: [ 'JavaScript', 'HTML', 'PHP', 'MySql', 'Nodejs', 'MongoDB', 'vue.', 'React', 'Angular4', '前端UI', '学习资料', '快捷键', '个人', '零碎资料' ],  // 二级标题
            },
        }
    },
    mounted: function(){
        
    },
}

</script>
