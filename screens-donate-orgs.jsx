// screens-donate-orgs.jsx — M15–M20

const M15_DonateHub = ({ goto, role = 'unpaid' }) => (
  <Frame hasTabs>
    <TopBar title="Donate" large/>
    <Body hasTabs>
      <div style={{ padding: '0 16px' }}>
        {role === 'paid' ? (
          <div style={{ background: `linear-gradient(135deg, ${C.pri} 0%, #0a4d3f 100%)`, color: '#fff', borderRadius: 18, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Icon name="crown" size={16} color={C.gold}/>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Super Hero · Active</span>
            </div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Thanks for supporting UNNG</div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 2 }}>Renews Mar 14, 2027</div>
          </div>
        ) : null}

        <h3 style={{ fontSize: 13, color: C.slate, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '8px 0 12px' }}>Membership</h3>
        <div className="col gap-3">
          {[
            { name: 'Hero', price: 10, color: C.pri, benefits: ['Forum posting', 'Member events', 'Monthly newsletter'] },
            { name: 'Super Hero', price: 50, color: C.gold, benefits: ['Everything in Hero', 'Founders circle', 'Annual gala invite', 'Vote on initiatives'], popular: true },
          ].map(p => (
            <div key={p.name} className="unng-card" style={{ padding: 18, position: 'relative', borderColor: p.popular ? C.gold : C.border_soft }}>
              {p.popular && <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(203,161,53,0.16)', color: '#8C6E1F', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Popular</span>}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon name="crown" size={20} color={p.color}/>
                <span style={{ fontWeight: 700, fontSize: 17 }}>{p.name}</span>
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
                €{p.price}<span style={{ fontSize: 14, fontWeight: 500, color: C.slate }}>/year</span>
              </div>
              <div className="col gap-2" style={{ marginBottom: 14 }}>
                {p.benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <Icon name="check" size={14} color={C.success}/>{b}
                  </div>
                ))}
              </div>
              <button className="unng-btn primary" onClick={() => goto('M16')}>{role === 'paid' ? 'Manage' : 'Subscribe'}</button>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 13, color: C.slate, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '24px 0 12px' }}>One-time donation</h3>
        <div className="unng-card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FEF3F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="heart-fill" size={22} color={C.danger}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Support our work</div>
              <div style={{ fontSize: 12, color: C.slate }}>One-time gift, no recurring charges</div>
            </div>
          </div>
          <button className="unng-btn secondary" onClick={() => goto('M17')}>Donate now</button>
        </div>
      </div>
    </Body>
    <BottomTabs active="donate" onChange={t => goto(t)}/>
  </Frame>
);

