// un-prototype.jsx — UNNG app runtime: one persistent frame, live state store,
// navigation stacks, toasts, confirm dialogs, bottom sheets, and data mutations.

const UN_INITIAL_STATE = /*EDITMODE-BEGIN*/{
  "palette": "default",
  "role": "paid",
  "stateMode": "default",
  "failNextPayment": false
}/*EDITMODE-END*/;

const UN_TAB_ROOT = { home: 'home', events: 'events', donate: 'donateHub', forums: 'forumsCategories', profile: 'profile' };
const UN_ROOT_SCREENS = ['home', 'events', 'donateHub', 'forumsCategories', 'profile'];
// Screens that take over the frame — tabs hide during checkout, payment and focused forms (§8 layout rule)
const UN_FOCUSED = [
  'eventPayConfirm', 'paymentProcessing', 'eventSuccess', 'contributionCheckout',
  'createTopic', 'editTopic', 'deleteConfirm', 'deleteProfile', 'upgradePrompt',
  'donateOneTime', 'subscriptionPlans', 'editProfile', 'offlineError',
];

const UN_MEMBERSHIP_SEED = {
  plan: 'Hero', price: 10, cadence: 'month', status: 'active',
  renews: 'June 4, 2026', since: 'May 2024', cancelAtPeriodEnd: false,
};

const UN_SEED_COMMENTS = {
  t1: [
    { id: 'c1', author: 'Tunde A.', color: '#0E5F4D', when: '1h', body: 'I will be there — happy to do an intro round for anyone arriving alone.' },
    { id: 'c2', author: 'Ngozi E.', color: '#7A4A1A', when: '48m', body: 'Same. Coming straight from work so I may be a little late.' },
    { id: 'c3', author: 'Deleted User', color: '#5D6B66', when: '20m', body: 'This comment was removed.', deleted: true },
  ],
  t2: [
    { id: 'c4', author: 'Bolaji R.', color: '#274932', when: '20h', body: 'Is there a template for the budget section? Last cycle I guessed at the format.' },
  ],
  t3: [
    { id: 'c5', author: 'Adaeze O.', color: '#7A4A1A', when: '4h', body: 'Yemi K. would be brilliant on the funding panel.' },
    { id: 'c6', author: 'Tunde A.', color: '#0E5F4D', when: '2h', body: 'Seconding Yemi. Also worth asking Chidi for the ops track.' },
  ],
};

let unIdSeq = 1000;
const unId = (p) => `${p}${++unIdSeq}`;

