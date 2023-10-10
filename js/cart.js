const apiUrl = https://japceibal.github.io/emercado-api/user_cart/25801.json;

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
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
            const calculateSubtotal = () => {
              const newQuantity = parseInt(productQuantityInput.value, 10);

              // Verifica si la nueva cantidad es mayor o igual a 1
              if (newQuantity >= 1) {
                const newSubtotal = data.articles[0].unitCost * newQuantity;
                productSubtotal.textContent = newSubtotal + " " + data.articles[0].currency;
              } else {
                // Si la cantidad es menor a 1, establece la cantidad mínima a 1
                productQuantityInput.value = 1;
                const newSubtotal = data.articles[0].unitCost * 1;
                productSubtotal.textContent = newSubtotal + " " + data.articles[0].currency;
              }
            };

            // Llama a la función de cálculo de subtotal cuando cambia la cantidad
            productQuantityInput.addEventListener('input', calculateSubtotal);

            // Calcula el subtotal inicial
            calculateSubtotal();
          })
          .catch(error => {
            console.error('Error al obtener datos del carrito de compras:', error);
          });