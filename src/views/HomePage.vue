<script setup>
/* ICOCO META — homepage.
   Markup is the approved design; the WebGL horizon and the scroll
   choreography live in src/site and are started after mount so they
   always find their DOM nodes. */
import { onMounted } from 'vue'
import '@/site/textures.js'
import { initSpace } from '@/site/space.js'
import { initInteractions } from '@/site/interactions.js'

onMounted(() => {
  initSpace()
  initInteractions()
})
</script>

<template>
<div class="scroll-progress"><span id="scrollBar"></span></div>
<div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<!-- ============ NAV ============ -->
<header class="nav" id="nav">
  <div class="nav__inner">
    <a class="nav__logo" href="#home" aria-label="ICOCO META home">
      <img src="../assets/img/logo.png" alt="ICOCO META" />
    </a>

    <nav class="nav__links" id="navLinks" aria-label="Main">
      <a href="#home" class="nav__link is-active" data-nav="home">Home</a>
      <a href="#products" class="nav__link" data-nav="products">Products</a>
      <a href="#news" class="nav__link" data-nav="news">Credentials</a>
      <a href="#about" class="nav__link" data-nav="about">About</a>
      <span class="nav__ink" id="navInk" aria-hidden="true"></span>
    </nav>

    <a href="#contact" class="nav__cta" data-magnetic>
      <span>Request a demo</span>
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M12 4H6M12 4V10" /></svg>
    </a>

    <button class="nav__burger" id="burger" aria-label="Menu" aria-expanded="false">
      <span></span><span></span>
    </button>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu">
  <a href="#home">Home</a>
  <a href="#products">Products</a>
  <a href="#news">Credentials</a>
  <a href="#about">About</a>
  <a href="#contact">Request a demo</a>
</div>

<main>
<!-- ============ HERO ============ -->
<section class="hero" id="home">
  <div class="hero__stage" id="heroStage">
    <canvas id="spaceCanvas" class="hero__canvas"></canvas>
    <div class="hero__grade" aria-hidden="true"></div>

    <div class="hero__copy" id="heroContent">
      <h1 class="hero__title">
        <span class="line"><span>ICOCO META</span></span>
        <span class="line"><span>Industrial AI</span></span>
      </h1>
      <p class="hero__lead">The Tri-Engine AI Platform</p>
      <p class="hero__sub">One platform. Broader industries. A brighter tomorrow.</p>
      <div class="hero__facts">
        <div class="hero__fact"><b>03</b><span>Engines</span></div>
        <div class="hero__fact"><b>06</b><span>Disciplines</span></div>
        <div class="hero__fact"><b>300+</b><span>Vehicles</span></div>
      </div>
    </div>

    <div class="hero__side" aria-hidden="true">Future Mobility · Industrial AI</div>

    <div class="hero__hint" id="heroHint" aria-hidden="true"><i></i>Scroll to explore</div>
  </div>
</section>

<!-- ============ CAPABILITIES ============ -->
<section class="caps" id="capabilities">
  <div class="hero__cards" id="heroCards">
    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-automotive.jpg" alt="Electric vehicle in a studio" loading="lazy"></div>
      <div class="capcard__body">
        <h3>Automotive</h3>
        <span class="capcard__rule"></span>
        <p>Smarter vehicles.<br>Safer, cleaner mobility.</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-cae.jpg" alt="Aerodynamic simulation of a car" loading="lazy"></div>
      <div class="capcard__body">
        <h3>CAE</h3>
        <span class="capcard__rule"></span>
        <p>Higher fidelity.<br>Faster innovation.</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-digital.jpg" alt="Engineer working on a CAD model" loading="lazy"></div>
      <div class="capcard__body">
        <h3>Digital Engineering</h3>
        <span class="capcard__rule"></span>
        <p>From idea to impact.<br>Connected by data.</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-physical.jpg" alt="Robotic arm on an assembly line" loading="lazy"></div>
      <div class="capcard__body">
        <h3>Physical AI</h3>
        <span class="capcard__rule"></span>
        <p>Intelligent systems<br>for the real world.</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-robotics.jpg" alt="Autonomous mobile robot in a warehouse" loading="lazy"></div>
      <div class="capcard__body">
        <h3>Robotics</h3>
        <span class="capcard__rule"></span>
        <p>Autonomy at scale.<br>A more productive world.</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-software.jpg" alt="Industrial software dashboard" loading="lazy"></div>
      <div class="capcard__body">
        <h3>Industrial Software</h3>
        <span class="capcard__rule"></span>
        <p>Intelligence for<br>industrial progress.</p>
      </div>
    </article>
  </div>
