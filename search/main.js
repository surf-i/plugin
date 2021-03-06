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
class surfiAddon
{
  constructor(category,rating,author,date,veracity)
  {
    this.category = category.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
    console.log('[CATEGORY]',this.category)
    this.rating = rating? rating: 'NA'
    this.author = author != null? author: 'NA'
    this.date = date != null ? date.replace("-","/") :'NA'
    this.veracity = veracity? veracity: 'NA' 

    if(this.category == 'Business/org'){
      this.category = 'Business'
    }
  }
}

async function isBlacklisted(url) {
  let blacklist = await chrome.runtime.sendMessage({ msg: "getBlacklist" });
  return blacklist.includes(url)
}

async function getFormattedUrl(url)
{
  let element = document.createElement('a')
  element.href = url
  let host =  "https://"+element.hostname
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
async function main(){
  let webSearchs = document.querySelectorAll("html div #search .g");
  for(element of webSearchs)
  {
      let elementLink = element.querySelector('a')
      let link = decodeURI(String(elementLink))
      if (link.charAt(link.length - 1)=='/')
      {
        link = link.substring(0,link.length-1)
      }
      try
      {
      let url = await getFormattedUrl(link)
      console.log("Link: "+url)
      linksElements.set(url,element);
      }
      catch(err)
      {
        console.log("Error: "+err)
      }
  };
  try
  {
    var surfiReq = await getMultipleWebsites(linksElements.keys());
    let aux =[]
    for (key of surfiReq.keys())
    {
      aux.push(key);
    } 
    for(let link of linksElements.keys())
    { 
      console.log("Link2: "+link);
      let element = linksElements.get(link);
      if (aux.includes(link))
      {
        console.log("Link3: "+surfiReq.get(link).category);
        element.insertAdjacentHTML("afterbegin",surfiSearch(surfiReq.get(link)));
      }
      else
      {
        element.insertAdjacentHTML("afterbegin",surfiSearch(new surfiAddon('NOT RATED','NA','NA','NA','NA')));
      }
    }
  }
  catch(err)
  {
    throw new Error("Error: "+err)
  }
}
main()
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
     }
     console.log('HELLO')
     return surfiRequest;
}