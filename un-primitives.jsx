// un-primitives.jsx — Shared UNNG UI primitives
// All sizes follow §3.4 Shared Components.

const UN_COLORS = {
  primary: 'var(--un-primary-700)',
  primary600: 'var(--un-primary-600)',
  primary50: 'var(--un-primary-50)',
  gold: 'var(--un-gold-500)',
  gold50: 'var(--un-gold-50)',
  ink: 'var(--un-ink-900)',
  ink2: 'var(--un-ink-700)',
  slate: 'var(--un-slate-600)',
  slate4: 'var(--un-slate-400)',
  slate2: 'var(--un-slate-200)',
  slate1: 'var(--un-slate-100)',
  surface: 'var(--un-surface-50)',
  white: '#fff',
  danger: 'var(--un-danger-600)',
  danger50: 'var(--un-danger-50)',
  success: 'var(--un-success-600)',
  success50: 'var(--un-success-50)',
  info: 'var(--un-info-600)',
  info50: 'var(--un-info-50)',
};

// ─── Buttons ──────────────────────────────────────────────────
function UnButton({ variant = 'primary', size = 'md', children, onClick, disabled, leading, trailing, full = false, style = {} }) {
  const sizes = {
    sm: { h: 36, px: 14, fs: 13.5, r: 10 },
    md: { h: 48, px: 18, fs: 15, r: 14 },
    lg: { h: 52, px: 22, fs: 15.5, r: 14 },
  };
  const s = sizes[size];
  const v = {
    primary: { bg: UN_COLORS.primary, fg: '#fff', bd: 'transparent' },
    secondary: { bg: 'transparent', fg: UN_COLORS.primary, bd: UN_COLORS.primary },
    neutral: { bg: '#fff', fg: UN_COLORS.ink, bd: UN_COLORS.slate2 },
    ghost: { bg: 'transparent', fg: UN_COLORS.ink, bd: 'transparent' },
    destructive: { bg: UN_COLORS.danger, fg: '#fff', bd: 'transparent' },
    destructiveOutline: { bg: 'transparent', fg: UN_COLORS.danger, bd: UN_COLORS.danger },
    gold: { bg: UN_COLORS.gold, fg: '#15231F', bd: 'transparent' },
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        height: s.h, padding: `0 ${s.px}px`, borderRadius: s.r,
        background: v.bg, color: v.fg, border: `1.5px solid ${v.bd}`,
        fontSize: s.fs, fontWeight: 600, fontFamily: 'inherit',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : undefined,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        letterSpacing: '-0.01em',
        transition: 'transform .12s ease, opacity .12s ease',
        ...style,
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {leading}{children}{trailing}
    </button>
  );
}

