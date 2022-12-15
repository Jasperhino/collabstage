import { useCallback } from 'react';
import type { Container, Engine, HoverMode } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

export default function ParticlesContainer() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
  }, []);
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 0,
          },
          color: {
            value: '#fff',
          },
          life: {
            duration: {
              value: 1,
              sync: false,
            },
            count: 1,
          },
          opacity: {
            value: { min: 0.1, max: 1 },
            animation: {
              enable: true,
              speed: 5,
            },
          },
          size: {
            value: {
              min: 1,
              max: 2,
            },
          },
          move: {
            enable: true,
            speed: 2,
            random: false,
            size: true,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'trail',
            },
            resize: true,
          },
          modes: {
            trail: {
              delay: 0,
              pauseOnStop: true,
              quantity: 8,
            },
          },
        },
        background: {
          color: '#000',
        },
      }}
    />
  );
}
