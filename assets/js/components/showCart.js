function showCart(){
    const btnCart = document.querySelector(".bx-shopping-bag");
    const cart = document.querySelector(".cart");

    btnCart.addEventListener("click", function(){
        cart.classList.toggle("show--cart")
    })
    cart.addEventListener("click", function(e){
        if(e.target.closest(".bx-x")){
            cart.classList.remove("show--cart");
        }
    })
}

export default showCart;