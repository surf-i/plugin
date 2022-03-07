let h = document.getElementById("search");

[].forEach.call(
  document.querySelectorAll("html div #search h3"),
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

    el.insertAdjacentHTML(
      "afterend",
      `
        <div style="display: inline-flex;">
        <span style='margin-left:2px;height: 13px;width: 13px; background-color:` +
        stringToColour(text) +
        `; border-radius: 50%;'>
        </span>
        </div>
        <p style="margin:0; font-size: 14px">Category: ` +
        text[0] +
        ` - 5% level of trust -  Keywords: cafe, surf, mountain, technology</p>
    `
    );
  }
);
