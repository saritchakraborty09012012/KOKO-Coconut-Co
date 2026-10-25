import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { clamp, lerp, smoothstep } from "../lib/utils";

const COCONUT_URL = "/assets/model/coconut.glb";
const CAN_URL = "/assets/model/can1.glb";
const LABEL_URL = "/assets/model/tex/coconutWhite.webp";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function findNode(root, pattern) {
  let match = null;
  root.traverse((node) => {
    if (!match && pattern.test(node.name)) match = node;
  });
  return match;
}

function useCoconutModel() {
  const { scene } = useGLTF(COCONUT_URL);

  return useMemo(() => {
    const source = scene.clone(true);
    source.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;
      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];
      const cloned = materials.map((material) => {
        const next = material.clone();
        next.transparent = false;
        next.depthWrite = true;
        if (/dalam|milk/i.test(next.name)) {
          next.color.set("#f7f2e4");
          next.roughness = 0.32;
          next.metalness = 0.02;
          next.envMapIntensity = 1.15;
          next.side = THREE.DoubleSide;
        } else {
          next.roughness = Math.max(0.8, next.roughness ?? 0.8);
          next.envMapIntensity = 0.85;
        }
        return next;
      });
      node.material = Array.isArray(node.material) ? cloned : cloned[0];
    });

    const leftNode = findNode(source, /coconut_left/i);
    const rightNode = findNode(source, /coconut_right/i);
    const milkNode = findNode(source, /^milk$/i);

    const leftHalf = new THREE.Group();
    leftHalf.name = "left-half";
    const rightHalf = new THREE.Group();
    rightHalf.name = "right-half";

    if (leftNode) leftHalf.add(leftNode);
    if (rightNode) rightHalf.add(rightNode);
    if (milkNode) leftHalf.add(milkNode);

    const rippleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0 },
        uColor: { value: new THREE.Color("#fbf6e7") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uOpacity;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          vec2 point = (vUv - 0.5) * 2.0;
          float radius = length(point * vec2(1.0, 1.08));
          if (radius > 1.0) discard;

          float ringA = fract(uTime * 0.32);
          float ringB = fract(uTime * 0.32 + 0.5);
          float bandA = smoothstep(0.085, 0.0, abs(radius - ringA));
          float bandB = smoothstep(0.065, 0.0, abs(radius - ringB));
          float shimmer =
            sin(radius * 36.0 - uTime * 2.4) * 0.5 +
            sin(radius * 58.0 + uTime * 1.7) * 0.5;

          float veil = smoothstep(1.0, 0.78, radius);
          float surface = veil * 0.16;
          float alpha =
            (surface + (bandA * 0.78 + bandB * 0.5) * (0.72 + shimmer * 0.28)) *
            uOpacity;

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      side: THREE.DoubleSide,
    });

    const ripple = new THREE.Mesh(
      new THREE.CircleGeometry(1, 64),
      rippleMaterial,
    );
    ripple.name = "water-ripple";
    ripple.scale.setScalar(0.064);
    ripple.position.set(-0.01, -0.003, 0.004);
    ripple.visible = false;
    ripple.renderOrder = 2;
    leftHalf.add(ripple);

    const pivot = new THREE.Group();
    pivot.add(leftHalf, rightHalf);
    pivot.updateMatrixWorld(true);

    const bounds = new THREE.Box3().setFromObject(pivot);
    const center = bounds.getCenter(new THREE.Vector3());
    pivot.position.set(-center.x, -center.y, -center.z);

    const tilt = new THREE.Group();
    tilt.add(pivot);

    const tip = new THREE.Group();
    tip.add(tilt);

    const root = new THREE.Group();
    root.add(tip);

    return {
      root,
      tip,
      tilt,
      leftHalf,
      rightHalf,
      milkNode,
      ripple,
      rippleMaterial,
    };
  }, [scene]);
}

function useCanModel(labelTexture) {
  const { scene } = useGLTF(CAN_URL);

  return useMemo(() => {
    const source = scene.clone(true);
    const shell = findNode(source, /^shell$/i);
    const bottom = findNode(source, /^bottom$/i);
    const top = findNode(source, /^top$/i);
    const shellBase = shell?.scale.clone() ?? new THREE.Vector3(1, 1, 1);
    const bottomBase = bottom?.position.clone() ?? new THREE.Vector3();
    const topBase = top?.position.clone() ?? new THREE.Vector3();

    source.traverse((node) => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;
      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];
      const cloned = materials.map((material) => {
        const next = material.clone();
        if (/etiquette/i.test(next.name)) {
          next.map = labelTexture;
          next.color.set("#ffffff");
          next.roughness = 0.44;
          next.metalness = 0.02;
          next.envMapIntensity = 0.9;
          next.side = THREE.DoubleSide;
        } else {
          next.color.set("#27231f");
          next.roughness = 0.34;
          next.metalness = 0.78;
          next.envMapIntensity = 1.2;
          next.side = THREE.DoubleSide;
        }
        next.needsUpdate = true;
        return next;
      });
      node.material = Array.isArray(node.material) ? cloned : cloned[0];
    });

    source.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(source);
    const center = bounds.getCenter(new THREE.Vector3());
    source.position.set(-center.x, -center.y, -center.z);

    const root = new THREE.Group();
    root.add(source);

    return { root, source, shell, bottom, top, shellBase, bottomBase, topBase };
  }, [scene, labelTexture]);
}

