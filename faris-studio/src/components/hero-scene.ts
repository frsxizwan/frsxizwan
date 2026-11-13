import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three";

/**
 * The hero object: a faceted graphite solid with thin blue edges, lit from one side,
 * inside a sparse field of points. Deliberately quiet — it should read as an object
 * on a desk, not as a screensaver.
 *
 * Performance: named imports (tree-shaken), DPR capped, render loop paused when the
 * canvas is off-screen or the tab is hidden, and a single static frame when motion is reduced.
 */
export function createHeroScene(canvas: HTMLCanvasElement, reduced: boolean): () => void {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  const group = new Group();
  scene.add(group);

  const solidGeo = new IcosahedronGeometry(1.75, 1);
  const solid = new Mesh(
    solidGeo,
    new MeshStandardMaterial({ color: new Color("#0c1422"), metalness: 0.85, roughness: 0.38, flatShading: true }),
  );
  group.add(solid);

  const edgesGeo = new EdgesGeometry(solidGeo);
  const edges = new LineSegments(
    edgesGeo,
    new LineBasicMaterial({ color: new Color("#6ea8ff"), transparent: true, opacity: 0.28 }),
  );
  edges.scale.setScalar(1.002);
  group.add(edges);

  const shellGeo = new EdgesGeometry(new IcosahedronGeometry(2.7, 1));
  const shell = new LineSegments(
    shellGeo,
    new LineBasicMaterial({ color: new Color("#9fc2ff"), transparent: true, opacity: 0.07 }),
  );
  group.add(shell);

  // Deterministic point field (no Math.random → identical frame every load, stable screenshots).
  const COUNT = 320;
  const positions = new Float32Array(COUNT * 3);
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < COUNT; i++) {
    const r = 3.2 + rand() * 4.5;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - 2;
  }
  const pointsGeo = new BufferGeometry();
  pointsGeo.setAttribute("position", new BufferAttribute(positions, 3));
  const points = new Points(
    pointsGeo,
    new PointsMaterial({ color: new Color("#a9c8ff"), size: 0.022, transparent: true, opacity: 0.55, sizeAttenuation: true }),
  );
  scene.add(points);

  scene.add(new AmbientLight(0x8fb4ff, 0.45));
  const key = new DirectionalLight(0x5b9dff, 3.4);
  key.position.set(-4, 5, 4);
  scene.add(key);
  const rim = new DirectionalLight(0xffffff, 0.9);
  rim.position.set(5, -2, -3);
  scene.add(rim);

  group.rotation.set(0.35, 0.6, 0.08);

  const pointer = { x: 0, y: 0 };
  const eased = { x: 0, y: 0 };
  let visible = true;
  let frame = 0;
  let last = performance.now();

  const layout = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (w === 0 || h === 0) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Wide screens: object sits right of the headline. Narrow: centred and pushed back.
    const wide = w / h > 1.05;
    group.position.set(wide ? 3.15 : 0, wide ? 0.1 : 1.1, wide ? -1.6 : -2.5);
  };

  const render = () => renderer.render(scene, camera);

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    eased.x += (pointer.x - eased.x) * 0.04;
    eased.y += (pointer.y - eased.y) * 0.04;
    solid.rotation.y += dt * 0.09;
    edges.rotation.y = solid.rotation.y;
    shell.rotation.y -= dt * 0.03;
    shell.rotation.x += dt * 0.015;
    points.rotation.y += dt * 0.008;
    group.rotation.x = 0.35 + eased.y * 0.18;
    group.rotation.z = 0.08 + eased.x * 0.06;
    camera.position.x = eased.x * 0.35;
    camera.lookAt(0, 0, 0);
    render();
  };

  const start = () => {
    if (reduced || frame || !visible || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onVisibility = () => (document.hidden ? stop() : start());
  const resizeObserver = new ResizeObserver(() => {
    layout();
    render();
  });
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });

  layout();
  render();
  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  document.addEventListener("visibilitychange", onVisibility);
  if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });
  start();

  return () => {
    stop();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointer);
    scene.traverse((obj) => {
      const o = obj as Mesh;
      o.geometry?.dispose();
      const m = o.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
    renderer.dispose();
  };
}
