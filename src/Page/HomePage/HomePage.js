import React, { useEffect, useState } from 'react'
import { movieService } from '../../Service/movieService'
import AppMobile from './AppMobile/AppMobile';
import Banner from './Banner/Banner';
import MovieList from './MovieList/MovieList';
import MovieNav from './MovieNav/MovieNav';
import MovieTabs from './MovieTabs/MovieTabs';

export default function HomePage() {
  const [movieArr, setMovieArr] = useState([]);
    useEffect(() => {
        movieService.getDanhSachPhim()
        .then((res) => {
            setMovieArr(res.data.content);
        }).catch((err) => {
            console.log(err);
        });
    }, [])
  return (
    <div>
      <div className="container">
        <Banner />
        <MovieNav movieArr={movieArr} />
        <MovieList movieArr={movieArr} />
        <MovieTabs />
        <AppMobile />
      </div>
    </div>
  )
}
