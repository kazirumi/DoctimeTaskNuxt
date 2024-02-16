import moviesList  from '../../assets/data/movies';
export default defineEventHandler(async (event) => {
    // ... Do whatever you want here
    const movies= moviesList.map(x=>{ return {...x,status:"WatchList"}})
    // console.log(movies);

    return {movies};
  })