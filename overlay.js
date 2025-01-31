//UI functions

// const document.body = document.getElementById("layer-toolbar");

export function modelName(modelName) {
  const modelNameContainer = document.createElement("div");
  modelNameContainer.className = "simple-card-container top";

  const modelTitle = document.createElement("div");
  modelTitle.className = "simple-card";

  modelTitle.textContent = modelName;

  modelNameContainer.appendChild(modelTitle);
  document.body.appendChild(modelNameContainer);
}

export function toolbarTop() {
  const cardContainer = document.createElement("div");
  cardContainer.className = "simple-card-container-home top left";
  cardContainer.id = "simple-card-container-home-top";

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  toolbar.appendChild(homeButton());

  cardContainer.appendChild(toolbar);

  document.body.appendChild(cardContainer);
}

export function toolbarBottom() {
  const cardContainer = document.createElement("div");
  cardContainer.className = "simple-card-container bottom";

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  toolbar.appendChild(screenShotButton());
  toolbar.appendChild(XRayButton());
  toolbar.appendChild(versionControlButton());
  toolbar.appendChild(treeButton());
  toolbar.appendChild(filterButton());
  toolbar.appendChild(clipPlaneButton());
  toolbar.appendChild(annotationsButton());
  toolbar.appendChild(propertiesButton());
  toolbar.appendChild(helpButton());

  cardContainer.appendChild(toolbar);

  document.body.appendChild(cardContainer);
}

// UI categories functions

function checkbox(category, text) {
  const checkbox = document.createElement("div");
  checkbox.className = "checkbox-item";

  const checkboxTextDiv = document.createElement("div");
  checkboxTextDiv.style = "flex-grow: 1";

  const checkboxInput = document.createElement("input");
  checkboxTextDiv.textContent = text;

  const checkboxInputDiv = document.createElement("div");
  checkboxInputDiv.className = "checkbox-value";

  checkboxInput.checked = true;
  checkboxInput.id = category;
  checkboxInput.type = "checkbox";

  checkboxInputDiv.appendChild(checkboxInput);
  checkbox.appendChild(checkboxTextDiv);
  checkbox.appendChild(checkboxInputDiv);

  return checkbox;
}

export function createCheckboxes() {
  const checkboxes = document.createElement("div");
  checkboxes.className = "checkboxes";
  checkboxes.id = "checkboxes";
  checkboxes.style.display = "none";

  let categoriesName = [
    "Walls",
    "Walls (standard case)",
    "Slabs",
    "Furniture",
    "Doors",
    "Windows",
    "Curtain wall plates",
    "Curtain wall structure",
    "Spaces",
    "Site",
    "Roofs",
    "Other",
  ];

  const categoriesText = [
    "IFCWALL",
    "IFCWALLSTANDARDCASE",
    "IFCSLAB",
    "IFCFURNISHINGELEMENT",
    "IFCDOOR",
    "IFCWINDOW",
    "IFCPLATE",
    "IFCMEMBER",
    "IFCSPACE",
    "IFCSITE",
    "IFCROOF",
    "IFCBUILDINGELEMENTPROXY",
  ];

  for (let i = 0; i < categoriesText.length; i++) {
    checkboxes.appendChild(checkbox(categoriesText[i], categoriesName[i]));
  }

  document.body.appendChild(checkboxes);
}

export function createCardDiv(projectName, projectId) {
  const card = document.createElement("div");
  card.className = "card";

  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", "24");
  svgElement.setAttribute("height", "24");
  svgElement.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "m3.514 6.636c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508zm15.986 2.115v7.525l-6.75 3.722v-7.578zm-14.264-1.344 6.764-3.813 6.801 3.834-6.801 3.716z"
  );

  svgElement.appendChild(path1);
  card.appendChild(svgElement);

  const h2Element = document.createElement("h2");
  h2Element.textContent = projectName;

  card.appendChild(h2Element);

  const button = document.createElement("a");
  button.className = "button";
  button.href = "./bimviewer.html" + `?id=${projectId}`;
  //button.href= projectId; //also needs to be an input
  button.textContent = "Model";

  card.appendChild(button);

  const projectContainer = document.getElementById("projects-container");
  projectContainer.appendChild(card);
}

