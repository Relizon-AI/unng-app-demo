// un-app.jsx — UNNG: one persistent app frame with a live navigator rail

// Flow index — every entry navigates the ONE running app (no mockups)
const UN_FLOWS = [
  { group: 'Onboarding & Auth', guestOnly: true, items: [
    { id: 'M00', name: 'Splash', go: p => { p.applyRole('guest'); } },
    { id: 'M04', name: 'Auth choice', go: p => { p.applyRole('guest'); setTimeout(() => p.reset('authChoice'), 20); } },
    { id: 'M05', name: 'Sign up', go: p => { p.applyRole('guest'); setTimeout(() => p.reset('authChoice') || p.push('signUp'), 20); } },
    { id: 'M06', name: 'Sign in', go: p => { p.applyRole('guest'); setTimeout(() => p.push('signIn'), 20); } },
  ]},
  { group: 'Home', items: [
    { id: 'M08', name: 'Home / Discover', go: p => p.goTab('home') },
    { id: 'M33', name: 'Notifications', go: p => { p.goTab('profile'); setTimeout(() => p.push('notifications'), 20); } },
  ]},
  { group: 'Events', items: [
    { id: 'M09', name: 'Events list', go: p => p.goTab('events') },
    { id: 'M10', name: 'Event · free', go: p => { p.goTab('events'); setTimeout(() => p.push('eventDetailFree', { event: p.data.events[1] }), 20); } },
    { id: 'M11', name: 'Event · paid', go: p => { p.goTab('events'); setTimeout(() => p.push('eventDetailPaid', { event: p.data.events[0] }), 20); } },
    { id: 'M14', name: 'My tickets', go: p => { p.goTab('events'); setTimeout(() => p.push('myTickets'), 20); } },
  ]},
  { group: 'Donate & Subscribe', items: [
    { id: 'M15', name: 'Support hub', go: p => p.goTab('donate') },
    { id: 'M16', name: 'Plans', go: p => { p.goTab('donate'); setTimeout(() => p.push('subscriptionPlans'), 20); } },
    { id: 'M17', name: 'One-time donation', go: p => { p.goTab('donate'); setTimeout(() => p.push('donateOneTime'), 20); } },
  ]},
  { group: 'Organizations', items: [
    { id: 'M19', name: 'Organizations', go: p => { p.goTab('home'); setTimeout(() => p.push('organizationsList'), 20); } },
  ]},
  { group: 'Forums', items: [
    { id: 'M21', name: 'Categories', go: p => p.goTab('forums') },
    { id: 'M22', name: 'Topic list', go: p => { p.goTab('forums'); setTimeout(() => p.push('forumTopicList', { cat: UN_FORUM_CATEGORIES[1] }), 20); } },
    { id: 'M24', name: 'Create topic', go: p => { p.goTab('forums'); setTimeout(() => p.push('createTopic', { cat: UN_FORUM_CATEGORIES[1] }), 20); } },
  ]},
  { group: 'Profile & Records', items: [
    { id: 'M28', name: 'Profile', go: p => p.goTab('profile') },
    { id: 'M30', name: 'Membership', go: p => { p.goTab('profile'); setTimeout(() => p.push('membership'), 20); } },
    { id: 'M31', name: 'Transactions', go: p => { p.goTab('profile'); setTimeout(() => p.push('transactions'), 20); } },
    { id: 'M34', name: 'Settings', go: p => { p.goTab('profile'); setTimeout(() => p.push('settings'), 20); } },
  ]},
  { group: 'System', items: [
    { id: 'M36', name: 'Offline / error', go: p => p.push('offlineError') },
  ]},
];

const UN_ROLE_LABEL = { guest: 'Guest', unpaid: 'Signed in · no plan', paid: 'Active member' };

