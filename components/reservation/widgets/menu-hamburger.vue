<template>
  <div id="sidemenu" class="flex items-center">
    <button class="sidemenu__btn" @click="navOpen=!navOpen" :class="{active:navOpen}" >
      <span class="top"></span>
      <span class="mid"></span>
      <span class="bottom"></span>
    </button>
    <transition name="translateX">
      <nav v-show="navOpen" class="max-w-[400px] w-full bg-white fixed z-50 top-5 left-0 rounded-tr-[30px] rounded-br-[30px] drop-shadow-2xl overflow-y-auto">
        <div class="sidemenu__wrapper">
          <div class="p-8 flex items-center justify-between shadow">
            <website-logo/>
            <button @click="navOpen=!navOpen">
              <font-awesome-icon :icon="['fa','chevron-left']" class="text-blue__cl text-xl "/>
            </button>
          </div>
          <ul class="sidemenu__list list-style">
            <li class="sidemenu__item p-8 shadow">
              <nuxt-link to="/reservation/adsd/booking" class="text-dark__blue__cl text-xl font-bold">Top</nuxt-link>
            </li>
            <li class="sidemenu__item p-8 shadow"><a href="" class="text-dark__blue__cl text-xl font-bold">About</a></li>
            <li class="sidemenu__item p-8 shadow flex items-center justify-between">
              <button class="text-dark__blue__cl text-xl font-bold list-style" @click="isBlogOpen=!isBlogOpen">
                Blogs
              </button>
              <button @click="isBlogOpen=!isBlogOpen">
                <font-awesome-icon v-show="!isBlogOpen" :icon="['fa','chevron-left']" class="text-blue__cl text-xl "/>
                <font-awesome-icon v-show="isBlogOpen" :icon="['fa','chevron-down']" class="text-blue__cl text-xl "/>
              </button>
            </li>
            <ul v-show="isBlogOpen">
              <li class="sidemenu__item p-8 shadow"><a href="" class="text-dark__blue__cl text-xl font-bold">Blog 1</a></li>
              <li class="sidemenu__item p-8 shadow"><a href="" class="text-dark__blue__cl text-xl font-bold">Blog 2</a></li>
            </ul>
            <li class="sidemenu__item p-8 shadow"><a href="" class="text-dark__blue__cl text-xl font-bold">Work</a></li>
            <li class="sidemenu__item p-8 shadow"><a href="" class="text-dark__blue__cl text-xl font-bold">Link</a></li>
          </ul>
        </div>
      </nav>
    </transition>
  </div>
</template>

<script>
import WebsiteLogo from "~/components/reservation/common/website-logo";
export default {
  name: "menu-hamburger",
  components: {WebsiteLogo},
  data(){
    return{
      navOpen:false,
      isBlogOpen:false
    }
  }
}
</script>

<style scoped>

.list-style{
  list-style: inside;
}
.sidemenu__btn {
  /*display: block;*/
  width: 25px;
  height: 25px;
  border: none;
  position: relative;
  z-index: 40;
  appearance: none;
  cursor: pointer;
  outline: none;
}
span {
  display: block;
  width: 20px;
  height: 3px;
  margin: auto;
  background: #00ADEE;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all .4s ease;
}
span.top {
  transform: translateY(-8px);
}

span.bottom {
  transform: translateY(8px);
}

.active{
  visibility: hidden;
  pointer-events: none;
}

.sidemenu__wrapper {
  padding-top: 50px;
}

.sidemenu__list {
  padding: 0;
  margin: 0;
}

.sidemenu__item.a {
  text-decoration: none;
  line-height: 1.6em;
  font-size: 1.6em;
  padding: .5em;
  display: block;
  color: white;
  transition: .4s ease;
}
.sidemenu__item.a:hover {
  background: lightgrey;
  color: dimgrey;
}

.translateX-enter{
  transform:translateX(-200px);
  opacity: 0;
}

.translateX-enter-active,.translateX-leave-active{
  transform-origin: top left 0;
  transition:.2s ease;
}

.translateX-leave-to{
  transform: translateX(-200px);
  opacity: 0;
}
</style>
