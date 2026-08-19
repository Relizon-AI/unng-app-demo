// unng-atoms.jsx — Shared building blocks used across screens
// Loads after unng-icons.jsx; expects window.Icon

const C = {
  pri: '#0E5F4D', pri50: '#EAF5F1', gold: '#CBA135', ink: '#15231F',
  slate: '#5D6B66', surf: '#F7F8F6', white: '#FFFFFF',
  danger: '#B42318', success: '#0A7A4F', info: '#2563EB', border: '#E6E8E5',
};

// ── A consistent placeholder block (solid color w/ initials/category) ─
const palette = [
  { bg: '#0E5F4D', label: 'Community' },
  { bg: '#1F4D8A', label: 'Workshop' },
  { bg: '#8C6E1F', label: 'Gala' },
  { bg: '#7A2E5C', label: 'Mentorship' },
  { bg: '#3E5D2A', label: 'Outreach' },
  { bg: '#A04A1F', label: 'Fundraiser' },
  { bg: '#2A6F8A', label: 'Panel' },
  { bg: '#5D2E7A', label: 'Networking' },
];
const Img = ({ idx = 0, label, height = 140, radius = 12, initials, full = false, style = {} }) => {
  const p = palette[idx % palette.length];
  const txt = initials || (label || p.label);
  return (
    <div className="unng-img" style={{
      background: p.bg, height, borderRadius: full ? 0 : radius,
      width: '100%', textTransform: 'uppercase', fontSize: 11, ...style,
    }}>
      <span style={{ opacity: 0.85, padding: '0 12px', textAlign: 'center' }}>{txt}</span>
    </div>
  );
};

// ── Avatar (solid color block w/ initials) ─
const Avatar = ({ name = 'A', size = 40, idx = 0 }) => {
  const p = palette[idx % palette.length];
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: p.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.38, flexShrink: 0,
    }}>{initials}</div>
  );
};

// ── Top bar ───────────────────────────────────────────────
const TopBar = ({ title, back, action, solid = false, large = false }) => (
  <>
    <div className={`unng-bar ${solid ? 'solid' : ''}`}>
      {back ? (
        <button className="unng-bar-back" onClick={back}><Icon name="chev-l" size={22}/></button>
      ) : <div style={{ width: 36 }}/>}
      {!large && <div className="unng-bar-title">{title}</div>}
      {action ? (
        action.label ? <button className="unng-bar-action text" onClick={action.onClick}>{action.label}</button>
        : <button className="unng-bar-action" onClick={action.onClick}><Icon name={action.icon} size={22}/></button>
      ) : <div style={{ width: 36 }}/>}
    </div>
    {large && <div className="unng-large-title">{title}</div>}
  </>
);

// ── Bottom Tabs ───────────────────────────────────────────
const TABS = [
  { id: 'home', label: 'Home', icon: 'home', iconF: 'home-fill' },
  { id: 'events', label: 'Events', icon: 'cal', iconF: 'cal-fill' },
  { id: 'donate', label: 'Donate', icon: 'heart', iconF: 'heart-fill' },
  { id: 'forums', label: 'Forums', icon: 'chat', iconF: 'chat-fill' },
  { id: 'profile', label: 'Profile', icon: 'user', iconF: 'user-fill' },
];

const BottomTabs = ({ active = 'home', onChange = () => {} }) => (
  <div className="unng-tabs">
    {TABS.map(t => {
      const on = active === t.id;
      return (
        <button key={t.id} className={`unng-tab ${on ? 'active' : ''}`} onClick={() => onChange(t.id)}>
          <Icon name={on ? t.iconF : t.icon} size={24} color={on ? C.pri : C.slate}/>
          <span className="lbl">{t.label}</span>
        </button>
      );
    })}
  </div>
);

