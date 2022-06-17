// Fonction asynchrone anonyme auto-invoquée pour appeler les articles
//utilisation d'une boucle pour appeler chaque article
(async function() {
    const articles = await getArticles()
    for (article of articles) {
      displayArticle(article)
    }
  })()
  
// Fonction pour appeler l'api ou se trouve les articles
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
// Fonction pour la créations et l'apparition des cards articles dans la page accueil
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


       