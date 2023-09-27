document.addEventListener("DOMContentLoaded", function () {
  const nuevoID = localStorage.getItem("prodID");
  const productoInfoURL = `https://japceibal.github.io/emercado-api/products/${nuevoID}.json`;
  const comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${nuevoID}.json`;
  const valorUsuario = document.getElementById("usernameDropdown");
  const usuario = valorUsuario.textContent

  // Obtener información del producto
  fetch(productoInfoURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar la información del producto.');
      }
      return response.json();
    })
    .then(productoData => {
      console.log(productoData);
      const datosElement = document.getElementById("datosproducto");

      let contenidoHTML = `
        <h3>${productoData.name}</h3>
        <p><b>Precio</b></p>
        <p>${productoData.cost} ${productoData.currency}</p>
        <p><b>Descripción</b></p>
        <p>${productoData.description}</p>
        <p><b>Categoría</b></p>
        <p>${productoData.category}</p>
        <p><b>Cantidad de vendidos</b></p>
        <p>${productoData.soldCount} unidades vendidas</p>
        <p><b>Imágenes ilustrativas</b></p>
      `;

      // Agregar las imágenes al contenido
      if (productoData.images && productoData.images.length > 0) {
        contenidoHTML += '<div class="imagenes-producto">';
        productoData.images.forEach(image => {
          contenidoHTML += `<img src="${image}" alt="Imagen ilustrativa">`;
        });
        contenidoHTML += '</div>';
      }

      // Establecer el contenido completo en el elemento
      datosElement.innerHTML = contenidoHTML;

      // Obtener y mostrar los comentarios
      fetch(comentariosURL)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los comentarios.');
          }
          return response.json();
        })
        .then(comentariosData => {
          console.log(comentariosData);
          const comentariosElement = document.getElementById("comentarios-container");

          // Limpiar el contenido de comentarios antes de agregar nuevos
          comentariosElement.innerHTML = '';

          // Iterar sobre los comentarios y mostrarlos
          comentariosData.forEach(comentario => {
            const estrellasHTML = getStarsHtml(comentario.score);
            const comentarioHTML = `
              <div class="comentario">
                <div class="usuario">${comentario.user}</div>
                <div class="fecha">${comentario.dateTime}</div>
                <div class="puntuacion">
                  <div class="estrellas-container">${estrellasHTML}</div>
                </div>
                <div class="descripcion">${comentario.description}</div>
              </div>
            `;
            comentariosElement.innerHTML += comentarioHTML;
          });
        })
        .catch(error => {
          console.error("Error al cargar los comentarios:", error);
        });
    })
    .catch(error => {
      console.error("Error al cargar la información del producto:", error);
    });

  // Función para obtener el HTML de las estrellas según el puntaje
  function getStarsHtml(score) {
    const maxScore = 5;
    const filledStars = '★'.repeat(score);
    const emptyStars = '☆'.repeat(maxScore - score);
    return filledStars + emptyStars;
  }
  
    // Obtener y mostrar los comentarios del Local Storage
  const comentariosAlmacenados = JSON.parse(localStorage.getItem("comentarios")) || [];

  // Función para generar el HTML de un comentario
  function generarHTMLComentario(comentario) {
    const estrellasHTML = getStarsHtml(comentario.score);
    return `
      <div class="comentario">
        <div class="usuario">${comentario.user}</div>
        <div class="fecha">${comentario.dateTime}</div>
        <div class="puntuacion">
          <div class="estrellas-container">${estrellasHTML}</div>
        </div>
        <div class="descripcion">${comentario.description}</div>
      </div>
    `;
  }

  // Contenedor de comentarios en la página
  const comentariosElement = document.getElementById("comentarios-container");

  // Mostrar los comentarios del Local Storage en la página
  comentariosAlmacenados.forEach((comentario) => {
    const comentarioHTML = generarHTMLComentario(comentario);
    comentariosElement.innerHTML += comentarioHTML;
    
    
            .catch((error) => {
          console.error("Error al cargar los comentarios:", error);
        });
    })
    .catch((error) => {
      console.error("Error al cargar la información del producto:", error);
    });

  // Función para actualizar el contador de caracteres restantes
  document.getElementById("textarea").addEventListener("input", function () {
    var maxCaracteres = 250; // Establecemos la cantidad máxima permitida de caracteres
    var texto = this.value; // Obtener el valor del <textarea> actual
    var caracteresRestantes = maxCaracteres - texto.length;

    // Actualiza el contador en la página
    document.getElementById("contador").textContent = caracteresRestantes;

    // Limita la longitud del texto en el textarea
    if (caracteresRestantes < 0) {
      this.value = texto.slice(0, maxCaracteres);
      caracteresRestantes = 0;
      document.getElementById("contador").textContent = caracteresRestantes;
    }
  });

  /* Tomamos datos del comentario */
  const commentForm = document.querySelector("#comentar");
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const score = document.querySelector("#mi-puntuacion").value;
    const comentario = document.querySelector("#textarea").value;
    const fechaActual = new Date();
    const formatoFechaHora = fechaActual
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Formatear la fecha y hora en "aaaa-mm-dd hh:mm:ss"

    // Borrar el contenido del textarea
    document.querySelector("#textarea").value = ""; // Esto limpia el textarea

    // Definir los datos que deseas enviar
    const Comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    Comentarios.push({
      score: score,
      description: comentario,
      user: usuario, // Asigna el nombre de usuario almacenado
      dateTime: formatoFechaHora,
    })
    

    // Guardar los comentarios actualizados en el Local Storage
    localStorage.setItem("comentarios", JSON.stringify(Comentarios));

    // Mostrar el último comentario en la página
    if (Comentarios.length > 0) {
      const ultimoComentario = Comentarios[Comentarios.length - 1];
      const comentarioHTML = generarHTMLComentario(ultimoComentario);
      comentariosElement.innerHTML += comentarioHTML;
    }
    

    function borrarComentariosLocalStorage() {
      localStorage.removeItem("comentarios");
    }

    // El evento beforeunload se dispara justo antes de que la página se recargue o cierre
    window.addEventListener("beforeunload", borrarComentariosLocalStorage);
  });

       