</section>

<!-- ============ LANDSCAPE ============ -->
<section class="section" id="landscape">
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span>01</span>The gap</div>
      <h2 class="h2">Specialized tools span the workflow.<br><span class="dim">Innovation gets lost between them.</span></h2>
      <p class="lede">Disciplines, data models and interfaces differ. AIGC images, CAD models and CAE meshes live in separate worlds — and every handover costs time, intent and engineering truth.</p>
    </div>

    <div class="stack">
      <div class="stack__grid">
        <article class="stack__col reveal" style="--d:.05s">
          <div class="stack__label">AIGC / Styling</div>
          <h3>Creative exploration &amp; visual concepts</h3>
          <div class="chips"><span>Vizcom</span><span>Adobe Firefly</span><span>Midjourney</span></div>
          <div class="stack__out"><span>Output</span>Images / concept meshes</div>
        </article>
        <article class="stack__col reveal" style="--d:.12s">
          <div class="stack__label">CAD / Geometry</div>
          <h3>Surfaces, parts &amp; assemblies</h3>
          <div class="chips"><span>Alias</span><span>CATIA</span><span>Siemens NX</span><span>Rhino</span><span>ICEM Surf</span></div>
          <div class="stack__out"><span>Output</span>NURBS / B-rep / feature models</div>
        </article>
        <article class="stack__col reveal" style="--d:.19s">
          <div class="stack__label">CAE / Physics</div>
          <h3>Simulation, optimization &amp; validation</h3>
          <div class="chips"><span>Ansys</span><span>SIMULIA</span><span>Simcenter</span><span>Star-CCM+</span><span>LS-DYNA</span></div>
          <div class="stack__out"><span>Output</span>Meshes / physics models / results</div>
        </article>
      </div>

      <div class="friction reveal" style="--d:.26s">
        <span class="friction__tag">Cross-tool friction</span>
        <div class="friction__items">
          <span>Format conversion</span><span>Geometry rebuilds</span><span>Lost constraints</span><span>Repeated setup</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ PRODUCTS ============ -->
