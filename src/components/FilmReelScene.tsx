import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD = "#f5c518";

function Reel() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const holes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return [Math.cos(a) * 1.15, Math.sin(a) * 1.15] as const;
      }),
    [],
  );

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;
    g.rotation.z += dt * 0.35;
    const targetX = pointer.y * 0.45;
    const targetY = pointer.x * 0.55;
    g.rotation.x += (targetX - g.rotation.x) * (1 - Math.exp(-3 * dt));
    g.rotation.y += (targetY - g.rotation.y) * (1 - Math.exp(-3 * dt));
  });

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[1.75, 0.12, 20, 96]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.42, 0.1, 16, 64]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh>
        <circleGeometry args={[1.75, 96]} />
        <meshStandardMaterial
          color="#141414"
          metalness={0.4}
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {holes.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.02]}>
          <torusGeometry args={[0.3, 0.055, 12, 40]} />
          <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Dust() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const r = 2.6 + Math.random() * 3.2;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p) * 0.4;
    }
    return arr;
  }, []);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (points.current) points.current.rotation.y += dt * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.035} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

export function FilmReelScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} color="#fff3c4" />
      <directionalLight position={[-5, -3, 2]} intensity={0.9} color="#5b7cff" />
      <Reel />
      <Dust />
    </Canvas>
  );
}

export default FilmReelScene;
