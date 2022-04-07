import "./App.css";
import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

function App() {
	const [movieList, setMovieList] = useState([]);
	const [featuredData, setFeaturedData] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false);

	useEffect(() => {
		const loadAll = async () => {
			// Obtendo a lista total
			let list = await Tmdb.getHomeList();
			setMovieList(list);

			// Obtendo o Featured
			let originals = list.filter((item) => item.slug === "originals");
			let randomChosen = Math.floor(Math.random() * originals[0].items.results.length - 1);
			let chosen = originals[0].items.results[randomChosen];
			let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
			setFeaturedData(chosenInfo);
		};
		loadAll();
	}, []);

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 10) {
				setBlackHeader(true);
			} else {
				setBlackHeader(false);
			}
		};

		window.addEventListener("scroll", scrollListener);

		return () => {
			window.removeEventListener("scroll", scrollListener);
		};
	}, []);

	return (
		<div className='page'>
			<Header black={blackHeader} />

			{featuredData && <FeaturedMovie item={featuredData} />}

			<section className='lists'>
				{movieList.map((item, key) => (
					<MovieRow key={key} title={item.title} items={item.items} />
				))}
			</section>

			<footer>
				<p>
					Desenvolvido por <a href='https://github.com/viniciusdsv93'>Vinícius dos Santos Verissimo</a>
				</p>
				<p>Direitos de imagem para Netflix</p>
				<p>Dados obtidos de themoviedb.org</p>
			</footer>
		</div>
	);
}

export default App;
