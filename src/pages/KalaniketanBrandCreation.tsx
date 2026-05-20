import { useState, useEffect, useRef } from "react";
import logo from "../components/assets/logos/grofesion-ptTd-aMb.png";
import logo2 from "../components/assets/logos/grofesion-white-8CunCr3U.png";
 
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&family=Noto+Serif+Telugu:wght@300;400;500&display=swap');
 
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --gold:#C5A35A;--gold-light:#E8D5A0;--gold-pale:#F7F0DC;
    --ink:#1A1410;--ink-mid:#3D2E1E;--ink-soft:#6B5744;
    --cream:#FAF6EE;--cream-deep:#F2EAD8;--ivory:#FDFAF4;
    --rust:#8B3A2A;--border:rgba(197,163,90,0.22);--border-s:rgba(197,163,90,0.5);
  }
  html{scroll-behavior:smooth}
  body{font-family:'Jost',sans-serif;background:var(--cream);color:var(--ink);overflow-x:hidden}
 
  .deck{position:relative}
  .slide{min-height:100vh;display:flex;flex-direction:column;position:relative;overflow:hidden}
 
  nav.kl-nav{
    position:fixed;top:0;left:0;right:0;z-index:200;
    display:flex;align-items:center;justify-content:space-between;
    padding:18px 60px;
    background:rgba(253,250,244,0.94);backdrop-filter:blur(14px);
    border-bottom:0.5px solid var(--border);
  }
  .nav-logo-text{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:var(--ink);letter-spacing:0.15em}
  .nav-right{display:flex;align-items:center;gap:32px}
  .nav-links{display:flex;gap:32px}
  .nav-links a{font-size:11px;font-weight:300;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink-soft);text-decoration:none;transition:color 0.3s}
  .nav-links a:hover{color:var(--gold)}
  .nav-approve-btn{
    font-size:11px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;
    background:var(--gold);color:var(--ink);border:none;
    padding:10px 24px;cursor:pointer;transition:opacity 0.2s;
  }
  .nav-approve-btn:hover{opacity:0.85}
 
  .grid-pat{
    position:absolute;inset:0;opacity:0.035;pointer-events:none;
    background-image:
      repeating-linear-gradient(0deg,transparent,transparent 70px,var(--gold) 70px,var(--gold) 71px),
      repeating-linear-gradient(90deg,transparent,transparent 70px,var(--gold) 70px,var(--gold) 71px);
  }
  .diagonal-pat{
    position:absolute;inset:0;opacity:0.04;pointer-events:none;
    background-image:repeating-linear-gradient(45deg,var(--gold) 0,var(--gold) 1px,transparent 0,transparent 50%);
    background-size:20px 20px;
  }
 
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
  @keyframes slideRight{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
 
  .anim-1{animation:fadeUp 0.8s 0.1s both}
  .anim-2{animation:fadeUp 0.8s 0.25s both}
  .anim-3{animation:fadeUp 0.8s 0.4s both}
  .anim-4{animation:fadeUp 0.8s 0.55s both}
  .anim-5{animation:fadeUp 0.8s 0.7s both}
 
  .serif{font-family:'Cormorant Garamond',serif}
  .tel{font-family:'Noto Serif Telugu',serif}
  .label{font-size:10px;font-weight:400;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold)}
  .display{font-family:'Cormorant Garamond',serif;font-weight:300;line-height:1.05;color:var(--ink)}
  .body-text{font-size:15px;font-weight:300;line-height:1.9;color:var(--ink-soft)}
  .gold{color:var(--gold)}
 
  /* SLIDE 1 */
  #s1{background:var(--ivory);align-items:center;justify-content:center;text-align:center;padding:100px 80px 80px}
  .s1-badge{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:var(--gold);border:0.5px solid var(--gold);padding:8px 28px;margin-bottom:56px;display:inline-block}
  .s1-title{font-size:clamp(68px,9vw,130px);font-family:'Cormorant Garamond',serif;font-weight:300;line-height:0.92;color:var(--ink)}
  .s1-title em{font-style:italic;color:var(--gold)}
  .s1-rule{width:1px;height:72px;background:var(--border-s);margin:48px auto}
  .s1-sub{font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:var(--ink-soft)}
  .s1-brands{display:flex;align-items:center;justify-content:center;gap:64px;margin-top:64px}
  .s1-brand-name{font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:300;color:var(--ink)}
  .s1-brand-tel{font-family:'Noto Serif Telugu',serif;font-size:22px;color:var(--gold);display:block;margin-top:6px}
  .s1-brand-sub{font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-soft);margin-top:10px}
  .s1-sep{width:1px;height:80px;background:var(--border-s)}
 
  /* SLIDE 2 */
  #s2{background:var(--cream-deep);padding:100px 80px 100px}
  .s2-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:64px;flex:1}
  .s2-card{background:var(--ivory);border:0.5px solid var(--border);padding:60px 52px;position:relative;overflow:hidden}
  .s2-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform 0.5s}
  .s2-card:hover::after{transform:scaleX(1)}
  .s2-num{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);margin-bottom:36px}
  .s2-name{font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:300;line-height:1;color:var(--ink)}
  .s2-tel{font-family:'Noto Serif Telugu',serif;font-size:36px;color:var(--gold);display:block;margin:10px 0 36px}
  .s2-roots{display:flex;gap:36px;margin-bottom:30px}
  .root-w{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold)}
  .root-d{font-size:11px;color:var(--ink-soft);font-weight:300;margin-top:4px;line-height:1.6}
  .s2-story{font-size:13px;line-height:1.85;color:var(--ink-soft);font-weight:300;max-width:440px}
  .s2-tag{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink-soft);border-top:0.5px solid var(--border);padding-top:20px;margin-top:28px}
 
  /* SLIDE 3 */
  #s3{background:var(--ink);padding:100px 80px}
  #s3 .label{color:var(--gold)}
  #s3 .display{color:var(--cream)}
  .s3-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(197,163,90,0.12);margin-top:64px;flex:1}
  .s3-card{background:var(--ink);padding:48px 36px;transition:background 0.35s}
  .s3-card:hover{background:#221810}
  .s3-n{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:200;color:rgba(197,163,90,0.25);line-height:1}
  .s3-t{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:var(--gold);margin-top:18px}
  .s3-b{font-size:13px;font-weight:300;line-height:1.9;color:rgba(250,246,238,0.55);margin-top:14px}
 
  /* SLIDE 4 */
  #s4{background:var(--cream-deep);padding:100px 80px}
  .s4-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:64px;flex:1}
  .s4-panel{min-height:320px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px;position:relative}
  .s4-light{background:var(--ivory);border:0.5px solid var(--border)}
  .s4-dark{background:var(--ink)}
  .s4-gold{background:var(--gold)}
  .s4-deep{background:#2A1F14}
  .logotype{font-family:'Cormorant Garamond',serif;font-size:60px;font-weight:300;line-height:1;text-align:center}
  .logotype .sub{font-size:18px;font-weight:300;letter-spacing:0.35em;text-transform:uppercase;display:block}
  .logotype .tel-sub{font-family:'Noto Serif Telugu',serif;font-size:26px;display:block;margin-top:6px}
  .logotype .tag{font-size:10px;letter-spacing:0.25em;text-transform:uppercase;display:block;margin-top:16px}
  .panel-lbl{position:absolute;bottom:20px;left:0;right:0;text-align:center;font-size:9px;letter-spacing:0.3em;text-transform:uppercase}
 
  /* SLIDE 5 */
  #s5{background:var(--ivory);padding:100px 80px}
  .s5-swatches{display:flex;gap:2px;margin-top:64px}
  .swatch{flex:1;height:180px;display:flex;flex-direction:column;justify-content:flex-end;padding:22px;transition:flex 0.4s;cursor:default;position:relative;overflow:hidden}
  .swatch:hover{flex:2.2}
  .sw-n{font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:400;position:relative}
  .sw-h{font-size:10px;font-weight:300;margin-top:4px;opacity:0.65;position:relative}
  .s5-type{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:64px}
  .t-label{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);margin-bottom:18px}
  .t-specimen{font-family:'Cormorant Garamond',serif;font-weight:300;line-height:1.05;color:var(--ink)}
  .t-desc{font-size:12px;font-weight:300;color:var(--ink-soft);margin-top:14px;line-height:1.8}
 
  /* SLIDE 6 */
  #s6{background:var(--ink);padding:100px 80px}
  #s6 .display{color:var(--cream)}
  #s6 .body-text{color:rgba(250,246,238,0.6)}
  .s6-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(197,163,90,0.1);margin-top:64px;flex:1}
  .s6-card{background:var(--ink);padding:48px 36px;transition:background 0.35s}
  .s6-card:hover{background:#221810}
  .s6-icon{width:44px;height:44px;border:0.5px solid rgba(197,163,90,0.3);display:flex;align-items:center;justify-content:center;margin-bottom:32px}
  .s6-icon svg{width:22px;height:22px;stroke:var(--gold);fill:none;stroke-width:1.2}
  .s6-t{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:var(--cream);margin-bottom:14px}
  .s6-b{font-size:13px;font-weight:300;line-height:1.9;color:rgba(250,246,238,0.5)}
  .s6-d{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-top:20px}
 
  /* SLIDE 7 */
  #s7{background:var(--ivory);padding:100px 80px}
  .s7-layout{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:64px;flex:1}
  .price-card{border:0.5px solid var(--border);padding:48px;background:white;box-shadow:0 20px 70px rgba(26,20,16,0.1)}
  .pc-hdr{display:flex;align-items:center;justify-content:space-between;padding-bottom:24px;border-bottom:0.5px solid var(--border);margin-bottom:28px}
  .pc-brand{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300}
  .pc-brand .tel{font-family:'Noto Serif Telugu',serif;font-size:17px;color:var(--gold);display:block;margin-top:4px}
  .pc-product{font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:var(--ink-soft);text-align:right;line-height:1.8}
  .pc-row{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:0.5px solid rgba(197,163,90,0.13)}
  .pc-row:last-of-type{border-bottom:none}
  .pc-lbl{font-size:12px;font-weight:300;color:var(--ink-soft)}
  .pc-val{font-size:14px;font-family:'Cormorant Garamond',serif;color:var(--ink)}
  .pc-total{display:flex;justify-content:space-between;align-items:center;padding:22px 0 0;border-top:1px solid var(--gold);margin-top:8px}
  .pc-total-lbl{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold)}
  .pc-total-val{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300}
  .pc-footer{margin-top:20px;padding-top:18px;border-top:0.5px solid var(--border);font-size:10px;color:var(--ink-soft);font-weight:300;letter-spacing:0.12em;text-align:center}
  .tm-quote{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:300;line-height:1.2;color:var(--ink);margin-bottom:28px}
  .tm-quote em{color:var(--gold);font-style:italic}
  .tm-body{font-size:14px;font-weight:300;line-height:1.9;color:var(--ink-soft)}
  .tm-stats{display:flex;gap:44px;margin-top:36px;padding-top:28px;border-top:0.5px solid var(--border)}
  .st-num{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:300;color:var(--gold);line-height:1}
  .st-lbl{font-size:11px;font-weight:300;color:var(--ink-soft);margin-top:6px}
 
  /* SLIDE 8 */
  #s8{background:var(--cream-deep);padding:100px 80px}
  .s8-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;margin-top:64px}
  .v-ctx{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
  .v-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:var(--ink);margin-bottom:18px}
  .v-card{background:var(--ivory);border:0.5px solid var(--border);padding:32px 36px;margin-bottom:14px}
  .v-card-lbl{font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:14px}
  .v-card-text{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;line-height:1.55;color:var(--ink)}
  .v-card-text em{color:var(--gold);font-style:italic}
  .v-card-note{font-size:11px;font-weight:300;color:var(--ink-soft);margin-top:14px;padding-top:14px;border-top:0.5px solid var(--border);line-height:1.75}
 
  /* SLIDE 9 */
  #s9{background:var(--ivory);padding:100px 80px}
  .s9-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:64px;flex:1}
  .storefront{background:var(--ink);padding:60px 50px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:400px;position:relative;text-align:center}
  .storefront::before{content:'';position:absolute;top:0;left:40px;right:40px;height:3px;background:var(--gold)}
  .sf-name{font-family:'Cormorant Garamond',serif;font-size:56px;font-weight:300;color:var(--cream);line-height:1}
  .sf-tel{font-family:'Noto Serif Telugu',serif;font-size:28px;color:var(--gold);display:block;margin-top:10px}
  .sf-rule{width:50px;height:0.5px;background:rgba(197,163,90,0.4);margin:20px auto}
  .sf-tag{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(197,163,90,0.6)}
  .sf-loc{font-size:10px;font-weight:300;color:rgba(250,246,238,0.35);letter-spacing:0.2em;margin-top:6px}
  .bag-container{background:var(--cream-deep);border:0.5px solid var(--border);display:flex;align-items:center;justify-content:center;min-height:400px;padding:50px}
  .bag{width:180px;height:220px;border:1px solid var(--border-s);background:var(--ivory);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;text-align:center}
  .bag::before{content:'';position:absolute;top:-26px;left:50%;transform:translateX(-50%);width:70px;height:28px;border:1px solid var(--border-s);border-bottom:none;border-radius:36px 36px 0 0}
  .bag-n{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:var(--ink)}
  .bag-t{font-family:'Noto Serif Telugu',serif;font-size:17px;color:var(--gold);margin-top:4px}
  .bag-l{font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink-soft);margin-top:14px}
  .gift-tag{border:0.5px solid var(--border-s);padding:32px 40px;text-align:center;background:white;max-width:220px}
 
  /* SLIDE 10B SOGASARI */
  #s10b{background:var(--cream-deep);padding:100px 80px}
  .sog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:rgba(197,163,90,0.12);margin-bottom:64px}
  .sog-card{background:var(--ivory);border:0.5px solid var(--border);padding:40px 36px;position:relative;overflow:hidden;transition:border-color 0.3s;cursor:default}
  .sog-card:hover{border-color:var(--gold)}
  .sog-card-name{font-family:'Cormorant Garamond',serif;font-size:52px;font-weight:300;color:var(--ink);line-height:1}
  .sog-card-name span{color:var(--gold)}
  .sog-card-tel{font-family:'Noto Serif Telugu',serif;font-size:22px;color:var(--gold);margin-top:8px}
  .sog-card-reg{font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:var(--ink-soft);margin-top:20px;border-top:0.5px solid var(--border);padding-top:16px}
  .sog-card-desc{font-size:12px;font-weight:300;color:var(--ink-soft);margin-top:10px;line-height:1.8}
  .sog-tm-badge{margin-top:14px;display:inline-block;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;padding:5px 12px;background:rgba(197,163,90,0.12);color:var(--gold)}
  .sog-tm-grid{background:var(--ink);padding:48px 52px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:40px}
  .sog-tm-label{font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:var(--gold);margin-bottom:12px}
  .sog-tm-val{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--cream)}
  .sog-tm-clear{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:#6BCB77}
  .sog-tm-desc{font-size:12px;font-weight:300;color:rgba(250,246,238,0.5);margin-top:8px;line-height:1.7}
 
  /* SLIDE 10 TAGLINE */
  #s10{background:var(--ink);padding:100px 80px;text-align:center;align-items:center;justify-content:center}
  .tl-eye{font-size:10px;letter-spacing:0.5em;text-transform:uppercase;color:var(--gold);margin-bottom:56px}
  .tl-main{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,6.5vw,86px);font-weight:300;line-height:1.1;color:var(--cream)}
  .tl-main em{color:var(--gold);font-style:italic}
  .tl-sub{font-size:12px;font-weight:300;letter-spacing:0.22em;color:rgba(250,246,238,0.4);margin-top:36px}
  .tl-duo{display:flex;align-items:center;justify-content:center;gap:42px;margin-top:90px}
  .tl-item-n{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;color:var(--cream)}
  .tl-item-l{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:300;font-style:italic;color:var(--gold);margin-top:10px}
  .tl-sep{width:1px;height:72px;background:rgba(197,163,90,0.25)}
 
  /* SLIDE 11 APPROVAL */
  #s11{background:var(--ivory);padding:100px 80px;align-items:center;justify-content:center;text-align:center}
  .ap-title{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,6vw,80px);font-weight:300;line-height:1.05;color:var(--ink);margin-bottom:28px}
  .ap-title em{font-style:italic;color:var(--gold)}
  .ap-body{font-size:15px;font-weight:300;line-height:1.9;color:var(--ink-soft);max-width:520px;margin:0 auto 56px}
  .ap-names{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:52px}
  .ap-name-pill{
    font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;
    border:1px solid var(--border-s);padding:14px 32px;
    cursor:pointer;transition:all 0.3s;background:var(--ivory);
    display:flex;align-items:center;gap:12px;position:relative;
  }
  .ap-name-pill:hover{border-color:var(--gold);background:var(--gold-pale)}
  .ap-name-pill.selected{border-color:var(--gold);background:var(--gold);color:var(--ink)}
  .ap-name-pill .check{font-size:14px;opacity:0;transition:opacity 0.3s}
  .ap-name-pill.selected .check{opacity:1}
  .ap-name-tel{font-family:'Noto Serif Telugu',serif;font-size:14px;color:var(--gold)}
  .ap-name-pill.selected .ap-name-tel{color:var(--ink-mid)}
  .ap-form{background:var(--cream-deep);border:0.5px solid var(--border);padding:40px;max-width:480px;margin:0 auto;text-align:left}
  .ap-input{
    width:100%;border:0.5px solid var(--border);background:var(--ivory);
    padding:14px 18px;font-family:'Jost',sans-serif;font-size:14px;font-weight:300;
    color:var(--ink);margin-bottom:14px;outline:none;transition:border-color 0.3s;
  }
  .ap-input:focus{border-color:var(--gold)}
  .ap-note{font-size:11px;color:var(--ink-soft);font-weight:300;line-height:1.7;margin-bottom:24px}
  .ap-submit{
    width:100%;background:var(--gold);border:none;color:var(--ink);
    font-family:'Jost',sans-serif;font-size:12px;font-weight:400;
    letter-spacing:0.2em;text-transform:uppercase;padding:16px;
    cursor:pointer;transition:opacity 0.2s;
  }


  
  .ap-submit:hover{opacity:0.85}
  .ap-confirm{padding:40px;background:var(--ink);max-width:480px;margin:0 auto;text-align:center}
  .ap-confirm-icon{font-size:32px;margin-bottom:16px}
  .ap-confirm-title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:var(--cream);margin-bottom:12px}
  .ap-confirm-body{font-size:13px;font-weight:300;color:rgba(250,246,238,0.55);line-height:1.8}
  .ap-confirm-gold{color:var(--gold)}
 
  /* FOOTER */
  footer.kl-footer{background:var(--ink);padding:56px 80px;display:flex;align-items:center;justify-content:space-between;border-top:0.5px solid rgba(197,163,90,0.18)}
  .footer-logo-text{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:rgba(250,246,238,0.7);letter-spacing:0.15em}
  .footer-info{font-size:11px;font-weight:300;color:rgba(250,246,238,0.3);text-align:right;letter-spacing:0.12em;line-height:1.9}
 
  .reveal{opacity:0;transform:translateY(32px);transition:opacity 0.9s ease,transform 0.9s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}
  .rd1{transition-delay:0.1s}.rd2{transition-delay:0.25s}.rd3{transition-delay:0.4s}.rd4{transition-delay:0.55s}
 
  .selected-names-label{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:24px}