const M16_PlanDetails = ({ goto }) => (
  <Frame>
    <TopBar title="Super Hero" back={() => goto('M15')}/>
    <Body>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: `linear-gradient(135deg, ${C.gold} 0%, #a07e22 100%)`, color: '#fff', borderRadius: 20, padding: 24, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
          <Icon name="crown" size={32} color="#fff"/>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10, opacity: 0.9, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Super Hero</div>
          <div style={{ fontSize: 38, fontWeight: 800, marginTop: 4, letterSpacing: '-0.02em' }}>€50<span style={{ fontSize: 16, fontWeight: 500 }}>/year</span></div>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, margin: '16px 0 10px' }}>What's included</h3>
        <div className="col gap-3">
          {[
            ['Forum posting', 'Create topics, comment, and join discussions'],
            ['Founders circle', 'Private monthly calls with UNNG leadership'],
            ['Annual gala invite', 'Reserved seat at the Lagos Reunion Gala'],
            ['Vote on initiatives', 'Help us decide what to build next'],
            ['Member events', 'Discounted or free entry to UNNG events'],
          ].map(([t, d]) => (
            <div key={t} style={{ display: 'flex', gap: 12, padding: 12, background: '#fff', borderRadius: 12, border: `1px solid ${C.border}` }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: C.pri50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check" size={16} color={C.pri}/>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t}</div>
                <div style={{ fontSize: 12, color: C.slate, lineHeight: 1.5, marginTop: 2 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, padding: 14, background: C.surf, borderRadius: 12, fontSize: 12, color: C.slate, lineHeight: 1.5 }}>
          Renews automatically each year. Cancel anytime from Membership Status. Payment processed by Revolut.
        </div>
      </div>
    </Body>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 28px', background: '#fff', borderTop: `1px solid ${C.border}` }}>
      <button className="unng-btn primary" onClick={() => goto('M18')}>Subscribe · €50/year</button>
    </div>
  </Frame>
);

const M17_OneTimeDonation = ({ goto, state = 'default' }) => {
  const [amount, setAmount] = React.useState(25);
  const [custom, setCustom] = React.useState(false);
  return (
    <Frame>
      <TopBar title="Donate" back={() => goto('M15')}/>
      <Body>
        <div style={{ padding: '0 16px' }}>
          <div style={{ textAlign: 'center', padding: '8px 0 20px' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: '#FEF3F2', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Icon name="heart-fill" size={28} color={C.danger}/>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Choose an amount</div>
            <div style={{ color: C.slate, fontSize: 13, marginTop: 4 }}>One-time donation in EUR</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
            {[10, 25, 50, 100, 250, 500].map(a => (
              <button key={a} onClick={() => { setAmount(a); setCustom(false); }} style={{
                height: 56, borderRadius: 12, border: amount === a && !custom ? `2px solid ${C.pri}` : `1px solid ${C.border}`,
                background: amount === a && !custom ? C.pri50 : '#fff', cursor: 'pointer',
                fontWeight: 700, fontSize: 17, color: amount === a && !custom ? C.pri : C.ink, fontFamily: 'inherit',
              }}>€{a}</button>
            ))}
          </div>
          <div className="unng-field">
            <label className="unng-label">Custom amount</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: 14, fontSize: 17, color: C.slate, fontWeight: 600 }}>€</span>
              <input className={`unng-input ${state === 'inline-error' ? 'err' : ''}`} placeholder="0.00" type="number" style={{ paddingLeft: 32, fontSize: 17, fontWeight: 600, width: '100%' }} onFocus={() => setCustom(true)}/>
            </div>
            {state === 'inline-error' && <span className="unng-help err">Minimum donation is €5</span>}
          </div>
          <div className="unng-field" style={{ marginTop: 14 }}>
            <label className="unng-label">Add a note <span style={{ color: C.slate, fontWeight: 400 }}>(optional)</span></label>
            <textarea className="unng-input" rows={3} placeholder="Why are you giving today?"/>
          </div>
        </div>
      </Body>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 28px', background: '#fff', borderTop: `1px solid ${C.border}` }}>
        <button className="unng-btn primary" onClick={() => goto('M18')}>Continue · €{amount}</button>
      </div>
    </Frame>
  );
};

const M18_ContribCheckout = ({ goto }) => (
  <Frame>
    <TopBar title="Review" back={() => goto('M16')}/>
    <Body>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: C.pri50, padding: 14, borderRadius: 14, fontSize: 13, color: C.pri, lineHeight: 1.5, display: 'flex', gap: 10 }}>
          <Icon name="shield" size={18} color={C.pri}/>
          <span>You'll be redirected to Revolut Pay to complete your subscription.</span>
        </div>
        <div className="unng-card" style={{ padding: 18, marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Icon name="crown" size={16} color={C.gold}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#8C6E1F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subscription</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Super Hero · €50/year</div>
          <div className="col gap-3">
            {[
              ['Recurrence', 'Annual · auto-renew'],
              ['First charge', 'Today, May 6, 2026'],
              ['Next charge', 'May 6, 2027'],
              ['Payment method', 'Revolut Pay'],
              ['Account email', 'adaeze@example.com'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: C.slate }}>{k}</span>
                <span style={{ fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: C.border, margin: '16px 0' }}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total today</span>
            <span style={{ fontSize: 26, fontWeight: 800 }}>€50.00</span>
          </div>
        </div>
        <div style={{ marginTop: 16, padding: 14, background: C.surf, borderRadius: 12, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="spark" size={18} color={C.pri}/>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Forum posting unlocks</div>
            <div style={{ fontSize: 12, color: C.slate, lineHeight: 1.5 }}>Once payment confirms, you can post and comment in member forums.</div>
          </div>
        </div>
      </div>
    </Body>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 28px', background: '#fff', borderTop: `1px solid ${C.border}` }}>
      <button className="unng-btn primary" onClick={() => goto('M13')}>Confirm & Pay €50</button>
    </div>
  </Frame>
);

const M19_OrgsList = ({ goto, state = 'default' }) => {
  const orgs = [
    { i: 0, n: 'NDA London Chapter', cat: 'Cultural', loc: 'United Kingdom', members: 1240 },
    { i: 4, n: 'Igbo Cultural Association', cat: 'Cultural', loc: 'Germany · Berlin', members: 320 },
    { i: 7, n: 'NaijaTech UK', cat: 'Professional', loc: 'United Kingdom', members: 4150, badge: 'Verified' },
    { i: 2, n: 'NigeriaHer', cat: 'Women', loc: 'Global', members: 8900, badge: 'Verified' },
    { i: 3, n: 'Diaspora Founders', cat: 'Professional', loc: 'United States', members: 540 },
    { i: 5, n: 'Yoruba Heritage NYC', cat: 'Cultural', loc: 'United States · New York', members: 210 },
  ];
  return (
    <Frame hasTabs>
      <TopBar title="Organizations" large/>
      <SearchBar placeholder="Search organizations" onFilter={() => {}}/>
      <div style={{ display: 'flex', gap: 8, padding: '8px 16px 12px', overflowX: 'auto' }}>
        {['All', 'Cultural', 'Professional', 'Women', 'Religious', 'Student'].map((c, i) => (
          <span key={c} className={`unng-chip ${i === 0 ? 'active' : ''}`}>{c}</span>
        ))}
      </div>
      <Body hasTabs padTop={0}>
        {state === 'empty' ? (
          <StateView icon="building" title="No organizations yet" desc="Check back soon — UNNG-affiliated organizations will appear here."/>
        ) : (
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {orgs.map((o, i) => (
              <div key={i} className="unng-card" onClick={() => goto('M20')} style={{ padding: 14, display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: palette[o.i].bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                  {o.n.split(' ').map(s => s[0]).slice(0, 2).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{o.n}</span>
                    {o.badge && <Icon name="check-c" size={14} color={C.info}/>}
                  </div>
                  <div style={{ fontSize: 12, color: C.slate, display: 'flex', gap: 8 }}>
                    <span>{o.cat}</span><span>·</span><span>{o.loc}</span><span>·</span><span>{o.members.toLocaleString()} members</span>
                  </div>
                </div>
                <Icon name="chev-r" size={18} color={C.slate}/>
              </div>
            ))}
          </div>
        )}
      </Body>
      <BottomTabs active="home" onChange={t => goto(t)}/>
    </Frame>
  );
};

const M20_OrgDetail = ({ goto }) => (
  <Frame>
    <div style={{ position: 'relative' }}>
      <Img idx={7} height={160} radius={0} label="NaijaTech cover"/>
      <button onClick={() => goto('M19')} style={{
        position: 'absolute', top: 60, left: 16, width: 36, height: 36, borderRadius: '50%',
        background: 'rgba(255,255,255,0.95)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name="chev-l" size={20}/></button>
    </div>
    <Body padTop={0} style={{ marginTop: -32, position: 'relative', background: '#fff', borderRadius: '20px 20px 0 0' }}>
      <div style={{ padding: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: 18, background: palette[7].bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 24, marginTop: -52, border: '4px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}>NU</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>NaijaTech UK</h1>
          <Icon name="check-c" size={18} color={C.info}/>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <span className="unng-badge neutral">Professional</span>
          <span className="unng-badge info">Verified</span>
        </div>
        <p style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginTop: 16 }}>
          The largest community for Nigerian technologists in the UK. We host monthly meetups, a mentorship program, and a private Slack with 4,150 members across engineering, design, product, and data.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16 }}>
          {[['Members', '4,150'], ['Founded', '2019'], ['Events/yr', '24']].map(([k, v]) => (
            <div key={k} style={{ background: C.surf, borderRadius: 12, padding: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{v}</div>
              <div style={{ fontSize: 11, color: C.slate, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{k}</div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '24px 0 8px' }}>Contact</h3>
        <div className="unng-list">
          <div className="unng-row"><Icon name="globe" size={20} color={C.slate}/><div className="ttl">naijatech.uk</div><Icon name="ext" size={16} color={C.slate}/></div>
          <div className="unng-row"><Icon name="mail" size={20} color={C.slate}/><div className="ttl">hello@naijatech.uk</div><Icon name="chev-r" size={16} color={C.slate}/></div>
          <div className="unng-row"><Icon name="pin" size={20} color={C.slate}/><div className="ttl">London, United Kingdom</div></div>
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '24px 0 8px' }}>Upcoming events</h3>
        <div className="unng-card" onClick={() => goto('M11')} style={{ padding: 12, display: 'flex', gap: 12, cursor: 'pointer' }}>
          <Img idx={7} height={64} style={{ width: 64, height: 64 }} radius={10} label="EV"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Tech Talks: AI in Africa</div>
            <div style={{ fontSize: 12, color: C.slate, marginTop: 2 }}>Jun 12 · Online · €10</div>
          </div>
          <Icon name="chev-r" size={18} color={C.slate}/>
        </div>
      </div>
    </Body>
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 28px', display: 'flex', gap: 10, background: '#fff', borderTop: `1px solid ${C.border}` }}>
      <button className="unng-btn secondary" style={{ flex: '0 0 50px', padding: 0 }}><Icon name="phone" size={20} color={C.pri}/></button>
      <button className="unng-btn primary" style={{ flex: 1 }}><Icon name="globe" size={18} color="#fff"/>Open website</button>
    </div>
  </Frame>
);

Object.assign(window, {
  M15_DonateHub, M16_PlanDetails, M17_OneTimeDonation, M18_ContribCheckout,
  M19_OrgsList, M20_OrgDetail,
});
