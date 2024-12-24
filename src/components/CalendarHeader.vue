<template>
  <div class="flex items-center justify-between px-4 py-2">
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
      @click="$emit('prev-month')"
    >
      <ChevronLeft class="h-4 w-4" />
    </button>
    <h2 class="text-lg font-semibold">
      {{ format(currentDate, 'MMMM yyyy') }}
    </h2>
    <button
      class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
      @click="$emit('next-month')"
    >
      <ChevronRight class="h-4 w-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

defineProps<{
  currentDate: Date;
}>();

defineEmits(['prev-month', 'next-month']);
</script>