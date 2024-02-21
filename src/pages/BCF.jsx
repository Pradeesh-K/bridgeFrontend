import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BCF.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
const backendURL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5555";
import "./Show3D.css";
import * as THREE from "three";
import * as OBC from "openbim-components";
import * as dat from "dat.gui";

export default function BCF() {
  const [bridge, setBridge] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState();


  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const response = await axios
      .get(`${backendURL}/bridges/65b13ca6de8cc52ed92cf70d`)     ;
       setBridge(response.data, () => {console.log(bridge)});
      // console.log(response.data);
        setLoading(false);

    }
    loadData();
  }, []);

 

  useEffect(() => {
    async function renderScene(bridge) {
      const S3_BUCKET_NAME = "ifc-storage-0";
      let FILE_KEY = "B";

      const components = new OBC.Components();
      const container = document.getElementById("ifcCanvas");
      components.scene = new OBC.SimpleScene(components); // A scene component where our objects will live in 3D.
      components.renderer = new OBC.PostproductionRenderer(
        components,
        container
      );
      components.camera = new OBC.OrthoPerspectiveCamera(components); //🎥 A camera component that defines where we are and in that 3D world.
      components.raycaster = new OBC.SimpleRaycaster(components); //⚡ A raycaster component that makes it possible to interact with that 3D scene with our mouse / touch.
      components.init(); //init method. It will start updating all the components at 60 fps, so that you don't have to worry about the animation loop: 🚗
      components.renderer.postproduction.enabled = true; // to see if it can be moved next to renderer later on
      const scene = components.scene.get(); //  we need a reference to the scene, which you can get with the get() method. This method is present in all the components and is used to get the core of the component
      components.camera.controls.setLookAt(10, 10, 10, 0, 0, 0);
      components.scene.setup();
      const directionalLight = new THREE.DirectionalLight();
      directionalLight.position.set(5, 10, 3);
      directionalLight.intensity = 0.5;
      scene.add(directionalLight);
      const ambientLight = new THREE.AmbientLight();
      ambientLight.intensity = 0.5;
      scene.add(ambientLight);
      const grid = new OBC.SimpleGrid(components);
      const gridMesh = grid.get();
      const effects = components.renderer.postproduction.customEffects;
      effects.excludedMeshes.push(gridMesh);
      const fragments = new OBC.FragmentManager(components);
      const highlighter = new OBC.FragmentHighlighter(components, fragments);
      highlighter.setup();

      const file = await fetch(
        `https://${S3_BUCKET_NAME}.s3.amazonaws.com/frag/${FILE_KEY}/small.frag`
      );
      const data = await file.arrayBuffer();
      const buffer = new Uint8Array(data);
      const model = await fragments.load(buffer);
      highlighter.update();
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
      model.properties = await properties.json();
      const propsProcessor = new OBC.IfcPropertiesProcessor(components);
      propsProcessor.process(model);
      const highlighterEvents = highlighter.events;
      highlighterEvents.select.onClear.add(() => {
        propsProcessor.cleanPropertiesList();
      });
      highlighterEvents.select.onHighlight.add(async (selection) => {
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
      });
      const toolbar = new OBC.Toolbar(components, {
        name: "Main Toolbar",
        position: "bottom",
      });
      components.ui.addToolbar(toolbar);
      const button = new OBC.Button(components);
      button.materialIcon = "zoom_in_map";
      button.tooltip = "Zoom to bridge";
      toolbar.addChild(button);

      // zoom button controls
      button.onClick.add(() => {
        controls.fitToSphere(bbox, true);
      });
      const hider = new OBC.FragmentHider(components);
      await hider.loadCached();
      const classifier = new OBC.FragmentClassifier(components);
      classifier.byEntity(model);
      const classifications = classifier.get();
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
      }
      container.addEventListener("click", (event) => highlightOnClick(event));

      const commentContainers = document.querySelectorAll(
        '[id^="viewComments"]'
      );
      Array.from(commentContainers).forEach((commentContainer) => {
        commentContainer.addEventListener("click", (event) => {
          const lastSelection = JSON.parse(event.currentTarget.dataset.id);

          highlighter.highlightByID("default", lastSelection, true, true);
        });
      });
    }
    renderScene(bridge);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="content d-flex flex-column align-items-center">
        <div className="heading1 mb-4">BCF Viewer</div>
        <div className="d-flex mb-2 justify-content-between">
        {loading ? (
  <Spinner
    animation="border"
    variant="primary"
    className="mx-auto"
  />
) : (
  bridge.feedbacks && bridge.feedbacks.length > 0 ? (
    (() => {
      const set = [...new Set(bridge.feedbacks.map(feed => feed.element))];
      return set.map((feed, index) => (
        <button key={index} className="btn btn-primary mx-2" onClick={() =>setFilter(feed)}>
          {feed}
        </button>
      ));
    })()
  ) : (
    <p>empty</p>
  )
)}

        </div>

        <div className="viewer d-flex justify-content-between">
          <div className="feedbacks">
            <h3 className="text-primary text-center">View Issues</h3>
            {loading ? (
              <Spinner
                animation="border"
                variant="primary"
                className="mx-auto"
              />
            ) :  bridge.feedbacks && bridge.feedbacks.length > 0 ? (
              filter ?
                bridge.feedbacks
                  .filter(feed => feed.element === filter)
                  .map((filteredFeedback) => (
                    <div
                      id={`viewComments${filteredFeedback._id}`}
                      key={filteredFeedback._id}
                      data-id={JSON.stringify(filteredFeedback.lastSelection)}
                    >
                      <blockquote className="blockquote mb-0 m-1 border border-secondary ">
                        <p>Ifc Element: {filteredFeedback.element}</p>
                        <p>GUID: {filteredFeedback.GUID}</p>
                        <p>Comment: {filteredFeedback.comments}</p>
                      </blockquote>
                    </div>
                  ))
                :
                bridge.feedbacks.map((feedback) => (
                  <div
                    id={`viewComments${feedback._id}`}
                    key={feedback._id}
                    data-id={JSON.stringify(feedback.lastSelection)}
                  >
                    <blockquote className="blockquote mb-0 m-1 border border-secondary ">
                      <p>Ifc Element: {feedback.element}</p>
                      <p>GUID: {feedback.GUID}</p>
                      <p>Comment: {feedback.comments}</p>
                    </blockquote>
                  </div>
                ))
            ) : (
              <p>No feedbacks available.</p>
            )}
          </div>
          <div className="right">
            {" "}
            <div id="ifcCanvas">
              <div id="gui-container"></div>
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
