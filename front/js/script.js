////////Affichage de la page d’accueil et des produits de façon dynamique////////

/** Récupération des articles de l'API via une requête fetch
 * 1 promesse .then qui va récupérer la réponse en json
 * 2 promesse .then qui va afficher les produits si l'API répond
 * 3 message d'erreur si l'API ne répond pas
**/

function getArticles() {
  return fetch('http://localhost:3000/api/products')
      .then(function (Response) {
          return Response.json()
      })
      .then(function (articles) {
          return articles
      })
      .catch(function (error) {
          alert(error)
      })
}

// Création d'une fiche produit (présent dans l'API), dans le DOM
function displayArticle(article){
  
document.querySelector(".items").innerHTML +=
                                `<a href="./product.html?id=${article._id}">          
                                      <article>
                                        <img src="${article.imageUrl}"" alt="${article.altTxt}">
                                        <h3 class="productName">${article.name}</h3>
                                        <p class="productDescription">${article.description}</p>
                                       </article>
                                     </a>`;

}

//Ensemble des produits de l'API (requête) et insertion (réponse) de chaque produit dans la page accueil via le DOM
async function AllArticles() {
  const articles = await getArticles()
  let article = [];
  console.log(article);
  for (article of articles) {
    displayArticle (article)
    console.log(article);
    console.log(articles);
  }
  };
  AllArticles();

       