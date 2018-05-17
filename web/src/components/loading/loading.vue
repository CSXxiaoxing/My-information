<template>
    <div id='loading' >
        <mt-spinner 
        color="#46a2fc"
        :size="200"
        :type="2">
        </mt-spinner>
        <p @click='$parent.loading = false'>取消等待</p>
    </div>
</template>

<script>
    import './loading.scss'
    export default {
    }
</script>