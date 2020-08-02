# jQuery a JavaScript

Notas del curso para escribir código utilizando JavaScript puro (Vanilla JS) y ya no depender de librerías como jQuery.



## Resumen básico: variables, funciones, promesas

**var**: era la forma en que se declaraban las variables hasta ECMAScript 5.

**const**: declarar variable que no debe variar en el tiempo.

**let**: declarar variable que solo vive en el entorno (bloque) en el que fue creado y en los bloques hijos.

**funciones**: ejecuta un bloque de código cuando la función es invocada.

<code><pre>
function nombreFuncion(parametros){
	//código que se ejecuta
}
</pre></code>

**promesas**: Una Promesa es un objeto que representa la terminación o el fracaso eventual de una operación asíncrona. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca. "new Promise( /\* ejecutor \*/ function(resolver, rechazar) { ... } );". El ejecutor inicia un trabajo asíncrono, y luego, una vez que es completado, llama a la función *resolver* si la promesa a resuelto correctamente o llama a *rechazar* si ha ocurrido un error.

<code><pre>
const varPromesa = new Promise(function(resolver,rechazar) {
	// Llamamos a resolver(...) cuando finaliza con éxito, y rechazar(...) cuando falla.
	let exito = 0; // 1 > OK | 0 > KO
	if(exito){
		setTimeout(function(){
			resolver("¡Todo correcto!");
		}, 3000);
	}
	else {
		setTimeout(function(){
			rechazar("Falló algo");
		}, 3000);
	}
})
varPromesa
.then(function(mensajeOK){
	console.log(`respuesta KO de la promesa: ${mensajeOK}`)
})
.catch(function(mensajeKO){
	console.log(`respuesta KO de la promesa: ${mensajeKO}`)
})
</pre></code>

**Promise.all(iterable)**
Devuelve una de dos promesas: una que se cumple cuando *todas* las promesas en el argumento iterable (Array) han sido cumplidas (devuelve un array con los mensajes de cada resolver de cada promesa), o una que se rechaza *tan pronto* como una de las promesas del argumento iterable es rechazada (devuelve el mensaje de rechazo de la promesa que falló).

<code><pre>
Promise.all([p1, p2, p3])
.then(valoresExito => { 
  console.log(valoresExito); 
}).catch(valorFallo => { 
  console.log(valorFallo); 
})
</pre></code>

**Promise.race(iterable)**
Retorna una promesa que se cumplirá o no tan pronto como una de las promesas del argumento iterable se cumpla o se rechace, con el valor o razón de rechazo de ésta.



## Ajax en jQuery y JavaScript

### jQuery
<code><pre>
$.ajax('https://randomuser.me/api/', {
	method: 'GET',
	success: function(data){
		console.log(data);
	},
	error: function(error) {
		console.log(error)
	}
})
</pre></code>

### Vanilla JS
<code><pre>
fetch('https://randomuser.me/api/')
.then(function(response) {
	// console.log(response);
	return response.json() // la primera promesa devuelve otra promesa con los datos en JSON.
})
.then(function(user) {
	console.log('user', user.results[0].name.first) // manejo de la segunda promesa
})
.catch(function(){
	console.log('algo falló')
})
</pre></code>


## Funciones asíncronas
Una función asíncrona va a ser como una función normal, pero poniendo código asíncrono de forma que sea más fácil de leer de forma síncrona.

Para declarar una función asíncrona se usa la palabra reservada **async**, luego de eso declaras tu función de forma normal. Dentro de una función asíncrona cuentas con otra palabra reservada llamada **await**, lo que hará esta palabra es indicar que se debe esperar a que termine de ejecutarse ese fragmento de código antes de continuar.

Vamos a realizar peticiones con fetch a la API de yts para pedirle películas según su categoría y mostrarlas dentro de PlatziVideo. Sin el uso de funciones asíncronas para cada fetch tendríamos que usar los métodos then y catch, en cambio gracias a async/await solo debemos escribir la palabra await antes de cada promesa.


### Vanilla JS

<code><pre>
async function getData(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}
const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
</pre></code>



## Selectores
Un selector nos sirve para poder manipular un objeto del DOM, puedes buscar dicho objeto ya sea por su id, clase, atributo, etc.

### jQuery

<code><pre>
const $elemento = $('elemento')
</pre></code>
El texto "elemento" se reemplaza por un tag, id o clase como se usa en CSS, el resultado de "$('')" se puede guardar en una constante. Aunque no es obligatorio se puede usar "$" en el nombre de la constante para identificar que es un selector.

### Vanilla JS
Se usa funciones específicas para cada elemento:

