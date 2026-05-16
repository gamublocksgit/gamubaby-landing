// Gamu Baby — landing page
// All sections composed here. Copy comes from window.COPY (en/ja).

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "en",
  "accent": "#c08594",
  "showBrushes": true,
  "phoneTilt": true
}/*EDITMODE-END*/;

const ACCENTS = {
  rose:    { primary: "#c08594", deep: "#a76b7c", soft: "#e7c8d0" },
  sage:    { primary: "#7d9c7a", deep: "#5e7a5b", soft: "#cdd9c5" },
  lav:     { primary: "#9c8ab8", deep: "#7a6995", soft: "#ddd2e6" },
  butter:  { primary: "#c4a85a", deep: "#9b8748", soft: "#ece1b5" },
};

// ────────────────────────────────────────────────────────────────
// Tiny inline icons (no copyrighted glyphs — simple stroked shapes)
// ────────────────────────────────────────────────────────────────
const Icon = {
  Play: () => (
    <svg className="play" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M5 3.5v17L20 12 5 3.5z"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="2"/>
      <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="3" width="12" height="18" rx="3"/>
      <path d="M11 17h2"/>
    </svg>
  ),
  NoCloud: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 18h10a4 4 0 0 0 .4-7.98A5 5 0 0 0 8 9"/>
      <path d="M4 4l16 16"/>
    </svg>
  ),
  Hand: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V11"/>
      <path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11"/>
      <path d="M14 11V6a1.5 1.5 0 0 1 3 0v9a6 6 0 0 1-12 0v-2l-1.5-2a1.2 1.2 0 0 1 1.8-1.6L8 12"/>
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 8h.01M11 12h1v5h1"/>
    </svg>
  ),
};

// Decorative brush stripes (used in section headers & hero)
function Brushes({ rotate = -4, top = 0, palette = ["r","s","l","b"], compact = false }) {
  const heights = [42, 38, 44, 36];
  const widths = [78, 96, 86, 70];
  const offsets = [0, -6, 18, 6];
  const tops = compact ? [0, 40, 80, 120] : [0, 56, 116, 176];
  return (
    <div className="hero-brushes" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      {palette.map((p, i) => (
        <div key={i} className={`brush ${p}`}
          style={{
            height: heights[i % heights.length],
            width: widths[i % widths.length] + "%",
            top: top + tops[i % tops.length],
            left: offsets[i % offsets.length] + "%",
          }}/>
      ))}
    </div>
  );
}