<section class="section section--products" id="products">
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span>02</span>The platform</div>
      <h2 class="h2">From vehicle design to<br><span class="grad">engineering intelligence.</span></h2>
      <p class="lede">Three intelligence layers — AIGC, AI + CAD and AI + CAE — share one vehicle model, so styling intent survives into geometry and physics.</p>
    </div>

    <div class="engines">
      <article class="engine reveal" style="--d:.05s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">01</span>
          <span class="engine__line"></span>
          <span class="enginetag">AIGC</span>
        </div>
        <h3>Generative Styling<br>Intelligence</h3>
        <p>Explore bold styling directions guided by brand DNA, DRG signatures and vehicle package constraints.</p>
        <ul class="tags"><li>Brand DNA</li><li>DRG signatures</li><li>Package constraints</li></ul>
      </article>

      <article class="engine reveal" style="--d:.13s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">02</span>
          <span class="engine__line"></span>
          <span class="enginetag">AI + CAD</span>
        </div>
        <h3>Geometric &amp;<br>Surface Intelligence</h3>
        <p>Bridge styling intent and editable engineering geometry through view calibration, parametric part definition and local Mesh-to-NURBS reconstruction.</p>
        <ul class="tags"><li>View calibration</li><li>Parametric parts</li><li>Mesh-to-NURBS</li></ul>
      </article>

      <article class="engine reveal" style="--d:.21s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">03</span>
          <span class="engine__line"></span>
          <span class="enginetag">AI + CAE</span>
        </div>
        <h3>Physics &amp;<br>Validation Intelligence</h3>
        <p>Bring physics feedback into early design with DeepPhysic and Yugong — aerodynamics, forming and crash feasibility assessed before costly rework.</p>
        <ul class="tags"><li>DeepPhysic</li><li>Yugong</li><li>Early feasibility</li></ul>
      </article>
    </div>

    <div class="wf reveal" style="--d:.26s">
      <div class="wf__head">Standard workflow · brand DNA governance</div>
      <div class="wf__steps">
        <div class="wf__step"><b>01</b><span>Brief &amp; constraints</span></div>
        <div class="wf__step"><b>02</b><span>Design exploration</span></div>
        <div class="wf__step"><b>03</b><span>Consistency review</span></div>
        <div class="wf__step"><b>04</b><span>Engineering handover</span></div>
      </div>
      <div class="wf__notes">
        <div class="wf__note">
          <h4>Shared context</h4>
          <p>Package constraints, moodboards and branched alternatives live in one visual workspace.</p>
        </div>
        <div class="wf__note">
          <h4>Brand DNA review</h4>
          <p>Compare DRG, lighting signatures, stance and surface character across vehicle studies.</p>
        </div>
      </div>
    </div>

    <div class="classes reveal">
      <div class="classes__label">One design language. Multiple vehicle classes.</div>
      <div class="classes__items">
        <div class="classes__item"><span>Wagon</span><i></i></div>
        <div class="classes__item"><span>Van</span><i></i></div>
        <div class="classes__item"><span>Pickup</span><i></i></div>
        <div class="classes__item"><span>+ Your platform</span><i></i></div>
      </div>
    </div>
  </div>
</section>

<!-- ============ DISCIPLINES ============ -->
<section class="section section--disc" id="disciplines">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div class="reveal">
        <div class="eyebrow"><span>03</span>Coverage</div>
        <h2 class="h2">Six disciplines.<br><span class="dim">One controlled baseline.</span></h2>
      </div>
      <p class="lede reveal" style="--d:.1s">Design, engineering and manufacturing work from the same baseline — so decisions made in styling stay traceable through release.</p>
    </div>

    <div class="disc">
      <article class="disc__item reveal" style="--d:.03s">
        <span class="disc__num">01</span>
        <h3>CAD development</h3>
        <p>Class-A topology, control nets, local surface reconstruction and release-ready geometry.</p>
        <div class="disc__meta"><span>Control net 6 × 6</span><span>Pre-gate audit</span></div>
      </article>
      <article class="disc__item reveal" style="--d:.07s">
        <span class="disc__num">02</span>
        <h3>HMI development</h3>
        <p>Experience architecture, cluster / IVI hierarchy, vehicle-state communication and a consistent cockpit design system.</p>
        <div class="disc__meta"><span>Human factors</span><span>Clickable prototypes</span></div>
      </article>
      <article class="disc__item reveal" style="--d:.11s">
        <span class="disc__num">03</span>
        <h3>Styling convergence</h3>
        <p>Review DRG, character lines and stance against package constraints and the design-release baseline.</p>
        <div class="disc__meta"><span>DRG</span><span>Stance</span><span>Surface character</span></div>
      </article>
      <article class="disc__item reveal" style="--d:.15s">
        <span class="disc__num">04</span>
        <h3>Manufacturability / DFM</h3>
        <p>Draft, undercuts, split lines and material limits connected to proposed processes.</p>
        <div class="disc__meta"><span>Draft</span><span>Split lines</span><span>Binder pressure</span></div>
      </article>
      <article class="disc__item reveal" style="--d:.19s">
        <span class="disc__num">05</span>
        <h3>Assembly sequences</h3>
        <p>Build dependencies, full pin-entry routes, tool access and interface checks before release.</p>
        <div class="disc__meta"><span>Pin entry</span><span>Tool access</span><span>Swept volumes</span></div>
      </article>
      <article class="disc__item reveal" style="--d:.23s">
        <span class="disc__num">06</span>
        <h3>Supplier definition</h3>
        <p>Commodity priorities, Tier-1 / Tier-2 interfaces and supplier SORs against industrial milestones.</p>
        <div class="disc__meta"><span>SOR</span><span>Tier-1 / Tier-2</span></div>
      </article>
    </div>

    <div class="ladder reveal" style="--d:.06s">
      <div>
        <div class="ladder__head">
          <span class="ladder__title">Package &amp; multi-view validation</span>
          <span class="ladder__badge">CN121527329B · Granted</span>
        </div>
        <div class="ladder__table">
          <div class="ladder__row"><span class="ladder__lvl">L0</span><span class="ladder__req">Three-view generation</span><span class="ladder__cap">Registered exterior three-view algorithm</span></div>
          <div class="ladder__row"><span class="ladder__lvl">L1</span><span class="ladder__req">Six-point anchoring</span><span class="ladder__cap">Automated 6-point hardpoint anchoring</span></div>
          <div class="ladder__row"><span class="ladder__lvl">L2</span><span class="ladder__req">Proportion estimation</span><span class="ladder__cap">AI-assisted proportion &amp; overhang audit</span></div>
          <div class="ladder__row"><span class="ladder__lvl">L3</span><span class="ladder__req">Multi-view consistency</span><span class="ladder__cap">Granted invention patent</span></div>
          <div class="ladder__row"><span class="ladder__lvl">L4</span><span class="ladder__req">Multi-round regeneration</span><span class="ladder__cap">Closed-loop multi-round regeneration</span></div>
          <div class="ladder__row"><span class="ladder__lvl">L5</span><span class="ladder__req">CAD / CAS + hardpoint</span><span class="ladder__cap">Direct synchronization — enterprise roadmap</span></div>
        </div>
      </div>
      <aside class="ladder__aside">
        <div class="ladder__k">Engineering-constrained views</div>
        <p>Package constraints guide view calibration and Pre-CAS consistency checks across every review round.</p>
        <div class="ladder__k">Separate review tasks</div>
        <p>Normalize display scale and ground contact before reviewing package changes and proportions.</p>
      </aside>
    </div>
  </div>