function useUnApp(tweaks) {
  const [authed, setAuthed] = React.useState(true);
  const [tab, setTab] = React.useState('home');
  const [stacks, setStacks] = React.useState(() => ({
    home: [{ k: 'home', p: {} }], events: [{ k: 'events', p: {} }],
    donate: [{ k: 'donateHub', p: {} }], forums: [{ k: 'forumsCategories', p: {} }],
    profile: [{ k: 'profile', p: {} }],
  }));
  const [authStack, setAuthStack] = React.useState([{ k: 'splash', p: {} }]);
  const [toasts, setToasts] = React.useState([]);
  const [dialog, setDialog] = React.useState(null);
  const [sheet, setSheet] = React.useState(null);
  const [busy, setBusy] = React.useState(null);

  const [data, setData] = React.useState(() => ({
    user: { ...UN_USER },
    events: UN_EVENTS.map(e => ({ ...e })),
    registrations: [],
    txs: UN_TRANSACTIONS.map(t => ({ ...t })),
    topics: UN_TOPICS.map(t => ({ ...t })),
    comments: JSON.parse(JSON.stringify(UN_SEED_COMMENTS)),
    notifs: UN_NOTIFICATIONS.map(n => ({ ...n })),
    membership: { ...UN_MEMBERSHIP_SEED },
  }));

  const role = !authed ? 'guest' : (data.membership && data.membership.status === 'active' ? 'paid' : 'unpaid');

  // ── Role preview from the Tweaks panel — puts the app in that role's world ──
  const lastRole = React.useRef(tweaks.role);
  React.useEffect(() => {
    if (tweaks.role === lastRole.current) return;
    lastRole.current = tweaks.role;
    applyRole(tweaks.role);
  }, [tweaks.role]);

  const resetStacks = () => setStacks({
    home: [{ k: 'home', p: {} }], events: [{ k: 'events', p: {} }],
    donate: [{ k: 'donateHub', p: {} }], forums: [{ k: 'forumsCategories', p: {} }],
    profile: [{ k: 'profile', p: {} }],
  });

  function applyRole(r) {
    setToasts([]); setDialog(null); setSheet(null); setBusy(null);
    resetStacks(); setTab('home');
    if (r === 'guest') {
      setAuthed(false); setAuthStack([{ k: 'splash', p: {} }]);
      setData(d => ({ ...d, membership: null, registrations: [] }));
    } else {
      setAuthed(true);
      setData(d => ({ ...d, membership: r === 'paid' ? { ...UN_MEMBERSHIP_SEED } : null }));
    }
  }

  // ── Navigation ──
  const stack = authed ? stacks[tab] : authStack;
  const top = stack[stack.length - 1];
  const screen = top.k;
  const params = top.p || {};
  const canGoBack = stack.length > 1;

  const setStack = (fn) => {
    if (authed) setStacks(s => ({ ...s, [tab]: fn(s[tab]) }));
    else setAuthStack(fn);
  };
  const push = (k, p = {}) => setStack(st => [...st, { k, p }]);
  const replace = (k, p = {}) => setStack(st => [...st.slice(0, -1), { k, p }]);
  const pop = () => setStack(st => st.length > 1 ? st.slice(0, -1) : st);
  const popTo = (k) => setStack(st => {
    const i = st.findIndex(e => e.k === k);
    return i === -1 ? [st[0]] : st.slice(0, i + 1);
  });
  const reset = (k, p = {}) => {
    // A root screen name means "go to that tab"; anything else replaces the stack.
    const tabFor = Object.keys(UN_TAB_ROOT).find(t => UN_TAB_ROOT[t] === k);
    if (tabFor && authed) { setTab(tabFor); setStacks(s => ({ ...s, [tabFor]: [{ k, p }] })); return; }
    if (!authed && ['home', 'events', 'donateHub', 'forumsCategories', 'profile'].includes(k)) {
      setAuthed(true); resetStacks(); setTab(tabFor || 'home'); return;
    }
    setStack(() => [{ k, p }]);
  };
  const goTab = (t) => {
    if (t === tab) { setStacks(s => ({ ...s, [t]: [{ k: UN_TAB_ROOT[t], p: {} }] })); return; }
    setTab(t);
  };

  // ── Feedback ──
  const toast = (kind, title, body) => {
    const id = unId('to');
    setToasts(ts => [...ts.filter(t => t.title !== title), { id, kind, title, body }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 3200);
  };
  const dismissToast = (id) => setToasts(ts => ts.filter(t => t.id !== id));
  const confirm = (cfg) => setDialog(cfg);
  const closeDialog = () => setDialog(null);
  const openSheet = (cfg) => setSheet(cfg);
  const closeSheet = () => setSheet(null);

  // Simulated async work with a visible spinner overlay
  const run = (label, ms, done) => {
    setBusy(label);
    setTimeout(() => { setBusy(null); done && done(); }, ms);
  };

  // ── Data actions ──
  const addTx = (tx) => setData(d => ({ ...d, txs: [{ id: unId('tx'), ...tx }, ...d.txs] }));
  const addNotif = (n) => setData(d => ({ ...d, notifs: [{ id: unId('n'), read: false, when: 'now', ...n }, ...d.notifs] }));

  const actions = {
    signIn: (email) => {
      setAuthed(true);
      if (email) setData(d => ({ ...d, user: { ...d.user, email } }));
      resetStacks(); setTab('home');
      toast('success', 'Signed in', 'Welcome back to UNNG.');
    },
    signUp: (name, email) => {
      setAuthed(true);
      setData(d => ({
        ...d, membership: null, registrations: [],
        user: { ...d.user, name, firstName: name.split(' ')[0], email, username: '@' + name.split(' ')[0].toLowerCase() },
      }));
      resetStacks(); setTab('home');
      toast('success', 'Account created', 'Welcome to UNNG. Explore events to get started.');
    },
    signOut: () => {
      setAuthed(false); setAuthStack([{ k: 'authChoice', p: {} }]); resetStacks(); setTab('home');
      toast('info', 'Signed out', 'You can sign back in at any time.');
    },
    registerEvent: (ev, paid) => {
      setData(d => ({
        ...d,
        registrations: d.registrations.includes(ev.id) ? d.registrations : [...d.registrations, ev.id],
        events: d.events.map(e => e.id === ev.id ? { ...e, registered: e.registered + 1 } : e),
      }));
      addTx({ type: 'event', label: ev.title, amount: paid ? ev.price : 0, status: 'successful',
        date: 'Today', method: paid ? 'Revolut Pay · •• 4421' : 'No payment required', ref: 'EVT-' + Math.floor(1000 + Math.random() * 8999) });
      addNotif({ kind: 'event_reminder', title: `You are registered for ${ev.title}`, body: ev.date, avatar: ev.title });
    },
    cancelRegistration: (ev) => {
      setData(d => ({
        ...d, registrations: d.registrations.filter(id => id !== ev.id),
        events: d.events.map(e => e.id === ev.id ? { ...e, registered: Math.max(0, e.registered - 1) } : e),
      }));
      toast('info', 'Registration cancelled', `Your place at ${ev.title} has been released.`);
    },
    joinWaitlist: (ev) => {
      addNotif({ kind: 'event_reminder', title: `Waitlist joined · ${ev.title}`, body: 'We will notify you if a place opens up.', avatar: ev.title });
      toast('success', 'Added to waitlist', 'We will notify you if a place opens up.');
    },
    subscribe: (plan) => {
      setData(d => ({ ...d, membership: { ...UN_MEMBERSHIP_SEED, plan: plan.name, price: plan.price, status: 'active', cancelAtPeriodEnd: false } }));
      addTx({ type: 'subscription', label: `${plan.name} Subscription · Monthly`, amount: plan.price, status: 'successful',
        date: 'Today', method: 'Revolut Pay · •• 4421', ref: 'REV-' + Math.random().toString(36).slice(2, 8).toUpperCase() });
      addNotif({ kind: 'payment_success', title: 'Membership active', body: `${plan.name} Subscription · ${unMoney(plan.price)}`, avatar: '$' });
    },
    donate: (amount) => {
      addTx({ type: 'donation', label: 'One-time donation', amount, status: 'successful',
        date: 'Today', method: 'Revolut Pay · •• 4421', ref: 'REV-' + Math.random().toString(36).slice(2, 8).toUpperCase() });
      addNotif({ kind: 'payment_success', title: 'Donation received', body: `Thank you for giving ${unMoney(amount)}.`, avatar: '$' });
    },
    failedTx: (label, amount, type) => {
      addTx({ type: type || 'donation', label, amount, status: 'failed', date: 'Today',
        method: 'Revolut Pay · •• 4421', ref: 'REV-' + Math.random().toString(36).slice(2, 8).toUpperCase() });
      addNotif({ kind: 'payment_failed', title: 'Payment was not completed', body: 'You were not charged. Try again or use another method.', avatar: '!' });
    },
    cancelMembership: () => {
      setData(d => ({ ...d, membership: { ...d.membership, cancelAtPeriodEnd: true } }));
      toast('info', 'Membership will not renew', 'Your access continues until June 4, 2026.');
    },
    resumeMembership: () => {
      setData(d => ({ ...d, membership: { ...d.membership, cancelAtPeriodEnd: false } }));
      toast('success', 'Membership resumed', 'Your plan will renew as normal.');
    },
    createTopic: (cat, title, body, media) => {
      const t = { id: unId('t'), cat: cat.name, title, body, author: data.user.name.split(' ')[0] + ' ' + (data.user.name.split(' ')[1] || '')[0] + '.',
        authorColor: data.user.avatarColor, when: 'now', comments: 0, restricted: cat.restricted, mine: true, media: media || 0 };
      setData(d => ({ ...d, topics: [t, ...d.topics], comments: { ...d.comments, [t.id]: [] } }));
      return t;
    },
    updateTopic: (id, title, body) => setData(d => ({ ...d, topics: d.topics.map(t => t.id === id ? { ...t, title, body, edited: true } : t) })),
    deleteTopic: (id) => setData(d => ({ ...d, topics: d.topics.filter(t => t.id !== id) })),
    addComment: (topicId, body) => {
      const c = { id: unId('c'), author: data.user.name, color: data.user.avatarColor, when: 'now', body, mine: true };
      setData(d => ({
        ...d,
        comments: { ...d.comments, [topicId]: [...(d.comments[topicId] || []), c] },
        topics: d.topics.map(t => t.id === topicId ? { ...t, comments: t.comments + 1 } : t),
      }));
    },
    deleteComment: (topicId, cId) => setData(d => ({
      ...d,
      comments: { ...d.comments, [topicId]: (d.comments[topicId] || []).filter(c => c.id !== cId) },
      topics: d.topics.map(t => t.id === topicId ? { ...t, comments: Math.max(0, t.comments - 1) } : t),
    })),
    updateProfile: (name) => setData(d => ({ ...d, user: { ...d.user, name, firstName: name.split(' ')[0] } })),
    markAllRead: () => setData(d => ({ ...d, notifs: d.notifs.map(n => ({ ...n, read: true })) })),
    markRead: (id) => setData(d => ({ ...d, notifs: d.notifs.map(n => n.id === id ? { ...n, read: true } : n) })),
    setNotifPref: () => {},
    deleteAccount: () => {
      setAuthed(false); setAuthStack([{ k: 'authChoice', p: {} }]); resetStacks();
      setData(d => ({ ...d, membership: null, registrations: [] }));
      toast('info', 'Account deactivated', 'Your account has been deactivated and you were logged out.');
    },
  };

  return {
    screen, params, stack, canGoBack, push, pop, popTo, replace, reset, tab, goTab,
    authed, role, data, setData, toasts, dismissToast, toast, dialog, confirm, closeDialog,
    sheet, openSheet, closeSheet, busy, run, applyRole, ...actions,
  };
}

// ── Toast stack ───────────────────────────────────────────────
function UnToasts({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  const cfg = {
    success: { bg: '#0A7A4F', icon: <UnIconCheck size={15}/> },
    error: { bg: '#B42318', icon: <UnIconAlert size={15}/> },
    info: { bg: '#15231F', icon: <UnIconInfo size={15}/> },
  };
  return (
    <div style={{ position: 'absolute', top: 54, left: 12, right: 12, zIndex: 200, display: 'grid', gap: 8, pointerEvents: 'none' }}>
      {toasts.map(t => {
        const c = cfg[t.kind] || cfg.info;
        return (
          <div key={t.id} onClick={() => onDismiss(t.id)} className="un-fade-in" style={{
            background: c.bg, color: '#fff', borderRadius: 14, padding: '11px 13px',
            display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(21,35,31,0.28)', pointerEvents: 'auto',
          }}>
            <span style={{ marginTop: 1, flexShrink: 0, opacity: 0.9 }}>{c.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: '-0.01em' }}>{t.title}</div>
              {t.body && <div style={{ fontSize: 12.5, opacity: 0.82, marginTop: 2, lineHeight: 1.4 }}>{t.body}</div>}
            </div>
            <span style={{ opacity: 0.6, flexShrink: 0 }}><UnIconX size={13}/></span>
          </div>
        );
      })}
    </div>
  );
}

// ── Central confirm dialog ────────────────────────────────────
function UnConfirmDialog({ dialog, onClose }) {
  if (!dialog) return null;
  const { title, body, rows, confirmLabel = 'Confirm', cancelLabel = 'Cancel', danger, onConfirm, requireAck, ackLabel } = dialog;
  const [ack, setAck] = React.useState(false);
  React.useEffect(() => setAck(false), [dialog]);
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 210, background: 'rgba(21,35,31,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22,
      animation: 'unFadeIn .18s ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 20, padding: 22, width: '100%', maxWidth: 322,
      }}>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: UN_COLORS.ink, textWrap: 'pretty' }}>{title}</div>
        {body && <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.55, marginTop: 8, textWrap: 'pretty' }}>{body}</div>}
        {rows && (
          <div style={{ marginTop: 14, border: `1px solid ${UN_COLORS.slate2}`, borderRadius: 12, overflow: 'hidden' }}>
            {rows.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', gap: 10, padding: '10px 12px', fontSize: 13,
                borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${UN_COLORS.slate2}` }}>
                <span style={{ color: UN_COLORS.slate }}>{k}</span>
                <span style={{ marginLeft: 'auto', fontWeight: 600, color: UN_COLORS.ink, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
        )}
        {requireAck && (
          <label style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" checked={ack} onChange={e => setAck(e.target.checked)}
              style={{ width: 19, height: 19, accentColor: danger ? UN_COLORS.danger : UN_COLORS.primary, marginTop: 1, flexShrink: 0 }}/>
            <span style={{ fontSize: 12.5, color: UN_COLORS.slate, lineHeight: 1.45 }}>{ackLabel}</span>
          </label>
        )}
        <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
          <UnButton full variant={danger ? 'destructive' : 'primary'} disabled={requireAck && !ack}
            onClick={() => { onClose(); onConfirm && onConfirm(); }}>{confirmLabel}</UnButton>
          <UnButton full variant="ghost" onClick={onClose}>{cancelLabel}</UnButton>
        </div>
      </div>
    </div>
  );
}

// ── Central bottom sheet ──────────────────────────────────────
function UnSheetHost({ sheet, onClose }) {
  if (!sheet) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 205, background: 'rgba(21,35,31,0.45)',
      display: 'flex', alignItems: 'flex-end', animation: 'unFadeIn .18s ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%' }}>
        <UnSheet title={sheet.title}>
          {sheet.render ? sheet.render(onClose) : sheet.body}
        </UnSheet>
      </div>
    </div>
  );
}

// ── Blocking progress overlay ─────────────────────────────────
function UnBusyOverlay({ label }) {
  if (!label) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 208, background: 'rgba(247,248,246,0.82)',
      backdropFilter: 'blur(3px)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 14,
    }}>
      <UnSpinner size={34}/>
      <div style={{ fontSize: 14, fontWeight: 600, color: UN_COLORS.ink }}>{label}</div>
    </div>
  );
}

// ── The one persistent app frame ──────────────────────────────
function UnAppFrame({ proto, prefs }) {
  const showTabs = proto.authed && !UN_FOCUSED.includes(proto.screen);
  const scrollRef = React.useRef(null);
  // Each screen starts at the top — a new stack entry is a new view.
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [proto.screen, proto.tab]);

  return (
    <IOSDevice width={390} height={844} title={undefined}>
      <div className={`un-theme-${prefs.palette}`} style={{
        position: 'absolute', inset: 0, paddingTop: 50, paddingBottom: showTabs ? 84 : 0,
        background: 'var(--un-surface-50)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div ref={scrollRef} className="un-scroll un-fade-in" key={proto.screen + proto.tab}
          style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>
          <UnScreen proto={proto} prefs={prefs}/>
        </div>
      </div>
      {showTabs && (
        <div className={`un-theme-${prefs.palette}`}>
          <UnBottomTabs active={proto.tab} onChange={proto.goTab}/>
        </div>
      )}
      <UnToasts toasts={proto.toasts} onDismiss={proto.dismissToast}/>
      <UnSheetHost sheet={proto.sheet} onClose={proto.closeSheet}/>
      <UnBusyOverlay label={proto.busy}/>
      <UnConfirmDialog dialog={proto.dialog} onClose={proto.closeDialog}/>
    </IOSDevice>
  );
}

// Router
function UnScreen({ proto, prefs }) {
  const M = window.UN_SCREENS || {};
  const C = M[proto.screen] || M.notFound;
  return <C proto={proto} prefs={prefs}/>;
}

Object.assign(window, {
  useUnApp, UnAppFrame, UnScreen, UN_INITIAL_STATE, UN_FOCUSED, UN_TAB_ROOT,
  UnToasts, UnConfirmDialog, UnSheetHost, UnBusyOverlay, UN_MEMBERSHIP_SEED,
});
