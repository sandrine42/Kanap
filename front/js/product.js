//? produit = id canapé
const queryString = window.location.href;
const urlParams = new URL(queryString);
const idProduct = urlParams.searchParams.get("id");
const urlProduct = `http://localhost:3000/api/products/${idProduct}`;



// couleur
const color = document. querySelector("#colors");
// quantité
const quantity = document.querySelector("#quantity");


(async function () {
    const articleId = getArticleId()
    const articleItem = await getArticleItem(articleId)
    displayArticle(articleItem)
  })()
  
  function getArticleId() {
    return new URL(location.href).searchParams.get('id')
  }
  
  function getArticleItem(articleId) {
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
 
     // Nom du produit
     let productName = document.getElementById('title');
     productName.innerHTML = article.name;
 
     // Prix du produit
     let productPrice = document.getElementById('price');
     productPrice.innerHTML = article.price;
 
     // Description du produit
     let productDescription = document.getElementById('description');
     productDescription.innerHTML = article.description;
 
     // Choix des couleurs du produit
     for (let colors of article.colors){
         console.table(colors);
         let productColors = document.createElement("option");
         document.querySelector("#colors").appendChild(productColors);
         productColors.value = colors;
         productColors.innerHTML = colors;
     }
 }