</section>

<!-- ============ EVIDENCE ============ -->
<section class="section section--evidence" id="evidence">
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="eyebrow"><span>04</span>Evidence</div>
      <h2 class="h2">Speed needs<br><span class="grad">engineering evidence.</span></h2>
    </div>

    <div class="domains reveal" style="--d:.08s">
      <div class="domains__label">7 validation domains</div>
      <ul class="domains__list">
        <li>Ergonomics</li>
        <li>Class-A surfaces</li>
        <li>Virtual CAE</li>
        <li>Digital Mock-Up</li>
        <li>Perceived quality / GD&amp;T</li>
        <li>Alpha prototypes</li>
        <li>Supplier quality</li>
      </ul>
    </div>

    <div class="evidence-grid">
      <div class="metrics">
        <div class="metric reveal" style="--d:.02s">
          <div class="metric__val"><span data-count="80">0</span><i>%</i></div>
          <p>Higher full-vehicle modeling efficiency</p>
        </div>
        <div class="metric reveal" style="--d:.08s">
          <div class="metric__val"><span data-count="3" data-prefix="2–">0</span><i>wks</i></div>
          <p>Shorter CAS modeling cycle</p>
        </div>
        <div class="metric reveal" style="--d:.14s">
          <div class="metric__val"><span data-count="20" data-prefix="10–">0</span><i>%</i></div>
          <p>BIW structural weight reduction</p>
        </div>
        <div class="metric reveal" style="--d:.2s">
          <div class="metric__val"><span data-count="70">0</span><i>%</i></div>
          <p>Design cycle reduction</p>
        </div>
        <p class="metrics__note reveal" style="--d:.24s">Production OEM case studies. 10–20% BIW component weight reduction and $700K+ USD annual R&amp;D savings through physics-informed optimization.</p>
      </div>

      <aside class="audit reveal" style="--d:.16s">
        <div class="audit__head">
          <span class="audit__dot"></span>
          <span>Surface deviation audit · hood M1</span>
        </div>
        <div class="audit__rows">
          <div class="audit__row"><span>P95 deviation</span><strong>0.257<em>mm</em></strong></div>
          <div class="audit__row"><span>Maximum deviation</span><strong>0.560<em>mm</em></strong></div>
          <div class="audit__row"><span>Source samples</span><strong>4,096</strong></div>
          <div class="audit__row"><span>Vertices checked</span><strong>31,883</strong></div>
          <div class="audit__row"><span>X-plane sections</span><strong>7</strong></div>
        </div>
        <p class="audit__note">Archived local diagnostic. Automated pre-screening flags deviation zones above 0.5 mm before final Class-A sign-off — geometric metrics inform decisions, they do not establish Class-A acceptance.</p>
      </aside>
    </div>

    <div class="flow reveal" style="--d:.08s">
      <div class="flow__head">
        <span class="flow__label">AI + CAE workflow</span>
        <span class="flow__hint">Early physics screening, solver comparison and traceable engineering decisions</span>
      </div>
      <div class="flow__track">
        <div class="flow__step">
          <span class="flow__num">01</span>
          <h4>Engineering inputs</h4>
          <ul><li>Geometry revision</li><li>Materials and load cases</li><li>Acceptance criteria</li></ul>
        </div>
        <div class="flow__step">
          <span class="flow__num">02</span>
          <h4>AI assistance</h4>
          <ul><li>Retrieve reviewed rules</li><li>Prepare case alternatives</li><li>Prioritize candidates</li></ul>
        </div>
        <div class="flow__step">
          <span class="flow__num">03</span>
          <h4>Physics screening</h4>
          <ul><li>Domain predictions</li><li>Early feasibility</li><li>Uncertainty assessment</li></ul>
        </div>
        <div class="flow__step">
          <span class="flow__num">04</span>
          <h4>Solver / test checks</h4>
          <ul><li>Convergence and error</li><li>Reference comparisons</li><li>Correlation evidence</li></ul>
        </div>
        <div class="flow__step">
          <span class="flow__num">05</span>
          <h4>Engineering review</h4>
          <ul><li>Compare design options</li><li>Approve next revision</li><li>Record the decision</li></ul>
        </div>
      </div>
      <p class="flow__note">Pilot focus: exterior CFD and forming. Setup time, iteration count and prediction error are evaluated against an agreed baseline.</p>
    </div>
  </div>
