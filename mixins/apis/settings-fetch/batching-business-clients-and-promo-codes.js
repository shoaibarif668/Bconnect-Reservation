import {fetchPromoCodes} from "~/mixins/apis/settings-fetch/fetch-promo-codes";
import {fetchBusinessClients} from "~/mixins/apis/settings-fetch/fetch-business-clients";

export const batchingBusinessClientsAndPromoCodes =  {
  mixins:[fetchBusinessClients,fetchPromoCodes],
  activated() {
    if (this.$fetchState.timestamp <=  Date.now() - 30000) {
      this.$fetch()
    }
  },
  async fetch() {
    await this.fetchBusinessClientsService()
    await this.fetchPromoCodes()
  },
}