// ─── Cards ────────────────────────────────────────────────────
function UnCard({ children, style = {}, padded = true, onClick, accent }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`,
        padding: padded ? 16 : 0, position: 'relative', overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />}
      {children}
    </div>
  );
}

// ─── Status badges ────────────────────────────────────────────
function UnBadge({ status = 'neutral', children, size = 'md', icon }) {
  const map = {
    paid:    { bg: UN_COLORS.success50, fg: UN_COLORS.success },
    unpaid:  { bg: UN_COLORS.slate1, fg: UN_COLORS.slate },
    active:  { bg: UN_COLORS.success50, fg: UN_COLORS.success },
    inactive:{ bg: UN_COLORS.slate1, fg: UN_COLORS.slate },
    pending: { bg: UN_COLORS.gold50, fg: '#8A6B1F' },
    failed:  { bg: UN_COLORS.danger50, fg: UN_COLORS.danger },
    refunded:{ bg: UN_COLORS.info50, fg: UN_COLORS.info },
    soldout: { bg: UN_COLORS.danger50, fg: UN_COLORS.danger },
    draft:   { bg: UN_COLORS.slate1, fg: UN_COLORS.slate },
    free:    { bg: UN_COLORS.primary50, fg: UN_COLORS.primary },
    gold:    { bg: UN_COLORS.gold50, fg: '#8A6B1F' },
    info:    { bg: UN_COLORS.info50, fg: UN_COLORS.info },
    neutral: { bg: UN_COLORS.slate1, fg: UN_COLORS.ink2 },
    danger:  { bg: UN_COLORS.danger50, fg: UN_COLORS.danger },
    success: { bg: UN_COLORS.success50, fg: UN_COLORS.success },
  };
  const c = map[status] || map.neutral;
  const fs = size === 'sm' ? 10.5 : 11.5;
  const py = size === 'sm' ? 3 : 4;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: `${py}px 10px`, borderRadius: 999,
      background: c.bg, color: c.fg, fontSize: fs, fontWeight: 600,
      letterSpacing: '0.02em', textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>{icon}{children}</span>
  );
}

// ─── Inputs ───────────────────────────────────────────────────
function UnInput({ label, value, onChange, placeholder, type = 'text', error, hint, rightSlot, leadingIcon, multiline = false, rows = 4 }) {
  const [focused, setFocused] = React.useState(false);
  const showError = !!error;
  const ringColor = showError ? UN_COLORS.danger : (focused ? UN_COLORS.primary : UN_COLORS.slate2);
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label style={{ display: 'block' }}>
      {label && <div style={{ fontSize: 13, fontWeight: 600, color: UN_COLORS.ink2, marginBottom: 6 }}>{label}</div>}
      <div style={{
        display: 'flex', alignItems: multiline ? 'flex-start' : 'center', gap: 10,
        padding: multiline ? '12px 14px' : '0 14px',
        height: multiline ? 'auto' : 48,
        background: '#fff', border: `1.5px solid ${ringColor}`,
        borderRadius: 12, transition: 'border-color .15s',
      }}>
        {leadingIcon && <span style={{ color: UN_COLORS.slate, display: 'inline-flex' }}>{leadingIcon}</span>}
        <Tag
          type={type}
          rows={multiline ? rows : undefined}
          value={value ?? ''}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'inherit', fontSize: 15, color: UN_COLORS.ink,
            padding: multiline ? 0 : '12px 0', resize: 'vertical',
            minHeight: multiline ? rows * 18 : undefined,
          }}
        />
        {rightSlot}
      </div>
      {showError && <div style={{ fontSize: 12.5, color: UN_COLORS.danger, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}><UnIconAlert size={12}/> {error}</div>}
      {!showError && hint && <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 6 }}>{hint}</div>}
    </label>
  );
}

// ─── Image placeholder (solid color block w/ initial) ─────────
function UnImage({ label, w = '100%', h = 160, color, initial, kind = 'event', radius = 12, style = {} }) {
  // Deterministic color from label
  const palette = [
    '#0E5F4D', '#1B3A6B', '#7A4A1A', '#5D6B66', '#8A6B1F',
    '#274932', '#2D5A4A', '#4A2D5A', '#5A2D2D', '#3A2D5A',
  ];
  const idx = (label || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  const bg = color || palette[idx];
  const init = initial || (label || '').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.95)', fontWeight: 700, fontSize: Math.max(20, h * 0.22),
      letterSpacing: '-0.02em', position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <span style={{ position: 'relative', zIndex: 2 }}>{init}</span>
      <div style={{
        position: 'absolute', inset: 0, background:
        `radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18), transparent 50%),
         radial-gradient(circle at 10% 90%, rgba(0,0,0,0.18), transparent 50%)`,
      }}/>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────
function UnAvatar({ name = '', size = 40, color }) {
  return <UnImage label={name} w={size} h={size} radius={size/2} color={color} style={{ flexShrink: 0 }}/>;
}

// ─── Section header ───────────────────────────────────────────
function UnSectionHeader({ title, action, onAction, style = {} }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px', marginBottom: 10, ...style }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: UN_COLORS.ink, letterSpacing: '-0.01em' }}>{title}</div>
      {action && <div onClick={onAction} style={{ fontSize: 13.5, color: UN_COLORS.primary, fontWeight: 600, cursor: 'pointer' }}>{action}</div>}
    </div>
  );
}

// ─── Top app bar (custom — not iOS native title) ──────────────
function UnTopBar({ title, leading, trailing, onBack, large = false, subtitle }) {
  return (
    <div style={{
      padding: large ? '18px 20px 14px' : '14px 16px',
      background: '#fff', display: 'flex', alignItems: 'center', gap: 10,
      borderBottom: large ? 'none' : `1px solid ${UN_COLORS.slate2}`,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 10, border: 'none',
          background: UN_COLORS.surface, display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          color: UN_COLORS.ink,
        }}><UnIconChevronLeft size={18}/></button>
      )}
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: large ? 26 : 17, fontWeight: large ? 800 : 700,
          color: UN_COLORS.ink, letterSpacing: '-0.02em',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: UN_COLORS.slate, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {trailing}
    </div>
  );
}

// ─── Bottom tab bar ───────────────────────────────────────────
const UN_TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'events', label: 'Events', icon: 'calendar' },
  { id: 'donate', label: 'Donate', icon: 'heart' },
  { id: 'forums', label: 'Forums', icon: 'forum' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];

function UnBottomTabs({ active, onChange, hidden = false }) {
  if (hidden) return null;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      paddingBottom: 26, paddingTop: 8, background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${UN_COLORS.slate2}`,
      display: 'flex', justifyContent: 'space-around',
    }}>
      {UN_TABS.map((t) => {
        const isActive = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange && onChange(t.id)} style={{
            flex: 1, border: 'none', background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '4px 0',
            color: isActive ? UN_COLORS.primary : UN_COLORS.slate,
          }}>
            <UnTabIcon name={t.icon} active={isActive} />
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.02em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────
function UnEmpty({ icon, title, body, actionLabel, onAction }) {
  return (
    <div style={{
      padding: '48px 28px', textAlign: 'center', display: 'flex',
      flexDirection: 'column', alignItems: 'center', gap: 10,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 20, background: UN_COLORS.primary50,
        color: UN_COLORS.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 6,
      }}>{icon}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: UN_COLORS.ink }}>{title}</div>
      <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.45, maxWidth: 280 }}>{body}</div>
      {actionLabel && <div style={{ marginTop: 14 }}><UnButton onClick={onAction}>{actionLabel}</UnButton></div>}
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────
function UnSkeleton({ w = '100%', h = 14, r = 6, style = {} }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: 'linear-gradient(90deg, #ECEEEC 0%, #F7F8F6 50%, #ECEEEC 100%)',
      backgroundSize: '200% 100%',
      animation: 'unShimmer 1.4s linear infinite',
      ...style,
    }}/>
  );
}
// inject keyframes once
if (typeof document !== 'undefined' && !document.getElementById('un-anim-keyframes')) {
  const s = document.createElement('style');
  s.id = 'un-anim-keyframes';
  s.textContent = `
  @keyframes unShimmer { 0% { background-position: 200% 0;} 100% { background-position: -200% 0;} }
  @keyframes unFadeIn { from { opacity: 0; transform: translateY(6px);} to {opacity:1; transform: none;} }
  @keyframes unSpin { to { transform: rotate(360deg);} }
  .un-fade-in { animation: unFadeIn .35s ease both; }
  .un-spin { animation: unSpin .9s linear infinite; }
  `;
  document.head.appendChild(s);
}

