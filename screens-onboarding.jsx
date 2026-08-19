// screens-onboarding.jsx — M00–M07: Splash, Onboarding x3, Auth Choice, Sign Up, Sign In, Forgot Password

const M00_Splash = ({ state = 'default' }) => (
  <Frame>
    <div style={{
      height: '100%', background: C.pri, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
    }}>
      <UNNGLogo size={64} dark/>
      <div style={{ color: '#fff', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>UNNG</div>
      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginTop: -16 }}>Community for Nigerians abroad</div>
      {state === 'default' && (
        <div style={{
          width: 28, height: 28, border: '3px solid rgba(255,255,255,0.25)', borderTopColor: '#fff',
          borderRadius: '50%', animation: 'spin 0.9s linear infinite', marginTop: 8,
        }}/>
      )}
      {state === 'offline' && (
        <div style={{
          marginTop: 16, padding: '10px 16px', background: 'rgba(255,255,255,0.12)',
          borderRadius: 12, color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="wifi-off" size={16}/> No internet — Tap to retry
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  </Frame>
);

const UNNGLogo = ({ size = 40, dark = false }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.28,
    background: dark ? '#fff' : C.pri, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    color: dark ? C.pri : '#fff', fontWeight: 800, fontSize: size * 0.42,
    letterSpacing: '-0.04em', boxShadow: dark ? '0 8px 24px rgba(0,0,0,0.2)' : 'none',
  }}>U</div>
);

const OnboardingShell = ({ idx, title, body, illu, primary, secondary, onPrimary, onSecondary }) => (
  <Frame>
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '60px 24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onSecondary} style={{
          background: 'transparent', border: 0, color: C.slate, fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
        }}>{secondary}</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        {illu}
        <div style={{ textAlign: 'center', maxWidth: 320 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>{title}</h1>
          <p style={{ fontSize: 15, color: C.slate, lineHeight: 1.5, margin: 0 }}>{body}</p>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 20 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: i === idx ? 22 : 6, height: 6, borderRadius: 3,
              background: i === idx ? C.pri : '#D5DAD7', transition: 'width 0.2s',
            }}/>
          ))}
        </div>
        <button className="unng-btn primary" onClick={onPrimary}>{primary}</button>
      </div>
    </div>
  </Frame>
);

const M01_Onboarding1 = (p) => (
  <OnboardingShell idx={0}
    title="Belong to something bigger"
    body="UNNG connects Nigerians around the world through events, community, and shared purpose."
    illu={<div style={{
      width: 220, height: 220, borderRadius: 32, background: `linear-gradient(135deg, ${C.pri} 0%, #1a8a72 100%)`,
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 24,
    }}>
      {[0,3,6,1].map(i => <div key={i} style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24 }}>{['JO','AD','TM','BK'][i % 4]}</div>)}
    </div>}
    primary="Continue" secondary="Skip" {...p}/>
);

const M02_Onboarding2 = (p) => (
  <OnboardingShell idx={1}
    title="Membership that gives back"
    body="Become a Hero or Super Hero member to unlock forums, support our work, and shape what we build next."
    illu={<div style={{
      width: 220, height: 220, borderRadius: 32, background: '#fff',
      border: `1px solid ${C.border}`, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="crown" size={28} color={C.gold}/>
        <span style={{ fontWeight: 700, fontSize: 17 }}>Super Hero</span>
      </div>
      <div>
        <div style={{ fontSize: 36, fontWeight: 800, color: C.ink }}>€50<span style={{ fontSize: 14, color: C.slate, fontWeight: 500 }}>/yr</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
          {['Forum posting', 'Member events', 'Founders circle'].map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.slate }}>
              <Icon name="check" size={14} color={C.success}/>{b}
            </div>
          ))}
        </div>
      </div>
    </div>}
    primary="Continue" secondary="Skip" {...p}/>
);

