import {fetchBusinessProfessionals} from "~/mixins/apis/settings-fetch/fetch-business-professionals";
import {fetchBusinessClients} from "~/mixins/apis/settings-fetch/fetch-business-clients";

export const batchingBusinessProfessionalAndClients =  {
  mixins:[fetchBusinessProfessionals,fetchBusinessClients],
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBusinessClientsService()
    await this.fetchBusinessProfessionals()
  },
}
