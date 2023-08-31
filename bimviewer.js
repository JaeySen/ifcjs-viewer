import { IfcViewerAPI } from "web-ifc-viewer";
import {
  createCheckboxes,
  createIfcTreeMenu,
  createIfcPropertyMenu,
  createVersionControlPanel,
  toolbarBottom,
  toolbarTop,
  createHelpInfo,
} from "./overlay.js";

import { projects } from "./projects.js";

import {
  //need to load additional ifc entities or remove filter
  IFCWALL,
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCDOOR,
  IFCWINDOW,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
  IFCSPACE,
  IFCSITE,
  IFCROOF,
  IFCBUILDINGELEMENTPROXY,
} from "web-ifc";

// import * as OBC from 'openbim-components';


import { Color, Vector3, Vector4, Matrix4, MeshLambertMaterial, Mesh, DirectionalLight,
  AmbientLight,
  PerspectiveCamera,
  WebGLRenderer,
  Scene } from "three";

// List of categories names
const categories = {
  IFCWALL,
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCFURNISHINGELEMENT,
  IFCDOOR,
  IFCWINDOW,
  IFCPLATE,
  IFCMEMBER,
  IFCSPACE,
  IFCSITE,
  IFCROOF,
  IFCBUILDINGELEMENTPROXY,
};

const viewerDiv = document.getElementById("viewer-container-primary");
const viewer2Div = document.getElementById("viewer-container-secondary");

const viewer = CreateViewer(viewerDiv);
const viewer2 = CreateViewer(viewer2Div);

function CreateViewer(container) {
  let viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
  viewer.axes.setAxes();
  // viewer.grid.setGrid();

  return viewer;
}

const currentUrl = window.location.href;
const url = new URL(currentUrl);
const currentProjectID = url.searchParams.get("id"); //bimserver project id - use this to get latest revision etc

var model; 

async function loadIfc(url) {
  // Load the model
  model = await viewer.IFC.loadIfcUrl(url);

  // await viewer.shadowDropper.renderShadow(model.modelID);
  // viewer.context.renderer.postProduction.active = true;

  model.removeFromParent(); //for ifc categories filter

  const model2 = await viewer2.IFC.loadIfcUrl(url); 

  // await viewer2.shadowDropper.renderShadow(model2.modelID);
  // viewer2.context.renderer.postProduction.active = true;

  // model2.removeFromParent(); //for ifc categories filter

  // console.log(viewer, viewer2);

  const ifcProject = await viewer.IFC.getSpatialStructure(model.modelID);

  await setupAllCategories(); //for ifc categories filter
  createTreeMenu(ifcProject);
}

const scene = viewer.context.getScene(); //for showing/hiding categories

let path;

for (let proj of projects) {

  if (proj.id === currentProjectID) {
    let fileName = proj.name;
    path = "./models/" + fileName + ".ifc"; // get path into this
    //console.log(path);
  }
}

loadIfc(path);

//UI elements

createIfcPropertyMenu();

const propsGUI = document.getElementById("ifc-property-menu-root");

createIfcTreeMenu();
createCheckboxes();
createHelpInfo();
createVersionControlPanel();
toolbarTop();
toolbarBottom();

var vec3 = new Vector3();

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGluaHR1MDgwNjAxIiwiYSI6ImNsbGxwcnRlcTI4d28zY21rYmh6Z205eHQifQ.XyjAMhumCi9ztQYI-1jLSw";
const map = new mapboxgl.Map({
  container: "map", // chứa map
  style: "mapbox://styles/mapbox/streets-v11", // style url
  zoom: 17.48, // mức zoom
  center: [106.7188358, 10.7886464], // toạ độ khi map render lần đầu
  pitch: 75, // góc nghiêng của map
  bearing: -80, // góc quay của bản đồ
  antialias: true,
});

const modelOrigin = [106.7188358, 10.7886464];
const modelAltitude = 0;
const modelRotate = [Math.PI / 2, 0.72, 0];

// translate to map coordinates
const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
  modelOrigin,
  modelAltitude
);

const modelTransform = {
  translateX: modelAsMercatorCoordinate.x,
  translateY: modelAsMercatorCoordinate.y,
  translateZ: modelAsMercatorCoordinate.z,
  rotateX: modelRotate[0],
  rotateY: modelRotate[1],
  rotateZ: modelRotate[2],
  scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
};

const mapScene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({
  // here we inject our Three.js mapScene into Mapbox
  canvas: map.getCanvas(),
  antialias: true,
});
renderer.autoClear = false;

