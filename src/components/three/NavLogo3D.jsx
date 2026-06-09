/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function CrossLogo() {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = [];
    const count = 600;

    for (let i = 0; i < count; i++) {
      const spread = (Math.random() - 0.5) * 0.12;
      if (i < count * 0.5) {
        // Barre horizontale
        positions.push(
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 0.7 + spread,
          (Math.random() - 0.5) * 0.1
        );
      } else {
        // Barre verticale
        positions.push(
          (Math.random() - 0.5) * 0.7 + spread,
          (Math.random() - 0.5) * 2.4,
          (Math.random() - 0.5) * 0.1
        );
      }
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    const scale = 1 + Math.sin(t * 1.5) * 0.06;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}  scale={1.8}>
      <PointMaterial
        transparent
        color="#ef4444"
        size={0.09}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.95}
      />
    </Points>
  );
}






export default function NavLogo3D() {
  return (
    <div style={{ width: 40, height: 40 }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <CrossLogo />
      </Canvas>
    </div>
  );
}