
let h = document.getElementById("search");

// fetch();


// fetch("https://instagram.fbog4-1.fna.fbcdn.net/v/t51.2885-15/274993184_354708049705462_5251794527509873135_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fbog4-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=Ny_-26Xs8wYAX-hmUIx&tn=rcDQeKrH2J8B4ff_&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8hA0CVXdb_6riKVcn51tty8Txe-ueqS54bPLsPf4zvlQ&oe=62489FD1&_nc_sid=86f79a", {
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET",
//   "mode": "cors",
//   "credentials": "omit"
// });


[].forEach.call(
  browserDocument = document.querySelectorAll("html div #search h3"),
  function (el) {
    let text = el.textContent;
    let words = text.split(' ')

    let stringToColour = function (str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = "#";
      for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    };

    function Keywords(words){
      let number = Math.floor(Math.random() * words.length);
      if(words[number].length > 1)
        return words[number];
      else
        return Keywords(words)
    }
    el.insertAdjacentHTML(
      "afterend",
      `
        <div style="display: inline-flex;">
        <span class="Dashboard-ball">
          <p>${text[0]}</p>
        </span>
        </div>
        <p class="Surfi-text">Category: ` + text[0] +
        ` - ${Math.floor(Math.random()*100)}% level of trust -  Keywords: ${Keywords(words)},  ${Keywords(words)},  ${Keywords(words)},  ${Keywords(words)}</p>
    `
    );
  }
);


// Busquedas compuestas