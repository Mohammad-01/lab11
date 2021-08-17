    'use strict';
    let attemptEl = document.getElementById('attempts');
    let container = document.getElementById('image-container');
    let leftImg = document.getElementById('leftImg');
    let rightImg = document.getElementById('rightImg');
    let middle = document.getElementById('middle');
    let result = document.getElementById('results');

    let productImage = ['bag.jpg','bananna.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','meatball.jpg','pen.jpg',
    'pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water.jpg','wine.jpg',];

    let maxAttempts = 25;
    let attempt = 1;
    let image = [];
    let votes = [];
    let views = [];
    let nameArr = [];
    let imageSave = [];

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

    let saveleftIndex;
    let saverightIndex;
    let savemiddleIndex;

    

    function saveToLocalStroge() {
        let data = JSON.stringify(image);
        localStorage.setItem('bus', data);
    }

    function readFromLocalStorage() {
        let stringObj = localStorage.getItem('bus');
        let normalObj = JSON.parse(stringObj);
    } 

    function renderImg() {
        leftIndex = randomImage();
        rightIndex = randomImage();
        middleIndex = randomImage();
        
        while (leftIndex === rightIndex || leftIndex === middleIndex || middleIndex ===  rightIndex || imageSave.includes(leftIndex) ||
        imageSave.includes(middleIndex) || imageSave.includes(rightIndex)) {
            leftIndex = randomImage();
            rightIndex = randomImage();
            middleIndex = randomImage();
        }
        
        leftImg.setAttribute('src', image[leftIndex].gImg);
        rightImg.setAttribute('src', image[rightIndex].gImg);
        middle.setAttribute('src', image[middleIndex].gImg);
        image[leftIndex].views++;
        image[rightIndex].views++;
        image[middleIndex].views++;
        imageSave = [];
        imageSave[0]=leftIndex;
        imageSave[1]=middleIndex;
        imageSave[2]=rightIndex;
        
    }
    renderImg();

    saveToLocalStroge();
    readFromLocalStorage();
   

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
            leftImg.removeEventListener('click', clickHandler);
            rightImg.removeEventListener('click', clickHandler);
            middle.removeEventListener('click', clickHandler);
            
        }
        
    }

    let button = document.getElementById('res');
    button.addEventListener("click", display);

    function display() {
        
            for (let i = 0; i < image.length; i++) {
                let liEl = document.createElement('li');
                result.appendChild(liEl);
                liEl.textContent = `${image[i].gName} has ${image[i].votes} votes and  ${image[i].views} views.`;
                votes.push(image[i].votes);
                views.push(image[i].views);
                nameArr.push(image[i].gName);
            }
    }

    function chartRender() {
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type : 'bar',
            data: {
                labels: nameArr,
                datasets: [{
                    label: '# of Votes',
                    data: votes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }, {
                    label: '# of views',
                    data: views,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1

                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    chartRender();

