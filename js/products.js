$(document).ready(function() {
  
  const IDcategoria = localStorage.getItem("catID");

  fetch(`https://japceibal.github.io/emercado-api/cats_products/${IDcategoria}.json`)

  

    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Categoría ID:', data.catID);
      console.log('Categoría:', data.catName);

      // Guarda los productos en una variable
      let productos = data.products;

      // Función para mostrar productos en el DOM
      const mostrarProductos = (productos) => {
        $("#productos").empty(); // Limpia la lista antes de agregar productos
        productos.forEach(product => {
          $("#productos").append("<li><h3>"+product.name+"</h3><p>"+product.description+"</p><p>"+product.cost+" "+product.currency+"</p><p>"+product.soldCount+" unidades vendidas</p><img src='"+product.image+"'></li>");
        });
      };

      // Muestra los productos sin ordenar por defecto
      mostrarProductos(productos);

      // Agrega un evento de clic al botón de ordenar ascendente
      $("#ordenarAscendente").on("click", function() {
        // Ordena los productos por precio de forma ascendente (de menor a mayor)
        productos.sort((a, b) => a.cost - b.cost);

        // Muestra los productos ordenados en el DOM
        mostrarProductos(productos);
      });

      // Agrega un evento de clic al botón de ordenar descendente
      $("#ordenarDescendente").on("click", function() {
        // Ordena los productos por precio de forma descendente (de mayor a menor)
        productos.sort((a, b) => b.cost - a.cost);

        // Muestra los productos ordenados en el DOM
        mostrarProductos(productos);
      });

      // Agrega un evento de clic al botón de ordenar por vendidos
      $("#ordenarPorVendidos").on("click", function() {
        // Ordena los productos por cantidad de objetos vendidos de forma descendente (de mayor a menor)
        productos.sort((a, b) => b.soldCount - a.soldCount);

        // Muestra los productos ordenados en el DOM
        mostrarProductos(productos);
      });

      // Agrega un evento de clic al botón de "Aplicar Filtros"
      $("#aplicarFiltros").on("click", aplicarFiltros);

      // Agrega un evento de cambio al campo de entrada del precio mínimo
      $("#precioMin").on("change", aplicarFiltros);

      // Agrega un evento de cambio al campo de entrada del precio máximo
      $("#precioMax").on("change", aplicarFiltros);

      // Agrega un evento de clic al botón de "Limpiar Filtros"
      $("#limpiarFiltros").on("click", function() {
        // Limpia los campos de precios mínimos y máximos
        $("#precioMin").val("");
        $("#precioMax").val("");

        // Aplica los filtros para mostrar todos los productos sin filtro de precio
        aplicarFiltros();
      });

      // Agrega un evento de entrada al campo de búsqueda
      $("#buscador").on("input", function() {
        const textoBusqueda = $(this).val().trim().toLowerCase();

        // Filtra los productos en función del texto de búsqueda
        const productosFiltrados = productos.filter(producto => {
          const titulo = producto.name.toLowerCase();
          const descripcion = producto.description.toLowerCase();
          return titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda);
        });

        // Muestra los productos filtrados en el DOM
        mostrarProductos(productosFiltrados);
      });

      // Función para aplicar los filtros
      function aplicarFiltros() {
        const precioMin = parseFloat($("#precioMin").val());
        const precioMax = parseFloat($("#precioMax").val());

        // Filtra los productos en función del rango de precios
        const productosFiltrados = productos.filter(producto => {
          const costo = producto.cost;
          return (isNaN(precioMin) || costo >= precioMin) &&
                 (isNaN(precioMax) || costo <= precioMax);
        });

        // Muestra los productos filtrados en el DOM
        mostrarProductos(productosFiltrados);
      }

    })
    .catch(error => {
      $(".container").append("<div class='alert alert-danger text-center' role='alert'> <h4 class='alert-heading'>Funcionalidad en desarrollo</h4></div>")
    });
});