</section>

<!-- ============ NEWS ============ -->
<section class="section" id="news">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div class="reveal">
        <div class="eyebrow"><span>05</span>Credentials</div>
        <h2 class="h2">Proven in production.</h2>
      </div>
      <a href="#contact" class="link-arrow reveal" style="--d:.08s">Request the full deck
        <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
      </a>
    </div>

    <div class="news">
      <article class="news__card reveal" style="--d:.04s">
        <div class="news__meta"><span>IP · Granted</span><span class="tagpill">Patent</span></div>
        <h3>Two invention patents granted for constraint-led generation</h3>
        <p>CN121527329B covers exterior view generation &amp; calibration; CN122046604B covers generative modular interior design with hidden-structure compensation. Both under a global PCT architecture.</p>
        <span class="news__ref">CN121527329B · CN122046604B</span>
      </article>

      <article class="news__card reveal" style="--d:.1s">
        <div class="news__meta"><span>CAS agent</span><span class="tagpill">Case study</span></div>
        <h3>80% higher modeling efficiency, 2–3 weeks out of the CAS cycle</h3>
        <p>Validated in a commercial passenger-vehicle program, reducing early CAS-to-CAD iteration cycles.</p>
        <span class="news__ref">Production OEM program</span>
      </article>

      <article class="news__card reveal" style="--d:.16s">
        <div class="news__meta"><span>CAE agent</span><span class="tagpill">Case study</span></div>
        <h3>10–20% BIW weight reduction, 70% shorter design cycles</h3>
        <p>Physics-informed optimization delivered component weight savings and $700K+ USD annual R&amp;D savings on the same program.</p>
        <span class="news__ref">Production OEM program</span>
      </article>

      <article class="news__card reveal" style="--d:.22s">
        <div class="news__meta"><span>Governance</span><span class="tagpill">Certification</span></div>
        <h3>ISO/IEC 27001:2022, aligned with OEM data governance</h3>
        <p>Information security management compliant with European &amp; US OEM TISAX / ISO requirements across platform development and customer data handling.</p>
        <span class="news__ref">ISO/IEC 27001:2022</span>
      </article>
    </div>
  </div>
