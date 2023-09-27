// import axios from "axios";

import axios from "axios";


export function fetchItem(q, page, limit) { 
    
    
    return axios.get(`https://pixabay.com/api/?key=39636776-fbfac41511b7d2258638a469a&image_type=photo&q=${q}&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`)
    .then(resp => {return resp
      })
}


// async function fetchItem(q) {
//   let resp = await axios.get(`https://pixabay.com/api/?key=39636776-fbfac41511b7d2258638a469a&image_type=photo&q=${q}&orientation=horizontal&safesearch=true&per_page=${limit}&page=${page}`)
//        return resp.data.hits
//     }
// }
