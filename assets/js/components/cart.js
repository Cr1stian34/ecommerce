function cart(db, printProducts){
  //  let cart = [];
//Local storage para la persistencia de datos
    const ls = window.localStorage;

//Elementos del DOM 
    const productsDOM = document.querySelector(".products_container");
    const notifyDom = document.querySelector(".notify"); 
    const cartDom = document.querySelector(".cart_body");
    const countDom = document.querySelector(".cart_count-item");
    const totalDom = document.querySelector(".cart_total-item");
    const checkoutDom = document.querySelector(".btn-buy");

    let cart = JSON.parse(ls.getItem("carrito")) || [];

//Funciones 
    function printCart(){
        let htmlCart = "";

        if(cart.length === 0){
            htmlCart += `
            <div class="cart_empty">
               <i class="bx bx-cart"></i>
               <p class="cart_empty-text">No hay productos en el carrito</p>
              </div>
            `
            notifyDom.classList.remove("show--notify");
        }else{
            for(const item of cart){
                const product = db.find(p => p.id === item.id);
                htmlCart += `
                <article class="article">
                <div class="article_image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="article_content">
                    <h3 class="article_title">${product.name}</h3>
                    <span class="article_price">${product.price}</span>
                    <div class="article_quantity">
                        <button class="article_quantity-btn article-minus" data-id="${item.id}">
                            <i class="bx bx-minus"></i>
                        </button>
                        <span class="article_quantity-text">${item.qty}</span>
                        <button class="article_quantity-btn article-plus" data-id="${item.id}">
                            <i class="bx bx-plus"></i>
                        </button>
                    </div>
                    <button type="button" class="article_btn remove-from-cart" data-id="${item.id}">
                        <i class="bx bx-trash"></i>
                    </button>
                </div>
            </article>`
            }
            notifyDom.classList.add("show--notify");
        }

        cartDom.innerHTML = htmlCart;
        notifyDom.innerHTML= showItemsCount();
        countDom.innerHTML = showItemsCount();
        totalDom.innerHTML = showTotal();
        ls.setItem("carrito", JSON.stringify(cart));
    }

    function addToCart(id, qty = 1){
        const itemFinded = cart.find(i => i.id === id);

        if(itemFinded){
            if(stockControl(id, qty + itemFinded.qty)){
                itemFinded.qty += qty; 
            }else{
               window.alert("no hay suficiente stock") 
            }
        }else{
            cart.push({id, qty});
        }

        printCart();
    }

    function removeFromCart(id, qty = 1){
        const itemFinded = cart.find(i => i.id === id);

        const result= itemFinded.qty - qty;
        if(result > 0){
            itemFinded.qty -= qty;
        }else{
            cart = cart.filter(i => i.id !== id);
        }

        printCart();
    }

    function deleteFromCart(id){
        cart = cart.filter(i => i.id !== id);
        printCart();
    }

    function showItemsCount(){
        let suma = 0;

        for(const item of cart){
            suma += item.qty;
        }

        return suma;
    }

    function showTotal(){
        let total=0;
        for(const item of cart){
            const productFinded = db.find(p => p.id === item.id);
            total += item.qty * productFinded.price;
        }

        return total;
    }

    function checkout(){
        for(const item of cart){
            const productFinded = db.find(p => p.id === item.id)

            productFinded.quantity -= item.qty
        }
        cart=[];
        printCart();
        printProducts();
        window.alert("Gracias por su compra")
    }

    //Validacion del stock

    function stockControl(id, qty){
        const productFinded = db.find(function(producto){
            return producto.id === +id;
        })

       return productFinded.quantity >= qty;
    }
    printCart();

    //Eventos------------------------------------------------
    productsDOM.addEventListener("click", function(e){
        if(e.target.closest(".add--to--cart")){
            const id = +e.target.closest(".add--to--cart").dataset.id;
            addToCart(id);
        }
    })

    cartDom.addEventListener("click", function(e){
        if(e.target.closest(".article-minus")){
            const id = +e.target.closest(".article-minus").dataset.id;
            removeFromCart(id);
        }
        if(e.target.closest(".article-plus")){
            const id = +e.target.closest(".article-plus").dataset.id;
            addToCart(id);
        }
        if(e.target.closest(".remove-from-cart")){
            const id = +e.target.closest(".remove-from-cart").dataset.id;
            deleteFromCart(id);
        }
    })

    checkoutDom.addEventListener("click", function(){
        checkout();
    })

  /*  btnDarkMode.addEventListener("click", function(){
        document.body.classList.toggle("dark");
    })*/

    if(ls.getItem("darkMode")){
        document.body.classList.add("dark");
    }else{
        document.body.classList.remove("dark");
    }

    document.getElementById("toggle").addEventListener("click", function(){
        /*Encabezaod o nav_bar*/
        document.body.classList.toggle("dark");
        if(document.body.classList.contains("dark")){
            ls.setItem("darkMode", "dark");
        }else{
            ls.removeItem("darkMode");
        }
    })


   
}

export default cart;