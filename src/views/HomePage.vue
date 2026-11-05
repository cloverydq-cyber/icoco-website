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
      <a href="#news" class="nav__link" data-nav="news">News</a>
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
  <a href="#news">News</a>
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
      <p class="lede">Disciplines, data models and interfaces differ. Every handover costs time, intent and engineering truth.</p>
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
          <div class="chips"><span>Alias</span><span>CATIA</span><span>Siemens NX</span><span>Rhino</span><span>CrownStyling</span></div>
          <div class="stack__out"><span>Output</span>NURBS / B-rep / feature models</div>
        </article>
        <article class="stack__col reveal" style="--d:.19s">
          <div class="stack__label">CAE / Physics</div>
          <h3>Simulation, optimization &amp; validation</h3>
          <div class="chips"><span>Ansys</span><span>SIMULIA</span><span>Simcenter</span><span>COMSOL</span><span>FastCAE</span></div>
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
      <p class="lede">Three intelligence layers, one continuous workflow — from the first styling sketch to validated engineering evidence.</p>
    </div>

    <div class="engines">
      <article class="engine reveal" style="--d:.05s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">01</span>
          <span class="engine__line"></span>
        </div>
        <h3>Generative Styling<br>Intelligence</h3>
        <p>Explore bold styling directions guided by brand DNA, DRG signatures and vehicle package constraints.</p>
        <ul class="tags"><li>Brand DNA</li><li>DRG signatures</li><li>Package constraints</li></ul>
      </article>

      <article class="engine reveal" style="--d:.13s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">02</span>
          <span class="engine__line"></span>
        </div>
        <h3>Geometric &amp;<br>Surface Intelligence</h3>
        <p>Bridge styling intent and editable engineering geometry through view calibration, parametric part definition and local Mesh-to-NURBS reconstruction.</p>
        <ul class="tags"><li>View calibration</li><li>Parametric parts</li><li>Mesh-to-NURBS</li></ul>
      </article>

      <article class="engine reveal" style="--d:.21s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">03</span>
          <span class="engine__line"></span>
        </div>
        <h3>Physics &amp;<br>Validation Intelligence</h3>
        <p>Bring physics feedback into early design with DeepPhysic and Yugong — aerodynamics, forming and crash feasibility assessed before costly rework.</p>
        <ul class="tags"><li>DeepPhysic</li><li>Yugong</li><li>Early feasibility</li></ul>
      </article>
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

    <div class="arch reveal">
      <div class="arch__label">ICOCO architecture</div>
      <div class="arch__stack">
        <div class="arch__layer">
          <span class="arch__k">Workspace</span>
          <span class="arch__v">AIGC styling › CAD geometry › CAE validation</span>
        </div>
        <div class="arch__layer arch__layer--core">
          <span class="arch__k">Core gateway</span>
          <span class="arch__v">Identity · jobs · revisions · release registry</span>
        </div>
        <div class="arch__layer">
          <span class="arch__k">Adapters</span>
          <span class="arch__v">CAD kernel · CAE solver · shared data services</span>
        </div>
      </div>
      <p class="arch__note">On-premises when required — multi-GPU, air-gapped VPC.</p>
    </div>
  </div>
</section>

<!-- ============ DISCIPLINES ============ -->
<section class="section section--disc" id="disciplines">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div class="reveal">
        <div class="eyebrow"><span>03</span>Coverage</div>
        <h2 class="h2">Six disciplines.<br><span class="dim">One development thread.</span></h2>
      </div>
      <p class="lede reveal" style="--d:.1s">Design, engineering and manufacturing share the same baseline — so decisions made in styling remain traceable through release.</p>
    </div>

    <div class="disc">
      <article class="disc__item reveal" style="--d:.03s">
        <span class="disc__num">01</span>
        <h3>CAD development</h3>
        <p>Class-A surface architecture, control-net inspection and release-ready geometry.</p>
      </article>
      <article class="disc__item reveal" style="--d:.07s">
        <span class="disc__num">02</span>
        <h3>HMI development</h3>
        <p>Experience architecture, screen hierarchy and interaction validation.</p>
      </article>
      <article class="disc__item reveal" style="--d:.11s">
        <span class="disc__num">03</span>
        <h3>Styling convergence</h3>
        <p>Align rendered references with source meshes against a controlled release baseline.</p>
      </article>
      <article class="disc__item reveal" style="--d:.15s">
        <span class="disc__num">04</span>
        <h3>Manufacturability / DFM</h3>
        <p>Draft, undercuts, split lines and part boundaries linked to stamping or molding.</p>
      </article>
      <article class="disc__item reveal" style="--d:.19s">
        <span class="disc__num">05</span>
        <h3>Assembly sequences</h3>
        <p>Dependencies, pin-entry routes, tool access and interface checks.</p>
      </article>
      <article class="disc__item reveal" style="--d:.23s">
        <span class="disc__num">06</span>
        <h3>Supply chain definition</h3>
        <p>Commodity priorities, Tier-1 / Tier-2 interfaces and supplier SORs.</p>
      </article>
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
          <p>Higher modeling efficiency</p>
        </div>
        <div class="metric reveal" style="--d:.08s">
          <div class="metric__val"><span data-count="3" data-prefix="2–">0</span><i>wks</i></div>
          <p>Shorter modeling cycle</p>
        </div>
        <div class="metric reveal" style="--d:.14s">
          <div class="metric__val"><span data-count="20" data-prefix="10–">0</span><i>%</i></div>
          <p>Vehicle weight reduction</p>
        </div>
        <div class="metric reveal" style="--d:.2s">
          <div class="metric__val"><span data-count="70">0</span><i>%</i></div>
          <p>Design cycle reduction</p>
        </div>
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
        <p class="audit__note">Archived local diagnostic. Geometric metrics inform development decisions — they do not establish Class-A acceptance.</p>
      </aside>
    </div>
  </div>
