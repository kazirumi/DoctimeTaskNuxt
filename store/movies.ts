import Movie from "../interface/Movie";
export const useMovieStore = defineStore("movies",{

  state: () => {
    return {
        movie_list: [] as Movie[],
        temp_movie_list: [] as Movie[],
    }
  },
  actions: {
    async getAllMovies(): Promise<any> {
        const { movies } = await $fetch('/api/movies');
  
        this.movie_list=movies as Movie;
        this.temp_movie_list=movies as Movie;
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

    filterMovie(movie_name:string):void{
      if(!movie_name)
      this.movie_list=this.temp_movie_list;

      this.movie_list=this.temp_movie_list.filter(movie => movie.name.toLowerCase().includes(movie_name.toLowerCase()));
    },
  },
  getters: {
    getFilteredList: (state) => {
      return (status) => state.movie_list.filter((movie) => movie.status === status);
    },
  },
})