</section>

<!-- ============ ABOUT ============ -->
<section class="section section--about" id="about">
  <div class="wrap">
    <div class="about__head">
      <div class="reveal">
        <div class="eyebrow"><span>06</span>About</div>
        <h2 class="h2">Powered by<br><span class="grad">ICONA Design Group.</span></h2>
      </div>
      <div class="about__copy reveal" style="--d:.08s">
        <p>ICOCO META brings design, geometry and physical engineering intelligence into one product. It is built on 15+ years of automotive design experience and 300+ production-vehicle projects — not on generic models retrained for a picture of a car.</p>
        <p>Our vision is one connected development loop: styling, geometry and physics reading from the same vehicle truth, joined through qualified adapters and shared engineering rules.</p>
      </div>
    </div>

    <div class="about__stats reveal" style="--d:.1s">
      <div><strong>15+</strong><span>Years in automotive design</span></div>
      <div><strong>300+</strong><span>Production-vehicle projects</span></div>
      <div><strong>2</strong><span>Granted invention patents</span></div>
      <div><strong>7</strong><span>Validation gates</span></div>
    </div>

    <div class="duo">
      <div class="duo__panel reveal" style="--d:.04s">
        <div class="duo__k">ICOCO architecture</div>
        <h3>Enterprise microservices connecting AIGC, CAD kernels and CAE solvers.</h3>
        <div class="chain">
          <div class="chain__top">ICOCO Workspace<span>AIGC Styling → CAD Geometry → CAE Validation</span></div>
          <div class="chain__mid">Core Gateway &amp; Orchestrator<span>Identity · jobs · revisions · release registry</span></div>
          <div class="chain__grid">
            <div class="chain__node">CAD Kernel<em>Geometry</em></div>
            <div class="chain__node">CAE Adapter<em>Validation</em></div>
            <div class="chain__node">Shared adapters<em>Assets · review · slicer</em></div>
          </div>
        </div>
        <ul class="duo__list">
          <li><b>One application gateway.</b> Every workspace action passes the unified API gateway — role-based access, progress and release records.</li>
          <li><b>Separate engineering providers.</b> The Geometry Engine produces B-rep / mesh assets; the Validation Engine executes policy checks.</li>
          <li><b>Traceable release control.</b> Frozen revision IDs and file hashes bind the selected parts to their validation evidence.</li>
          <li><b>Adapter-based integration.</b> Enterprise adapters connect OEM PLM, CATIA, NX and CAE solvers.</li>
        </ul>
      </div>

      <div class="duo__panel duo__panel--alt reveal" style="--d:.1s">
        <div class="duo__k">Deployment</div>
        <h3>Local &amp; private by design.</h3>
        <p class="duo__lede">Turnkey on-premises AI appliance · multi-GPU compute · air-gapped VPC ready.</p>
        <ul class="duo__list">
          <li><b>On-premises option.</b> Run selected AI workflows inside the customer's network boundary.</li>
          <li><b>Controlled data access.</b> Design assets and engineering context stay under customer access policies.</li>
          <li><b>Existing toolchains.</b> Connect deployed services through the platform's geometry and validation adapters.</li>
        </ul>
        <div class="duo__specs">
          <div><span>Compute</span><b>Multi-GPU</b></div>
          <div><span>Network</span><b>Air-gapped VPC</b></div>
          <div><span>Delivery</span><b>Turnkey</b></div>
        </div>
        <p class="duo__note">Deployment scope, hardware sizing and connected tools are agreed for each pilot.</p>
      </div>
    </div>

    <div class="eco">
      <article class="eco__card reveal" style="--d:.03s">
        <div class="eco__logo eco__logo--icona"><img src="../assets/img/group-icona.png" width="238" height="84" alt="" /></div>
        <span class="eco__k">Design &amp; engineering</span>
        <h3>ICONA</h3>
        <p>Automotive design expertise spanning styling, engineering and prototype development.</p>
      </article>
      <article class="eco__card reveal" style="--d:.08s">
        <div class="eco__logo eco__logo--diis"><img src="../assets/img/group-diis.png" width="509" height="132" alt="" /></div>
        <span class="eco__k">Design innovation</span>
        <h3>DIIS</h3>
        <p>Design Innovation Institute Shanghai connects research and cross-disciplinary talent with industry.</p>
      </article>
      <article class="eco__card reveal" style="--d:.13s">
        <div class="eco__logo eco__logo--dtransformer"><img src="../assets/img/group-dtransformer.png" width="435" height="66" alt="" /></div>
        <span class="eco__k">Innovation incubation</span>
        <h3>D.Transformer</h3>
        <p>Design-driven incubation connects emerging ventures with mentors, prototyping and industry networks.</p>
      </article>
      <article class="eco__card reveal" style="--d:.18s">
        <div class="eco__logo eco__logo--metacreate"><img src="../assets/img/logo.png" width="821" height="217" alt="" /></div>
        <span class="eco__k">Physical AI</span>
        <h3>MetaCreate</h3>
        <p>Physical AI and engineering agents connect models, professional software and R&amp;D workflows.</p>
      </article>
    </div>
  </div>
