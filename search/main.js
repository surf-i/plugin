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
      console.log("aca")
      this.category = 'Not rated';
    }
    else if (category == "BUSINESS/ORG")
    {
      this.category = 'Business'
    }
    else if(category == "RESEARCH")
    {
      this.category = 'Research';
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

async function isBlacklisted(url) {
  let blacklist = await chrome.runtime.sendMessage({ msg: "getBlacklist" });
  return blacklist.includes(url)
}

async function getFormattedUrl(url)
{
  let documento = document.createElement('a')
  documento.href = url
  let host =  "https://"+documento.hostname
  if (await isBlacklisted(host))
  {
      return decodeURI(host)
  }
  else
  {
      return decodeURI(url)
  }
}

var linksElements = new Map();
let webSearchs = document.querySelectorAll("html div #search .g");
for(element of webSearchs)
{
    let elementLink = element.querySelector('a')
    let url = decodeURI(String(elementLink))
    //let url = await getFormattedUrl(link)
    console.log("Link: "+url)
    linksElements.set(url,element);
};

//Send requests with the array of links
var surfiRequest = new Map();
async function getMultipleWebsites(links){
     let url = "https://44.195.183.116"
     let string =""
     let contador = true;
     for (let link of links) 
     {
       if (contador)
       {
         contador = false;
         string+="?url="+link;
       }
        else
        {
        string += "&url="+link
        }
     }
     const response = await fetch(url+'/websites/multiple/'+string);
     let res = await response.json()
     if (res ==null)
     {
       return surfiRequest;
     }
     for (let element of res)
     {
      console.log("URL: "+element.url+"  Categoria "+element.categoria)
      surfiRequest.set(element.url,new surfiAddon(element.categoria,Math.round(element.calificacionPromedio*10)/10,element.autor,element.fecha,Math.round(element.gradoVeracidadPromedio)));
      console.log("Surfi Requestcategoria: "+surfiRequest.get(element.url).category);
     }
     return surfiRequest;
} 



async function changePage()
{
  console.log(linksElements)
  var surfiReq = await getMultipleWebsites(linksElements.keys());
  console.log(surfiReq)
  let aux =[]
  for (key of surfiReq.keys())
  {
    aux.push(key);
    console.log("LLLLLL>"+key)
  } 
  for(let link of linksElements.keys())
  { 
    //console.log("probando surfiReq"+surfiReq.get(link).category);
    console.log("Link2: "+link);
    let element = linksElements.get(link);
    // try
    // {
    //   console.log("Link3: "+surfiReq.get(link).category);
    //   element.insertAdjacentHTML("afterbegin",surfiSearch(surfiReq.get(link)));
    // }
    // catch(err)
    // {
    //   element.insertAdjacentHTML("afterbegin",surfiSearch(new surfiAddon('Not rated','NA','NA','NA','NA')));
    // }
    console.log("aca")
    if (aux.includes(link))
    {
      console.log("PORFIN")
      console.log("Link3: "+surfiReq.get(link).category);
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

