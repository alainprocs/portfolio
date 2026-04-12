"use client"

import { useRef, useEffect } from "react"

// ── WebGL shader canvas ────────────────────────────────────────────
// Adapted from ravikatiyar / animated-shader-hero
// Colors changed: orange fire → white / silver meteors on deep-dark background

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}
  return t;
}
float clouds(vec2 p){
  float d=1.,t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);d=a;p*=2./(i+1.);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  // Shift rendering centre upward.
  // On portrait screens (mobile) the aspect ratio < 1, so we add extra upward
  // offset to keep meteors above the text. On landscape (desktop) no bonus.
  float aspect = R.x / R.y;
  float mobileBoost = smoothstep(1.0, 0.45, aspect); // 0 on desktop, ~1 on phone portrait
  // Slight upward nudge only — meteors cover the whole hero centre including pill gap
  uv.y -= 0.08 + mobileBoost * 0.10;
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<16.;i++){
    // Very wide step — meteors scatter far apart across full hero area
    uv+=.10*cos(i*vec2(.1+.01*i,.25)+i*i+T*.6+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    // Bigger (+50%) and 5% dimmer than previous values
    col+=.00170/d*(cos(sin(i)*vec2(.2,.4).xyxy.xyz+.2)+1.)*vec3(0.82,0.90,1.0);
    float b=noise(i+p+bg*1.731);
    col+=.00243*b/length(max(p,vec2(b*p.x*.02,p.y)))*vec3(0.75,0.85,1.0);
    col=mix(col,vec3(bg*.018,bg*.018,bg*.032),d);
  }
  // Mask only the very bottom edge (below pill text) — rest of hero fully lit
  float screenY = FC.y / R.y;
  float textMask = smoothstep(0.02, 0.18, screenY);
  col *= textMask;
  O=vec4(col,1);
}
`

const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

export function AnimatedShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const glRef     = useRef<WebGL2RenderingContext | null>(null)
  const progRef   = useRef<WebGLProgram | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl2")
    if (!gl) return
    glRef.current = gl

    // Compile shaders
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const vs   = compile(gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs   = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    progRef.current = prog

    // Fullscreen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, "position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width  = canvas.clientWidth  * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const uRes  = gl.getUniformLocation(prog, "resolution")
    const uTime = gl.getUniformLocation(prog, "time")

    const render = (t: number) => {
      gl.useProgram(prog)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t * 1e-3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current!)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  )
}
