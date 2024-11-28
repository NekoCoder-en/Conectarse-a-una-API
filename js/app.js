// Inicializamos la variable para controlar la página actual
let pagina = 1;

// Obtenemos los botones de la paginación mediante su ID
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

// Agregamos un evento al botón "Siguiente" para avanzar de página
btnSiguiente.addEventListener('click', () => {
    // Si la página actual es menor a 1000, incrementamos la página y cargamos las películas
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

// Agregamos un evento al botón "Anterior" para retroceder de página
btnAnterior.addEventListener('click', () => {
    // Si la página actual es mayor a 1, decrementamos la página y cargamos las películas
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

// Función para cargar las películas desde la API
const cargarPeliculas = async () => {
    try {
        // Realizamos una solicitud a la API con la página actual
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=dab595d92f531af4e977587024d31e6a&language=es-MX&page=${pagina}`);
        
        // Verificamos si la respuesta fue exitosa
        if (respuesta.status === 200) {
            // Convertimos la respuesta en formato JSON
            const datos = await respuesta.json();
            let peliculas = '';

            // Iteramos sobre los resultados y generamos el HTML para cada película
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class = "pelicula">
                    <img class = "poster" src = "https://image.tmdb.org/t/p/w500${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
            });

            // Insertamos las películas generadas en el contenedor del HTML
            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            // Caso de error por clave de API incorrecta
            console.log('Pusiste la llave mal');
        } else if (respuesta.status === 404) {
            // Caso de error por recurso no encontrado
            console.log('Pelicula no encontrada');
        } else {
            // Caso de error desconocido
            console.log('Hubo un error y no sabemos que paso!');
        }
    } catch (error) {
        // Capturamos cualquier error ocurrido durante la solicitud
        console.log(error);
    }
}

// Llamamos a la función para cargar las películas al cargar la página
cargarPeliculas();