// ─── Bottom sheet wrapper ─────────────────────────────────────
function UnSheet({ children, title }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22,
      padding: '14px 18px 30px', boxShadow: '0 -8px 30px rgba(0,0,0,0.08)',
      animation: 'unFadeIn .25s ease both',
    }}>
      <div style={{ width: 36, height: 4, borderRadius: 4, background: UN_COLORS.slate2, margin: '0 auto 12px' }}/>
      {title && <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: UN_COLORS.ink }}>{title}</div>}
      {children}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────
function UnModal({ children, title, onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(21,35,31,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 22, zIndex: 100, animation: 'unFadeIn .2s ease both',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 18, padding: 22, width: '100%',
        maxWidth: 320,
      }}>
        {title && <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: UN_COLORS.ink }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

// ─── Filter chip ──────────────────────────────────────────────
function UnChip({ active, children, onClick, leading, dismissible, onDismiss }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 12px', borderRadius: 999,
      background: active ? UN_COLORS.primary : '#fff',
      color: active ? '#fff' : UN_COLORS.ink2,
      border: `1px solid ${active ? UN_COLORS.primary : UN_COLORS.slate2}`,
      fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
      whiteSpace: 'nowrap', cursor: 'pointer',
    }}>
      {leading}{children}
      {dismissible && <span onClick={(e) => { e.stopPropagation(); onDismiss && onDismiss(); }}>×</span>}
    </button>
  );
}

