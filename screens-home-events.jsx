// screens-home-events.jsx — M08 Home, M09–M14 Events flow

const M08_Home = ({ goto, role = 'paid', state = 'default' }) => {
  const isPaid = role === 'paid';
  const isUnpaid = role === 'unpaid';
  if (state === 'loading') {
    return (
      <Frame hasTabs>
        <div style={{ padding: '60px 16px 12px' }}>
          <div className="unng-skel" style={{ height: 14, width: 140, marginBottom: 8 }}/>
          <div className="unng-skel" style={{ height: 26, width: 200 }}/>
        </div>
        <div style={{ padding: '0 16px' }}>
          <div className="unng-skel" style={{ height: 88, borderRadius: 16, marginBottom: 16 }}/>
          <SkeletonCard/><SkeletonCard h={120}/>
        </div>
        <BottomTabs active="home" onChange={t => goto(t)}/>
      </Frame>
    );
  }
  return (
    <Frame hasTabs>
      <div style={{ padding: '60px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, color: C.slate, fontWeight: 500 }}>Welcome back</div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Adaeze 👋</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => goto('M33')} style={{ width: 40, height: 40, borderRadius: '50%', background: '#fff', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer' }}>
            <Icon name="bell" size={20}/>
            <span style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: '50%', background: C.danger, border: '2px solid #fff' }}/>
          </button>
        </div>
      </div>

      <Body hasTabs padTop={4}>
        {/* Membership status card */}
        <div style={{ padding: '8px 16px 0' }}>
          {isPaid ? (
            <div style={{
              background: `linear-gradient(135deg, ${C.pri} 0%, #0a4d3f 100%)`, color: '#fff',
              borderRadius: 18, padding: 16, position: 'relative', overflow: 'hidden',
            }} onClick={() => goto('M30')}>
              <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(203,161,53,0.18)' }}/>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Icon name="crown" size={16} color={C.gold}/>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.gold }}>Super Hero · Active</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>Member since Jan 2025</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Renews Mar 14, 2027 · €50/yr</div>
            </div>
          ) : isUnpaid ? (
            <div style={{
              background: '#fff', border: `1px solid ${C.border}`, borderRadius: 18, padding: 16,
              display: 'flex', alignItems: 'center', gap: 12,
            }} onClick={() => goto('M16')}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(203,161,53,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="crown" size={22} color={C.gold}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>Become a member</div>
                <div style={{ fontSize: 13, color: C.slate }}>From €10/yr · join the discussion</div>
              </div>
              <Icon name="chev-r" size={20} color={C.slate}/>
            </div>
          ) : null}
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '16px 16px 0' }}>
          {[
            { i: 'cal', l: 'Events', t: 'M09' },
            { i: 'heart', l: 'Donate', t: 'M17' },
            { i: 'building', l: 'Orgs', t: 'M19' },
            { i: 'chat', l: 'Forums', t: 'M21' },
          ].map(a => (
            <button key={a.l} onClick={() => goto(a.t)} style={{
              background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14, padding: '14px 4px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.pri50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={a.i} size={18} color={C.pri}/>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{a.l}</span>
            </button>
          ))}
        </div>

        {/* Upcoming events */}
        <div className="unng-section-h"><h3>Upcoming events</h3><a onClick={() => goto('M09')}>See all</a></div>
        <div style={{ display: 'flex', gap: 12, padding: '0 16px', overflowX: 'auto' }}>
          {[
            { idx: 1, t: 'Diaspora Mixer London', d: 'Sat · 7:00 PM', loc: 'Soho House', price: 'Free' },
            { idx: 2, t: 'Founders Roundtable', d: 'May 18 · 6 PM', loc: 'Online', price: '€15' },
            { idx: 5, t: 'Lagos Reunion Gala', d: 'Jun 22 · 8 PM', loc: 'Eko Hotel', price: '€85' },
          ].map((e, i) => (
            <div key={i} onClick={() => goto(e.price === 'Free' ? 'M10' : 'M11')} className="unng-card" style={{ width: 220, flexShrink: 0, cursor: 'pointer' }}>
              <Img idx={e.idx} height={108} radius={0} label={e.t}/>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{e.t}</div>
                <div style={{ fontSize: 12, color: C.slate, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="clock" size={12}/>{e.d}
                </div>
                <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={`unng-badge ${e.price === 'Free' ? 'success' : 'gold'}`}>{e.price}</span>
                  <span style={{ fontSize: 11, color: C.slate }}>{e.loc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Latest forum topics */}
        <div className="unng-section-h"><h3>Latest in forums</h3><a onClick={() => goto('M21')}>Browse</a></div>
        <div style={{ padding: '0 16px' }}>
          <div className="unng-list">
            {[
              { i: 0, t: 'Visa pathways for tech founders', a: 'Tunde A.', c: 24 },
              { i: 3, t: 'Sending money home — best apps in 2026?', a: 'Ngozi M.', c: 81 },
              { i: 6, t: 'Finding Nigerian community in Berlin', a: 'Kemi O.', c: 12 },
            ].map((p, i) => (
              <div key={i} className="unng-row" onClick={() => goto('M23')}>
                <Avatar name={p.a} idx={p.i}/>
                <div style={{ flex: 1 }}>
                  <div className="ttl">{p.t}</div>
                  <div className="meta">{p.a} · {p.c} comments</div>
                </div>
                <Icon name="chev-r" size={18} color={C.slate}/>
              </div>
            ))}
          </div>
        </div>

        {/* Featured organizations */}
        <div className="unng-section-h"><h3>Featured organizations</h3><a onClick={() => goto('M19')}>See all</a></div>
        <div style={{ display: 'flex', gap: 10, padding: '0 16px', overflowX: 'auto' }}>
          {[
            { i: 0, n: 'NDA London' },
            { i: 4, n: 'Igbo Cultural' },
            { i: 7, n: 'NaijaTech UK' },
            { i: 2, n: 'NigeriaHer' },
          ].map((o, idx) => (
            <div key={idx} onClick={() => goto('M20')} style={{
              width: 140, flexShrink: 0, background: '#fff', border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 12, cursor: 'pointer',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: palette[o.i].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>
                {o.n.split(' ').map(s => s[0]).slice(0,2).join('')}
              </div>
              <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}>{o.n}</div>
              <div style={{ fontSize: 11, color: C.slate, marginTop: 2 }}>Cultural · UK</div>
            </div>
          ))}
        </div>
      </Body>
      <BottomTabs active="home" onChange={t => goto(t)}/>
    </Frame>
  );
};

// ── Events List ─────────────────────────────────────────
const M09_EventsList = ({ goto, state = 'default' }) => {
  const [seg, setSeg] = React.useState('upcoming');
  const events = [
    { idx: 1, t: 'Diaspora Mixer London', d: 'Sat May 17 · 7 PM', loc: 'Soho House', price: 'Free', tag: 'Networking' },
    { idx: 2, t: 'Founders Roundtable', d: 'Mon May 19 · 6 PM', loc: 'Online · Zoom', price: '€15', tag: 'Workshop' },
    { idx: 5, t: 'Lagos Reunion Gala 2026', d: 'Sun Jun 22 · 8 PM', loc: 'Eko Hotel, VI', price: '€85', tag: 'Gala', sold: false },
    { idx: 0, t: 'Mentorship Mixer', d: 'Wed Jun 4 · 6 PM', loc: 'Berlin', price: 'Free', tag: 'Mentorship', soldout: true },
    { idx: 7, t: 'Tech Talks: AI in Africa', d: 'Thu Jun 12 · 7 PM', loc: 'Online', price: '€10', tag: 'Panel' },
  ];
  return (
    <Frame hasTabs>
      <TopBar title="Events" large/>
      <SearchBar placeholder="Search events" onFilter={() => {}}/>
      <Segmented value={seg} onChange={setSeg} options={[
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'past', label: 'Past' },
        { value: 'mine', label: 'Registered' },
      ]}/>
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto' }}>
        {['All', 'Networking', 'Workshop', 'Gala', 'Online', 'This week'].map((c, i) => (
          <span key={c} className={`unng-chip ${i === 0 ? 'active' : ''}`}>{c}</span>
        ))}
      </div>
      <Body hasTabs>
        {state === 'loading' ? (
          <div style={{ padding: '0 16px' }}>{[0,1,2].map(i => <SkeletonCard key={i} h={140}/>)}</div>
        ) : state === 'empty' ? (
          <StateView icon="cal" title="No upcoming events yet"
            desc="Check back soon or explore organizations to find local groups hosting meetups."
            action={{ label: 'Browse organizations', onClick: () => goto('M19') }}/>
        ) : state === 'error' ? (
          <StateView icon="alert" title="Could not load events"
            desc="Please check your connection and try again." danger
            action={{ label: 'Retry', onClick: () => {} }}/>
        ) : (
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {events.map((e, i) => (
              <div key={i} className="unng-card" onClick={() => goto(e.price === 'Free' ? 'M10' : 'M11')} style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <Img idx={e.idx} height={150} radius={0} label={e.t}/>
                  <span className={`unng-badge ${e.price === 'Free' ? 'success' : 'gold'}`}
                    style={{ position: 'absolute', top: 12, right: 12, background: e.price === 'Free' ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.95)' }}>
                    {e.price}
                  </span>
                  {e.soldout && (
                    <span className="unng-badge danger" style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.95)' }}>Sold out</span>
                  )}
                </div>
                <div style={{ padding: 14 }}>
                  <span className="unng-badge neutral" style={{ marginBottom: 6 }}>{e.tag}</span>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6, marginBottom: 6, lineHeight: 1.3 }}>{e.t}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: C.slate }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={14}/>{e.d}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="pin" size={14}/>{e.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Body>
      <BottomTabs active="events" onChange={t => goto(t)}/>
    </Frame>
  );
};

// ── Event Details (free) ────────────────────────────────
const EventDetailShell = ({ paid, goto, state = 'default' }) => {
  const onBack = () => goto('M09');
  return (
    <Frame>
      <div style={{ position: 'relative' }}>
        <Img idx={paid ? 5 : 1} height={260} radius={0} label="Event banner"/>
        <button onClick={onBack} style={{
          position: 'absolute', top: 60, left: 16, width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="chev-l" size={20}/></button>
        <button style={{
          position: 'absolute', top: 60, right: 16, width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="share" size={18}/></button>
      </div>
      <Body padTop={0} style={{ marginTop: -20, position: 'relative', background: '#fff', borderRadius: '20px 20px 0 0' }}>
        <div style={{ padding: 20 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span className="unng-badge neutral">{paid ? 'Gala' : 'Networking'}</span>
            <span className={`unng-badge ${paid ? 'gold' : 'success'}`}>{paid ? '€85' : 'Free'}</span>
            {state === 'soldout' && <span className="unng-badge danger">Sold out</span>}
            {state === 'registered' && <span className="unng-badge success"><Icon name="check" size={12}/> Registered</span>}
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            {paid ? 'Lagos Reunion Gala 2026' : 'Diaspora Mixer London'}
          </h1>

          <div className="col gap-3" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.pri50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="cal" size={20} color={C.pri}/>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{paid ? 'Sun Jun 22, 2026' : 'Sat May 17, 2026'}</div>
                <div style={{ fontSize: 12, color: C.slate }}>{paid ? '8:00 PM – 1:00 AM' : '7:00 – 11:00 PM'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.pri50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="pin" size={20} color={C.pri}/>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{paid ? 'Eko Hotel & Suites' : 'Soho House'}</div>
                <div style={{ fontSize: 12, color: C.slate }}>{paid ? 'Victoria Island, Lagos' : '40 Greek St, London W1D'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.pri50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="user" size={20} color={C.pri}/>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{paid ? '420 / 500 spots filled' : '142 attending'}</div>
                <div style={{ fontSize: 12, color: C.slate }}>{paid ? '80 spots remaining' : 'Open capacity'}</div>
              </div>
            </div>
          </div>

          <div style={{ background: C.surf, borderRadius: 14, padding: 14, display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
            <Avatar name="NDA London" idx={0}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: C.slate, marginBottom: 2 }}>Hosted by</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>NDA London Chapter</div>
            </div>
            <button className="unng-btn sm secondary" onClick={() => goto('M20')}>View</button>
          </div>

          <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 8px' }}>About</h3>
          <p style={{ color: C.ink, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            {paid
              ? 'Our biggest gathering of the year. Black-tie dinner, live music from Burna Akin, and a tribute to the diaspora founders shaping the next decade. Ticket includes 3-course meal and welcome drink.'
              : 'Casual mixer for Nigerians in London — meet 100+ professionals over jollof and palmwine. First-timers welcome. Come as you are.'}
          </p>

          {paid && (
            <div style={{ marginTop: 20, padding: 14, background: '#FEF6E3', borderRadius: 12, fontSize: 13, color: '#8C6E1F', display: 'flex', gap: 10 }}>
              <Icon name="alert" size={18}/> Refunds available until 7 days before event. See full terms at checkout.
            </div>
          )}
        </div>
      </Body>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 28,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)',
        borderTop: `1px solid ${C.border}`, display: 'flex', gap: 10,
      }}>
        <button className="unng-btn secondary" style={{ flex: '0 0 50px', padding: 0 }}>
          <Icon name="cal" size={20} color={C.pri}/>
        </button>
        {state === 'soldout' ? (
          <button className="unng-btn disabled" style={{ flex: 1 }}>Sold out</button>
        ) : state === 'registered' ? (
          <button className="unng-btn secondary" style={{ flex: 1 }} onClick={() => goto('M14')}>View ticket</button>
        ) : paid ? (
          <button className="unng-btn primary" style={{ flex: 1 }} onClick={() => goto('M12')}>Pay & Register · €85</button>
        ) : (
          <button className="unng-btn primary" style={{ flex: 1 }} onClick={() => goto('M14')}>Register</button>
        )}
      </div>
    </Frame>
  );
};

const M10_EventFree = (p) => <EventDetailShell paid={false} {...p}/>;
const M11_EventPaid = (p) => <EventDetailShell paid={true} {...p}/>;

// ── M12 Payment Confirmation ─────────────────────────────
const M12_PaymentConfirm = ({ goto }) => (
  <Frame>
    <TopBar title="Confirm payment" back={() => goto('M11')}/>
    <Body>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: C.pri50, padding: 14, borderRadius: 14, fontSize: 13, color: C.pri, lineHeight: 1.5, display: 'flex', gap: 10 }}>
          <Icon name="shield" size={18} color={C.pri}/>
          <span>You'll be redirected to Revolut Pay to complete your payment securely.</span>
        </div>
        <div className="unng-card" style={{ padding: 18, marginTop: 16 }}>
          <div style={{ fontSize: 12, color: C.slate, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>You're paying for</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Lagos Reunion Gala 2026</div>
          <div className="col gap-3">
            {[
              ['Date', 'Sun Jun 22 · 8:00 PM'],
              ['Location', 'Eko Hotel & Suites, Lagos'],
              ['Email receipt to', 'adaeze@example.com'],
              ['Payment method', 'Revolut Pay'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: C.slate }}>{k}</span>
                <span style={{ fontWeight: 600, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: C.border, margin: '16px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>€85.00</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: C.slate, lineHeight: 1.5, marginTop: 14 }}>
          Your registration becomes active after payment is confirmed. By continuing you agree to the
          <a style={{ color: C.pri, fontWeight: 600 }}> event terms</a> and our refund policy.
        </p>
      </div>
    </Body>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 28px', background: '#fff', borderTop: `1px solid ${C.border}` }}>
      <button className="unng-btn primary" onClick={() => goto('M13')}>Confirm & Pay €85</button>
    </div>
  </Frame>
);

// ── M13 Payment Processing ───────────────────────────────
const M13_PaymentProcessing = ({ goto, state = 'success' }) => {
  const data = {
    success:  { icon: 'check-c',  color: C.success, title: 'Payment successful',   body: 'Your registration for Lagos Reunion Gala 2026 is confirmed.', cta: 'View ticket', next: 'M14' },
    pending:  { icon: 'clock',    color: C.gold,    title: 'Payment pending',      body: 'Revolut is still processing your payment. We\'ll update you shortly.', cta: 'Continue', next: 'M08' },
    failed:   { icon: 'alert',    color: C.danger,  title: 'Payment didn\'t go through', body: 'You were not charged by UNNG. Try again or use another payment option.', cta: 'Retry payment', next: 'M12' },
    loading:  { icon: 'refresh',  color: C.pri,     title: 'Processing payment',   body: 'Hold on while Revolut Pay finishes up. Don\'t close the app.',  cta: null, next: 'M13' },
  }[state];
  return (
    <Frame>
      <TopBar title="" />
      <div style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: `${data.color}1A`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          animation: state === 'loading' ? 'spin 1.4s linear infinite' : 'none',
        }}>
          <Icon name={data.icon} size={42} color={data.color}/>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 10px' }}>{data.title}</h1>
        <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.5, maxWidth: 300, margin: 0 }}>{data.body}</p>
        {state !== 'loading' && (
          <div style={{ marginTop: 28, padding: 14, background: C.surf, borderRadius: 12, width: '100%', maxWidth: 320 }}>
            <div style={{ fontSize: 12, color: C.slate, marginBottom: 4 }}>Transaction reference</div>
            <div style={{ fontSize: 13, fontFamily: 'ui-monospace, monospace', fontWeight: 600 }}>UNNG-TX-A4F92K8</div>
          </div>
        )}
      </div>
      {data.cta && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 28px' }}>
          <button className="unng-btn primary" onClick={() => goto(data.next)}>{data.cta}</button>
          {state === 'failed' && <button className="unng-btn ghost" style={{ marginTop: 8 }} onClick={() => goto('M11')}>Cancel</button>}
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </Frame>
  );
};

// ── M14 Registration Success ─────────────────────────────
const M14_RegSuccess = ({ goto }) => (
  <Frame>
    <TopBar title="Your ticket" back={() => goto('M08')}/>
    <Body>
      <div style={{ padding: '0 16px' }}>
        <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.success + '1A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Icon name="check-c" size={32} color={C.success}/>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>You're in 🎉</div>
          <div style={{ color: C.slate, fontSize: 14, marginTop: 4 }}>Confirmation sent to adaeze@example.com</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 18, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
          <Img idx={5} height={120} radius={0} label="Lagos Reunion Gala"/>
          <div style={{ padding: 18 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Lagos Reunion Gala 2026</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><div style={{ fontSize: 11, color: C.slate, textTransform: 'uppercase' }}>Date</div><div style={{ fontWeight: 600, fontSize: 13 }}>Sun Jun 22 · 8 PM</div></div>
              <div><div style={{ fontSize: 11, color: C.slate, textTransform: 'uppercase' }}>Venue</div><div style={{ fontWeight: 600, fontSize: 13 }}>Eko Hotel</div></div>
              <div><div style={{ fontSize: 11, color: C.slate, textTransform: 'uppercase' }}>Attendee</div><div style={{ fontWeight: 600, fontSize: 13 }}>Adaeze Okonkwo</div></div>
              <div><div style={{ fontSize: 11, color: C.slate, textTransform: 'uppercase' }}>Order</div><div style={{ fontWeight: 600, fontSize: 13 }}>UNNG-TX-A4F92K8</div></div>
            </div>
            <div style={{ height: 1, background: C.border, margin: '16px 0', borderTop: `1px dashed ${C.border}`, background: 'transparent' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 140, height: 140, background: C.surf, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Icon name="qr" size={120} color={C.ink} stroke={1}/>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ background: 'rgba(255,255,255,0.95)', padding: '4px 8px', borderRadius: 6, fontSize: 10, color: C.slate, fontWeight: 600 }}>QR · check-in</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: C.slate }}>Show this code at the door</div>
            </div>
          </div>
        </div>
      </div>
    </Body>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 28px', display: 'flex', gap: 10, background: '#fff', borderTop: `1px solid ${C.border}` }}>
      <button className="unng-btn secondary" style={{ flex: 1 }}><Icon name="cal" size={18} color={C.pri}/>Add to calendar</button>
      <button className="unng-btn primary" style={{ flex: 1 }} onClick={() => goto('M31')}>View history</button>
    </div>
  </Frame>
);

Object.assign(window, {
  M08_Home, M09_EventsList, M10_EventFree, M11_EventPaid,
  M12_PaymentConfirm, M13_PaymentProcessing, M14_RegSuccess,
});
