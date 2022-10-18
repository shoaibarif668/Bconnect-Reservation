<!--<template>-->
<!--  <div id="modal-template">-->
<!--    <transition name="modal">-->
<!--      <div class="modal-mask">-->
<!--        <div class="modal-wrapper">-->
<!--          <div class="modal-container">-->

<!--            <div class="modal-header">-->
<!--              <slot name="header">-->
<!--                default header-->
<!--              </slot>-->
<!--            </div>-->

<!--            <div class="modal-body">-->
<!--              <slot name="body">-->
<!--                default body-->
<!--              </slot>-->
<!--            </div>-->

<!--            <div class="modal-footer">-->
<!--              <slot name="footer">-->
<!--                default footer-->
<!--                <button class="modal-default-button" @click="$emit('close')">-->
<!--                  OK-->
<!--                </button>-->
<!--              </slot>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </transition>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "base-modal",-->
<!--  props:{-->
<!--    showModal:{-->
<!--      type:Boolean,-->
<!--      default:false-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.modal-mask {-->
<!--  position: fixed;-->
<!--  z-index: 9998;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-color: rgba(0, 0, 0, 0.5);-->
<!--  display: table;-->
<!--  transition: opacity 0.3s ease;-->
<!--}-->

<!--.modal-wrapper {-->
<!--  display: table-cell;-->
<!--  vertical-align: middle;-->
<!--}-->

<!--.modal-container {-->
<!--  width: 300px;-->
<!--  margin: 0px auto;-->
<!--  padding: 20px 30px;-->
<!--  background-color: #fff;-->
<!--  border-radius: 2px;-->
<!--  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);-->
<!--  transition: all 0.3s ease;-->
<!--  font-family: Helvetica, Arial, sans-serif;-->
<!--}-->

<!--.modal-header h3 {-->
<!--  margin-top: 0;-->
<!--  color: #42b983;-->
<!--}-->

<!--.modal-body {-->
<!--  margin: 20px 0;-->
<!--}-->

<!--.modal-default-button {-->
<!--  float: right;-->
<!--}-->

<!--/*-->
<!-- * The following styles are auto-applied to elements with-->
<!-- * transition="modal" when their visibility is toggled-->
<!-- * by Vue.js.-->
<!-- *-->
<!-- * You can easily play with the modal transition by editing-->
<!-- * these styles.-->
<!-- */-->

<!--.modal-enter {-->
<!--  opacity: 0;-->
<!--}-->

<!--.modal-leave-active {-->
<!--  opacity: 0;-->
<!--}-->

<!--.modal-enter .modal-container,-->
<!--.modal-leave-active .modal-container {-->
<!--  -webkit-transform: scale(1.1);-->
<!--  transform: scale(1.1);-->
<!--}-->

<!--</style>-->

<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal"  :class="`${!!baseModalCustomClass ? 'modal__custom__class' : ''}`">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner bg-gray-50" :class="baseModalCustomClass">
          <i @click="$emit('close')" class="far fa-times-circle"></i>
          <button @click="$emit('close')" class="absolute top-5 right-6 border-0 bg-white shadow rounded-full h-[55px] w-[55px] p-2.5" type="button">
            <font-awesome-icon class="text-2xl text-dark__blue__cl" :icon="['fa','xmark']" />
          </button>
          <!-- Modal Content -->
          <slot name="body"/>
        </div>
      </transition>

    </div>
  </transition>
</template>

<script>
  export default {
    name:'base-modal',
    props:{
      modalActive:{
        type:Boolean,
        default:false
      },
      baseModalCustomClass:{
        type:String
      }
    }
  }

</script>

<style scoped>
.modal__custom__class{
  padding-top: 60px !important;
  padding-bottom: 60px !important;
}
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}
.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-animation-inner-leave-to {
  transform: scale(0.8);
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1000;

}
.modal .modal-inner {
  position: relative;
  max-width: 60vw;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 30px 100px;
}

.modal i {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;

}
</style>