</section>

<!-- ============ CONTACT ============ -->
<section class="cta" id="contact">
  <div class="cta__glow" aria-hidden="true"></div>
  <div class="wrap cta__inner">
    <div class="eyebrow reveal"><span>07</span>Partnership</div>
    <h2 class="reveal" style="--d:.06s">Where iconic styling<br>meets engineering reality.</h2>
    <p class="reveal" style="--d:.12s">Engineering-grounded AI for automotive design and development. Talk to the team behind the platform.</p>
    <div class="cta__actions reveal" style="--d:.18s">
      <a href="mailto:enea.colombo@icona-designgroup.com" class="btn btn--primary" data-magnetic>
        <span>enea.colombo@icona-designgroup.com</span>
        <svg viewBox="0 0 16 16"><path d="M4 12L12 4M12 4H6M12 4V10"/></svg>
      </a>
      <a href="#products" class="btn btn--ghost" data-magnetic><span>Explore the platform</span></a>
    </div>

    <div class="beyond reveal" style="--d:.24s">
      <div class="beyond__label">Beyond automotive, the physics stays relevant</div>
      <div class="beyond__grid">
        <div class="beyond__item"><h4>Automotive</h4><p>Styling, geometry and validation on one continuous loop.</p></div>
        <div class="beyond__item"><h4>Clean energy</h4><p>Embed proprietary design and physics rules in new product workflows.</p></div>
        <div class="beyond__item"><h4>Robotics</h4><p>Benchmark cycle and cost reduction on one real engineering task.</p></div>
      </div>
      <div class="beyond__modes"><span>Co-development</span><span>Joint validation</span><span>Ecosystem integration</span></div>
    </div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="wrap footer__inner">
    <div class="footer__brand">
      <img src="../assets/img/logo.png" alt="ICOCO META" />
      <p>The Tri-Engine AI Platform.<br>One platform. Broader industries. A brighter tomorrow.</p>
      <p class="footer__cities">Turin · Shanghai · Los Angeles</p>
    </div>
    <div class="footer__cols">
      <div>
        <h4>Platform</h4>
        <a href="#products">Generative Styling</a>
        <a href="#products">Geometric &amp; Surface</a>
        <a href="#products">Physics &amp; Validation</a>
      </div>
      <div>
        <h4>Company</h4>
        <a href="#about">About</a>
        <a href="#news">Credentials</a>
        <a href="#contact">Contact</a>
      </div>
      <div>
        <h4>Legal</h4>
        <a href="#about">ISO/IEC 27001:2022</a>
        <a href="#news">Patents</a>
      </div>
    </div>
  </div>
  <div class="wrap footer__bottom">
    <span>© 2026 ICOCO META. Powered by ICONA Design Group.</span>
    <span>www.icoco.art</span>
  </div>
</footer>
</template>