const customLayer = {
  id: "3d-model",
  type: "custom",
  renderingMode: "3d",

  onAdd: function () {
    //load model
    const ifcLoader = new IFCLoader();
    ifcLoader.ifcManager.setWasmPath("./");
    ifcLoader.load(path, function (model) {
      mapScene.add(model);
    });

    //add lighting
    const directionalLight = new DirectionalLight(0x404040);
    const directionalLight2 = new DirectionalLight(0x404040);
    const ambientLight = new AmbientLight(0x404040, 3);
    directionalLight.position.set(0, -70, 100).normalize();
    directionalLight2.position.set(0, 70, 100).normalize();

    mapScene.add(directionalLight, directionalLight2, ambientLight);
  },

  render: function (gl, matrix) {
    //apply model transformations
    const rotationX = new Matrix4().makeRotationAxis(
      new Vector3(1, 0, 0),
      modelTransform.rotateX
    );
    const rotationY = new Matrix4().makeRotationAxis(
      new Vector3(0, 1, 0),
      modelTransform.rotateY
    );
    const rotationZ = new Matrix4().makeRotationAxis(
      new Vector3(0, 0, 1),
      modelTransform.rotateZ
    );

    const m = new Matrix4().fromArray(matrix);
    const l = new Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ
      )
      .scale(
        new Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale
        )
      )
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    camera.projectionMatrix = m.multiply(l);
    renderer.resetState();
    renderer.render(mapScene, camera);
    map.triggerRepaint();
  },
};

map.on("style.load", () => {
  map.addLayer(customLayer, "waterway-label");
});

const screenShotDiv = document.getElementById("screenshot");
const screenShotButton = document.getElementById("screenShotButton");
screenShotButton.onmousedown = async () => {
  const screenShotUrl = await viewer.context.renderer.newScreenshot();
  // console.log(screenShotUrl);
  screenShotDiv.style.backgroundImage = `url(${screenShotUrl})`
}

//select IFC elements
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();


viewerDiv.onwheel = (e) => {
  viewer2.context.ifcCamera.cameraControls.enabled = false;
  const camPos = viewer.context.ifcCamera.cameraControls.getPosition(vec3);
  viewer2.context.getCamera().position.set(camPos.x, camPos.y, camPos.z);

}

viewerDiv.onmousedown = (e) => {
  viewer.context.ifcCamera.cameraControls.enabled = true;
  viewer2.context.ifcCamera.cameraControls.enabled = true;
  if (e.button === 0) {
    viewerDiv.onmousemove = () => {
      let vecc = new Vector3();

      const vecPos = viewer.context.ifcCamera.cameraControls.getPosition(vec3);
      const vecView = viewer.context.ifcCamera.cameraControls.getTarget(vecc);
      viewer2.context.ifcCamera.cameraControls.setLookAt(vecPos.x, vecPos.y, vecPos.z, vecView.x, vecView.y, vecView.z);
    }
  } else if (e.button === 2) {
    viewerDiv.onmousemove = () => {
      const vecPos = viewer.context.ifcCamera.cameraControls.getPosition(vec3);
      viewer2.context.ifcCamera.cameraControls.enabled = false;
      viewer2.context.getCamera().position.set(vecPos.x, vecPos.y, vecPos.z);
    }

  }
}

viewer2Div.onmousedown = (e) => {
  viewer.context.ifcCamera.cameraControls.enabled = true;
  viewer2.context.ifcCamera.cameraControls.enabled = true;
  if (e.button === 0) {
    viewer2Div.onmousemove = () => {
      // viewer2.context.ifcCamera.cameraControls.addEventListener("update", (e) => {
      //   let vecc = new Vector3();
      //   const vecPos = viewer2.context.ifcCamera.cameraControls.getPosition(vec3);
      //   const vecView = viewer2.context.ifcCamera.cameraControls.getTarget(vecc);
      //   viewer.context.ifcCamera.cameraControls.setLookAt(vecPos.x, vecPos.y, vecPos.z, vecView.x, vecView.y, vecView.z);
      // })
      // TODO: add update only event, onmousedown is not exit when inside onmousemove
      let vecc = new Vector3();
      const vecPos = viewer2.context.ifcCamera.cameraControls.getPosition(vec3);
      const vecView = viewer2.context.ifcCamera.cameraControls.getTarget(vecc);
      viewer.context.ifcCamera.cameraControls.setLookAt(vecPos.x, vecPos.y, vecPos.z, vecView.x, vecView.y, vecView.z);

    }
  } else if (e.button === 2) {
    viewer2Div.onmousemove = (event = e) => {
      // viewer2.context.ifcCamera.cameraControls.addEventListener("update", (e) => {
      //   const vecPos = viewer2.context.ifcCamera.cameraControls.getPosition(vec3);
      //   viewer.context.ifcCamera.cameraControls.enabled = false;
      //   viewer.context.getCamera().position.set(vecPos.x, vecPos.y, vecPos.z);
      // })
      const vecPos = viewer2.context.ifcCamera.cameraControls.getPosition(vec3);
      viewer.context.ifcCamera.cameraControls.enabled = false;
      viewer.context.getCamera().position.set(vecPos.x, vecPos.y, vecPos.z);
    }
  }

} 

