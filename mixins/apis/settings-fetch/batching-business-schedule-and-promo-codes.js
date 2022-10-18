import {businessIdFromURL} from "~/utils/helpers";
import {fetchBusinessSchedule} from "~/mixins/apis/settings-fetch/fetch-business-schedule";
import {fetchPromoCodes} from "~/mixins/apis/settings-fetch/fetch-promo-codes";

export const batchingBusinessScheduleAndPromoCodes =  {
  data(){
    return{
      businessSchedule:{},
    }
  },
  mixins:[fetchBusinessSchedule,fetchPromoCodes],
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBusinessSchedule()
    await this.fetchPromoCodes()
  },
}
