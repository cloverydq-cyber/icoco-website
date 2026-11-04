<script setup>
import logo from '@/assets/brand/icoco-logo-titanium-minimal.svg'
import IcocoButton from '@/components/base/IcocoButton.vue'
const appUrl = 'https://www.icoco.art/'
function openWorkbench() { window.location.assign(appUrl) }
</script>
<template>
  <main class="website-start">
    <img :src="logo" alt="ICOCO" class="website-logo">
    <h1>ICOCO 官网开发起点</h1>
    <p>此页仅验证独立官网项目、品牌素材与 UI token 可以运行。请在此开发官网和子页面。</p>
    <IcocoButton variant="primary" size="lg" @click="openWorkbench">进入现有工作台</IcocoButton>
    <p>当前按钮指向现有线上入口。正式官网接入前，需要由主项目维护者确定新的工作台地址。</p>
  </main>
</template>
