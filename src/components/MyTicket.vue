<template>
  <div class="ticket" :class="{ active: isPlay }">
    <div class="df-center full-size ticket-face face-front">
      <span class="text">Ticket №: {{ ticket.id }}</span>
      <my-button type="outline" @click="handlePlay(ticket.id)">Play</my-button>
    </div>
    <div class="df-center full-size ticket-face face-back">
      <template v-if="isPlay">
        <span class="text">{{ ticket.id }}</span>
        <ticket-form
          v-if="!formSubmitted"
          @numberSubmitted="handleSubmit"
        ></ticket-form>
        <div class="df-center full-size ticket-res" v-if="formSubmitted">
          <random-number-generator
            @numberGenerated="handleNumberGenerated"
          ></random-number-generator>
          <p class="text-dark">your number: {{ submittedNumber }}</p>
          <p class="text-success" v-if="submittedNumber === randomNumber">
            win
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Event } from "@/types/events";
import { defineComponent } from "vue";
import { ITicket } from "@/types/ticket";
import TicketForm from "@/components/TicketForm.vue";

interface ITicketData {
  isPlay: boolean;
  formSubmitted: boolean;
  submittedNumber: number | null;
  randomNumber: number | null;
}

export default defineComponent({
  components: { TicketForm },
  props: {
    ticket: { type: Object as () => ITicket, required: true },
  },
  data(): ITicketData {
    return {
      isPlay: false,
      formSubmitted: false,
      submittedNumber: null,
      randomNumber: null,
    };
  },
  methods: {
    handlePlay(id: number): void {
      this.isPlay = true;
      this.$emit(Event.UseTicket, id);
    },
    handleSubmit(submittedNumber: number): void {
      this.formSubmitted = true;
      this.submittedNumber = submittedNumber;
    },
    handleNumberGenerated(randomNumber: number): void {
      this.randomNumber = randomNumber;
      this.$emit(Event.Result, this.submittedNumber === this.randomNumber);
    },
  },
});
</script>

<style scoped>
.ticket {
  position: relative;
  width: 180px;
  height: 250px;
  text-align: center;
  color: #ecf0f1;
  border-radius: 10px;
}

.ticket-face {
  position: absolute;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
  transition: transform 0.5s ease-in-out;
  backface-visibility: hidden;
  background: var(--color-accent);
  background: linear-gradient(
    151deg,
    var(--color-accent) 0%,
    var(--color-accent-2) 50%,
    var(--main-color) 100%
  );
  overflow: hidden;
  box-shadow: 10px 8px 5px rgb(0, 0, 0, 0.2);
}

.face-back {
  transform: rotateY(180deg);
  background: var(--main-light);
  border: 2px solid var(--main-color);
}

.ticket-res {
  gap: 10px;
  flex-direction: column;
}

.ticket.active .face-front {
  transform: rotateY(-180deg);
}

.ticket.active .face-back {
  transform: rotateY(0deg);
}

.text-success {
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: var(--main-color);
}

.text {
  display: inline-block;
  padding-top: 10px;
}

.text-dark {
  color: var(--color-accent-2);
}
</style>