/* TAGLINE SECTION SPECIFIC */
  .tag-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; margin-top: 60px; }
  .tag-box { border-left: 1px solid var(--gold); padding: 20px 40px; background: rgba(197,163,90,0.03); }
  .tag-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; color: var(--ink); margin-bottom: 10px; }
  .tag-sub { font-size: 12px; color: var(--ink-soft); letter-spacing: 0.1em; text-transform: uppercase; }
  .tag-tel-big { font-family: 'Noto Serif Telugu', serif; font-size: 24px; color: var(--gold); margin-top: 15px; display: block; }


/* RESPONSIVE CONTAINER */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .slide {
    min-height: 100vh;
    padding: 120px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* TYPOGRAPHY */
  .label { font-size: 10px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
  .display { font-family: 'Cormorant Garamond', serif; font-weight: 300; line-height: 1.1; color: var(--ink); font-size: clamp(40px, 8vw, 72px); }
  
  /* TAGLINE GRID SYSTEM */
  .tag-grid { 
    display: grid; 
    grid-template-columns: repeat(2, 1fr); 
    gap: 60px 40px; 
    margin-top: 64px; 
  }

  .tag-box { 
    border-left: 1px solid var(--gold); 
    padding: 4px 0 4px 32px; 
    transition: transform 0.3s ease;
  }

  .tag-sub-label {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 12px;
  }

  .tag-en {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 300;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .tag-tel {
    font-family: 'Noto Serif Telugu', serif;
    font-size: clamp(18px, 2vw, 22px);
    color: var(--gold);
  }

  /* NAVIGATION */
  nav.kl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    background: rgba(253, 250, 244, 0.9); backdrop-filter: blur(10px);
    border-bottom: 0.5px solid var(--border);
    padding: 16px 85px;
    
  }
  .nav-content { display: flex; justify-content: space-between; align-items: center; }
  .nav-links { display: none; gap: 32px; }
  .nav-links a { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: none; color: var(--ink-soft); }

  /* RESPONSIVE MEDIA QUERIES */
  @media (max-width: 768px) {
    .tag-grid { grid-template-columns: 1fr; gap: 40px; }
    .slide { padding: 80px 0; }
    .display { font-size: 42px; }
  }

  @media (min-width: 1024px) {
    .nav-links { display: flex; }
  }

  .reveal { opacity: 0; transform: translateY(20px); transition: 0.8s all ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;
 
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}




function Slide1() {
  return (
    <section id="s1" className="slide">
      <div className="grid-pat" />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "100px 80px 120px", textAlign: "center" }}>
        <div className="s1-badge anim-1">Confidential Brand Presentation · Kalanikethan 2025</div>
        <div className="s1-title display anim-2">Two Names.<br /><em>One Truth.</em></div>
        <div className="s1-rule anim-3" />
        <div className="s1-sub anim-4">Brand Identity · In-Store Experience · Communication Architecture</div>
        <div className="s1-brands anim-5">
          <div style={{ textAlign: "center" }}>
            <div className="s1-brand-name">Kalavé</div>
            <span className="s1-brand-tel">కలవే</span>
            <div className="s1-brand-sub">Art Woven Into Being</div>
          </div>
          <div className="s1-sep" />
          <div style={{ textAlign: "center" }}>
            <div className="s1-brand-name">Saadi Mart</div>
            <span className="s1-brand-tel" style={{ fontSize: "18px" }}>సాడీ మార్ట్</span>
            <div className="s1-brand-sub">The Word Women Actually Use</div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "60px", left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.6, animation: "fadeUp 1s 1.8s both" }}>Scroll to explore</div>
        </div>
      </div>
    </section>
  );
}
 
