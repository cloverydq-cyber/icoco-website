<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

const { copy } = useMarketingLanguage()
</script>
<template>
<!-- ============ ABOUT ============ -->
<section class="section section--about" id="about">
  <div class="wrap">
    <div class="about__head">
      <div class="reveal is-in">
        <div class="eyebrow"><span>06</span>{{ copy("About") }}</div>
        <h1 class="h2">{{ copy("Powered by") }}<br><span class="grad">{{ copy("ICONA Design Group.") }}</span></h1>
      </div>
      <div class="about__copy reveal is-in" style="--d:.08s">
        <p>{{ copy("ICOCO META brings design, geometry and physical-AI workflows into one integrated product, informed by ICONA’s automotive design and engineering practice.") }}</p>
        <p>{{ copy("Our starting point is automotive exterior design: carry design intent from concept exploration into aligned views, engineering review and geometry development. Broader applications are evaluated against specific project needs.") }}</p>
      </div>
    </div>

    <div class="about__stats reveal is-in" style="--d:.1s">
      <div><strong>{{ copy("Design") }}</strong><span>{{ copy("Automotive exterior focus") }}</span></div>
      <div><strong>{{ copy("Geometry") }}</strong><span>{{ copy("Source-aware development") }}</span></div>
      <div><strong>{{ copy("Review") }}</strong><span>{{ copy("Explicit engineering criteria") }}</span></div>
      <div><strong>{{ copy("Physical AI") }}</strong><span>{{ copy("Part of one integrated product") }}</span></div>
    </div>

    <div class="eco">
      <article class="eco__card reveal is-in" style="--d:.03s">
        <div class="eco__logo eco__logo--icona"><img src="../assets/img/group-icona.png" width="238" height="84" alt="" /></div>
        <span class="eco__k">{{ copy("Design & engineering") }}</span>
        <h3>ICONA</h3>
        <p>{{ copy("Automotive design expertise spanning styling, engineering and prototype development.") }}</p>
      </article>
      <article class="eco__card reveal is-in" style="--d:.08s">
        <div class="eco__logo eco__logo--diis"><img src="../assets/img/group-diis.png" width="509" height="132" alt="" /></div>
        <span class="eco__k">{{ copy("Design innovation") }}</span>
        <h3>DIIS</h3>
        <p>{{ copy("Design Innovation Institute Shanghai connects research and cross-disciplinary talent with industry.") }}</p>
      </article>
      <article class="eco__card reveal is-in" style="--d:.13s">
        <div class="eco__logo eco__logo--dtransformer"><img src="../assets/img/group-dtransformer.png" width="435" height="66" alt="" /></div>
        <span class="eco__k">{{ copy("Innovation incubation") }}</span>
        <h3>D.Transformer</h3>
        <p>{{ copy("Design-driven incubation connects emerging ventures with mentors, prototyping and industry networks.") }}</p>
      </article>
      <article class="eco__card reveal is-in" style="--d:.18s">
        <div class="eco__logo eco__logo--metacreate"><img src="../assets/img/logo.png" width="821" height="217" alt="" /></div>
        <span class="eco__k">{{ copy("Within ICOCO META") }}</span>
        <h3>{{ copy("MetaCreate · Physical AI") }}</h3>
        <p>{{ copy("The physical-AI layer within ICOCO META connects model reasoning with engineering tools and tasks, including the Yugong, MagiCube and DeepPhysic directions.") }}</p>
      </article>
    </div>
  </div>
</section>

</template>
