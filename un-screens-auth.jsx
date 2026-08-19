// un-screens-auth.jsx — M00 Splash, M01-M03 Onboarding, M04-M07 Auth

const UN_SCREENS_AUTH = {};

// Shared legal / policy sheet — makes every Terms & Privacy link real
const UN_LEGAL = {
  terms: { title: 'Terms of Service', body: [
    'By using UNNG you agree to take part respectfully, keep your account details accurate, and follow the community guidelines.',
    'Memberships renew monthly until cancelled. You can cancel at any time from Membership Status; access continues to the end of the paid period.',
    'Event registrations are personal and non-transferable unless the host states otherwise.',
  ]},
  privacy: { title: 'Privacy Policy', body: [
    'We collect your name, email, and payment records to run memberships, events, and forums.',
    'Payments are processed by Revolut Pay. UNNG never stores your full card details.',
    'You can request a copy of your data or deactivate your account at any time from Settings.',
  ]},
  guidelines: { title: 'Community guidelines', body: [
    'Be respectful. Disagree with ideas, never with people.',
    'No spam, no personal attacks, and no sharing private information about others.',
    'Moderators may remove content that breaks these rules. Repeat breaches can end forum access.',
  ]},
};

function unShowLegal(proto, which) {
  const doc = UN_LEGAL[which];
  proto.openSheet({
    title: doc.title,
    render: (close) => (
      <div>
        <div style={{ display: 'grid', gap: 12, maxHeight: 300, overflowY: 'auto' }} className="un-scroll">
          {doc.body.map((p, i) => (
            <p key={i} style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: UN_COLORS.ink2 }}>{p}</p>
          ))}
          <div style={{ fontSize: 12, color: UN_COLORS.slate4 }}>Last updated May 2026 · UNNG</div>
        </div>
        <div style={{ marginTop: 18 }}><UnButton full onClick={close}>Close</UnButton></div>
      </div>
    ),
  });
}

// A tappable inline link that always does something
function UnLink({ children, onClick }) {
  return (
    <span role="button" tabIndex={0} onClick={onClick} style={{
      color: UN_COLORS.info, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline',
      textDecorationColor: 'rgba(37,99,235,0.35)', textUnderlineOffset: 2,
    }}>{children}</span>
  );
}

// ─── M00 Splash ──────────────────────────────────────────────
UN_SCREENS_AUTH.splash = function Splash({ proto, prefs }) {
  const offline = prefs.stateMode === 'offline' || prefs.stateMode === 'error';
  const [retrying, setRetrying] = React.useState(false);
  React.useEffect(() => {
    if (offline) return;
    const t = setTimeout(() => proto.reset('onboarding1'), 1400);
    return () => clearTimeout(t);
  }, [offline]);
  return (
    <div style={{ height: '100%', background: UN_COLORS.primary, color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 20, padding: 30, marginTop: -50, paddingTop: 50 }}>
      <div style={{
        width: 96, height: 96, borderRadius: 28, background: '#fff', color: UN_COLORS.primary,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44, fontWeight: 800, letterSpacing: '-0.04em',
      }}>U</div>
      <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em' }}>UNNG</div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Community · Events · Membership</div>
      <div style={{ marginTop: 20 }}>
        {offline ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <UnIconWifiOff size={28}/>
            <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
              We could not reach UNNG.<br/>Check your connection.
            </div>
            <UnButton variant="gold" size="sm" disabled={retrying}
              leading={retrying ? <UnSpinner size={14} color="#15231F"/> : undefined}
              onClick={() => {
                setRetrying(true);
                setTimeout(() => { setRetrying(false); proto.reset('onboarding1'); }, 1200);
              }}>{retrying ? 'Reconnecting…' : 'Retry'}</UnButton>
          </div>
        ) : (
          <UnSpinner size={22} color="rgba(255,255,255,0.85)"/>
        )}
      </div>
    </div>
  );
};

