
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
        <Modal v-model="modal001" 
        :draggable="true"
        title="登录"  @on-ok='login'
        class-name="vertical-center-modal">
            <div>暂无必要登录,确认直接进入</div>
        </Modal>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                modal001: false,
            }
        },
        beforeMount () {},
        mounted: function(){},
        methods: {
            login () { this.$router.push({name: 'home'}); }
            
        }
    }
</script>
