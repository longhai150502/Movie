import React, { useEffect, useState } from 'react'
import { movieService } from '../../Service/movieService'
import MovieList from './MovieList/MovieList';
import MovieTabs from './MovieTabs/MovieTabs';

export default function HomePage() {
  const [movieArr, setMovieArr] = useState([]);
    useEffect(() => {
        movieService.getDanhSachPhim()
        .then((res) => {
            setMovieArr(res.data.content);

        }).catch((err) => {
            
        });
    }, [])
  return (
    <div>
      <div className="container p-5">
        <MovieList movieArr={movieArr} />
        <MovieTabs />
      </div>
    </div>
  )
}