// ─── M01-M03 Onboarding ──────────────────────────────────────
function UnOnboardingShell({ idx, illustration, headline, body, primary, secondary, onPrimary, onSecondary, onDot }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, padding: '0 26px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 18 }}/>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {illustration}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', color: UN_COLORS.ink, lineHeight: 1.15, margin: 0 }}>{headline}</h1>
          <p style={{ fontSize: 15.5, color: UN_COLORS.slate, lineHeight: 1.5, marginTop: 12 }}>{body}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '20px 0 16px' }}>
          {[0,1,2].map((i) => (
            <button key={i} onClick={() => onDot(i)} aria-label={`Go to slide ${i + 1}`} style={{
              width: i === idx ? 24 : 10, height: 10, borderRadius: 5, padding: 0, cursor: 'pointer',
              border: 'none', background: i === idx ? UN_COLORS.primary : UN_COLORS.slate2,
              transition: 'all .25s',
            }}/>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 24px 24px', display: 'flex', gap: 10 }}>
        {secondary && <UnButton variant="ghost" onClick={onSecondary} style={{ flex: 1 }}>{secondary}</UnButton>}
        <UnButton onClick={onPrimary} style={{ flex: 2 }}>{primary}</UnButton>
      </div>
    </div>
  );
}

const UN_ONB = ['onboarding1', 'onboarding2', 'onboarding3'];

UN_SCREENS_AUTH.onboarding1 = function ({ proto }) {
  return (
    <UnOnboardingShell idx={0}
      illustration={
        <div style={{ width: 240, height: 240, borderRadius: 60, background:
          'linear-gradient(135deg, var(--un-primary-700) 0%, var(--un-primary-600) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', color: '#fff',
        }}>
          <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: 50, background: 'rgba(255,255,255,0.14)' }}/>
          <UnIconUsers size={84}/>
        </div>
      }
      headline="Welcome to UNNG"
      body="Join a community built around mentorship, real events, and members who show up for each other."
      primary="Continue" secondary="Skip"
      onPrimary={() => proto.reset('onboarding2')}
      onSecondary={() => proto.reset('authChoice')}
      onDot={(i) => proto.reset(UN_ONB[i])}
    />
  );
};

