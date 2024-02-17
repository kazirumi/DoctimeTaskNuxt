import moviesList  from '../../assets/data/movies';
export default defineEventHandler(async (event) => {

    const movies= moviesList.map(x=>{ return {...x,status:"WatchList"}})
    
    return {movies};
  })