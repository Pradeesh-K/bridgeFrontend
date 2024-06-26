import React from "react";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Show3D.css";
import * as THREE from "three";
import * as OBC from "openbim-components";
import * as dat from "dat.gui";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5555";


export default function Show3D() {
  const [bridge, setBridge] = useState([]);
  const [selectCount, setSelectCount] = useState(0);
  const [selectedFrags, setSelectedFrags] = useState([]);

  const [loading, setLoading] = useState(false);
  let highlighter = useRef(null);
  let components;
  let fragments;
  let container;
  let directionalLight;
  let ambientLight;
  let grid;
  let gridMesh;
  let effects;
  let commentContainers;
  let propsProcessor;
  let propsManager;
  
  const S3_BUCKET_NAME = "ifc-storage-0";
  let FILE_KEY;
  const { id } = useParams();
  if (id == "65b13ca5de8cc52ed92cf70b") {
    FILE_KEY = "A";
  } else if (id == "65b13ca6de8cc52ed92cf70d") {
    FILE_KEY = "B";
  } else if (id == "65b13ca6de8cc52ed92cf70f") {
    FILE_KEY = "C";
  } else if (id == "65b13ca6de8cc52ed92cf711") {
    FILE_KEY = "D";
  } else if (id == "65b13ca6de8cc52ed92cf713") {
    FILE_KEY = "E";
  }
  if (FILE_KEY == "E") {
    FILE_KEY = "D";
  }
  
  const jwtToken = localStorage.getItem('dbToken');

  const [additionalData, setAdditionalData] = useState({
    GUID: "",
    cameraPosition: [0, 0, 0],
    targetPosition: [0, 0, 0],
    lastSelection: {},
    element: "",
  });

  // Handle additional data changes
  const handleAdditionalDataChange = (key, value) => {
    setAdditionalData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.elements.name.value,
      comments: e.target.elements.comments.value,
      dateCreated: Date.now
    };

    const combinedData = {
      ...formData,
      ...additionalData,
    };
    // Perform any actions with the form data here

    try {
      // Assuming you're using fetch API or axios for making the HTTP request
      const response = await fetch(`${backendURL}/bridges/${id}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
          // Add any additional headers if needed
        },
        body: JSON.stringify(combinedData),
      });

      if (response.ok) {
        console.log("Form submitted successfully:", combinedData);
        // Reset form data

        e.target.elements.name.value = "";
        e.target.elements.comments.value = "";
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  useEffect(() => {
    components = new OBC.Components();
    container = document.getElementById("ifcCanvas");

    components.scene = new OBC.SimpleScene(components); // A scene component where our objects will live in 3D.
    components.renderer = new OBC.PostproductionRenderer(components, container);
    components.camera = new OBC.OrthoPerspectiveCamera(components); //🎥 A camera component that defines where we are and in that 3D world.
    components.raycaster = new OBC.SimpleRaycaster(components); //⚡ A raycaster component that makes it possible to interact with that 3D scene with our mouse / touch.
    components.init(); //init method. It will start updating all the components at 60 fps, so that you don't have to worry about the animation loop: 🚗
    components.renderer.postproduction.enabled = true; // to see if it can be moved next to renderer later on
    const scene = components.scene.get(); //  we need a reference to the scene, which you can get with the get() method. This method is present in all the components and is used to get the core of the component
    components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
    components.scene.setup();
    directionalLight = new THREE.DirectionalLight();
    directionalLight.position.set(5, 10, 3);
    directionalLight.intensity = 0.5;
    scene.add(directionalLight);
    ambientLight = new THREE.AmbientLight();
    ambientLight.intensity = 0.5;
    scene.add(ambientLight);
    propsManager = new OBC.IfcPropertiesManager(components);

    grid = new OBC.SimpleGrid(components); // to remove later on
    //added during highlight
    gridMesh = grid.get();
    effects = components.renderer.postproduction.customEffects;
    effects.excludedMeshes.push(gridMesh);

    fragments = new OBC.FragmentManager(components);
    highlighter = new OBC.FragmentHighlighter(components, fragments);
    highlighter.setup();
  }, []);

  useEffect(() => {
    async function loadModel() {
      const file = await fetch(
        `https://${S3_BUCKET_NAME}.s3.amazonaws.com/frag/${FILE_KEY}/small.frag`
      );
      // const file = await fetch("../../small.frag");
      const data = await file.arrayBuffer();
      const buffer = new Uint8Array(data);
      const model = await fragments.load(buffer);
      highlighter.update();

      // components.renderer.postproduction.customEffects.outlineEnabled = true;    // as we have multiple colors this is not needed
      highlighter.outlinesEnabled = true;
      const fragmentBbox = new OBC.FragmentBoundingBox(components);
      fragmentBbox.add(model);
      const bbox = fragmentBbox.getMesh();
      fragmentBbox.reset();
      const controls = components.camera.controls;
      controls.fitToSphere(bbox, true);
      const properties = await fetch(
        `https://${S3_BUCKET_NAME}.s3.amazonaws.com/frag/${FILE_KEY}/small.json`
      );
      // const properties = await fetch("../../small.json");
      model.properties = await properties.json();
     
      propsProcessor = new OBC.IfcPropertiesProcessor(components);

      propsProcessor.process(model);

      const highlighterEvents = highlighter.events;
      highlighterEvents.select.onClear.add(() => {
        propsProcessor.cleanPropertiesList();
      });

      highlighterEvents.select.onHighlight.add(async (selection) => {
        // console.log(selection);
        
        
        const fragmentID = Object.keys(selection)[0];
        const expressID = Number([...selection[fragmentID]][0]);
        let model;
        for (const group of fragments.groups) {
          const fragmentFound = Object.values(group.keyFragments).find(
            (id) => id === fragmentID
          );
          if (fragmentFound) {
            model = group;
          }
        }
        // console.log("selection ", Object.keys(selection))
        // console.log("Exp id", expressID);
        // console.log("selected frag", selectedFrags);
        // console.log("model", model);
    //     const { schema } = OBC.IfcPropertiesManager.getIFCInfo(model);
    // const { name } = OBC.IfcPropertiesUtils.getEntityName(properties, expressID);
    // console.log('try schema', );
        
        const targetPosition = new THREE.Vector3();
        const cameraPosition = new THREE.Vector3();
        components.camera.controls.getTarget(targetPosition);
        components.camera.controls.getPosition(cameraPosition);
        
        handleAdditionalDataChange(
          "GUID",
          model.properties[expressID]["GlobalId"]["value"]
        );
        handleAdditionalDataChange("cameraPosition", [
          cameraPosition.x,
          cameraPosition.y,
          cameraPosition.z,
        ]);
        handleAdditionalDataChange("targetPosition", [
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
        ]);
        handleAdditionalDataChange(
          "element",
          model.properties[expressID]["PredefinedType"]["value"]
        );

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

      //categories
      const classes = {};
      const classNames = Object.keys(classifications.entities);
      for (const name of classNames) {
        classes[name] = true;
      }

      const gui = new dat.GUI();
      const entitiesGui = gui.addFolder("Filters");
      document.getElementById("gui-container").appendChild(gui.domElement);
      for (const name in classes) {
        entitiesGui.add(classes, name).onChange(async (visible) => {
          const found = await classifier.find({ entities: [name] });
          hider.set(visible, found);
        });
      }

      
      const highlightMaterial = new THREE.MeshBasicMaterial({
        color: "#2aacf7",
        depthTest: false,
        opacity: 0.8,
        transparent: true,
      });

      highlighter.add("default", highlightMaterial);

      // highlighter name and its material properties - create some more
      // highlighter.outlineMaterial.color.set("#0000ffcc");  // disabled as we have multiple colors now

      let lastSelection;
      let singleSelection = {
        value: true,
      };
      

      async function highlightOnClick(event) {
        // await highlighter.clearFills("default");
        const result = await highlighter.highlight(
          "default",
          singleSelection.value
        );
        if (result) {
          lastSelection = {};
          for (const fragment of result.fragments) {
            const fragmentID = fragment.id;
            lastSelection[fragmentID] = [result.id];
          }
        }
        
        
       

        handleAdditionalDataChange("lastSelection", lastSelection);
      }
      container.addEventListener("click", (event) => highlightOnClick(event));

      commentContainers = document.querySelectorAll('[id^="viewComments"]');
      Array.from(commentContainers).forEach((commentContainer) => {
        commentContainer.addEventListener("click", (event) => {
          const lastSelection = JSON.parse(event.currentTarget.dataset.id);

          highlighter.highlightByID("default", lastSelection, true, true);
        });
      });
    }

    loadModel();
    // document.addEventListener('DOMContentLoaded', function() { console.log('loaded') ;loadModel();});
  }, []);
  // The empty dependency array ensures that this effect runs once after initial render

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(`${backendURL}/bridges/${id}`);
        setBridge(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="3d d-flex flex-column justify-content-between">
      <Navbar />
      <div id="content" className="d-flex align-items-top">
        <div id="ifcCanvas">
          <div id="gui-container"></div>
        </div>
        <div id="comment" className="d-flex flex-column">
          <div>
            <h3>Click to select and view more details, Use Filters to hide</h3>
            <p>Note: May take a while to load</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Name(optional)"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="name" // Make sure to add the 'name' attribute
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="Your comments/suggestions"
                  name="comments" // Make sure to add the 'name' attribute
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-lg col-12 mt-2"
              >
                Submit
              </button>
            </form>
          </div>
           <div className="feedbacks mt-5">
            <h3>View comments</h3>
            {loading ? (
              <Spinner
                animation="border"
                variant="primary"
                className="mx-auto"
              />
            ) : bridge.feedbacks && bridge.feedbacks.length > 0 ? (
              
                bridge.feedbacks.map((feedback) => (
                  <div
                    id={`viewComments${feedback._id}`}
                    key={feedback._id}
                    data-id={JSON.stringify(feedback.lastSelection)}
                  >
                    <blockquote className="blockquote mb-0 border border-secondary">
                      <p>{feedback.comments}</p>
                      <footer className="blockquote-footer text-right">
                        {feedback.name}
                      </footer>
                    </blockquote>
                  </div>
                ))
              
            ) : (
              <p>No feedbacks available.</p>
            )}
          </div> 
        </div>
      </div>
  
        <Footer />
    
    </div>
  );
}
