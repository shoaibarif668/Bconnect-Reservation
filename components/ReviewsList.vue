<template>
    <div class="bg-white">
    <div class="max-w-2xl mx-auto py-8 px-4 sm:py-24 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
      <div class="lg:col-span-4">
        <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Customer Reviews</h2>

        <div class="mt-3 flex items-center">
          <div>
            <div class="flex items-center">
               <!-- <StarIcon v-for="i in 5" :key="i" :class="[reviews.average > rating ? 'text-yellow-400' : 'text-gray-300', 'flex-shrink-0 h-5 w-5']" aria-hidden="true" /> -->
            </div>
            <!-- <p class="sr-only">{{ reviews.average }} out of 5 stars</p> -->
          </div>
          <p class="ml-2 text-sm text-gray-900">Based on {{ reviews.counts.totalCount }} reviews</p>
        </div>

        <div class="mt-6">
          <h3 class="sr-only">Review data</h3>

          <dl class="space-y-3">
            <div v-for="count in reviews.counts" :key="count" class="flex items-center text-sm">
              <dt class="flex-1 flex items-center" v-if="count !== reviews.counts.totalCount">
                <p class="w-3 font-medium text-gray-900">{{ count[1] }}<span class="sr-only"> star reviews</span></p>
                <div aria-hidden="true" class="ml-1 flex-1 flex items-center">
                    <svg class="block h-4 w-4" :class="[ count >= 0 ? 'text-yellow-500': 'text-gray-300']" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  <div class="ml-3 relative flex-1">
                    <div class="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                    <div v-if="count[1] > 0" class="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full" :style="{ width: `${(count[1] / reviews.counts.totalCount)*100}%` }" />
                  </div>
                </div>
              </dt>
              Total Count: {{ reviews.counts.totalCount }}
              <dd v-if="count !== reviews.counts.totalCount" class="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">{{ Math.round((count[1] / reviews.counts.totalCount) * 100) }}%</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
        <h3 class="sr-only">Recent reviews</h3>

        <div class="flow-root">
          <div class="-my-12 divide-y max-h-96 overflow-y-scroll divide-gray-200">
            <div v-for="review in reviews.reviews" :key="review.id" class="py-6">
              <div class="flex items-center">
                <div class="ml-4">
                  <h4 class="text-sm font-bold text-gray-900">{{ review.customerName }}</h4>
                  <div class="mt-1 flex items-center">
                    <div type="button" v-for="i in review.rating" :key="i" :class="{ 'mr-1': i < 5 }">
                      <svg class="block h-4 w-4 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  </div>
                    <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[review.rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                  </div>
                  <p class="sr-only">{{ review.rating }} out of 5 stars</p>
                </div>
              </div>
              <div class="mt-4 space-y-6 text-base italic text-gray-600" v-html="review.reviewBody" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: [
      'reviews'
    ],
    data() {
        return {
            // reviews: this.reviews_prop,
            // reviews: this.reviews,
        }
    },
    computed: {
      reviewCounts: function() {
        // return this.reviews.counts.entries()
      }
    },
    methods: {
      
        // retrieveReviewData() {
            
        // }
    }
}
</script>