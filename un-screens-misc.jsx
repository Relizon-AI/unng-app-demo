// un-screens-misc.jsx — M36 Offline / Error, plus router fallback

const UN_SCREENS_MISC = {};

// ─── M36 Offline / Error State ────────────────────────────────
UN_SCREENS_MISC.offlineError = function OfflineError({ proto, prefs }) {
  const [retrying, setRetrying] = React.useState(false);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <UnTopBar title="" onBack={proto.pop}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
        <div style={{
          width: 76, height: 76, borderRadius: 24, background: UN_COLORS.surface,
          color: UN_COLORS.slate, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${UN_COLORS.slate2}`,
        }}><UnIconWifiOff size={32}/></div>
        <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 20, color: UN_COLORS.ink }}>
          You are offline
        </div>
        <div style={{ fontSize: 14.5, color: UN_COLORS.slate, lineHeight: 1.55, marginTop: 10, maxWidth: 300, textWrap: 'pretty' }}>
          We could not reach UNNG. Check your connection and try again — anything you typed has been saved.
        </div>

        <div style={{
          marginTop: 22, width: '100%', maxWidth: 320, background: '#fff', borderRadius: 14,
          border: `1px solid ${UN_COLORS.slate2}`, padding: 14, textAlign: 'left',
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <span style={{ color: UN_COLORS.success, flexShrink: 0, marginTop: 1 }}><UnIconCheck size={16}/></span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: UN_COLORS.ink }}>Draft saved</div>
            <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 2, lineHeight: 1.45 }}>
              “Reading list — what are you carrying into Q3?” will publish when you reconnect.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, width: '100%', maxWidth: 320, display: 'grid', gap: 10 }}>
          <UnButton full onClick={() => { setRetrying(true); setTimeout(() => setRetrying(false), 1400); }}
            leading={retrying ? <UnSpinner size={16} color="#fff"/> : <UnIconWifi size={16}/>} disabled={retrying}>
            {retrying ? 'Reconnecting…' : 'Try again'}
          </UnButton>
          <UnButton full variant="ghost" onClick={() => proto.reset('home')}>Go to Home</UnButton>
        </div>
      </div>
    </div>
  );
};

UN_SCREENS_MISC.notFound = function NotFound({ proto }) {
  return (
    <UnEmpty icon={<UnIconAlert size={28}/>} title="Screen not found"
      body="This screen has not been built yet." actionLabel="Back" onAction={proto.pop}/>
  );
};

window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_MISC);
