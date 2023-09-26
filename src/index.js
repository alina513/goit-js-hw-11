// import { fetchItem } from "./js/cat-api";

import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let lightbox = new SimpleLightbox('.gallery a');


const form = document.querySelector('.search-form');
const list = document.querySelector(".gallery");
const btn = document.querySelector(".load-more");
const alert = document.querySelector(".alert")


let limit = 40;
let isAlertVisible = false;
const totalPages = 500 / limit;


form.addEventListener("submit", onSubmit);

 
function onSubmit(event) {
    event.preventDefault();
    btn.classList.add("is-hidden")
    let page = 1;
    list.innerHTML = "";
    let element = event.currentTarget.elements.searchQuery.value;
    
    if (element === "" || element === " ") {return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
   
    if (page > totalPages) {
        return alertPop();
      }
    fetchItem(element)
    .then((result) => {if (result.length === 0) {return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
    page += 1;   
     getMarkup(result);
     btn.classList.remove("is-hidden");
     btn.addEventListener("click", onClick);
       })
    .catch((error) => {console.log(error);
   });




//    function fetchItem(q) {
//     return axios.get(`https://pixabay.com/api/?key=39636776-fbfac41511b7d2258638a469a&image_type=photo&q=${q}&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`)
//     .then(resp => {
//         console.log(resp);
//          return resp.data.hits
//       })
// }


async function fetchItem(q) {
  let resp = await axios.get(`https://pixabay.com/api/?key=39636776-fbfac41511b7d2258638a469a&image_type=photo&q=${q}&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`)
       return resp.data.hits
    }
}



function getMarkup (arr) {
 const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return  `<div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes<br> ${likes}<br/></b>
      </p>
      <p class="info-item">
        <b>Views <br>${views}<br/></b>
      </p>
      <p class="info-item">
        <b>Comments <br>${comments}<br/></b>
      </p>
      <p class="info-item">
        <b>Downloads <br>${downloads}<br/></b>
      </p>
    </div>
  </div>`
} )
.join("");
list.insertAdjacentHTML("beforeend", markup);
}


function alertPop() {
    if (isAlertVisible) {
      return;
    }
    isAlertVisible = true;
    alert.classList.add("is-visible");
    btn.classList.add("is-hidden")
    setTimeout(() => {
      alert.classList.remove("is-visible");
      isAlertVisible = false;
    }, 3000);
  }

function onClick(event) {
    if (page > totalPages) {
        return alertPop();
      }
    fetchItem(element)
    .then((result) => {if (result.length === 0) {return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
    page += 1;   
     getMarkup(result);
       })
    .catch((error) => {console.log(error);
   });
    
};