function homeButton() {
  const homeButton = document.createElement("button");
  homeButton.className = "homebutton";

  homeButton.setAttribute("onclick", "window.location.href='./index.html';");

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "50");
  svgEl.setAttribute("height", "50");
  svgEl.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"
  );

  svgEl.appendChild(path1);
  homeButton.appendChild(svgEl);

  return homeButton;
}

function filterButton() {
  const filterButton = document.createElement("button");
  filterButton.className = "button";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M19.479 2l-7.479 12.543v5.924l-1-.6v-5.324l-7.479-12.543h15.958zm3.521-2h-23l9 15.094v5.906l5 3v-8.906l9-15.094z"
  );

  svgEl.appendChild(path1);
  filterButton.appendChild(svgEl);

  filterButton.addEventListener(
    "click",
    function () {
      if (document.getElementById("checkboxes").style.display === "initial") {
        document.getElementById("checkboxes").style.display = "none";
        filterButton.classList.remove("active");
      } else if (
        document.getElementById("checkboxes").style.display === "none"
      ) {
        document.getElementById("checkboxes").style.display = "initial";
        filterButton.classList.add("active");
      }
    },
    false
  );

  return filterButton;
}

function propertiesButton() {
  const propertiesButton = document.createElement("button");
  propertiesButton.className = "button";
  propertiesButton.id = "propertiesButton";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z"
  );

  svgEl.appendChild(path1);
  propertiesButton.appendChild(svgEl);

  propertiesButton.addEventListener(
    "click",
    function () {
      if (
        document.getElementById("ifc-property-menu").style.display === "initial"
      ) {
        document.getElementById("ifc-property-menu").style.display = "none";
        propertiesButton.classList.remove("active");
      } else if (
        document.getElementById("ifc-property-menu").style.display === "none"
      ) {
        document.getElementById("ifc-property-menu").style.display = "initial";
        propertiesButton.classList.add("active");
      }
    },
    false
  );

  return propertiesButton;
}

function clipPlaneButton() {
  const clipPlaneButton = document.createElement("button");
  clipPlaneButton.className = "button";
  clipPlaneButton.id = "clipPlaneButton";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M14.686 13.646l-6.597 3.181c-1.438.692-2.755-1.124-2.755-1.124l6.813-3.287 2.539 1.23zm6.168 5.354c-.533 0-1.083-.119-1.605-.373-1.511-.731-2.296-2.333-1.943-3.774.203-.822-.23-.934-.891-1.253l-11.036-5.341s1.322-1.812 2.759-1.117c.881.427 4.423 2.136 7.477 3.617l.766-.368c.662-.319 1.094-.43.895-1.252-.351-1.442.439-3.043 1.952-3.77.521-.251 1.068-.369 1.596-.369 1.799 0 3.147 1.32 3.147 2.956 0 1.23-.766 2.454-2.032 3.091-1.266.634-2.15.14-3.406.75l-.394.19.431.21c1.254.614 2.142.122 3.404.759 1.262.638 2.026 1.861 2.026 3.088 0 1.64-1.352 2.956-3.146 2.956zm-1.987-9.967c.381.795 1.459 1.072 2.406.617.945-.455 1.405-1.472 1.027-2.267-.381-.796-1.46-1.073-2.406-.618-.946.455-1.408 1.472-1.027 2.268zm-2.834 2.819c0-.322-.261-.583-.583-.583-.321 0-.583.261-.583.583s.262.583.583.583c.322.001.583-.261.583-.583zm5.272 2.499c-.945-.457-2.025-.183-2.408.611-.381.795.078 1.814 1.022 2.271.945.458 2.024.184 2.406-.611.382-.795-.075-1.814-1.02-2.271zm-18.305-3.351h-3v2h3v-2zm4 0h-3v2h3v-2z"
  );

  svgEl.appendChild(path1);
  clipPlaneButton.appendChild(svgEl);

  return clipPlaneButton;
}

