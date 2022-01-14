//Variables
let tabArticles = [];



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
    let articlecard ='';
    if(!articletab.length){
        console.log("Aucun produit dans le tableau");
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
                              <button type="button" class="btn btn-warning btn-sm">Ajouter au panier</button>
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
                              <button type="button" class="btn btn-warning btn-sm">Ajouter au panier</button>
                                `;
        document.getElementById('article-cardgroup').innerHTML += articlecard;
        }
        else continue;
    }
}



/*
function getFlashMessage(){

}
*/



function displayCart(){
    console.log('Panier vide');
}


//Pour mettre des produits dans un tableau et dans le local storage
function sendArticle(){
    createArticle('Maillot Home PSG 21-22', './img/articles/maillot1.jpg','Maillot psg utilisé saison 2021-2022','1','90.00');
    createArticle('Maillot de basketball homme Lebron James Lakers Icon Edition 20', './img/articles/basketball1.jpg','Maillot Lebron James Lakers','3','89.99');
    createArticle('Maillot Exterieur Boca juniors', './img/articles/maillot3.jpg','Maillot utilisé généralement par Boca uniors lors de ses déplacements','1','90.00');
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
});




// retourne la liste des produits initialement sous format JSON
function getArticles(){
    return JSON.parse(localStorage.getItem("articles"));
}


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
})