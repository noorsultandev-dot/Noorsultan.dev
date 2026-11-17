"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vert = /* glsl */ `
  uniform float uTime;
  uniform float uMouse;
  varying float vH;
  varying float vD;
  void main() {
    vec3 p = position;
    float h = sin(p.x * 0.55 + uTime * 0.5) * 0.35
            + sin(p.z * 0.9 + uTime * 0.4) * 0.3
            + sin((p.x + p.z) * 0.3 - uTime * 0.25) * 0.25;
    h += uMouse * p.x * 0.04;
    p.y += h;
    vH = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vD = -mv.z;
    gl_PointSize = 46.0 / vD;
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = /* glsl */ `
  varying float vH;
  varying float vD;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 c = mix(vec3(0.75), vec3(0.78, 0.96, 0.2), smoothstep(0.0, 0.7, vH));
    float fade = 1.0 - smoothstep(5.0, 17.0, vD);
    float a = fade * (0.18 + 0.7 * smoothstep(-0.6, 0.8, vH));
    gl_FragColor = vec4(c, a * (1.0 - smoothstep(0.25, 0.5, d)));
  }
`;

function Wave() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(0);

  const geometry = useMemo(() => {
    const cols = 150;
    const rows = 70;
    const pos = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let z = 0; z < rows; z++) {
      for (let x = 0; x < cols; x++) {
        pos[i++] = (x / (cols - 1) - 0.5) * 30;
        pos[i++] = 0;
        pos[i++] = (z / (rows - 1) - 0.5) * 16;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMouse: { value: 0 } }), []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mouse.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uTime.value = state.clock.elapsedTime;
    u.uMouse.value += (mouse.current - u.uMouse.value) * 0.04;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/** A slow field of dots that rolls like water. The only 3D on the page. */
export default function HeroScene() {
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={still ? "demand" : "always"}
      camera={{ position: [0, 2.4, 8], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Wave />
    </Canvas>
  );
}
