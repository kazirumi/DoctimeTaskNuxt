<template>
    <div v-if="showModal">
        <div class="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-labelledby="modal-title" role="dialog"
            aria-modal="true">
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl sm:p-6 md:max-w-2xl">
                        <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <!-- <button @click="close" type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            <span class="sr-only">Close</span>
                            <CrossIcon />
                        </button> -->
                        </div>

                        <slot />

                        <div class="mt-4 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <!-- {#if submit != false} -->
                            <button type="button"
                                class="inline-flex w-full justify-center py-2 text-sm sm:ml-3 sm:w-auto primary-btn"
                                @click="submit">Save</button>
                            <!-- {/if} -->
                            <button type="button"
                                class="mt-3 inline-flex w-full justify-center py-2 text-sm sm:mt-0 sm:w-auto primary-btn bg-red-600 hover:bg-red-500"
                                @click="close">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const emits = defineEmits(["close", "submit"]);
let props = defineProps({
    showModal: {
        type: Boolean,
        default: false,
    },


});

let submit = () => {
    emits("submit");
}
let close = () => {
    emits("close");
}
</script>
<style ></style>