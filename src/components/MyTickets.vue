<template>
  <div class="wrapper">
    <transition-group name="ticket-list">
      <template v-for="ticket in tickets" :key="ticket.id">
        <my-ticket
          :ticket="ticket"
          @useTicket="(ticketId) => $emit(Event.UseTicket, ticketId)"
          @result="(result) => $emit(Event.Result, result)"
        >
        </my-ticket>
      </template>
    </transition-group>
    <p v-if="!(getTicketAmount > 0)" class="empty-text">
      You don't have any ticket.
    </p>
  </div>
</template>

<script lang="ts">
import { Event } from "@/types/events";
import { defineComponent } from "vue";
import { ITicket } from "@/types/ticket";
import MyTicket from "@/components/MyTicket.vue";

export default defineComponent({
  components: { MyTicket },
  props: {
    tickets: {
      type: Array as () => ITicket[],
      required: true,
    },
  },
  data() {
    return {
      Event,
    };
  },
  computed: {
    getTicketAmount(): number {
      return this.tickets.length;
    },
  },
});
</script>

<style scoped>
.empty-text {
  width: 100%;
  font-size: 24px;
  text-align: center;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}

.ticket-list-enter-active {
  transition: all var(--transition-t) ease;
}

.ticket-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
