<template>
   <md-dialog :md-active.sync="restartDialog" class="dialog">
            <md-dialog-title style="text-align: center">Reiniciar</md-dialog-title>

            <slot></slot>

            <md-dialog-actions>
                <md-button class="md-primary" @click="restartDialog = false"
                    >Cancelar</md-button
                >
                <md-button class="md-primary" @click="restartGame()"
                    >Reiniciar</md-button
                >
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
export default {
    name: "Dialog"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