// ─── Loading spinner ──────────────────────────────────────────
function UnSpinner({ size = 24, color }) {
  return (
    <svg className="un-spin" width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke={color || UN_COLORS.primary} strokeWidth="2.5"
        strokeDasharray="60" strokeDashoffset="40" strokeLinecap="round"/>
    </svg>
  );
}

// ─── List row (UNNG style) ────────────────────────────────────
function UnRow({ icon, title, subtitle, trailing, onClick, danger, isLast }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px', borderBottom: isLast ? 'none' : `1px solid ${UN_COLORS.slate2}`,
      cursor: onClick ? 'pointer' : 'default',
      background: '#fff',
    }}>
      {icon && <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: danger ? UN_COLORS.danger50 : UN_COLORS.primary50,
        color: danger ? UN_COLORS.danger : UN_COLORS.primary,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: danger ? UN_COLORS.danger : UN_COLORS.ink }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 2 }}>{subtitle}</div>}
      </div>
      {trailing}
    </div>
  );
}

// ─── Search field ─────────────────────────────────────────────
function UnSearch({ value, onChange, placeholder = 'Search…', rightSlot }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 14px', height: 42,
      background: UN_COLORS.surface, borderRadius: 12,
    }}>
      <UnIconSearch size={16}/>
      <input
        value={value ?? ''}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: 'inherit', fontSize: 14.5, color: UN_COLORS.ink }}
      />
      {rightSlot}
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────
function UnToggle({ on, onChange }) {
  return (
    <button onClick={() => onChange && onChange(!on)} style={{
      width: 50, height: 30, borderRadius: 999, padding: 2, border: 'none',
      background: on ? UN_COLORS.primary : UN_COLORS.slate2,
      transition: 'background .2s', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start',
    }}>
      <div style={{ width: 26, height: 26, background: '#fff', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.15)' }}/>
    </button>
  );
}

// ─── Helpers ──────────────────────────────────────────────────
function unFmt(n) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function unMoney(n, c = '$') { return c + unFmt(n); }

// ─── Status icon (large, for success/failure full screens) ────
function UnStatusIcon({ kind = 'success', size = 80 }) {
  const cfg = {
    success: { bg: UN_COLORS.success50, fg: UN_COLORS.success, icon: <UnIconCheck size={size * 0.45}/> },
    failed:  { bg: UN_COLORS.danger50, fg: UN_COLORS.danger, icon: <UnIconX size={size * 0.45}/> },
    pending: { bg: UN_COLORS.gold50, fg: '#8A6B1F', icon: <UnIconClock size={size * 0.45}/> },
    info:    { bg: UN_COLORS.info50, fg: UN_COLORS.info, icon: <UnIconInfo size={size * 0.45}/> },
  }[kind];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: cfg.bg, color: cfg.fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    }}>{cfg.icon}</div>
  );
}

Object.assign(window, {
  UN_COLORS, UN_TABS,
  UnButton, UnCard, UnBadge, UnInput, UnImage, UnAvatar,
  UnSectionHeader, UnTopBar, UnBottomTabs, UnEmpty, UnSkeleton,
  UnSheet, UnModal, UnChip, UnSpinner, UnRow, UnSearch, UnToggle,
  UnStatusIcon, unFmt, unMoney,
});