function UnNavigatorRail({ proto }) {
  const role = proto.role;
  return (
    <div style={{
      width: 232, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18,
      maxHeight: 844, overflowY: 'auto', paddingRight: 4,
    }} className="un-scroll">
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C978F' }}>Signed in as</div>
        <div style={{ display: 'grid', gap: 6, marginTop: 8 }}>
          {['guest', 'unpaid', 'paid'].map(r => (
            <button key={r} onClick={() => proto.applyRole(r)} style={{
              textAlign: 'left', padding: '9px 11px', borderRadius: 11, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600,
              border: `1px solid ${role === r ? '#0E5F4D' : 'rgba(21,35,31,0.12)'}`,
              background: role === r ? '#0E5F4D' : '#fff',
              color: role === r ? '#fff' : '#5D6B66',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: 4, flexShrink: 0,
                background: role === r ? '#CBA135' : 'rgba(21,35,31,0.2)',
              }}/>
              {UN_ROLE_LABEL[r]}
            </button>
          ))}
        </div>
      </div>

      {UN_FLOWS.map(g => {
        if (g.guestOnly && role !== 'guest') {
          // still reachable — the entry switches role itself
        }
        return (
          <div key={g.group}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C978F' }}>{g.group}</div>
            <div style={{ display: 'grid', gap: 2, marginTop: 7 }}>
              {g.items.map(it => (
                <button key={it.id} onClick={() => it.go(proto)} style={{
                  textAlign: 'left', padding: '7px 9px', borderRadius: 9, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 12.5, fontWeight: 500, color: '#3A4A44',
                  border: '1px solid transparent', background: 'transparent',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(21,35,31,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#9AA8A3', flexShrink: 0 }}>{it.id}</span>
                  {it.name}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function UnApp() {
  const [tweaks, setTweak] = useTweaks(UN_INITIAL_STATE);
  const palette = tweaks.palette || 'default';
  const proto = useUnApp(tweaks);
  const prefs = { palette, role: proto.role, stateMode: tweaks.stateMode, failNextPayment: tweaks.failNextPayment };

  return (
    <>
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 44, padding: '40px 48px', background: '#EFEEE9',
      }}>
        <UnNavigatorRail proto={proto}/>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
          <UnAppFrame proto={proto} prefs={prefs}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: '#7C877F' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{proto.screen}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>stack {proto.stack.length}</span>
            {proto.canGoBack && (
              <button onClick={proto.pop} style={{
                marginLeft: 4, padding: '3px 9px', borderRadius: 999, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 11, fontWeight: 600,
                border: '1px solid rgba(21,35,31,0.14)', background: '#fff', color: '#5D6B66',
              }}>Back</button>
            )}
            <button onClick={() => proto.applyRole(proto.role)} style={{
              padding: '3px 9px', borderRadius: 999, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 11, fontWeight: 600,
              border: '1px solid rgba(21,35,31,0.14)', background: '#fff', color: '#5D6B66',
            }}>Restart</button>
          </div>
        </div>
      </div>

      <TweaksPanel title="UNNG">
        <TweakSection label="Brand palette">
          <TweakRadio label="Palette" value={palette} onChange={v => setTweak('palette', v)}
            options={[
              { value: 'default', label: 'UNNG green' },
              { value: 'midnight', label: 'Midnight' },
              { value: 'coral', label: 'Coral' },
              { value: 'mono', label: 'Mono' },
            ]}/>
        </TweakSection>
        <TweakSection label="Role">
          <TweakRadio label="Signed in as" value={tweaks.role} onChange={v => setTweak('role', v)}
            options={[
              { value: 'guest', label: 'Guest' },
              { value: 'unpaid', label: 'No plan' },
              { value: 'paid', label: 'Member' },
            ]}/>
        </TweakSection>
        <TweakSection label="Simulate">
          <TweakSelect label="List content" value={tweaks.stateMode} onChange={v => setTweak('stateMode', v)}
            options={[
              { value: 'default', label: 'Normal data' },
              { value: 'loading', label: 'Loading skeletons' },
              { value: 'empty', label: 'Empty states' },
              { value: 'error', label: 'Load failure' },
              { value: 'offline', label: 'Offline' },
            ]}/>
          <TweakToggle label="Next payment fails" value={!!tweaks.failNextPayment}
            onChange={v => setTweak('failNextPayment', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<UnApp/>);
