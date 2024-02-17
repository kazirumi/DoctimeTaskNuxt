import Movie from "../interface/Movie";
export const useMovieStore = defineStore("movies",{

  state: () => {
    return {
        movie_list: [] as Movie[],
        temp_movie_list: [] as Movie[],
    }
  },
  actions: {
    updateLocalStorage():void{
      localStorage.setItem("apiData", JSON.stringify(this.movie_list));
      this.temp_movie_list=this.movie_list;
    },
    async getAllMovies(): Promise<any> {
        const { movies } = await $fetch('/api/movies');
  
        this.movie_list=movies as Movie;
        this.temp_movie_list=movies as Movie;
        localStorage.setItem("apiData", JSON.stringify(this.movie_list));
        return movies;
    },
    async saveMovie(movie_name:string):void{
       this.movie_list.push({
        id: Math.floor(Math.random()*100),
        name: movie_name,
        review: "",
        status: "WatchList"
    });
    this.updateLocalStorage();
    },

    async saveOrEditMovieReview(movie_id:number,movie_review:string):void{
      const movie = this.movie_list.find(x => x.id == movie_id);
      if(movie){
        movie.review = movie_review;
      }
      this.updateLocalStorage();
    },

    filterMovie(movie_name:string):void{
      if(!movie_name){
        this.movie_list=this.temp_movie_list;
        return;
      }
      

      this.movie_list=this.temp_movie_list.filter(movie => movie.name.toLowerCase().includes(movie_name.toLowerCase()));
    },

    changeMovieStatus(movieId:number,status:string):void{
      const movie = this.movie_list.find(x => x.id == movieId);
      if(movie){
        movie.status = status;
      }
      this.updateLocalStorage();
    }
  },
  getters: {
    getFilteredList: (state) => {
      return (status) => state.movie_list.filter((movie) => movie.status === status);
    },
  },
})