<template>
    <mt-popup id='chartMessage'  position="bottom" :modal='false'
      v-model="chartMessage">

    	<header>
            <ul>
                <li>
                    <i @click='chartMessage=false'></i>
                </li>
                <li class='btMsg'>消息</li>
            </ul>
        </header>
        
        <div class='list'>
            <h3>{{msgObj.title}}</h3>
            <p>{{msgObj.time}}</p>
            <span>
                {{msgObj.content}}
            </span>
        </div>
        <loading v-if='loading'></loading>
    </mt-popup>
</template>

<style lang='scss' scoped>
    @import '../../utils/baseVar.scss';
    #chartMessage {
        height: 100%;
        width: 100%;
        background: $friend001 no-repeat;
        background-size: 100% 100%;
        // background: #ECEDF1;
        
        header {
            font-size: 0.43rem;
            line-height: 0.87037rem;
            height: 0.87037rem;
            padding: 0;
            border-bottom: 1px solid #CCBDA8;
            background: rgba(0,0,0,0);
            @include box-sizing();
            position: relative;
            width: 100%;
            top: 0;
            left: 0;
            ul {
               @include flexbox();
                height: 100%;
                color: #111;
                text-align: center;
                padding: 0 0.37037rem;
                li:first-child {
                    position:relative;
                    &>i {
                        display: inline-block;
                        width: 0.537037rem;
                        height: 0.416667rem;
                        background: $friend002 no-repeat;
                        background-size: 0.537037rem 0.416667rem;
                        position: absolute;
                        top: 50%;
                        @include translate(0,-50%);
                        a {
                            padding: 0.259259rem 0.37037rem;
                        }
                    }
                }
                li:last-child.btMsg{
                    position: absolute;
                    left: 50%;
                    @include translate(-50%,0);
                }
            }
        }
        
        .list{
            height:9.407408rem;
            overflow-y: auto;
            overflow-x: hidden;
            font-size:0.388889rem;
            h3{
                font-size:0.388889rem;
                margin-top: 0.462963rem;
                font-weight: normal;
            }
            p{
                color:#7E8080;
                font-size:0.314815rem;
                padding-bottom: 0.740741rem;
                padding-top: 0.185185rem;
            }
            span{
                display:inline-block;
                width:8.5rem;
                text-align: left;
                font-size:0.407407rem;
            }
        }
        .list::-webkit-scrollbar {
            display: none;
        } 
    }
</style>

<script type="text/javascript">
    // import Vue from 'vue';
    export default {
        data: function(){
            return {
                loading: false,     // loading
                careTip : false,
                chartMessage : false,
                msgObj: {
                    time: '',
                    title: '',
                    content: '',        
                }
            }
        },
        methods: {},
    }
</script>