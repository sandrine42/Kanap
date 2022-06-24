let productStorage = JSON.stringify (localStorage.getItem("article"));


const cartDisplay = () =>{
if (productStorage){
productStorage ===null;

} else {
const titleCart = document.querySelector("h1");
const sectionCart = document.querySelector(".cart");
titleCart.innerHTML = "Votre panier est vide !";
sectionCart.style.display = "none";
};
if (productStorage){
    productStorage >= 0;
    for (let i=0; i < productStorage.length; i++) {
        productStorage = [];
        
        console.log(productStorage);
    }
    return productStorage = JSON.parse(localStorage.getItem("article"));
}
};


cartDisplay();
