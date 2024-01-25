// fragment bounding box + filters to hide elements + highlight + display properties - editing
import * as THREE from "three";
import * as OBC from "openbim-components";
import * as dat from "dat.gui";


const components = new OBC.Components();
const container = document.getElementById("ifcCanvas");

components.scene = new OBC.SimpleScene(components); // A scene component where our objects will live in 3D.
components.renderer = new OBC.PostproductionRenderer(components, container);
components.camera = new OBC.OrthoPerspectiveCamera(components); //🎥 A camera component that defines where we are and in that 3D world.
components.raycaster = new OBC.SimpleRaycaster(components); //⚡ A raycaster component that makes it possible to interact with that 3D scene with our mouse / touch.
components.init(); //init method. It will start updating all the components at 60 fps, so that you don't have to worry about the animation loop: 🚗
components.renderer.postproduction.enabled = true; // to see if it can be moved next to renderer later on
const scene = components.scene.get(); //  we need a reference to the scene, which you can get with the get() method. This method is present in all the components and is used to get the core of the component
components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
components.scene.setup();

// see what it does later on
const directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(5, 10, 3);
directionalLight.intensity = 0.5;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.5;
scene.add(ambientLight);

const grid = new OBC.SimpleGrid(components); // to remove later on
//added during highlight
const gridMesh = grid.get();
const effects = components.renderer.postproduction.customEffects;
effects.excludedMeshes.push(gridMesh);

const fragments = new OBC.FragmentManager(components);
const highlighter = new OBC.FragmentHighlighter(components, fragments);
highlighter.setup();
const file = await fetch("frags/B1/small.frag");
const data = await file.arrayBuffer();
const buffer = new Uint8Array(data);
const model = await fragments.load(buffer);
highlighter.update();

components.renderer.postproduction.customEffects.outlineEnabled = true;
highlighter.outlinesEnabled = true;

const fragmentBbox = new OBC.FragmentBoundingBox(components);
fragmentBbox.add(model);
const bbox = fragmentBbox.getMesh();
fragmentBbox.reset();
const controls = components.camera.controls;
controls.fitToSphere(bbox, true);
const properties = await fetch("frags/B1/small.json");
model.properties = await properties.json();
console.log(model.properties)

/* a new instance of the component to navigate
IFC properties: the `IfcPropertiesProcessor`. We will also
make its built-in floating window visible by default. I will remove the default */
const propsProcessor = new OBC.IfcPropertiesProcessor(components);

propsProcessor.process(model);

const highlighterEvents = highlighter.events;
highlighterEvents.select.onClear.add(() => {
  propsProcessor.cleanPropertiesList();
});

highlighterEvents.select.onHighlight.add((selection) => {
  const fragmentID = Object.keys(selection)[0];
  const expressID = Number([...selection[fragmentID]][0]);
  let model;
  for (const group of fragments.groups) {
    const fragmentFound = Object.values(group.keyFragments).find(
      (id) => id === fragmentID
    );
    if (fragmentFound) {
      model = group;
      
      // GlobalID model.properties[expressID]
      
      console.log("express ID ", expressID);
    }
  }
  // const ui = propsProcessor.newEntityUI(model, expressID);
  // const { properties } = OBC.IfcPropertiesManager.getIFCInfo(model);
  // console.log(Object.keys(properties).find())
  // console.log("property", model.properties[expressID].type);
  // console.log("property tree", propsProcessor.newEntityTree(model, expressID));
  // console.log("spread", ui);
  // console.log("property keys", Object.keys(properties[expressID]));
  // console.log("entity tree", propsProcessor.newEntityTree(model, expressID))
  // console.log("entity name", ...[ui].flat())
  // console.log("entity props", propsProcessor.newEntityTree(model, expressID));
  // console.log("properties", properties);
  // console.log("hopefully attributes", OBC.IfcPropertiesUtils.getEntityName(properties, expressID));


  const targetPosition = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  components.camera.controls.getTarget(targetPosition);
  components.camera.controls.getPosition(cameraPosition);
  console.log("GUID", model.properties[expressID]["GlobalId"]['value']);
  console.log("Name ", model.properties[expressID]["Name"]['value']);
  console.log(`Camera position: ${cameraPosition.x}, ${cameraPosition.y}, ${cameraPosition.z}`);
  console.log(`Target position: ${targetPosition.x}, ${targetPosition.y}, ${targetPosition.z}`);

  
  propsProcessor.uiElement.get("propertiesWindow").visible = true;
  propsProcessor.renderProperties(model, expressID);
});

//toolbar
const toolbar = new OBC.Toolbar(components, {
  name: "Main Toolbar",
  position: "bottom",
});
components.ui.addToolbar(toolbar);

//button for bounding box
const button = new OBC.Button(components);
button.materialIcon = "zoom_in_map";
button.tooltip = "Zoom to bridge";
toolbar.addChild(button);

// zoom button controls
button.onClick.add(() => {
  controls.fitToSphere(bbox, true);
});

// code for filter option
const hider = new OBC.FragmentHider(components);
await hider.loadCached();

const classifier = new OBC.FragmentClassifier(components);
// classifier.byStorey(model);
classifier.byEntity(model);
const classifications = classifier.get();

