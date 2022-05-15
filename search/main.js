let surfiSearch = (element) =>{
  return /*html*/`
  <div class="surfiSearch">
    <div class="searchCategory ${element.category.replace(/ /, c => '_')}">
      <p class="searchCategoryTitle">${element.category.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))}</p>
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
    <p class="searchParagraph date">Fecha:${element.date}</p>
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
    //Category
    if (category == "NOT RATED")
    {
      this.category = 'Not rated';
    }
    else
    {
      this.category = category;
    }
    //Rating
    if (rating != null)
    {
      this.rating = rating
    }
    else
    {
      this.rating = 'NA';
    }
    //Author
    if (author != null)
    {
      this.author = author;
    }
    else
    {
      this.author = 'NA';
    
    }
    //Date
    if (date != null)
    {
      this.date = date.replace("-","/");
    }
    else
    {
      this.date = "NA";
    }
    //Veracity
    if (veracity != null)
    {
      this.veracity = veracity;
    }
    else
    {
      this.veracity = "NA";
    } 
    
  }
}

var linksElements = new Map();
let webSearchs = document.querySelectorAll("html div #search .g");
for(element of webSearchs)
{
    let link = element.querySelector('a')
    link = getFormatedUrl(link.href)
    console.log(link)
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
      console.log("URL: "+element.url+"  Categoria "+element.category)
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
      element.insertAdjacentHTML("afterbegin",surfiSearch(new surfiAddon('Not rated','NA','NA','NA','NA')));
    }
  }
}

changePage()


// Busquedas compuestas