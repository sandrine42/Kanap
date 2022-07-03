//? produit = id canapé
const queryString = window.location.href;
const urlParams = new URL(queryString);
const idProduct = urlParams.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${idProduct}`;

(async function () {
    const articleId = getArticleId()
    const articleItem = await getArticleItem(articleId)
    displayArticle(articleItem)
  })()
  
  function getArticleId() {
    return new URL(location.href).searchParams.get('id')
  }
  
  function getArticleItem() {
    return fetch(urlProduct)
      .then(function(Response) {
        return Response.json()
      })
      .then(function(article) {
        return article
      })
      .catch(function(error) {
        alert(error)
      })
  }
  
    function displayArticle(article) {
     // Image du produit
     let productImg = document.createElement("img");
     document.querySelector(".item__img").appendChild(productImg);
     productImg.src = article.imageUrl;
     productImg.alt = article.altTxt;
    /*console.log(productImg)*/

     // Nom du produit
     let productName = document.getElementById('title');
     productName.innerHTML = article.name;
     /*console.log(productName)*/

     // Prix du produit
     let productPrice = document.getElementById('price');
     productPrice.innerHTML = article.price;
     /*console.log(productPrice)*/

     // Description du produit
     let productDescription = document.getElementById('description');
     productDescription.innerHTML = article.description;
     /*console.log(productDescription)*/

     // Choix des couleurs du produit
    for (let colors of article.colors){
    let colorSelect = document.createElement("option");
    document.querySelector("#colors").appendChild(colorSelect);
    colorSelect.value = colors;
    colorSelect.innerHTML = colors;
    /*console.log(colorSelect)*/
    }

    addToCart(article);
}

//Ajout des articles via le local storage dans le panier

//Fonction pour ajouter les articles au panier au clic sur le bouton
const addToCart = (article) => {
const btnAddToCart = document.querySelector("#addToCart");
btnAddToCart.addEventListener("click", (e) => {

// Récupération des données
let productStorage = JSON.parse(localStorage.getItem("article"));

// couleur par rapport à son ID
const color = document.querySelector("#colors");
/*console.log(color);*/

// quantité par rapport à son ID
const quantity = document.querySelector("#quantity");
/*console.log(quantity);*/

//Choix de la couleur
let colorChoice =  color.value;
/*console.log(colorChoice)*/

//Choix de la quantité
let quantityChoice = quantity.value;
/*console.log(quantityChoice)*/

//Options des produits : Id, Couleur et quantité
let productItems =  {
  itemId: `${idProduct}`,
  itemColorSelect: `${colorChoice}`,
  itemQuantity: `${Number(quantityChoice)}`,
  itemImgSrc: `${article.imageUrl}`,
  itemImgAlt: `${article.altTxt}`,
  itemTitle: `${article.name}`,
  itemPrice: `${article.price}`,
  itemDescription: `${article.description}`

};
/*console.log(productItems);*/

//Ajout des article dans le panier au clic sur le bouton

if (quantity.value >= 0 && quantity.value <=100 && quantity.value != 0 && color.value != 0 ) {

//Condition 1 : Aucun article dans le panier, ajout du 1er article
if (productStorage == null){
//stockage des données
productStorage = [];
productStorage.push(productItems);
localStorage.setItem("article", JSON.stringify(productStorage));
alert("Votre produit a été ajouté au panier");
console.log("ok condition 1")

//Condition 2 : Article déjà présent dans le panier (même Id, même couleur), incrémentation de la quantité au clic sur le bouton

}else if (productStorage != null){
for(i = 0 ; i < productStorage.length ; i++){

if (productStorage [i].itemId == idProduct &&
  productStorage [i].itemColorSelect == color.value){ 
  return  (
    console.log("ok condition 2"),
productStorage[i].itemQuantity++,
localStorage.setItem("article", JSON.stringify(productStorage)),
productStorage = JSON.parse(localStorage.getItem("article"))),
alert("Ce produit est déja dans votre panier, la quantité a été ajoutée")
};
}

//Condition 3 : Ajout d'un nouvel article (id différente et même id mais couleur différente)
for(i = 0 ; i < productStorage.length ; i++){
  if (productStorage [i].itemId == idProduct &&
      productStorage [i].itemColorSelect != color.value ||
      productStorage [i].itemId != idProduct){
      return (
        console.log("ok condition 3"),
        productStorage.push(productItems),
        localStorage.setItem("article", JSON.stringify(productStorage)),
        productStorage = JSON.parse(localStorage.getItem("article")),
        alert("Votre nouveau produit a été ajouté au panier")
      )
  };
}
}
//Condition 4 : couleur et/ou quantité non séléctionnées
}else{
    alert ("Veuillez selectionner une couleur et une quantitée"),
    console.log("ok condition 4")
};
});
return (
  productStorage = JSON.parse(localStorage.getItem("article"))
  );
}
