<template>
  <section>
    <animated-background></animated-background>
    <app-bar
      :balance="balance"
      :ticket-amount="getTicketAmountAvailableForPlay"
      @buyTicket="buyTicket"
    />
    <div class="wrapper">
      <my-tickets
        :tickets="tickets"
        @useTicket="unactivateTicket"
        @result="processingResult"
      ></my-tickets>
    </div>
    <my-dialog v-model:isOpen="isTicketResultDialog">
      <ticket-dialog-content :result="result"></ticket-dialog-content>
    </my-dialog>
    <action-dialog
      :message="message"
      v-model:isOpen="isAlertDialog"
      :showCancel="false"
    ></action-dialog>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  WINNING_PRICE,
  TICKET_PRICE,
  INITIAL_BALANCE,
} from "@/constants/price";
import { ITicket } from "@/types/ticket";
import AppBar from "@/components/AppBar.vue";
import MyTickets from "@/components/MyTickets.vue";
import TicketDialogContent from "@/components/ticketDialogContent/TicketDialogContent.vue";
import ActionDialog from "@/components/UI/ActionDialog.vue";

interface IMainPageData {
  balance: number;
  tickets: ITicket[];
  isTicketResultDialog: boolean;
  isAlertDialog: boolean;
  result: boolean;
  message: string;
}

export default defineComponent({
  components: { ActionDialog, MyTickets, AppBar, TicketDialogContent },

  data(): IMainPageData {
    return {
      balance: INITIAL_BALANCE,
      tickets: [],
      isTicketResultDialog: false,
      isAlertDialog: false,
      result: false,
      message: "Insufficient balance to buy a ticket.",
    };
  },
  methods: {
    buyTicket(): void {
      if (this.balance > 0) {
        this.decrementBalance();
        this.addTicket();
      } else {
        this.isAlertDialog = true;
      }
    },
    createTicket(): ITicket {
      return {
        id: Date.now(),
        isAvailableToPlay: true,
        isWinning: null,
      };
    },
    addTicket(): void {
      this.tickets.push(this.createTicket());
    },
    unactivateTicket(id: number): void {
      this.tickets.forEach((ticket) => {
        if (ticket.id === id) {
          ticket.isAvailableToPlay = false;
        }
      });
    },
    setWinTicket(id: number, result: boolean): void {
      this.tickets.forEach((ticket) => {
        if (ticket.id === id) {
          ticket.isWinning = result;
        }
      });
    },
    incrementBalance(): void {
      this.balance += WINNING_PRICE;
    },
    decrementBalance(): void {
      this.balance -= TICKET_PRICE;
    },
    showDialog(): void {
      this.isTicketResultDialog = true;
    },
    processingResult(result: boolean, ticketId: number): void {
      this.result = result;
      this.showDialog();
      this.setWinTicket(ticketId, result);
      if (result) {
        this.incrementBalance();
      }
    },
  },
  computed: {
    getTicketAmountAvailableForPlay(): number {
      return this.tickets.filter((ticket) => ticket.isAvailableToPlay).length;
    },
  },
});
</script>

<style scoped>
.wrapper {
  max-width: 810px;
  margin: 40px auto;
}
</style>