function screenShotButton() {
  const screenShotButton = document.createElement("button");
  screenShotButton.className = "button";
  screenShotButton.id = "screenShotButton";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 512 512");
  // svgEl.setAttribute("fill", "#000000");
  
  const g1 = document.createElement("g");
  g1.id = "Page-1";
  g1.setAttribute("stroke", "none");
  g1.setAttribute("stroke-width", "1");
  g1.setAttribute("fill", "none");
  g1.setAttribute("fill-rule", "evenodd");

  const g2 = document.createElement("g");
  g2.id = "drop";
  g2.setAttribute("fill", "#000000");
  g2.setAttribute("transform", "translate(42.666667, 42.666667)");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M106.666667,7.10542736e-15 L106.666667,64 L362.666667,64 L362.666667,320 L426.666667,320 L426.666667,362.666667 L362.666667,362.666667 L362.666667,426.666667 L320,426.666667 L320,362.666667 L64,362.666667 L64,7.10542736e-15 L106.666667,7.10542736e-15 Z M166.336,232.64 L106.666,296.422 L106.666667,320 L320,320 L320,308.725 L274.432,263.168 L235.659405,301.959634 L166.336,232.64 Z M320,106.666667 L106.666667,106.666667 L106.666,233.982 L165.332883,171.293333 L235.648,241.621333 L274.447284,202.831976 L320,248.385 L320,106.666667 Z M245.333333,128 C263.006445,128 277.333333,142.326888 277.333333,160 C277.333333,177.673112 263.006445,192 245.333333,192 C227.660221,192 213.333333,177.673112 213.333333,160 C213.333333,142.326888 227.660221,128 245.333333,128 Z M64,64 L64,106.666667 L7.10542736e-15,106.666667 L7.10542736e-15,64 L64,64 Z"
  );
  path1.id = "Combined-Shape";

  g2.appendChild(path1);
  g1.appendChild(g2);
  svgEl.appendChild(g1);
  screenShotButton.appendChild(svgEl);

  return screenShotButton;
}

