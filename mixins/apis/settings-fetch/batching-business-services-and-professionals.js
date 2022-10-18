import {fetchBusinessProfessionals} from "~/mixins/apis/settings-fetch/fetch-business-professionals";
import {fetchBusinessServices} from "~/mixins";
import {fetchBusinessSchedule} from "~/mixins/apis/settings-fetch/fetch-business-schedule";

export const batchingBusinessServicesAndProfessionals =  {
  mixins:[fetchBusinessProfessionals,fetchBusinessServices,fetchBusinessSchedule],
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBusinessProfessionals()
    await this.fetchBusinessServiceService()
    await this.fetchBusinessSchedule()
  },
}
