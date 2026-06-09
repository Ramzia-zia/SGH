/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import "three";


// Particules en forme de croix médicale
function CrossParticles() {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = [];
    const count = 3000;

    for (let i = 0; i < count; i++) {
      
      const spread = (Math.random() - 0.5) * 0.18;

      // Barre horizontale
      if (i < count * 0.4) {
        positions.push(
          (Math.random() - 0.5) * 3.2,
          (Math.random() - 0.5) * 0.9 + spread,
          (Math.random() - 0.5) * 0.3
        );
      }
      // Barre verticale
      else if (i < count * 0.8) {
        positions.push(
          (Math.random() - 0.5) * 0.9 + spread,
          (Math.random() - 0.5) * 3.2,
          (Math.random() - 0.5) * 0.3
        );
      }
      // Particules orbitales autour de la croix
      else {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.8 + Math.random() * 1.2;
        positions.push(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          (Math.random() - 0.5) * 1.5
        );
      }
    }

    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(t * 0.2) * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    ref.current.rotation.y = t * 0.08;

    // Pulsation
    const scale = 1 + Math.sin(t * 1.2) * 0.04;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.028}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

// Particules orbitales vertes
function OrbitParticles() {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = [];
    const count = 800;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + Math.sin(i * 0.5) * 0.4;
      const height = Math.sin(i * 0.3) * 0.6;
      positions.push(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#10b981"
        size={0.022}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

// Étoiles de fond
function BackgroundStars() {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 1200; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.015;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.008;
  });

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#94a3b8"
        size={0.012}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export default function MedicalHero3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <BackgroundStars />
        <OrbitParticles />
        <CrossParticles />
      </Canvas>
    </div>
  );
}