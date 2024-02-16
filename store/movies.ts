import Movie from "../interface/Movie";
export const useMovieStore = defineStore("movies",{

  state: () => {
    return {
        movie_list: [] as Movie[],

    }
  },
  actions: {
    async getAllMovies(): Promise<any> {
        const { movies } = await $fetch('/api/movies');
  
        this.movie_list=movies as Movie;
        return movies;
    },
    async saveMovie(movie_name:string):void{
      this.movie_list.push({
        id: Math.random() ,
        name: movie_name,
        review: "",
        status: "WatchList"
    });
    },

    // async saveMovie(movie_name:string):void{
    //   this.movie_list.push({
    //     id: this.movie_list.length ,
    //     name: movie_name,
    //     review: "",
    //     status: "WatchList"
    // });
    // },
  },
  getters: {
    getFilteredList: (state) => {
      return (status) => state.movie_list.filter((movie) => movie.status === status);
    },
  },
})