UN_SCREENS_AUTH.onboarding2 = function ({ proto }) {
  return (
    <UnOnboardingShell idx={1}
      illustration={
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, padding: '0 14px', width: '100%' }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 16, border: `1px solid ${UN_COLORS.slate2}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: UN_COLORS.gold, color: '#15231F', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><UnIconStar size={18}/></div>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>Hero</div><div style={{ fontSize: 12.5, color: UN_COLORS.slate }}>Forum posting included</div></div>
            <div style={{ marginLeft: 'auto', fontWeight: 800, color: UN_COLORS.primary }}>$10</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 18, padding: 16, border: `1.5px solid ${UN_COLORS.gold}`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: UN_COLORS.primary, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><UnIconStar size={18}/></div>
            <div><div style={{ fontWeight: 700, fontSize: 14 }}>Super Hero</div><div style={{ fontSize: 12.5, color: UN_COLORS.slate }}>Founders circle access</div></div>
            <div style={{ marginLeft: 'auto', fontWeight: 800, color: UN_COLORS.primary }}>$50</div>
          </div>
          <div style={{ background: UN_COLORS.primary50, borderRadius: 18, padding: 16, fontSize: 13, color: UN_COLORS.primary, fontWeight: 600, textAlign: 'center' }}>Or make a one-time donation</div>
        </div>
      }
      headline="Support what you love"
      body="Membership keeps the community running. Subscribe monthly or contribute when it suits you."
      primary="Continue" secondary="Skip"
      onPrimary={() => proto.reset('onboarding3')}
      onSecondary={() => proto.reset('authChoice')}
      onDot={(i) => proto.reset(UN_ONB[i])}
    />
  );
};

UN_SCREENS_AUTH.onboarding3 = function ({ proto }) {
  const features = [
    { icon: <UnIconCalendar size={22}/>, title: 'Real-world events' },
    { icon: <UnIconForum size={22}/>, title: 'Member forums' },
    { icon: <UnIconBuilding size={22}/>, title: 'Partner organizations' },
  ];
  return (
    <UnOnboardingShell idx={2}
      illustration={
        <div style={{ display: 'grid', gap: 12, width: '100%', padding: '0 14px' }}>
          {features.map((f) => (
            <div key={f.title} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 16, padding: 16, border: `1px solid ${UN_COLORS.slate2}` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: UN_COLORS.primary50, color: UN_COLORS.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{f.title}</div>
            </div>
          ))}
        </div>
      }
      headline="Three ways to take part"
      body="Find your next event, jump into a conversation, or discover an organization aligned with what you care about."
      primary="Get Started" secondary="Sign In"
      onPrimary={() => proto.reset('authChoice')}
      onSecondary={() => proto.reset('signIn')}
      onDot={(i) => proto.reset(UN_ONB[i])}
    />
  );
};

// Shared social sign-in — simulated OAuth with visible progress
function unSocialSignIn(proto, provider) {
  proto.run(`Signing in with ${provider}…`, 1500, () => proto.signIn(`adaeze@${provider.toLowerCase()}.com`));
}

// ─── M04 Auth Choice ─────────────────────────────────────────
UN_SCREENS_AUTH.authChoice = function ({ proto, prefs }) {
  return (
    <div style={{ padding: '40px 24px 28px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: UN_COLORS.primary, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22 }}>U</div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>UNNG</div>
      </div>
      <div style={{ marginTop: 60 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>Belong here.</h1>
        <p style={{ fontSize: 15.5, color: UN_COLORS.slate, marginTop: 12, lineHeight: 1.5 }}>
          Sign up to register for events, post in forums, and support the community.
        </p>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <UnButton full onClick={() => proto.push('signUp')}>Create account</UnButton>
        <UnButton full variant="neutral" onClick={() => proto.push('signIn')}>I already have an account</UnButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '10px 0' }}>
          <div style={{ flex: 1, height: 1, background: UN_COLORS.slate2 }}/>
          <div style={{ fontSize: 12, color: UN_COLORS.slate, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Or</div>
          <div style={{ flex: 1, height: 1, background: UN_COLORS.slate2 }}/>
        </div>
        <UnButton full variant="neutral" leading={<UnIconApple size={18}/>} onClick={() => unSocialSignIn(proto, 'Apple')}>Continue with Apple</UnButton>
        <UnButton full variant="neutral" leading={<UnIconGoogle size={18}/>} onClick={() => unSocialSignIn(proto, 'Google')}>Continue with Google</UnButton>
        <div style={{ fontSize: 11.5, color: UN_COLORS.slate4, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
          By continuing you agree to UNNG's <UnLink onClick={() => unShowLegal(proto, 'terms')}>Terms</UnLink> and <UnLink onClick={() => unShowLegal(proto, 'privacy')}>Privacy Policy</UnLink>.
        </div>
      </div>
    </div>
  );
};

// ─── M05 Sign Up ─────────────────────────────────────────────
UN_SCREENS_AUTH.signUp = function ({ proto, prefs }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [agree, setAgree] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [showPwd, setShowPwd] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [taken, setTaken] = React.useState(false);

  const errors = {};
  if (submitted) {
    if (!name.trim()) errors.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address.';
    else if (taken) errors.email = 'An account with this email already exists.';
    if (pwd.length < 8) errors.pwd = 'Password must be at least 8 characters.';
    if (!agree) errors.agree = 'Please accept the Terms to continue.';
  }
  const submit = () => {
    setSubmitted(true);
    const bad = !name.trim() || !/^\S+@\S+\.\S+$/.test(email) || pwd.length < 8 || !agree;
    if (bad) { proto.toast('error', 'Check the form', 'Some details still need your attention.'); return; }
    // "taken@unng.org" demonstrates a server-side rejection after submit
    if (email.trim().toLowerCase() === 'taken@unng.org') {
      proto.run('Creating your account…', 1200, () => {
        setTaken(true);
        proto.toast('error', 'Email already registered', 'Try signing in instead.');
      });
      return;
    }
    proto.run('Creating your account…', 1400, () => proto.signUp(name.trim(), email.trim()));
  };

  return (
    <div style={{ padding: '12px 22px 28px' }}>
      <UnTopBar onBack={() => proto.pop()} title="Create account" large/>
      <div style={{ padding: '4px 0 18px' }}>
        <p style={{ fontSize: 14.5, color: UN_COLORS.slate, marginTop: 0 }}>It takes less than a minute. Profile photo is optional.</p>
      </div>

      <button onClick={() => proto.run('Uploading photo…', 1100, () => { setPhoto(true); proto.toast('success', 'Photo added', 'You can change it later in Edit Profile.'); })}
        style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
        <div style={{ position: 'relative' }}>
          {photo
            ? <UnAvatar name={name || 'You'} size={72} color={UN_COLORS.primary}/>
            : <div style={{ width: 72, height: 72, borderRadius: 36, background: UN_COLORS.primary50, color: UN_COLORS.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><UnIconCamera size={26}/></div>}
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 26, height: 26, borderRadius: 13, background: photo ? UN_COLORS.success : UN_COLORS.primary, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>
            {photo ? <UnIconCheck size={13}/> : <UnIconPlus size={14}/>}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: UN_COLORS.ink }}>{photo ? 'Photo added' : 'Add a photo'}</div>
          <div style={{ fontSize: 12.5, color: UN_COLORS.slate }}>{photo ? 'Tap to replace' : 'Optional · Helps members recognize you'}</div>
        </div>
      </button>

      <div style={{ display: 'grid', gap: 14 }}>
        <UnInput label="Full name" placeholder="Adaeze Okafor" value={name} onChange={(v) => { setName(v); }} error={errors.name}/>
        <UnInput label="Email" type="email" placeholder="you@example.com" value={email}
          onChange={(v) => { setEmail(v); setTaken(false); }} error={errors.email} leadingIcon={<UnIconMail size={16}/>}
          hint={!errors.email ? 'Try taken@unng.org to see a rejected email' : undefined}/>
        <UnInput label="Password" type={showPwd ? 'text' : 'password'} placeholder="At least 8 characters" value={pwd} onChange={setPwd} error={errors.pwd} leadingIcon={<UnIconLock size={16}/>}
          rightSlot={<button onClick={() => setShowPwd(!showPwd)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: UN_COLORS.slate }}>{showPwd ? <UnIconEyeOff size={16}/> : <UnIconEye size={16}/>}</button>}/>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 4, cursor: 'pointer' }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18, accentColor: UN_COLORS.primary, flexShrink: 0 }}/>
          <div style={{ fontSize: 13, color: UN_COLORS.slate, lineHeight: 1.55 }}>
            I agree to the <UnLink onClick={() => unShowLegal(proto, 'terms')}>Terms of Service</UnLink> and <UnLink onClick={() => unShowLegal(proto, 'privacy')}>Privacy Policy</UnLink>.
          </div>
        </label>
        {errors.agree && <div style={{ fontSize: 12.5, color: UN_COLORS.danger, display: 'flex', gap: 5, alignItems: 'center' }}><UnIconAlert size={12}/>{errors.agree}</div>}

        <UnButton full size="lg" onClick={submit}>Create account</UnButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
          <div style={{ flex: 1, height: 1, background: UN_COLORS.slate2 }}/>
          <div style={{ fontSize: 11.5, color: UN_COLORS.slate, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Or sign up with</div>
          <div style={{ flex: 1, height: 1, background: UN_COLORS.slate2 }}/>
        </div>
        <UnButton full variant="neutral" leading={<UnIconApple size={18}/>} onClick={() => unSocialSignIn(proto, 'Apple')}>Apple</UnButton>

        <div style={{ textAlign: 'center', fontSize: 13.5, color: UN_COLORS.slate, marginTop: 8 }}>
          Already a member? <UnLink onClick={() => proto.replace('signIn')}>Sign in</UnLink>
        </div>
      </div>
    </div>
  );
};

// ─── M06 Sign In ─────────────────────────────────────────────
UN_SCREENS_AUTH.signIn = function ({ proto, prefs }) {
  const [email, setEmail] = React.useState('adaeze@email.com');
  const [pwd, setPwd] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [showPwd, setShowPwd] = React.useState(false);
  const [wrong, setWrong] = React.useState(false);

  const errors = {};
  if (submitted) {
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email.';
    if (!pwd) errors.pwd = 'Enter your password.';
    else if (wrong) errors.pwd = 'Email or password is incorrect.';
  }
  const submit = () => {
    setSubmitted(true);
    if (!/^\S+@\S+\.\S+$/.test(email) || !pwd) {
      proto.toast('error', 'Check the form', 'Enter your email and password.');
      return;
    }
    if (pwd.toLowerCase() === 'wrong') {
      proto.run('Signing in…', 1100, () => { setWrong(true); proto.toast('error', 'Sign in failed', 'Email or password is incorrect.'); });
      return;
    }
    proto.run('Signing in…', 1200, () => proto.signIn(email.trim()));
  };

  return (
    <div style={{ padding: '12px 22px 28px' }}>
      <UnTopBar onBack={() => proto.pop()} title="Welcome back" large subtitle="Sign in to your UNNG account"/>
      <div style={{ display: 'grid', gap: 14, marginTop: 20 }}>
        <UnInput label="Email" placeholder="you@example.com" value={email} onChange={(v) => { setEmail(v); setWrong(false); }} error={errors.email} leadingIcon={<UnIconMail size={16}/>}/>
        <UnInput label="Password" type={showPwd ? 'text' : 'password'} placeholder="Your password" value={pwd} onChange={(v) => { setPwd(v); setWrong(false); }} error={errors.pwd} leadingIcon={<UnIconLock size={16}/>}
          hint={!errors.pwd ? 'Type “wrong” to see the failure state' : undefined}
          rightSlot={<button onClick={() => setShowPwd(!showPwd)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: UN_COLORS.slate }}>{showPwd ? <UnIconEyeOff size={16}/> : <UnIconEye size={16}/>}</button>}/>
        <div style={{ textAlign: 'right', marginTop: -4 }}>
          <UnLink onClick={() => proto.push('forgotPassword')}>Forgot password?</UnLink>
        </div>
        <UnButton full size="lg" onClick={submit}>Sign in</UnButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
          <div style={{ flex: 1, height: 1, background: UN_COLORS.slate2 }}/>
          <div style={{ fontSize: 11.5, color: UN_COLORS.slate, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Or</div>
          <div style={{ flex: 1, height: 1, background: UN_COLORS.slate2 }}/>
        </div>
        <UnButton full variant="neutral" leading={<UnIconApple size={18}/>} onClick={() => unSocialSignIn(proto, 'Apple')}>Continue with Apple</UnButton>
        <div style={{ textAlign: 'center', fontSize: 13.5, color: UN_COLORS.slate, marginTop: 8 }}>
          New to UNNG? <UnLink onClick={() => proto.replace('signUp')}>Create account</UnLink>
        </div>
      </div>
    </div>
  );
};

// ─── M07 Forgot Password ─────────────────────────────────────
UN_SCREENS_AUTH.forgotPassword = function ({ proto, prefs }) {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  const invalid = submitted && !/^\S+@\S+\.\S+$/.test(email);
  const submit = () => {
    setSubmitted(true);
    if (!/^\S+@\S+\.\S+$/.test(email)) { proto.toast('error', 'Enter a valid email', 'We need a valid address to send the link.'); return; }
    proto.run('Sending reset link…', 1200, () => {
      setSent(true); setCount(30);
      proto.toast('success', 'Reset link sent', `Check ${email} for the link.`);
    });
  };

  return (
    <div style={{ padding: '12px 22px 28px' }}>
      <UnTopBar onBack={() => proto.pop()} title="Reset password" large/>
      {!sent ? (
        <div style={{ marginTop: 8 }}>
          <p style={{ fontSize: 14.5, color: UN_COLORS.slate, lineHeight: 1.5, margin: '0 0 18px' }}>
            Enter the email associated with your account. We will send you a link to set a new password.
          </p>
          <UnInput label="Email" placeholder="you@example.com" value={email} onChange={setEmail}
            error={invalid ? 'Enter a valid email address.' : undefined} leadingIcon={<UnIconMail size={16}/>}/>
          <div style={{ marginTop: 18 }}><UnButton full size="lg" onClick={submit}>Send reset link</UnButton></div>
          <div style={{ marginTop: 10 }}><UnButton full variant="ghost" onClick={() => proto.pop()}>Cancel</UnButton></div>
        </div>
      ) : (
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
          <UnStatusIcon kind="success" size={70}/>
          <div style={{ fontSize: 19, fontWeight: 700 }}>Check your email</div>
          <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.5 }}>
            We sent a reset link to <span style={{ fontWeight: 600, color: UN_COLORS.ink }}>{email}</span>. It expires in 30 minutes.
          </div>
          <div style={{ marginTop: 20, width: '100%' }}>
            <UnButton full variant="neutral" disabled={count > 0}
              onClick={() => { setCount(30); proto.toast('success', 'Link resent', `Sent again to ${email}.`); }}>
              {count > 0 ? `Resend in ${count}s` : 'Resend link'}
            </UnButton>
            <div style={{ marginTop: 10 }}><UnButton full onClick={() => proto.reset('signIn')}>Back to sign in</UnButton></div>
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { UnLink, unShowLegal, unSocialSignIn, UN_LEGAL });
window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_AUTH);
