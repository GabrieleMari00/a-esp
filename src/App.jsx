import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   LOGO DATA (base64 PNGs embedded)
───────────────────────────────────────────── */
const ICON_B64 = "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";

const TEXT_B64 = "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";

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const CATEGORIES = [
  { code: "C01", label: "Avviso di pagamento", risk: "alto", color: "#E42733" },
  { code: "C02", label: "Sanzione / Multa", risk: "alto", color: "#E42733" },
  { code: "C03", label: "Atto Amministrativo / PA", risk: "medio-alto", color: "#C03040" },
  { code: "C04", label: "Documento Fiscale", risk: "medio", color: "#D06070" },
  { code: "C05", label: "Contratto / Accordo", risk: "medio", color: "#D06070" },
  { code: "C06", label: "Scadenza Ricorrente", risk: "medio", color: "#D06070" },
  { code: "C07", label: "Richiesta di Azione", risk: "medio", color: "#D06070" },
  { code: "C08", label: "Comunicazione Informativa", risk: "basso-medio", color: "#B07080" },
  { code: "C09", label: "Appuntamento / Convocazione", risk: "medio", color: "#D06070" },
  { code: "C10", label: "Ricevuta / Conferma", risk: "basso", color: "#C09098" },
  { code: "C11", label: "Documento Personale", risk: "medio", color: "#D06070" },
  { code: "C12", label: "Lavoro / Cliente / Fornitore", risk: "variabile", color: "#8A3040" },
  { code: "C13", label: "Newsletter / Promo", risk: "basso", color: "#C09098" },
  { code: "C14", label: "Spam / Irrilevante", risk: "nessuno", color: "#D8C0C4" },
];

const MOCK_DOCS = [
  { id: 1, channel: "PEC", from: "Agenzia delle Entrate", subject: "Avviso di accertamento n. 2025/47281", date: "2026-02-24", category: "C02", read: false, urgent: true, amount: "€ 2.450,00", deadline: "2026-03-10", managed: false },
  { id: 2, channel: "EMAIL", from: "Comune di Milano", subject: "Notifica multa ZTL del 12/01/2026", date: "2026-02-22", category: "C02", read: false, urgent: true, amount: "€ 167,00", deadline: "2026-03-24", managed: false },
  { id: 3, channel: "PEC", from: "AdE Riscossione", subject: "Cartella esattoriale n. 0002348 - F24 2024", date: "2026-02-20", category: "C01", read: true, urgent: true, amount: "€ 890,00", deadline: "2026-03-05", managed: false },
  { id: 4, channel: "EMAIL", from: "Ordine dei Commercialisti", subject: "Convocazione assemblea ordinaria – 15 marzo", date: "2026-02-19", category: "C09", read: true, urgent: false, amount: null, deadline: "2026-03-15", managed: true },
  { id: 5, channel: "REM", from: "Tribunale di Milano", subject: "Atto di citazione – Procedimento 2026/1234", date: "2026-02-17", category: "C03", read: false, urgent: true, amount: null, deadline: "2026-03-03", managed: false },
  { id: 6, channel: "EMAIL", from: "Enel Energia", subject: "Fattura n. FE20260202 – Scadenza 05/03/2026", date: "2026-02-16", category: "C01", read: true, urgent: false, amount: "€ 320,40", deadline: "2026-03-05", managed: false },
  { id: 7, channel: "EMAIL", from: "Generali Assicurazioni", subject: "Rinnovo polizza RC Auto – scadenza 28/02/2026", date: "2026-02-15", category: "C06", read: true, urgent: false, amount: "€ 780,00", deadline: "2026-02-28", managed: true },
  { id: 8, channel: "PEC", from: "Camera di Commercio", subject: "Richiesta integrazione documentale pratica 88/2026", date: "2026-02-12", category: "C07", read: false, urgent: false, amount: null, deadline: "2026-03-12", managed: false },
  { id: 9, channel: "EMAIL", from: "Studio Legale Rossi & Associati", subject: "Contratto di consulenza – testo definitivo", date: "2026-02-10", category: "C05", read: true, urgent: false, amount: "€ 4.200,00", deadline: null, managed: true },
  { id: 10, channel: "EMAIL", from: "Amazon Business", subject: "Fattura #IT-2026-0192834", date: "2026-02-09", category: "C04", read: true, urgent: false, amount: "€ 89,99", deadline: null, managed: true },
  { id: 11, channel: "EMAIL", from: "Stripe Payments", subject: "Your February 2026 invoice is available", date: "2026-02-08", category: "C04", read: true, urgent: false, amount: "€ 340,00", deadline: null, managed: true },
  { id: 12, channel: "REM", from: "Inps", subject: "Comunicazione contributi previdenziali – avviso", date: "2026-02-06", category: "C03", read: false, urgent: false, amount: "€ 1.120,00", deadline: "2026-03-20", managed: false },
];

