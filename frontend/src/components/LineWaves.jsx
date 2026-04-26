import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";

function hexToVec3(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  float wave = sin((uv.x + uTime * 0.15) * 20.0) * 0.5 + 0.5;
  float wave2 = cos((uv.y + uTime * 0.1) * 18.0) * 0.5 + 0.5;
  float mixWave = (wave + wave2) * 0.5;

  vec3 color = mix(uColor1, uColor2, wave);
  color = mix(color, uColor3, wave2);
  color *= mixWave * uBrightness;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function LineWaves({
  brightness = 0.2,
  color1 = "#ffffff",
  color2 = "#ffffff",
  color3 = "#ffffff",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [window.innerWidth, window.innerHeight] },
        uBrightness: { value: brightness },
        uColor1: { value: hexToVec3(color1) },
        uColor2: { value: hexToVec3(color2) },
        uColor3: { value: hexToVec3(color3) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    containerRef.current.appendChild(gl.canvas);

    const resize = () => {
      renderer.setSize(
        containerRef.current.offsetWidth,
        containerRef.current.offsetHeight
      );
      program.uniforms.uResolution.value = [
        gl.canvas.width,
        gl.canvas.height,
      ];
    };

    window.addEventListener("resize", resize);
    resize();

    let animationFrame;

    const update = (t) => {
      animationFrame = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };

    animationFrame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      if (containerRef.current?.contains(gl.canvas)) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [brightness, color1, color2, color3]);

  return <div ref={containerRef} className="w-full h-full" />;
}