viewer2Div.onwheel = (e) => {
  viewer.context.ifcCamera.cameraControls.enabled = false;
  const camPos = viewer2.context.ifcCamera.cameraControls.getPosition(vec3);
  viewer.context.getCamera().position.set(camPos.x, camPos.y, camPos.z);

}

const spans = document.querySelectorAll("span.caret");

for (const span of spans) {
  span.addEventListener("click", (event) => {
    console.log(event)
  })
}

propertiesButton.onmousedown = () => {
  if (propertiesButton.classList.contains("active")) {
    viewer.IFC.selector.unpickIfcItems();
    // viewer.IFC.selector.unHighlightIfcItems();

  }
}

window.ondblclick = async () => {
  const result = await viewer.IFC.selector.pickIfcItem(); //highlightIfcItem hides all other elements
  if (!result) return;
  const { modelID, id } = result;
  const props = await viewer.IFC.getProperties(modelID, id, true, false);

  createPropertiesMenu(props);

  document.getElementById("ifc-property-menu").style.display = "initial";
  propertiesButton.classList.add("active");

  if (clippingPlanesActive) {
    viewer.clipper.createPlane();
  }

  if (measurementsActive) {
    viewer.dimensions.create();
  }
};

const xrayButton = document.getElementById("XRayButton");
let XRayButtonActive = false;
xrayButton.onclick = () => {

  XRayButtonActive = !XRayButtonActive;
  // viewer.clipper.active = XRayButtonActive;
  let meshArr = new Array();
  meshArr = [...scene.children].filter(ent => ent.isMesh);

  if (XRayButtonActive) {
    xrayButton.classList.add("active");
    meshArr.forEach(mesh => {
      scene.remove(mesh);
    });
  
    viewer.IFC.loader.load(path, (ifcModel) => {
      console.log("ifcModel", ifcModel);
      ifcModel.visible = false;
  
      const modelCopy = new Mesh(
        ifcModel.geometry,
        new MeshLambertMaterial({
          transparent: true,
          opacity: 0.1,
          color: 0x77aaff,
        })
      );
    
      // scene.add(ifcModel);
      scene.add(modelCopy);
    });

  } else {
    clipButton.classList.remove("active");
    scene.add(model);
  }
}

//set up clipping planes
const clipButton = document.getElementById("clipPlaneButton");

let clippingPlanesActive = false;
clipButton.onclick = () => {
  clippingPlanesActive = !clippingPlanesActive;
  viewer.clipper.active = clippingPlanesActive;

  if (clippingPlanesActive) {
    //add or remove active class depending on whether button is clicked and clipping planes are active
    clipButton.classList.add("active");
  } else {
    clipButton.classList.remove("active");
  }
};

window.onauxclick = () => {
  if (clippingPlanesActive) {
    viewer.clipper.createPlane();
  }

  if (measurementsActive) {
    viewer.dimensions.create();
  }
};

window.onkeydown = (event) => {
  if (event.code === "Delete" && clippingPlanesActive) {
    // viewer.clipper.deletePlane();
    viewer.clipper.deleteAllPlanes();
  }

  if (event.code === "Delete" && measurementsActive) {
    viewer.dimensions.delete();
  }
};

//notes / annotations

const annotationsButton = document.getElementById("annotationsButton");
let measurementsActive = false;

annotationsButton.onclick = () => {
  // viewer.dimensions.active = true;
  viewer.dimensions.previewActive = true;
  measurementsActive = !measurementsActive;

  if (measurementsActive) {
    annotationsButton.classList.add("active");
  } else {
    annotationsButton.classList.remove("active");
    viewer.dimensions.active = false;
    viewer.dimensions.previewActive = false;
  }
};

//help button
//const helpButton = document.getElementById("help-button");

//IFC tree view
const toggler = document.getElementsByClassName("caret");
for (let i = 0; i < toggler.length; i++) {
  toggler[i].onclick = () => {
    toggler[i].parentElement
      .querySelector(".nested")
      .classList.toggle("tree-active");
    toggler[i].classList.toggle("caret-down");
  };
}

// hiding/filters

