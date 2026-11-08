<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

const { copy } = useMarketingLanguage()
</script>
<template>
<!-- ============ LANDSCAPE ============ -->
<section class="section" id="landscape">
  <div class="wrap">
    <div class="sec-head reveal is-in">
      <div class="eyebrow"><span>01</span>{{ copy("The gap") }}</div>
      <h1 class="h2">{{ copy("Specialized tools span the workflow.") }}<br><span class="dim">{{ copy("Design intent is harder to carry forward.") }}</span></h1>
      <p class="lede">{{ copy("A concept image does not carry its package constraints into CAD. A mesh does not explain which surfaces need review. Teams need a shared basis for the next decision.") }}</p>
    </div>

    <div class="stack">
      <div class="stack__grid">
        <article class="stack__col reveal is-in" style="--d:.05s">
          <div class="stack__label">{{ copy("AIGC / Styling") }}</div>
          <h3>{{ copy("Creative exploration & visual concepts") }}</h3>
          <div class="chips"><span>Vizcom</span><span>Adobe Firefly</span><span>Midjourney</span></div>
          <div class="stack__out"><span>{{ copy("Output") }}</span>{{ copy("Images / concept meshes") }}</div>
        </article>
        <article class="stack__col reveal is-in" style="--d:.12s">
          <div class="stack__label">{{ copy("CAD / Geometry") }}</div>
          <h3>{{ copy("Surfaces, parts & assemblies") }}</h3>
          <div class="chips"><span>Alias</span><span>CATIA</span><span>Siemens NX</span><span>Rhino</span><span>CrownStyling</span></div>
          <div class="stack__out"><span>{{ copy("Output") }}</span>{{ copy("NURBS / B-rep / feature models") }}</div>
        </article>
        <article class="stack__col reveal is-in" style="--d:.19s">
          <div class="stack__label">{{ copy("CAE / Physics") }}</div>
          <h3>{{ copy("Simulation, optimization & validation") }}</h3>
          <div class="chips"><span>Ansys</span><span>SIMULIA</span><span>Simcenter</span><span>COMSOL</span><span>FastCAE</span></div>
          <div class="stack__out"><span>{{ copy("Output") }}</span>{{ copy("Meshes / physics models / results") }}</div>
        </article>
      </div>

      <div class="friction reveal is-in" style="--d:.26s">
        <span class="friction__tag">{{ copy("Cross-tool friction") }}</span>
        <div class="friction__items">
          <span>{{ copy("Format conversion") }}</span><span>{{ copy("Geometry rebuilds") }}</span><span>{{ copy("Lost constraints") }}</span><span>{{ copy("Repeated setup") }}</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ PRODUCTS ============ -->