function useReducedMotion() {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return reduced;
}

function Scene({ progressRef }) {
  const { size, camera, gl, pointer } = useThree();
  const reduced = useReducedMotion();
  const coconut = useCoconutModel();
  const label = useTexture(LABEL_URL);
  const can = useCanModel(label);
  const groupRef = useRef(null);
  const canRef = useRef(null);
  const shakeRef = useRef(0);
  const lastShake = useRef(-10);
  const orientation = useRef({ x: 0, y: 0 });
  const current = useRef({
    x: 0.16,
    y: -0.02,
    scale: 8.6,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    canX: 0,
    canY: 0,
    canScale: 0.052,
    camZ: 5.35,
  });

  useEffect(() => {
    label.colorSpace = THREE.SRGBColorSpace;
    label.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    label.needsUpdate = true;
  }, [label, gl]);

  useEffect(() => {
    const onShake = () => {
      lastShake.current = performance.now() / 1000;
    };
    const onOrient = (event) => {
      const gamma = clamp((event.gamma || 0) / 38, -1, 1);
      const beta = clamp(((event.beta || 0) - 45) / 38, -1, 1);
      orientation.current.x = gamma;
      orientation.current.y = beta;
    };
    window.addEventListener("palmo:shake", onShake);
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("palmo:shake", onShake);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = progressRef.current;
    const t = state.clock.elapsedTime;
    const mobile = size.width < 768;
    const motion = reduced ? 0 : 1;
    const pointerStrength = (mobile ? 0.16 : 0.3) * motion;

    const now = performance.now() / 1000;
    shakeRef.current = Math.max(
      0,
      1 - clamp((now - lastShake.current) / 1.25),
    );
    const shake = Math.sin(now * 38) * shakeRef.current * 0.09 * motion;

    const openBefore =
      smoothstep(p, 0.135, 0.26) * (1 - smoothstep(p, 0.37, 0.43));
    const openReveal = smoothstep(p, 0.435, 0.5);
    const open = Math.max(openBefore, openReveal);
    const crack =
      smoothstep(p, 0.06, 0.14) * (1 - smoothstep(p, 0.15, 0.23));
    const canIn = smoothstep(p, 0.44, 0.56);
    const canSpin = smoothstep(p, 0.72, 0.88);
    const coconutExit = smoothstep(p, 0.56, 0.68);
    const hero = 1 - smoothstep(p, 0.11, 0.22);
    const benefitView =
      smoothstep(p, 0.13, 0.22) * (1 - smoothstep(p, 0.44, 0.52));

    const target = current.current;
    target.x = lerp(0.16, 0.01, benefitView) + lerp(0, 0.02, canIn);
    target.y = (mobile ? 0.04 : -0.02) + benefitView * -0.025;
    target.scale =
      (mobile ? 7.2 : 8.6) *
      lerp(1, 1.02, benefitView) *
      lerp(1, 1.03, open) *
      lerp(1, 0.94, canIn);
    target.rotX =
      (pointer.y * pointerStrength + orientation.current.y * 0.25 * motion) *
        0.8 -
      benefitView * 0.55;
    target.rotY =
      pointer.x * pointerStrength +
      orientation.current.x * 0.45 * motion +
      (hero * 0.35 + p * 0.9 + benefitView * 1.3) +
      shake;
    target.rotZ =
      -0.06 +
      Math.sin(t * 0.55) * 0.025 * motion +
      shake * 0.4 -
      benefitView * 0.08 +
      open * 0.04;
    target.camZ = 5.35 - benefitView * 0.16 + canIn * 0.16;
    target.canY = lerp(-0.015, mobile ? 0.08 : 0, canIn);
    target.canScale = lerp(0.16, mobile ? 0.34 : 0.36, canIn);
    target.canX = mobile ? 0 : -0.035;
    target.canZ = lerp(-0.16, mobile ? 1.15 : 1.3, canIn);

    if (!groupRef.current || !canRef.current) return;

    const group = groupRef.current;
    group.position.x = THREE.MathUtils.damp(
      group.position.x,
      target.x,
      4.6,
      dt,
    );
    group.position.y = THREE.MathUtils.damp(
      group.position.y,
      target.y,
      4.2,
      dt,
    );
    group.scale.setScalar(
      THREE.MathUtils.damp(group.scale.x, target.scale, 4.5, dt),
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      target.rotX,
      5,
      dt,
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      target.rotY,
      5,
      dt,
    );
    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      target.rotZ,
      5,
      dt,
    );

    const wobble =
      (Math.sin(t * 26) * 0.03 * crack * (1 - open) +
        Math.sin(t * 8.3) * 0.006 * open) *
      motion;
    coconut.tip.rotation.x = 0.52 * open;
    coconut.tilt.rotation.z = 1.16 * open;
    coconut.tilt.rotation.y = -0.16 * open;
    coconut.tilt.rotation.x = Math.sin(t * 0.9) * 0.012 * open * motion;

    coconut.rightHalf.position.x = 0.148 * open;
    coconut.rightHalf.position.y = 0.008 * open;
    coconut.rightHalf.position.z = -0.004 * open;
    coconut.rightHalf.rotation.z = -0.26 * open + wobble;
    coconut.rightHalf.rotation.y = 0.15 * open;
    coconut.rightHalf.rotation.x = -0.055 * open;

    coconut.leftHalf.position.x = -0.012 * open - 0.095 * openReveal;
    coconut.leftHalf.position.y = -0.005 * open - 0.014 * openReveal;
    coconut.leftHalf.rotation.z = 0.024 * open - 0.13 * openReveal;
    coconut.leftHalf.rotation.y = -0.035 * open + 0.075 * openReveal;
    coconut.leftHalf.rotation.x = -wobble * 0.6;

    if (coconut.milkNode) {
      coconut.milkNode.visible = open > 0.02;
      coconut.milkNode.scale.setScalar(1);
    }

    if (coconut.ripple) {
      const rippleLife = open * (1 - coconutExit);
      coconut.ripple.visible = rippleLife > 0.015;
      coconut.rippleMaterial.uniforms.uTime.value = t;
      coconut.rippleMaterial.uniforms.uOpacity.value =
        rippleLife * (0.82 + Math.sin(t * 1.4) * 0.18);
    }

    coconut.root.visible = coconutExit < 0.995;
    coconut.root.scale.setScalar(lerp(1, 0.52, coconutExit));
    coconut.root.position.z = lerp(0, -0.34, coconutExit);
    coconut.root.rotation.y = 0.22 * coconutExit;

    const canGroup = canRef.current;
    canGroup.visible = p > 0.43;
    canGroup.position.x = THREE.MathUtils.damp(
      canGroup.position.x,
      target.canX,
      5,
      dt,
    );
    canGroup.position.y = THREE.MathUtils.damp(
      canGroup.position.y,
      target.canY,
      5,
      dt,
    );
    canGroup.position.z = THREE.MathUtils.damp(
      canGroup.position.z,
      target.canZ,
      5,
      dt,
    );
    canGroup.scale.setScalar(
      THREE.MathUtils.damp(canGroup.scale.x, target.canScale, 5, dt),
    );
    const spin =
      canSpin * Math.PI * 0.3 +
      pointer.x * 0.16 * motion +
      orientation.current.x * 0.2 * motion +
      Math.sin(t * 0.45) * 0.03 * motion;
    canGroup.rotation.y = THREE.MathUtils.damp(
      canGroup.rotation.y,
      spin,
      6,
      dt,
    );
    canGroup.rotation.x = THREE.MathUtils.damp(
      canGroup.rotation.x,
      pointer.y * 0.08 - (1 - canIn) * 0.04,
      4,
      dt,
    );
    canGroup.rotation.z = 0.018 * Math.sin(t * 0.6 + 0.5) * motion;

    if (can.top) can.top.position.copy(can.topBase);
    if (can.bottom) can.bottom.position.copy(can.bottomBase);
    if (can.shell) can.shell.scale.copy(can.shellBase);

    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      target.camZ,
      3,
      dt,
    );
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      mobile ? 0 : pointer.x * 0.08 * motion,
      2,
      dt,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      mobile ? 0 : -pointer.y * 0.04 * motion,
      2,
      dt,
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[3, 5, 5]}
        intensity={2.2}
        color="#fff4d6"
      />
      <directionalLight
        position={[-4, 2, 3]}
        intensity={0.8}
        color="#f3c77d"
      />
      <directionalLight position={[0, -2, -4]} intensity={0.6} color="#a9b78c" />
      <Environment files="/assets/hdri/empty_warehouse_01_1k.hdr" environmentIntensity={0.7} />
      <group ref={groupRef} position={[0.16, -0.02, 0]} scale={8.6}>
        <primitive object={coconut.root} />
      </group>
      <group ref={canRef} position={[0, 0, 0]} scale={0.052}>
        <primitive object={can.root} />
      </group>
    </>
  );
}

export default function CoconutExperience({ progressRef }) {
  const hostRef = useRef(null);
  const [supported] = useState(
    () => typeof window === "undefined" || supportsWebGL(),
  );
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!supported || !hostRef.current) return;
    const host = hostRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? true),
      { rootMargin: "200px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [supported]);

  if (!supported) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-cream">
        <div className="flex flex-col items-center px-8 text-center">
          <img
            src="/assets/fruits/coconut.webp"
            alt="A whole brown coconut"
            className="w-[min(52vw,30rem)] mix-blend-multiply"
          />
          <p className="mt-3 font-hand text-[1.05rem] text-cocoa/65">
            Your browser can&apos;t display the 3D pour — but the coconut water
            is still cold.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={hostRef} className="absolute inset-0">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.65]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5.35], fov: 34, near: 0.1, far: 50 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Suspense fallback={null}>
          <Scene progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(COCONUT_URL);
useGLTF.preload(CAN_URL);
useTexture.preload(LABEL_URL);
