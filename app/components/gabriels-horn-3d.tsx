"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * GabrielsHorn3D - a real, mathematically-generated surface of revolution.
 *
 * y = 1/x for x in [1, xMax] is sampled into a profile curve. On click, that
 * curve sweeps a full 360 degrees around the x-axis (via THREE.LatheGeometry,
 * built for exactly this: a 2D profile revolved around an axis), rebuilding
 * the geometry every frame with a growing `phiLength` so the surface visibly
 * forms as it goes - not just fading in. Axis/label text is plain HTML
 * overlaid on the canvas rather than rendered inside the 3D scene, since
 * text inside a rotating/perspective 3D scene is exactly what went wrong
 * with the previous CSS-3D-transform version of this graphic.
 */

const X_MIN = 1;
const X_MAX = 4.5;
const POINT_COUNT = 56;
const BUILD_MS = 1500;
const CURVE_HOLD_MS = 350;

function buildProfilePoints() {
  const points: THREE.Vector2[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    const t = i / (POINT_COUNT - 1);
    const x = X_MIN + t * (X_MAX - X_MIN);
    const radius = 1 / x;
    points.push(new THREE.Vector2(radius, x));
  }
  return points;
}

export function GabrielsHorn3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [showFinite, setShowFinite] = useState(false);
  const [showInfinite, setShowInfinite] = useState(false);
  const [running, setRunning] = useState(false);

  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    mesh: THREE.Mesh;
    curveLine: THREE.Line;
    curveMaterial: THREE.LineBasicMaterial;
    meshMaterial: THREE.MeshStandardMaterial;
    profilePoints: THREE.Vector2[];
    runId: number;
    timers: ReturnType<typeof setTimeout>[];
    resizeObserver: ResizeObserver;
  } | null>(null);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const width = host.clientWidth || 300;
    const height = host.clientHeight || 150;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(2.1, 1.5, 3.9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    host.innerHTML = "";
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(3, 4, 3);
    const warm = new THREE.DirectionalLight(0xe8b65a, 0.5);
    warm.position.set(-2, -1, 2);
    scene.add(ambient, key, warm);

    const group = new THREE.Group();
    scene.add(group);

    const profilePoints = buildProfilePoints();

    // flat 2D curve: the raw graph of y = 1/x, shown before any rotation
    const curveGeom = new THREE.BufferGeometry().setFromPoints(
      profilePoints.map((p) => new THREE.Vector3(p.y, p.x, 0))
    );
    const curveMaterial = new THREE.LineBasicMaterial({ color: 0xe89b20, transparent: true, opacity: 1 });
    const curveLine = new THREE.Line(curveGeom, curveMaterial);
    group.add(curveLine);

    // the revolved surface, rebuilt each frame during the build animation
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c3a5c,
      metalness: 0.3,
      roughness: 0.45,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    const initialGeom = new THREE.LatheGeometry(profilePoints, 40, 0, 0.0001);
    const mesh = new THREE.Mesh(initialGeom, meshMaterial);
    mesh.rotation.z = -Math.PI / 2;
    group.add(mesh);

    // axes, drawn as simple lines with small cone arrowheads
    const axisMat = new THREE.LineBasicMaterial({ color: 0x9aa5b1 });
    const xAxisGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(X_MIN - 0.5, 0, 0),
      new THREE.Vector3(X_MAX + 0.6, 0, 0)
    ]);
    const yAxisGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -0.3, 0),
      new THREE.Vector3(0, 1.35, 0)
    ]);
    group.add(new THREE.Line(xAxisGeom, axisMat), new THREE.Line(yAxisGeom, axisMat));

    const arrowMat = new THREE.MeshBasicMaterial({ color: 0x9aa5b1 });
    const xArrow = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 12), arrowMat);
    xArrow.position.set(X_MAX + 0.62, 0, 0);
    xArrow.rotation.z = -Math.PI / 2;
    const yArrow = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.14, 12), arrowMat);
    yArrow.position.set(0, 1.4, 0);
    group.add(xArrow, yArrow);

    // centre the whole scene on the curve's extent, so build & flat states align
    const box = new THREE.Box3().setFromObject(curveLine);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.position.sub(new THREE.Vector3(center.x, 0.15, 0));

    renderer.render(scene, camera);

    const resizeObserver = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resizeObserver.observe(host);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      group,
      mesh,
      curveLine,
      curveMaterial,
      meshMaterial,
      profilePoints,
      runId: 0,
      timers: [],
      resizeObserver
    };

    return () => {
      resizeObserver.disconnect();
      renderer.dispose();
      initialGeom.dispose();
      curveGeom.dispose();
      xAxisGeom.dispose();
      yAxisGeom.dispose();
      meshMaterial.dispose();
      curveMaterial.dispose();
      arrowMat.dispose();
      axisMat.dispose();
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  const play = () => {
    const s = sceneRef.current;
    if (!s) return;

    // restart cleanly: bump runId so any in-flight frame/timer loop below
    // sees a stale id and stops touching shared state
    s.runId += 1;
    const localRunId = s.runId;
    s.timers.forEach(clearTimeout);
    s.timers = [];

    setShowFinite(false);
    setShowInfinite(false);
    setRunning(true);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      s.curveMaterial.opacity = 0;
      s.meshMaterial.opacity = 0.92;
      const finalGeom = new THREE.LatheGeometry(s.profilePoints, 40, 0, Math.PI * 2);
      s.mesh.geometry.dispose();
      s.mesh.geometry = finalGeom;
      s.renderer.render(s.scene, s.camera);
      setShowFinite(true);
      setShowInfinite(true);
      setRunning(false);
      return;
    }

    s.curveMaterial.opacity = 1;
    s.meshMaterial.opacity = 0;
    const resetGeom = new THREE.LatheGeometry(s.profilePoints, 40, 0, 0.0001);
    s.mesh.geometry.dispose();
    s.mesh.geometry = resetGeom;
    s.renderer.render(s.scene, s.camera);

    const start = performance.now();

    const tick = (now: number) => {
      const cur = sceneRef.current;
      if (!cur || cur.runId !== localRunId) return;

      const elapsed = now - start;

      if (elapsed < CURVE_HOLD_MS) {
        requestAnimationFrame(tick);
        return;
      }

      const buildElapsed = elapsed - CURVE_HOLD_MS;
      const progress = Math.min(buildElapsed / BUILD_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 2);

      const geom = new THREE.LatheGeometry(cur.profilePoints, 40, 0, Math.max(eased * Math.PI * 2, 0.0001));
      cur.mesh.geometry.dispose();
      cur.mesh.geometry = geom;
      cur.meshMaterial.opacity = 0.15 + eased * 0.77;
      cur.curveMaterial.opacity = 1 - eased;

      cur.renderer.render(cur.scene, cur.camera);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setRunning(false);
        const t1 = setTimeout(() => {
          if (sceneRef.current?.runId === localRunId) setShowFinite(true);
        }, 250);
        const t2 = setTimeout(() => {
          if (sceneRef.current?.runId === localRunId) setShowInfinite(true);
        }, 250 + 900);
        cur.timers.push(t1, t2);
      }
    };

    requestAnimationFrame(tick);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      play();
    }
  };

  return (
    <div
      ref={containerRef}
      className="horn3d-wrap"
      role="button"
      tabIndex={0}
      aria-label="Play animation of Gabriel's Horn forming from the curve y equals 1 over x"
      onClick={play}
      onKeyDown={handleKeyDown}
    >
      <div ref={canvasHostRef} className="horn3d-canvas" />
      <span className="horn3d-label horn3d-label-y">y</span>
      <span className="horn3d-label horn3d-label-x">x</span>
      <span className="horn3d-label horn3d-label-curve">y = 1/x</span>
      <span className={`horn3d-hint ${running ? "horn3d-hint-hidden" : ""}`}>Click to rotate</span>
      <div className="horn3d-text-row">
        <span className={`horn3d-fact ${showFinite ? "horn3d-fact-visible" : ""}`}>Finite volume.</span>
        <span className={`horn3d-fact horn3d-fact-gold ${showInfinite ? "horn3d-fact-visible" : ""}`}>
          Infinite surface area.
        </span>
      </div>
    </div>
  );
}