* **getElementById**: recibe como parámetro el id del objeto del DOM que estás buscando. Te regresa un solo objeto.
* **getElementsByTagName**: recibe como parámetro el tag que estás buscando y te regresa una colección html de los elementos que tengan ese tag.
* **getElementsByClassName**: recibe como parámetro la clase y te regresa una colección html de los elementos que tengan esa clase.
* **querySelector**: va a buscar el primer elemento que coincida con el selector que le pases como parámetro.
* **querySelectorAll**: va a buscar todos los elementos que coincidan con el selector que le pases como parámetro.


<code><pre>
const $sections = document.getElementsByTagName('section');
const $home = document.getElementById('home');
const $sidebarPlaylist = document.getElementsByClassName('sidebarPlaylist);

const $modal = document.getElementById('modal')
const $modalImage1 = document.querySelector('#modal img')
const $modalImage2 = $modal.querySelector('img')
// $modalImage1 y $modalImage2 son iguales.
</pre></code>


## Creación de Templates Strings (plantillas de texto)
Las plantillas de cadena de texto se delimitan con el carácter de comillas o tildes invertidas (` `) (grave accent) , en lugar de las comillas simples o dobles. Las plantillas de cadena de texto pueden contener marcadores (variables), identificados por el signo de dólar y envueltos en llaves (${expresión}). 

### jQuery
Se concatenan los valores de cada línea
<code><pre>
‘\<div class=”container”\>’ +
    ‘\<p id=’+ id +’\>Hola Mundo\<p\>’ +
‘\<div\>’
</pre></code>

### Vanilla JS
Con ECMAScript6 se usan las plantillas usando los acentos invertidos (``) para delimitar el texto
<code><pre>
function videoItemTemplate(src,title) {
	return (
	\`\<div class="primaryPlaylistItem"\>
		\<div class="primaryPlaylistItem-image"\>
			\<img src="${src}"\>
		\</div\>
		\<h4 class="primaryPlaylistItem-title"\>
			${title}
		\</h4\>
	\</div\>`
	)
</pre></code>



## Creación de DOM
Para convertir nuestra plantilla de texto a un Document Object Model necesitamos crear dentro de memoria un documento HTML, esto es posible gracias al método **document.implementation.createHTMLDocument**. A este documento HTML le vamos a añadir al body, mediante **innerHTML**, nuestra plantilla de texto. Una vez añadida le pedimos al body el **primer elemento hijo** (children[0]) que tenga y este lo añadimos a nuestro container.

### Vanilla JS
<code><pre>
actionList.data.movies.forEach((movie) => {
	const HTMLString = videoItemTemplate(movie);
	const html = document.implementation.createHTMLDocument();
	html.body.innerHTML = HTMLString;
	$actionContainer.append(html.body.children[0]);
	console.log(HTMLString);
})
</pre></code>




## Reutilizando funciones
Se recomienda siempre, si hay bloques de código un poco largos que se repiten, convertirlos a funciones y reutilizarlos.


## Eventos
Para que un elemento HTML pueda escuchar algún evento debemos usar el método **addEventListener**. Este método recibe dos parámetros, el nombre del *evento* que va a escuchar y la *función* que se va a ejecutar al momento de que se accione el evento.

[Referencia de Eventos - Mozilla](https://developer.mozilla.org/es/docs/Web/Events)


### jQuery

<code><pre>
$("button").on( "click", function(){//...} )
</pre></code>

### Vanilla JS

<code><pre>
const $button = document.querySelector('button');
$button.addEventListener('click', function(){//...} )
</pre></code>


## Clases y estilos CSS
Dentro de cada elemento tenemos un método llamado **classList**, con este podemos ver las clases que tiene nuestro elemento y además llamar a otros métodos para añadir, borrar o hacer toggle a alguna clase.
De igual forma podemos acceder a todas las propiedades de CSS de algún elemento mediante **element.style**.

### jQuery
<code><pre>
$( "#overlay" ).addClass( "active" );
$( "#overlay" ).removeClass( "active" );
$( "#overlay" ).toggleClass( "active" );

</pre></code>

### Vanilla JS
<code><pre>
const $overlay = document.getElementById('overlay');
$overlay.classList.add('active');
$overlay.classList.remove('active');
$overlay.classList.toggle('active');
</pre></code>


## Creación de Elementos y atributos
Vamos a crear un elemento HTML sin usar un template string. Para crear el elemento desde cero vamos a usar el método **document.(tagName, [options])**, este recibe como parámetro la etiqueta html del elemento que se quiere crear, no funciona mandándole el template string.
Para añadirle un atributo al elemento que acabamos de crear haremos uso del método **setAttribute(name, value)**. Este recibe dos parámetros, uno indicando el nombre del atributo que vamos a añadir y el segundo parámetro indicando el valor de dicho atributo.

### Vanilla JS
<code><pre>
const $loader = document.createElement('img');
$loader.setAttribute('src','src/images/loader.gif');
$loader.setAttribute('height',50);
</pre></code>


## Formularios
Se crea un objeto con los campos del formulario usando **new FormData()**, los campos del formulario <u>deben tener definido</u> el atributo **name**.


### Vanilla JS
<code><pre>
const $form = document.getElementById('form');
const data = new FormData($form);
data.set('nuevocampo','valor') // para crear un nuevo campo
data.get('nuevocampo') // devuelve 'valor' del campo indicado
</pre></code>


## Desestructuración de objetos
Con el destructuring assignmen estamos creando una variable que se llama pelis y solo contiene la información de movies.

### Vanilla JS
<code><pre>
const { 
  data: {
    movies: pelis
  }
} = await fetch(`api_url`); 

//Lo anterior sería igual a esto:
const response = await fetch(`api_url`);
const pelis = response.data.movies;
</pre></code>



## DataSet
Son atributos de los elementos HTML que se escriben como **data-textoquequiera=valor"**. Dataset permite acceder a esos atributos y obtener su valor.

### Vanilla JS
<code><pre>
\<div id="element" data-id="10" data-category="action"\>
\</div\>
const $element = document.getElementById("element");
//guarda el valor de data-id
const id = $element.dataset.id; // es igual que hacer: $element.getAttribute('data-id')
//guarda el valor de data-category
const category = $element.dataset.category;
</pre></code>



## Encontrando elementos en la lista
[Array.prototype.find()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/find)
El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.

### Vanilla JS
<code><pre>
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
console.log(found); // expected output: 12
</pre></code>


## Animaciones
Animar elementos con **fadeIn** y **fadeOut**. En JQuery se usa **.fadeIn()** y **.fadeOut()**. En VanillaJS se usa CSS manipulado por JS.

### jQuery
[.fadeIn()](https://api.jquery.com/fadeIn/)
<code><pre>
// With the element initially hidden, we can show it slowly:
$( "#clickme" ).click(function() {
  $( "#book" ).fadeIn( "slow", function() {
    // Animation complete
  });
});
</pre></code>

### Vanilla JS
<code><pre>
// CSS
.fadeIn {
  animation: 5000ms fadeIn;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
// JS
$element.classList.add('fadeIn');
</pre></code>



## Manejo de errores
La declaración **try**...**catch** señala un bloque de instrucciones a intentar (try), y especifica una respuesta si se produce una excepción o error (catch).

También se puede "crear" un error con **throw** y el objeto **Error()**, "new Error('mensaje')" crea un objeto tipo error con el mensaje incluido y "throw" sirve para invocarlo.


### Vanilla JS
<code><pre>
try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
</pre></code>

<code><pre>
async function getDataUsers(url) {
		const response = await fetch(url); 
		const data = await response.json();
		// dependiendo de si hay o no resultados devuelve data o no
		if( data.info.results > 0) {
			return data; //aquí se acaba la función
		} 
		// si no entra en el IF, lanza este error:
		throw new Error('No se encontró ningún resultado de Friends');
	}
</pre></code>


## localStorage
La propiedad de sólo lectura localStorage te permite acceder al objeto local Storage; los datos persisten almacenados entre de las diferentes sesiones de navegación. localStorage es similar a sessionStorage. La única diferencia es que, mientras los datos almacenados en localStorage no tienen fecha de expiración, los datos almacenados en sessionStorage son eliminados cuando finaliza la sesión de navegación - lo cual ocurre cuando se cierra la página.

**IMPORTANTE** localStorage solo guarda texto, por lo que, si quiero guardar una lista o un objeto debo convertirlo de objeto a texto.

*window.localStorage.setItem(nombre,valor)*: agrega un elemento llamado 'nombre' y su 'valor' al localStroage.

*window.localStorage.getItem(nombre)*: devuelve el "valor" de un elemento de localStroage.

*window.localStorage.clear()*: limpia todo el localStorage.

*JSON.stringify({nombre:valor,...})*: convierte el objeto JSON en texto plano.

*JSON.parse("{nombre:valor,...}")*: convierte el texto plano en formato objeto en un objeto JSON.



### Vanilla JS
<code><pre>
window.localStorage.setItem('nombre','carlos')
window.localStorage.getItem('nombre')
// "carlos" >> devuelve el valor que siempre es un texto

window.localStorage.setItem('peli',JSON.stringify({'nombre':'wonder woman'}))
window.localStorage.getItem('peli')
// "{"nombre":"wonder woman"}" >> devuelve un texto

JSON.parse(window.localStorage.getItem('peli'))
// {nombre: "wonder woman"}  >> devuelve un Objeto
</pre></code>



