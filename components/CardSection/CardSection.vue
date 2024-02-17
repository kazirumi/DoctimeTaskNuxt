<template>
    <div>
        <div :class="`flex flex-col  rounded-x ${card_section_color}  p-6  gap-6  h-[550px] w-[400px] overflow-y-auto `"
            @drop="onDrop($event, movie_status)" @dragenter.prevent @dragover.prevent>
            <div class="flex flex-row justify-center">
                <p class="text-xl">{{ card_section_heading }}</p>
            </div>

            <div v-for=" movie in movie_list"
                :class="`flex flex-row justify-between items-center  py-[5px] px-4 rounded-[4px] ${card_color} border border-[#F2F2F2] min-h-[100px] min-w-[300px] gap-4`"
                draggable="true" @dragstart="startDrag($event, movie)">
                <div class="flex flex-col justify-start gap-3 truncate">
                    <p class="text-lg font-semibold">Name: {{ movie.name }}</p>
                    <p class="text-sm font-semibold">Review: {{ movie.review }}</p>
                </div>
                <div>
                    <button class="bg-slate-900 text-white float-right rounded-[5px] w-10 my-7 hover:bg-slate-400"
                        @click="editReviw(movie)">Edit</button>
                </div>

            </div>

        </div>
    </div>
</template>
<script setup>
import { useMovieStore } from "../../store/movies";
const store = {
    movies: useMovieStore()
}
const emits = defineEmits(["edit"]);

let props = defineProps({
    movie_list: {
        type: Array,
        default: [],
    },
    movie_status: {
        type: String,
        default: "WatchList",
        validator(value, props) {
            return ["WatchList", "Watching", "Watched"].includes(value)
        }
    },
    card_section_color: {
        type: String,
        default: " bg-orange-300"
    },
    card_color: {
        type: String,
        default: "bg-zinc-50"
    },
    card_section_heading: {
        type: String,
        default: "Watch List"
    },

});

let startDrag = (event, item) => {
    console.log(item);
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID', item.id);

}

let onDrop = (event, status) => {
    const itemId = event.dataTransfer.getData('itemID');
    console.log('ondrop', itemId);
    store?.movies.changeMovieStatus(itemId, status);
    // const movie = store?.movies?.movie_list.find(x => x.id == itemId);
    // movie.status = status;
}

let editReviw = (movie) => {
    emits("edit", movie);
}

</script>
<style></style>