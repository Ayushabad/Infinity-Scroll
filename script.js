const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');
// const imgContainer = document.getElementById('img-container');

let count = 5;
const apiKey = 'KCL4crGukbmaduUVrrnomRruYT-m6e-3AytNkzEqzEE';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {
    // we have to create a <a> to link unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
    // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
        // Event listener when loading is finished
        img.addEventListener('load',imageLoaded);
    // put <img> into <a and <a> into imgcontainer
        item.appendChild(img);
        imgContainer.appendChild(item);

    });
}

async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photoArray = await response.json();
        displayPhotos()
    }
    catch(err){
        //catch error here
    }
}

window.addEventListener('scroll',()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        ready = false;
        getPhotos()
    }
});
// on load

getPhotos();