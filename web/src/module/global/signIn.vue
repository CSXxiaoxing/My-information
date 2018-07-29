
<style lang="scss" scoped>
    button {
        position: absolute;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%,-80%);
    }
</style>


<template>
    <div>
        <Button @click="modal001 = true">登陆</Button>

        <modal v-model="modal001" 
        :draggable="true"
        title="登录" 
        class-name="vertical-center-modal">
            <div>暂无必要登录,确认直接进入</div>
        </modal>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                modal001: false,
            }
        },
        mounted: function(){
            console.log(this)//dragData
        },
        methods: {
        }
    }
</script>
