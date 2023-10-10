  const apiUrl = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Aquí puedes usar los datos de la respuesta para mostrar la información del carrito en la página
      const productName = document.getElementById('product-name');
      const productCost = document.getElementById('product-cost');
      const productQuantityInput = document.getElementById('product-quantity');
      const productCurrency = document.getElementById('product-currency');
      const productImage = document.getElementById('product-image');
      const productSubtotal = document.getElementById('product-subtotal');

      // Llena los elementos con la información del carrito
      productName.textContent = data.articles[0].name;
      productCost.textContent = data.articles[0].unitCost;
      productQuantityInput.value = data.articles[0].count;
      productCurrency.textContent = data.articles[0].currency;
      productImage.src = data.articles[0].image;

      // Calcula y muestra el subtotal en función del costo y la cantidad
      const subtotal = data.articles[0].unitCost * data.articles[0].count;
      productSubtotal.textContent = subtotal +  " " + data.articles[0].currency;

      // Actualiza el subtotal cuando cambia la cantidad
      productQuantityInput.addEventListener('input', () => {
      const newQuantity = parseInt(productQuantityInput.value, 10);
      const newSubtotal = data.articles[0].unitCost * newQuantity;
      productSubtotal.textContent = newSubtotal + " " + data.articles[0].currency;
      });
    })
    .catch(error => {
      console.error('Error al obtener datos del carrito de compras:', error);
    }); 
