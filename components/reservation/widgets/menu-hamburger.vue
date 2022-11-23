<template>
  <div id="sidemenu" class="flex items-center">
    <button class="sidemenu__btn" @click="navOpen=!navOpen" :class="{active:navOpen}" >
      <span class="top"></span>
      <span class="mid"></span>
      <span class="bottom"></span>
    </button>
    <transition name="translateX">
      <nav v-show="navOpen" class="rtl max-h-[90vh] h-fit overflow-y-auto max-w-[400px] w-full bg-white fixed z-50 top-5 left-0 rounded-tr-[30px] rounded-br-[30px] drop-shadow-2xl overflow-y-auto">
        <div class="sidemenu__wrapper">
          <div class="p-8 flex items-center justify-between shadow">
            <website-logo/>
            <button @click="navOpen=!navOpen">
              <font-awesome-icon :icon="['fa','chevron-left']" class="text-blue__cl text-xl "/>
            </button>
          </div>
          <ul class="sidemenu__list list-style">
            <li v-for="menu in menuList" :key="menu.title">

<!--              For Normal Links-->
              <div v-if="!!menu.link" class="sidemenu__item p-8 shadow">
                <nuxt-link :to="`/reservation/${businessId()}${menu.link}`" class="text-dark__blue__cl text-xl font-bold">{{ menu.title }}</nuxt-link>
              </div>

<!--              For Links With Children-->
              <div>
                <div v-if="!menu.link && !!menu.children" class="sidemenu__item p-8 shadow flex items-center justify-between">
                  <button class="text-dark__blue__cl text-xl font-bold list-style" @click="menuSubList[menu.title]=!menuSubList[menu.title]">
                    {{ menu.title }}
                  </button>
                  <button @click="menuSubList[menu.title]=!menuSubList[menu.title]">
                    <font-awesome-icon v-show="!menuSubList[menu.title]" :icon="['fa','chevron-left']" class="text-blue__cl text-xl "/>
                    <font-awesome-icon v-show="menuSubList[menu.title]" :icon="['fa','chevron-down']" class="text-blue__cl text-xl "/>
                  </button>
                </div>
                <ul v-if="menuSubList[menu.title]" v-for="child in menu.children" :key="child.title">
                  <li v-if="child.link" class="sidemenu__item p-8 shadow">
                    <nuxt-link :to="`/reservation/${businessId()}${child.link}`" class="text-blue__cl text-xl font-bold">{{ child.title }}</nuxt-link>
                  </li>
                </ul>
              </div>
<!--              For Buttons-->
              <div v-if="!(menu.link || menu.children || menu.externalLink) || false" class="sidemenu__item p-8 shadow">
                <button class="text-dark__blue__cl text-xl font-bold" @click="()=>onMenuButtonClick(menu.title)">{{ menu.title }}</button>
              </div>
<!--              For External Links-->
              <div v-if="!!menu.externalLink" class="sidemenu__item p-8 shadow">
                <a class="text-dark__blue__cl text-xl font-bold" :href="menu.externalLink">Marketing</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </transition>
    <!--    Login Modal-->
    <login-modal :show-login-modal="showLoginModal" @handle-login="showLoginModal = false" />
    <!--    Signup Modal-->
    <signup-modal :show-signup-modal="showSignupModal" @handle-signup="showSignupModal = false"/>
    <!--    Signup Modal-->
    <personal-settings-modal
      :show-settings-modal="showSettingsModal"
      @handle-personal-settings-modal="handlePersonalSettingsModal"
      @confirm-settings="showSettingsModal = false"
    />
  </div>

</template>

<script>
import WebsiteLogo from "~/components/reservation/common/website-logo";
import {site} from "~/components/reservation/widgets/menu-list/site";
import {business} from "~/components/reservation/widgets/menu-list/business";
import {customer} from "~/components/reservation/widgets/menu-list/customer";
import LoginModal from "~/components/reservation/features/auth/login-modal";
import SignupModal from "~/components/reservation/features/auth/signup-modal";
import {ROLES} from "~/utils/constants";
import TokenService from "~/services/token.service";
import {businessIdFromURL} from "~/utils/helpers";
import {ROUTES} from "~/utils/constants/routes";
import PersonalSettingsModal from "@/components/reservation/features/settings/personal-settings-modal";

export default {
  name: "menu-hamburger",
  components: {PersonalSettingsModal, SignupModal, LoginModal, WebsiteLogo,site,business},
  data(){
    return{
      navOpen:false,
      showLoginModal:false,
      showSignupModal:false,
      showSettingsModal:false,
      businessId:()=>businessIdFromURL(this),
      menuList:this.$store.state.loggedInUserRole ?  this.$store.state.loggedInUserRole === ROLES.BUSINESS ? business : customer : site,
      menuSubList:{'Manage Business':false}
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.state.loggedInUserRole
    },
  },
  watch:{
    isUserLoggedIn(){
      this.menuList = this.$store.state.loggedInUserRole ?  this.$store.state.loggedInUserRole === ROLES.BUSINESS ? business : customer : site
    },
    $route() {
      this.navOpen = false
    },
  },
  methods:{
    onMenuButtonClick(menuTitle) {
      this.navOpen = false
      if(menuTitle === 'Login'){
        this.showLoginModal = true
      }else if(menuTitle === 'Logout'){
        TokenService.clearStorage(this.$cookies)
        this.$store.commit('HANDLE_LOGGED_IN_USER_ROLE',null)
        this.$router.push(`/reservation/${businessIdFromURL(this)}${ROUTES.BOOKING}`)
        this.navOpen = false
      }else if(menuTitle === 'Sign Up'){
        this.showSignupModal = true
      }else if(menuTitle === 'Settings'){
        console.log(menuTitle,"menuTitle")
        this.showSettingsModal = true
      }
    },
    handlePersonalSettingsModal(isActive){
      this.showSettingsModal = isActive
    }
  }
}
</script>

<style scoped>

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