function Slide2() {
  return (
    <section id="s2" className="slide" style={{ background: "var(--cream-deep)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">01 · The Names</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>Where Each Name<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Comes From</em></div></div>
        <div className="reveal rd3 body-text" style={{ maxWidth: "560px", marginBottom: 0 }}>Two names found inside the culture. One a goddess name transformed. The other the word a grandmother uses.</div>
        <div className="s2-grid reveal rd4">
          <div className="s2-card">
            <div className="s2-num">Name 01</div>
            <div className="s2-name">Kalavé</div>
            <span className="s2-tel">కలవే</span>
            <div className="s2-roots">
              <div><div className="root-w">కళ · Kala</div><div className="root-d">Art · The sixty-four<br />divine arts · Beauty<br />created through skill</div></div>
              <div><div className="root-w">వే · Vé</div><div className="root-d">To weave · The Telugu<br />root of all saree<br />creation</div></div>
            </div>
            <div className="s2-story">The Lakshmi to Lakmé transformation applied to Kalavathi. Kala is one of the sixteen phases of the moon — each a quality of feminine grace. Vé is the ancient Telugu verb for weaving. Together: <em style={{ color: "var(--gold)" }}>the one who has woven beauty into being.</em></div>
            <div className="s2-tag">Premium · Goddess lineage · Trademark defensible · Bilingual</div>
          </div>
          <div className="s2-card">
            <div className="s2-num">Name 02</div>
            <div className="s2-name" style={{ fontSize: "64px" }}>Saadi Mart</div>
            <span className="s2-tel" style={{ fontSize: "28px" }}>సాడీ మార్ట్</span>
            <div className="s2-roots">
              <div><div className="root-w">సాడీ · Saadi</div><div className="root-d">The vernacular word<br />for saree · How women<br />speak to each other</div></div>
              <div><div className="root-w">మార్ట్ · Mart</div><div className="root-d">A market of value<br />Curated access<br />Not mass</div></div>
            </div>
            <div className="s2-story">Not "saree" the formal catalogue word. Sadi. The word spoken in kitchens, at mirrors, between mothers and daughters before a function. Every premium brand uses the formal word. <em style={{ color: "var(--gold)" }}>Saadi Mart speaks the way women actually speak.</em></div>
            <div className="s2-tag">Culturally intimate · Vernacular power · Category disruptor</div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Slide3() {
  const cards = [
    { n: "01", t: "The Sixty-Four Arts", b: "In Sanskrit tradition, Kala refers to the sixty-four divine arts. One of them is the art of honest commercial exchange. Kalavé is the brand that restores an art that commerce forgot." },
    { n: "02", t: "The Weaving Root", b: "Vé is the Telugu root for weaving — the foundational act of creating a saree. The name contains the product. Every saree sold is literally a Kala Vé — beauty woven." },
    { n: "03", t: "The Lunar Phase", b: "Kala is one of the sixteen phases of the moon, each representing a quality of feminine grace. The brand aligns with a quality of womanhood, not just a product category." },
    { n: "04", t: "Goddess Lineage", b: "Kalavé follows the Lakshmi to Lakmé principle. Religious weight removed. Cultural resonance kept. Trademark space clean. The brand stands completely alone." },
    { n: "05", t: "Telugu Identity", b: "Sits naturally in Telugu speech, looks distinguished in calligraphy, and travels comfortably in English. Belongs to the AP and Telangana market without being limited to it." },
    { n: "06", t: "The Transparent Promise", b: "Kala means skill made visible. Transparent pricing is Kala applied to commerce. The name and the brand promise are the same thing expressed differently." },
  ];
  return (
    <section id="s3" className="slide" style={{ background: "var(--ink)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">02 · Brand Architecture</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", color: "var(--cream)", marginTop: "8px", marginBottom: "6px" }}>What Kalavé<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Carries</em></div></div>
        <div className="reveal rd3 body-text" style={{ maxWidth: "560px", color: "rgba(250,246,238,0.55)" }}>A name this carefully rooted carries meaning across six simultaneous dimensions. Every one adds weight to the brand.</div>
        <div className="s3-grid reveal rd4">
          {cards.map(c => (
            <div key={c.n} className="s3-card">
              <div className="s3-n">{c.n}</div>
              <div className="s3-t">{c.t}</div>
              <div className="s3-b">{c.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function Slide4() {
  return (
    <section id="s4" className="slide" style={{ background: "var(--cream-deep)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">03 · Visual Identity</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>The Logo<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>System</em></div></div>
        <div className="reveal rd3 body-text" style={{ maxWidth: "560px" }}>Calligraphed identity in Telugu and English. Two equal originals — not a translation.</div>
        <div className="s4-grid reveal rd4">
          <div className="s4-panel s4-light">
            <div className="logotype" style={{ color: "var(--ink)" }}>
              <span className="sub" style={{ color: "var(--gold)", fontSize: "13px", marginBottom: "10px" }}>✦ · ✦</span>
              Kalavé
              <span className="tel-sub" style={{ color: "var(--gold)" }}>కలవే</span>
              <span className="tag" style={{ color: "var(--ink-soft)", opacity: 0.7 }}>The Art of Honest Beauty</span>
            </div>
            <div className="panel-lbl" style={{ color: "var(--ink-soft)" }}>Primary · Light</div>
          </div>
          <div className="s4-panel s4-dark">
            <div className="logotype" style={{ color: "var(--cream)" }}>
              <span className="sub" style={{ color: "rgba(197,163,90,0.45)", fontSize: "13px", marginBottom: "10px" }}>✦ · ✦</span>
              Kalavé
              <span className="tel-sub" style={{ color: "var(--gold)" }}>కలవే</span>
              <span className="tag" style={{ color: "rgba(197,163,90,0.5)" }}>The Art of Honest Beauty</span>
            </div>
            <div className="panel-lbl" style={{ color: "rgba(250,246,238,0.3)" }}>Primary · Dark</div>
          </div>
          <div className="s4-panel s4-gold">
            <div className="logotype" style={{ color: "var(--ink)" }}>
              <span className="sub" style={{ color: "rgba(26,20,16,0.4)", fontSize: "13px", marginBottom: "10px" }}>✦ · ✦</span>
              Kalavé
              <span className="tel-sub" style={{ color: "var(--ink-mid)" }}>కలవే</span>
              <span className="tag" style={{ color: "rgba(26,20,16,0.5)" }}>The Art of Honest Beauty</span>
            </div>
            <div className="panel-lbl" style={{ color: "rgba(26,20,16,0.4)" }}>Gold · Special Use</div>
          </div>
          <div className="s4-panel s4-deep">
            <div className="logotype" style={{ color: "var(--cream)" }}>
              <span className="sub" style={{ color: "rgba(197,163,90,0.45)", fontSize: "13px", marginBottom: "10px" }}>✦ · ✦</span>
              <span style={{ fontSize: "52px" }}>Saadi Mart</span>
              <span className="tel-sub" style={{ color: "var(--gold)", fontSize: "22px" }}>సాడీ మార్ట్</span>
              <span className="tag" style={{ color: "rgba(197,163,90,0.5)" }}>Every Rupee, Explained</span>
            </div>
            <div className="panel-lbl" style={{ color: "rgba(250,246,238,0.3)" }}>Saadi Mart · Dark</div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Slide5() {
  const swatches = [
    { bg: "#C5A35A", color: "#1A1410", n: "Kala Gold", h: "#C5A35A · Primary" },
    { bg: "#1A1410", color: "rgba(250,246,238,0.8)", n: "Weave Ink", h: "#1A1410 · Anchor" },
    { bg: "#FAF6EE", color: "#1A1410", n: "Silk Cream", h: "#FAF6EE · Base", border: "0.5px solid rgba(197,163,90,0.2)" },
    { bg: "#8B3A2A", color: "rgba(250,246,238,0.85)", n: "Handloom Rust", h: "#8B3A2A · Heritage" },
    { bg: "#E8D5A0", color: "#1A1410", n: "Temple Gold", h: "#E8D5A0 · Accent" },
    { bg: "#3D2E1E", color: "rgba(250,246,238,0.75)", n: "Zari Shadow", h: "#3D2E1E · Deep" },
  ];
  return (
    <section id="s5" className="slide" style={{ background: "var(--ivory)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">04 · Colour & Typography</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>The Palette of<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Honesty</em></div></div>
        <div className="s5-swatches reveal rd3">
          {swatches.map(s => (
            <div key={s.n} className="swatch" style={{ background: s.bg, color: s.color, border: s.border }}>
              <div className="sw-n">{s.n}</div>
              <div className="sw-h">{s.h}</div>
            </div>
          ))}
        </div>
        <div className="s5-type reveal rd4">
          <div>
            <div className="t-label">Display · Cormorant Garamond 300</div>
            <div className="t-specimen" style={{ fontSize: "52px" }}>Kalavé</div>
            <div className="t-specimen" style={{ fontSize: "52px", fontStyle: "italic", color: "var(--gold)" }}>Beauty</div>
            <div className="t-desc">All hero typography, brand name, editorial headings. Fine strokes, high contrast. Weight 300 only — never bold.</div>
          </div>
          <div>
            <div className="t-label">Telugu · Noto Serif Telugu 300</div>
            <div className="t-specimen" style={{ fontFamily: "'Noto Serif Telugu',serif", fontSize: "46px", color: "var(--gold)" }}>కలవే</div>
            <div className="t-specimen" style={{ fontFamily: "'Noto Serif Telugu',serif", fontSize: "28px", color: "var(--ink-soft)", marginTop: "8px" }}>సాడీ మార్ట్</div>
            <div className="t-desc">The Telugu calligraphic equal partner. Always in gold. The bilingual identity is non-negotiable — the Telugu name is not a translation, it is a co-original.</div>
          </div>
          <div>
            <div className="t-label">Body · Jost 200–300</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: "17px", fontWeight: 200, color: "var(--ink)", lineHeight: 1.75 }}>Every saree has a cost breakdown. You deserve to see it. Fabric. Making. Space. Our margin. Nothing hidden.</div>
            <div className="t-desc">All communication, pricing, and operational text. Weight 200–300. The contrast between Cormorant and Jost is the brand's visual personality.</div>
          </div>
          <div>
            <div className="t-label">Hierarchy in Use</div>
            <div style={{ padding: "32px", border: "0.5px solid var(--border)", background: "white" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px" }}>New Arrivals · Kanchipuram</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "32px", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1, marginBottom: "12px" }}>Pure Silk<br /><em style={{ color: "var(--gold)" }}>Pattu Saree</em></div>
              <div style={{ fontSize: "12px", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "16px" }}>Woven in Kanchipuram. Six yards of 120-count pure silk. Every thread, explained.</div>
              <div style={{ fontSize: "10px", fontWeight: 300, color: "var(--ink-soft)" }}>Starting at ₹12,400</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Slide6() {
  const cards = [
    {
      icon: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
      t: "The Price Board", d: "Transparent by design",
      b: "Every saree has a vertical price strip on its stand. Four lines. Fabric. Making. Store. Margin. The total is at the bottom. The breakdown is at the top. No customer has to ask."
    },
    {
      icon: <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
      t: "The Origin Wall", d: "Heritage as identity",
      b: "One wall carries the story of each weaving region. Dharmavaram. Kanchipuram. Gadwal. Pochampally. The woman knows the place before she touches the saree."
    },
    {
      icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
      t: "The Consultation Corner", d: "Respect as standard",
      b: "A seating area where a trained advisor explains the pricing of any saree in three minutes. The advisor never sells. She informs. The customer decides without pressure."
    },
    {
      icon: <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
      t: "The Gifting Experience", d: "Dignity in every detail",
      b: "Every saree is wrapped in cream Kalavé tissue with a calligraphed tag. The price breakdown is sealed inside, available if the buyer wants to share it. Premium without compromising privacy."
    },
    {
      icon: <svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
      t: "The Weave Catalogue", d: "Knowledge as loyalty",
      b: "A printed catalogue at billing shows each saree's journey from loom to shelf. The woman takes it home. It is the most useful communication the brand produces."
    },
    {
      icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
      t: "The Price Promise", d: "Accountability as brand value",
      b: "A framed statement on the checkout wall: 'If any competitor sells this weave for less than our declared fabric cost, we will buy it back at full price.' This is the brand identity made physical."
    },
  ];
  return (
    <section id="s6" className="slide" style={{ background: "var(--ink)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">05 · In-Store Experience</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", color: "var(--cream)", marginTop: "8px", marginBottom: "6px" }}>What Happens<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Inside</em></div></div>
        <div className="reveal rd3 body-text" style={{ maxWidth: "560px", color: "rgba(250,246,238,0.55)" }}>The store is not a showroom. It is a classroom. Every element makes a woman feel respected, informed, and in control.</div>
        <div className="s6-grid reveal rd4">
          {cards.map(c => (
            <div key={c.t} className="s6-card">
              <div className="s6-icon">{c.icon}</div>
              <div className="s6-t">{c.t}</div>
              <div className="s6-b">{c.b}</div>
              <div className="s6-d">{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function Slide7() {
  return (
    <section id="s7" className="slide" style={{ background: "var(--ivory)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">06 · The Price Tag</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>The Product That<br />Changes <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Everything</em></div></div>
        <div className="s7-layout reveal rd3">
          <div className="price-card">
            <div className="pc-hdr">
              <div className="pc-brand">Kalavé<span className="tel">కలవే</span></div>
              <div className="pc-product">Dharmavaram Pattu<br />Pure Silk · 6.2 Yards<br /><span style={{ color: "var(--gold)" }}>SKU KLV-2025-0041</span></div>
            </div>
            {[
              ["Fabric Cost (Loom Price)", "₹ 7,200"],
              ["Weaving & Finishing", "₹ 1,800"],
              ["Transport & Quality Check", "₹ 400"],
              ["Store & Staff Cost", "₹ 1,100"],
            ].map(([l, v]) => (
              <div key={l} className="pc-row"><span className="pc-lbl">{l}</span><span className="pc-val">{v}</span></div>
            ))}
            <div className="pc-row"><span className="pc-lbl" style={{ color: "var(--gold)" }}>Our Margin</span><span className="pc-val" style={{ color: "var(--gold)" }}>₹ 1,500 · 12%</span></div>
            <div className="pc-total">
              <span className="pc-total-lbl">You Pay</span>
              <span className="pc-total-val">₹ 12,000</span>
            </div>
            <div className="pc-footer">This is what you are paying for. Nothing more. Nothing hidden.<br /><span style={{ color: "var(--gold)" }}>Kalavé · The Art of Honest Beauty</span></div>
          </div>
          <div>
            <div className="tm-quote">No saree brand in India has ever shown you <em>this.</em></div>
            <div className="tm-body">This tag is the product. The saree is the reason to come. The tag is the reason to stay, return, and tell every woman she knows. Transparency is not a feature. It is the entire brand. The price breakdown is the advertisement.</div>
            <div className="tm-stats">
              <div><div className="st-num">12%</div><div className="st-lbl">Our declared margin. Published. Fixed. Honest.</div></div>
              <div><div className="st-num">4</div><div className="st-lbl">Lines that explain everything a woman wants to know.</div></div>
              <div><div className="st-num">0</div><div className="st-lbl">Hidden charges. Inflated prices. Vague markups.</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Slide8() {
  return (
    <section id="s8" className="slide" style={{ background: "var(--cream-deep)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">07 · Brand Voice</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>How <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Kalavé</em><br />Speaks</div></div>
        <div className="s8-grid reveal rd3">
          <div>
            <div className="v-ctx">Storefront · Signage</div>
            <div className="v-title">What Women Read Before They Enter</div>
            <div className="v-card">
              <div className="v-card-lbl">Store Entrance Line</div>
              <div className="v-card-text">Every saree here has a price tag that explains <em>itself.</em></div>
              <div className="v-card-note">No call to action. No urgency. No discount language. The brand states its premise and lets the woman decide. The most confident thing a brand can do.</div>
            </div>
            <div className="v-card">
              <div className="v-card-lbl">Window Communication</div>
              <div className="v-card-text">Fabric. Making. Store. Margin. <em>Total.</em><br />That is all we charge.</div>
              <div className="v-card-note">Five words then the brand promise. The format of the price tag becomes the format of the communication.</div>
            </div>
          </div>
          <div>
            <div className="v-ctx">Social Media · Digital</div>
            <div className="v-title">How the Brand Sounds Online</div>
            <div className="v-card">
              <div className="v-card-lbl">Instagram Caption</div>
              <div className="v-card-text">This Kanchipuram came from a third-generation loom. It cost ₹8,400 to make. We sell it for <em>₹10,200.</em> Here is why.</div>
              <div className="v-card-note">Every product post follows this format. Story, cost, price, reason. Radical transparency applied to social media.</div>
            </div>
            <div className="v-card">
              <div className="v-card-lbl">Staff · Standard Introduction</div>
              <div className="v-card-text">"This saree is ₹12,000. The fabric costs ₹7,200. Would you like to know <em>the rest?</em>"</div>
              <div className="v-card-note">Opens with fabric cost — the number that gives price context. This single change creates a fundamentally different buying experience.</div>
            </div>
          </div>
          <div>
            <div className="v-ctx">Print · Physical</div>
            <div className="v-title">What She Takes Home</div>
            <div className="v-card">
              <div className="v-card-lbl">Carry Bag · Inner Side</div>
              <div className="v-card-text">You paid what it cost to make, carry, and sell this saree. Plus our margin. That is it. Thank you for trusting <em>Kalavé.</em></div>
              <div className="v-card-note">The last thing the brand says. Confirms the purchase as informed trust, not retail transaction.</div>
            </div>
            <div className="v-card">
              <div className="v-card-lbl">Response to "Is this your best price?"</div>
              <div className="v-card-text">"Yes. Our margin is 12 percent on every saree. It is the <em>same for everyone.</em>"</div>
              <div className="v-card-note">The brand eliminates negotiation by making the margin public. The answer to bargaining is a fact.</div>
            </div>
          </div>
          <div>
            <div className="v-ctx">Telugu · WhatsApp</div>
            <div className="v-title">Saadi Mart's Vernacular Voice</div>
            <div className="v-card">
              <div className="v-card-lbl">WhatsApp Broadcast</div>
              <div className="v-card-text" style={{ fontFamily: "'Noto Serif Telugu',serif", fontSize: "18px", lineHeight: 1.7 }}>ఈ సాడీ ₹6,000 కి వస్తుంది.<br /><em>ఎందుకంటే ఇది మీకు చెప్తాం.</em></div>
              <div className="v-card-note">For Saadi Mart's intimate communication. The vernacular name demands a vernacular voice. Telugu first.</div>
            </div>
            <div className="v-card">
              <div className="v-card-lbl">Real Conversation Moment</div>
              <div className="v-card-text">"Amma, nenu oka saree store ki vacchanu. Vaallu price ki reason <em>cheptunnaru.</em>"</div>
              <div className="v-card-note">This is how Kalavé spreads. Not advertising. A daughter calling her mother from inside the store.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
function Slide9() {
  return (
    <section id="s9" className="slide" style={{ background: "var(--ivory)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">08 · Signage & Store Identity</div></div>
        <div className="reveal rd2"><div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>How the Brand<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Looks</em> in the World</div></div>
        <div className="s9-grid reveal rd3">
          <div>
            <div className="storefront">
              <div className="sf-name">Kalavé</div>
              <span className="sf-tel">కలవే</span>
              <div className="sf-rule" />
              <div className="sf-tag">The Art of Honest Beauty</div>
              <div className="sf-loc">Vijayawada · Andhra Pradesh</div>
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "center", marginTop: "16px" }}>Store Facade · Primary</div>
          </div>
          <div>
            <div className="storefront" style={{ background: "#2A1F14" }}>
              <div className="sf-name" style={{ fontSize: "46px" }}>Saadi Mart</div>
              <span className="sf-tel">సాడీ మార్ట్</span>
              <div className="sf-rule" />
              <div className="sf-tag">Every Rupee, Explained</div>
              <div className="sf-loc">Guntur · Andhra Pradesh</div>
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "center", marginTop: "16px" }}>Store Facade · Saadi Mart</div>
          </div>
          <div>
            <div className="bag-container">
              <div className="bag">
                <div className="bag-n">Kalavé</div>
                <div className="bag-t">కలవే</div>
                <div className="bag-l">The Art of Honest Beauty</div>
              </div>
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "center", marginTop: "16px" }}>Carry Bag · Kraft Paper</div>
          </div>
          <div>
            <div style={{ background: "var(--cream-deep)", border: "0.5px solid var(--border)", minHeight: "340px", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
              <div className="gift-tag">
                <div style={{ fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "18px" }}>Kalavé Gift Tag</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "32px", fontWeight: 300, color: "var(--ink)" }}>Kalavé</div>
                <div style={{ fontFamily: "'Noto Serif Telugu',serif", fontSize: "18px", color: "var(--gold)", marginTop: "6px" }}>కలవే</div>
                <div style={{ width: "36px", height: "0.5px", background: "rgba(197,163,90,0.5)", margin: "16px auto" }} />
                <div style={{ fontSize: "10px", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8 }}>Woven with honesty.<br />Priced with care.</div>
              </div>
            </div>
            <div style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--ink-soft)", textAlign: "center", marginTop: "16px" }}>Gift Tag · Ivory Stock</div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
function SlideSogasari() {
  const variants = [
    { suffix: "Sarees", tel: "సొగసరి చీరలు", reg: "Register: Traditional · Heritage · Pure Telugu", desc: "Uses Sarees in English alongside the Telugu name. Signals cultural pride. Clean and honest. The most straightforward expression of what the brand sells." },
    { suffix: "Mart", tel: "సొగసరి మార్ట్", reg: "Register: Accessible Premium · Same family as Saadi Mart", desc: "Follows the exact Saadi Mart architecture. Vernacular Telugu word plus Mart. The woman who shops at Saadi Mart shops at Sogasari Mart. Same family, different expression." },
    { suffix: "Co.", tel: "సొగసరి కో.", reg: "Register: Premium · Modern · D2C ready", desc: "The Co. suffix signals a modern, founder-led brand rather than a retail store. Works exceptionally well for digital and D2C expansion. Sogasari Co. can be an Instagram handle, a website, a label on a saree box." },
    { suffix: "Studio", tel: "సొగసరి స్టూడియో", reg: "Register: Curated · Boutique · Elevated", desc: "Studio signals curation, expertise, and a hands-on approach to saree retail. Not a mart, not a mall. A studio is where beautiful things are made and selected with intention. Elevated register for the premium tier." },
    { suffix: "Haat", tel: "సొగసరి హాట్", reg: "Register: Community · Folk · Trusted local market", desc: "Haat is the ancient Indian word for a weekly community market where honest, transparent commerce happens. Where farmers and weavers bring their goods directly. Sogasari Haat is the transparent pricing brand naming itself after the most honest form of Indian commerce." },
    { suffix: "Kendra", tel: "సొగసరి కేంద్ర", reg: "Register: Authoritative · Destination · Category anchor", desc: "Kendra means centre, the place everything flows toward. Sogasari Kendra is the destination brand — the place women in the city go for sarees the way they go to a specific doctor or a specific jeweller. Authority through destination status." },


  ];


  const tmItems = [
    { label: "Word Search", val: "Sogasari", desc: "No indexed trademark found for Sogasari in any class in Indian databases. Original word. Original territory." },
    { label: "Class 24 · Textiles", val: "Clear", desc: "No conflict found. Preliminary indication only. Confirm via live IPIndia search before filing.", green: true },
    { label: "Class 25 · Clothing", val: "Clear", desc: "No indexed conflict in clothing, sarees, or ethnic wear category. Clean trademark territory.", green: true },
    { label: "Class 35 · Retail", val: "Clear", desc: "No conflict in retail services. Recommended to file across all four classes simultaneously.", green: true },
  ];
  return (
    <section id="s10b" className="slide" style={{ background: "var(--cream-deep)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">09 · Third Name Candidate</div></div>
        <div className="reveal rd2">
          <div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>
            Sogasari<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>సొగసరి</em>
          </div>
        </div>
        <div className="reveal rd3 body-text" style={{ maxWidth: "620px", marginBottom: "48px" }}>
          Sogasari (సొగసరి) is a Telugu word that means one who is beautifully adorned, graceful in appearance, elegant by nature. It describes the woman, not the garment. It is the compliment a Telugu mother gives her daughter when she has dressed well. "Chala sogasari ga unnav" — you look beautifully adorned. That is the entire brand promise in one word.
        </div>
        <div className="reveal rd4">
          <div style={{ fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "28px" }}>Suffix Alternatives · Pick the register</div>
          <div className="sog-grid" style={{ marginBottom: "64px" }}>
  {variants.map((v, index) => (
    <div key={v.suffix} className="sog-card">
      
      <div className="sog-card-name">
  {index === 6 ? (
    <>
      Myva<br />
      <span>{v.suffix}</span>
    </>
  ) : (
    <>
      Sogasari<br />
      <span>{v.suffix}</span>
    </>
  )}
</div>

      <div className="sog-card-tel">{v.tel}</div>
      <div className="sog-card-reg">{v.reg}</div>
      <div className="sog-card-desc">{v.desc}</div>
      <div className="sog-tm-badge">TM Risk: Very Low</div>
    </div>
  ))}
</div>
          <div className="sog-tm-grid">
            {tmItems.map(t => (
              <div key={t.label}>
                <div className="sog-tm-label">{t.label}</div>
                <div className={t.green ? "sog-tm-clear" : "sog-tm-val"}>{t.val}</div>
                <div className="sog-tm-desc">{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "10px", fontWeight: 300, color: "var(--ink-soft)", marginTop: "12px", lineHeight: 1.7, padding: "0 4px" }}>Note: This is a preliminary web-indexed search, not a live IPIndia database clearance. Run the live search on quickcompany.in across Classes 16, 24, 25 and 35 before filing. All results here are indicative only and do not constitute legal advice.</div>
        </div>
      </div>
    </section>
  );
}



function SlideMyva() {
  const variants = [
    { suffix: "Mart", tel: "మైవా మార్ట్", reg: "Register: Authoritative · Destination · Category anchor", desc: "Myra Mart represents a modern yet approachable saree shopping destination. The name carries a graceful and stylish feminine feel, making it suitable for contemporary women while still remaining easy for family audiences to remember. ‘Mart’ adds instant retail familiarity and accessibility." },
    { suffix: "Silks", tel: "మైవా సిల్క్స్ ", },
    // { suffix: "Mart", tel: "In a world where fashion changes every season, Myva stands for something timeless — Value.", },
    // { suffix: "Mart", tel: "Myva is born from two powerful ideas:", },
    // { suffix: "Mart", tel: "My Vastra — the garment she wears.", },
    // { suffix: "Mart", tel: "My Value — the woman she is.", },
    //  { suffix: "Mart", tel: "Every drape at Myva is more than fabric.", },
    //  { suffix: "Mart", tel: "It is heritage woven with purpose, craftsmanship shaped by human hands, and elegance designed to reflect inner worth.", },
    //  { suffix: "Mart", tel: "Myva believes luxury is not loud.", },
    //  { suffix: "Mart", tel: "Luxury is meaningful.", },
    //  { suffix: "Mart", tel: "When a woman chooses Myva, she is not buying clothing — she is wearing her identity, her confidence, and her values.", },
    //  { suffix: "Mart", tel: "Myva — Wear Your Value.", },


  ];


  const tmItems = [
    { label: "Word Search", val: "Myva", desc: "No indexed trademark found for Myva in any class in Indian databases. Original word. Original territory." },
    { label: "Class 24 · Textiles", val: "Clear", desc: "No conflict found. Preliminary indication only. Confirm via live IPIndia search before filing.", green: true },
    { label: "Class 25 · Clothing", val: "Clear", desc: "No indexed conflict in clothing, sarees, or ethnic wear category. Clean trademark territory.", green: true },
    { label: "Class 35 · Retail", val: "Clear", desc: "No conflict in retail services. Recommended to file across all four classes simultaneously.", green: true },
  ];
  return (
    <section id="s10b" className="slide" style={{ background: "var(--cream-deep)", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="reveal rd1"><div className="label">09 · Fourth Name Candidate</div></div>
        <div className="reveal rd2">
          <div className="display" style={{ fontSize: "clamp(38px,5vw,66px)", marginTop: "8px", marginBottom: "6px" }}>
            Myva<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>మైవా</em>
          </div>
        </div>
        <div className="reveal rd3 body-text" style={{ maxWidth: "620px", marginBottom: "48px" }}>
          Myva (మైవా) is a Telugu word that means one who is beautifully adorned, graceful in appearance, elegant by nature. It describes the woman, not the garment. It is the compliment a Telugu mother gives her daughter when she has dressed well. "Chala myva ga unnav" — you look beautifully adorned. That is the entire brand promise in one word.
        </div>
        <div className="reveal rd4">
          <div style={{ fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "28px" }}>Suffix Alternatives · Pick the register</div>
          <div className="sog-grid" style={{ marginBottom: "64px" }}>
  {variants.map((v, index) => (
    <div key={v.suffix} className="sog-card">
      
      <div className="sog-card-name">
  {index === 6 ? (
    <>
      Myva<br />
      <span>{v.suffix}</span>
    </>
  ) : (
    <>
      Myva<br />
      <span>{v.suffix}</span>
    </>
  )}
</div>

      <div className="sog-card-tel">{v.tel}</div>
      {/* <div className="sog-card-reg">{v.reg}</div>
      <div className="sog-card-desc">{v.desc}</div> */}
      <div className="sog-tm-badge">TM Risk: Very Low</div>
    </div>
  ))}
</div>
          <div className="sog-tm-grid">
            {tmItems.map(t => (
              <div key={t.label}>
                <div className="sog-tm-label">{t.label}</div>
                <div className={t.green ? "sog-tm-clear" : "sog-tm-val"}>{t.val}</div>
                <div className="sog-tm-desc">{t.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "10px", fontWeight: 300, color: "var(--ink-soft)", marginTop: "12px", lineHeight: 1.7, padding: "0 4px" }}>Note: This is a preliminary web-indexed search, not a live IPIndia database clearance. Run the live search on quickcompany.in across Classes 16, 24, 25 and 35 before filing. All results here are indicative only and do not constitute legal advice.</div>
        </div>
      </div>
    </section>
  );
}





 
function Slide10() {
  return (
    <section id="s10" className="slide" style={{ background: "var(--ink)", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1150px", margin: "0 auto" }}>
        <div className="tl-eye anim-1">The Brand Promise</div>
        <div className="tl-main anim-2">The art of knowing<br />what you <em>pay for.</em></div>
        <div className="tl-sub anim-3">Kalavé · Saadi Mart · Kalanikethan 2025</div>
        <div className="tl-duo anim-4">
          <div>
            <div className="tl-item-n">Kalavé</div>
            <div className="tl-item-l">The art of honest beauty.</div>
          </div>
          <div className="tl-sep" />
          <div>
            <div className="tl-item-n">Saadi Mart</div>
            <div className="tl-item-l">Every rupee, explained.</div>
          </div>
          <div className="tl-sep" />
          <div>
            <div className="tl-item-n">Sogasari</div>
            <div className="tl-item-l">She who is beautifully adorned.</div>
          </div>
          <div className="tl-sep" />
          <div>
            <div className="tl-item-n">Myva</div>
            {/* <div className="tl-item-l">She who is beautifully adorned.</div> */}
          </div>
          <div className="tl-sep" />
          <div>
            <div className="tl-item-n">Myva Vastra</div>
            {/* <div className="tl-item-l">She who is beautifully adorned.</div> */}
          </div>
          <div className="tl-sep" /><div>
            <div className="tl-item-n">Myva Value</div>
            {/* <div className="tl-item-l">She who is beautifully adorned.</div> */}
          </div>

          
          
        </div>
      </div>
    </section>
  );
}
 
function Slide11() {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: "", designation: "", email: "", remarks: "" });
  const [confData, setConfData] = useState({ name: "", names: "", ref: "" });
 
  const pills = [
    { name: "Kalavé", tel: "కలవే" },
    { name: "Saadi Mart", tel: "సాడీ మార్ట్" },
    { name: "Sogasari Mart", tel: "సొగసరి మార్ట్" },
    // { name: "Sogasari Co.", tel: "సొగసరి కో." },
    { name: "Myva", tel: "మైవా" },
    // { name: "All Three Names", tel: "మూడూ అంగీకారం" },
  ];
 
  function toggleName(pillName: string) {
    if (pillName === "All Three Names") {
      setSelectedNames(["Kalavé", "Saadi Mart", "Sogasari Mart"]);
    } else {
      setSelectedNames(prev => {
        const filtered = prev.filter(n => n !== "Kalavé" || pillName === "Kalavé")
          .filter(n => n !== "Saadi Mart" || pillName === "Saadi Mart")
          .filter(n => n !== "Sogasari Mart" || pillName === "Sogasari Mart")
          .filter(n => n !== "Sogasari Co." || pillName === "Sogasari Co.");
        const withoutAll = prev.filter(n => n !== "All Three Names");
        if (withoutAll.includes(pillName)) {
          return withoutAll.filter(n => n !== pillName);
        } else {
          return [...withoutAll, pillName];
        }
      });
    }
    setShowForm(true);
  }
 
  function isSelected(pillName: string) {
    if (pillName === "All Three Names") {
      return selectedNames.includes("Kalavé") && selectedNames.includes("Saadi Mart") && selectedNames.includes("Sogasari Mart") && selectedNames.length === 3;
    }
    return selectedNames.includes(pillName);
  }
 
  function submitApproval() {
    if (!form.name || !form.email) { alert("Please enter your name and email address to proceed."); return; }
    const namesStr = selectedNames.join(" and ");
    const ref = "KLN-" + Date.now().toString(36).toUpperCase();
    const subject = encodeURIComponent("Name Approval: " + namesStr + " — Kalanikethan | " + ref);
    const body = encodeURIComponent(
      "Brand Name Approval — Kalanikethan\n===============================\n\n" +
      "Approved by: " + form.name + "\nDesignation: " + (form.designation || "Not specified") +
      "\nEmail: " + form.email + "\nReference: " + ref + "\n\nApproved Name(s): " + namesStr +
      "\n\nRemarks:\n" + (form.remarks || "None") + "\n\n---\nSubmitted via Kalanikethan Brand Presentation\nMagsmen Brand Consultants · connect@magsmen.com"
    );
    window.location.href = "mailto:connect@magsmen.com?cc=" + encodeURIComponent(form.email) + "&subject=" + subject + "&body=" + body;
    setConfData({ name: form.name, names: namesStr, ref });
    setShowForm(false);
    setShowConfirm(true);
  }
 
  return (
    <section id="s11" className="slide" style={{ background: "var(--ivory)", alignItems: "center", justifyContent: "center", padding: "100px 80px" }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <div className="label anim-1" style={{ marginBottom: "20px" }}>12 · Name Approval</div>
        <div className="ap-title anim-2">Approve the<br /><em>Brand Names</em></div>
        <div className="ap-body anim-3">Select the names you would like to move forward with. Once approved, our team at Magsmen will immediately begin the trademark screening and identity development process.</div>
        {!showConfirm && (
          <div className="ap-names anim-4">
            {pills.map(p => (
              <div key={p.name} className={"ap-name-pill" + (isSelected(p.name) ? " selected" : "")} onClick={() => toggleName(p.name)}>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px" }}>{p.name}</div>
                  <div className="ap-name-tel">{p.tel}</div>
                </div>
                <span className="check">✓</span>
              </div>
            ))}
          </div>
        )}
        {showForm && !showConfirm && (
          <div className="ap-form anim-4">
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 400, color: "var(--ink)", marginBottom: "6px" }}>Complete Your Approval</div>
            <div className="selected-names-label">Selected: {selectedNames.join(" + ")}</div>
            <input className="ap-input" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input className="ap-input" placeholder="Your designation" value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} />
            <input className="ap-input" type="email" placeholder="Your email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <textarea className="ap-input" placeholder="Any remarks or notes (optional)" rows={3} style={{ resize: "none" }} value={form.remarks} onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))} />
            <div className="ap-note">By clicking Approve, you confirm that Kalanikethan authorises Magsmen Brand Consultants to proceed with trademark screening and identity development for the selected name(s). A confirmation will be sent to connect@magsmen.com and to your email address.</div>
            <button className="ap-submit" onClick={submitApproval}>Approve & Notify Magsmen →</button>
          </div>
        )}
        {showConfirm && (
          <div className="ap-confirm anim-4">
            <div className="ap-confirm-icon">✦</div>
            <div className="ap-confirm-title">Approval Confirmed</div>
            <div className="ap-confirm-body">
              Thank you, <span className="ap-confirm-gold">{confData.name}</span>.<br /><br />
              Your approval for <span className="ap-confirm-gold">{confData.names}</span> has been received. The Magsmen team has been notified at connect@magsmen.com and will reach out within one business day to confirm next steps.<br /><br />
              <span style={{ fontSize: "11px", opacity: 0.6 }}>Approval reference: {confData.ref}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


function Slide12() {
  const taglineData = [
    { sub: "Trust & Value", en: "Trusted Quality • Fair Price", tel: "నమ్మకమైన నాణ్యత • న్యాయమైన ధర" },
    { sub: "Superior Integrity", en: "Better Quality • True Price", tel: "మెరుగైన నాణ్యత • నిజమైన ధర" },
    { sub: "Authentic Heritage", en: "Quality Sarees • Fair Prices", tel: "నాణ్యమైన చీరలు • న్యాయమైన ధరలు" },
    { sub: "Artistic Economy", en: "Artistic Sarees • Accessible Prices", tel: "కళాత్మక చీరలు • కలిసివచ్చే ధరలు" },
     { sub: "Artistic Economy", en: "Artistic Sarees • Affordable Prices", tel: "కళాత్మక చీరలు • కొనదగిన ధరలు" }
  ];

  return (
    <section id="taglines" className="slide">
      <div className="container">
        <div className="reveal">
          <p className="label">10 · Verbal Identity</p>
          <h2 className="display">The Voice of <em style={{color: 'var(--gold)', fontStyle: 'italic'}}>Truth</em></h2>
          
          <div className="tag-grid">
            {taglineData.map((tag, i) => (
              <div key={i} className="tag-box">
                <p className="tag-sub-label">{tag.sub}</p>
                <h3 className="tag-en">{tag.en}</h3>
                <p className="tag-tel">{tag.tel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// function Slide12() {
//   const taglines = [
//     { en: "Art Woven Into Being", tel: "కళగా మారిన నేత", sub: "Core Brand Mantra" },
//     { en: "Every Rupee, Explained", tel: "ప్రతి రూపాయికీ ఒక వివరణ", sub: "The Transparency Promise" },
//     { en: "The Word Women Actually Use", tel: "మహిళల మనసులోని మాట", sub: "Vernacular Strength" },
//     { en: "The Art of Honest Beauty", tel: "నిజాయితీ కలిగిన అందం", sub: "Premium Positioning" }
//   ];

//   return (
//     <section id="taglines" className="slide">
//       <div className="reveal">
//         <div className="label">02 · Verbal Identity</div>
//         <h2 className="display" style={{fontSize: '50px', marginTop: '10px'}}>The Voice of <em style={{color: 'var(--gold)'}}>Truth</em></h2>
//         <div className="tag-grid">
//           {taglines.map((tag, i) => (
//             <div key={i} className="tag-box">
//               <p className="tag-sub">{tag.sub}</p>
//               <h3 className="tag-title">{tag.en}</h3>
//               <span className="tag-tel-big">{tag.tel}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



 
function Footer() {
  return (
    <footer className="kl-footer">
      <div className="footer-logo-text">
        <img 
              src={logo2} 
              alt="Grofession Logo" 
              className="footer-logo-img h-18 w-32 object-contain" 
            />
      </div>
      <div className="footer-info">
        Confidential Brand Presentation · Kalanikethan 2025<br />
        Prepared by Magsmen Brand Consultants<br />
        Not for distribution · All rights reserved
      </div>
    </footer>
  );
}


 
export default function KalaniketanBrandCreation() {
  useReveal();
 
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
 
  return (
    <>
      <style>{css}</style>
      <nav className="kl-nav">
        <div className="nav-logo-text">
        <img 
              src={logo} 
              alt="Grofession Logo" 
              className="footer-logo-img h-18 w-36 object-contain" 
            />
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#s1" onClick={e => { e.preventDefault(); scrollTo("s1"); }}>Overview</a>
            <a href="#s2" onClick={e => { e.preventDefault(); scrollTo("s2"); }}>Names</a>
            <a href="#s6" onClick={e => { e.preventDefault(); scrollTo("s6"); }}>In-Store</a>
            <a href="#s8" onClick={e => { e.preventDefault(); scrollTo("s8"); }}>Voice</a>
            <a href="#s10b" onClick={e => { e.preventDefault(); scrollTo("s10b"); }}>Sogasari</a>
            <a href="#s11" onClick={e => { e.preventDefault(); scrollTo("s11"); }}>Approve</a>
            <a href="#s12" onClick={e => { e.preventDefault(); scrollTo("taglines"); }}>Taglines</a>
          </div>
          <button className="nav-approve-btn" onClick={() => scrollTo("s11")}>Approve Names</button>
        </div>
      </nav>
      <div className="deck" style={{ paddingTop: 0 }}>
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
        <Slide6 />
        <Slide7 />
        <Slide8 />
        <Slide9 />
        <SlideSogasari />
        <SlideMyva />
        <Slide10 />
        <Slide11 />
        <Slide12 />
        <Footer />
      </div>
    </>
  );
}