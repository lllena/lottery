<template>
  <header class="header">
    <div class="wrapper">
      <h1>Lottery</h1>
      <div class="df-center info">
        <my-button title="Buy new ticket" @click="showBuyTicketDialog">
          tickets: {{ ticketAmount }} +
        </my-button>
        <div class="info-balance">
          balance: {{ balance }} {{ CURRENCY_SYMBOL }}
        </div>
      </div>
    </div>
    <action-dialog
      :message="message"
      v-model:isOpen="isConfirmDialog"
      @action="handleAction"
    ></action-dialog>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Event } from "@/types/events";
import { CURRENCY_SYMBOL } from "@/constants/price";
import ActionDialog from "@/components/UI/ActionDialog.vue";

export default defineComponent({
  components: { ActionDialog },
  data() {
    return {
      CURRENCY_SYMBOL,
      isConfirmDialog: false,
      message: "Do you want to buy a new ticket?",
    };
  },
  props: {
    ticketAmount: { type: Number, required: true },
    balance: { type: Number, required: true },
  },
  methods: {
    handleAction(answer: boolean) {
      if (answer) {
        this.$emit(Event.BuyTicket);
      }
    },
    showBuyTicketDialog(): void {
      this.isConfirmDialog = true;
    },
  },
});
</script>

<style scoped>
.header {
  width: 100%;
  padding: 10px 20px;
  background-color: var(--color-accent);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info {
  gap: 20px;
}

.info-balance {
  padding: 10px;
  border: 1px solid var(--color-accent-2);
  border-radius: 10px;
  font-size: 16px;
}
</style>
