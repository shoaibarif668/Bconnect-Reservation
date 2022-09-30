<template>
    <!-- <div class="sm:bg-indigo-600">
        <div class="relative sm:hidden h-full justify-center items-start sm:items-center px-3 py-2 sm:px-0 sm:py-0 sm:pr-6" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
            
            <div class="fixed inset-0 flex z-40">
                <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
                    <div class="absolute top-0 right-0 -mr-12 pt-2">
                        <button>    
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <div class="hidden sm:flex sm:flex-col sm:w-64 sm:fixed sm:inset-y-0">
            <div class="flex flex-col flex-grow pt-5 bg-indigo-700 overflow-y-auto">
                <div class="flex items-center flex-shrink-0 px-4">
                    <nav class="flex-1 px-2 pb-4 space-y-1">

                        <div class="flex-shrink-0 flex items-center px-4 mb-5">
                            <NuxtLogo />
                        </div>

                        <a class="bg-indigo-700 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-sm" href="#">
                            
                            Reviews Analytics
                        </a>
                        <a class="bg-indigo-700 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-sm" href="#">
                            
                            Redemption Analytics
                        </a>
                    </nav>
                </div>
            </div>
        </div>

        <div class="sm:pl-64 flex flex-col flex-1">
            <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                <button type="button" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:hidden">
                    <span class="sr-only">Open Sidebar</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <div class="flex-1 px-4 flex justify-between">
                        <div class="flex-1 flex">
                            
                        </div>
                    </div>

                </button>
            </div>
        </div>

    </div> -->

    <div>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  <div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
    
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>

    <div class="fixed inset-0 flex z-40">
      
      <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-600">
        
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button type="button" @click="toggleSide" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Close sidebar</span>

            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div v-if="showSidebarContents" class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-col flex-grow pt-5 bg-gray-800 overflow-y-auto">
      <div class="flex items-start h-12 flex-shrink-0 px-4">
        <NuxtLogo 
          view_box="0 60 225 30"
        />
      </div>
      <div class="mt-5 flex-1 flex flex-col">
        <nav class="flex-1 px-2 pb-4 space-y-2">
          <!-- Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:bg-indigo-600" -->
          <button @click.prevent="logout" class="py-2 mb-6 flex lg:hidden px-6 mx-auto bg-blue-500 border border-transparent rounded-md shadow-md text-base font-medium text-white hover:bg-blue-600"> Logout </button>
          <NuxtLink to="/reviews" class="text-gray-100 bg-gray-700 hover:bg-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            <!-- Heroicon name: outline/folder -->
            <svg class="mr-3 flex-shrink-0 h-6 w-6 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Reviews Analytics
          </NuxtLink>

          <NuxtLink to="#" class="text-gray-100 bg-gray-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            <!-- Heroicon name: outline/chart-bar -->
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            Redemption Analytics
          </NuxtLink>

          <NuxtLink to="/campaigns" class="text-gray-100 bg-gray-700 hover:bg-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            <!-- Heroicon name: outline/chart-bar -->
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Marketing Campaigns
          </NuxtLink>

          <NuxtLink to="/customer-records" class="text-gray-100 bg-gray-700 hover:bg-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
            <!-- Heroicon name: outline/chart-bar -->
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
            </svg>
            Customer Records
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
  <div class="md:pl-64 flex flex-col flex-1">
    <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button type="button" @click="toggleSide" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
        <span class="sr-only">Open sidebar</span>
        <!-- Heroicon name: outline/menu-alt-2 -->
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      </div>
    </div>

  </div>

</template>

<script>

// import { ref } from 'vue'
export default {
    components: {  },
    data() {
        return {
            showSidebarContents: true,
            // windowWidth: ref(window.innerWidth),
        }
    },
    // watch: {
    //     windowWidth() {
    //         if (this.windowWidth < 768) {
    //             console.log("small size screen");
    //         }
    //     }
    // },
    // watch: {
    //     windowWidth: {
    //         handler: function() {
    //             console.log(this.windowWidth);
    //         }
    //     }
    // },
    methods: {
        toggleSide: function() {
            this.showSidebarContents = !this.showSidebarContents;
        },
        async logout() {
            try {
                await this.$auth.logout();
            } catch (error) {
                console.log(error);
            }
            // this.$auth.logout;
        },

    },
    mounted () {
        // window.addEventListener('resize', () => {
        //     this.windowWidth = window.innerWidth;
        // });
    }
}
</script>