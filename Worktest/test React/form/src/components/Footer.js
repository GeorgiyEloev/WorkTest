import React from "react";

function Footer({ name, item }) {
  return (
    <div>
      <h3>
        Вы выбрали фильмы категории {name}, {item} года
      </h3>
    </div>
  );
}

export default Footer;