// Gets the name of a category
function getName(category) {
  const names = Object.keys(categories);
  return names.find((name) => categories[name] === category);
}

// Gets all the items of a category
async function getAll(category) {
  return viewer.IFC.loader.ifcManager.getAllItemsOfType(0, category, false);
}

// Creates a new subset containing all elements of a category
async function newSubsetOfType(category) {
  const ids = await getAll(category);
  return viewer.IFC.loader.ifcManager.createSubset({
    modelID: 0,
    scene,
    ids,
    removePrevious: true,
    customID: category.toString(),
  });
}

// Stores the created subsets
const subsets = {};

async function setupAllCategories() {
  const allCategories = Object.values(categories);
  for (let i = 0; i < allCategories.length; i++) {
    const category = allCategories[i];
    await setupCategory(category);
  }
}

// Creates a new subset and configures the checkbox
async function setupCategory(category) {
  subsets[category] = await newSubsetOfType(category);
  setupCheckBox(category);
}

// Sets up the checkbox event to hide / show elements
function setupCheckBox(category) {
  const name = getName(category);
  const checkBox = document.getElementById(name);
  checkBox.addEventListener("change", (event) => {
    const checked = event.target.checked;
    const subset = subsets[category];
    if (checked) scene.add(subset);
    else subset.removeFromParent();
  });
}

// Spatial tree menu

function createTreeMenu(ifcProject) {
  const root = document.getElementById("tree-root");
  removeAllChildren(root);
  const ifcProjectNode = createNestedChild(root, ifcProject);
  ifcProject.children.forEach((child) => {
    constructTreeMenuNode(ifcProjectNode, child);
  });
}

function nodeToString(node) {
  return `${node.type} - ${node.expressID}`;
}

function constructTreeMenuNode(parent, node) {
  const children = node.children;
  if (children.length === 0) {
    createSimpleChild(parent, node);
    return;
  }
  const nodeElement = createNestedChild(parent, node);
  children.forEach((child) => {
    constructTreeMenuNode(nodeElement, child);
  });
}

function createNestedChild(parent, node) {
  const content = nodeToString(node);
  const root = document.createElement("li");
  createTitle(root, content);
  const childrenContainer = document.createElement("ul");
  childrenContainer.classList.add("nested");
  const checkboxDiv = document.createElement("div");
  checkboxDiv.style = "display: inline-block; padding: 0 5px"
  const hideCheckbox = document.createElement("input");
  hideCheckbox.setAttribute("type", "checkbox");
  hideCheckbox.setAttribute("checked", true);
  checkboxDiv.appendChild(hideCheckbox);
  root.appendChild(checkboxDiv);
  root.appendChild(childrenContainer);
  parent.appendChild(root);
  return childrenContainer;
}

function createTitle(parent, content) {
  const title = document.createElement("span");
  title.classList.add("caret");
  title.onclick = () => {
    title.parentElement
      .querySelector(".nested")
      .classList.toggle("tree-active");
    title.classList.toggle("caret-down");
  };
  title.textContent = content;
  parent.appendChild(title);
}

function createSimpleChild(parent, node) {
  const content = nodeToString(node);
  const childNode = document.createElement("li");
  childNode.classList.add("leaf-node");
  childNode.textContent = content;
  parent.appendChild(childNode);

  childNode.onmouseenter = () => {
    viewer.IFC.selector.prepickIfcItemsByID(0, [node.expressID]);
  };

  childNode.onclick = async () => {
    viewer.IFC.selector.pickIfcItemsByID(0, [node.expressID], true);

    let idsArray = [node.expressID];

    const props = await viewer.IFC.getProperties(0, idsArray[0], true, false);
    //console.log(props); //call the function here
    createPropertiesMenu(props);
    document.getElementById("ifc-property-menu").style.display = "initial";
    propertiesButton.classList.add("active");
  };
}

//IFC properties menu functions
function createPropertiesMenu(properties) {

  removeAllChildren(propsGUI);

  delete properties.psets;
  delete properties.mats;
  delete properties.type;

  for (let key in properties) {
    createPropertyEntry(key, properties[key]);
  }
}

function createPropertyEntry(key, value) {
  const propContainer = document.createElement("div");
  propContainer.classList.add("ifc-property-item");

  if (value === null || value === undefined) value = "undefined";
  else if (value.value) value = value.value;

  const keyElement = document.createElement("div");
  keyElement.textContent = key;
  propContainer.appendChild(keyElement);

  const valueElement = document.createElement("div");
  valueElement.classList.add("ifc-property-value");
  valueElement.textContent = value;
  propContainer.appendChild(valueElement);

  propsGUI.appendChild(propContainer);
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
