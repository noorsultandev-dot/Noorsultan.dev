"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PORTRAIT_SRC = "/portrait.jpg";

const vert = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += sin(uv.y * 8.0 + uTime * 1.2) * 0.012;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const frag = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uGlitch;
  uniform float uReveal;

  float rand(vec2 c){ return fract(sin(dot(c, vec2(12.9898,78.233))) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    // occasional horizontal glitch slices
    float slice = step(0.985, rand(vec2(floor(uv.y * 40.0), floor(uTime * 8.0))));
    uv.x += slice * uGlitch * (rand(vec2(uTime, uv.y)) - 0.5) * 0.06;

    vec3 col;
    col.r = texture2D(uTex, uv + vec2(0.0025 * uGlitch, 0.0)).r;
    col.g = texture2D(uTex, uv).g;
    col.b = texture2D(uTex, uv - vec2(0.0025 * uGlitch, 0.0)).b;

    // key out the light studio background (outside the body area)
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float sat = max(max(col.r, col.g), col.b) - min(min(col.r, col.g), col.b);
    float bodyZone = smoothstep(0.30, 0.18, abs(uv.x - 0.5)) * smoothstep(0.78, 0.66, uv.y);
    float bg = smoothstep(0.72, 0.86, lum) * smoothstep(0.12, 0.04, sat) * (1.0 - bodyZone);
    float alpha = 1.0 - bg;

    // holographic grade: keep skin tones, cool the shadows
    vec3 cyan = vec3(0.13, 0.83, 0.93);
    vec3 graded = mix(col, col * vec3(0.82, 0.95, 1.08), 0.55);
    graded += cyan * 0.10 * (1.0 - lum);

    // scanlines + moving scan bar
    float scan = 0.92 + 0.08 * sin(uv.y * 900.0);
    float bar = smoothstep(0.02, 0.0, abs(fract(uv.y - uTime * 0.12) - 0.5) - 0.48);
    graded = graded * scan + cyan * bar * 0.35;

    // rim glow near the edges of the visible subject
    float edge = smoothstep(0.0, 0.5, alpha) * (1.0 - smoothstep(0.5, 1.0, alpha));
    graded += cyan * edge * 0.9;

    // soft fade at frame edges and bottom
    float fx = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x);
    float fy = smoothstep(0.0, 0.22, uv.y) * smoothstep(1.0, 0.95, uv.y);
    alpha *= fx * fy;

    // bottom-up reveal on load
    float rv = smoothstep(uReveal - 0.05, uReveal, uv.y);
    alpha *= 1.0 - rv;
    graded += cyan * (1.0 - smoothstep(0.0, 0.03, abs(uv.y - uReveal))) * 1.5;

    gl_FragColor = vec4(graded, alpha);
  }
`;

function Portrait({ texture }: { texture: THREE.Texture }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const img = texture.image as { width: number; height: number };
  const aspect = img.width / img.height;
  const height = 3.4;

  const uniforms = useMemo(
    () => ({ uTex: { value: texture }, uTime: { value: 0 }, uGlitch: { value: 0 }, uReveal: { value: 0 } }),
    [texture],
  );

  useFrame((state, dt) => {
    if (!mat.current || !group.current) return;
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uReveal.value = Math.min(1.05, uniforms.uReveal.value + dt * 0.45);
    const glitchPulse = Math.sin(t * 0.7) > 0.96 ? 1 : 0;
    uniforms.uGlitch.value += (glitchPulse - uniforms.uGlitch.value) * 0.2;
    group.current.rotation.y += (pointer.x * 0.28 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0.15, 0]}>
        <planeGeometry args={[height * aspect, height, 32, 32]} />
        <shaderMaterial
          ref={mat}
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
      {/* projector base */}
      <mesh position={[0, -1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.25, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -1.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function FallbackCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.4;
      ref.current.rotation.x += dt * 0.15;
    }
  });
  return (
    <Float speed={2} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#a78bfa" wireframe />
      </mesh>
    </Float>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (a.current) a.current.rotation.z += dt * 0.25;
    if (b.current) b.current.rotation.z -= dt * 0.18;
  });
  return (
    <group position={[0, 0.1, -0.4]}>
      <mesh ref={a} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.25, 0.008, 8, 160]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.55} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.9, 0.35, 0]}>
        <torusGeometry args={[2.6, 0.006, 8, 160]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Particles({ count = 500 }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.6;
      const th = Math.random() * Math.PI * 2;
      p[i * 3] = Math.cos(th) * r;
      p[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      p[i * 3 + 2] = Math.sin(th) * r - 1;
    }
    return p;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.05;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#67e8f9" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function FloatingShapes() {
  const shapes = useMemo(
    () => [
      { pos: [-2.6, 1.5, -1] as const, color: "#22d3ee", geo: "oct" },
      { pos: [2.7, -0.9, -0.8] as const, color: "#a78bfa", geo: "box" },
      { pos: [2.3, 1.9, -1.6] as const, color: "#f472b6", geo: "tet" },
      { pos: [-2.4, -1.2, -0.6] as const, color: "#4ade80", geo: "tet" },
    ],
    [],
  );
  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={1.4} floatIntensity={1.1}>
          <mesh position={s.pos as unknown as [number, number, number]}>
            {s.geo === "oct" && <octahedronGeometry args={[0.22]} />}
            {s.geo === "box" && <boxGeometry args={[0.28, 0.28, 0.28]} />}
            {s.geo === "tet" && <tetrahedronGeometry args={[0.22]} />}
            <meshBasicMaterial color={s.color} wireframe />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function GridFloor() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(14, 28, "#22d3ee", "#1e293b");
    const m = g.material as THREE.Material;
    m.transparent = true;
    m.opacity = 0.35;
    return g;
  }, []);
  return <primitive object={grid} position={[0, -1.65, 0]} />;
}

export default function HeroScene() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [failed, setFailed] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
    new THREE.TextureLoader().load(
      PORTRAIT_SRC,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 4;
        setTexture(t);
      },
      undefined,
      () => setFailed(true),
    );
  }, []);

  return (
    <Canvas
      dpr={[1, mobile ? 1.5 : 2]}
      camera={{ position: [0, 0.2, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <fog attach="fog" args={["#03050a", 6, 13]} />
      <GridFloor />
      <Rings />
      <Particles count={mobile ? 220 : 520} />
      <FloatingShapes />
      {texture ? <Portrait texture={texture} /> : failed ? <FallbackCore /> : null}
    </Canvas>
  );
}
