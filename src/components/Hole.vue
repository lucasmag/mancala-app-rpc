<template>
<div>
    <div v-bind:class="baseType" class="hole" >
            <div class="beansQtt"> {{ this.beansQuantity }} </div>
    </div>
    <!-- <div v-if="!showOnTop" class="beansQtt"> {{ this.beansQuantity }}</div> -->
</div>
</template>

<script>
export default {
    name: "Hole",
    props: {
        isBase: Boolean,
        index: Number,
        beansQuantity: Number,
        isHost: Boolean,
    },

    computed: {
        baseType: function () {
            if (this.isBase)
                return "baseHole"
            return "normalHole"
        },
        showOnTop: function () {
            if (this.isHost)
                return (6 < this.index && this.index < 13)
            else 
                return (6 > this.index)
        }
    }
}
</script>

<style scoped>
.normalHole {
    width: 8vw;
    height: 8vw;
    background-color: rgb(187, 187, 187);
    margin: 10px;
    border-radius: 30px;
}
.normalHole:hover {
  background-color: rgb(99, 206, 108);
}

.baseHole {
    width: 8vw;
    height: 18vw;
    background-color: rgb(135, 222, 150);
    margin: 10px;
    border-radius: 30px;
}

.beansQtt {
    width: 100%;
    padding: 2px;
    font-weight: bolder;
    font-size: 25px;
    color: rgb(109, 109, 109);
}

.hole {
    display: flex;
    align-items: center;
}
</style>
