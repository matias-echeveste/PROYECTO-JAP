document.addEventListener("DOMContentLoaded", function () {
  const nuevoID = localStorage.getItem("prodID");
  const productoInfoURL = `https://japceibal.github.io/emercado-api/products/${nuevoID}.json`;
  const comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${nuevoID}.json`;

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

          // Iterar sobre los comentarios y mostrarlos
          comentariosData.forEach(comentario => {
            const comentarioHTML = `
              <div class="comentario">
                <div class="usuario">${comentario.user}</div>
                <div class="fecha">${comentario.dateTime}</div>
                <div class="puntuacion">${comentario.score}</div>
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
});
