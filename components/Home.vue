<template>
    <div>

        <div>
            <div class="flex flex-row justify-center pt-5">

                <input v-model="searchMovieBy" class="form-input px-4 py-3 rounded min-w-[500px]  mx-5"
                    placeholder="type something">
                <button type="submit" class=" bg-slate-100 min-w-[90px] hover:bg-slate-300 px-2">Search</button>

                <button @click="() => { showMovieModal = true }" class="primary-btn px-4 rounded-xl mx-9 ">Add New</button>
            </div>

            <div class=" flex flex-row justify-around  my-10 ">
                <CardSection card_section_heading="Watch List" :movie_list="getFilteredList(movie_status.WatchList)"
                    :movie_status="movie_status.WatchList" card_section_color="orange-300" card_color="zinc-50"
                    @edit="openReviewEditModal">
                </CardSection>

                <CardSection card_section_heading="Watching" :movie_list="getFilteredList(movie_status.Watching)"
                    :movie_status="movie_status.Watching" card_section_color="sky-200" card_color="purple-500"
                    @edit="openReviewEditModal">
                </CardSection>
                <CardSection card_section_heading="Watched" :movie_list="getFilteredList(movie_status.Watched)"
                    :movie_status="movie_status.Watched" card_section_color="green-500" card_color="slate-300"
                    @edit="openReviewEditModal">
                </CardSection>

                <!-- <div class="flex flex-col  rounded-x bg-orange-300  p-6  gap-6  h-[550px] w-[400px] overflow-y-auto "
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

                </div> -->

            </div>
        </div>
        <Modal v-if="showMovieModal" :showModal="showMovieModal" @submit="SubmitMovie" @close="closeDalog">
            <h2 class="text-lg font-semibold leading-6  py-3 text-gray-900">Create Movie</h2>
            <input v-model="formData.name" class="form-input bg-slate-200 px-4 py-3 rounded w-full "
                placeholder="Enter Movie Name"><br>
            <span v-for="error in v$.name.$errors" class="text-red-400 px-5">{{ error.$message }}</span>
        </Modal>

        <Modal v-if="showMovieReviewModal" :showModal="showMovieReviewModal" @submit="SubmitMovieReview"
            @close="closeReviewDalog">
            <h2 class="text-lg font-semibold leading-6  py-3 text-gray-900">Edit Movie Review</h2>
            <input v-model="formData.review" class="form-input bg-slate-200 px-4 py-3 rounded w-full "
                placeholder="Enter Movie Review"><br>
            <span v-for="error in v$.review.$errors" class="text-red-400 px-5">{{ error.$message }}</span>
        </Modal>
    </div>
</template>
<script setup>
import { useMovieStore } from "../store/movies";
import Modal from "/components/Modal/Modal"
import { required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

let movie_status = ref({ WatchList: "WatchList", Watching: "Watching", Watched: "Watched" });
let showMovieModal = ref(false);
let showMovieReviewModal = ref(false);

let searchMovieBy = ref("");

const formData = reactive({
    id: 0,
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

const { getFilteredList } = storeToRefs(store.movies)


onMounted(async () => {

    await store.movies.getAllMovies();
});

let reset_movie_form = () => {
    formData.id = 0;
    formData.name = "";
    formData.review = "";
    v$.value.$reset();
}

let closeDalog = () => {
    reset_movie_form();
    showMovieModal.value = false
}

let closeReviewDalog = () => {
    reset_movie_form();
    showMovieReviewModal.value = false;
}



let SubmitMovie = async () => {
    await v$.value.name.$validate();
    console.log(!v$.value.name.$error);
    if (!v$.value.name.$error) {
        store.movies.saveMovie(formData.name);
        reset_movie_form();
        showMovieModal.value = false
    }

}

let openReviewEditModal = (movie) => {
    console.log(movie);
    formData.id = movie.id;
    formData.review = movie.review;
    showMovieReviewModal.value = true;
}

let SubmitMovieReview = async () => {
    await v$.value.review.$validate();
    console.log(!v$.value.review.$error);
    if (!v$.value.review.$error) {
        store.movies.saveOrEditMovieReview(formData.id, formData.review);
        reset_movie_form();
        showMovieReviewModal.value = false
    }

}





// let startDrag = (event, item) => {
//     console.log(item);
//     event.dataTransfer.dropEffect = 'move';
//     event.dataTransfer.effectAllowed = 'move';
//     event.dataTransfer.setData('itemID', item.id);

// }

// let onDrop = (event, status) => {
//     const itemId = event.dataTransfer.getData('itemID');
//     console.log('ondrop', status);

//     const movie = store?.movies?.movie_list.find(x => x.id == itemId);
//     movie.status = status;
// }

let timer;
watch(searchMovieBy, async (newValue, oldValue) => {
    if (timer)
        clearTimeout(timer);

    timer = setTimeout(() => {
        console.log(newValue);
        store.movies.filterMovie(newValue);
    }, 800);
});


</script>
<style></style>