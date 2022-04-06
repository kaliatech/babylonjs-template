import "./style.css";

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
import { AxesViewer } from "@babylonjs/core/Debug/axesViewer";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";
import { EnvironmentHelper } from "@babylonjs/core/Helpers/environmentHelper";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Scene } from "@babylonjs/core/scene.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Tools } from "@babylonjs/core/Misc";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";

// Required for EnvironmentHelper
import "@babylonjs/core/Materials/Textures/Loaders";

// Enable GLTF/GLB loader
import "@babylonjs/loaders/glTF";

// Get canvas element for rendering
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

// Create engine and a scene
const babylonEngine = new Engine(canvas, true);
const scene = new Scene(babylonEngine);

// Add a basic light
new HemisphericLight("light1", new Vector3(0, 2, 0), scene);

// Create a default environment (skybox, ground mesh, etc)
new EnvironmentHelper(
  {
    skyboxSize: 30,
    groundColor: new Color3(0.5, 0.5, 0.5)
  },
  scene
);

// Setup resize handler
const onResize = () => {
  babylonEngine.resize(true);
};
window.addEventListener("resize", onResize);
scene.onDisposeObservable.add(() =>
  window.removeEventListener("resize", onResize)
);

// Add a camera for the non-VR view in browser
const camera = new ArcRotateCamera(
  "Camera",
  Tools.ToRadians(-45),
  Tools.ToRadians(45),
  5,
  new Vector3(0, 2, 0),
  scene
);
camera.attachControl(true);

// Add a sphere to have something to look at
const sphereD = 1.0;
const sphere = MeshBuilder.CreateSphere(
  "xSphere",
  { segments: 16, diameter: sphereD },
  scene
);
sphere.position.x = 0;
sphere.position.y = sphereD * 2;
sphere.position.z = 0;
const rMat = new StandardMaterial("matR", scene);
rMat.diffuseColor = new Color3(1.0, 0, 0);
sphere.material = rMat;

// Axes viewer
const axes = new AxesViewer(scene, 1);
axes.xAxis.parent = sphere;
axes.yAxis.parent = sphere;
axes.zAxis.parent = sphere;

// Run render loop
babylonEngine.runRenderLoop(() => {
  scene.render();
});

//Uncomment to use Babylon Debug/Inspector.
//Will also need to install: `npm i @babylonjs/inspector@X.Y.Z -D`
//-----
// void Promise.all([
//   import("@babylonjs/core/Legacy/legacy"),
//   import("@babylonjs/core/Debug/debugLayer"),
//   import("@babylonjs/inspector")
// ]).then(() =>
//   scene.debugLayer.show({
//     handleResize: true,
//     embedMode: true,
//     overlay: true
//   })
// );
//-----
