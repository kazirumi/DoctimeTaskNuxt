<template>
    <div>
        <div class="flex flex-col  rounded-x bg-orange-300  p-6  gap-6  h-[550px] w-[400px] overflow-y-auto "
            @drop="onDrop($event, movie_status.WatchList)" @dragenter.prevent @dragover.prevent>
            <div class="flex flex-row justify-centre">
                <p class="text-xl">Watch list</p>
            </div>

            <div v-for=" movie in store?.movies?.movie_list.filter(x => x.status == movie_status.WatchList)"
                class="flex flex-row justify-between  py-[5px] px-4 rounded-[4px] bg-zinc-50 border border-[#F2F2F2] min-h-[100px] min-w-[300px]"
                draggable="true" @dragstart="startDrag($event, movie)">
                <div>
                    <p class="text-lg">{{ movie.name }}</p>
                    <p class="text-sm my-5">{{ movie.review }}</p>
                </div>
                <div>
                    <button
                        class="bg-slate-900 text-white float-right rounded-[5px] w-10 my-7 hover:bg-slate-400">Edit</button>
                </div>

            </div>

        </div>
    </div>
</template>
<script setup>
let props = defineProps({
    is_open: {
        type: Boolean,
        default: false,
    },
    movie_status: {
        type: String,
        default: "70vw",
    },
    title: {
        type: String,
        default: "",
    },
    button: {
        type: String,
        default: null
    }
});

</script>
<style></style>