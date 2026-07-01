
window.onload=function(){
var terrariums = [
    {
        id: "terarij1",
        name: "Jungle boogie",
        year: "2026",
        status: "Dostupan",
        description: "Jungle Boogie donosi mali prizor divlje prirode, gdje staro drvo pruža zaklon bujnom zelenilu i stvara dojam skrivenog kutka džungle.",
        folder: "terarij1",
        count: 4
    },
    {
        id: "terarij2",
        name: "Pinky stone",
        year: "2026",
        status: "Dostupan",
        description: "Ružičasti kamen postaje središte malog krajolika, dok se fitonije i mahovina uz njega uzdižu poput zelenila koje osvaja šumsku stijenu.",
        folder: "terarij2",
        count: 4
    },
    {
        id: "terarij3",
        name: "Čaša puna zelenila",
        year: "2026",
        status: "Dostupan",
        description: "U staklenoj čaši oblikovan je mali živi krajolik, poput gutljaja prirode koji na trenutak zaustavlja vrijeme i poziva na promatranje njezinih sitnih čuda.",
        folder: "terarij3",
        count: 3
    },
    {
        id: "terarij4",
        name: "Moon safari",
        year: "2026",
        status: "Dostupan",
        description: "Otvoreni terarij stvoren za promatranje izbliza, gdje se među mahovinom, papratima i razigranim bojama fitonija otkrivaju sitni detalji prirodnog krajolika.",
        folder: "terarij4",
        count: 5
    },
    {
        id: "terarij5",
        name: "White gem",
        year: "2026",
        status: "Dostupan",
        description: "Poput zaboravljenog dijela šume, gdje se među stijenama i starim drvom rađa život, ovaj terarij čuva mali, skriveni svijet koji očarava svojom prirodnom ravnotežom.",
        folder: "terarij5",
        count: 4
    }
];

var figures = [

{
    image: "images/figures/figure1.jpg",
    name: "Zec",
    size: "3 cm",
	stock: 2
},

{
    image: "images/figures/figure2.jpg",
    name: "Žaba",
    size: "2.5 cm",
	stock: 6
},

{
    image: "images/figures/figure3.jpg",
    name: "Kobila i ždrijebe",
    size: "1.5 - 2.5 cm",
	stock: 1
},

{
    image: "images/figures/figure4.jpg",
    name: "Kobila i pastuh",
    size: "2.5 cm",
	stock: 1
},

{
    image: "images/figures/figure5.jpg",
    name: "Pčela",
    size: "3 cm",
	stock: 1
},

{
    image: "images/figures/figure6.jpg",
    name: "Skakavac",
    size: "4 cm",
	stock: 1
},

{
    image: "images/figures/figure7.jpg",
    name: "Bogomoljka",
    size: "7.5 cm",
	stock: 1
},

{
    image: "images/figures/figure8.jpg",
    name: "Vretence",
    size: "5 cm",
	stock: 1
},

{
    image: "images/figures/figure9.jpg",
    name: "Iguana",
    size: "6 cm",
	stock: 1
},

{
    image: "images/figures/figure10.jpg",
    name: "Zmaj",
    size: "4.5 cm",
	stock: 1
},


];

var gallery = document.getElementById("gallery");
var modal = document.getElementById("modal");
var modalInfo = document.getElementById("modal-info");
var closeButton = document.getElementById("close");

var photo=document.getElementById("modal-photo");
var prev=document.getElementById("prev");
var next=document.getElementById("next");
var dotsContainer=document.getElementById("dots");

prev.onclick=prevImage;
next.onclick=nextImage;

photo.onclick=function(e){ e.stopPropagation(); };

var currentTerrarium = 0;
var currentImage = 1;
var isFigureOpen = false;

function imagePath(terrarium, index) {
    return "images/" + terrarium.folder + "/" + index + ".jpg";
}

function createCards() {
    for (var i = 0; i < terrariums.length; i++) {
        var terrarium = terrariums[i];
        var card = document.createElement("div");

        card.className = "card";
        card.setAttribute("data-index", i);
        card.innerHTML =
            '<img src="' + imagePath(terrarium, 1) + '" alt="' + terrarium.name + '">' +
            '<div class="card-content">' +
            '<h3>' + terrarium.name + '</h3>' +
            '<p class="year">' + terrarium.year + '</p>' +
 //           '<p>' + terrarium.description + '</p>' +
            '<div class="status">' + terrarium.status + '</div>' +
            '</div>';

        card.onclick = function () {
            openModal(parseInt(this.getAttribute("data-index"), 10));
        };

        gallery.appendChild(card);
    }
}

function createFigureGallery() {

    var container = document.getElementById("figure-gallery");

    if (!container) return;

    container.innerHTML = "";

    for (var i = 0; i < figures.length; i++) {

        var figure = figures[i];

        var card = document.createElement("div");
        card.className = "figure-card";

        card.innerHTML =
            '<img src="' + figure.image + '" alt="' + figure.name + '">' +
			'<h3>' + figure.name + '</h3>' +
			'<p class="figure-size">Veličina: ' + figure.size + //'</p>' +
			'<p class="figure-stock">Dostupno komada: ' + figure.stock + '</p>';
			
		card.onclick = function () {
			openFigure(this);
		};

        container.appendChild(card);
    }
}

function openFigure(card) {

    isFigureOpen = true;

    modal.style.display = "flex";

    // sakrij strelice i točkice
    prev.style.display = "none";
    next.style.display = "none";
    dotsContainer.style.display = "none";

    // postavi fotografiju
    photo.style.opacity = 1;
    photo.src = card.querySelector("img").src;

    // opis
    modalInfo.innerHTML =
        "<h2>" + card.querySelector("h3").innerHTML + "</h2>" +
        "<p class='figure-size'>" +
            card.querySelector(".figure-size").innerHTML +
        "</p>" +
        "<p class='figure-stock'>" +
            card.querySelector(".figure-stock").innerHTML +
        "</p>";

    var navH = document.querySelector("nav").offsetHeight;
    document.getElementById("modal-content").style.paddingTop = (navH + 16) + "px";
}

function openModal(index) {

    isFigureOpen = false;

    prev.style.display = "block";
    next.style.display = "block";
    dotsContainer.style.display = "block";

    currentTerrarium = index;
    currentImage = 1;
    updateModal();

    modal.style.display = "flex";

    var navH = document.querySelector("nav").offsetHeight;
    document.getElementById("modal-content").style.paddingTop = (navH + 16) + "px";
}

function updateModal(){

var t=terrariums[currentTerrarium];

photo.style.opacity=0;

photo.onload=function(){

photo.style.opacity=1;

};

photo.src=imagePath(t,currentImage);

modalInfo.innerHTML=
'<h2>'+t.name+'</h2>'+
'<p class="year">'+t.year+'</p>'+
'<p>'+t.description+'</p>'+
'<span class="status">'+t.status+'</span>';

// dots
dotsContainer.innerHTML='';
for(var i=1;i<=t.count;i++){
    var dot=document.createElement('span');
    dot.className='dot'+(i===currentImage?' active':'');
    (function(idx){
        dot.onclick=function(e){
            e.stopPropagation();
            currentImage=idx;
            updateModal();
        };
    })(i);
    dotsContainer.appendChild(dot);
}

}

function prevImage() {
    var terrarium = terrariums[currentTerrarium];

    currentImage--;

    if (currentImage < 1) {
        currentImage = terrarium.count;
    }

    updateModal();
}

function nextImage() {
    var terrarium = terrariums[currentTerrarium];

    currentImage++;

    if (currentImage > terrarium.count) {
        currentImage = 1;
    }

    updateModal();
}

closeButton.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

 
document.onkeydown=function(event){

if(modal.style.display!="flex" || isFigureOpen){

return;

}    
var key=event.keyCode;

if(key==37){

prevImage();

}

if(key==39){

nextImage();

}
    
if(key==27){

modal.style.display="none";

}

};

function preload(){

for(var i=0;i<terrariums.length;i++){

var t=terrariums[i];

for(var j=1;j<=t.count;j++){

var img=new Image();

img.src=imagePath(t,j);

}

}

}

// SWIPE
var touchStartX=0;
var touchStartY=0;
var swipeLocked=false;
var swipeDir=null;

photo.addEventListener('touchstart',function(e){
    touchStartX=e.touches[0].clientX;
    touchStartY=e.touches[0].clientY;
    swipeLocked=false;
    swipeDir=null;
},{passive:true});

photo.addEventListener('touchmove',function(e){
    if(swipeLocked) return;
    var dx=e.touches[0].clientX-touchStartX;
    var dy=e.touches[0].clientY-touchStartY;
    if(swipeDir===null){
        if(Math.abs(dx)>Math.abs(dy)){
            swipeDir='h';
        } else {
            swipeDir='v';
            swipeLocked=true;
        }
    }
    if(swipeDir==='h') e.preventDefault();
},{passive:false});

photo.addEventListener('touchend',function(e){
    if(swipeDir!=='h' || isFigureOpen) return;
    var dx=e.changedTouches[0].clientX-touchStartX;
    if(Math.abs(dx)>40){
        if(dx<0) nextImage(); else prevImage();
    }
},{passive:true});

preload();

createCards();

createFigureGallery();

};
