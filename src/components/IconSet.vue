<template>
  <!-- 扁平风格 SVG 图标库 -->
  <!-- 用于替代所有 emoji，保持一致、专业的视觉风格 -->

  <!-- Design/Exterior icon -->
  <svg v-if="name === 'design'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M12 2L22 7L22 17L12 22L2 17L2 7L12 2M12 2V22M12 12L2 7M12 12L22 7M12 12L12 22"/>
  </svg>

  <!-- Three-view icon -->
  <svg v-else-if="name === 'threeview'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <rect x="2" y="2" width="6" height="6"/>
    <rect x="9" y="2" width="6" height="6"/>
    <rect x="16" y="2" width="6" height="6"/>
    <rect x="2" y="16" width="20" height="6"/>
  </svg>

  <!-- Engineering Review icon -->
  <svg v-else-if="name === 'engineering'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M3 12L12 3L21 12M5 12V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V12"/>
    <path d="M9 15H15V22H9V15Z"/>
    <circle cx="12" cy="18" r="1" fill="currentColor"/>
  </svg>

  <!-- Case Review icon -->
  <svg v-else-if="name === 'case'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M4 3H20C21.1 3 22 3.9 22 5V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V5C2 3.9 2.9 3 4 3Z"/>
    <path d="M4 8H20"/>
    <path d="M4 13H20"/>
    <path d="M4 18H20"/>
  </svg>

  <!-- Package icon -->
  <svg v-else-if="name === 'package'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M12 2L20 6V12L12 16L4 12V6L12 2Z"/>
    <path d="M12 16V22"/>
    <path d="M4 12L4 18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V12"/>
  </svg>

  <!-- Overlay icon -->
  <svg v-else-if="name === 'overlay'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <rect x="3" y="3" width="9" height="9" rx="1"/>
    <rect x="12" y="12" width="9" height="9" rx="1"/>
    <path d="M12 3V12M3 12H12"/>
  </svg>

  <!-- Parameter icon -->
  <svg v-else-if="name === 'parameter'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M2 12L22 12"/>
    <path d="M7 7L7 17"/>
    <path d="M12 4L12 20"/>
    <path d="M17 8L17 16"/>
  </svg>

  <!-- Visual icon -->
  <svg v-else-if="name === 'visual'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M1 12S5 5 12 5S23 12 23 12S19 19 12 19S1 12 1 12Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>

  <!-- Fit icon -->
  <svg v-else-if="name === 'fit'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M4 4H20V20H4V4Z"/>
    <path d="M8 8H16V16H8V8Z"/>
    <path d="M2 2V6M22 2V6M2 22V18M22 22V18"/>
  </svg>

  <!-- Assets icon -->
  <svg v-else-if="name === 'assets'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <rect x="3" y="3" width="8" height="8"/>
    <rect x="13" y="3" width="8" height="8"/>
    <rect x="3" y="13" width="8" height="8"/>
    <rect x="13" y="13" width="8" height="8"/>
  </svg>

  <!-- Ranking icon -->
  <svg v-else-if="name === 'ranking'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <rect x="2" y="3" width="3" height="18"/>
    <rect x="6" y="7" width="3" height="14"/>
    <rect x="10" y="5" width="3" height="16"/>
    <rect x="14" y="2" width="3" height="19"/>
    <rect x="18" y="6" width="3" height="15"/>
  </svg>

  <!-- Kanban icon -->
  <svg v-else-if="name === 'kanban'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <rect x="2" y="4" width="5" height="16" rx="1"/>
    <rect x="9.5" y="4" width="5" height="16" rx="1"/>
    <rect x="17" y="4" width="5" height="16" rx="1"/>
  </svg>

  <!-- Archive icon -->
  <svg v-else-if="name === 'archive'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M21 8V21C21 22.1 20.1 23 19 23H5C3.9 23 3 22.1 3 21V8"/>
    <rect x="2" y="3" width="20" height="5"/>
    <path d="M10 12H14"/>
  </svg>

  <!-- Home icon -->
  <svg v-else-if="name === 'home'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M5.5 11.5L12 5.5L18.5 11.5V19H5.5V11.5Z"/>
    <path d="M9.8 19V14.5H14.2V19"/>
  </svg>

  <!-- Exterior navigation icon -->
  <svg v-else-if="name === 'exteriorNav'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M5.2 15.2h1.7l2-3.1c.5-.7 1.2-1.1 2.1-1.2l3.8-.3c.9-.1 1.8.2 2.5.8l1.9 1.8"/>
    <path d="M6.6 15.2h10.8l1.5-.8"/>
    <circle cx="8.4" cy="16.8" r="1.7"/>
    <circle cx="16.4" cy="16.8" r="1.7"/>
    <path d="M11.2 11l.9 4.2"/>
  </svg>

  <!-- Interior navigation icon -->
  <svg v-else-if="name === 'interiorNav'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M9.8 5.8h3.8c.9 0 1.5.7 1.4 1.6l-.6 4"/>
    <path d="M8.8 8l-.6 4.2c-.2 1.2.8 2.3 2 2.3h5.2"/>
    <path d="M8.3 14.5L7.1 18H17"/>
    <path d="M15.2 11h2c.8 0 1.4.6 1.4 1.4v2.1"/>
    <path d="M10.2 18v1M15.5 18v1"/>
  </svg>

  <!-- Model preview navigation icon -->
  <svg v-else-if="name === 'modelNav'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M12 3.2l7 4v9.6l-7 4-7-4V7.2l7-4z"/>
    <path d="M12 12.2l7-4M12 12.2l-7-4M12 12.2v8"/>
  </svg>

  <!-- CMF navigation icon -->
  <svg v-else-if="name === 'cmfNav'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <rect x="5.2" y="7.2" width="7" height="9.2" rx="1.2"/>
    <rect x="8.8" y="5.2" width="7" height="9.2" rx="1.2"/>
    <rect x="11.8" y="9" width="6.2" height="8.2" rx="1.2"/>
    <path d="M7.8 18.8h8.2"/>
  </svg>

  <!-- Engineering navigation icon -->
  <svg v-else-if="name === 'engineeringNav'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <rect x="5.5" y="5" width="10.5" height="14" rx="1.4"/>
    <path d="M8.2 8.5h3.8M8.2 11.8h3"/>
    <path d="M8.4 15.4l1.3 1.3 2.5-2.5"/>
    <path d="M16.8 8.2l2 2-4.2 4.2"/>
    <path d="M15.8 13.9l-1.7.5.5-1.7"/>
  </svg>

  <!-- Library navigation icon -->
  <svg v-else-if="name === 'libraryNav'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <rect x="6.2" y="7" width="10.5" height="12" rx="1.4"/>
    <path d="M8.8 5H18v11.5"/>
    <path d="M9.5 10.5h3.5M9.5 13.7h3.5"/>
    <path d="M8.8 19h7"/>
  </svg>

  <!-- My (project hub) navigation icon -->
  <svg v-else-if="name === 'myNav'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M5 6.5h4l1.6 2h7.4a1.4 1.4 0 0 1 1.4 1.4v7.2a1.4 1.4 0 0 1-1.4 1.4H5A1.4 1.4 0 0 1 3.6 17.1V7.9A1.4 1.4 0 0 1 5 6.5z"/>
    <path d="M8.5 13.2h7M8.5 16h4.5"/>
  </svg>

  <!-- Panel open icon -->
  <svg v-else-if="name === 'panelOpen'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
    <path d="M9 3v18"/>
    <path d="M13 9l3 3-3 3"/>
  </svg>

  <!-- Admin shield icon -->
  <svg v-else-if="name === 'admin'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M12 5l5.5 3v4.1c0 4-2.2 6.6-5.5 7.4-3.3-.8-5.5-3.4-5.5-7.4V8L12 5z"/>
  </svg>

  <!-- Sliders icon -->
  <svg v-else-if="name === 'sliders'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M5.5 7h13"/>
    <path d="M5.5 12h13"/>
    <path d="M5.5 17h13"/>
    <circle cx="9" cy="7" r="1.4"/>
    <circle cx="15" cy="12" r="1.4"/>
    <circle cx="11" cy="17" r="1.4"/>
  </svg>

  <!-- Help icon -->
  <svg v-else-if="name === 'helpCircle'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <circle cx="12" cy="12" r="9"/>
    <path d="M9.5 9a3 3 0 0 1 5.4 1.6c0 2-3 2-3 4"/>
    <path d="M12 17h.01"/>
  </svg>

  <!-- Feedback icon -->
  <svg v-else-if="name === 'feedbackBubble'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
  </svg>

  <!-- Rewards icon -->
  <svg v-else-if="name === 'rewardsSparkles'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M12 3l1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3z"/>
    <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14z"/>
    <path d="M6 14l.7 1.8L8.5 16l-1.8.7L6 18.5l-.7-1.8L3.5 16l1.8-.7L6 14z"/>
  </svg>

  <!-- Shield check icon -->
  <svg v-else-if="name === 'shieldCheck'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/>
    <path d="M9.5 12.5l1.7 1.7 3.8-4.2"/>
  </svg>

  <!-- Logout icon -->
  <svg v-else-if="name === 'logout'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M10 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
    <path d="M15 16l4-4-4-4"/>
    <path d="M19 12H9"/>
  </svg>

  <!-- Back icon -->
  <svg v-else-if="name === 'back'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
  </svg>

  <!-- Arrow Right icon -->
  <svg v-else-if="name === 'arrowRight'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
  </svg>

  <!-- Settings icon -->
  <svg v-else-if="name === 'settings'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1V3M12 21V23M23 12H21M3 12H1"/>
    <path d="M20.485 3.515L18.364 5.636M5.636 18.364L3.515 20.485M20.485 20.485L18.364 18.364M5.636 5.636L3.515 3.515"/>
  </svg>

  <!-- Upload icon -->
  <svg v-else-if="name === 'upload'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M12 2V14M12 14L7 9M12 14L17 9M2 20H22"/>
  </svg>

  <!-- Download icon -->
  <svg v-else-if="name === 'download'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M12 3v11"/>
    <path d="M8 11l4 4 4-4"/>
    <path d="M4 20h16"/>
  </svg>

  <!-- Edit icon -->
  <svg v-else-if="name === 'edit'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M3 21l3.8-1 11-11a2.2 2.2 0 0 0-3.1-3.1l-11 11L3 21z"/>
    <path d="M13.5 5.5l5 5"/>
  </svg>

  <!-- Bookmark icon -->
  <svg v-else-if="name === 'bookmark'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M6 3h12a1.5 1.5 0 0 1 1.5 1.5V21L12 17.2 4.5 21V4.5A1.5 1.5 0 0 1 6 3z"/>
    <path d="M9 9h6"/>
  </svg>

  <!-- Trash icon -->
  <svg v-else-if="name === 'trash'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M3 6h18"/>
    <path d="M8 6V4h8v2"/>
    <path d="M6.5 6l1 15h9l1-15"/>
    <path d="M10 11v6M14 11v6"/>
  </svg>

  <!-- Zoom icon -->
  <svg v-else-if="name === 'zoom'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <circle cx="11" cy="11" r="6.5"/>
    <path d="M16 16l4 4"/>
  </svg>

  <!-- Download HD icon -->
  <svg v-else-if="name === 'download-hd'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M12 3v11"/>
    <path d="M8 11l4 4 4-4"/>
    <path d="M4 20h16"/>
    <path d="M18 5l3 3-3 3"/>
  </svg>

  <!-- Info icon -->
  <svg v-else-if="name === 'info'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 10v6"/>
    <path d="M12 7.5h.01"/>
  </svg>

  <!-- Copy icon -->
  <svg v-else-if="name === 'copy'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <rect x="9" y="9" width="11" height="11" rx="2"/>
    <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>
  </svg>

  <!-- Plus icon -->
  <svg v-else-if="name === 'plus'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M12 5v14"/>
    <path d="M5 12h14"/>
  </svg>

  <!-- Image icon -->
  <svg v-else-if="name === 'image'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <rect x="4" y="5" width="16" height="14" rx="2"/>
    <circle cx="9" cy="10" r="1.5"/>
    <path d="M20 16l-4.5-4.5-3.5 3.5-2-2L4 18"/>
  </svg>

  <!-- Sparkles icon -->
  <svg v-else-if="name === 'sparkles'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M12 3l1.2 3.5L17 8l-3.8 1.5L12 13l-1.2-3.5L7 8l3.8-1.5L12 3z"/>
    <path d="M18.5 13.5l.7 1.9 1.8.7-1.8.7-.7 1.9-.7-1.9-1.8-.7 1.8-.7.7-1.9z"/>
    <path d="M5.5 14.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6z"/>
  </svg>

  <!-- Context icon -->
  <svg v-else-if="name === 'context'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <rect x="4" y="4" width="10" height="10" rx="2"/>
    <rect x="10" y="10" width="10" height="10" rx="2"/>
  </svg>

  <!-- Constraints icon -->
  <svg v-else-if="name === 'constraints'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" v-bind="attrs">
    <path d="M4 7h16"/>
    <path d="M4 17h16"/>
    <circle cx="9" cy="7" r="2"/>
    <circle cx="15" cy="17" r="2"/>
  </svg>

  <!-- Send icon -->
  <svg v-else-if="name === 'sendUp'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M12 19V6"/>
    <path d="M7 11l5-5 5 5"/>
  </svg>

  <!-- Check icon -->
  <svg v-else-if="name === 'check'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M20 6L9 17L4 12"/>
  </svg>

  <!-- Close icon -->
  <svg v-else-if="name === 'close'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" v-bind="attrs">
    <path d="M18 6L6 18M6 6L18 18"/>
  </svg>

  <!-- Menu icon -->
  <svg v-else-if="name === 'menu'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M3 6H21M3 12H21M3 18H21"/>
  </svg>

  <!-- Refresh icon -->
  <svg v-else-if="name === 'refresh'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M1 4v6h6"/>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
  </svg>

  <!-- Cube icon (3D model) -->
  <svg v-else-if="name === 'cube'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M12 2L22 7V17L12 22L2 17V7L12 2Z"/>
    <path d="M12 22V12"/>
    <path d="M22 7L12 12L2 7"/>
  </svg>

  <!-- Feasibility icon (shield with magnifier) -->
  <svg v-else-if="name === 'feasibility'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M12 3l7 3v5c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z"/>
    <circle cx="12" cy="11" r="3"/>
    <path d="M14.1 13.1L16 15"/>
  </svg>

  <!-- Refine icon (magic wand) -->
  <svg v-else-if="name === 'refine'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M15 4l5 5-11 11H4v-5L15 4z"/>
    <path d="M12 7l5 5"/>
    <path d="M2 2l4 2-2 4"/>
  </svg>

  <!-- Camera icon (snapshot) -->
  <svg v-else-if="name === 'camera'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>

  <!-- Thumbs up icon -->
  <svg v-else-if="name === 'thumbs-up'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M14 9V5a3 3 0 0 0-6 0v4H3v12h18V9h-7z"/>
    <path d="M7 21H3"/>
  </svg>

  <!-- Thumbs down icon -->
  <svg v-else-if="name === 'thumbs-down'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M10 15V19a3 3 0 0 0 6 0v-4h5V3H3v12h7z"/>
    <path d="M17 3h4"/>
  </svg>

  <!-- Flag icon -->
  <svg v-else-if="name === 'flag'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
    <path d="M4 22V4"/>
  </svg>

  <!-- Export icon -->
  <svg v-else-if="name === 'export'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <path d="M17 8l-5-5-5 5"/>
    <path d="M12 3v12"/>
  </svg>

  <!-- Save icon -->
  <svg v-else-if="name === 'save'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <path d="M17 21v-8H7v8"/>
    <path d="M7 3v5h8"/>
  </svg>

  <!-- Toggle icon -->
  <svg v-else-if="name === 'toggle'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <rect x="1" y="5" width="22" height="14" rx="7"/>
    <circle cx="16" cy="12" r="4" fill="currentColor"/>
  </svg>

  <!-- Eye icon -->
  <svg v-else-if="name === 'eye'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>

  <!-- Target icon -->
  <svg v-else-if="name === 'target'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>

  <!-- Palette icon (CMF) -->
  <svg v-else-if="name === 'palette'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="8" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
    <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="15" r="1.5" fill="currentColor"/>
  </svg>

  <!-- Layers icon -->
  <svg v-else-if="name === 'layers'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>

  <!-- Reference icon (paperclip + image) -->
  <svg v-else-if="name === 'reference'" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>

  <!-- Fallback icon (question mark in circle) — rendered when name is unknown -->
  <svg v-else class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" v-bind="attrs">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <path d="M12 17h.01"/>
  </svg>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