// Small drifting noise-chips (echo of the screenshot decoration)
function Chips({ count = 8, palette = ["#e7c8d0","#d3decb","#ddd2e6","#ece1b5","#d1e0e8"] }) {
  const seeded = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: Math.round((i * 173) % 100),
        y: Math.round(((i * 91) + 30) % 100),
        s: 14 + ((i * 7) % 18),
        r: ((i * 47) % 90) - 45,
        c: palette[i % palette.length],
      });
    }
    return arr;
  }, [count]);
  return (
    <div className="chips" aria-hidden="true">
      {seeded.map((c, i) => (
        <span key={i} className="chip" style={{
          left: c.x + "%", top: c.y + "%",
          width: c.s, height: c.s,
          background: c.c, transform: `rotate(${c.r}deg)`,
        }}/>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Nav
// ────────────────────────────────────────────────────────────────
function Nav({ t, lang, setLang }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#" className="brand">
          <span className="brand-mark" aria-hidden="true"></span>
          <span>Gamu Baby</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href="#features">{t.nav.features}</a>
          <a href="#privacy">{t.nav.privacy}</a>
          <a href="#pro">{t.nav.pro}</a>
        </nav>
        <div className="nav-right">
          <div className="lang" aria-label="Language">
            <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Language">
              <option value="en">EN</option>
              <option value="ja">日本語</option>
              <option value="pt">PT</option>
              <option value="es">ES</option>
              <option value="ko">한국어</option>
            </select>
          </div>
          <a className="btn btn-primary hide-sm" href="https://play.google.com/store/apps/details?id=com.gamublocks.gamubaby">
            <Icon.Play/> {t.nav.get}
          </a>
        </div>
      </div>
    </header>
  );
}

// ────────────────────────────────────────────────────────────────
// Hero
// ────────────────────────────────────────────────────────────────
function Hero({ t, showBrushes }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            {showBrushes && <Brushes rotate={-5} top={-30} palette={["r","s","l","b"]}/>}
            <span className="eyebrow" style={{position:"relative",zIndex:2}}>{t.hero.eyebrow}</span>
            <h1 style={{marginTop:18}}>{t.hero.h1}</h1>
            <p className="lead">{t.hero.sub}</p>
            <div className="hero-cta-row">
              <a className="btn btn-primary" href="https://play.google.com/store/apps/details?id=com.gamublocks.gamubaby">
                <Icon.Play/> {t.hero.primary}
              </a>
              <a className="btn btn-ghost" href="#features">
                {t.hero.secondary}
              </a>
            </div>
            <div className="trust" aria-label="Trust strip">
              {t.hero.trust.map((x, i) => (
                <span key={i}>
                  {i > 0 && <span className="dot" aria-hidden="true"></span>}
                  {x}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <span className="blob rose" aria-hidden="true"></span>
            <span className="blob sage" aria-hidden="true"></span>
            <div className="phone-stack">
              <div className="phone p1">
                <img src="assets/04-journey.png" alt="Gamu Baby Journey timeline screen"/>
              </div>
              <div className="phone p2">
                <img src="assets/01-milestones.png" alt="Gamu Baby milestone home screen"/>
              </div>
            </div>
            <Chips count={6}/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// First-value: three steps
// ────────────────────────────────────────────────────────────────
function FirstValue({ t }) {
  return (
    <section id="get-started" style={{paddingTop:40}}>
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{t.first.eyebrow}</span>
          <h2 style={{marginTop:14}}>{t.first.h2}</h2>
          <p className="lead">{t.first.sub}</p>
        </div>
        <div className="steps">
          {t.first.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{i+1}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="timing"><span className="timing-dot"/>{s.time}</div>
            </div>
          ))}
        </div>
        <div className="under-minute">— {t.first.cta}</div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Feature proof cards
// ────────────────────────────────────────────────────────────────
function Features({ t }) {
  const cards = t.feat.cards;
  // Layout map: which card goes where in 12-col grid
  const renderCard = (c, idx, klass) => (
    <article className={`feat ${klass}`} key={idx}>
      <div className="feat-body">
        <div className="feat-tag">{c.tag}</div>
        <h3>{c.t}</h3>
        <p>{c.d}</p>
        <div className="pill-row">
          {c.pills.map((p, i) => <span className="pill" key={i}><span className="sw"/> {p}</span>)}
        </div>
      </div>
      <FeatVisual idx={idx} card={c}/>
    </article>
  );
  return (
    <section id="features">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{t.feat.eyebrow}</span>
          <h2 style={{marginTop:14}}>{t.feat.h2}</h2>
          <p className="lead">{t.feat.sub}</p>
        </div>
        <div className="features">
          {renderCard(cards[0], 0, "feat-1")}
          {renderCard(cards[1], 1, "feat-2")}
          {renderCard(cards[2], 2, "feat-3")}
          {renderCard(cards[3], 3, "feat-4")}
          {renderCard(cards[4], 4, "feat-5")}
          {renderCard(cards[5], 5, "feat-6")}
          {renderCard(cards[6], 6, "feat-7")}
          {renderCard(cards[7], 7, "feat-1")}
        </div>
      </div>
    </section>
  );
}

function FeatVisual({ idx, card }) {
  if (card.img) {
    return (
      <div className="shot">
        <img src={card.img} alt=""/>
      </div>
    );
  }
  if (idx === 5) { // Pediatrician PDF
    return (
      <div className="shot" style={{minHeight:340}}>
        <div className="pdf-mock">
          <span className="stamp">For Dr.</span>
          <div className="ph-h"/>
          <div className="ph-sub"/>
          <div className="row"><span className="dot"/><span className="ln"/></div>
          <div className="row"><span className="dot" style={{background:"var(--sage-soft)"}}/><span className="ln"/></div>
          <div className="row"><span className="dot" style={{background:"var(--lav-soft)"}}/><span className="ln"/></div>
          <div className="row"><span className="dot"/><span className="ln s"/></div>
          <div className="row"><span className="dot" style={{background:"var(--butter-soft)"}}/><span className="ln"/></div>
          <div className="row"><span className="dot" style={{background:"var(--sky-soft)"}}/><span className="ln s"/></div>
        </div>
      </div>
    );
  }
  if (idx === 6) { // Year in Review
    return (
      <div className="shot" style={{minHeight:340}}>
        <div className="pdf-mock year">
          <span className="stamp">Year 1</span>
          <div className="ph-h" style={{width:"75%"}}/>
          <div className="ph-sub"/>
          <div className="row"><span className="dot" style={{background:"var(--butter-soft)"}}/><span className="ln"/></div>
          <div className="row"><span className="dot" style={{background:"var(--rose-soft)"}}/><span className="ln s"/></div>
          <div className="row"><span className="dot" style={{background:"var(--sage-soft)"}}/><span className="ln"/></div>
          <div className="row"><span className="dot" style={{background:"var(--lav-soft)"}}/><span className="ln"/></div>
          <div className="row"><span className="dot" style={{background:"var(--sky-soft)"}}/><span className="ln s"/></div>
        </div>
      </div>
    );
  }
  // Backup / restore
  return (
    <div className="shot" style={{minHeight:340}}>
      <div className="backup-mock">
        <div className="h">Backup &amp; restore</div>
        <div className="opt">
          <div>
            <div className="lbl">Export backup</div>
            <div className="sub">.gamu file · stays on your phone</div>
          </div>
          <div className="ic">↓</div>
        </div>
        <div className="opt">
          <div>
            <div className="lbl">Restore from file</div>
            <div className="sub">One-tap restore on new device</div>
          </div>
          <div className="ic s">↑</div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Privacy
// ────────────────────────────────────────────────────────────────
function Privacy({ t }) {
  return (
    <section id="privacy" className="privacy">
      <div className="wrap">
        <div className="privacy-grid">
          <div>
            <span className="eyebrow">{t.privacy.eyebrow}</span>
            <h2 style={{marginTop:14}}>{t.privacy.h2}</h2>
            <p className="lead" style={{marginTop:18}}>{t.privacy.sub}</p>
            <div className="priv-list">
              {t.privacy.items.map((it, i) => (
                <div className="priv-item" key={i}>
                  <div className="priv-icon">
                    {i === 0 && <Icon.Phone/>}
                    {i === 1 && <Icon.Hand/>}
                    {i === 2 && <Icon.NoCloud/>}
                    {i === 3 && <Icon.Lock/>}
                  </div>
                  <div>
                    <div className="ttl">{it.t}</div>
                    <div className="desc">{it.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="privacy-visual">
            <div className="lock-card">
              <span className="badge"><Icon.Lock/> {t.privacy.card.badge}</span>
              <h3>{t.privacy.card.h}</h3>
              <p className="desc">{t.privacy.card.d}</p>
              <div className="meta">
                {t.privacy.card.meta.map((m, i) => (
                  <div className="cell" key={i}>
                    <div className="k">{m.k}</div>
                    <div className="v">{m.v}</div>
                  </div>
                ))}
              </div>
              <div className="never">
                {t.privacy.card.never.map((n, i) => (
                  <div key={i}>— <b>{n}</b></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Caregiver invite
// ────────────────────────────────────────────────────────────────
function Caregiver({ t }) {
  return (
    <section id="caregiver">
      <div className="wrap">
        <div className="care-grid">
          <div>
            <span className="eyebrow">{t.care.eyebrow}</span>
            <h2 style={{marginTop:14}}>{t.care.h2}</h2>
            <p className="lead" style={{marginTop:18}}>{t.care.sub}</p>
            <div className="care-disclaim">
              <Icon.Info/>
              <div>{t.care.disclaim}</div>
            </div>
          </div>
          <div className="qr-card">
            <div className="qr">
              <QRGlyph/>
            </div>
            <div className="ttl">{t.care.qrTitle}</div>
            <div className="sub">{t.care.qrSub}</div>
            <div className="row">
              <a className="btn btn-rose" href="#">{t.care.qrBtnPrimary}</a>
              <a className="btn btn-ghost" href="#">{t.care.qrBtnSecondary}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Deterministic QR-like glyph (decorative; not a real QR code)
function QRGlyph() {
  const grid = 13;
  const cells = [];
  // Pseudo random pattern, seeded
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      const seed = (r*7 + c*13 + r*c) % 19;
      const on = seed > 8;
      cells.push({ r, c, on });
    }
  }
  // Corner anchors
  const anchor = (cx, cy) => (
    <g key={`a${cx}${cy}`}>
      <rect x={cx} y={cy} width="3" height="3" rx=".3" fill="currentColor"/>
      <rect x={cx+0.5} y={cy+0.5} width="2" height="2" rx=".15" fill="#fbf8f1"/>
      <rect x={cx+1} y={cy+1} width="1" height="1" rx=".1" fill="currentColor"/>
    </g>
  );
  return (
    <svg viewBox={`0 0 ${grid} ${grid}`} style={{color:"#2f2620"}}>
      {cells.map(({r,c,on}) => {
        // skip cells under corner anchors
        const inCorner = (r<3&&c<3) || (r<3&&c>=grid-3) || (r>=grid-3&&c<3);
        if (inCorner || !on) return null;
        return <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" rx=".15" fill="currentColor"/>;
      })}
      {anchor(0,0)}
      {anchor(grid-3,0)}
      {anchor(0,grid-3)}
    </svg>
  );
}

// ────────────────────────────────────────────────────────────────
// Pro
// ────────────────────────────────────────────────────────────────
function Pro({ t }) {
  return (
    <section id="pro" className="pro">
      <div className="wrap">
        <div className="pro-grid">
          <div>
            <span className="eyebrow">{t.pro.eyebrow}</span>
            <h2 style={{marginTop:14}}>{t.pro.h2}</h2>
            <p className="lead" style={{marginTop:18,color:"#d6c8b8"}}>{t.pro.sub}</p>
            <div style={{marginTop:28}}>
              <a className="btn btn-rose" href="https://play.google.com/store/apps/details?id=com.gamublocks.gamubaby">
                <Icon.Play/> {t.pro.cta}
              </a>
            </div>
          </div>
          <div className="price-card">
            <ul className="pro-feat">
              {t.pro.feat.map((f, i) => (
                <li key={i}><Icon.Check/> <span>{f}</span></li>
              ))}
            </ul>
            <div className="pro-note">{t.pro.note}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Final CTA
// ────────────────────────────────────────────────────────────────
function FinalCTA({ t, showBrushes }) {
  return (
    <section className="final">
      <div className="wrap" style={{position:"relative"}}>
        {showBrushes && (
          <div style={{position:"absolute",inset:"-30px 0 auto 0",height:200,pointerEvents:"none",opacity:.7}} aria-hidden="true">
            <Brushes rotate={-3} top={0} palette={["r","b","s","l"]} compact={true}/>
          </div>
        )}
        <h2 style={{position:"relative",zIndex:2}}>{t.final.h2}</h2>
        <p className="lead">{t.final.sub}</p>
        <a className="btn btn-primary" href="https://play.google.com/store/apps/details?id=com.gamublocks.gamubaby">
          <Icon.Play/> {t.final.primary}
        </a>
        <div className="reass">{t.final.reass}</div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Footer
// ────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <div className="brand" style={{marginBottom:8}}>
            <span className="brand-mark" aria-hidden="true"></span>
            <span>Gamu Baby</span>
          </div>
          <p>{t.foot.tag}</p>
          <p style={{marginTop:6}}>{t.foot.copy}</p>
        </div>
        <div className="foot-links">
          <a href={t.foot.moreHref} target="_blank" rel="noopener noreferrer">{t.foot.moreLabel}</a>
          {t.foot.links.map((l, i) => <a key={i} href="#">{l}</a>)}
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────────
// App
// ────────────────────────────────────────────────────────────────
function App() {
  const [tweak, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const lang = tweak.lang;
  const t = COPY[lang] || COPY.en;
  const accentKey = Object.keys(ACCENTS).find(k => ACCENTS[k].primary === tweak.accent) || tweak.accent;
  const accent = ACCENTS[accentKey] || ACCENTS.rose;

  // Apply accent + lang attrs at document level
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty("--rose", accent.primary);
    document.documentElement.style.setProperty("--rose-deep", accent.deep);
    document.documentElement.style.setProperty("--rose-soft", accent.soft);
  }, [lang, accent]);

  const setLang = (l) => setTweak("lang", l);

  return (
    <React.Fragment>
      <Nav t={t} lang={lang} setLang={setLang}/>
      <Hero t={t} showBrushes={tweak.showBrushes}/>
      <FirstValue t={t}/>
      <Features t={t}/>
      <Privacy t={t}/>
      <Pro t={t}/>
      <FinalCTA t={t} showBrushes={tweak.showBrushes}/>
      <Footer t={t}/>

      <TweaksPanel>
        <TweakSection label="Language"/>
        <TweakSelect label="Language" value={tweak.lang}
          options={[
            { value: "en", label: "English" },
            { value: "ja", label: "日本語" },
            { value: "pt", label: "Português" },
            { value: "es", label: "Español" },
            { value: "ko", label: "한국어" },
          ]}
          onChange={(v) => setTweak("lang", v)}/>
        <TweakSection label="Look"/>
        <TweakColor label="Accent"
          value={accent.primary}
          options={Object.values(ACCENTS).map(a => a.primary)}
          onChange={(v) => setTweak("accent", v)}/>
        <TweakToggle label="Watercolor brushes"
          value={tweak.showBrushes}
          onChange={(v) => setTweak("showBrushes", v)}/>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
