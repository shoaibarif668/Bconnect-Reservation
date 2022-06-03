<template>
    <div class="bg-white">
    <header class="relative pb-36 bg-blue-gray-800">
      <div class="absolute inset-0">
        <!-- <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100" alt="" /> -->
        <div class="absolute inset-0 bg-blue-gray-800 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div class="relative z-10">
        <nav class="relative max-w-7xl mx-auto flex items-center justify-between pt-6 pb-2" aria-label="Global">
          <div class="flex items-center flex-1">
            <div class="flex items-center justify-between w-full lg:w-auto">
              <!-- <a href="#">
                <span class="sr-only">Workflow</span>
                <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=500" alt="" />
              </a> -->
              <div class="-mr-2 flex items-center">
                  <div class="flex flex-cols flex-cols-2 space-x-5 mx-6 my-5">
                    <button v-show="!showUploadForm" type="button" @click="showUploadRecords" class="relative block w-auto border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
                        </svg>
                        <span class="mt-2 block text-sm font-medium text-gray-900"> Upload New Records </span>
                    </button>

                    <button v-show="!showCampaignForm" type="button" @click="showCreateCampaign" class="relative float-right block w-auto border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span class="mt-2 block text-sm font-medium text-gray-900"> New Message Campaign </span>
                    </button>
                </div>

              </div>
            </div>
          </div>
          
        </nav>
        
      </div>

      <div class="relative mt-8 max-w-md mx-auto px-4 pb-16 sm:max-w-3xl sm:px-6 md:mt-12 lg:max-w-7xl lg:px-8">
        <!-- <h1 class="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Support</h1> -->

        <div v-show="showUploadForm" class="flex w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto w-auto p-3">
            <FormsUploadRecordsComponent
            @close_current_form="closeCurrentForm"
            >
            </FormsUploadRecordsComponent>
        </div>
        
        <div v-show="showCampaignForm" class="flex w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto w-auto p-3">
            <FormsCreateCampaignComponent
            @close_current_form="closeCurrentForm"
            >
            </FormsCreateCampaignComponent>
        </div>

      </div>
    </header>

    <main>
      <div class="bg-blue-gray-50">

        <!-- FAQ -->
        <section v-if="showCampaignForm" class="max-w-md mx-auto py-6 px-4 divide-y-2 divide-blue-gray-200 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8" aria-labelledby="faq-heading">
          <h2 class="text-3xl font-extrabold text-blue-gray-900" id="faq-heading">Common Campaign Templates</h2>
        </section>
      </div>

    </main>

    <footer class="bg-blue-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="max-w-md mx-auto py-12 px-4 sm:max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div class="md:grid md:grid-cols-2 md:gap-8">
            </div>
        </div>
      </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue' 
const navigation = [
    { name: 'Analytics', href: '#' },
    { name: 'Add User', href: '#'},
    { name: 'View Calendar', href: '#' },
]

export default {
  name: 'FormsTemplate',
  data() {
    return {
      showUploadForm: false,
      showCampaignForm: false,
    }
  },
  methods: {
    showUploadRecords: function() {
      this.showUploadForm = true;
      this.showCampaignForm = false;
    },
    showCreateCampaign: function() {
      this.showUploadForm = false;
      this.showCampaignForm = true;
    },
    closeCurrentForm: function() {
      this.showUploadForm = false;
      this.showCampaignForm = false;
    }
  },
}
</script>