// ── Search bar ────────────────────────────────────────────
const SearchBar = ({ placeholder = 'Search', value = '', onChange = () => {}, onFilter }) => (
  <div style={{ display: 'flex', gap: 8, padding: '4px 16px 8px' }}>
    <div style={{
      flex: 1, height: 44, background: '#fff', borderRadius: 12,
      border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center',
      padding: '0 12px', gap: 8,
    }}>
      <Icon name="search" size={18} color={C.slate}/>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, border: 0, background: 'transparent', outline: 'none', fontSize: 15, fontFamily: 'inherit' }}/>
    </div>
    {onFilter && (
      <button onClick={onFilter} style={{
        width: 44, height: 44, borderRadius: 12, background: '#fff',
        border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}><Icon name="filter" size={18}/></button>
    )}
  </div>
);

// ── Segmented control ────────────────────────────────────
const Segmented = ({ options = [], value, onChange = () => {} }) => (
  <div style={{
    display: 'flex', background: '#EEF1EE', borderRadius: 10, padding: 3, margin: '0 16px',
  }}>
    {options.map(o => (
      <button key={o.value} onClick={() => onChange(o.value)} style={{
        flex: 1, height: 32, border: 0, borderRadius: 7, cursor: 'pointer',
        background: value === o.value ? '#fff' : 'transparent',
        color: value === o.value ? C.ink : C.slate,
        fontWeight: 600, fontSize: 13, fontFamily: 'inherit',
        boxShadow: value === o.value ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
      }}>{o.label}</button>
    ))}
  </div>
);

// ── Empty / Loading / Error / Permission ────────────────
const StateView = ({ icon = 'cal', title, desc, action, danger = false }) => (
  <div className="col" style={{
    padding: '40px 24px', alignItems: 'center', textAlign: 'center', gap: 8,
  }}>
    <div style={{
      width: 64, height: 64, borderRadius: 18, background: danger ? '#FEF3F2' : C.pri50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
    }}>
      <Icon name={icon} size={28} color={danger ? C.danger : C.pri}/>
    </div>
    <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 14, color: C.slate, maxWidth: 280, lineHeight: 1.45 }}>{desc}</div>
    {action && <button className="unng-btn primary sm" style={{ marginTop: 8 }} onClick={action.onClick}>{action.label}</button>}
  </div>
);

const SkeletonCard = ({ h = 88 }) => (
  <div className="unng-card" style={{ padding: 12, marginBottom: 12 }}>
    <div className="unng-skel" style={{ height: h * 0.45, marginBottom: 10 }}/>
    <div className="unng-skel" style={{ height: 12, width: '70%', marginBottom: 6 }}/>
    <div className="unng-skel" style={{ height: 10, width: '40%' }}/>
  </div>
);

// ── Status bar wrapper used inside iOS frame children ──
const Frame = ({ children, hasTabs = false, bottomPad = 24 }) => (
  <div className="unng-screen" style={{ paddingBottom: hasTabs ? 96 : bottomPad }}>
    {children}
  </div>
);

// ── Scrollable body ───────────────────────────────────────
const Body = ({ children, padTop = 0, hasTabs = false, style = {} }) => (
  <div style={{
    height: '100%', overflow: 'auto', paddingTop: padTop,
    paddingBottom: hasTabs ? 100 : 24, ...style,
  }}>{children}</div>
);

// ── Sheet / modal wrapper ────────────────────────────────
const Sheet = ({ title, children, onClose }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}/>
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: '#fff', borderRadius: '20px 20px 0 0', padding: '8px 0 24px',
      maxHeight: '80%', overflow: 'auto',
    }}>
      <div style={{ width: 40, height: 4, borderRadius: 2, background: '#D5DAD7', margin: '6px auto 12px' }}/>
      {title && <div style={{ padding: '0 20px 12px', fontSize: 17, fontWeight: 700 }}>{title}</div>}
      {children}
    </div>
  </div>
);

// ── Money pretty print ───────────────────────────────────
const money = (n) => `€${n.toFixed(2).replace(/\.00$/, '')}`;

Object.assign(window, {
  C, Img, Avatar, TopBar, BottomTabs, TABS, SearchBar, Segmented,
  StateView, SkeletonCard, Frame, Body, Sheet, money, palette,
});
