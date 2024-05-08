import { useEffect, useMemo, useRef, useState } from "react";
import { Cloud, Clouds } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Main App component
export function ErrorLightning() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState<Boolean>(false);

    useEffect(() => {
        setIsLoaded(true); // Set the loaded state to true when the component mounts
      }, []);

    //check if the display screen is mobile
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center rounded-sm bg-gray-300">
      {!isLoaded && <Loader />}
      {isLoaded && (
        <>
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="mx-auto items-center ">
              <div className="max-auto w-72 text-center  lg:w-96">
                <div className="mx-auto w-full">
                  <h1 className="text-4xl font-bold tracking-tighter text-neutral-100 md:text-6xl">
                    The page you are looking for does not exist. How you got here is a mystery.
                  </h1>
                  <p className="mx-auto mt-4 max-w-xl text-sm tracking-tight text-neutral-100 md:text-xl">
                    But you can click the button below to go back to the homepage.
                    <a href="/" type="button" className="block mt-4 text-lg font-semibold">
                        Home
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Canvas camera={{ position: [0, -10, 10], fov: 75 }}>
            <Sky isMobile={isMobile} />
            <ambientLight intensity={Math.PI / 10} />
            <Rain isMobile={isMobile} />
            <FlashLightning />
          </Canvas>
        </>
      )}
    </div>
  );
}

function Loader() {
    return (
      <div className="loader">
        Loading...
      </div>
    );
}
  

// Rain component to create a rain effect
function Rain({ isMobile }: { isMobile: Boolean }) {
    console.log(isMobile);
  const rainCount = isMobile ? 6000 : 10000;
  const rainGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(rainCount * 3);

    // Position each raindrop randomly in space
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = Math.random() * 400 - 200; // x position
      positions[i * 3 + 1] = Math.random() * 500 - 250; // y position
      positions[i * 3 + 2] = Math.random() * 400 - 200; // z position
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [rainCount]);

  const rainMat = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: isMobile ? 0.1 : 0.6,
    transparent: true,
  });

  // Animation for raindrops falling
  useFrame(() => {
    const positions = rainGeo.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3 + 1] -= 0.6; // Move raindrop down
      if (positions[i * 3 + 1] < -200) {
        positions[i * 3 + 1] = 200; // Reset raindrop to top
      }
    }
    rainGeo.attributes.position.needsUpdate = true;
  });

  return <points geometry={rainGeo} material={rainMat} />;
}

// Component to simulate lightning flashes
const FlashLightning = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useEffect(() => {
    // Create lightning effect at random intervals
    const interval = setInterval(() => {
      if (lightRef.current) {
        lightRef.current.intensity = 10000 + Math.random() * 1000000;
        lightRef.current.distance = 10000;
        lightRef.current.color.setHSL(0.6, 0.5, 1);
      }

      // Turn off the light quickly to create a flash effect
      setTimeout(() => {
        if (lightRef.current) {
          lightRef.current.intensity = 0;
        }
      }, 50);
    }, Math.random() * 10000 + 5000);

    return () => clearInterval(interval);
  }, []);

  return <pointLight ref={lightRef} position={[0, 0, 0]} />;
};

// Sky component to add clouds
function Sky({ isMobile }: { isMobile: Boolean }) {
  const ref = useRef<any>();
  const cloud0 = useRef<any>();
  const { color, x, y, z, ...config } = {
    seed: 1,
    segments: 20,
    volume: 6,
    opacity: 0.8,
    fade: 10,
    growth: 4,
    speed: 0.1,
    x: 6,
    y: 1,
    z: 1,
    color: "#f4f4f5",
  };

  // Animation for clouds rotation
  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 10) / 2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 10) / 2;
  });

  return (
    <>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400}>
          {/* Cloud instances with different configurations */}
          <Cloud ref={cloud0} {...config} bounds={[x, y, z]} color={"gray"} />
          {/* Additional clouds can be added here */}
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color=  {isMobile ? "gray" : "red"}
            seed={2}
            position={[15, 0, 0]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color= {isMobile ? "gray" : "red"}
            seed={3}
            position={[-15, 0, 0]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color="red"
            seed={4}
            position={[0, 0, -12]}
          />
          <Cloud
            {...config}
            bounds={[x, y, z]}
            color="red"
            seed={5}
            position={[0, 0, 12]}
          />
          <Cloud
            concentrate="outside"
            growth={100}
            color="gray"
            opacity={1.25}
            seed={0.3}
            bounds={200}
            volume={200}
          />
        </Clouds>
      </group>
    </>
  );
}
