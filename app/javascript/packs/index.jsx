// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import { render } from "react-dom";
import App from "../components/App";

document.addEventListener('DOMContentLoaded', () => {
  if (!!document.getElementById("123123")) {
    // Coming here means that there is already such a child in the DOM with id being "123"
    return
  }
  const element = document.createElement("div");
  element.id = "123123";
  render(<App />, document.body.appendChild(element))
});
