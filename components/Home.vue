<template>
    <div>

        <div>
            <div class="flex flex-row justify-center pt-5">

                <input class="form-input px-4 py-3 rounded min-w-[500px]  mx-5" placeholder="type something">
                <button type="submit" class=" bg-slate-100 min-w-[90px] hover:bg-slate-300 px-2">Search</button>

                <button @click="() => { showMovieModal = true }" class="primary-btn px-4 rounded-xl mx-9 ">Add New</button>
            </div>
            <div class=" flex flex-row justify-around  my-10 ">
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

                <div class="flex flex-col  rounded-x bg-sky-200  p-6  gap-6  h-[550px] w-[400px] overflow-y-auto "
                    @drop="onDrop($event, movie_status.Watching)" @dragenter.prevent @dragover.prevent>
                    <div class="flex flex-row justify-centre">
                        <h1>Watching</h1>
                    </div>

                    <div v-for=" movie in store?.movies?.movie_list.filter(x => x.status == movie_status.Watching)"
                        class="flex flex-row justify-between  py-[5px] px-4 rounded-[4px] bg-purple-500 border border-[#F2F2F2] min-h-[100px] min-w-[300px]"
                        draggable="true" @dragstart="startDrag($event, movie)">
                        <div>
                            <h1>{{ movie.name }}</h1>
                            <p class="my-5">{{ movie.review }}</p>
                        </div>
                        <div>
                            <button
                                class="bg-slate-900 text-white float-right rounded-[5px] w-10 my-7 hover:bg-slate-400">Edit</button>
                        </div>

                    </div>

                </div>

                <div class="flex flex-col  rounded-x bg-green-500  p-6  gap-6  h-[550px] w-[400px] overflow-y-auto "
                    @drop="onDrop($event, movie_status.Watched)" @dragenter.prevent @dragover.prevent>
                    <div>
                        <h1>Watched</h1>
                    </div>

                    <div v-for=" movie in store?.movies?.movie_list.filter(x => x.status == movie_status.Watched)"
                        class="flex flex-row justify-between  py-[5px] px-4 rounded-[4px] bg-slate-300 border border-[#F2F2F2] min-h-[100px] min-w-[300px]"
                        draggable="true" @dragstart="startDrag($event, movie)">
                        <div>
                            <h1>{{ movie.name }}</h1>
                            <p class="my-5">{{ movie.review }}</p>
                        </div>
                        <div>
                            <button
                                class="bg-slate-900 text-white float-right rounded-[5px] w-10 my-7 hover:bg-slate-400">Edit</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
        <Modal v-if="showMovieModal" :showModal="showMovieModal" @submit="SubmitMovie" @close="closeDalog">
            <input v-model="formData.name" class="form-input bg-slate-200 px-4 py-3 rounded min-w-[500px]  mx-5"
                placeholder="Enter Movie  Name"><br>
            <span v-for="error in v$.name.$errors" class="text-red-400 px-5">{{ error.$message }}</span>
        </Modal>
    </div>
</template>
<script setup lang="ts">
import { useMovieStore } from "../store/movies";
import Modal from "/components/Modal/Modal"
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

let movie_status = ref({ WatchList: "WatchList", Watching: "Watching", Watched: "Watched" });
let showMovieModal = ref(false);

const formData = reactive({
    name: '',
    review: '',
});

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(5) },
        review: { required, minLength: minLength(5) },
    };
});

const v$ = useVuelidate(rules, formData);

const store = {
    movies: useMovieStore()
}

onMounted(async () => {

    await store.movies.getAllMovies();
});

let SubmitMovie = async () => {
    await v$.value.name.$validate();
    console.log(!v$.value.name.$error);
    if (!v$.value.name.$error) {
        store.movies.saveMovie(formData.name);
        reset_movie_form();
        showMovieModal.value = false
    }

}

let reset_movie_form = () => {
    formData.name = "";
    v$.value.$reset();
}

let closeDalog = () => {
    reset_movie_form();
    showMovieModal.value = false
}

let startDrag = (event, item) => {
    console.log(item);
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('itemID', item.id);

}

let onDrop = (event, status) => {
    const itemId = event.dataTransfer.getData('itemID');
    console.log('ondrop', status);

    const movie = store?.movies?.movie_list.find(x => x.id == itemId);
    movie.status = status;
}



</script>
<style></style>