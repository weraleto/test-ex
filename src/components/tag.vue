<template>
  <a href="#" class="tag" :class="{'active':isActive}" @click.prevent="activateBtn">
      <span class="tag__name">
          {{name}}
      </span>
      <div class="tag__reset">
          <img :src="require('../assets/icons/times-solid.svg')" alt="Деактивировать тег" >
      </div>
  </a>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
            default: 'Тэг'
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            // isActive: true
        }
    },
    methods: {
        activateBtn(){
            const payload = !this.isActive
            this.$emit('activate', payload)
        }
    }
}
</script>