// //stories - will not use this
// const storeys = {};
// const storeyNames = Object.keys(classifications.storeys);
// for (const name of storeyNames) {
// storeys[name] = true;
// }

//categories
const classes = {};
const classNames = Object.keys(classifications.entities);
for (const name of classNames) {
  classes[name] = true;
}

const gui = new dat.GUI();
const entitiesGui = gui.addFolder("Classes");
document.getElementById("gui-container").appendChild(gui.domElement);
// document.getElementById("ifcCanvas").appendChild(gui.domElement);
for (const name in classes) {
  entitiesGui.add(classes, name).onChange(async (visible) => {
    const found = await classifier.find({ entities: [name] });
    hider.set(visible, found);
  });
}

const hiderButton = hider.uiElement.get("main");
toolbar.addChild(hiderButton);

// code for highlighting
//highlighted material update
const highlightMaterial = new THREE.MeshBasicMaterial({
  color: "#2aacf7",
  depthTest: false,
  opacity: 0.8,
  transparent: true,
});
highlighter.add("default", highlightMaterial);
highlighter.outlineMaterial.color.set(0x2fa8ed);

let lastSelection;
let singleSelection = {
  value: true,
};

async function highlightOnClick(event) {
  const result = await highlighter.highlight("default", singleSelection.value);
  if (result) {
    lastSelection = {};
    for (const fragment of result.fragments) {
      const fragmentID = fragment.id;
      lastSelection[fragmentID] = [result.id];
    }
  }
  // console.log("result.id ",result.id);
  // console.log("lastSelection[fragmentID] ",lastSelection[fragmentID]);
  console.log("result ",result);
  console.log("lastSelection ", lastSelection);
  console.log("selection value ", singleSelection.value)
}
container.addEventListener("click", (event) => highlightOnClick(event));

function highlightOnID() {
  if (lastSelection !== undefined) {
    highlighter.highlightByID("default", lastSelection);
  }
}

/*
GUID 0YtzsIN615v90ejyknMQg9
ifc7.js:106 Name  Überbau_RN4R-Arnulfstraße-P3 - RN2R - K1 (0):Überbau_RN4R-Arnulfstraße-P3 - RN2R - K1 (0):3059491
ifc7.js:107 Camera position: 135.51967172613575, 99.50374951274848, 74.32779496790752
ifc7.js:108 Target position: 71.63325435382865, 35.617332140441384, 10.441377595600429
Display a highlighted location logic
express ID  331742
ifc7.js:105 
GUID 1u$bkEmPD259ZlVxlEbR8$
Camera position: 101.06314729535964, 92.56734135651016, 145.06981389397305
ifc7.js:108 Target position: 27.393701143368858, 18.89789520451936, 71.40036774198225


1c2b7cdf-b0f2-45bf-9042-c668fb1c2aa9
: 
['331742']
09a35120-f3f0-4b6c-b164-ef7591b69151
: 
['331742']
9cce6e4e-b5b7-4f2f-be5c-f15e960d43ba
: 
['331742']
94ad9818-76e2-4765-8275-f3bc1d93a557
: 
['331742']
ca42e916-2b78-4809-948e-44151e956593
: 
['331742']
ce6cfc8c-9bdb-4bda-af52-6641ae5eaccc
: 
['331742']
d125ddae-51fe-472e-938e-1389071adfa4
: 
['331742']
d651cf90-4ee3-486b-98ba-81b79dc44092
: 
['331742']
d7375152-d4aa-40d3-a0dc-2dd147c7bca6
: 
['331742']
f1d430aa-9d25-4b6c-88ff-ad028b4b5ca8
: 
['331742']



*/
const testSelection = {
  "1c2b7cdf-b0f2-45bf-9042-c668fb1c2aa9"
: 
['331742'],
"09a35120-f3f0-4b6c-b164-ef7591b69151"
: 
['331742'],
"9cce6e4e-b5b7-4f2f-be5c-f15e960d43ba"
: 
['331742'],
"94ad9818-76e2-4765-8275-f3bc1d93a557"
: 
['331742'],
"ca42e916-2b78-4809-948e-44151e956593"
: 
['331742'],
"ce6cfc8c-9bdb-4bda-af52-6641ae5eaccc"
: 
['331742'],
"d125ddae-51fe-472e-938e-1389071adfa4"
: 
['331742'],
"d651cf90-4ee3-486b-98ba-81b79dc44092"
: 
['331742'],
"d7375152-d4aa-40d3-a0dc-2dd147c7bca6"
: 
['331742'],
"f1d430aa-9d25-4b6c-88ff-ad028b4b5ca8"
: 
['331742']
}
const testSelection2 = 
{"1bd7510e-81ee-4afb-806d-1b355560efe5"
: 
['286110'] }
// highlighter.highlightByID("default", testSelection2,true,true);
// components.camera.controls.setLookAt(135.51967172613575, 99.50374951274848, 74.32779496790752, 71.63325435382865, 35.617332140441384, 10.441377595600429, false);
// function showComment(lastSelection,CameraX,  CameraY, CameraZ, TargetX,TargetY, TargetZ){
//   components.camera.controls.setLookAt(CameraX,CameraY, CameraZ, TargetX,TargetY, TargetZ);
//   highlighter.highlightByID("default", lastSelection,true,true);

// }

