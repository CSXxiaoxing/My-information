<template>
    <Col span="19" >
        <div class="m-right">
            <h3>JavaScript{{this.$store.state.modal['addUrl']}}</h3>
            <div class="weblist">
                <!-- <div class="collect clearfix collectsite">
                    <div class="head collect-head" data-subclass="collect">学习资料<i class="glyphicon glyphicon-cog" data-name="collect" data-toggle="modal"></i></div>
                </div> -->
                <div class="collect clearfix studysite">
                    <div class="head study-head">入门基础
                        <Icon type="md-add-circle" @click="a"/>
                    </div>
                    <ul class="clearfix">
                        <li v-for='item in dataUrl' :key='item.id+"zl2"'>
                            <a :href="item.url" target='_blank'>{{item.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </Col>
</template>

<script>
export default {
    name: 'main_right',
    data: function() {	
        return {}
    },
    props: ['dataUrl'],
    methods: {
        a(){
            this.$parent.$parent.$refs.addUrl.modal=true;
            this.$parent.$parent.$refs.addUrl.kid=this.dataUrl[0].kid;
        }
    }
}
</script>

<style scoped>

</style>