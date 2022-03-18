
let h = document.getElementById("search");

[].forEach.call(
  browserDocument = document.querySelectorAll("html div #search h3"),
  function (el) {
    let text = el.textContent;

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

    function Keywords(text){
      let words = text.split(' ')
      let number = Math.floor(Math.random() * words.length);
      return words[number];
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
        ` - ${Math.floor(Math.random()*100)}% level of trust -  Keywords: ${Keywords(text)},  ${Keywords(text)},  ${Keywords(text)},  ${Keywords(text)}</p>
    `
    );
  }
);
