document.addEventListener("DOMContentLoaded", function () {

    const nuevoID = localStorage.getItem("prodID");
    fetch(`https://japceibal.github.io/emercado-api/products/${nuevoID}.json`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON.');
        }
        return response.json();
      })
      .then(data => {
        let datos = data;
        console.log(data);
        const datosElement = document.getElementById("datosproducto");
        
        let contenidoHTML = `
        <h3>${data.name}</h3>
        <p> <b> Precio </b> </p>
        <p>${data.cost} ${data.currency}</p>
        <p> <b> Descripción </b> </p>
        <p>${data.description}</p>
        <p> <b> Categoria </b> </p>
        <p>${data.category}</p>
        <p> <b> Cantidad de vendidos </b> </p>
        <p>${data.soldCount} unidades vendidas</p>
        <p> <b> Imágenes ilustrativas </b> </p>
      `;

      // Agrega las imágenes al contenido
      if (data.images && data.images.length > 0) {
        contenidoHTML += '<div class="imagenes-producto">';
        data.images.forEach(image => {
          contenidoHTML += `<img src="${image}" alt="Imagen ilustrativa">`;
        });
        contenidoHTML += '</div>';
      }

      // Establece el contenido completo en el elemento
      datosElement.innerHTML = contenidoHTML;

    })
    .catch(error => {
      console.error("Error al cargar la información del producto:", error);
    });
});