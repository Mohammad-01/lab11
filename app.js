'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let rightImg = document.getElementById('rightImg');
let middle = document.getElementById('middle');
let result = document.getElementById('results');

let productImage = ['bag.jpg','bananna.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','meatball.jpg','pen.jpg',
'pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water.jpg','wine.jpg',];

let maxAttempts = 3;
let attempt = 1;
let image = [];

function product(prductName) {
    this.gName = prductName.split('.')[0];
    this.gImg = `${prductName}`;
    this.votes = 0;
    this.views = 0;

    image.push(this);
}

for (let i = 0; i < productImage.length; i++) {
    new product(productImage[i]);
}

function randomImage() {
    return Math.floor(Math.random() * image.length);
}

let leftIndex;
let rightIndex;
let middleIndex;

function renderImg() {
    leftIndex = randomImage();//0
    rightIndex = randomImage();//5
    middleIndex = randomImage();

    while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex ===  rightIndex) {
        leftIndex = randomImage();
    }
    leftImg.setAttribute('src', image[leftIndex].gImg);
    rightImg.setAttribute('src', image[rightIndex].gImg);
    middle.setAttribute('src', image[middleIndex].gImg);
    image[leftIndex].views++;
    image[rightIndex].views++;
    image[middleIndex].views++;
}
renderImg();

leftImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);
middle.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'leftImg') {
            image[leftIndex].votes++;
        } 
        else if (clickedImage === 'rightImg') {
            image[rightIndex].votes++
        }
        else if (clickedImage === 'middle'){
            image[middleIndex].votes++
        }

        renderImg();
        console.log(image);
        attempt++;

    } else {

        let button = document.getElementById('res');
        button.addEventListener("click", display);

        function display() {
        
            let button = document.getElementById('res');
            button.addEventListener("click", display);

            function display() {
              
                for (let i = 0; i < image.length; i++) {
                    let liEl = document.createElement('li');
                    result.appendChild(liEl);
                    liEl.textContent = `${image[i].gName} has ${image[i].votes} votes and  ${image[i].views} views.`;
                }
                leftImg.removeEventListener('click', clickHandler);
                rightImg.removeEventListener('click', clickHandler);
                middle.removeEventListener('click', clickHandler);
            }
        }
    }}