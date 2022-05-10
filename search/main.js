// Edits 
// [].forEach.call(
//   browserDocument = document.querySelectorAll("html div #search .DKV0Md"),
//   function (el) {
//     let text = el.textContent;
//     let words = text.split(' ')

//     let stringToColour = function (str) {
//       let hash = 0;
//       for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//       }
//       let colour = "#";
//       for (let i = 0; i < 3; i++) {
//         let value = (hash >> (i * 8)) & 0xff;
//         colour += ("00" + value.toString(16)).substr(-2);
//       }
//       return colour;
//     };

//     function Keywords(words){
//       let number = Math.floor(Math.random() * words.length);
//       if(words[number].length > 1)
//         return words[number];
//       else
//         return Keywords(words)
//     }
//     el.insertAdjacentHTML(
//       "afterend",
//       `
//         <div style="display: inline-flex;">
//         <span class="Dashboard-ball">
//           <p>${text[0]}</p>
//         </span>
//         </div>
//         <p class="Surfi-text">Category: ` + text[0] +
//         ` - ${Math.floor(Math.random()*100)}% level of trust -  Keywords: ${Keywords(words)},  ${Keywords(words)},  ${Keywords(words)},  ${Keywords(words)}</p>
//     `
//     );
//   }
// );
let surfiSearch = (element) =>{
  return /*html*/`
  <div class="surfiSearch">
    <div class="searchCategory ${element.category}">
      <p class="searchCategoryTitle">${element.category}</p>
    </div>
    <div class="searchDataContainer">
    <div class="veracity">
    <p class="searchData">${Math.floor(Math.random()*30)+70}%</p>
    </div>
    <div class="calification">
    <p class="searchData">⭐${(Math.floor(Math.random()*20)+30)/10}</p>
    </div>
    </div>
    <div class="AuthorandDate">
    <p class="searchParagraph date">Fecha:${Math.floor(Math.random()*30)}/${Math.floor(Math.random()*12)}/22</p>
    <p class="searchParagraph author">Author: N/A</p>
    </div>
  </div>
  `
}
// let categories = ['Herramienta','Social','Entretenimiento','Periodismo','Investigacion','Empresas','Tienda'];
// let Pariscat = ['Investigacion','Periodismo','Entretenimiento','Tienda','Herramienta','Social','Empresas'];
let Pariscat = ['Investigacion','Organizacion','Comercio','Periodismo','Entretenimiento','Organizacion','Social'];
let counter = 0;
[].forEach.call(
  browserDocument = document.querySelectorAll("html div #search .g"),
  function (element) {
    let category = Pariscat[counter%Pariscat.length]
    let text = element.textContent;
    console.log(text)
    element.insertAdjacentHTML("afterbegin",surfiSearch({category: category}));
    counter++
  }
);


// Busquedas compuestas