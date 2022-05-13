let surfiSearch = (element) =>{
  return /*html*/`
  <div class="surfiSearch">
    <div class="searchCategory ${element.category}">
      <p class="searchCategoryTitle">${element.category}</p>
    </div>
    <div class="searchDataContainer">
    <div class="veracity">
    <p class="searchData">${element.veracity}%</p>
    </div>
    <div class="calification">
    <p class="searchData">⭐${element.rating}</p>
    </div>
    </div>
    <div class="AuthorandDate">
    <p class="searchParagraph date">Fecha:${element.date}/22</p>
    <p class="searchParagraph author">Author: ${element.author}</p>
    </div>
  </div>
  `
}
// let categoriesv1 = ['Herramienta','Social','Entretenimiento','Periodismo','Investigacion','Empresas','Tienda'];
// let categoriesv2 = ['Investigacion','Periodismo','Entretenimiento','Tienda','Herramienta','Social','Empresas'];
class surfiAddon
{
  constructor(category,rating,author,date,veracity)
  {
    this.category = category;
    this.rating = rating;
    this.author = author;
    this.date = date;
    this.veracity = veracity;
  }
}

var linksElements = new Map();
let webSearchs = document.querySelectorAll("html div #search .g");
for(element of webSearchs)
{
    let link = element.querySelector('a')
    let linkVar = document.createElement('a')
    linkVar.href = link.href
    linksElements.set("https://"+linkVar.hostname,element);
};


//Send requests with the array of links
async function getMultipleWebsites(links){
     let surfiRequest = new Map();
     let url = "https://44.195.183.116"
     let string =""
     let contador = true;
     for (let link of links) 
     {
       if (contador)
       {
         contador = false;
         var tmp = document.createElement('a')
         tmp.href = link
         string+="?url=https://"+tmp.hostname;
       }
        else
        {
        string += "&url="+link
        }
     }
     const response = await fetch(url+'/websites/multiple/'+string);
     let res = await response.json()
     for (let element of res)
     {
      surfiRequest.set(element.url,new surfiAddon(element.categoria,Math.round(element.calificacionPromedio*10)/10,element.autor,element.fecha,Math.round(element.gradoVeracidadPromedio)));
     }
     return surfiRequest;
} 



async function changePage()
{
  var surfiReq = await getMultipleWebsites(linksElements.keys());
  for(let link of linksElements.keys())
  { 
  //console.log("probando surfiReq"+surfiReq.get(link).category);
  let element = linksElements.get(link);
  if (surfiReq.has(link))
  {
    element.insertAdjacentHTML("afterbegin",surfiSearch(surfiReq.get(link)));
  }
  else
  {
    element.insertAdjacentHTML("afterbegin",surfiSearch(new surfiAddon('No calificado','NA','NA','NA','NA')));
  }
  }
}

changePage()


// Busquedas compuestas