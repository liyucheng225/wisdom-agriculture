<template>
    <el-switch
            v-model="value1"
            active-text="关"
            inactive-text="开">
    </el-switch>
</template>

<script>
    export default {
        name:"buttonSwitch",
        data() {
            return {
                value1: true,
            }
        }
    };
</script>