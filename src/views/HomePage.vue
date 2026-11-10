<script setup>
import { useMarketingLanguage } from '@/i18n/useMarketingLanguage'

/* ICOCO META — homepage.
   Markup is the approved design; the WebGL horizon and the scroll
   choreography live in src/site and are started after mount so they
   always find their DOM nodes. */
import { onMounted, onBeforeUnmount } from 'vue'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import '@/site/textures.js'
import { initSpace } from '@/site/space.js'
import { initInteractions } from '@/site/interactions.js'

const { copy } = useMarketingLanguage()


let stopSpace, stopInteractions
onMounted(() => {
  stopSpace = initSpace()
  stopInteractions = initInteractions()
})
onBeforeUnmount(() => {
  stopSpace?.()
  stopInteractions?.()
})
</script>

<template>
<div class="scroll-progress"><span id="scrollBar"></span></div>
<div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>

<SiteHeader />

<main>
<!-- ============ HERO ============ -->
<section class="hero" id="home">
  <div class="hero__stage" id="heroStage">
    <canvas id="spaceCanvas" class="hero__canvas"></canvas>
    <div class="hero__grade" aria-hidden="true"></div>

    <div class="hero__copy" id="heroContent">
      <h1 class="hero__title">
        <span class="line"><span>ICOCO META</span></span>
        <span class="line"><span>Design AI</span></span>
      </h1>
      <p class="hero__lead">{{ copy("Engineering-guided AI for automotive design") }}</p>
      <p class="hero__sub">{{ copy("Connect styling intent, geometry and engineering review in one workflow.") }}</p>
      <div class="hero__facts">
        <div class="hero__fact"><b>03</b><span>{{ copy("Intelligence layers") }}</span></div>
        <div class="hero__fact"><b>04</b><span>{{ copy("Workflow stages") }}</span></div>
        <div class="hero__fact"><b>01</b><span>{{ copy("Shared design intent") }}</span></div>
      </div>
    </div>

    <div class="hero__side" aria-hidden="true">{{ copy("Automotive Design · Engineering Intelligence") }}</div>

    <div class="hero__hint" id="heroHint" aria-hidden="true"><i></i>{{ copy("Scroll to explore") }}</div>
  </div>
</section>

<!-- ============ CAPABILITIES ============ -->
<section class="caps" id="capabilities">
  <div class="hero__cards" id="heroCards">
    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-automotive.jpg" :alt="copy(&quot;Electric vehicle in a studio&quot;)" loading="lazy"></div>
      <div class="capcard__body">
        <h3>{{ copy("Automotive") }}</h3>
        <span class="capcard__rule"></span>
        <p>{{ copy("Exterior concepts.") }}<br>{{ copy("Engineering context.") }}</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-cae.jpg" :alt="copy(&quot;Aerodynamic simulation of a car&quot;)" loading="lazy"></div>
      <div class="capcard__body">
        <h3>CAE</h3>
        <span class="capcard__rule"></span>
        <p>{{ copy("Physics-informed questions.") }}<br>{{ copy("Evidence-led review.") }}</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-digital.jpg" :alt="copy(&quot;Engineer working on a CAD model&quot;)" loading="lazy"></div>
      <div class="capcard__body">
        <h3>{{ copy("Digital Engineering") }}</h3>
        <span class="capcard__rule"></span>
        <p>{{ copy("Geometry, parameters") }}<br>{{ copy("and revision history.") }}</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-physical.jpg" :alt="copy(&quot;Robotic arm on an assembly line&quot;)" loading="lazy"></div>
      <div class="capcard__body">
        <h3>{{ copy("Physical AI") }}</h3>
        <span class="capcard__rule"></span>
        <p>{{ copy("Connecting AI reasoning") }}<br>{{ copy("with engineering tasks.") }}</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-robotics.jpg" :alt="copy(&quot;Autonomous mobile robot in a warehouse&quot;)" loading="lazy"></div>
      <div class="capcard__body">
        <h3>{{ copy("Robotics") }}</h3>
        <span class="capcard__rule"></span>
        <p>{{ copy("Exploring applications") }}<br>{{ copy("beyond vehicle design.") }}</p>
      </div>
    </article>

    <article class="capcard">
      <div class="capcard__media"><img src="../assets/img/card-software.jpg" :alt="copy(&quot;Industrial software dashboard&quot;)" loading="lazy"></div>
      <div class="capcard__body">
        <h3>{{ copy("Industrial Software") }}</h3>
        <span class="capcard__rule"></span>
        <p>{{ copy("Workflows that connect") }}<br>{{ copy("specialist tools.") }}</p>
      </div>
    </article>
  </div>
</section>

</main>

<SiteFooter />
</template>
