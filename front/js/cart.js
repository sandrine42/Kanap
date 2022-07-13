////////Affichage du contenu du panier dans la page via le localStorage////////

//Initialisation du local storage
let productStorage = JSON.parse(localStorage.getItem("article"));
console.log(productStorage);

//Gestion du panier
function getCart() {
    /**Si le panier est vide
     * Pas de produit dans le localStorage, formulaire "caché" et h1 différent
     * Sinon produit dans le localStorage, création de la fiche produit
     **/
    if ((productStorage === null)) {
        const titleCart = document.querySelector("h1");
        const sectionCart = document.querySelector(".cart");
        titleCart.innerHTML = "Votre panier est vide !";
        sectionCart.style.display = "none";
    } else {
        let produitSection = document.getElementById("cart__items");
        //methode 2
        produitSection.addEventListener('change', modifyQtt2);
        for (let article in productStorage) {
            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            produitSection.appendChild(productArticle);
            productArticle.className = "cart__item";
            //productArticle.setAttribute('data-id', productStorage[article].itemId);
            productArticle.dataset.id = productStorage[article].itemId;
            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = productStorage[article].itemImgSrc;
            productImg.alt = productStorage[article].itemImgAlt;

            // Insertion de l'élément "div"
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            // Insertion de l'élément "div"
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";

            // Insertion du titre h3
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = productStorage[article].itemTitle;

            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = productStorage[article].itemColorSelect;


            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = productStorage[article].itemPrice + " €";

            // Insertion de l'élément "div"
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            // Insertion de l'élément "div"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            // Insertion de "Qté : "
            let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = "Qté : ";

            // Insertion de la quantité
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = productStorage[article].itemQtty;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            // methode 1: productQuantity.setAttribute("onchange", "modifyQtt(event," + article + ")");

            // Insertion de l'élément "div"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            // Insertion de "p" supprimer
            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }

    }
}
getCart();

