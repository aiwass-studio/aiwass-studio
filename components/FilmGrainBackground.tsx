import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Floating Particles Component
 * Simulates dust particles in old film projector light
 */
function FilmDustParticles() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 250;

    // Generate random positions for particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;
            const scale = Math.random() * 0.05 + 0.02;
            const speed = Math.random() * 0.0005 + 0.0002;
            temp.push({ x, y, z, scale, speed });
        }
        return temp;
    }, []);

    // Animate particles with floating motion
    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const dummy = new THREE.Object3D();

        particles.forEach((particle, i) => {
            // Floating animation
            const offsetY = Math.sin(time * particle.speed + i) * 0.5;
            const offsetX = Math.cos(time * particle.speed * 0.5 + i) * 0.2;

            dummy.position.set(
                particle.x + offsetX,
                particle.y + offsetY,
                particle.z
            );
            dummy.scale.set(particle.scale, particle.scale, particle.scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial
                color="#8B3A18"
                transparent
                opacity={0.15}
                depthWrite={false}
            />
        </instancedMesh>
    );
}

/**
 * Interactive Geometry Component
 * Low-poly shape that follows mouse movement
 */
function InteractiveGeometry() {
    const meshRef = useRef<THREE.Mesh>(null);
    const targetPosition = useRef({ x: 0, y: 0 });

    // Track mouse position
    useFrame((state) => {
        if (!meshRef.current) return;

        // Update target based on mouse
        targetPosition.current.x = state.pointer.x * 2;
        targetPosition.current.y = state.pointer.y * 2;

        // Smooth lerp to target
        meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * 0.05;
        meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * 0.05;

        // Slow rotation
        meshRef.current.rotation.x += 0.002;
        meshRef.current.rotation.y += 0.003;
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.5}
        >
            <mesh ref={meshRef} position={[0, 0, -3]}>
                <icosahedronGeometry args={[2, 1]} />
                <meshBasicMaterial
                    color="#2CFF05"
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </mesh>
        </Float>
    );
}

/**
 * Film Grain Background Component
 * Main 3D scene wrapper
 */
export const FilmGrainBackground = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                {/* Ambient light for subtle illumination */}
                <ambientLight intensity={0.5} />

                {/* Film dust particles */}
                <FilmDustParticles />

                {/* Interactive geometry */}
                <InteractiveGeometry />
            </Canvas>
        </div>
    );
};
