//Variables
let tabArticles = [];
let cart=[]; // Un tableau contenant les articles ajoutés dans le panier



//Création d'un objet article
function createArticle(nameArticle, imgArticle, description, category, price)
{
    
    const article = {
        'name' : nameArticle,
        'image'  : imgArticle,
        'description'  : description,
        'categorie': category,
        'price': price
    }
    tabArticles.push(article);
}



// Affichage des produits du site
function displayArticles(cat = 0)
{
    document.getElementById('article-cardgroup').innerHTML = '';
    const articletab = getArticles();
    let articlecard ='<div class="card-group">';
    if(!articletab.length){
        console.log("Aucun produit n'est disponible");
    }
    for (const [articleindex,article] of articletab.entries()) {

        //On affiche les produits correspondant à la categorie choisie (transmise en paramètre).
        if(article.categorie == cat){
                    //On créé les cards pour afficher les produits  et leurs informations dedans.
             articlecard = `
                                <div class="col-md-6 col-lg-3">
                                <div class="card align-baseline mb-5" style="width: 18rem;">
                                <img class="card-img-top" src="${article.image}" alt="Card image cap">
                                <div class="card-body text-left">
                                <h5 class="card-title">${article.name}</h5>
                                <p class="card-text">${article.description}</p>
                                <p class="card-price">${article.price}€</p>
                                <select name="quantity" id="article-quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <button type="button" class="btn btn-warning btn-sm" data-id="${articleindex}">Ajouter au panier</button>
                                `;
            document.getElementById('article-cardgroup').innerHTML += articlecard;
            //Le parametre par defaut cat vaut 0 donc on affiche tous les produits
        }else if(cat == 0)
        {
             articlecard = `
                                <div class="col-md-6 col-lg-3">
                                <div class="card align-baseline mb-5" style="width: 18rem;">
                                <img class="card-img-top" src="${article.image}" alt="Card image cap">
                                <div class="card-body text-left">
                                <h5 class="card-title">${article.name}</h5>
                                <p class="card-text">${article.description}</p>
                                <p class="card-price">${article.price}€</p>
                                <select name="quantity" id="article-quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </select>
                                <button type="button" class="btn btn-warning btn-sm" data-id="${articleindex}">Ajouter au panier</button>
                                `;
                                articlecard += `</div>`;
        document.getElementById('article-cardgroup').innerHTML += articlecard;
        }
        else continue;


    }
}

//Pour ajouter des articles au panier
function addToCart(articleindex, quantity){
    let isInCart = false; //Devient true si 
    //un compteur a 0 pour l'incrementer dans le foreach et changer la quantité?
    //ou un foreach mais en ajoutant l'index
   // cart.push(getArticles().at(articleindex),quantity);
    cart.forEach((article,index) => {
        if(article == articleindex ){
            article[index+1] += quantity; //on augmente la quantité d'un produit deja présent dans le panier
            isInCart = true;
        }
    });
    if(!isInCart)
    cart.push(getArticles().at(articleindex),quantity);
  //  console.log(`table article = ${cart}`);
    console.log(cart);

    //Mettre un message flash un alert ou un modal pour prévenir de l'ajout du produit
    console.log("article ajouté");
}



/*
function getFlashMessage(){

}
*/


/**
    Affichage du panier
 */

function displayCart(){

    //somme a 0 et calcul ici ou fonction qui retourne la somme en la modifiant (addition soustraction etc).
    let cartstyle ='', somme = 0;
    if(cart.length == 0){
        console.log('Votre panier est vide');
    }else{
        //Début 
        cartstyle += `
                    <div class="modal cart" tabindex="-1" role="dialog" id="modalcart">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title">Votre panier</h5>
                    button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button></div>
                    <div class="modal-body">
                    `
        //Dans le tableau cart, les index pairs représentent la quantité et les index impairs représentent les articles ajoutés.
        //On vérifie donc la parité pour savoir si l'ont affiche les valeurs en tant qu'article ou quantité
    /*    for (const [articleindex,article] of cart.entries()) {
            if(articleindex % 2 == 0){
                //Il s'agit d'un article
            }else{
            }
        }*/
    }
    // Fin du modal
    cartstyle += `
                <div><div class="modal-footer">
                <button type="button" class="btn btn-primary">Valider le panier</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Retour</button>
                </div></div></div></div>
                `;
    document.getElementById("modalcart").innerHTML += cartstyle;
}


//Pour initialement mettre des produits dans un tableau et dans le localstorage
function sendArticle(){
    createArticle('Maillot Home PSG 21-22', './img/articles/maillot1.jpg','Maillot psg utilisé saison 2021-2022','1','90.00');
    createArticle('Maillot de basketball Lebron James Lakers Icon Edition 20', './img/articles/basketball1.jpg','Maillot Lebron James Lakers','3','89.99');
    createArticle('Maillot Exterieur Boca juniors', './img/articles/maillot3.jpg','Maillot de Boca juniors lors de ses déplacements','1','90.00');
    createArticle('Raquette de tennis cordée adulte Spark Elite JAUNE HEAD', './img/articles/tennis2.jpg','Un choix idéal pour faire ses premiers pas sur le court.','2','55.99');
    createArticle('Maillot Home Inter 21-22', './img/articles/maillot5.jpg','Maillot domicile de l\'Inter Milan pour la saison 2021-2022','1','90.00');
    createArticle('Crampons Adidas Nemeziz Messi', './img/articles/crampons1.jpg','Paire de crampons Adidas Nemeziz','1','114.99');
    createArticle('Raquettte de Tennis cordée adulte PRO STAFF TEAM Wilson', './img/articles/raquette.jpg','Raquette destinée aux joueurs Intermédiaires','2','159.99');
    createArticle('Maillot de basketball Bulls Icon Edition NIKE', './img/articles/basketball2.jpg','Le maillot d\'équipe Icon Edition des Bulls','3','89.99');

    localStorage.setItem("articles",JSON.stringify(tabArticles));
}


// Partie principale

document.addEventListener('DOMContentLoaded', ()=>{
    
    sendArticle();
    //On affiche initialement tous les produits du site
    displayArticles(0);
    addToCart(1,4);

});




// retourne la liste des produits initialement sous format JSON
function getArticles(){
    return JSON.parse(localStorage.getItem("articles"));
}


/*
    Partie principale
*/ 
document.addEventListener('click', event =>{
    if(event.target.matches('#home')){
        displayArticles();
    }
    if(event.target.matches('#cat1')){
        console.log('Catégorie 1');
        displayArticles(1)
    }
    if(event.target.matches('#cat2')){
        console.log('Catégorie 2');
        displayArticles(2);
    }
    if(event.target.matches('#cat3')){
        console.log('Catégorie 3');
        displayArticles(3);
    }
    if(event.target.matches('#cart')){
        displayCart();
    }
})