// Total des quantités et du prix
function getTotals() {

    // Récupération du total des quantités
    let allQtty = document.getElementsByClassName('itemQuantity');
    let allQttyLength = allQtty.length,
        totalQty = 0;

    for (let i = 0; i < allQttyLength; ++i) {
        totalQty += allQtty[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQty;
    console.log(totalQty);

    // Récupération du prix total
    totalPrice = 0;

    for (let i = 0; i < allQttyLength; ++i) {
        totalPrice += (allQtty[i].valueAsNumber * productStorage[i].itemPrice);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();


// Modification d'une quantité de produit
function modifyQtt(event, article) {
    console.log(event);
    console.log(article);
    console.log(productStorage[article]);
    productStorage[article].itemQtty = event.target.value;
    localStorage.setItem("article", JSON.stringify(productStorage));
    alert("La quantité demandée pour cet article a bien été prise en compte");
    // refresh rapide
    location.reload();
    event.stopPropagation();
    event.preventDefault();

}

// Modification d'une quantité de produit
function modifyQtt2(event) {
    console.log(event);
    articleElement = event.target.closest('.cart__item');
    productId = articleElement.dataset.id;
    article = productStorage.findIndex(produit => produit.itemId == productId);
    productStorage[article].itemQtty = event.target.value;
    localStorage.setItem("article", JSON.stringify(productStorage));
    alert("La quantité demandée pour cet article a bien été prise en compte");
    // refresh rapide
    location.reload();
    event.stopPropagation();
    event.preventDefault();

}

// Suppression d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = productStorage[j].itemId;
            let colorDelete = productStorage[j].itemColorSelect;

            productStorage = productStorage.filter(el => el.itemId !== idDelete || el.itemColorSelect !== colorDelete);

            localStorage.setItem("article", JSON.stringify(productStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé de votre panier");
            location.reload();
        })
    }
}
deleteProduct();


////////Formulaire////////

// Validation formulaire
let form = document.querySelector(".cart__order__form");
// Récupération des données du formulaire de l'objet form
form = {
    firstName: document.querySelector("#firstName"),
    lastName: document.querySelector("#lastName"),
    address: document.querySelector("#address"),
    city: document.querySelector("#city"),
    email: document.querySelector("#email")
}

let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

// Création et ajout des Regex
let emailRegExp = new RegExp((/^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$/i));
let firstAndLastNameRegExp = new RegExp(/^[A-zÀ-ú \-]{3,}$|^$/i);
let addressRegExp = new RegExp(/^[A-zÀ-ú0-9 ,.'\-]{3,}$|^$/i);
let cityRegExp = new RegExp(/^[A-zÀ-ú \-]{3,}$|^$/i);


/** Validation firstName en fonction de :
 * Champ vide
 * Champ moins de 3 lettres
 * Champ en fonction de sa regex si le modèle est respecté
 * Champ en fonction de sa regex si le modèle n'est pas respecté et plus de 3 caractéres
**/
firstName.addEventListener("input", function (e) {
    valueFirstName;
    if (e.target.value.length == 0) {
        console.log(e.target.value.length);
        firstNameErrorMsg.innerHTML = "";
        valueFirstName = null;
    } else if (e.target.value.length < 3) {
        firstNameErrorMsg.innerHTML = "Votre prénom doit être composé de 3 caractères minimum";
        valueFirstName = null;
        console.log(valueFirstName);
    }

    if (e.target.value.match(firstAndLastNameRegExp)) {
        firstNameErrorMsg.innerHTML = "";
        valueFirstName = e.target.value;
        console.log(valueFirstName);
    }

    if (!e.target.value.match(firstAndLastNameRegExp) && e.target.value.length > 3) {
        firstNameErrorMsg.innerHTML = "Veuillez entrer uniquement des lettres, le tiret (-) est accepté";
        valueFirstName = null;
        console.log(valueFirstName);
    }

});

/** Validation lastName en fonction de :
 * Champ vide
 * Champ moins de 3 lettres
 * Champ en fonction de sa regex si le modèle est respecté
 * Champ en fonction de sa regex si le modèle n'est pas respecté et plus de 3 caractéres
**/
lastName.addEventListener("input", function (e) {
    valueLastName;
    if (e.target.value.length == 0) {
        console.log(e.target.value.length);
        lastNameErrorMsg.innerHTML = "";
        valueLastName = null;
    } else if (e.target.value.length < 3) {
        lastNameErrorMsg.innerHTML = "Votre nom doit être composé de 3 caractères minimum";
        valueLastName = null;
        console.log(valueLastName);
    }

    if (e.target.value.match(firstAndLastNameRegExp)) {
        lastNameErrorMsg.innerHTML = "";
        valueLastName = e.target.value;
        console.log(valueLastName);
    }

    if (!e.target.value.match(firstAndLastNameRegExp) && e.target.value.length > 3) {
        lastNameErrorMsg.innerHTML = "Veuillez entrer uniquement des lettres, le tiret (-) est accepté";
        valueLastName = null;

    }

});

/** Validation address en fonction de :
 * Champ vide
 * Champ moins de 3 lettres
 * Champ en fonction de sa regex si le modèle est respecté
 * Champ en fonction de sa regex si le modèle n'est pas respecté et plus de 3 caractéres
**/
address.addEventListener("input", function (e) {
    valueAddress;
    if (e.target.value.length == 0) {
        console.log(e.target.value.length);
        addressErrorMsg.innerHTML = "";
        valueAddress = null;
    } else if (e.target.value.length < 3) {
        addressErrorMsg.innerHTML = "Votre adresse doit être composé de 3 caractères minimum";
        valueAddress = null;
        console.log(valueAddress);
    }

    if (e.target.value.match(addressRegExp)) {
        addressErrorMsg.innerHTML = "";
        valueAddress = e.target.value;
        console.log(valueAddress);
    }

    if (!e.target.value.match(addressRegExp) && e.target.value.length > 3) {
        addressErrorMsg.innerHTML = "Veuillez entrer uniquement des lettres et des chiffres, le tiret (-), le point (.) et la virgule (,) sont acceptés";
        valueAddress = null;
        console.log(valueAddress);

    }

});

/** Validation city en fonction de :
 * Champ vide
 * Champ moins de 3 lettres
 * Champ en fonction de sa regex si le modèle est respecté
 * Champ en fonction de sa regex si le modèle n'est pas respecté et plus de 3 caractéres
**/
city.addEventListener("input", function (e) {
    valueCity;
    if (e.target.value.length == 0) {
        console.log(e.target.value.length);
        cityErrorMsg.innerHTML = "";
        valueCity = null;
    } else if (e.target.value.length < 3) {
        cityErrorMsg.innerHTML = "le nom de ville doit être composé de 3 caractères minimum";
        valueCity = null;
        console.log(valueCity);
    }

    if (e.target.value.match(cityRegExp)) {
        cityErrorMsg.innerHTML = "";
        valueCity = e.target.value;
        console.log(valueCity);
    }

    if (!e.target.value.match(cityRegExp) && e.target.value.length > 3) {
        cityErrorMsg.innerHTML = "Veuillez entrer uniquement des lettres, le tiret (-) est accepté";
        valueCity = null;

    }

});

/** Validation email en fonction de :
 * Champ vide
 * Champ en fonction de sa regex si le modèle est respecté
 * Champ en fonction de sa regex si le modèle n'est pas respecté et plus de 3 caractéres
**/
email.addEventListener("input", function (e) {
    valueEmail;
    if (e.target.value.length == 0) {
        console.log(e.target.value.length);
        emailErrorMsg.innerHTML = "";
        valueEmail = null;
        console.log(valueEmail);
    } else if (e.target.value.match(emailRegExp)) {
        emailErrorMsg.innerHTML = "";
        valueEmail = e.target.value;
        console.log(valueEmail)
    }
    if (!e.target.value.match(emailRegExp) && !e.target.value.length == 0) {
        emailErrorMsg.innerHTML = "Votre email n'est pas valide, exemple d'email valide : prenom.nom@gmail.com";
        valueEmail = null;
        console.log(valueEmail);
    }
});


////////Passer commande après la confirmation du formulaire////////

// Affectation de l'id du produit à productId
let getId = productStorage.map(product => product.itemId);
console.log(getId);

// Validation du formulaire au moment du clic sur le bouton de commande via l'API de validation HTML 5
//Si toutes les conditions sont remplies
const btnSubmit = document.querySelector("#order")
btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    let valid = true;
    console.log(valid);

    for (let input of document.querySelectorAll(".cart__order__form__question input")) {
        valid &= input.reportValidity();
        if (!valid) {
            break;
        }
    }
    //  Fetch des données contact vers /order avec une requête POST
    if (valid) {
        const result = fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            //  Informations client et ID du produit envoyées avec la requête POST dans le serveur
            body: JSON.stringify({
                contact: {
                    firstName: document.getElementById("firstName").value,
                    lastName: document.getElementById("lastName").value,
                    address: document.getElementById("address").value,
                    city: document.getElementById("city").value,
                    email: document.getElementById("email").value
                },
                products: getId
            })
        });
        console.log(result);
        //Redirection vers la page de confirmation et localStorage "nettoyer"
        result.then(async (answer) => {
            try {
                const data = await answer.json();
                window.location.href = `confirmation.html?id=${data.orderId}`;
                console.log(data);
                localStorage.clear();
                alert("Merci d'avoir fait vos achats chez nous.")
            } catch (e) {
            }
        });
    }
})