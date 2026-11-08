import { createEffectScope } from './lifecycle.js'
/* =========================================================
   ICOCO META — orbital view
   A real Earth (NASA Blue Marble + Earth at Night) rendered as
   a horizon limb in a single fragment shader: the planet keeps
   turning, the terminator drifts, and the sky answers the mouse.
   ========================================================= */
export function initSpace() {
  const scope = createEffectScope();

  const canvas = document.getElementById('spaceCanvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance'
  });

  if (!gl) {
    document.getElementById('marketing-root').classList.add('no-webgl');
    return;
  }

  const VS = `#version 300 es
  in vec2 aPos;
  void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

  const FS = `#version 300 es
  precision highp float;
  out vec4 outColor;

  uniform vec2  uRes;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uSpin;
  uniform float uTilt;
  uniform float uScroll;
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uGalaxy;
  uniform sampler2D uCloud;

  const float PI = 3.14159265359;

  float hash21(vec2 p){
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++){
      v += a * vnoise(p);
      p = p * 2.07 + vec2(11.3, 7.7);
      a *= 0.5;
    }
    return v;
  }

  vec3 starfield(vec2 p, float t){
    vec3 c = vec3(0.0);
    for (int i = 1; i <= 4; i++){
      float fi = float(i);
      vec2 q  = p * (26.0 * fi);
      vec2 id = floor(q);
      vec2 f  = fract(q) - 0.5;
      float h = hash21(id + fi * 37.0);
      if (h > 0.962){
        float d  = length(f);
        float tw = 0.55 + 0.45 * sin(t * (0.7 + h * 2.4) + h * 60.0);
        float mag = pow(hash21(id + 11.0), 3.0);
        c += mix(vec3(0.74,0.85,1.0), vec3(1.0,0.93,0.84), h)
             * smoothstep(0.085, 0.0, d) * tw * (0.28 + mag * 1.6) / fi;
      }
    }
    return c;
  }

  vec3 galaxy(vec2 p, vec2 mouse){
    vec2 c = vec2(0.515, 0.415) + mouse * vec2(0.012, 0.008);
    vec2 d = p - c;
    float a = -0.56;
    d = mat2(cos(a), -sin(a), sin(a), cos(a)) * d;
    vec2 uv = d / vec2(0.365, 0.255) * 0.5 + 0.5;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec3(0.0);
    vec3 s = texture(uGalaxy, uv).rgb;
    s = pow(s, vec3(1.18)) * 0.88;
    float m = smoothstep(0.0, 0.26, uv.x) * smoothstep(1.0, 0.74, uv.x)
            * smoothstep(0.0, 0.26, uv.y) * smoothstep(1.0, 0.74, uv.y);
    return s * m;
  }

  void main(){
    vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    float t = uTime;

    /* ---------- deep space ---------- */
    vec3 col = vec3(0.0025, 0.004, 0.009);

    /* interstellar nebulae — cold blue, violet and teal wisps */
    float nb1 = fbm(p * 1.55 + vec2(3.1, 1.7) + uMouse * 0.010);
    float nb2 = fbm(p * 2.25 - vec2(1.2, 4.2) - uMouse * 0.007);
    float nb3 = fbm(p * 1.05 + vec2(7.4, 2.3) + uMouse * 0.005);
    col += vec3(0.085, 0.14, 0.34) * pow(max(nb1 - 0.44, 0.0) * 1.8, 2.1) * 0.95;
    col += vec3(0.19, 0.085, 0.33) * pow(max(nb2 - 0.50, 0.0) * 1.9, 2.4) * 0.85;
    col += vec3(0.045, 0.16, 0.24) * pow(max(nb3 - 0.52, 0.0) * 1.7, 2.0) * 0.75;

    col += starfield(p + uMouse * 0.010, t) * 1.18;
    col += galaxy(p, uMouse) * 0.46;

    /* ---------- the planet ---------- */
    vec2  C = vec2(0.52 + uMouse.x * 0.018,
                  -3.30 + uMouse.y * 0.014 + uScroll * 0.30);
    float R = 3.24;
    vec2  v = p - C;
    float d = length(v);

    /* the sun touches the horizon at x = 0.36 */
    vec2 sunPos = vec2(0.360, -0.0640) + uMouse * vec2(0.008, 0.005);

    if (d < R) {
      float z = sqrt(max(R * R - d * d, 0.0));
      vec3  N = vec3(v, z) / R;

      /* axial tilt, then rotation */
      float ct = cos(uTilt), st = sin(uTilt);
      vec3 Nt = vec3(N.x, N.y * ct - N.z * st, N.y * st + N.z * ct);
      float yaw = 5.96 + uSpin;
      float ca = cos(yaw), sa = sin(yaw);
      vec3 Ng = vec3(ca * Nt.x - sa * Nt.z, Nt.y, sa * Nt.x + ca * Nt.z);

      float lat = asin(clamp(Ng.y, -1.0, 1.0));
      float lon = atan(Ng.x, Ng.z);
      vec2 uv = vec2(lon / (2.0 * PI) + 0.5, 0.5 - lat / PI);

      /* day to the left of the terminator, city lights to the right */
      float limbT   = clamp((p.x + 0.90) / 1.90, 0.0, 1.0);
      float dayMask = smoothstep(0.700, 0.540, limbT);
      float elev    = 0.46 + 0.84 * pow(clamp(N.z, 0.0, 1.0), 0.35);

      /* gradients, repaired across the 180° meridian seam */
      vec2 duvx = dFdx(uv), duvy = dFdy(uv);
      if (abs(duvx.x) > 0.5) duvx.x = 0.0;
      if (abs(duvy.x) > 0.5) duvy.x = 0.0;

      vec3 dayT   = textureGrad(uDay, uv, duvx, duvy).rgb;
      vec3 nightT = textureGrad(uNight, uv, duvx, duvy).rgb;

      /* ---------- city lights ----------
         the night map is only 1600 px wide and we are looking at it
         through a magnifying glass, so every cluster is rebuilt from
         three layers: the glowing street grid, a fine lattice of
         individual lamps, and a couple of blurred octaves for the spill. */
      float lum   = max(nightT.r, max(nightT.g, nightT.b));
      float src   = smoothstep(0.100, 0.450, lum);             /* lit ground */
      float core  = smoothstep(0.170, 0.700,
                               textureLod(uNight, uv, 1.0).r); /* downtown cores */
      float dense = max(src, core);

      /* lat/lon cells are squeezed toward the poles, so the lamp grid is
         laid out in equal-angle space — otherwise it aliases into blotches */
      vec2 suv = vec2(uv.x * max(cos(lat), 0.02), uv.y);

      /* lattice A — streets and suburbs */
      vec2  aq    = suv * vec2(2350.0, 1175.0);
      vec2  aid   = floor(aq);
      vec2  af    = fract(aq) - 0.5;
      float ah    = hash21(aid);
      vec2  aoff  = (vec2(hash21(aid + 13.7), hash21(aid + 27.3)) - 0.5) * 0.72;
      float alen  = length(af - aoff);
      float adot  = smoothstep(0.27, 0.02, alen) * step(0.70, ah);
      float ahalo = smoothstep(0.62, 0.05, alen) * step(0.70, ah);
      float amag  = 0.35 + 2.20 * pow(hash21(aid + 71.3), 2.4);
      float tw    = 0.88 + 0.12 * sin(t * 1.7 + ah * 63.0);

      /* lattice B — the dense cores of megacities */
      vec2  bq    = suv * vec2(5200.0, 2600.0);
      vec2  bid   = floor(bq);
      vec2  bf    = fract(bq) - 0.5;
      vec2  boff  = (vec2(hash21(bid + 5.1), hash21(bid + 9.4)) - 0.5) * 0.66;
      float bdot  = smoothstep(0.28, 0.03, length(bf - boff)) * step(0.60, hash21(bid + 41.0));

      float lamps = src * (0.05 + 2.30 * adot * amag * tw + 0.34 * ahalo * amag)
                  + core * (0.03 + 2.10 * bdot);

      vec3 amber = vec3(1.00, 0.34, 0.09);
      vec3 warm  = vec3(1.00, 0.60, 0.24);
      vec3 hot   = vec3(1.00, 0.95, 0.86);

      vec3 lights = mix(amber, warm, smoothstep(0.0, 0.70, src)) * lamps * 2.60;
      lights = mix(lights, hot * lamps * 2.40, core * 0.40);
      lights += hot * pow(core, 2.6) * 0.55;   /* white-hot downtown */

      /* atmospheric spill — tight, follows the shape of the cluster */
      lights += textureLod(uNight, uv, 0.9).rgb * vec3(1.00, 0.58, 0.28) * 0.16;
      lights += textureLod(uNight, uv, 1.6).rgb * vec3(1.00, 0.54, 0.24) * 0.12;
      lights += textureLod(uNight, uv, 3.2).rgb * vec3(1.00, 0.42, 0.16) * 0.06;
      lights *= 0.62 + 0.38 * smoothstep(0.0, 0.55, dense);
      lights = lights / (1.0 + 0.30 * max(lights.r, max(lights.g, lights.b)));

      /* ---------- clouds ---------- */
      float cl = textureLod(uCloud, uv, 3.1).r;
      cl = smoothstep(0.52, 0.96, cl);

      /* ---------- day side: relief, sunlit haze ---------- */
      vec2  tx   = vec2(1.35 / 2048.0, 1.35 / 1024.0);
      float h0   = dot(textureLod(uDay, uv, 1.2).rgb, vec3(0.299, 0.587, 0.114));
      float hx   = dot(textureLod(uDay, uv + vec2(tx.x, 0.0), 1.8).rgb, vec3(0.299, 0.587, 0.114));
      float hy   = dot(textureLod(uDay, uv + vec2(0.0, tx.y), 1.8).rgb, vec3(0.299, 0.587, 0.114));
      float relief = clamp(1.0 - (hx - h0) * 2.2 - (hy - h0) * 1.4, 0.76, 1.24);
      float ocean  = smoothstep(0.150, 0.045, h0);

      vec3 dayCol = pow(dayT, vec3(1.06)) * vec3(0.90, 0.98, 1.16)
                  * relief * elev * (0.85 + 0.40 * dayMask) * 2.75;
      dayCol *= 1.0 + ocean * 0.22;

      /* earthshine: continents faintly readable under the night side */
      vec3 earthshine = vec3(0.24, 0.30, 0.42) * smoothstep(0.10, 0.55, h0) * 0.045;

      /* the limb swallows the lights — atmosphere gets thicker edge-on */
      lights *= mix(0.52, 1.0, pow(clamp(N.z, 0.0, 1.0), 0.35));

      vec3 nightCol = lights * (1.0 - 0.16 * cl) + earthshine
                    + vec3(0.005, 0.013, 0.030);

      /* airglow: city light scattering in the thin band above the horizon */
      float limbHaze = pow(1.0 - clamp(N.z, 0.0, 1.0), 10.0);
      nightCol += vec3(1.00, 0.56, 0.26) * limbHaze * 0.085;

      vec3 base = mix(nightCol, dayCol, dayMask);

      /* --- the light: blue scatter, hard rim, hot spot --- */
      float ndz     = clamp(N.z, 0.0, 1.0);
      float rimThin = pow(1.0 - ndz, 24.0);
      float rimSoft = pow(1.0 - ndz, 5.0);
      float dSun    = length(p - sunPos);
      float sunGlow = exp(-dSun * 3.2);

      base += vec3(0.05, 0.18, 0.44) * rimSoft * 0.50;
      base += vec3(0.58, 0.90, 1.0) * rimThin * (0.60 + 2.10 * sunGlow);
      base += vec3(1.0, 0.95, 0.86) * rimThin * exp(-dSun * 13.0) * 2.40;

      col = base;
    } else {
      float dr    = d - R;
      float dSun  = length(p - sunPos);
      float sunK  = 0.55 + 1.45 * exp(-dSun * 3.2);
      float line  = exp(-dr * 320.0);
      float glow  = exp(-dr * 52.0);
      float halo  = exp(-dr * 7.0);

      col += mix(vec3(0.42, 0.80, 1.0), vec3(0.97, 1.0, 1.0), exp(-dSun * 4.0))
           * line * 1.90 * sunK;
      col += vec3(0.27, 0.64, 1.0) * glow * 0.48 * sunK;
      col += vec3(0.08, 0.30, 0.80) * halo * 0.120 * sunK;
    }

    /* ---------- sun glint ---------- */
    float g  = length(p - sunPos);
    vec2  gp = p - sunPos;

    /* white-hot core, then a bloom that fades into the haze */
    col += vec3(1.0, 0.99, 0.97) * (5.20 * exp(-g * g * 120000.0) + 1.05 * exp(-g * 44.0));
    col += vec3(0.90, 0.97, 1.0) * 0.17 * exp(-g * 9.0);

    /* anamorphic streak + soft horizon bloom */
    col += vec3(0.90, 0.98, 1.0) * exp(-abs(gp.y) * 700.0) * exp(-abs(gp.x) * 6.5) * 0.70;
    col += vec3(0.46, 0.76, 1.0) * exp(-abs(gp.y) * 130.0) * exp(-abs(gp.x) * 3.2) * 0.09;

    /* ---------- grade ---------- */
    col *= 1.0 - 0.30 * smoothstep(0.55, 1.35, length(p * vec2(0.82, 1.0)));
    col *= 1.05;
    col = vec3(1.0) - exp(-col * 1.30);
    col = pow(col, vec3(0.94));

    outColor = vec4(col, 1.0);
  }`;

  function shader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('shader', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  const vs = shader(gl.VERTEX_SHADER, VS);
  const fs = shader(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('link', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = {
    res: gl.getUniformLocation(prog, 'uRes'),
    time: gl.getUniformLocation(prog, 'uTime'),
    mouse: gl.getUniformLocation(prog, 'uMouse'),
    spin: gl.getUniformLocation(prog, 'uSpin'),
    tilt: gl.getUniformLocation(prog, 'uTilt'),
    scroll: gl.getUniformLocation(prog, 'uScroll'),
    day: gl.getUniformLocation(prog, 'uDay'),
    night: gl.getUniformLocation(prog, 'uNight'),
    galaxy: gl.getUniformLocation(prog, 'uGalaxy'),
    cloud: gl.getUniformLocation(prog, 'uCloud')
  };

  const aniso = gl.getExtension('EXT_texture_filter_anisotropic');

  function loadTexture(src, unit) {
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([5, 8, 14, 255]));
    const img = new Image();
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
      if (aniso) {
        const max = gl.getParameter(aniso.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(max, 16));
      }
    };
    img.src = src;
    return tex;
  }

  const TEX = window.EARTH_TEX || {};
  if (TEX.day) loadTexture(TEX.day, 0);
  if (TEX.night) loadTexture(TEX.night, 1);
  if (TEX.galaxy) loadTexture(TEX.galaxy, 2);
  if (TEX.cloud) loadTexture(TEX.cloud, 3);
  gl.uniform1i(U.day, 0);
  gl.uniform1i(U.night, 1);
  gl.uniform1i(U.galaxy, 2);
  gl.uniform1i(U.cloud, 3);

  const state = {
    mx: 0, my: 0, tx: 0, ty: 0,
    spin: 0, spinVel: 0,
    drag: false, lastX: 0,
    scroll: 0
  };

  /* axial tilt of the globe */
  const tilt = 0.26;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U.res, canvas.width, canvas.height);
  }

  resize();
  scope.listen(window, 'resize', resize);

  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    scope.listen(window, 'pointermove', e => {
      state.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      state.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  scope.listen(canvas, 'pointerdown', e => {
    state.drag = true;
    state.lastX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add('is-dragging');
  });
  scope.listen(canvas, 'pointermove', e => {
    if (!state.drag) return;
    state.spinVel += (e.clientX - state.lastX) * 0.00042;
    state.lastX = e.clientX;
  });
  const endDrag = () => { state.drag = false; canvas.classList.remove('is-dragging'); };
  scope.listen(canvas, 'pointerup', endDrag);
  scope.listen(canvas, 'pointercancel', endDrag);

  scope.listen(window, 'scroll', () => {
    state.scroll = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
  }, { passive: true });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let last = performance.now();

  /* ?t=9.0 freezes the globe at a given moment — used for visual review */
  const qs = new URLSearchParams(location.search);
  const FIXED = qs.has('t') ? parseFloat(qs.get('t')) : null;

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    state.mx += (state.tx - state.mx) * 0.045;
    state.my += (state.ty - state.my) * 0.045;

    if (!state.drag) state.spinVel += (0 - state.spinVel) * 0.022;
    if (!reduce) state.spin += dt * 0.0125 + state.spinVel;
    else state.spin += state.spinVel;
    state.spinVel *= 0.955;

    gl.uniform1f(U.time, FIXED !== null ? FIXED : now / 1000);
    gl.uniform2f(U.mouse, state.mx, state.my);
    gl.uniform1f(U.spin, (FIXED !== null ? FIXED * 0.0125 : state.spin) * 6.2831853
                         + state.spinVel * 6.2831853);
    gl.uniform1f(U.tilt, tilt);
    gl.uniform1f(U.scroll, state.scroll);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    scope.frame(frame);
  }

  scope.frame(frame);
  return () => {
    scope.dispose();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}
