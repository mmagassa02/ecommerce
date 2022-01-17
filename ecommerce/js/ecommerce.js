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

// Création d'un objet représentant un article pour le panier
function createCartArticle(nameArticle, imgArticle, price, quantity){

    const articleforcart = {
        'name' : nameArticle,
        'image'  : imgArticle,
        'price': price,
        'quantity': quantity
    } 
    cart.push(articleforcart);
}


// Affichage des produits du site
function displayArticles(cat = 0)
{
    document.getElementById('article-cardgroup').innerHTML = '';
    const articletab = getArticles();
    let articlecard ='<div class="card-group">';
    if(!articletab.length){
        alert("Aucun produit n'est disponible");
    }
    for (const [articleindex,article] of articletab.entries()) {

        const btn = `<button type="button" class="btn btn-warning btn-sm addtocart" data-id="${articleindex}">Ajouter au panier</button>`;
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
            //Le paramètre par defaut cat vaut 0 donc on affiche tous les produits
        }else if(cat == 0)
        {
             articlecard = `
                            <div class="col-md-6 col-lg-3">
                            <div class="card align-baseline mb-5" style="width: 18rem;">
                            <img class="card-img-top" src="${article.image}" alt="Card image cap">
                            <div class="card-body text-left">
                            <h5 class="card-title">${article.name}</h5>
                            <p class="card-text">${article.description}</p>
                            <p class="card-price">${parseFloat(article.price)}€</p>
                            <select name="quantity" class="article-quantity" data-id="${articleindex}">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>
                            ${btn}
                            `;
                                articlecard += `</div>`;
        document.getElementById('article-cardgroup').innerHTML += articlecard;
        }
        else continue;

    }

    document.addEventListener("click", event =>{
        if(event.target.matches(".addtocart")){
            addToCart(event.target.dataset.id, document.getElementsByClassName("article-quantity")); //Corriger plus tard
        }
    })
}


//Pour ajouter des articles au panier 
function addToCart(articleindex, htmlelement){
    let isincart = false;
    let quantity;

    for (const element of htmlelement) {
        if(element.dataset.id == articleindex){
            quantity = element.options[element.selectedIndex].textContent;
            console.log(quantity);
            console.log(element)
        }

    }


  for (const [index,article] of cart.entries()) {
    if(index == articleindex){
        cart[index].quantity = parseInt(cart[index].quantity);
        console.log("article = articleindex")
        cart[index].quantity += parseInt(quantity);// On ajoute la quantité
        console.log(typeof cart[index].quantity)
        console.log(typeof parseInt(quantity));

        isincart = true  
    }
  }
    if(!isincart)
        createCartArticle(tabArticles[articleindex].name, tabArticles[articleindex].image, tabArticles[articleindex].price, quantity);


    localStorage.setItem("cart",JSON.stringify(cart));
}



//Affichage du panier

function displayCart(){

    cart = getCart(); //Recuperation dans le localstorage du panier
    //somme a 0 et calcul ici ou fonction qui retourne la somme en la modifiant (addition soustraction etc).
   let cartstyle ='', somme = 0;
    if(cart.length == 0){
        alert("Votre panier est vide");
    }else
    {
        console.log(cart)
        //Début 
        cartstyle = getcartstyle(); //On récupere le style du panier
        for (const [articleindex,article] of cart.entries()){
            cartstyle += `<tr>
                            <th scope="row"><img src="${article.image}" alt="" class="articlecart"></th>
                            <td>${article.name}</td>
                            <td><select name="quantity" class="article-quantity" data-id="${articleindex}">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </select>${article.quantity}</td>
                            <td>${(article.quantity*article.price).toFixed(2)}€</td></tr>
                            `
                            somme += (parseFloat(article.quantity*article.price));
        }

        // Fin du modal
       
        cartstyle +=`    <tr>
                    <th scope="row">Total</th>
                    <td>${somme}€</td>
                    </tr>`
                    cartstyle += getendcartstyle();
        document.getElementById("modalcart").innerHTML = cartstyle;

 /*       document.addEventListener("change", event =>{
            if(event.target.matches())
        })*/
        cartstyle = '';
}
    for (const article of document.getElementsByClassName("article-quantity")) {
        article.addEventListener("change", event=>{
            console.log(event);
            for (const articleindex of cart.keys()){
 
                    if(event.path[0].dataset.id == articleindex){
                        addToCart(articleindex, event.path[0]);
                    }
            
                    console.log(event.path[0].dataset.id == articleindex);
                    console.log(articleindex)
                
                
            }
        displayCart();
        })    
    }

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


/*
        Getters
*/




// retourne la liste des produits initialement sous format JSON
function getArticles(){
    return JSON.parse(localStorage.getItem("articles"));
}

// Retourne le contenu du panier
function getCart(){

    return JSON.parse(localStorage.getItem("cart")) ?? [];
}


//Debut design modal
function getcartstyle(){
    return `
    
    <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Votre panier</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
    <table class="table">
    <thead><tr>
    <th scope="col">#</th>
    <th scope="col">Intitule</th>
    <th scope="col">Quantité</th>
    <th scope="col">Prix</th>
    </tr>
    `;
}

//Fin du design du modal
function getendcartstyle(){
    return `
    <div><div class="modal-footer">
    <button type="button" class="btn btn-primary">Valider le panier</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Retour</button>
    </div></div></div></div>
    `;
}


// Partie principale

document.addEventListener('DOMContentLoaded', ()=>{
    
    sendArticle();
    //On affiche initialement tous les produits du site
    displayArticles();
   // addToCart(1,4); //test
   // addToCart(2,3);

});

document.addEventListener('click', event =>{
    if(event.target.matches('#home')){
        displayArticles();
    }
    if(event.target.matches('#cat1')){
        console.log('Affichage des articles de la catégorie football');
        displayArticles(1)
    }
    if(event.target.matches('#cat2')){
        console.log('Affichage des articles de la catégorie tennis');
        displayArticles(2);
    }
    if(event.target.matches('#cat3')){
        console.log('Affichage des articles de la catégorie basketball');
        displayArticles(3);
    }
    if(event.target.matches('#cart')){
        displayCart();
    }
})