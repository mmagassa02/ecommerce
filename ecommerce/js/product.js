//Variables
let tabProducts = [];



//Création d'un objet product
function createProduct(nameProduct, imgProduct, description, category, price)
{
    
    const product = {
        'name' : nameProduct,
        'image'  : imgProduct,
        'description'  : description,
        'categorie': category,
        'price': price
    }
    tabProducts.push(product);
}



// Affichage des produits du site
function displayProducts(cat = 0)
{
    document.getElementById('product-cardgroup').innerHTML = '';
    const producttab = getProducts();
    let productcard ='';
    if(!producttab.length){
        console.log("Aucun produit dans le tableau");
    }
    for (const [productindex,product] of producttab.entries()) {
        //On affiche les produits correspondant à la categorie choisie (transmise en paramètre)
        if(product.categorie == cat){
                    //On créé les cards pour afficher les produits  et leurs informations dedans.
             productcard = `
                                <div class="col-md-6 col-lg-3">
                                <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="${product.image}" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <button type="button" class="btn btn-primary btn-lg btn-block">Ajouter au panier</button>
                                `;
            document.getElementById('product-cardgroup').innerHTML += productcard;
            //Le parametre par defaut cat vaut 0 donc on affiche tous les produits
        }else if(cat == 0)
        {
             productcard = `
                                <div class="col-md-6 col-lg-3">
                                <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="${product.image}" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <button type="button" class="btn btn-primary btn-lg btn-block">Ajouter au panier</button>
                                `;
        document.getElementById('product-cardgroup').innerHTML += productcard;
        }
        else continue;
    }
}

/*
function getFlashMessage(){

}*/




function displayCart(){
    console.log('Panier vide');
}


//Pour mettre des produits dans un tableau
function sendproduct(){
    createProduct('Maillot Home PSG 21-22', './img/products/maillot1.jpg','Maillot psg utilisé saison 2021-2022','1','90.00');
    createProduct('Maillot Pays-bas domicile', './img/products/maillot2.jpg','Maillot domicile de l\'équipe nationale des Pays-Bas','1','90.00');
    createProduct('Maillot Exterieur Boca juniors', './img/products/maillot3.jpg','Maillot utilisé généralement par Boca uniors lors de ses déplacements','1','90.00');
    //createProduct('Maillot Third Liverpool 21-22', '/products/maillot4.jpg','Maillot Third de Liverpool pour les campagnes européennes','1','90.00');
    createProduct('Maillot Home Inter 21-22', './img/products/maillot5.jpg','Maillot domicile de l\'Inter Milan pour la saison 2021-2022','1','90.00');
    createProduct('Crampons Adidas Nemeziz Messi', './img/products/crampons1.jpg','Paire de crampons Adidas Nemeziz','1','114.99');
    createProduct('Raquettte de Tennis cordée adulte PRO STAFF TEAM Wilson', './img/products/raquette.jpg','Raquette destinée aux joueurs Intermédiaire recherchant précision et confort','2','159.99');
    createProduct('Adidas Nemeziz Messi', './img/products/crampons1.jpg','Paire de crampons Adidas Nemeziz','1','114.99');
    

    localStorage.setItem('products',JSON.stringify(tabProducts));
}


// Partie principale

document.addEventListener('DOMContentLoaded', ()=>{
    sendproduct();
    //On affiche initialement tous les produits du site
    displayProducts(0);
});




// retourne la liste des produits initialement sous format JSON
function getProducts(){
    return JSON.parse(localStorage.getItem("products"));
}


document.addEventListener('click', event =>{
    if(event.target.matches('#home')){
        displayProducts();
    }
    if(event.target.matches('#cat1')){
        console.log('Catégorie 1');
        displayProducts(1)
    }
    if(event.target.matches('#cat2')){
        console.log('Catégorie 2');
        displayProducts(2);
    }
    if(event.target.matches('#cat3')){
        console.log('Catégorie 3');
        displayProducts(3);
    }
})