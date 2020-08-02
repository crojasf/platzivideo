

	// CODIGO INTRODUCCION CURSO
	// ===================
	// ===================


console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}
cambiarNombre('@superLeonidas')
console.log(cambia);



const varPromesa = new Promise(function(resolver,rechazar) {
	// Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
	let aleatorio = Math.random();

	let exito = 1; // 1 > OK | 0 > KO
	if(exito){
		setTimeout(function(){
			resolver("¡Todo correcto en 3seg!!");
		}, 3000);
	}
	else {
		setTimeout(function(){
			rechazar("Falló algo en 3seg");
		}, 3000);
	}
})

const varPromesaAll = new Promise(function(resolver,rechazar) {
	// Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
	let aleatorio = Math.random();

	let exito = 1; // 1 > OK | 0 > KO
	if(exito){
		setTimeout(function(){
			resolver("¡Todo correcto en 5seg!!");
		}, 5000);
	}
	else {
		setTimeout(function(){
			rechazar("Falló algo en 5seg");
		}, 5000);
	}
})

// varPromesa
// .then(function(mensajeOK){
// 	console.log(`respuesta OK de la promesa: ${mensajeOK}`)
// })
// .catch(function(mensajeKO){
// 	console.log(`respuesta KO de la promesa: ${mensajeKO}`)
// })

Promise.all([
	varPromesa,
	varPromesaAll,
  ])
  .then(function(message) {
	console.log(message);
  })
  .catch(function(message) {
	console.log(message)
  })


  Promise.race([
	varPromesa,
	varPromesaAll,
  ])
  .then(function(message) {
	console.log(message);
  })
  .catch(function(message) {
	console.log(message)
  })






$.ajax('https://randomuser.me/api/', {
	method: 'GET',
	success: function(data){
		console.log(data);
	},
	error: function(error) {
		console.log(error)
	}
})


fetch('https://randomuser.me/api/')
.then(function(response) {
	// console.log(response);
	return response.json() // la primera promesa devuelve otra promesa con los datos en json.
})
.then(function(user) {
	console.log('user', user.results[0].name.first) // manejo de la segunda promesa
})
.catch(function(){
	console.log('algo falló')
});





	// CODIGO DE LA WEB
	// ===================
	// ===================




