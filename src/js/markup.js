const list = document.querySelector(".gallery");

export function createMarkup (arr) {
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
       return  `<div class="photo-card">
       <a href="${largeImageURL}" class="gallery__link">
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
   