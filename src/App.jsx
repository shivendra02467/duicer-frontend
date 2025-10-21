import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from "framer-motion";


function Home() {
  function Icosahedron() {
    const meshRef = useRef();

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }
    });

    return (
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshNormalMaterial flatShading transparent opacity={1.0} />
      </mesh>
    );
  }

  return (
    <motion.div className="flex min-h-screen items-center justify-center text-center relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Canvas
        style={{ width: '40vw', height: '40vh'}}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 3], fov: 75 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />
        <Icosahedron />
      </Canvas>
      <div className="absolute w-[35vh] h-[35vh] top-0 bottom-0 left-0 right-0 m-auto animate-[spin_20s_linear_infinite]">
        <img src='/dodeca-1.svg' className='absolute bottom-0 right-0 w-[25%] h-[25%] animate-[spin_5000ms_linear_infinite]'/>
        <img src='/dodeca-2.svg' className='absolute top-0 right-0 w-[25%] h-[25%] animate-[spin_5000ms_linear_infinite]'/>
        <img src='/icosa-1.svg' className='absolute top-0 left-0 w-[25%] h-[25%] animate-[spin_5000ms_linear_infinite]'/>
        <img src='/icosa-2.svg' className='absolute bottom-0 left-0 w-[25%] h-[25%] animate-[spin_5000ms_linear_infinite]'/>
      </div>
      <h2 className="text-4xl font-bold absolute top-[10vh]">Exploring Math, Physics, Programming and Fun Ideas</h2>
      <img src='/duicer.svg' className='absolute m-auto top-0 right-0 bottom-0 left-0 w-[36vh] h-[20vh] [filter:drop-shadow(0.8vh_0.5vh_0px_rgba(0,0,0,1))]'/>
      <div className="flex absolute bottom-[10vh] gap-10 justify-center items-center">
        <a
          href="https://www.youtube.com/@duicer"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Go to YouTube"
        >
          <img src='/youtube.svg' />
        </a>
        <a
          href="https://github.com/shivendra02467"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Go to Github"
        >
          <img src='/github.svg' />
        </a>
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white bg-black bg-banner">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