(async function load() {

	// DECLARACIONES
	// ===================

	// VARIABLES

	const BASE_API_MOVIES = 'https://yts.mx/api/v2/';
	const BASE_API_USER = 'https://randomuser.me/api/';

	// obtener selectores
	const $actionContainer = document.querySelector('#action');
	const $dramaContainer = document.getElementById('drama');
	const $animationContainer = document.getElementById('animation');
  
	const $featuringContainer = document.getElementById('featuring');
	const $form = document.getElementById('form');
	const $home = document.getElementById('home');

	const $friendsContainer = document.querySelector('.playlistFriends');
	    
	// const $home = $('.home .list #item');
	const $modal = document.getElementById('modal');
	const $overlay = document.getElementById('overlay');
	const $hideModal = document.getElementById('hide-modal');
  
	const $modalTitle = $modal.querySelector('h1');
	const $modalImage = $modal.querySelector('img');
	const $modalDescription = $modal.querySelector('p');

	
	// FUNCIONES
	// =============

	// Funcion asincrona > para obtener la "data" de un API en JSON indicando la URL de l API: https://yts.mx/api
	async function getDataMovies(url) {
		const response = await fetch(url);
		const data = await response.json();
		
		
		if( data.data.movie_count > 0) {
			return data; //aqui se acaba la función
		}
		// si no entra en el IF, lanza este error:
		throw new Error('No se encontró ningún resultado');
	}
	
	// Funcion asincrona > para obtener la "data" de un API en JSON indicando la URL de l API: https://randomuser.me/
	async function getDataUsers(url) {
		const response = await fetch(url); 
		const data = await response.json();
		// dependiendo de si hay o no resultados devuelve data o no
		if( data.info.results > 0) {
			return data; //aqui se acaba la función
		} 
		// si no entra en el IF, lanza este error:
		throw new Error('No se encontró ningún resultado de Friends');

	}


	// funcion agregar atributos
	function setAttributes($element, attributes){
		// por cada atributo setea atributo y valor
		for (const attribute in attributes) {
			$element.setAttribute(attribute, attributes[attribute])
			// Element.setAttribute(name, value);
			// attribute :  es el nombre del atributo dentro de attributes
			// attributes[attribute]; es el valor de ese atributo
		}
	}


	// funcion con string template > videoItemTemplate
	function videoItemTemplate(movie, category) {
		// devuelve una cadena de texto con el tml (HTMLString)
		return (
		`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
			<div class="primaryPlaylistItem-image">
				<img src="${movie.medium_cover_image}">
			</div>
			<h4 class="primaryPlaylistItem-title">
				${movie.title}
			</h4>
		</div>`
		)
	}

	// funcion con string template >  featuringTemplate
	function featuringTemplate(peli) {
		// devuelve una cadena de texto con el tml (HTMLString)
		return (
			`
			<div class="featuring">
				<div class="featuring-image">
				<img src="${peli.medium_cover_image}" width="70" height="100" alt="">
				</div>
				<div class="featuring-content">
				<p class="featuring-title">Pelicula encontrada</p>
				<p class="featuring-album">${peli.title}</p>
				</div>
			</div>
			`
		)
	}
	
	// funcion con string template >  friendTemplate
	function friendTemplate(user) {
		// devuelve una cadena de texto con el tml (HTMLString)
		return (
			`
			<li class="playlistFriends-item">
              <a href="#">
                <img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last}" />
                <span>${user.name.first} ${user.name.last}</span>
              </a>
            </li>
			`
		)
	}
	

	

	// funcion transforma el 'string template' a elemento HTML
	// para poder insertarlo en algún lugar de la web
	function createTemplate(HTMLString){
		const html = document.implementation.createHTMLDocument();
		html.body.innerHTML = HTMLString;
		return html.body.children[0];
	}

	// funcion detectar evento click
	// usado para mostrarle "Modal" al pulsar una película
	function addEventClick($element){
		//$element.addEventListener('click', () => alert('click'))
		// $element.addEventListener('click', function() {alert('click')})
		$element.addEventListener('click', () => {
			showModal($element);
		})
	}


	// funcion de buscar por id
	// para traer por ID una pelicula
	function findById(list,id){
		return list.find(movie => movie.id === parseInt(id,10))
	}

	// funcion de encontrar pelicula
	function findMovie(id,category){
		// no vale para cualquier categoría, solo para las 3 de este proyecto
		switch (category){
			case 'action' : {
				return findById(actionList, id)
			}
			case 'drama' : {
				return findById(dramaList, id)
			}
			default: {
				return findById(animationList, id)
			}
		}
		
	
	}

	
	// funcion mostrar detalle de pelicula en el Modal
	function showModal($element) {
		// muestra modal cambiando CSS
		$overlay.classList.add('active');
		$modal.style.animation = 'modalIn .8s forwards';
		// obtener info de los data-set de la peli 
		const id = $element.dataset.id;
		const category = $element.dataset.category;
		const data = findMovie(id,category);
		
		$modalTitle.textContent = data.title;
		$modalImage.setAttribute('src', data.medium_cover_image);
		$modalDescription.textContent = data.description_full;

	}

	// funcion mostrar modal cambiando CSS
	function hideModal() {
		$overlay.classList.remove('active');
		$modal.style.animation = 'modalOut .8s forwards';
	}





	// funcion renderizar el HTML creado con template >> renderMovieList
	function renderMovieList(list, $container, category) {
		// actionList.data.movies
		$container.children[0].remove();
		list.forEach((movie) => {
		  const HTMLString = videoItemTemplate(movie, category);
		  const movieElement = createTemplate(HTMLString);
		  $container.append(movieElement);
		  const image = movieElement.querySelector('img');
		  image.addEventListener('load', (event) => {
			  event.target.classList.add('fadeIn');
		  })
		  addEventClick(movieElement);
		})
	  }

	  

	// funcion renderizar el HTML creado con template >> renderMovieList
	function renderFriends($container,userAPIlist) {
				
		$container.children[0].remove();
		userAPIlist.forEach((userAPI) => {
			const HTMLString = friendTemplate(userAPI);
			const userElement = createTemplate(HTMLString);
			$container.append(userElement);
		  })

	  }



	async function cacheExistMovie(category){
		const listName = `${category}List`;
		const cachelist = window.localStorage.getItem(listName);
		if (cachelist){
			//sí hay caché
			return JSON.parse(cachelist);
		}
		//no hay caché
		const {data: {movies: data} } = await getDataMovies(`${BASE_API_MOVIES}list_movies.json?genre=${category}`);
		window.localStorage.setItem(listName,JSON.stringify(data));
		return data;

	}

	
	async function cacheExistUser(){
		const cachelist = window.localStorage.getItem('userAPIlist');
		if (cachelist){
			//sí hay caché
			return JSON.parse(cachelist);
		}
		//no hay caché
		const {results: data} = await getDataUsers(`${BASE_API_USER}?results=10`);
		window.localStorage.setItem('userAPIlist',JSON.stringify(data));
		return data;

	}


	// EVENTOS
	// ==================

	// evitar que formulario de búsqueda envíe formulario
	$form.addEventListener('submit', async (event) => {
		event.preventDefault(); // evita enviar form
		$home.classList.add('search-active')
		const $loader = document.createElement('img');
		setAttributes($loader, {
			src: 'src/images/loader.gif',
			height: 50,
			width: 50
		})
		$featuringContainer.append($loader);
		
		// traer datos del formulario con FormData
		const data = new FormData($form);

		try {
			const {
				data: {
					movies: pelis
				}
			} = await getDataMovies(`${BASE_API_MOVIES}list_movies.json?limit=1&query_term=${data.get('name')}`);
			const HTMLString = featuringTemplate(pelis[0]); // pelis[0] = peli.data.movies[0]		
			$featuringContainer.innerHTML = HTMLString;
		  } catch (error) {
			alert(error.message);
			$loader.remove();
			$home.classList.remove('search-active');
			$featuringContainer.innerHTML = "";
		  }



	})


	// Ocultar modal
	
	$hideModal.addEventListener('click', hideModal);





	// AJAX
	// =============

	// Obtener y pintar playlist amigos >> friendlist
		try{
			const userAPIlist = await cacheExistUser();
			renderFriends($friendsContainer,userAPIlist);
	
		} catch (error) {
			alert(`No se cargaron los usuarios correctamente\n ${error}`)
		}


	// versión con promesa
	let terrorList;
	getDataMovies(`${BASE_API_MOVIES}list_movies.json?genre=terror`)
		.then(function (data){
			terrorList = data;
		})


		
	//version con funciones asíncronas utilizando desestructura de objetos
	// Obtener y pintar Data accion
	const actionList = await cacheExistMovie('action');
	renderMovieList(actionList, $actionContainer, 'action');

	// Obtener y pintar Data drama
	const dramaList = await cacheExistMovie('drama');
	renderMovieList(dramaList, $dramaContainer, 'drama');
		
	// Obtener y pintar Data animation
	const animationList = await cacheExistMovie('animation');
	renderMovieList(animationList, $animationContainer, 'animation');
	
	 

	





})()