function XRayButton() {
  const XRayButton = document.createElement("button");
  XRayButton.className = "button";
  XRayButton.id = "XRayButton";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 60 60");
  svgEl.setAttribute("fill", "#000000");
  // svgEl.setAttribute("transform", "rotate(270 0 0)");
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M52,0v3c-0.553,0-1,0.447-1,1s0.447,1,1,1v3h3c0,0.553,0.447,1,1,1s1-0.447,1-1h3V0H52z M58,6h-4V2h4V6z"
  );

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M5,22c0-0.553-0.447-1-1-1s-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1V22z"
  );
  const path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path3.setAttribute(
    "d",
    "M4,46c-0.553,0-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1v-1C5,46.447,4.553,46,4,46z"
  );

  const path4 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path4.setAttribute(
    "d",
    "M5,12c0-0.553-0.447-1-1-1s-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1V12z"
  );
  const path5 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path5.setAttribute(
    "d",
    "M5,27c0-0.553-0.447-1-1-1s-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1V27z"
  );

  const path6 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path6.setAttribute(
    "d",
    "M4,9c0.553,0,1-0.447,1-1h3V5c0.553,0,1-0.447,1-1S8.553,3,8,3V0H0v8h3C3,8.553,3.447,9,4,9z M2,6V2h4v4H2z"
  );
  const path7 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path7.setAttribute(
    "d",
    "M5,42c0-0.553-0.447-1-1-1s-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1V42z"
  );

  const path8 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path8.setAttribute(
    "d",
    "M5,32c0-0.553-0.447-1-1-1s-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1V32z"
  );
  const path9 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path9.setAttribute(
    "d",
    "M5,37c0-0.553-0.447-1-1-1s-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1V37z"
  );

  const path10 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path10.setAttribute(
    "d",
    "M5,17c0-0.553-0.447-1-1-1s-1,0.447-1,1v1c0,0.553,0.447,1,1,1s1-0.447,1-1V17z"
  );
  const path11 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path11.setAttribute(
    "d",
    "M22,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S21.447,5,22,5z"
  );

  const path12 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path12.setAttribute(
    "d",
    "M12,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S11.447,5,12,5z"
  );
  const path13 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path13.setAttribute(
    "d",
    "M17,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S16.447,5,17,5z"
  );

  const path14 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path14.setAttribute(
    "d",
    "M27,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S26.447,5,27,5z"
  );
  const path15 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path15.setAttribute(
    "d",
    "M32,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S31.447,5,32,5z"
  );

  const path16 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path16.setAttribute(
    "d",
    "M47,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S46.447,5,47,5z"
  );
  const path17 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path17.setAttribute(
    "d",
    "M37,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S36.447,5,37,5z"
  );

  const path18 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path18.setAttribute(
    "d",
    "M42,5h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S41.447,5,42,5z"
  );
  const path19 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path19.setAttribute(
    "d",
    "M56,14c0.553,0,1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1v1C55,13.553,55.447,14,56,14z"
  );

  const path20 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path20.setAttribute(
    "d",
    "M55,23c0,0.553,0.447,1,1,1s1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1V23z"
  );
  const path21 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path21.setAttribute(
    "d",
    "M56,51c-0.553,0-1,0.447-1,1h-1.318L45,29.811V23h-8v3H23v-3h-8v6.811L6.317,52H5c0-0.553-0.447-1-1-1s-1,0.447-1,1H0v8h8v-3h44v3h8v-8h-3C57,51.447,56.553,51,56,51z M39,25h4v4h-4v-3V25z M17,25h4v1v3h-4V25z M6,58H2v-4h4v3V58z M8,55v-1.812L16.683,31		H23v-3h14v3h6.317L52,53.188V55H8z M58,54v4h-4v-1v-3H58z"
  );

  const path22 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path22.setAttribute(
    "d",
    "M55,18c0,0.553,0.447,1,1,1s1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1V18z"
  );
  const path23 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path23.setAttribute(
    "d",
    "M55,28c0,0.553,0.447,1,1,1s1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1V28z"
  );

  const path24 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path24.setAttribute(
    "d",
    "M55,38c0,0.553,0.447,1,1,1s1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1V38z"
  );
  const path25 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path25.setAttribute(
    "d",
    "M55,48c0,0.553,0.447,1,1,1s1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1V48z"
  );

  const path26 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path26.setAttribute(
    "d",
    "M55,43c0,0.553,0.447,1,1,1s1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1V43z"
  );
  const path27 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path27.setAttribute(
    "d",
    "M55,33c0,0.553,0.447,1,1,1s1-0.447,1-1v-1c0-0.553-0.447-1-1-1s-1,0.447-1,1V33z"
  );

  svgEl.appendChild(path1);
  svgEl.appendChild(path2);
  svgEl.appendChild(path3);
  svgEl.appendChild(path4);
  svgEl.appendChild(path5);
  svgEl.appendChild(path6);
  svgEl.appendChild(path7);
  svgEl.appendChild(path8);
  svgEl.appendChild(path9);
  svgEl.appendChild(path10);
  svgEl.appendChild(path11);
  svgEl.appendChild(path12);
  svgEl.appendChild(path13);
  svgEl.appendChild(path14);
  svgEl.appendChild(path15);
  svgEl.appendChild(path16);
  svgEl.appendChild(path17);
  svgEl.appendChild(path18);
  svgEl.appendChild(path19);
  svgEl.appendChild(path20);
  svgEl.appendChild(path21);
  svgEl.appendChild(path22);
  svgEl.appendChild(path23);
  svgEl.appendChild(path24);
  svgEl.appendChild(path25);
  svgEl.appendChild(path26);
  svgEl.appendChild(path27);


  XRayButton.appendChild(svgEl);

  // XRayButton.addEventListener(
  //   "click",
  //   function () {
  //     if (
  //       document.getElementById("ifc-version-control-menu").style.display === "block"
  //     ) {
  //       document.getElementById("ifc-version-control-menu").style.display = "none";
  //       XRayButton.classList.remove("active");
  //       // document.getElementById("ifc-version-control-menu").innerHTML = "";
  //     } else if (
  //       document.getElementById("ifc-version-control-menu").style.display === "none"
  //     ) {
  //       document.getElementById("ifc-version-control-menu").style.display = "block";
  //       // document.getElementById("ifc-version-control-menu").style.width = "47%";
  //       XRayButton.classList.add("active");
  //     }
  //   },
  //   false
  // );

  return XRayButton;
}