import { useAttrs } from 'vue'
const attrs = useAttrs()

defineProps({
  name: {
    type: String,
    required: true,
    validator: (v) => [
      'design', 'threeview', 'engineering', 'case', 'package', 'overlay',
      'parameter', 'visual', 'fit', 'assets', 'ranking', 'kanban', 'archive',
      'home', 'exteriorNav', 'interiorNav', 'cmfNav', 'engineeringNav', 'libraryNav', 'modelNav', 'myNav',
      'panelOpen', 'admin', 'sliders', 'helpCircle', 'feedbackBubble', 'rewardsSparkles',
      'shieldCheck', 'logout', 'back', 'arrowRight', 'settings', 'upload', 'download',
      'download-hd', 'zoom', 'info', 'edit', 'bookmark', 'trash', 'copy', 'plus', 'image',
      'sparkles', 'context', 'constraints', 'sendUp', 'check', 'close', 'menu',
      // Batch 3A-0 additions
      'refresh', 'cube', 'feasibility', 'refine', 'camera', 'thumbs-up', 'thumbs-down',
      'flag', 'export', 'save', 'toggle', 'eye', 'target', 'palette', 'layers', 'reference',
    ].includes(v)
  }
})
</script>

<style scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
  color: currentColor;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  flex-shrink: 0;
}
</style>