const M03_Onboarding3 = (p) => (
  <OnboardingShell idx={2}
    title="Events, forums, organizations"
    body="Discover what's happening, join the conversation, and find UNNG-connected groups near you."
    illu={<div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 240 }}>
      {[
        { icon: 'cal', label: 'Lagos Mixer · Sat 8pm', i: 1 },
        { icon: 'chat', label: 'Forum · Visa Q&A', i: 3 },
        { icon: 'building', label: 'Diaspora Network', i: 4 },
      ].map((c, idx) => (
        <div key={idx} style={{
          background: '#fff', border: `1px solid ${C.border}`, borderRadius: 14,
          padding: 14, display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: idx === 1 ? '0 8px 24px rgba(14,95,77,0.12)' : 'none',
          transform: `translateX(${idx === 1 ? 8 : 0}px)`,
        }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: palette[c.i].bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={c.icon} size={18} color="#fff"/>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</span>
        </div>
      ))}
    </div>}
    primary="Get Started" secondary="Sign In" {...p}/>
);

const M04_AuthChoice = ({ onSignUp, onSignIn }) => (
  <Frame>
    <div style={{ height: '100%', padding: '60px 24px 32px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <UNNGLogo size={72}/>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Welcome to UNNG</h1>
        <p style={{ color: C.slate, textAlign: 'center', maxWidth: 300, margin: 0, lineHeight: 1.5, fontSize: 15 }}>
          Join thousands of Nigerians building community, events, and impact together.
        </p>
      </div>
      <div className="col gap-3">
        <button className="unng-btn primary" onClick={onSignUp}>Create account</button>
        <button className="unng-btn secondary" onClick={onSignIn}>I already have an account</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
          <div style={{ flex: 1, height: 1, background: C.border }}/>
          <span style={{ fontSize: 12, color: C.slate, fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: C.border }}/>
        </div>
        <button className="unng-btn" style={{ background: '#000', color: '#fff' }}>
          <Icon name="apple" size={18} color="#fff"/>Continue with Apple
        </button>
        <button className="unng-btn" style={{ background: '#fff', color: C.ink, border: `1px solid ${C.border}` }}>
          <Icon name="google" size={18}/>Continue with Google
        </button>
        <div style={{ textAlign: 'center', fontSize: 12, color: C.slate, marginTop: 12, lineHeight: 1.5 }}>
          By continuing you agree to our <a style={{ color: C.pri, fontWeight: 600 }}>Terms</a> & <a style={{ color: C.pri, fontWeight: 600 }}>Privacy</a>
        </div>
      </div>
    </div>
  </Frame>
);

const M05_SignUp = ({ onCreate, onBack, state = 'default' }) => {
  const err = state === 'inline-error';
  const loading = state === 'loading';
  return (
    <Frame>
      <TopBar title="Create account" back={onBack}/>
      <Body padTop={0}>
        <div style={{ padding: '8px 16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 88, height: 88, borderRadius: '50%', background: C.pri50,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="user" size={36} color={C.pri}/>
              </div>
              <div style={{
                position: 'absolute', right: -2, bottom: -2, width: 30, height: 30,
                borderRadius: '50%', background: C.pri, display: 'flex',
                alignItems: 'center', justifyContent: 'center', border: '2px solid #fff',
              }}>
                <Icon name="plus" size={16} color="#fff"/>
              </div>
            </div>
          </div>
          <div className="col gap-3">
            <div className="unng-field">
              <label className="unng-label">Full name</label>
              <input className="unng-input" defaultValue="Adaeze Okonkwo"/>
            </div>
            <div className="unng-field">
              <label className="unng-label">Email</label>
              <input className={`unng-input ${err ? 'err' : ''}`} defaultValue={err ? 'adaeze@example.com' : ''} placeholder="you@email.com"/>
              {err && <span className="unng-help err">An account already exists. <a style={{ color: C.danger, fontWeight: 600 }}>Sign in instead</a></span>}
            </div>
            <div className="unng-field">
              <label className="unng-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="unng-input" type="password" defaultValue="••••••••" style={{ paddingRight: 44, width: '100%' }}/>
                <button style={{ position: 'absolute', right: 12, top: 12, background: 'transparent', border: 0, cursor: 'pointer', color: C.slate }}>
                  <Icon name="eye" size={20}/>
                </button>
              </div>
              <span className="unng-help">8+ characters, mix of letters and numbers</span>
            </div>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 8, fontSize: 13, color: C.slate, lineHeight: 1.5 }}>
              <input type="checkbox" defaultChecked style={{ marginTop: 2, accentColor: C.pri }}/>
              I agree to UNNG's <a style={{ color: C.pri, fontWeight: 600 }}>Terms</a> and <a style={{ color: C.pri, fontWeight: 600 }}>Privacy Policy</a>
            </label>
            <button className={`unng-btn primary ${loading ? 'disabled' : ''}`} style={{ marginTop: 16 }} onClick={onCreate}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </div>
        </div>
      </Body>
    </Frame>
  );
};

const M06_SignIn = ({ onSignIn, onForgot, onBack, state = 'default' }) => {
  const err = state === 'inline-error';
  return (
    <Frame>
      <TopBar title="Sign in" back={onBack}/>
      <Body>
        <div style={{ padding: '32px 16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
          <UNNGLogo size={56}/>
          <div style={{ marginTop: 16, fontWeight: 700, fontSize: 20 }}>Welcome back</div>
        </div>
        <div style={{ padding: '0 16px' }} className="col gap-3">
          <div className="unng-field">
            <label className="unng-label">Email</label>
            <input className="unng-input" defaultValue="adaeze@example.com"/>
          </div>
          <div className="unng-field">
            <label className="unng-label">Password</label>
            <input className={`unng-input ${err ? 'err' : ''}`} type="password" defaultValue="••••••"/>
            {err && <span className="unng-help err">Email or password is incorrect.</span>}
          </div>
          <div style={{ textAlign: 'right' }}>
            <a onClick={onForgot} style={{ color: C.pri, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Forgot password?</a>
          </div>
          <button className="unng-btn primary" onClick={onSignIn} style={{ marginTop: 8 }}>Sign in</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
            <div style={{ flex: 1, height: 1, background: C.border }}/>
            <span style={{ fontSize: 12, color: C.slate, fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: C.border }}/>
          </div>
          <button className="unng-btn" style={{ background: '#000', color: '#fff' }}>
            <Icon name="apple" size={18} color="#fff"/>Continue with Apple
          </button>
          <button className="unng-btn" style={{ background: '#fff', color: C.ink, border: `1px solid ${C.border}` }}>
            <Icon name="google" size={18}/>Continue with Google
          </button>
        </div>
      </Body>
    </Frame>
  );
};

const M07_ForgotPassword = ({ onBack, state = 'default' }) => {
  const sent = state === 'success';
  return (
    <Frame>
      <TopBar title="Reset password" back={onBack}/>
      <Body>
        {!sent ? (
          <div style={{ padding: '24px 16px' }}>
            <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.5, marginTop: 0 }}>
              Enter your email and we'll send you a link to reset your password.
            </p>
            <div className="unng-field" style={{ marginTop: 16 }}>
              <label className="unng-label">Email</label>
              <input className="unng-input" placeholder="you@email.com"/>
            </div>
            <button className="unng-btn primary" style={{ marginTop: 24 }}>Send reset link</button>
          </div>
        ) : (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 22, background: C.pri50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Icon name="mail" size={32} color={C.pri}/>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>Check your email</h2>
            <p style={{ color: C.slate, fontSize: 14, lineHeight: 1.5, margin: '0 auto', maxWidth: 280 }}>
              If an account exists for <b>adaeze@example.com</b>, you'll receive a reset link shortly.
            </p>
            <button className="unng-btn ghost" style={{ marginTop: 24 }}>
              Resend in <span style={{ color: C.slate, marginLeft: 4 }}>00:42</span>
            </button>
          </div>
        )}
      </Body>
    </Frame>
  );
};

Object.assign(window, {
  UNNGLogo, M00_Splash, M01_Onboarding1, M02_Onboarding2, M03_Onboarding3,
  M04_AuthChoice, M05_SignUp, M06_SignIn, M07_ForgotPassword,
});