function versionControlButton() {
  const versionControlButton = document.createElement("button");
  versionControlButton.className = "button";
  versionControlButton.id = "versionControlButton";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 15 15");
  svgEl.setAttribute("fill", "none");
  // svgEl.setAttribute("transform", "rotate(270 0 0)");
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.70948 0.85888 4.71836 2 4.94999V9.5C2 11.433 3.567 13 5.5 13H7.29289L6.14645 14.1464L6.85355 14.8536L9.20711 12.5L6.85355 10.1464L6.14645 10.8536L7.29289 12H5.5C4.11929 12 3 10.8807 3 9.5V4.94999C4.14112 4.71836 5 3.70948 5 2.5C5 1.11929 3.88071 0 2.5 0Z"
  );
  path1.setAttribute("fill", "#000000");

  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute(
    "d",
    "M8.85355 0.853554L8.14645 0.146446L5.79289 2.5L8.14645 4.85355L8.85355 4.14645L7.70711 3H9.5C10.8807 3 12 4.11929 12 5.5V10.05C10.8589 10.2816 10 11.2905 10 12.5C10 13.8807 11.1193 15 12.5 15C13.8807 15 15 13.8807 15 12.5C15 11.2905 14.1411 10.2816 13 10.05V5.5C13 3.567 11.433 2 9.5 2H7.70711L8.85355 0.853554Z"
  );
  path2.setAttribute("fill", "#000000");

  svgEl.appendChild(path1);
  svgEl.appendChild(path2);
  versionControlButton.appendChild(svgEl);

  versionControlButton.addEventListener(
    "click",
    function () {
      if (
        document.getElementById("ifc-version-control-menu").style.display === "block"
      ) {
        document.getElementById("ifc-version-control-menu").style.display = "none";
        versionControlButton.classList.remove("active");
        // document.getElementById("ifc-version-control-menu").innerHTML = "";
      } else if (
        document.getElementById("ifc-version-control-menu").style.display === "none"
      ) {
        document.getElementById("ifc-version-control-menu").style.display = "block";
        // document.getElementById("ifc-version-control-menu").style.width = "47%";
        versionControlButton.classList.add("active");
      }
    },
    false
  );

  return versionControlButton;
}

function treeButton() {
  const treeButton = document.createElement("button");
  treeButton.className = "button";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 24 24");
  svgEl.setAttribute("transform", "rotate(270 0 0)");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M22 18v-7h-9v-5h3v-6h-8v6h3v5h-9v7h-2v6h6v-6h-2v-5h7v5h-2v6h6v-6h-2v-5h7v5h-2v6h6v-6z"
  );

  svgEl.appendChild(path1);
  treeButton.appendChild(svgEl);

  treeButton.addEventListener(
    "click",
    function () {
      if (
        document.getElementById("ifc-tree-menu").style.display === "initial"
      ) {
        document.getElementById("ifc-tree-menu").style.display = "none";
        treeButton.classList.remove("active");
        document.getElementById("simple-card-container-home-top").className =
          "simple-card-container-home top left";
      } else if (
        document.getElementById("ifc-tree-menu").style.display === "none"
      ) {
        document.getElementById("ifc-tree-menu").style.display = "initial";
        treeButton.classList.add("active");
        document.getElementById("simple-card-container-home-top").className =
          "simple-card-container top";
      }
    },
    false
  );

  return treeButton;
}

function annotationsButton() {
  const annotationsButton = document.createElement("button");
  annotationsButton.className = "button";
  annotationsButton.id = "annotationsButton";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M0 18.343l5.656 5.657 18.344-18.343-5.657-5.657-18.343 18.343zm21.171-12.686l-15.514 15.514-2.829-2.829 1.04-1.008 2.122 2.122.707-.707-2.122-2.122 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414 1.414 1.414.707-.707-1.414-1.414 1.414-1.414 2.122 2.122.707-.708-2.121-2.122 1.414-1.414 1.414 1.414.707-.707-1.414-1.414 1.414-1.414 1.414 1.414.707-.707-1.414-1.414 1.414-1.415 2.121 2.122.707-.707-2.121-2.122 1.039-1.071 2.829 2.83z"
  );

  svgEl.appendChild(path1);
  annotationsButton.appendChild(svgEl);

  return annotationsButton;
}

function helpButton() {
  const helpButton = document.createElement("button");
  helpButton.className = "button";
  helpButton.id = "help-button";

  const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("width", "15");
  svgEl.setAttribute("height", "15");
  svgEl.setAttribute("viewBox", "0 0 24 24");

  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute(
    "d",
    "M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.119 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z"
  ); //change path

  svgEl.appendChild(path1);
  helpButton.appendChild(svgEl);

  let helpButtonActive = false;

  helpButton.onclick = () => {
    helpButtonActive = !helpButtonActive;
    if (helpButtonActive) {
      helpButton.classList.add("active");
      document.getElementById("helpdoc").style.display = "initial";
    } else {
      helpButton.classList.remove("active");
      document.getElementById("helpdoc").style.display = "none";
    }
  };

  return helpButton;
}

