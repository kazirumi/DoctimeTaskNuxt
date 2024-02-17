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
                    :movie_status="movie_status.WatchList" card_section_color="bg-orange-300" card_color="bg-zinc-50"
                    @edit="openReviewEditModal">
                </CardSection>

                <CardSection card_section_heading="Watching" :movie_list="getFilteredList(movie_status.Watching)"
                    :movie_status="movie_status.Watching" card_section_color="bg-sky-200" card_color="bg-purple-500"
                    @edit="openReviewEditModal">
                </CardSection>
                <CardSection card_section_heading="Watched" :movie_list="getFilteredList(movie_status.Watched)"
                    :movie_status="movie_status.Watched" card_section_color="bg-green-500" card_color="bg-slate-300"
                    @edit="openReviewEditModal">
                </CardSection>
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

    //local starage have the data or not
    const data = localStorage.getItem("apiData");

    if (!data) {
        await store.movies.getAllMovies();
    }
    else {
        store.movies.movie_list = JSON.parse(data);
        store.movies.temp_movie_list = store.movies.movie_list;
    }
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

    if (!v$.value.name.$error) {
        store.movies.saveMovie(formData.name);
        reset_movie_form();
        showMovieModal.value = false
    }

}

let openReviewEditModal = (movie) => {
    formData.id = movie.id;
    formData.review = movie.review;
    showMovieReviewModal.value = true;
}

let SubmitMovieReview = async () => {
    await v$.value.review.$validate();
    if (!v$.value.review.$error) {
        store.movies.saveOrEditMovieReview(formData.id, formData.review);
        reset_movie_form();
        showMovieReviewModal.value = false
    }

}

let timer;
watch(searchMovieBy, async (newValue, oldValue) => {
    if (timer)
        clearTimeout(timer);

    timer = setTimeout(() => {
        store.movies.filterMovie(newValue);
    }, 800);
});


</script>
<style></style>