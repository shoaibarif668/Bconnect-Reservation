<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="w-full inline-block align-middle">
        <div class="overflow-x-hidden overflow-y-auto border rounded-[40px]">
          <table class="min-w-full divide-y divide-[#ECECEC]">
            <thead class="bg-white">
            <tr class="p-10">
              <th
                v-for="(header,index) in headers"
                :key="header"
                scope="col"
                class="p-5 font-normal text-dark__blue__cl text-lg"
                :class="header.length - 1 === index ? '' : 'border-r border-color-[#ECECEC]'"
              >
                {{ header }}
              </th>
            </tr>
            </thead>
            <slot name="table__body"/>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-table",
  props:{
    headers:{
      type:Array,
      default:[]
    }
  }
}
</script>

<style scoped>

</style>