<section class="section section--products" id="products">
  <div class="wrap">
    <div class="sec-head reveal is-in">
      <div class="eyebrow"><span>02</span>{{ copy("The platform") }}</div>
      <h2 class="h2">{{ copy("From vehicle design to") }}<br><span class="grad">{{ copy("engineering intelligence.") }}</span></h2>
      <p class="lede">{{ copy("Three intelligence layers, one continuous workflow — connecting concept exploration, engineering constraints and reviewable outputs.") }}</p>
    </div>

    <div class="engines">
      <article class="engine reveal is-in" style="--d:.05s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">01</span>
          <span class="engine__line"></span>
        </div>
        <h3>{{ copy("Generative Styling") }}<br>{{ copy("Intelligence") }}</h3>
        <p>{{ copy("Explore exterior concepts with vehicle package parameters and visual references, then align views to review proportions and design intent.") }}</p>
        <ul class="tags"><li>{{ copy("Concept exploration") }}</li><li>{{ copy("View alignment") }}</li><li>{{ copy("Package constraints") }}</li></ul>
      </article>

      <article class="engine reveal is-in" style="--d:.13s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">02</span>
          <span class="engine__line"></span>
        </div>
        <h3>{{ copy("Geometric &") }}<br>{{ copy("Surface Intelligence") }}</h3>
        <p>{{ copy("Develop geometry from aligned references. Local Mesh-to-NURBS work is evaluated through source deviation and editability checks as the workflow develops.") }}</p>
        <ul class="tags"><li>{{ copy("View calibration") }}</li><li>{{ copy("Parametric parts") }}</li><li>Mesh-to-NURBS</li></ul>
      </article>

      <article class="engine reveal is-in" style="--d:.21s" data-tilt>
        <div class="engine__top">
          <span class="engine__num">03</span>
          <span class="engine__line"></span>
        </div>
        <h3>{{ copy("Physics &") }}<br>{{ copy("Validation Intelligence") }}</h3>
        <p>{{ copy("Connect engineering constraints with review tasks. DeepPhysic, Yugong and MagiCube form part of the physical-AI direction within ICOCO META; specialist analyses require their own validation.") }}</p>
        <ul class="tags"><li>{{ copy("Engineering constraints") }}</li><li>{{ copy("Review evidence") }}</li><li>{{ copy("Physical AI") }}</li></ul>
      </article>
    </div>

    <div class="source-media-slots">
      <figure class="source-media-slot reveal is-in"><span>{{ copy("Product screenshot") }}</span><figcaption>{{ copy("Reserved for an actual workspace screenshot.") }}</figcaption></figure>
      <figure class="source-media-slot reveal is-in"><span>{{ copy("Project imagery") }}</span><figcaption>{{ copy("Reserved for approved project or studio photography.") }}</figcaption></figure>
    </div>

    <div class="classes reveal is-in">
      <div class="classes__label">{{ copy("Generate → Align → Validate → Build") }}</div>
      <div class="classes__items">
        <div class="classes__item"><span>{{ copy("Explore concepts") }}</span><i></i></div>
        <div class="classes__item"><span>{{ copy("Align views") }}</span><i></i></div>
        <div class="classes__item"><span>{{ copy("Review constraints") }}</span><i></i></div>
        <div class="classes__item"><span>{{ copy("Develop geometry") }}</span><i></i></div>
      </div>
    </div>

    <div class="arch reveal is-in">
      <div class="arch__label">{{ copy("How the workflow connects") }}</div>
      <div class="arch__stack">
        <div class="arch__layer">
          <span class="arch__k">{{ copy("Workspace") }}</span>
          <span class="arch__v">{{ copy("Concepts · aligned views · engineering review · geometry") }}</span>
        </div>
        <div class="arch__layer arch__layer--core">
          <span class="arch__k">{{ copy("Core gateway") }}</span>
          <span class="arch__v">{{ copy("Projects · parameters · tasks · revisions") }}</span>
        </div>
        <div class="arch__layer">
          <span class="arch__k">{{ copy("Adapters") }}</span>
          <span class="arch__v">{{ copy("Specialist geometry and analysis services") }}</span>
        </div>
      </div>
      <p class="arch__note">{{ copy("Integration and deployment requirements are scoped with each project.") }}</p>
    </div>
  </div>
</section>

<!-- ============ DISCIPLINES ============ -->
<section class="section section--disc" id="disciplines">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div class="reveal is-in">
        <div class="eyebrow"><span>03</span>{{ copy("Coverage") }}</div>
        <h2 class="h2">{{ copy("Six engineering questions.") }}<br><span class="dim">{{ copy("One design intent.") }}</span></h2>
      </div>
      <p class="lede reveal is-in" style="--d:.1s">{{ copy("Start with automotive exterior design. Bring downstream questions into early review, with the required expertise and evidence made explicit.") }}</p>
    </div>

    <div class="disc">
      <article class="disc__item reveal is-in" style="--d:.03s">
        <span class="disc__num">01</span>
        <h3>{{ copy("CAD development") }}</h3>
        <p>{{ copy("Which geometry can be edited, and how closely does it follow the source? Surface quality needs separate acceptance checks.") }}</p>
      </article>
      <article class="disc__item reveal is-in" style="--d:.07s">
        <span class="disc__num">02</span>
        <h3>{{ copy("Package alignment") }}</h3>
        <p>{{ copy("Do the views agree with the vehicle dimensions, wheelbase and proportions?") }}</p>
      </article>
      <article class="disc__item reveal is-in" style="--d:.11s">
        <span class="disc__num">03</span>
        <h3>{{ copy("Styling convergence") }}</h3>
        <p>{{ copy("Which design features remain consistent across images, views and geometry revisions?") }}</p>
      </article>
      <article class="disc__item reveal is-in" style="--d:.15s">
        <span class="disc__num">04</span>
        <h3>{{ copy("Manufacturability / DFM") }}</h3>
        <p>{{ copy("Which draft, undercut and part-boundary questions need specialist assessment?") }}</p>
      </article>
      <article class="disc__item reveal is-in" style="--d:.19s">
        <span class="disc__num">05</span>
        <h3>{{ copy("Assembly sequences") }}</h3>
        <p>{{ copy("Can parts be installed and accessed? Motion checks and assembly checks need distinct evidence.") }}</p>
      </article>
      <article class="disc__item reveal is-in" style="--d:.23s">
        <span class="disc__num">06</span>
        <h3>{{ copy("Engineering handoff") }}</h3>
        <p>{{ copy("What parameters, geometry versions and unresolved issues does the next team need?") }}</p>
      </article>
    </div>
  </div>
