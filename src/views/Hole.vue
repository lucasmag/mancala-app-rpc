<template>
    <div v-bind:class="baseType" ></div>
</template>

<script>
export default {
    name: "Hole",
    props: {
        isBase: Boolean
    },
    computed: {
        baseType: function () {
            if (this.isBase)
                return "baseHole"
            return "normalHole"
        }
}
}
</script>

<style scoped>
.normalHole {
    width: 8vw;
    height: 8vw;
    background-color: burlywood;
    margin: 10px;
    border-radius: 30px;
}

.baseHole {
    width: 8vw;
    height: 16vw;
    background-color: burlywood;
    margin: 10px;
    border-radius: 30px;
}
</style>