</section>

<!-- ============ NEWS ============ -->
<section class="section" id="news">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div class="reveal">
        <div class="eyebrow"><span>05</span>News</div>
        <h2 class="h2">What's moving.</h2>
      </div>
      <a href="#news" class="link-arrow reveal" style="--d:.08s">All updates
        <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
      </a>
    </div>

    <div class="news">
      <article class="news__card reveal" style="--d:.04s">
        <div class="news__meta"><span>2026.10</span><span class="tagpill">Patent</span></div>
        <h3>Two invention patents granted for constraint-led view generation</h3>
        <p>CN121527329B and CN122046604B cover multi-view contour generation, conflict detection and adaptive calibration.</p>
        <span class="news__more">Read note <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>
      </article>

      <article class="news__card reveal" style="--d:.1s">
        <div class="news__meta"><span>2026.09</span><span class="tagpill">Platform</span></div>
        <h3>Full-vehicle modeling agent shortens the modeling cycle</h3>
        <p>Early programs report 80% higher modeling efficiency and 2–3 weeks removed from the modeling cycle.</p>
        <span class="news__more">Read note <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>
      </article>

      <article class="news__card reveal" style="--d:.16s">
        <div class="news__meta"><span>2026.07</span><span class="tagpill">Security</span></div>
        <h3>ISO/IEC 27001:2022 certification maintained</h3>
        <p>Information security management covers platform development, customer data handling and model operations.</p>
        <span class="news__more">Read note <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>
      </article>

      <article class="news__card reveal" style="--d:.22s">
        <div class="news__meta"><span>2026.05</span><span class="tagpill">Recognition</span></div>
        <h3>Design innovation recognised in Shanghai</h3>
        <p>ICOCO META's design and engineering work sits within ICONA's award-winning design practice and Shanghai design network.</p>
        <span class="news__more">Read note <svg viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>
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
        <p>Our vision is to connect the toolchain through qualified adapters, shared engineering rules and one continuous workflow.</p>
      </div>
    </div>

    <div class="about__stats reveal" style="--d:.1s">
      <div><strong>15+</strong><span>Years in automotive design</span></div>
      <div><strong>300+</strong><span>Production-vehicle projects</span></div>
      <div><strong>2</strong><span>Granted invention patents</span></div>
      <div><strong>7</strong><span>Validation domains</span></div>
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
<section class="contact" id="contact">
  <div class="contact__grid">
    <div class="contact__panel">
      <div class="contact__lead">
        <h2 class="contact__title reveal">Contact Us</h2>
        <p class="contact__claim reveal" style="--d:.06s">Where Iconic Styling Meets Engineering Reality.</p>
        <p class="contact__sub reveal" style="--d:.1s">Engineering-Grounded AI for Automotive Design &amp; Development</p>
      </div>

      <div class="contact__people reveal" style="--d:.16s">
        <div class="contact__qr"><img src="../assets/img/contact-qr.png" alt="ICOCO META contact QR code" /></div>
        <div class="contact__who">
          <a class="contact__name" href="mailto:enea.colombo@icona-designgroup.com">Enea Colombo</a>
          <span class="contact__role">Founder &amp; CEO</span>
          <a class="contact__line contact__line--mail" href="mailto:enea.colombo@icona-designgroup.com">enea.colombo@icona-designgroup.com</a>
          <span class="contact__line contact__line--loc">Turin · Shanghai · Los Angeles</span>
          <a class="contact__line" href="https://www.icona-designgroup.com" target="_blank" rel="noopener">www.icona-designgroup.com</a>
          <a class="contact__line" href="https://www.icoco.art" target="_blank" rel="noopener">www.icoco.art</a>
        </div>
      </div>

      <p class="contact__note">Powered by ICONA Design Group / 15+ years of automotive design experience</p>
    </div>

    <div class="contact__media reveal" style="--d:.08s">
      <img src="../assets/img/contact-studio.jpg" alt="ICOCO META engineering studio" />
    </div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="wrap footer__inner">
    <div class="footer__brand">
      <img src="../assets/img/logo.png" alt="ICOCO META" />
      <p>The Tri-Engine AI Platform.<br>One platform. Broader industries. A brighter tomorrow.</p>
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
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
      </div>
      <div>
        <h4>Legal</h4>
        <a href="#about">ISO/IEC 27001:2022</a>
        <a href="#about">Patents</a>
      </div>
    </div>
  </div>
  <div class="wrap footer__bottom">
    <span>© 2026 ICOCO META. Powered by ICONA Design Group.</span>
    <span>Shanghai · China</span>
  </div>
</footer>
</template>
