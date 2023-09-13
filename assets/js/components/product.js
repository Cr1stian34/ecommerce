function products(products){
    const db = [...products] /*Se hace una copia de la base de datos es decir de mi arreglo de objetos*/
    
    function printProducts(){
        const productsDOM = document.querySelector(".products_container");
        let htmlProducts ="";

        for(let product of db){
            htmlProducts += `
             <article class="product">
               <div class="product_image">
                 <img src="${product.image}" alt="${product.nombre}">
                </div>
              <div class="product_content">
                <button type="button" class="product_btn add--to--cart" data-id="${product.id}">
                    <i class='bx bx-cart-add'></i>
                </button>
                <span class="product_price">$ ${product.price}</span>
                <span class="product_stock">Disponibles: ${product.quantity}</span>
                <h3 class="product_title">${product.name}</h3>
            </div>
        </article>
            `
        }

        productsDOM.innerHTML = htmlProducts;
    }

    printProducts();

    return{
        db,
        printProducts
    }
}

export default products