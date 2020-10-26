<template>
<div>
    <div v-if="showOnTop" class="beansQtt"> {{ this.beansQuantity }} </div>
    <div v-bind:class="baseType" ></div>
    <div v-if="!showOnTop" class="beansQtt"> {{ this.beansQuantity }}</div>
</div>
</template>

<script>
export default {
    name: "Hole",
    props: {
        isBase: Boolean,
        index: Number,
        beansQuantity: Number
    },
    data() {
        return {
        };
    },
    computed: {
        baseType: function () {
            if (this.isBase)
                return "baseHole"
            return "normalHole"
        },
        showOnTop: function () {
            return (6 < this.index && this.index < 13)
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

.beansQtt {
    width: 100%;
    padding: 2px;
}
</style>