</section>

<!-- ============ EVIDENCE ============ -->
<section class="section section--evidence" id="evidence">
  <div class="wrap">
    <div class="sec-head reveal is-in">
      <div class="eyebrow"><span>04</span>{{ copy("Evidence") }}</div>
      <h2 class="h2">{{ copy("Speed needs") }}<br><span class="grad">{{ copy("engineering evidence.") }}</span></h2>
    </div>

    <div class="domains reveal is-in" style="--d:.08s">
      <div class="domains__label">{{ copy("Areas for engineering review") }}</div>
      <ul class="domains__list">
        <li>{{ copy("Ergonomics") }}</li>
        <li>{{ copy("Class-A surfaces") }}</li>
        <li>{{ copy("Virtual CAE") }}</li>
        <li>{{ copy("Digital Mock-Up") }}</li>
        <li>{{ copy("Perceived quality / GD&T") }}</li>
        <li>{{ copy("Alpha prototypes") }}</li>
        <li>{{ copy("Supplier quality") }}</li>
      </ul>
    </div>

    <div class="evidence-grid">
      <div class="metrics">
        <div class="metric reveal is-in" style="--d:.02s">
          <div class="metric__val">{{ copy("Source") }}</div><p>{{ copy("Compare each output with its input references and constraints.") }}</p>
        </div>
        <div class="metric reveal is-in" style="--d:.08s">
          <div class="metric__val">{{ copy("Method") }}</div><p>{{ copy("Record how a check was run and what it measures.") }}</p>
        </div>
        <div class="metric reveal is-in" style="--d:.14s">
          <div class="metric__val">{{ copy("Scope") }}</div><p>{{ copy("Separate local diagnostics from complete engineering acceptance.") }}</p>
        </div>
        <div class="metric reveal is-in" style="--d:.2s">
          <div class="metric__val">{{ copy("Review") }}</div><p>{{ copy("Keep unresolved issues visible for the next decision.") }}</p>
        </div>
      </div>

      <aside class="audit reveal is-in" style="--d:.16s">
        <div class="audit__head"><span class="audit__dot"></span><span>{{ copy("What a useful evidence record includes") }}</span></div>
        <div class="audit__rows">
          <div class="audit__row"><span>{{ copy("Reference") }}</span><strong>{{ copy("Source version") }}</strong></div>
          <div class="audit__row"><span>{{ copy("Check") }}</span><strong>{{ copy("Method & limits") }}</strong></div>
          <div class="audit__row"><span>{{ copy("Result") }}</span><strong>{{ copy("Measured output") }}</strong></div>
          <div class="audit__row"><span>{{ copy("Acceptance") }}</span><strong>{{ copy("Review criteria") }}</strong></div>
          <div class="audit__row"><span>{{ copy("Next step") }}</span><strong>{{ copy("Open issues") }}</strong></div>
        </div>
        <p class="audit__note">{{ copy("Evidence is specific to the task. A geometric comparison alone does not establish Class-A quality, manufacturability or physical performance.") }}</p>
      </aside>
    </div>
  </div>
</section>


</template>