const CONNECTIONS = [
  { id: "gmail", name: "Gmail", icon: "G", connected: true, email: "mario.rossi@gmail.com", lastSync: "2 min fa", color: "#E02834" },
  { id: "outlook", name: "Outlook", icon: "O", connected: false, email: null, lastSync: null, color: "#8A3040" },
  { id: "pec_aruba", name: "PEC Aruba", icon: "P", connected: true, email: "m.rossi@pec.it", lastSync: "5 min fa", color: "#E02834" },
  { id: "pec_legalmail", name: "PEC Legalmail", icon: "L", connected: false, email: null, lastSync: null, color: "#C03040" },
  { id: "rem", name: "REM / QeRDS", icon: "R", connected: false, email: null, lastSync: null, color: "#7A1418" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const getRiskColor = (risk) => {
  if (risk === "alto") return "#E02834";
  if (risk === "medio-alto") return "#C03040";
  if (risk === "medio") return "#D06070";
  if (risk === "basso-medio") return "#B07080";
  return "#C09098";
};

const getCategoryInfo = (code) => CATEGORIES.find(c => c.code === code) || CATEGORIES[12];

const channelBadge = {
  PEC:   { color: "#E02834", bg: "rgba(224,40,52,0.12)" },
  EMAIL: { color: "#7A1418", bg: "rgba(122,20,24,0.10)" },
  REM:   { color: "#4A0C10", bg: "rgba(74,12,16,0.10)" },
};

/* ─────────────────────────────────────────────
   CSS STYLES (injected)
───────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Nunito:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* ── base ── */
    --bg:      #F2E8D4;
    --surface: #FEFAEF;
    --card:    #FFFFFF;
    --card2:   #FDF4EC;
    --border:  rgba(180,60,50,0.13);
    --border2: rgba(180,60,50,0.22);
    /* ── red scale ── */
    --red:       #E02834;
    --red-dark:  #AA1C22;
    --red-mid:   #D05060;
    --red-pale:  #F8DADE;
    --red-deep:  #7A1418;
    --red-soft:  rgba(224,40,52,0.08);
    --red-glow:  rgba(224,40,52,0.22);
    /* ── semantic aliases (all shades of red/cream) ── */
    --teal:       #B04050;
    --teal-soft:  rgba(176,64,80,0.08);
    --amber:      #C83040;
    --amber-soft: rgba(200,48,64,0.10);
    --blue:       #7A1418;
    --blue-soft:  rgba(122,20,24,0.10);
    --green:      #C86870;
    --green-soft: rgba(200,104,112,0.15);
    --purple:     #7A1418;
    /* ── text ── */
    --text:  #1E0406;
    --text2: #7A3540;
    --text3: #BF9098;
    --font: 'Nunito', sans-serif;
    --brand-font: 'Comfortaa', sans-serif;
    --mono: 'DM Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); font-size: 14px; -webkit-font-smoothing: antialiased; }

  .app { display: flex; height: 100vh; overflow: hidden; }


  /* ── COLLAPSIBLE SIDEBAR ── */
  .sidebar {
    transition: width 0.22s cubic-bezier(0.4,0,0.2,1),
                min-width 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  .sidebar.collapsed {
    width: 62px; min-width: 62px;
  }
  .sidebar.collapsed .logo-wordmark,
  .sidebar.collapsed .nav-item-label,
  .sidebar.collapsed .nav-section,
  .sidebar.collapsed .nav-badge,
  .sidebar.collapsed .user-name,
  .sidebar.collapsed .user-plan,
  .sidebar.collapsed .sidebar-footer .user-pill > div:last-child {
    display: none;
  }
  .sidebar.collapsed .sidebar-header {
    justify-content: center; padding: 18px 0 16px;
  }
  .sidebar.collapsed .logo-icon {
    margin: 0;
  }
  .sidebar.collapsed .nav-item {
    justify-content: center; padding: 10px 0; border-left: 3px solid transparent;
  }
  .sidebar.collapsed .nav-item.active { border-left-color: var(--red); }
  .sidebar.collapsed .nav-icon { width: 18px; height: 18px; opacity: 1; }
  .sidebar.collapsed .sidebar-nav { padding: 10px 0; }
  .sidebar.collapsed .sidebar-footer { padding: 10px 0; display:flex; justify-content:center; }
  .sidebar.collapsed .user-pill {
    width: 38px; height: 38px; border-radius: 50%; padding: 0;
    display: flex; align-items: center; justify-content: center; gap: 0;
  }
  .sidebar.collapsed .user-avatar { width: 34px; height: 34px; font-size: 11px; }

  /* collapsed badge — dot indicator */
  .sidebar.collapsed .nav-item { position: relative; }
  .sidebar.collapsed .nav-item.has-badge::after {
    content: ''; position: absolute; top: 7px; right: 8px;
    width: 7px; height: 7px; border-radius: 50%; background: var(--red);
    border: 1.5px solid var(--surface);
  }

  /* toggle button */
  .sidebar-toggle {
    width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0; margin-left: auto;
    background: var(--card); border: 1.5px solid var(--border);
    box-shadow: 0 1px 4px rgba(30,4,6,0.10);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text2); transition: all 0.15s;
  }
  .sidebar-toggle:hover { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .sidebar-toggle svg { transition: transform 0.22s; }
  .sidebar.collapsed .sidebar-toggle { display: none; }
  .logo-icon.clickable { cursor: pointer; transition: opacity 0.15s; }
  .logo-icon.clickable:hover { opacity: 0.75; }

  /* SIDEBAR */
  .sidebar {
    width: 240px; min-width: 240px; background: var(--surface);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    padding: 0; overflow: hidden; position: relative;
    box-shadow: 2px 0 8px rgba(224,40,52,0.06);
  }
  .sidebar-header {
    padding: 18px 20px 16px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px; background: var(--surface);
  }
  .logo-icon {
    width: 36px; height: 36px; object-fit: contain; border-radius: 8px;
    background: #FEFAEF; padding: 3px; flex-shrink: 0;
  }
  .logo-wordmark {
    font-family: 'Comfortaa', sans-serif; font-weight: 700; font-size: 19px;
    color: var(--red); letter-spacing: -0.5px; line-height: 1; user-select: none;
  }
  .sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-section { padding: 8px 16px 4px; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; color: var(--text3); text-transform: uppercase; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 16px;
    cursor: pointer; color: var(--text2); font-size: 13.5px; font-weight: 400;
    transition: all 0.15s; border-radius: 0; position: relative; border-left: 3px solid transparent;
  }
  .nav-item:hover { background: rgba(224,40,52,0.06); color: var(--text); }
  .nav-item.active { color: var(--red); background: var(--red-soft); border-left-color: var(--red); font-weight: 700; }
  .nav-icon { width: 16px; height: 16px; opacity: 0.8; }
  .nav-badge {
    margin-left: auto; background: var(--red); color: white; border-radius: 10px;
    font-size: 10px; font-weight: 800; padding: 1px 6px; min-width: 18px; text-align: center; font-family: var(--brand-font);
  }
  .sidebar-footer { padding: 16px; border-top: 1px solid var(--border); }
  .user-pill {
    display: flex; align-items: center; gap: 10px; padding: 8px 10px;
    background: var(--red-pale); border-radius: 8px; cursor: pointer;
  }
  .user-avatar {
    width: 28px; height: 28px; border-radius: 50%; background: var(--red);
    display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
  }
  .user-name { font-size: 12.5px; font-weight: 500; }
  .user-plan { font-size: 10.5px; color: var(--text3); }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .topbar {
    padding: 0 24px; height: 56px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 16px; background: var(--surface);
    box-shadow: 0 2px 8px rgba(224,40,52,0.06);
  }
  .page-title { font-size: 15px; font-weight: 700; flex: 1; font-family: var(--brand-font); letter-spacing: -0.3px; }
  .search-box {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface); border: 1px solid var(--border2); border-radius: 8px;
    padding: 7px 12px; width: 260px;
  }
  .search-box input {
    background: none; border: none; outline: none; color: var(--text);
    font-family: var(--font); font-size: 13px; width: 100%;
  }
  .search-box input::placeholder { color: var(--text3); }
  .icon-btn {
    width: 34px; height: 34px; border-radius: 8px; background: var(--surface);
    border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
    cursor: pointer; position: relative; color: var(--text2); transition: all 0.15s;
  }
  .icon-btn:hover { background: var(--red-pale); color: var(--red); }
  .notif-dot {
    position: absolute; top: 6px; right: 6px; width: 7px; height: 7px;
    background: var(--red); border-radius: 50%; border: 1.5px solid var(--surface);
  }
  .content { flex: 1; overflow-y: auto; padding: 24px; }

  /* CARDS & GRID */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    padding: 16px 18px; position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .stat-card.red::before { background: var(--red); }
  .stat-card.amber::before { background: var(--red-mid); }
  .stat-card.teal::before { background: var(--teal); }
  .stat-card.blue::before { background: var(--blue); }
  .stat-label { font-size: 11px; font-weight: 500; color: var(--text3); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; }
  .stat-value { font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 6px; }
  .stat-sub { font-size: 11.5px; color: var(--text2); }
  .stat-sub span { color: var(--red); font-weight: 600; }

  /* ALERTS */
  .alert-strip {
    background: var(--red-soft); border: 1px solid rgba(228,39,51,0.3); border-radius: 10px;
    padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;
  }
  .alert-dot { width: 8px; height: 8px; background: var(--red); border-radius: 50%; flex-shrink: 0; animation: pulse 1.5s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }
  .alert-text { font-size: 13px; font-weight: 500; flex: 1; }
  .alert-cta { font-size: 12px; font-weight: 600; color: var(--red); cursor: pointer; white-space: nowrap; }

  /* TWO-COL */
  .two-col { display: grid; grid-template-columns: 1fr 340px; gap: 16px; }

  /* TABLE / INBOX */
  .doc-table { width: 100%; border-collapse: collapse; }
  .doc-table th {
    text-align: left; font-size: 10.5px; font-weight: 600; color: var(--text3);
    text-transform: uppercase; letter-spacing: 0.8px; padding: 0 12px 8px; white-space: nowrap;
  }
  .doc-row {
    border-top: 1px solid var(--border); transition: background 0.1s; cursor: pointer;
  }
  .doc-row:hover { background: rgba(224,40,52,0.04); }
  .doc-row.unread td { color: var(--text); }
  .doc-row td { padding: 11px 12px; font-size: 13px; vertical-align: middle; }
  .channel-tag {
    display: inline-flex; align-items: center; font-size: 10px; font-weight: 700;
    padding: 2px 7px; border-radius: 5px; font-family: var(--mono); letter-spacing: 0.5px;
  }
  .urgency-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
  .subject-text { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .doc-from { font-size: 11.5px; color: var(--text2); margin-top: 2px; }
  .date-text { font-size: 12px; color: var(--text2); white-space: nowrap; font-family: var(--mono); }
  .deadline-badge {
    font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px;
    white-space: nowrap; font-family: var(--mono);
  }
  .deadline-badge.red { color: var(--red); background: var(--red-soft); }
  .deadline-badge.amber { color: var(--red-mid); background: var(--amber-soft); }
  .deadline-badge.ok { color: var(--teal); background: rgba(176,64,80,0.10); }

  /* SECTION HEADER */
  .section-hdr { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .section-title { font-size: 14px; font-weight: 700; font-family: var(--brand-font); }
  .section-sub { font-size: 12px; color: var(--text3); }
  .view-all { font-size: 12px; color: var(--red); cursor: pointer; font-weight: 500; }

  /* SIDEBAR WIDGET */
  .widget { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; margin-bottom: 16px; }
  .widget-title { font-size: 12px; font-weight: 600; color: var(--text2); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }

  /* ALERT ITEMS */
  .alert-item {
    padding: 10px 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer;
    border-left: 3px solid; transition: background 0.1s;
  }
  .alert-item:hover { background: rgba(255,255,255,0.03); }
  .alert-item-title { font-size: 12.5px; font-weight: 500; margin-bottom: 3px; }
  .alert-item-sub { font-size: 11px; color: var(--text2); }

  /* CATEGORY LIST */
  .cat-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--border); }
  .cat-row:last-child { border-bottom: none; }
  .cat-code { font-size: 10px; font-weight: 700; font-family: var(--mono); background: var(--red-pale); padding: 2px 5px; border-radius: 4px; color: var(--red); width: 32px; text-align: center; }
  .cat-label { font-size: 12.5px; flex: 1; }
  .cat-count { font-size: 11px; color: var(--text2); font-family: var(--mono); }

  /* TABS */
  .tabs { display: flex; gap: 2px; background: var(--card); border-radius: 8px; padding: 3px; margin-bottom: 18px; border: 1px solid var(--border); }
  .tab { flex: 1; padding: 7px 12px; text-align: center; font-size: 12.5px; font-weight: 500; cursor: pointer; border-radius: 6px; color: var(--text2); transition: all 0.15s; }
  .tab.active { background: var(--red); color: #FEFAEF; font-weight: 600; }
  .tab:hover:not(.active) { background: var(--card2); color: var(--text); }

  /* CONNECTION CARDS */
  .conn-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    padding: 14px 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 14px;
  }
  .conn-icon {
    width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center;
    justify-content: center; font-weight: 800; font-size: 14px; flex-shrink: 0;
  }
  .conn-name { font-size: 14px; font-weight: 600; }
  .conn-email { font-size: 11.5px; color: var(--text2); margin-top: 2px; font-family: var(--mono); }
  .conn-status { display: flex; align-items: center; gap: 5px; font-size: 11.5px; }
  .conn-dot { width: 6px; height: 6px; border-radius: 50%; }
  .conn-btn {
    margin-left: auto; padding: 6px 14px; border-radius: 7px; font-size: 12px; font-weight: 600;
    cursor: pointer; border: 1px solid; transition: all 0.15s; font-family: var(--font); white-space: nowrap;
  }
  .conn-btn.connect { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .conn-btn.connect:hover { background: var(--red-dark); }
  .conn-btn.disconnect { background: transparent; color: var(--text2); border-color: var(--border); }
  .conn-btn.disconnect:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }

  /* ARCHIVE GRID */
  .archive-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .archive-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 10px;
    padding: 16px; cursor: pointer; transition: all 0.15s;
  }
  .archive-card:hover { border-color: var(--red); background: var(--red-soft); }
  .archive-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
  .archive-card-count { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
  .archive-card-label { font-size: 12px; color: var(--text2); line-height: 1.3; }
  .risk-pill { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 5px; }

  /* TIMELINE */
  .timeline-item { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .timeline-item:last-child { border-bottom: none; }
  .tl-line { display: flex; flex-direction: column; align-items: center; gap: 0; }
  .tl-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
  .tl-bar { width: 1px; flex: 1; background: var(--border); margin-top: 4px; }
  .tl-content { flex: 1; }
  .tl-date { font-size: 10.5px; color: var(--text3); font-family: var(--mono); margin-bottom: 3px; }
  .tl-title { font-size: 13px; font-weight: 500; margin-bottom: 2px; }
  .tl-sub { font-size: 11.5px; color: var(--text2); }

  /* DOC DETAIL DRAWER */
  .drawer-overlay {
    position: fixed; inset: 0; background: rgba(30,4,6,0.35); z-index: 100;
    display: flex; justify-content: flex-end;
  }
  .drawer {
    width: 480px; background: var(--surface); border-left: 1px solid var(--border);
    height: 100%; display: flex; flex-direction: column; overflow: hidden;
    animation: slideIn 0.2s ease;
  }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .drawer-header { padding: 20px 24px 16px; border-bottom: 1px solid var(--border); }
  .drawer-close { font-size: 20px; cursor: pointer; color: var(--text2); float: right; line-height: 1; }
  .drawer-body { flex: 1; overflow-y: auto; padding: 20px 24px; }
  .drawer-section { margin-bottom: 20px; }
  .drawer-section-title { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); margin-bottom: 10px; }
  .info-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid var(--border); }
  .info-row:last-child { border-bottom: none; }
  .info-key { font-size: 12px; color: var(--text2); }
  .info-val { font-size: 13px; font-weight: 500; text-align: right; max-width: 220px; }
  .big-badge {
    display: inline-flex; align-items: center; gap: 6px; background: var(--red-soft);
    border: 1px solid rgba(228,39,51,0.3); color: var(--red); padding: 8px 14px;
    border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 16px;
  }
  .risk-card { background: var(--red-pale); border-radius: 8px; padding: 14px; margin-top: 8px; }
  .risk-title { font-size: 12px; font-weight: 600; margin-bottom: 6px; }
  .risk-desc { font-size: 12px; color: var(--text2); line-height: 1.5; }
  .primary-btn {
    width: 100%; padding: 11px; background: var(--red); color: #FEFAEF; border: none;
    border-radius: 8px; font-family: var(--font); font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: background 0.15s; margin-bottom: 8px;
  }
  .primary-btn:hover { background: var(--red-dark); }
  .secondary-btn {
    width: 100%; padding: 11px; background: transparent; color: var(--text2);
    border: 1px solid var(--border2); border-radius: 8px; font-family: var(--font);
    font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all 0.15s;
  }
  .secondary-btn:hover { border-color: var(--text2); color: var(--text); }
  .drawer-footer { padding: 16px 24px; border-top: 1px solid var(--border); }

  /* PROGRESS BAR */
  .progress-bar { background: var(--red-pale); border-radius: 4px; height: 5px; overflow: hidden; margin-top: 6px; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s; }

  /* AI CHIP */
  .ai-chip {
    display: inline-flex; align-items: center; gap: 5px; background: var(--red-soft);
    border: 1px solid var(--border2); color: var(--red); padding: 4px 10px;
    border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  }
  .ai-dot { width: 5px; height: 5px; background: var(--red); border-radius: 50%; animation: pulse 2s infinite; }

  /* EMPTY STATE */
  .empty { text-align: center; padding: 60px 20px; color: var(--text3); }
  .empty-icon { font-size: 40px; margin-bottom: 12px; }
  .empty-text { font-size: 14px; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(224,40,52,0.22); border-radius: 3px; }

  /* ── CALENDAR ── */
  .cal-wrap { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }
  .cal-main { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .cal-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px 16px; border-bottom: 1px solid var(--border);
  }
  .cal-month-label {
    font-family: var(--brand-font); font-size: 18px; font-weight: 700;
    color: var(--text); letter-spacing: -0.5px;
  }
  .cal-nav-btn {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border);
    background: var(--surface); cursor: pointer; display: flex; align-items: center;
    justify-content: center; color: var(--text2); transition: all 0.15s;
  }
  .cal-nav-btn:hover { background: var(--red-pale); border-color: var(--red); color: var(--red); }
  .cal-weekdays {
    display: grid; grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid var(--border);
  }
  .cal-weekday {
    text-align: center; padding: 10px 0; font-size: 11px; font-weight: 700;
    color: var(--text3); text-transform: uppercase; letter-spacing: 0.8px;
  }
  .cal-weekday.weekend { color: var(--red); }
  .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
  .cal-cell {
    min-height: 86px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 8px 10px; cursor: pointer; transition: background 0.12s; position: relative;
  }
  .cal-cell:nth-child(7n) { border-right: none; }
  .cal-cell:hover { background: var(--red-soft); }
  .cal-cell.other-month { opacity: 0.35; }
  .cal-cell.today { background: var(--red-pale); }
  .cal-cell.selected { background: var(--red-soft); box-shadow: inset 0 0 0 2px var(--red); }
  .cal-day-num {
    font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 6px;
    width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
    border-radius: 50%; transition: all 0.12s;
  }
  .cal-cell.today .cal-day-num {
    background: var(--red); color: #FEFAEF; font-weight: 800;
  }
  .cal-cell.selected .cal-day-num { color: var(--red); }
  .cal-dot-row { display: flex; flex-wrap: wrap; gap: 3px; }
  .cal-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .cal-event-pill {
    font-size: 9.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px;
    margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    max-width: 100%; display: block; cursor: pointer;
  }
  .cal-event-pill:hover { opacity: 0.85; }

  /* ── CALENDAR SIDE PANEL ── */
  .cal-side { display: flex; flex-direction: column; gap: 14px; }
  .cal-day-panel {
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    overflow: hidden; flex: 1;
  }
  .cal-day-panel-header {
    padding: 16px 18px 14px; border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .cal-day-title {
    font-family: var(--brand-font); font-size: 15px; font-weight: 700; color: var(--text);
  }
  .cal-day-sub { font-size: 11.5px; color: var(--text2); margin-top: 3px; }
  .cal-day-events { padding: 12px; }
  .cal-event-item {
    padding: 10px 12px; border-radius: 9px; margin-bottom: 8px;
    border-left: 3px solid; cursor: pointer; transition: background 0.12s;
    background: var(--surface);
  }
  .cal-event-item:hover { background: var(--red-pale); }
  .cal-event-item:last-child { margin-bottom: 0; }
  .cal-event-from { font-size: 11px; color: var(--text3); margin-bottom: 3px; font-family: var(--mono); }
  .cal-event-subject { font-size: 12.5px; font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
  .cal-event-meta { display: flex; gap: 8px; align-items: center; }

  /* ── CALENDAR SUMMARY ── */
  .cal-summary-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px;
  }
  .cal-summary-title {
    font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase;
    letter-spacing: 0.8px; margin-bottom: 10px;
  }
  .cal-summary-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; border-bottom: 1px solid var(--border); font-size: 12.5px;
  }
  .cal-summary-row:last-child { border-bottom: none; }
  .cal-today-btn {
    padding: 7px 16px; border-radius: 8px; border: 1px solid var(--red);
    background: transparent; color: var(--red); font-family: var(--brand-font);
    font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.15s;
  }
  .cal-today-btn:hover { background: var(--red); color: #FEFAEF; }


  /* ── NOTIFICATION PANEL ── */
  .notif-overlay {
    position: fixed; inset: 0; z-index: 200;
  }
  .notif-panel {
    position: fixed; top: 56px; right: 16px; width: 380px;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; box-shadow: 0 12px 40px rgba(30,4,6,0.18);
    display: flex; flex-direction: column; overflow: hidden;
    animation: notifSlideIn 0.18s cubic-bezier(0.16,1,0.3,1);
    max-height: calc(100vh - 76px); z-index: 201;
  }
  @keyframes notifSlideIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .notif-header {
    padding: 16px 18px 12px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--surface); flex-shrink: 0;
  }
  .notif-header-left { display: flex; align-items: center; gap: 10px; }
  .notif-header-title {
    font-family: var(--brand-font); font-size: 14px; font-weight: 700; color: var(--text);
  }
  .notif-count-badge {
    background: var(--red); color: #FEFAEF; border-radius: 10px;
    font-size: 10px; font-weight: 800; padding: 1px 7px; font-family: var(--brand-font);
  }
  .notif-close-btn {
    width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--border);
    background: transparent; cursor: pointer; display: flex; align-items: center;
    justify-content: center; color: var(--text2); transition: all 0.12s;
  }
  .notif-close-btn:hover { background: var(--red-pale); color: var(--red); border-color: var(--red); }
  .notif-tabs {
    display: flex; border-bottom: 1px solid var(--border);
    background: var(--surface); flex-shrink: 0;
  }
  .notif-tab {
    flex: 1; padding: 9px 12px; text-align: center; font-size: 12px; font-weight: 600;
    cursor: pointer; color: var(--text3); border-bottom: 2px solid transparent;
    transition: all 0.15s; font-family: var(--font);
  }
  .notif-tab.active { color: var(--red); border-bottom-color: var(--red); background: var(--red-soft); }
  .notif-tab:hover:not(.active) { color: var(--text2); background: rgba(224,40,52,0.04); }
  .notif-list { overflow-y: auto; flex: 1; }
  .notif-item {
    padding: 13px 16px; border-bottom: 1px solid var(--border);
    cursor: pointer; transition: background 0.12s; display: flex; gap: 12px; align-items: flex-start;
    position: relative;
  }
  .notif-item:last-child { border-bottom: none; }
  .notif-item:hover { background: var(--red-soft); }
  .notif-item.unread { background: rgba(224,40,52,0.04); }
  .notif-item.unread:hover { background: var(--red-soft); }
  .notif-unread-indicator {
    position: absolute; left: 6px; top: 50%; transform: translateY(-50%);
    width: 5px; height: 5px; border-radius: 50%; background: var(--red);
  }
  .notif-icon-wrap {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .notif-body { flex: 1; min-width: 0; }
  .notif-item-title {
    font-size: 12.5px; font-weight: 600; color: var(--text); margin-bottom: 3px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .notif-item-sub {
    font-size: 11.5px; color: var(--text2); line-height: 1.4; margin-bottom: 5px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .notif-item-meta {
    display: flex; gap: 8px; align-items: center;
  }
  .notif-time {
    font-size: 10.5px; color: var(--text3); font-family: var(--mono);
  }
  .notif-footer {
    padding: 10px 16px; border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: var(--surface); flex-shrink: 0;
  }
  .notif-footer-btn {
    font-size: 12px; font-weight: 600; color: var(--red); cursor: pointer;
    background: none; border: none; font-family: var(--font); padding: 0;
  }
  .notif-footer-btn:hover { text-decoration: underline; }
  .notif-empty {
    padding: 44px 20px; text-align: center;
  }
  .notif-empty-icon { font-size: 32px; margin-bottom: 10px; }
  .notif-empty-text { font-size: 13px; color: var(--text3); }
  .notif-separator {
    padding: 6px 16px; font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.8px; color: var(--text3); background: var(--surface);
    border-bottom: 1px solid var(--border);
  }


  /* ── CATEGORY LANDING ── */
  .cat-landing-header {
    background: var(--card); border: 1px solid var(--border); border-radius: 14px;
    padding: 22px 24px; margin-bottom: 20px; display: flex; align-items: flex-start;
    justify-content: space-between; gap: 20px;
  }
  .cat-back-btn {
    display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px;
    font-weight: 600; color: var(--text2); cursor: pointer; background: none;
    border: 1px solid var(--border); border-radius: 8px; padding: 6px 12px;
    transition: all 0.15s; font-family: var(--font); white-space: nowrap;
  }
  .cat-back-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }
  .cat-code-big {
    font-size: 11px; font-weight: 800; font-family: var(--mono);
    padding: 3px 9px; border-radius: 6px; margin-bottom: 10px; display: inline-block;
  }
  .cat-title-big {
    font-family: var(--brand-font); font-size: 20px; font-weight: 700;
    color: var(--text); letter-spacing: -0.5px; margin-bottom: 6px;
  }
  .cat-meta-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .cat-stat-pill {
    display: inline-flex; align-items: center; gap: 6px; font-size: 12px;
    font-weight: 600; padding: 5px 11px; border-radius: 8px; border: 1px solid;
  }
  .cat-section-header {
    display: flex; align-items: center; gap: 10px; padding: 13px 18px;
    border-bottom: 1px solid var(--border); position: sticky; top: 0;
    background: var(--surface); z-index: 1;
  }
  .cat-section-label {
    font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px;
  }
  .cat-section-count {
    font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 10px;
    font-family: var(--mono);
  }
  .cat-section-line { flex: 1; height: 1px; background: var(--border); }
  .cat-doc-row {
    display: flex; align-items: flex-start; gap: 14px; padding: 14px 18px;
    border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.12s;
  }
  .cat-doc-row:last-child { border-bottom: none; }
  .cat-doc-row:hover { background: var(--red-soft); }
  .cat-doc-status {
    width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; margin-top: 2px;
  }
  .cat-doc-body { flex: 1; min-width: 0; }
  .cat-doc-subject {
    font-size: 13.5px; font-weight: 600; color: var(--text); margin-bottom: 4px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .cat-doc-from { font-size: 12px; color: var(--text2); margin-bottom: 7px; }
  .cat-doc-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .cat-doc-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0; }
  .cat-amount { font-size: 14px; font-weight: 700; font-family: var(--mono); }
  .cat-manage-btn {
    padding: 5px 12px; border-radius: 7px; font-size: 11.5px; font-weight: 700;
    cursor: pointer; border: 1px solid; transition: all 0.15s; font-family: var(--font);
    white-space: nowrap;
  }
  .cat-manage-btn.mark { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .cat-manage-btn.mark:hover { background: var(--red-dark); }
  .cat-manage-btn.unmark { background: transparent; color: var(--text2); border-color: var(--border); }
  .cat-manage-btn.unmark:hover { border-color: var(--red-mid); color: var(--red-mid); background: var(--red-pale); }
  .cat-empty-section {
    padding: 28px; text-align: center; color: var(--text3); font-size: 13px;
  }
  .cat-progress-summary {
    background: var(--red-pale); border-radius: 10px; padding: 10px 16px;
    display: flex; align-items: center; gap: 14px; margin-top: 12px;
  }
  .cat-progress-bar-wrap { flex: 1; }
  .cat-progress-label { font-size: 11px; color: var(--text2); margin-bottom: 5px; font-weight: 500; }


  /* ── URGENT MANAGER ── */
  .urgent-hero {
    background: var(--red); border-radius: 14px; padding: 22px 26px;
    display: flex; align-items: center; justify-content: space-between; gap: 20px;
    margin-bottom: 20px; box-shadow: 0 6px 24px rgba(224,40,52,0.28);
  }
  .urgent-hero-left {}
  .urgent-hero-label {
    font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
    color: rgba(254,250,239,0.7); margin-bottom: 6px; font-family: var(--mono);
  }
  .urgent-hero-title {
    font-family: var(--brand-font); font-size: 22px; font-weight: 800;
    color: #FEFAEF; letter-spacing: -0.5px; margin-bottom: 4px;
  }
  .urgent-hero-sub { font-size: 12.5px; color: rgba(254,250,239,0.75); }
  .urgent-hero-stats { display: flex; gap: 18px; flex-shrink: 0; }
  .urgent-hero-stat {
    text-align: center; background: rgba(254,250,239,0.13);
    border-radius: 10px; padding: 10px 16px;
  }
  .urgent-hero-stat-value {
    font-family: var(--brand-font); font-size: 24px; font-weight: 800; color: #FEFAEF;
  }
  .urgent-hero-stat-label {
    font-size: 10.5px; color: rgba(254,250,239,0.7); margin-top: 2px;
  }
  .urgent-filter-bar {
    display: flex; gap: 8px; align-items: center; margin-bottom: 16px; flex-wrap: wrap;
  }
  .urgent-filter-btn {
    padding: 7px 14px; border-radius: 8px; border: 1px solid var(--border);
    background: var(--card); color: var(--text2); font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.14s; font-family: var(--font);
  }
  .urgent-filter-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }
  .urgent-filter-btn.active { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .urgent-card {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    margin-bottom: 10px; overflow: hidden; transition: box-shadow 0.15s;
  }
  .urgent-card:hover { box-shadow: 0 4px 18px rgba(224,40,52,0.10); }
  .urgent-card-inner {
    display: flex; align-items: flex-start; gap: 16px; padding: 16px 18px;
  }
  .urgent-priority-bar {
    width: 4px; border-radius: 2px; flex-shrink: 0; align-self: stretch; min-height: 60px;
  }
  .urgent-card-body { flex: 1; min-width: 0; }
  .urgent-card-from {
    font-size: 11px; color: var(--text3); font-family: var(--mono); margin-bottom: 4px;
    display: flex; gap: 8px; align-items: center;
  }
  .urgent-card-subject {
    font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 8px;
    line-height: 1.3;
  }
  .urgent-card-meta { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .urgent-card-right {
    display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0;
  }
  .urgent-amount {
    font-size: 18px; font-weight: 800; font-family: var(--mono); color: var(--red);
  }
  .urgent-days-badge {
    padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 800;
    font-family: var(--mono); text-align: center;
  }
  .urgent-actions { display: flex; gap: 8px; align-items: center; }
  .urgent-action-btn {
    padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 700;
    cursor: pointer; border: 1px solid; transition: all 0.14s; font-family: var(--font);
  }
  .urgent-action-btn.primary { background: var(--red); color: #FEFAEF; border-color: var(--red); }
  .urgent-action-btn.primary:hover { background: var(--red-dark); }
  .urgent-action-btn.secondary { background: transparent; color: var(--text2); border-color: var(--border); }
  .urgent-action-btn.secondary:hover { border-color: var(--red-mid); color: var(--red-mid); background: var(--red-pale); }
  .urgent-managed-banner {
    background: var(--red-soft); border-top: 1px solid var(--border);
    padding: 8px 18px; display: flex; align-items: center; gap: 8px;
    font-size: 11.5px; color: var(--red); font-weight: 600;
  }
  .urgent-back-btn {
    display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px;
    font-weight: 600; color: var(--text2); cursor: pointer; background: none;
    border: 1px solid var(--border); border-radius: 8px; padding: 7px 13px;
    transition: all 0.15s; font-family: var(--font);
  }
  .urgent-back-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-soft); }
  .urgent-completed-strip {
    background: var(--card); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px 24px; text-align: center; margin-top: 20px;
  }

  /* FILTER BAR */
  .filter-bar { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
  .filter-btn {
    padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;
    cursor: pointer; border: 1px solid var(--border2); background: transparent;
    color: var(--text2); transition: all 0.12s; font-family: var(--font);
  }
  .filter-btn.active { background: var(--red); border-color: var(--red); color: white; }
  .filter-btn:hover:not(.active) { border-color: var(--red); color: var(--red); background: var(--red-soft); }

  /* TOOLTIP / INFO */
  .info-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; }
  .info-box-title { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
  .info-box-text { font-size: 12px; color: var(--text2); line-height: 1.6; }

  /* ANIMATION */
  .fade-in { animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
`;

/* ─────────────────────────────────────────────
   ICON COMPONENTS
───────────────────────────────────────────── */
const Icon = ({ name, size = 14, color = "currentColor" }) => {
  const icons = {
    dashboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    inbox: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M22 12h-6l-2 3H10l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
    archive: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    link: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="9 18 15 12 9 6"/></svg>,
    ai: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M12 2a5 5 0 015 5v1h1a3 3 0 013 3v4a3 3 0 01-3 3H6a3 3 0 01-3-3v-4a3 3 0 013-3h1V7a5 5 0 015-5z"/><circle cx="9" cy="13" r="1" fill={color}/><circle cx="15" cy="13" r="1" fill={color}/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    warning: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    doc: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    refresh: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  };
  return icons[name] || null;
};

/* ─────────────────────────────────────────────
   SUBCOMPONENTS
───────────────────────────────────────────── */
const DeadlineBadge = ({ deadline }) => {
  if (!deadline) return <span style={{ color: "var(--text3)", fontSize: 12 }}>—</span>;
  const d = daysUntil(deadline);
  if (d < 0) return <span className="deadline-badge red">Scaduto</span>;
  if (d <= 7) return <span className="deadline-badge red">{d}gg</span>;
  if (d <= 21) return <span className="deadline-badge amber">{d}gg</span>;
  return <span className="deadline-badge ok">{d}gg</span>;
};

const ChannelTag = ({ channel }) => {
  const s = channelBadge[channel] || { color: "#999", bg: "rgba(153,153,153,0.15)" };
  return <span className="channel-tag" style={{ color: s.color, background: s.bg }}>{channel}</span>;
};

/* ─────────────────────────────────────────────
   DRAWER (doc detail)
───────────────────────────────────────────── */
const DocDrawer = ({ doc, onClose }) => {
  if (!doc) return null;
  const cat = getCategoryInfo(doc.category);
  const d = daysUntil(doc.deadline);
  const isUrgent = d !== null && d <= 7;

  return (
    <div className="drawer-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="drawer">
        <div className="drawer-header">
          <span className="drawer-close" onClick={onClose}><Icon name="close" size={18} /></span>
          <div className="ai-chip" style={{ marginBottom: 12 }}>
            <span className="ai-dot" /> Classificato da A-ESP AI
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{doc.subject}</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <ChannelTag channel={doc.channel} />
            <span style={{ fontSize: 12, color: "var(--text2)" }}>{doc.from}</span>
          </div>
        </div>
        <div className="drawer-body">
          {isUrgent && (
            <div className="big-badge">
              <Icon name="warning" size={14} color="var(--red)" />
              URGENTE — {d === 0 ? "scade oggi" : `${d} giorni alla scadenza`}
            </div>
          )}

          <div className="drawer-section">
            <div className="drawer-section-title">Dettagli Documento</div>
            <div className="info-row"><span className="info-key">Mittente</span><span className="info-val">{doc.from}</span></div>
            <div className="info-row"><span className="info-key">Canale</span><span className="info-val"><ChannelTag channel={doc.channel} /></span></div>
            <div className="info-row"><span className="info-key">Data ricezione</span><span className="info-val" style={{ fontFamily: "var(--mono)" }}>{doc.date}</span></div>
            {doc.deadline && <div className="info-row"><span className="info-key">Scadenza</span><span className="info-val"><DeadlineBadge deadline={doc.deadline} /></span></div>}
            {doc.amount && <div className="info-row"><span className="info-key">Importo</span><span className="info-val" style={{ color: "var(--red)", fontFamily: "var(--mono)", fontSize: 15 }}>{doc.amount}</span></div>}
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">Classificazione AI</div>
            <div className="risk-card" style={{ borderLeft: `3px solid ${cat.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                
                <span className="risk-pill" style={{ color: cat.color, background: `${cat.color}22` }}>{cat.risk.toUpperCase()}</span>
              </div>
              <div className="risk-title">{cat.label}</div>
              <div className="risk-desc" style={{ marginTop: 6 }}>
                {cat.risk === "alto" && "Questo documento richiede attenzione immediata. Il mancato intervento entro la scadenza può comportare sanzioni, interessi di mora o ulteriori provvedimenti esecutivi."}
                {cat.risk === "medio-alto" && "Comunicazione ufficiale con potenziali conseguenze legali o amministrative se ignorata."}
                {cat.risk === "medio" && "Documento rilevante che richiede un'azione pianificata entro i termini indicati."}
                {(cat.risk === "basso" || cat.risk === "basso-medio") && "Documento informativo o di bassa priorità. Nessuna azione immediata necessaria."}
              </div>
            </div>
          </div>

          <div className="drawer-section">
            <div className="drawer-section-title">Contenuto Estratto (Preview)</div>
            <div className="info-box">
              <div className="info-box-text" style={{ fontFamily: "var(--mono)", fontSize: 11, lineHeight: 1.7 }}>
                Gentile cliente,<br />
                con la presente La informiamo che ai sensi dell'art. 36-bis del D.P.R. 29/9/1973 n. 600...
                <br /><br />
                <span style={{ color: "var(--text3)" }}>[Contenuto completo disponibile nell'originale — A-ESP non modifica i documenti]</span>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-footer">
          <button className="primary-btn">
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="check" size={14} color="white" /> Segna come gestito
            </span>
          </button>
          <button className="secondary-btn">
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="archive" size={14} /> Archivia documento
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   URGENT MANAGER
───────────────────────────────────────────── */
const UrgentManager = ({ onBack, onDocClick }) => {
  const [docs, setDocs] = useState(
    MOCK_DOCS.filter(d => d.urgent).map(d => ({ ...d }))
  );
  const [filter, setFilter] = useState("all");

  const toggleManaged = (id) =>
    setDocs(prev => prev.map(d => d.id === id ? { ...d, managed: !d.managed } : d));

  const managedDocs = docs.filter(d =>  d.managed);
  const pendingDocs = docs.filter(d => !d.managed);

  const basePool = pendingDocs;
  const filtered = basePool.filter(d => {
    if (filter === "pec") return d.channel === "PEC";
    if (filter === "rem") return d.channel === "REM";
    if (filter === "7gg") return daysUntil(d.deadline) !== null && daysUntil(d.deadline) <= 7;
    return true;
  });

  const totalRisk = docs.reduce((sum, d) => {
    if (!d.amount) return sum;
    const n = parseFloat(d.amount.replace(/[^\d,]/g, "").replace(",", "."));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  const urgentCount = pendingDocs.length;
  const days = pendingDocs.map(d => daysUntil(d.deadline)).filter(v => v !== null && v >= 0);
  const daysMin = days.length ? Math.min(...days) : null;

  const priorityColor = (doc) => {
    const d = daysUntil(doc.deadline);
    if (d !== null && d <= 3) return "var(--red)";
    if (d !== null && d <= 7) return "var(--red-mid)";
    return "var(--teal)";
  };

  const UrgentCard = ({ doc }) => {
    const d     = daysUntil(doc.deadline);
    const color = priorityColor(doc);
    const cat   = getCategoryInfo(doc.category);
    return (
      <div className="urgent-card">
        <div className="urgent-card-inner">
          <div className="urgent-priority-bar" style={{ background: color }} />

          <div className="urgent-card-body">
            <div className="urgent-card-from">
              <ChannelTag channel={doc.channel} />
              {doc.from}
              {doc.managed && (
                <span style={{ background:"var(--red-pale)", color:"var(--red-mid)", fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:4 }}>
                  gestita
                </span>
              )}
            </div>
            <div
              className="urgent-card-subject"
              style={{ cursor:"pointer", textDecoration: doc.managed ? "line-through" : "none",
                color: doc.managed ? "var(--text3)" : "var(--text)" }}
              onClick={() => onDocClick(doc)}
            >
              {doc.subject}
            </div>
            <div className="urgent-card-meta">
              <span style={{ fontSize:11, fontWeight:600, color:cat.color, background:`${cat.color}18`, padding:"2px 7px", borderRadius:5 }}>
                {cat.label}
              </span>
              <span className="date-text">Ricevuto {doc.date}</span>
              {doc.deadline && <DeadlineBadge deadline={doc.deadline} />}
            </div>
          </div>

          <div className="urgent-card-right">
            {doc.amount && (
              <span className="urgent-amount" style={{ color: doc.managed ? "var(--text3)" : color }}>
                {doc.amount}
              </span>
            )}
            {d !== null && (
              <div className="urgent-days-badge" style={{
                background: doc.managed ? "var(--surface)" : `${color}18`,
                color: doc.managed ? "var(--text3)" : color,
                border: `1px solid ${doc.managed ? "var(--border)" : color + "40"}`,
              }}>
                {d < 0 ? `Scaduto ${Math.abs(d)}gg fa` : d === 0 ? "Scade oggi" : `${d} giorni`}
              </div>
            )}
            <div className="urgent-actions">
              <button className="urgent-action-btn secondary" onClick={() => onDocClick(doc)}>Apri</button>
              <button
                className={`urgent-action-btn ${doc.managed ? "secondary" : "primary"}`}
                onClick={() => toggleManaged(doc.id)}
              >
                {doc.managed ? "Riapri" : "Segna gestita"}
              </button>
            </div>
          </div>
        </div>
        {doc.managed && (
          <div className="urgent-managed-banner">
            <Icon name="check" size={12} color="var(--red)" />
            Pratica marcata come gestita — nessuna ulteriore azione richiesta
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fade-in">
      {/* HERO */}
      <div className="urgent-hero">
        <div className="urgent-hero-left">
          <div className="urgent-hero-label">Modalità gestione urgenti — A-ESP AI</div>
          <div className="urgent-hero-title">
            {urgentCount === 0 ? "Tutto sotto controllo" : `${urgentCount} ${urgentCount === 1 ? "pratica" : "pratiche"} da gestire`}
          </div>
          <div className="urgent-hero-sub">
            {urgentCount === 0
              ? "Hai gestito tutti i documenti urgenti. Ottimo lavoro."
              : `La più critica scade tra ${daysMin !== null ? daysMin : "—"} giorni — gestisci in ordine di priorità`}
          </div>
        </div>
        <div className="urgent-hero-stats">
          <div className="urgent-hero-stat">
            <div className="urgent-hero-stat-value">{urgentCount}</div>
            <div className="urgent-hero-stat-label">Da gestire</div>
          </div>
          <div className="urgent-hero-stat">
            <div className="urgent-hero-stat-value">{managedDocs.length}</div>
            <div className="urgent-hero-stat-label">Gestite</div>
          </div>
          <div className="urgent-hero-stat">
            <div className="urgent-hero-stat-value">{"€" + Math.round(totalRisk).toLocaleString("it-IT")}</div>
            <div className="urgent-hero-stat-label">Rischio totale</div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, gap:12, flexWrap:"wrap" }}>
        <div className="urgent-filter-bar" style={{ marginBottom:0 }}>
          {[
            { key:"all", label:"Tutti" },
            { key:"7gg", label:"Entro 7 giorni" },
            { key:"pec", label:"PEC" },
            { key:"rem", label:"REM" },
          ].map(f => (
            <button key={f.key} className={`urgent-filter-btn${filter === f.key ? " active" : ""}`} onClick={() => setFilter(f.key)}>
              {f.label}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="urgent-back-btn" onClick={onBack}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Torna alla Dashboard
          </button>
        </div>
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div className="urgent-completed-strip">
          <div style={{ fontSize:32, marginBottom:10 }}>{filter !== "all" ? "🔍" : "🎉"}</div>
          <div style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:6 }}>
            {filter !== "all" ? "Nessun documento per questo filtro" : "Tutti i documenti urgenti sono stati gestiti"}
          </div>
          <div style={{ fontSize:12.5, color:"var(--text2)" }}>
            {filter !== "all" ? "Prova a cambiare il filtro" : "A-ESP continua a monitorare i tuoi canali in tempo reale"}
          </div>
        </div>
      ) : (
        filtered.map(doc => <UrgentCard key={doc.id} doc={doc} />)
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   PAGES
───────────────────────────────────────────── */
const Dashboard = ({ onDocClick, onNavigate }) => {
  const urgent = MOCK_DOCS.filter(d => d.urgent && !d.managed);
  const totalRisk = MOCK_DOCS.filter(d => ["C01","C02","C03"].includes(d.category));
  const unread = MOCK_DOCS.filter(d => !d.read);
  const [showUrgent, setShowUrgent] = useState(false);

  if (showUrgent) {
    return <UrgentManager onBack={() => setShowUrgent(false)} onDocClick={onDocClick} />;
  }

  return (
    <div className="fade-in">
      {/* URGENT ALERT */}
      {urgent.length > 0 && (
        <div className="alert-strip" style={{ cursor:"default" }}>
          <div className="alert-dot" />
          <span className="alert-text">
            <strong>{urgent.length} documenti urgenti</strong> richiedono la tua attenzione — il più critico scade tra {Math.min(...urgent.map(d => daysUntil(d.deadline)).filter(Boolean))} giorni
          </span>
          <span className="alert-cta" style={{ cursor:"pointer" }} onClick={() => setShowUrgent(true)}>Gestisci ora →</span>
        </div>
      )}

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card red">
          <div className="stat-label">Non letti</div>
          <div className="stat-value" style={{ color: "var(--red)" }}>{unread.length}</div>
          <div className="stat-sub"><span>{urgent.length} urgenti</span> da gestire</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-label">In scadenza (30gg)</div>
          <div className="stat-value" style={{ color: "var(--amber)" }}>
            {MOCK_DOCS.filter(d => daysUntil(d.deadline) !== null && daysUntil(d.deadline) <= 30 && daysUntil(d.deadline) >= 0).length}
          </div>
          <div className="stat-sub">Prossimo: <span>3 giorni</span></div>
        </div>
        <div className="stat-card teal">
          <div className="stat-label">Archiviati</div>
          <div className="stat-value" style={{ color: "var(--teal)" }}>247</div>
          <div className="stat-sub">+<span>12</span> questa settimana</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Rischio economico</div>
          <div className="stat-value" style={{ color: "var(--blue)" }}>€ 4.827</div>
          <div className="stat-sub"><span>{totalRisk.length} doc.</span> ad alto rischio</div>
        </div>
      </div>

      {/* MAIN TWO COL */}
      <div className="two-col">
        {/* RECENT DOCS */}
        <div>
          <div className="section-hdr">
            <div>
              <div className="section-title">Documenti Recenti</div>
              <div className="section-sub">Ultimi 7 giorni — ordinati per priorità</div>
            </div>
            <div className="ai-chip"><span className="ai-dot" />AI attiva</div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 16 }}>Canale</th>
                  <th>Documento</th>
                  <th>Categoria</th>
                  <th>Scadenza</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DOCS.slice(0, 7).map(doc => {
                  const cat = getCategoryInfo(doc.category);
                  return (
                    <tr key={doc.id} className={`doc-row ${!doc.read ? "unread" : ""}`} onClick={() => onDocClick(doc)}>
                      <td style={{ paddingLeft: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {!doc.read && <div className="urgency-dot" style={{ background: doc.urgent ? "var(--red)" : "var(--red-mid)" }} />}
                          <ChannelTag channel={doc.channel} />
                        </div>
                      </td>
                      <td>
                        <div className="subject-text" style={{ fontWeight: !doc.read ? 600 : 400 }}>{doc.subject}</div>
                        <div className="doc-from">{doc.from}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: 11, fontWeight: 600, color: cat.color, background: `${cat.color}18`, padding: "2px 7px", borderRadius: 5 }}>{cat.label}</span>
                      </td>
                      <td><DeadlineBadge deadline={doc.deadline} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDEBAR WIDGETS */}
        <div>
          {/* URGENT ALERTS */}
          <div className="widget">
            <div className="widget-title">⚠ Azioni Urgenti</div>
            {MOCK_DOCS.filter(d => d.urgent).slice(0, 3).map(doc => {
              const d = daysUntil(doc.deadline);
              const color = d !== null && d <= 7 ? "var(--red)" : "var(--red-mid)";
              return (
                <div key={doc.id} className="alert-item" style={{ borderLeftColor: color, background: `${color}09` }} onClick={() => onDocClick(doc)}>
                  <div className="alert-item-title">{doc.from}</div>
                  <div className="alert-item-sub">{doc.amount ? `${doc.amount} — ` : ""}{d !== null ? `${d}gg alla scadenza` : "Nessuna scadenza"}</div>
                </div>
              );
            })}
          </div>

          {/* CANALI */}
          <div className="widget">
            <div className="widget-title">Canali Attivi</div>
            {CONNECTIONS.filter(c => c.connected).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: c.color }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>{c.email}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--red-mid)" }} />
                  <span style={{ fontSize: 10.5, color: "var(--text3)" }}>{c.lastSync}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text2)", textAlign: "center" }}>
              <span style={{ color: "var(--red)", cursor: "pointer", fontWeight: 600 }} onClick={() => onNavigate("connections")}>+ Aggiungi canale</span>
            </div>
          </div>

          {/* RISCHIO ECONOMICO */}
          <div className="widget">
            <div className="widget-title">Rischio Economico Stimato</div>
            {[["Alto rischio", "€ 3.340", 0.69, "var(--red)"], ["Medio rischio", "€ 1.100", 0.22, "var(--red-mid)"], ["Basso rischio", "€ 387", 0.08, "var(--teal)"]].map(([label, val, pct, color]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--mono)", color }}>{val}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── INBOX ─── */
const Inbox = ({ onDocClick }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filters = [
    { key: "all", label: "Tutti" },
    { key: "unread", label: "Non letti" },
    { key: "urgent", label: "Urgenti" },
    { key: "PEC", label: "PEC" },
    { key: "EMAIL", label: "Email" },
    { key: "REM", label: "REM" },
  ];

  const filtered = MOCK_DOCS.filter(d => {
    if (filter === "unread") return !d.read;
    if (filter === "urgent") return d.urgent;
    if (filter === "PEC" || filter === "EMAIL" || filter === "REM") return d.channel === filter;
    return true;
  }).filter(d =>
    d.subject.toLowerCase().includes(search.toLowerCase()) ||
    d.from.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="section-hdr">
        <div>
          <div className="section-title">Inbox Intelligente</div>
          <div className="section-sub">{filtered.length} documenti • AI classifica in tempo reale</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="search-box" style={{ width: 200 }}>
            <Icon name="search" size={13} color="var(--text3)" />
            <input placeholder="Cerca..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="icon-btn"><Icon name="refresh" size={14} /></div>
        </div>
      </div>

      <div className="filter-bar">
        {filters.map(f => (
          <button key={f.key} className={`filter-btn ${filter === f.key ? "active" : ""}`} onClick={() => setFilter(f.key)}>
            {f.label}
            {f.key === "unread" && ` (${MOCK_DOCS.filter(d => !d.read).length})`}
            {f.key === "urgent" && ` (${MOCK_DOCS.filter(d => d.urgent).length})`}
          </button>
        ))}
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div className="empty"><div className="empty-icon">📭</div><div className="empty-text">Nessun documento trovato</div></div>
        ) : (
          <table className="doc-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 16, width: 40 }}></th>
                <th style={{ width: 80 }}>Canale</th>
                <th>Documento</th>
                <th>Cat.</th>
                <th>Importo</th>
                <th>Data</th>
                <th>Scadenza</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => {
                const cat = getCategoryInfo(doc.category);
                return (
                  <tr key={doc.id} className={`doc-row ${!doc.read ? "unread" : ""}`} onClick={() => onDocClick(doc)}>
                    <td style={{ paddingLeft: 16 }}>
                      {!doc.read && <div className="urgency-dot" style={{ background: doc.urgent ? "var(--red)" : "var(--red-mid)" }} />}
                    </td>
                    <td><ChannelTag channel={doc.channel} /></td>
                    <td>
                      <div className="subject-text" style={{ fontWeight: !doc.read ? 600 : 400 }}>{doc.subject}</div>
                      <div className="doc-from">{doc.from}</div>
                    </td>
                    <td>
                      <span title={cat.label} style={{ fontSize: 11, fontWeight: 600, color: cat.color, background: `${cat.color}18`, padding: "2px 6px", borderRadius: 4, cursor: "help" }}>{cat.label}</span>
                    </td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: doc.amount ? 600 : 400, color: doc.amount ? "var(--text)" : "var(--text3)" }}>
                      {doc.amount || "—"}
                    </td>
                    <td><span className="date-text">{doc.date}</span></td>
                    <td><DeadlineBadge deadline={doc.deadline} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CATEGORY LANDING
───────────────────────────────────────────── */
const CategoryLanding = ({ cat, onBack, onDocClick }) => {
  const [docs, setDocs] = useState(
    MOCK_DOCS.filter(d => d.category === cat.code).map(d => ({ ...d }))
  );
  const [activeTab, setActiveTab] = useState("unmanaged");

  const managed   = docs.filter(d =>  d.managed);
  const unmanaged = docs.filter(d => !d.managed);

  const toggleManaged = (id) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, managed: !d.managed } : d));
  };

  const pct = docs.length > 0 ? Math.round((managed.length / docs.length) * 100) : 0;
  const visibleDocs = activeTab === "unmanaged" ? unmanaged : managed;

  const DocRow = ({ doc }) => (
    <div className="cat-doc-row">
      <div
        className="cat-doc-status"
        style={{
          background: doc.managed ? `${cat.color}18` : "var(--red-pale)",
          border: `1px solid ${doc.managed ? cat.color+"40" : "var(--border)"}`,
        }}
      >
        {doc.managed
          ? <Icon name="check"   size={13} color={cat.color} />
          : <Icon name="warning" size={13} color="var(--red-mid)" />
        }
      </div>

      <div className="cat-doc-body" onClick={() => onDocClick(doc)} style={{ cursor:"pointer" }}>
        <div className="cat-doc-subject">{doc.subject}</div>
        <div className="cat-doc-from">{doc.from}</div>
        <div className="cat-doc-meta">
          <ChannelTag channel={doc.channel} />
          <span className="date-text">{doc.date}</span>
          {doc.deadline && <DeadlineBadge deadline={doc.deadline} />}
        </div>
      </div>

      <div className="cat-doc-right">
        {doc.amount && (
          <span className="cat-amount" style={{ color: doc.managed ? "var(--text2)" : cat.color }}>
            {doc.amount}
          </span>
        )}
        <button
          className={`cat-manage-btn ${doc.managed ? "unmark" : "mark"}`}
          onClick={(e) => { e.stopPropagation(); toggleManaged(doc.id); }}
        >
          {doc.managed ? "Riapri pratica" : "Segna come gestita"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      {/* HEADER */}
      <div className="cat-landing-header">
        <div style={{ flex:1, minWidth:0 }}>
          <div className="cat-title-big">{cat.label}</div>

          <div className="cat-meta-row">
            <span className="cat-stat-pill" style={{ color:cat.color, background:`${cat.color}12`, borderColor:`${cat.color}40` }}>
              <Icon name="doc" size={12} color={cat.color} />
              {docs.length} {docs.length === 1 ? "pratica" : "pratiche"}
            </span>
            <span className="cat-stat-pill" style={{ color:"var(--red)", background:"var(--red-soft)", borderColor:"var(--border)" }}>
              <Icon name="warning" size={12} color="var(--red)" />
              {unmanaged.length} da gestire
            </span>
            <span className="cat-stat-pill" style={{ color:"var(--text2)", background:"var(--surface)", borderColor:"var(--border)" }}>
              <Icon name="check" size={12} color="var(--text2)" />
              {managed.length} gestite
            </span>
            <span className="risk-pill" style={{ color:cat.color, background:`${cat.color}20` }}>
              rischio {cat.risk}
            </span>
          </div>

          {docs.length > 0 && (
            <div className="cat-progress-summary">
              <div className="cat-progress-bar-wrap">
                <div className="cat-progress-label">Avanzamento gestione pratiche — {pct}%</div>
                <div className="progress-bar" style={{ height:7, borderRadius:4 }}>
                  <div className="progress-fill" style={{ width:`${pct}%`, background:cat.color, borderRadius:4 }} />
                </div>
              </div>
              <div style={{ fontFamily:"var(--mono)", fontSize:16, fontWeight:800, color:cat.color, flexShrink:0 }}>
                {managed.length}/{docs.length}
              </div>
            </div>
          )}
        </div>

        <button className="cat-back-btn" onClick={onBack}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Torna all'archivio
        </button>
      </div>

      {/* TAB BUTTONS */}
      <div style={{ display:"flex", gap:10, marginBottom:16 }}>
        {[
          { key:"unmanaged", label:"Pratiche non gestite", count:unmanaged.length, icon:"warning", activeColor:"var(--red)", activeBorder:"var(--red)" },
          { key:"managed",   label:"Pratiche gestite",     count:managed.length,   icon:"check",   activeColor:cat.color,    activeBorder:cat.color    },
        ].map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex:1, padding:"13px 18px", borderRadius:10, cursor:"pointer",
                fontFamily:"var(--font)", fontSize:13.5, fontWeight:700,
                border: isActive ? `2px solid ${tab.activeBorder}` : "1px solid var(--border)",
                background: isActive ? tab.activeColor : "var(--card)",
                color: isActive ? "#FEFAEF" : "var(--text2)",
                transition:"all 0.15s",
                display:"flex", alignItems:"center", justifyContent:"center", gap:9,
                boxShadow: isActive ? `0 4px 14px ${tab.activeColor}30` : "none",
              }}
            >
              <Icon name={tab.icon} size={14} color={isActive ? "#FEFAEF" : tab.activeColor} />
              {tab.label}
              <span style={{
                background: isActive ? "rgba(255,255,255,0.22)" : tab.key === "unmanaged" ? "var(--red-pale)" : `${cat.color}18`,
                color: isActive ? "#FEFAEF" : tab.activeColor,
                borderRadius:10, fontSize:11, fontWeight:800,
                padding:"1px 8px", fontFamily:"var(--mono)",
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* DOCUMENT LIST */}
      <div className="fade-in" style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
        {visibleDocs.length === 0 ? (
          <div className="cat-empty-section" style={{ padding:"52px 20px" }}>
            {activeTab === "unmanaged"
              ? "✓ Tutte le pratiche di questa categoria sono state gestite"
              : "Nessuna pratica gestita in questa categoria"}
          </div>
        ) : (
          visibleDocs.map(doc => <DocRow key={doc.id} doc={doc} />)
        )}
      </div>
    </div>
  );
};

/* ─── ARCHIVE ─── */
const Archive = ({ onDocClick }) => {
  const [selectedCat, setSelectedCat] = useState(null);

  const catCounts    = {};
  const catManaged   = {};
  const catUnmanaged = {};
  MOCK_DOCS.forEach(d => {
    catCounts[d.category]    = (catCounts[d.category] || 0) + 1;
    if (d.managed) catManaged[d.category]   = (catManaged[d.category] || 0) + 1;
    else           catUnmanaged[d.category] = (catUnmanaged[d.category] || 0) + 1;
  });

  if (selectedCat) {
    return (
      <CategoryLanding
        cat={selectedCat}
        onBack={() => setSelectedCat(null)}
        onDocClick={onDocClick}
      />
    );
  }

  return (
    <div className="fade-in">
      <div className="section-hdr">
        <div>
          <div className="section-title">Archivio Documenti</div>
          <div className="section-sub">14 categorie • {MOCK_DOCS.length} documenti totali — clicca una categoria per i dettagli</div>
        </div>
        <div className="ai-chip"><span className="ai-dot" />Classificazione automatica attiva</div>
      </div>

      <div className="archive-grid">
        {CATEGORIES.map(cat => {
          const count   = catCounts[cat.code]    || 0;
          const done    = catManaged[cat.code]   || 0;
          const pending = catUnmanaged[cat.code] || 0;
          const pct     = count > 0 ? Math.round((done / count) * 100) : 0;
          return (
            <div key={cat.code} className="archive-card" onClick={() => count > 0 && setSelectedCat(cat)}
              style={{ cursor: count > 0 ? "pointer" : "default", opacity: count === 0 ? 0.5 : 1 }}
            >
              <div className="archive-card-top">
                <span className="risk-pill" style={{ color: cat.color, background: `${cat.color}20` }}>{cat.risk}</span>
              </div>
              <div className="archive-card-count" style={{ color: count > 0 ? cat.color : "var(--text3)" }}>{count}</div>
              <div className="archive-card-label">{cat.label}</div>
              {count > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    {pending > 0
                      ? <span style={{ fontSize:10.5, color:"var(--red)", fontWeight:700 }}>⚠ {pending} da gestire</span>
                      : <span style={{ fontSize:10.5, color:cat.color, fontWeight:700 }}>✓ Tutte gestite</span>
                    }
                    <span style={{ fontSize:10.5, color:"var(--text3)", fontFamily:"var(--mono)" }}>{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width:`${pct}%`, background:cat.color }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="section-hdr">
          <div className="section-title">Tutti i documenti archiviati</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          <table className="doc-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 16 }}>Canale</th>
                <th>Documento</th>
                <th>Categoria</th>
                <th>Importo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DOCS.map(doc => {
                const cat = getCategoryInfo(doc.category);
                return (
                  <tr key={doc.id} className="doc-row" onClick={() => onDocClick(doc)}>
                    <td style={{ paddingLeft: 16 }}><ChannelTag channel={doc.channel} /></td>
                    <td>
                      <div className="subject-text">{doc.subject}</div>
                      <div className="doc-from">{doc.from}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 600, color: cat.color, background: `${cat.color}18`, padding: "2px 7px", borderRadius: 5 }}>{cat.label}</span>
                    </td>
                    <td style={{ fontFamily: "var(--mono)", fontSize: 12 }}>{doc.amount || "—"}</td>
                    <td><span className="date-text">{doc.date}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ─── ALERTS ─── */
const Alerts = ({ onDocClick }) => {
  const urgentDocs = MOCK_DOCS.filter(d => d.urgent || (d.deadline && daysUntil(d.deadline) <= 21));
  urgentDocs.sort((a, b) => (daysUntil(a.deadline) || 999) - (daysUntil(b.deadline) || 999));

  return (
    <div className="fade-in">
      <div className="section-hdr">
        <div>
          <div className="section-title">Scadenze & Allerte</div>
          <div className="section-sub">A-ESP monitora continuamente i tuoi canali</div>
        </div>
      </div>

      <div className="two-col">
        <div>
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="warning" size={14} color="var(--red)" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Azioni Richieste</span>
              <span className="nav-badge">{urgentDocs.filter(d => !d.read).length}</span>
            </div>
            {urgentDocs.map((doc, i) => {
              const d = daysUntil(doc.deadline);
              const isRed = d !== null && d <= 7;
              const color = isRed ? "var(--red)" : "var(--amber)";
              const cat = getCategoryInfo(doc.category);
              return (
                <div key={doc.id} className="timeline-item" style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => onDocClick(doc)}>
                  <div className="tl-line">
                    <div className="tl-dot" style={{ background: color }} />
                    {i < urgentDocs.length - 1 && <div className="tl-bar" />}
                  </div>
                  <div className="tl-content">
                    <div className="tl-date">{doc.deadline || doc.date} · <ChannelTag channel={doc.channel} /></div>
                    <div className="tl-title">{doc.from}</div>
                    <div style={{ fontSize: 12, color: "var(--text2)", margin: "2px 0 6px" }}>{doc.subject}</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {doc.amount && <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 700, color }}>{doc.amount}</span>}
                      
                      {d !== null && <DeadlineBadge deadline={doc.deadline} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="widget">
            <div className="widget-title">Sanzioni Potenziali</div>
            <div className="info-box-text" style={{ marginBottom: 14, fontSize: 12, color: "var(--text2)", lineHeight: 1.5 }}>
              In caso di mancato pagamento entro le scadenze, si applicano sanzioni progressiva per ravvedimento operoso.
            </div>
            {[["Entro 14 gg", "+0.1%/giorno", "var(--red-mid)"], ["15–30 gg", "+1,5%", "var(--amber)"], ["31–90 gg", "+1,67%", "var(--amber)"], ["91 gg – 1 anno", "+3,75%", "var(--red)"], ["> 1 anno", "+4,29–5%", "var(--red)"]].map(([label, pct, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, color: "var(--text2)" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--mono)", color }}>{pct}</span>
              </div>
            ))}
          </div>

          <div className="widget">
            <div className="widget-title">Statistiche Canale</div>
            {[["PEC", MOCK_DOCS.filter(d => d.channel === "PEC").length, "var(--red)"], ["Email", MOCK_DOCS.filter(d => d.channel === "EMAIL").length, "var(--teal)"], ["REM/QeRDS", MOCK_DOCS.filter(d => d.channel === "REM").length, "var(--blue)"]].map(([label, count, color]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--mono)", color }}>{count} doc.</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(count / MOCK_DOCS.length) * 100}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── CONNECTIONS ─── */
const EMAIL_PROVIDERS = [
  { id: "gmail",   label: "Gmail",   icon: "G", color: "#E02834", placeholder: "nome@gmail.com" },
  { id: "outlook", label: "Outlook", icon: "O", color: "#8A3040", placeholder: "nome@outlook.com" },
  { id: "other",   label: "Altro",   icon: "✉", color: "#666",    placeholder: "nome@esempio.it" },
];

const Connections = () => {
  // Email accounts: multi-account list
  const [emailAccounts, setEmailAccounts] = useState([
    { uid: "ea1", provider: "gmail", email: "mario.rossi@gmail.com", lastSync: "2 min fa" },
  ]);

  // PEC / REM: single-account providers
  const [conns, setConns] = useState(CONNECTIONS.filter(c => !["gmail","outlook"].includes(c.id)));

  // Dialog state
  const [dialog, setDialog] = useState(null); // null | { mode: "email" } | { mode: "pec", c } | { mode: "confirm-remove-email", uid, email } | { mode: "confirm-disconnect", c }
  const [selProvider, setSelProvider] = useState("gmail");
  const [inputVal, setInputVal] = useState("");
  const [inputError, setInputError] = useState("");

  const openEmailDialog = () => {
    setDialog({ mode: "email" });
    setSelProvider("gmail");
    setInputVal("");
    setInputError("");
  };

  const openPecDialog = (c) => {
    setDialog({ mode: "pec", c });
    setInputVal("");
    setInputError("");
  };

  const closeDialog = () => { setDialog(null); setInputVal(""); setInputError(""); };

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const confirmEmailConnect = () => {
    if (!inputVal.trim()) { setInputError("Inserisci un indirizzo email."); return; }
    if (!validateEmail(inputVal)) { setInputError("Indirizzo non valido."); return; }
    const prov = EMAIL_PROVIDERS.find(p => p.id === selProvider);
    setEmailAccounts(prev => [...prev, {
      uid: `ea${Date.now()}`, provider: selProvider,
      email: inputVal.trim(), lastSync: "Ora",
    }]);
    closeDialog();
  };

  const confirmPecConnect = () => {
    if (!inputVal.trim()) { setInputError("Inserisci un indirizzo email."); return; }
    if (!validateEmail(inputVal)) { setInputError("Indirizzo non valido."); return; }
    setConns(prev => prev.map(c => c.id === dialog.c.id
      ? { ...c, connected: true, email: inputVal.trim(), lastSync: "Ora" }
      : c
    ));
    closeDialog();
  };

  const removeEmailAccount = (uid) => setEmailAccounts(prev => prev.filter(a => a.uid !== uid));
  const disconnect = (id) => setConns(prev => prev.map(c => c.id === id ? { ...c, connected: false, email: null, lastSync: null } : c));

  const activeProv = EMAIL_PROVIDERS.find(p => p.id === selProvider);

  return (
    <div className="fade-in">
      <div className="section-hdr">
        <div>
          <div className="section-title">Connessioni e Canali</div>
          <div className="section-sub">Collega le tue caselle — accesso in sola lettura, mai modifiche</div>
        </div>
      </div>

      <div className="two-col" style={{ gridTemplateColumns: "1fr 280px" }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "var(--text2)", background: "var(--red-soft)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Icon name="check" size={13} color="var(--red)" />
              <span>A-ESP accede ai tuoi canali in <strong>sola lettura</strong> via OAuth ufficiale. Non legge, non invia, non modifica nulla. L'accesso è revocabile in qualsiasi momento.</span>
            </div>
          </div>

          {/* EMAIL ORDINARIA */}
          <div style={{ marginBottom: 20 }}>
            <div className="nav-section" style={{ padding: "0 0 8px", color: "var(--text3)" }}>Email Ordinaria</div>

            {emailAccounts.map(acc => {
              const prov = EMAIL_PROVIDERS.find(p => p.id === acc.provider) || EMAIL_PROVIDERS[2];
              return (
                <div key={acc.uid} className="conn-card">
                  <div className="conn-icon" style={{ background: `${prov.color}20`, color: prov.color }}>{prov.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="conn-name">{prov.label}</div>
                    <div className="conn-email">{acc.email}</div>
                    <div className="conn-status" style={{ marginTop: 4 }}>
                      <div className="conn-dot" style={{ background: "var(--red-mid)" }} />
                      <span style={{ fontSize: 11, color: "var(--red-mid)" }}>Attiva</span>
                      <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 4 }}>· Ultima sync {acc.lastSync}</span>
                    </div>
                  </div>
                  <button className="conn-btn disconnect" onClick={() => setDialog({ mode: "confirm-remove-email", uid: acc.uid, email: acc.email })}>Rimuovi</button>
                </div>
              );
            })}

            <div className="conn-card" style={{ border: "1.5px dashed var(--border)", background: "transparent", cursor: "pointer" }}
              onClick={openEmailDialog}>
              <div className="conn-icon" style={{ background: "var(--red-soft)", color: "var(--red)", fontSize: 18, fontWeight: 300 }}>+</div>
              <div style={{ flex: 1 }}>
                <div className="conn-name" style={{ color: "var(--red)" }}>Aggiungi account email</div>
                <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 2 }}>Gmail, Outlook o qualsiasi provider IMAP</div>
              </div>
            </div>
          </div>

          {/* PEC + REM */}
          {[
            { section: "PEC (Italia)", items: ["pec_aruba", "pec_legalmail"] },
            { section: "REM / QeRDS (EU)", items: ["rem"] },
          ].map(({ section, items }) => (
            <div key={section} style={{ marginBottom: 20 }}>
              <div className="nav-section" style={{ padding: "0 0 8px", color: "var(--text3)" }}>{section}</div>
              {items.map(id => {
                const c = conns.find(x => x.id === id);
                return (
                  <div key={id} className="conn-card">
                    <div className="conn-icon" style={{ background: `${c.color}20`, color: c.color }}>{c.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div className="conn-name">{c.name}</div>
                      {c.connected && c.email ? (
                        <div className="conn-email">{c.email}</div>
                      ) : (
                        <div style={{ fontSize: 11.5, color: "var(--text3)", marginTop: 2 }}>Non connessa</div>
                      )}
                      {c.connected && (
                        <div className="conn-status" style={{ marginTop: 4 }}>
                          <div className="conn-dot" style={{ background: "var(--red-mid)" }} />
                          <span style={{ fontSize: 11, color: "var(--red-mid)" }}>Attiva</span>
                          <span style={{ fontSize: 11, color: "var(--text3)", marginLeft: 4 }}>· Ultima sync {c.lastSync}</span>
                        </div>
                      )}
                    </div>
                    <button className={`conn-btn ${c.connected ? "disconnect" : "connect"}`} onClick={() => c.connected ? setDialog({ mode: "confirm-disconnect", c }) : openPecDialog(c)}>
                      {c.connected ? "Disconnetti" : "Connetti"}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div>
          <div className="widget">
            <div className="widget-title">Sicurezza & Privacy</div>
            {[["Sola lettura", "A-ESP non modifica né invia messaggi"], ["OAuth ufficiale", "Autenticazione tramite provider ufficiale"], ["Zero storage email", "I metadati, non il testo grezzo"], ["Revoca istantanea", "Disconnetti con un click"]].map(([title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--red-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="check" size={10} color="var(--red)" />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 11, color: "var(--text2)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="widget">
            <div className="widget-title">Canali Prossimamente</div>
            {["WhatsApp Business", "Telegram", "Fattureincloud", "AdE – Cassetto Fiscale"].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--border)", fontSize: 12.5, color: "var(--text2)" }}>
                <Icon name="plus" size={11} color="var(--text3)" />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONNECT / CONFIRM DIALOG */}
      {dialog && dialog.mode === "confirm-remove-email" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.45)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={closeDialog}>
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 28px 24px",
            width:360, boxShadow:"0 16px 48px rgba(224,40,52,0.18)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:22, marginBottom:12, textAlign:"center" }}>⚠️</div>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text)", textAlign:"center", marginBottom:8 }}>Rimuovere questo account?</div>
            <div style={{ fontSize:12.5, color:"var(--text2)", textAlign:"center", marginBottom:20, lineHeight:1.5 }}>
              Stai per rimuovere il collegamento con<br />
              <strong style={{ color:"var(--text)" }}>{dialog.email}</strong>.<br />
              A-ESP non leggerà più questa casella.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={closeDialog}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"1px solid var(--border)", background:"transparent",
                  color:"var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"var(--font)" }}>
                Annulla
              </button>
              <button onClick={() => { removeEmailAccount(dialog.uid); closeDialog(); }}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"none", background:"var(--red)",
                  color:"#FEFAEF", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                Sì, rimuovi
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog && dialog.mode === "confirm-disconnect" && (
        <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.45)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={closeDialog}>
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 28px 24px",
            width:360, boxShadow:"0 16px 48px rgba(224,40,52,0.18)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:22, marginBottom:12, textAlign:"center" }}>⚠️</div>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text)", textAlign:"center", marginBottom:8 }}>Disconnettere {dialog.c.name}?</div>
            <div style={{ fontSize:12.5, color:"var(--text2)", textAlign:"center", marginBottom:20, lineHeight:1.5 }}>
              Stai per disconnettere<br />
              <strong style={{ color:"var(--text)" }}>{dialog.c.email}</strong>.<br />
              A-ESP non leggerà più questa casella.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={closeDialog}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"1px solid var(--border)", background:"transparent",
                  color:"var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"var(--font)" }}>
                Annulla
              </button>
              <button onClick={() => { disconnect(dialog.c.id); closeDialog(); }}
                style={{ flex:1, padding:"9px", borderRadius:8, border:"none", background:"var(--red)",
                  color:"#FEFAEF", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                Sì, disconnetti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONNECT DIALOG */}
      {dialog && (dialog.mode === "email" || dialog.mode === "pec") && (
        <div style={{ position:"fixed", inset:0, background:"rgba(20,4,6,0.45)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}
          onClick={closeDialog}>
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 28px 24px",
            width:400, boxShadow:"0 16px 48px rgba(224,40,52,0.18)" }}
            onClick={e => e.stopPropagation()}>

            {/* header */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:40, height:40, borderRadius:10,
                background: dialog.mode === "email" ? "var(--red-soft)" : `${dialog.c?.color}20`,
                color: dialog.mode === "email" ? "var(--red)" : dialog.c?.color,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800 }}>
                {dialog.mode === "email" ? "✉" : dialog.c?.icon}
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>
                  {dialog.mode === "email" ? "Aggiungi account email" : `Connetti ${dialog.c?.name}`}
                </div>
                <div style={{ fontSize:11.5, color:"var(--text3)", marginTop:2 }}>Accesso in sola lettura via OAuth</div>
              </div>
              <button onClick={closeDialog} style={{ marginLeft:"auto", background:"none", border:"none", cursor:"pointer",
                color:"var(--text3)", fontSize:20, lineHeight:1, padding:4 }}>×</button>
            </div>

            {/* provider selector — only for email mode */}
            {dialog.mode === "email" && (
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text2)", display:"block", marginBottom:8 }}>Provider</label>
                <div style={{ display:"flex", gap:8 }}>
                  {EMAIL_PROVIDERS.map(p => (
                    <button key={p.id} onClick={() => { setSelProvider(p.id); setInputVal(""); setInputError(""); }}
                      style={{ flex:1, padding:"8px 6px", borderRadius:8, cursor:"pointer", fontFamily:"var(--font)",
                        fontSize:12.5, fontWeight:600, transition:"all 0.14s",
                        background: selProvider === p.id ? p.color : "var(--surface)",
                        color: selProvider === p.id ? "#FEFAEF" : "var(--text2)",
                        border: `1.5px solid ${selProvider === p.id ? p.color : "var(--border)"}` }}>
                      <span style={{ display:"block", fontSize:15, marginBottom:2 }}>{p.icon}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* email input */}
            <div style={{ marginBottom:6 }}>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text2)", display:"block", marginBottom:6 }}>
                Indirizzo email
              </label>
              <input
                autoFocus
                type="email"
                value={inputVal}
                onChange={e => { setInputVal(e.target.value); setInputError(""); }}
                onKeyDown={e => e.key === "Enter" && (dialog.mode === "email" ? confirmEmailConnect() : confirmPecConnect())}
                placeholder={dialog.mode === "email" ? (activeProv?.placeholder || "nome@esempio.it") : (dialog.c?.id === "pec_aruba" ? "nome@pec.it" : dialog.c?.id === "pec_legalmail" ? "nome@legalmail.it" : "nome@rem-provider.eu")}
                style={{ width:"100%", boxSizing:"border-box", padding:"10px 12px", borderRadius:8,
                  border:`1.5px solid ${inputError ? "var(--red)" : "var(--border)"}`,
                  background:"var(--surface)", color:"var(--text)", fontSize:13.5,
                  fontFamily:"var(--font)", outline:"none", transition:"border-color 0.15s" }}
              />
              {inputError && <div style={{ fontSize:11.5, color:"var(--red)", marginTop:5 }}>{inputError}</div>}
            </div>

            <div style={{ fontSize:11, color:"var(--text3)", marginBottom:20, lineHeight:1.5 }}>
              A-ESP richiederà l'autorizzazione OAuth al provider. Non memorizziamo password.
            </div>

            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={closeDialog}
                style={{ padding:"8px 16px", borderRadius:8, border:"1px solid var(--border)", background:"transparent",
                  color:"var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"var(--font)" }}>
                Annulla
              </button>
              <button onClick={dialog.mode === "email" ? confirmEmailConnect : confirmPecConnect}
                style={{ padding:"8px 18px", borderRadius:8, border:"none", background:"var(--red)",
                  color:"#FEFAEF", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                Connetti →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


/* ─────────────────────────────────────────────
   NOTIFICATION PANEL
───────────────────────────────────────────── */
const NOTIFICATIONS = [
  {
    id: 1, type: "urgent", read: false,
    title: "Scadenza critica — 3 giorni",
    sub: "Cartella esattoriale n. 0002348: importo € 890,00. Scade il 05/03/2026.",
    doc: 3, time: "Adesso", channel: "PEC"
  },
  {
    id: 2, type: "urgent", read: false,
    title: "Atto giudiziario ricevuto",
    sub: "Tribunale di Milano — atto di citazione procedimento 2026/1234. Risposta richiesta entro 05/03.",
    doc: 5, time: "2 ore fa", channel: "REM"
  },
  {
    id: 3, type: "deadline", read: false,
    title: "Avviso di accertamento — 12 giorni",
    sub: "Agenzia delle Entrate: accertamento n. 2025/47281 per € 2.450,00. Scade 10/03/2026.",
    doc: 1, time: "Ieri", channel: "PEC"
  },
  {
    id: 4, type: "deadline", read: true,
    title: "Polizza RC Auto in scadenza — 2 giorni",
    sub: "Generali Assicurazioni: rinnovo polizza entro 28/02/2026. Importo € 780,00.",
    doc: 7, time: "Ieri", channel: "EMAIL"
  },
  {
    id: 5, type: "info", read: true,
    title: "Nuova fattura archiviata",
    sub: "Stripe Payments — fattura febbraio 2026 ricevuta e classificata come C04.",
    doc: 11, time: "2 giorni fa", channel: "EMAIL"
  },
  {
    id: 6, type: "deadline", read: false,
    title: "Richiesta integrazione documentale",
    sub: "Camera di Commercio: pratica 88/2026 — integrazione entro 12/03/2026.",
    doc: 8, time: "3 giorni fa", channel: "PEC"
  },
  {
    id: 7, type: "info", read: true,
    title: "Convocazione assemblea — 17 giorni",
    sub: "Ordine dei Commercialisti: assemblea ordinaria 15 marzo 2026.",
    doc: 4, time: "4 giorni fa", channel: "EMAIL"
  },
  {
    id: 8, type: "ai", read: true,
    title: "A-ESP AI — Analisi completata",
    sub: "12 documenti analizzati, 4 urgenti rilevati, 3 scadenze entro 7 giorni.",
    doc: null, time: "Oggi 08:01", channel: null
  },
  {
    id: 9, type: "info", read: true,
    title: "Contributi INPS — comunicazione ricevuta",
    sub: "INPS: avviso contributi previdenziali € 1.120,00. Scadenza 20/03/2026.",
    doc: 12, time: "5 giorni fa", channel: "REM"
  },
];

const NotifIcon = ({ type, channel }) => {
  const configs = {
    urgent:   { bg: "var(--red-soft)",  border: "var(--border2)", icon: "warning", color: "var(--red)"     },
    deadline: { bg: "var(--red-pale)",  border: "var(--border)",  icon: "calendar",color: "var(--red-mid)" },
    info:     { bg: "var(--surface)",   border: "var(--border)",  icon: "doc",     color: "var(--text2)"   },
    ai:       { bg: "var(--red-soft)",  border: "var(--border2)", icon: "ai",      color: "var(--red)"     },
  };
  const c = configs[type] || configs.info;
  return (
    <div className="notif-icon-wrap" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <Icon name={c.icon} size={15} color={c.color} />
    </div>
  );
};

const NotificationPanel = ({ onClose, onDocClick }) => {
  const [tab, setTab] = useState("all");
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const filtered = tab === "all"    ? notifs
                 : tab === "unread" ? notifs.filter(n => !n.read)
                 : tab === "urgent" ? notifs.filter(n => n.type === "urgent" || n.type === "deadline")
                 : notifs;

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const handleNotifClick = (n) => {
    setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
    if (n.doc !== null) {
      const doc = MOCK_DOCS.find(d => d.id === n.doc);
      if (doc) { onDocClick(doc); onClose(); }
    }
  };

  // Group by time bucket
  const now      = filtered.filter(n => n.time === "Adesso" || n.time.includes("ore"));
  const today    = filtered.filter(n => n.time === "Ieri" || n.time.includes("Oggi"));
  const older    = filtered.filter(n => n.time.includes("giorni") || n.time.includes("settimana"));

  const renderGroup = (items, label) => {
    if (!items.length) return null;
    return (
      <>
        <div className="notif-separator">{label}</div>
        {items.map(n => (
          <div key={n.id} className={`notif-item${!n.read ? " unread" : ""}`} onClick={() => handleNotifClick(n)}>
            {!n.read && <div className="notif-unread-indicator" />}
            <NotifIcon type={n.type} channel={n.channel} />
            <div className="notif-body">
              <div className="notif-item-title">{n.title}</div>
              <div className="notif-item-sub">{n.sub}</div>
              <div className="notif-item-meta">
                {n.channel && (
                  <span style={{
                    fontSize:10, fontWeight:700, padding:"1px 5px", borderRadius:4,
                    fontFamily:"var(--mono)", letterSpacing:"0.3px",
                    background: n.channel==="PEC" ? "rgba(224,40,52,0.12)" : n.channel==="REM" ? "rgba(74,12,16,0.10)" : "rgba(122,20,24,0.10)",
                    color:      n.channel==="PEC" ? "var(--red)"           : n.channel==="REM" ? "var(--blue)"         : "var(--teal)",
                  }}>{n.channel}</span>
                )}
                {n.type === "ai" && (
                  <span style={{ fontSize:10, fontWeight:700, padding:"1px 5px", borderRadius:4,
                    background:"var(--red-soft)", color:"var(--red)", fontFamily:"var(--mono)" }}>AI</span>
                )}
                <span className="notif-time">{n.time}</span>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="notif-overlay" onClick={onClose} />
      <div className="notif-panel">
        <div className="notif-header">
          <div className="notif-header-left">
            <div className="notif-header-title">Notifiche</div>
            {unreadCount > 0 && <span className="notif-count-badge">{unreadCount}</span>}
          </div>
          <button className="notif-close-btn" onClick={onClose}>
            <Icon name="close" size={12} />
          </button>
        </div>

        <div className="notif-tabs">
          {[["all","Tutte"], ["unread","Non lette"], ["urgent","Urgenti"]].map(([key, label]) => (
            <div key={key} className={`notif-tab${tab===key?" active":""}`} onClick={() => setTab(key)}>
              {label}
              {key==="unread" && unreadCount > 0 && (
                <span style={{ marginLeft:5, background:"var(--red)", color:"#FEFAEF",
                  borderRadius:8, fontSize:9, fontWeight:800, padding:"1px 5px" }}>
                  {unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="notif-list">
          {filtered.length === 0 ? (
            <div className="notif-empty">
              <div className="notif-empty-icon">🔔</div>
              <div className="notif-empty-text">Nessuna notifica in questa categoria</div>
            </div>
          ) : (
            <>
              {renderGroup(now,   "Recenti")}
              {renderGroup(today, "Oggi")}
              {renderGroup(older, "Precedenti")}
            </>
          )}
        </div>

        <div className="notif-footer">
          <button className="notif-footer-btn" onClick={markAllRead}>
            Segna tutte come lette
          </button>
          <button className="notif-footer-btn" style={{ color:"var(--text2)" }}>
            Impostazioni notifiche →
          </button>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   CALENDAR PAGE
───────────────────────────────────────────── */
const MONTHS_IT = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const DAYS_IT   = ["Dom","Lun","Mar","Mer","Gio","Ven","Sab"];

const CalendarPage = ({ onDocClick }) => {
  const today = new Date(2026, 1, 26); // Feb 26 2026 (prototype date)
  const [viewDate, setViewDate] = useState(new Date(2026, 1, 1));
  const [selectedDay, setSelectedDay] = useState(today);

  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Build calendar grid (always 6 rows × 7 cols)
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();
  const cells = [];
  // Prev month tail
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ d: new Date(year, month - 1, daysInPrev - i), cur: false });
  // Current month
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ d: new Date(year, month, i), cur: true });
  // Next month head
  while (cells.length < 42)
    cells.push({ d: new Date(year, month + 1, cells.length - firstDay - daysInMonth + 1), cur: false });

  // Map deadlines to dates
  const deadlineMap = {};
  MOCK_DOCS.forEach(doc => {
    if (!doc.deadline) return;
    const key = doc.deadline; // "YYYY-MM-DD"
    if (!deadlineMap[key]) deadlineMap[key] = [];
    deadlineMap[key].push(doc);
  });

  const cellKey = (d) => {
    const mm = String(d.getMonth()+1).padStart(2,'0');
    const dd = String(d.getDate()).padStart(2,'0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isToday = (d) => isSameDay(d, today);

  const selKey = cellKey(selectedDay);
  const selectedDocs = deadlineMap[selKey] || [];

  // Colour by urgency
  const docColor = (doc) => {
    const d = daysUntil(doc.deadline);
    if (d !== null && d <= 7)  return "var(--red)";
    if (d !== null && d <= 21) return "var(--red-mid)";
    return "var(--teal)";
  };

  // Summary stats
  const upcomingDocs = MOCK_DOCS.filter(d => {
    if (!d.deadline) return false;
    const days = daysUntil(d.deadline);
    return days !== null && days >= 0 && days <= 30;
  });
  const overdueCount = MOCK_DOCS.filter(d => d.deadline && daysUntil(d.deadline) < 0).length;

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));
  const goToday   = () => { setViewDate(new Date(2026,1,1)); setSelectedDay(today); };

  const formatDateLabel = (d) => {
    const days = ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"];
    return `${days[d.getDay()]} ${d.getDate()} ${MONTHS_IT[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="fade-in">
      <div className="section-hdr" style={{ marginBottom: 18 }}>
        <div>
          <div className="section-title">Calendario Scadenze</div>
          <div className="section-sub">Tutte le scadenze rilevate da A-ESP — clicca su un giorno per i dettagli</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div className="ai-chip"><span className="ai-dot"/>AI attiva</div>
          <button className="cal-today-btn" onClick={goToday}>Oggi</button>
        </div>
      </div>

      <div className="cal-wrap">
        {/* LEFT: CALENDAR */}
        <div className="cal-main">
          <div className="cal-header">
            <button className="cal-nav-btn" onClick={prevMonth}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="cal-month-label">{MONTHS_IT[month]} {year}</div>
            <button className="cal-nav-btn" onClick={nextMonth}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div className="cal-weekdays">
            {DAYS_IT.map((d, i) => (
              <div key={d} className={`cal-weekday${i===0||i===6?" weekend":""}`}>{d}</div>
            ))}
          </div>

          <div className="cal-grid">
            {cells.map((cell, idx) => {
              const key  = cellKey(cell.d);
              const docs = deadlineMap[key] || [];
              const isSel = isSameDay(cell.d, selectedDay);
              const isTod = isToday(cell.d);
              const isWk  = cell.d.getDay() === 0 || cell.d.getDay() === 6;

              return (
                <div
                  key={idx}
                  className={`cal-cell${!cell.cur?" other-month":""}${isTod?" today":""}${isSel&&!isTod?" selected":""}`}
                  onClick={() => setSelectedDay(cell.d)}
                >
                  <div className="cal-day-num" style={isWk&&!isTod?{color:"var(--red-mid)"}:{}}>
                    {cell.d.getDate()}
                  </div>
                  {docs.length > 0 && (
                    <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                      {docs.slice(0,3).map(doc => {
                        const cat = getCategoryInfo(doc.category);
                        const col = docColor(doc);
                        return (
                          <span
                            key={doc.id}
                            className="cal-event-pill"
                            style={{ background:`${col}18`, color:col, border:`1px solid ${col}40` }}
                            onClick={e => { e.stopPropagation(); onDocClick(doc); }}
                            title={doc.subject}
                          >
                            {doc.from.split(" ")[0]}
                          </span>
                        );
                      })}
                      {docs.length > 3 && (
                        <span style={{ fontSize:9, color:"var(--text3)", fontWeight:600, paddingLeft:4 }}>
                          +{docs.length - 3} altri
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: PANELS */}
        <div className="cal-side">
          {/* SUMMARY */}
          <div className="cal-summary-card">
            <div className="cal-summary-title">Riepilogo mese</div>
            <div className="cal-summary-row">
              <span>Scadenze totali ({MONTHS_IT[month]})</span>
              <span style={{ fontWeight:700, color:"var(--text)" }}>
                {Object.entries(deadlineMap).filter(([k])=> k.startsWith(`${year}-${String(month+1).padStart(2,'0')}`)).reduce((s,[,v])=>s+v.length,0)}
              </span>
            </div>
            <div className="cal-summary-row">
              <span style={{ color:"var(--red)" }}>Urgenti (entro 7gg)</span>
              <span style={{ fontWeight:700, color:"var(--red)" }}>
                {MOCK_DOCS.filter(d => d.deadline && daysUntil(d.deadline) !== null && daysUntil(d.deadline) >= 0 && daysUntil(d.deadline) <= 7).length}
              </span>
            </div>
            <div className="cal-summary-row">
              <span style={{ color:"var(--red-mid)" }}>In scadenza (30gg)</span>
              <span style={{ fontWeight:700, color:"var(--red-mid)" }}>{upcomingDocs.length}</span>
            </div>
            <div className="cal-summary-row">
              <span style={{ color:"var(--text3)" }}>Già scadute</span>
              <span style={{ fontWeight:700, color:"var(--text3)" }}>{overdueCount}</span>
            </div>
          </div>

          {/* DAY DETAIL */}
          <div className="cal-day-panel">
            <div className="cal-day-panel-header">
              <div className="cal-day-title">{formatDateLabel(selectedDay)}</div>
              <div className="cal-day-sub">
                {selectedDocs.length === 0
                  ? "Nessuna scadenza questo giorno"
                  : `${selectedDocs.length} scadenza${selectedDocs.length > 1 ? "e" : ""} rilevata${selectedDocs.length > 1 ? "e" : ""} da A-ESP`}
              </div>
            </div>
            <div className="cal-day-events">
              {selectedDocs.length === 0 ? (
                <div style={{ padding:"28px 0", textAlign:"center" }}>
                  <div style={{ fontSize:26, marginBottom:8 }}>📅</div>
                  <div style={{ fontSize:12.5, color:"var(--text3)" }}>Nessuna scadenza</div>
                  <div style={{ fontSize:11.5, color:"var(--text3)", marginTop:4 }}>Seleziona un giorno con eventi</div>
                </div>
              ) : (
                selectedDocs.map(doc => {
                  const cat = getCategoryInfo(doc.category);
                  const col = docColor(doc);
                  const d   = daysUntil(doc.deadline);
                  return (
                    <div
                      key={doc.id}
                      className="cal-event-item"
                      style={{ borderLeftColor: col }}
                      onClick={() => onDocClick(doc)}
                    >
                      <div className="cal-event-from">{doc.channel} · {doc.from}</div>
                      <div className="cal-event-subject">{doc.subject}</div>
                      <div className="cal-event-meta">
                        
                        {doc.amount && (
                          <span style={{ fontSize:11.5, fontWeight:700, color:col, fontFamily:"var(--mono)" }}>{doc.amount}</span>
                        )}
                        {d !== null && (
                          <span style={{ fontSize:11, color:col, marginLeft:"auto", fontWeight:700 }}>
                            {d === 0 ? "Scade oggi" : d < 0 ? `Scaduto ${Math.abs(d)}gg fa` : `Tra ${d} giorni`}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* LEGEND */}
          <div className="cal-summary-card">
            <div className="cal-summary-title">Legenda</div>
            {[
              ["var(--red)",     "Urgente — entro 7 giorni"],
              ["var(--red-mid)", "In scadenza — entro 21 giorni"],
              ["var(--teal)",    "Prossimamente — oltre 21 giorni"],
            ].map(([col, label]) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:10, padding:"5px 0" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:col, flexShrink:0 }}/>
                <span style={{ fontSize:12, color:"var(--text2)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "dashboard" },
    { key: "inbox", label: "Inbox", icon: "inbox", badge: MOCK_DOCS.filter(d => !d.read).length },
    { key: "archive", label: "Archivio", icon: "archive" },
    { key: "alerts", label: "Scadenze", icon: "alert", badge: MOCK_DOCS.filter(d => d.urgent).length },
    { key: "connections", label: "Connessioni", icon: "link" },
  ];

  const pageTitles = { dashboard: "Panoramica", inbox: "Inbox", archive: "Archivio", alerts: "Scadenze", connections: "Connessioni", calendar: "Calendario Scadenze" };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        {/* SIDEBAR */}
        <div className={`sidebar${!sidebarOpen ? " collapsed" : ""}`}>
          <div className="sidebar-header">
            <img onClick={!sidebarOpen ? () => setSidebarOpen(true) : undefined} className={`logo-icon${!sidebarOpen ? " clickable" : ""}`} title={!sidebarOpen ? "Espandi sidebar" : undefined} src="data:image/png;base64,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" alt="A-ESP" />
            <span className="logo-wordmark">A-ESP</span>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(v => !v)} title="Riduci sidebar">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          </div>
          <div className="sidebar-nav">
            <div className="nav-section">Navigazione</div>
            {navItems.map(item => (
              <div key={item.key} className={`nav-item ${page === item.key ? "active" : ""} ${item.badge > 0 ? "has-badge" : ""}`} onClick={() => setPage(item.key)}>
                <span className="nav-icon"><Icon name={item.icon} size={15} color={page === item.key ? "var(--red)" : "currentColor"} /></span>
                <span className="nav-item-label">{item.label}</span>
                {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}

            <div className="nav-section" style={{ marginTop: 12 }}>AI & Configurazione</div>
            <div className={`nav-item ${page === "settings" ? "active" : ""}`} onClick={() => setPage("settings")}>
              <span className="nav-icon"><Icon name="settings" size={15} color={page === "settings" ? "var(--red)" : "currentColor"} /></span>
              <span className="nav-item-label">Impostazioni</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <div className="user-pill">
              <div className="user-avatar">MR</div>
              <div>
                <div className="user-name">Mario Rossi</div>
                <div className="user-plan">Piano Professional</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="topbar">
            <div className="page-title">{pageTitles[page] || "A-ESP"}</div>
            <div className="ai-chip" style={{ marginRight: 8 }}>
              <span className="ai-dot" />AI Engine attivo
            </div>
            <div className="search-box">
              <Icon name="search" size={13} color="var(--text3)" />
              <input placeholder="Cerca in tutti i documenti..." />
            </div>
            <div
              className="icon-btn"
              onClick={() => setShowNotif(v => !v)}
              style={showNotif ? {background:"var(--red)",color:"#FEFAEF",borderColor:"var(--red)"} : {}}
            >
              <Icon name="bell" size={15} color={showNotif ? "#FEFAEF" : "currentColor"} />
              {!showNotif && <div className="notif-dot" />}
            </div>
            <div className={`icon-btn${page==="calendar"?" ":""}`} onClick={() => setPage(p => p === "calendar" ? "dashboard" : "calendar")} style={page==="calendar"?{background:"var(--red)",color:"#FEFAEF",borderColor:"var(--red)"}:{}}><Icon name="calendar" size={15} /></div>
          </div>

          <div className="content">
            {page === "dashboard" && <Dashboard onDocClick={setSelectedDoc} onNavigate={setPage} />}
            {page === "inbox" && <Inbox onDocClick={setSelectedDoc} />}
            {page === "archive" && <Archive onDocClick={setSelectedDoc} />}
            {page === "alerts" && <Alerts onDocClick={setSelectedDoc} />}
            {page === "connections" && <Connections />}
            {page === "calendar" && <CalendarPage onDocClick={setSelectedDoc} />}
            {page === "settings" && (
              <div className="fade-in">
                <div className="section-title" style={{ marginBottom: 16 }}>Impostazioni</div>
                <div className="info-box">
                  <div className="info-box-title">Preferenze AI</div>
                  <div className="info-box-text">Configura soglie di allerta, frequenza di analisi e regole di classificazione personalizzate. <span style={{ color: "var(--red)", cursor: "pointer" }}>Prossimamente →</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} onDocClick={doc => { setSelectedDoc(doc); setShowNotif(false); }} />}

        {/* DRAWER */}
        {selectedDoc && <DocDrawer doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
      </div>
    </>
  );
}
