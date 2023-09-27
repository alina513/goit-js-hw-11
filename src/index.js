import { fetchItem } from "./js/api";
import { createMarkup } from "./js/markup";


import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox = new SimpleLightbox('.gallery a');


const form = document.querySelector('.search-form');
const list = document.querySelector(".gallery");
const btn = document.querySelector(".load-more");


let page = 1;
let limit = 40;
let element;



form.addEventListener("submit", onSubmit);

 

function onSubmit(event) {
  event.preventDefault();
  
  page = 1;
  btn.classList.add("is-hidden");
  list.innerHTML = "";
  element = event.currentTarget.elements.searchQuery.value.trim();
  btn.addEventListener("click", onClick);
  if (element === "") {return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
 
  
  fetchItem(element, page, limit)
  .then((result) => {let totalHits = result.data.totalHits;
    let totalPages = totalHits / limit;
     if (totalHits === 0) {return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")}
  if(totalHits < limit) {Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    createMarkup(result.data.hits);
    lightbox.refresh();
    return btn.classList.add("is-hidden")}
  
  if (page > totalPages) {
    return endPhoto();
  }
  
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  console.log(result.data.totalHits)   
   createMarkup(result.data.hits);
   lightbox.refresh();
   btn.classList.remove("is-hidden");
   
     })
  .catch((error) => {console.log(error);
 });
}



function endPhoto() {
    btn.classList.add("is-hidden")
    fetchItem(element, page, limit)
    .then((result) => {Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
      createMarkup(result.data.hits);
      lightbox.refresh();})
      .catch((error) => console.log(error));
  }

function onClick() {
  page += 1;
  fetchItem(element, page, limit)
  .then((result) => {
     let totalHits = result.data.totalHits;
  
 let totalPages = totalHits / limit;
  if (page > totalPages) {
    return endPhoto();
  }
  
   createMarkup(result.data.hits);
   lightbox.refresh();
   btn.classList.remove("is-hidden");
   
     })
  .catch((error) => {console.log(error);
 });
}