export function createVersionControlPanel() {
  const versionControlDiv = document.createElement("div");
  versionControlDiv.className = "ifc-version-control-menu";
  versionControlDiv.id = "ifc-version-control-menu";
  versionControlDiv.style.display = "none";

  const myTable = document.createElement("table");
  myTable.id = "version-table";
  
  const thead = document.createElement("thead");
  
  const tr = document.createElement("tr");
  
  const nameHead = document.createElement("th");
  nameHead.className = "text-center";
  nameHead.innerHTML = "Model Name";
  nameHead.style = "width:70%";
  const versionHead = document.createElement("th");
  versionHead.className = "text-center"; 
  versionHead.innerHTML = "Version";
  versionHead.style = "width:20%";
  const dateHead = document.createElement("th");
  dateHead.className = "text-center";
  dateHead.innerHTML = "Date";

  const firstRow = document.createElement("tr");

  const firstName = document.createElement("td");
  firstName.innerHTML = "TESTED_Simple_project_01";
  
  const firstVersion = document.createElement("td");
  firstVersion.innerHTML = "V1.0";
  
  const firstDate = document.createElement("td");
  firstDate.innerHTML = "Nov 30 2020";
  
  firstRow.appendChild(firstName);
  firstRow.appendChild(firstVersion);
  firstRow.appendChild(firstDate);

  tr.appendChild(nameHead);
  tr.appendChild(versionHead);
  tr.appendChild(dateHead);

  thead.appendChild(tr);
  myTable.appendChild(thead);
  myTable.append(firstRow);

  versionControlDiv.appendChild(myTable);

  document.body.appendChild(versionControlDiv);
}

export function createIfcTreeMenu() {
  const ifcTreeMenuDiv = document.createElement("div");
  ifcTreeMenuDiv.className = "ifc-tree-menu";
  ifcTreeMenuDiv.id = "ifc-tree-menu";
  ifcTreeMenuDiv.style.display = "none";

  const myUL = document.createElement("ul");
  myUL.id = "myUL";

  const treeRoot = document.createElement("li");
  treeRoot.id = "tree-root";

  const caretSpan = document.createElement("span");
  caretSpan.className = "caret";
  const ulNested = document.createElement("ul");
  ulNested.className = "nested";
  
  treeRoot.appendChild(caretSpan);
  treeRoot.appendChild(ulNested);
  myUL.appendChild(treeRoot);
  ifcTreeMenuDiv.appendChild(myUL);

  document.body.appendChild(ifcTreeMenuDiv);
}

export function createIfcPropertyMenu() {
  const ifcPropertyMenuDiv = document.createElement("div");
  ifcPropertyMenuDiv.className = "ifc-property-menu bottom_right";
  ifcPropertyMenuDiv.id = "ifc-property-menu";
  ifcPropertyMenuDiv.style.display = "none";

  const ifcPropertyItem = document.createElement("div");
  ifcPropertyItem.className = "ifc-property-item";

  const key = document.createElement("div");
  key.innerText = "Property";

  const ifcPropertyValue = document.createElement("div");
  ifcPropertyValue.className = "ifc-property-value";
  ifcPropertyValue.innerText = "Value";

  const ifcPropMenuRoot = document.createElement("div");
  ifcPropMenuRoot.id = "ifc-property-menu-root";

  ifcPropertyItem.appendChild(key);
  ifcPropertyItem.appendChild(ifcPropertyValue);
  ifcPropertyMenuDiv.appendChild(ifcPropertyItem);
  ifcPropertyMenuDiv.appendChild(ifcPropMenuRoot);
  document.body.appendChild(ifcPropertyMenuDiv);
}

export function createHelpInfo() {
  const helpDocDiv = document.createElement("div");
  helpDocDiv.id = "helpdoc";

  helpDocDiv.style.display = "none";

  const helpDocImg = document.createElement("img");
  helpDocImg.src = "./ifcjsapphelp.png";
  helpDocImg.className = "helpdoc helpdoc-position ifc-property-menu";

  helpDocDiv.appendChild(helpDocImg);
  document.body.appendChild(helpDocDiv);
}
