// un-screens-donate.jsx — M15 Donate hub, M16 Plans, M17 One-time, M18 Checkout

const UN_SCREENS_DONATE = {};

const UN_PLANS = [
  { id: 'hero', name: 'Hero', price: 10, cadence: 'month', tag: null,
    benefits: ['Post and reply in all forums', 'Member-only event pricing', 'Monthly community digest'] },
  { id: 'superhero', name: 'Super Hero', price: 50, cadence: 'month', tag: 'Most impact',
    benefits: ['Everything in Hero', 'Founders circle access', 'Priority event registration', 'Name on the supporters wall'] },
];

// ─── M15 Donate & Subscribe Hub ───────────────────────────────
UN_SCREENS_DONATE.donateHub = function DonateHub({ proto, prefs }) {
  const role = prefs.role;
  const m = proto.data.membership;
  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Support UNNG" large subtitle="Every contribution funds events, grants, and mentorship."/>

      {/* Current status */}
      <div style={{ padding: '10px 20px 18px' }}>
        {role === 'paid' ? (
          <UnCard style={{ background: UN_COLORS.success50, borderColor: 'transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff', color: UN_COLORS.success, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><UnIconCheck size={20}/></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: UN_COLORS.ink }}>{m.plan} membership active</div>
                <div style={{ fontSize: 12.5, color: UN_COLORS.slate }}>
                  {m.cancelAtPeriodEnd ? `Ends ${m.renews}` : `Renews ${m.renews}`} · {unMoney(m.price)}/month
                </div>
              </div>
              <UnButton size="sm" variant="neutral" onClick={() => { proto.goTab('profile'); setTimeout(() => proto.push('membership'), 20); }}>Manage</UnButton>
            </div>
          </UnCard>
        ) : (
          <UnCard style={{ borderColor: UN_COLORS.gold, background: UN_COLORS.gold50 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: UN_COLORS.ink }}>You are not a member yet</div>
            <div style={{ fontSize: 13, color: UN_COLORS.slate, marginTop: 4, lineHeight: 1.45 }}>
              Forum posting is available to active members. Subscribe to join the discussion.
            </div>
          </UnCard>
        )}
      </div>

      {/* Plans */}
      <UnSectionHeader title="Monthly membership" action="Compare" onAction={() => proto.push('subscriptionPlans')}/>
      <div style={{ padding: '0 20px 20px', display: 'grid', gap: 12 }}>
        {UN_PLANS.map((p) => (
          <UnPlanCard key={p.id} plan={p} current={role === 'paid' && m.plan === p.name}
            onClick={() => {
              if (role === 'paid' && m.plan === p.name) {
                proto.toast('info', 'Already your plan', `You are on ${p.name}. Manage it from Membership.`);
                return;
              }
              proto.push('contributionCheckout', { kind: 'subscription', plan: p, amount: p.price });
            }}/>
        ))}
      </div>

      {/* One-time */}
      <UnSectionHeader title="One-time donation"/>
      <div style={{ padding: '0 20px' }}>
        <UnCard onClick={() => proto.push('donateOneTime')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: UN_COLORS.primary50, color: UN_COLORS.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><UnIconHeart size={20}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Give once</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 2 }}>Any amount, no recurring charge</div>
            </div>
            <UnIconChevronRight size={18}/>
          </div>
        </UnCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, padding: '0 4px', fontSize: 12, color: UN_COLORS.slate }}>
          <UnIconShield size={14}/> Payments are processed securely by Revolut Pay.
        </div>
      </div>
    </div>
  );
};

function UnPlanCard({ plan, onClick, selected, compact, current }) {
  const isTop = !!plan.tag;
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 18, padding: 18, cursor: 'pointer',
      border: `1.5px solid ${selected ? UN_COLORS.primary : current ? UN_COLORS.success : (isTop ? UN_COLORS.gold : UN_COLORS.slate2)}`,
      position: 'relative',
    }}>
      {current ? (
        <div style={{
          position: 'absolute', top: -9, right: 16, background: UN_COLORS.success,
          color: '#fff', fontSize: 10.5, fontWeight: 700, padding: '3px 10px',
          borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>Your plan</div>
      ) : plan.tag ? (
        <div style={{
          position: 'absolute', top: -9, right: 16, background: UN_COLORS.gold,
          color: '#15231F', fontSize: 10.5, fontWeight: 700, padding: '3px 10px',
          borderRadius: 999, letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>{plan.tag}</div>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: UN_COLORS.ink }}>{plan.name}</div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: UN_COLORS.ink, letterSpacing: '-0.02em' }}>{unMoney(plan.price)}</span>
          <span style={{ fontSize: 13, color: UN_COLORS.slate, fontWeight: 500 }}>/{plan.cadence}</span>
        </div>
      </div>
      {!compact && (
        <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>
          {plan.benefits.map((b) => (
            <div key={b} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, color: UN_COLORS.ink2 }}>
              <span style={{ color: UN_COLORS.success, marginTop: 1, flexShrink: 0 }}><UnIconCheck size={14}/></span>{b}
            </div>
          ))}
        </div>
      )}
      {selected !== undefined && (
        <div style={{
          position: 'absolute', top: 18, right: 18, width: 22, height: 22, borderRadius: 11,
          border: `2px solid ${selected ? UN_COLORS.primary : UN_COLORS.slate2}`,
          background: selected ? UN_COLORS.primary : '#fff', color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>{selected && <UnIconCheck size={12}/>}</div>
      )}
    </div>
  );
}

// ─── M16 Subscription Plan Details ────────────────────────────
UN_SCREENS_DONATE.subscriptionPlans = function Plans({ proto, prefs }) {
  const m = proto.data.membership;
  const [sel, setSel] = React.useState(m ? (UN_PLANS.find(p => p.name !== m.plan) || UN_PLANS[1]).id : 'superhero');
  const plan = UN_PLANS.find(p => p.id === sel);
  const isCurrent = m && m.plan === plan.name;
  return (
    <div style={{ paddingBottom: 120 }}>
      <UnTopBar title="Choose a plan" onBack={proto.pop}/>
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.5, marginBottom: 16 }}>
          Membership renews monthly. You can cancel any time from Membership Status — access continues to the end of the paid period.
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {UN_PLANS.map((p) => (
            <UnPlanCard key={p.id} plan={p} selected={sel === p.id} current={m && m.plan === p.name} onClick={() => setSel(p.id)}/>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: 14, background: UN_COLORS.primary50, borderRadius: 14, fontSize: 12.5, color: UN_COLORS.ink2, lineHeight: 1.5 }}>
          Membership becomes active as soon as your payment is confirmed. Forum posting unlocks immediately.
        </div>
      </div>
      <UnStickyBar>
        <div style={{ display: 'grid', gap: 8 }}>
          <UnButton full disabled={isCurrent}
            onClick={() => proto.push('contributionCheckout', { kind: 'subscription', plan, amount: plan.price })}>
            {isCurrent ? `${plan.name} is your current plan` : `Continue with ${plan.name} · ${unMoney(plan.price)}/mo`}
          </UnButton>
          <UnButton full variant="ghost" onClick={proto.pop}>Cancel</UnButton>
        </div>
      </UnStickyBar>
    </div>
  );
};

// ─── M17 One-Time Donation ────────────────────────────────────
UN_SCREENS_DONATE.donateOneTime = function OneTime({ proto, prefs }) {
  const presets = [10, 25, 50, 100];
  const [amt, setAmt] = React.useState(25);
  const [custom, setCustom] = React.useState('');
  const [note, setNote] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const parsed = custom.trim() === '' ? null : Number(custom);
  const value = parsed === null ? amt : (isNaN(parsed) ? 0 : parsed);
  const error = touched && custom.trim() !== ''
    ? (isNaN(parsed) ? 'Enter numbers only, for example 30.'
      : parsed < 1 ? 'Enter an amount of $1 or more.'
      : parsed > 5000 ? 'For gifts over $5,000 please contact the team.' : undefined)
    : undefined;
  const valid = !error && value >= 1;

  return (
    <div style={{ paddingBottom: 120 }}>
      <UnTopBar title="One-time donation" onBack={proto.pop}/>
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.5, marginBottom: 16 }}>
          Your gift funds community grants, event subsidies, and the mentor network.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {presets.map((p) => {
            const on = custom.trim() === '' && amt === p;
            return (
              <button key={p} onClick={() => { setAmt(p); setCustom(''); setTouched(false); }} style={{
                height: 62, borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
                border: `1.5px solid ${on ? UN_COLORS.primary : UN_COLORS.slate2}`,
                background: on ? UN_COLORS.primary50 : '#fff',
                color: on ? UN_COLORS.primary : UN_COLORS.ink,
                fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em',
              }}>{unMoney(p)}</button>
            );
          })}
        </div>
        <div style={{ marginTop: 16 }}>
          <UnInput label="Or enter a custom amount" value={custom}
            onChange={(v) => { setCustom(v); setTouched(true); }}
            placeholder="0.00" leadingIcon={<span style={{ fontWeight: 700, fontSize: 15 }}>$</span>}
            error={error} hint={!error ? 'Leave blank to use a preset above' : undefined}/>
        </div>
        <div style={{ marginTop: 16 }}>
          <UnInput label="Add a note (optional)" value={note} onChange={setNote} multiline rows={3}
            placeholder="Dedicate this gift or tell us why you gave" hint={`${note.length}/280`}/>
        </div>
      </div>
      <UnStickyBar>
        <div style={{ display: 'grid', gap: 8 }}>
          <UnButton full disabled={!valid}
            onClick={() => proto.push('contributionCheckout', { kind: 'donation', amount: value, note })}>
            {valid ? `Review ${unMoney(value)} donation` : 'Enter an amount'}
          </UnButton>
          <UnButton full variant="ghost" onClick={proto.pop}>Cancel</UnButton>
        </div>
      </UnStickyBar>
    </div>
  );
};

// ─── M18 Contribution Checkout ────────────────────────────────
UN_SCREENS_DONATE.contributionCheckout = function Checkout({ proto, prefs }) {
  const kind = proto.params.kind || 'donation';
  const plan = proto.params.plan || UN_PLANS[0];
  const amount = proto.params.amount ?? (kind === 'subscription' ? plan.price : 25);
  const [agree, setAgree] = React.useState(true);
  const recurring = kind === 'subscription';
  const itemName = recurring ? `${plan.name} Subscription` : 'One-time donation';
  return (
    <div style={{ paddingBottom: 130 }}>
      <UnTopBar title="Review & pay" onBack={proto.pop}/>
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{
          background: '#fff', borderRadius: 18, border: `1px solid ${UN_COLORS.slate2}`,
          padding: 20, textAlign: 'center',
        }}>
          <div style={{ fontSize: 12.5, color: UN_COLORS.slate, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {recurring ? 'Recurring monthly' : 'One-time'}
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em', color: UN_COLORS.ink, marginTop: 6 }}>{unMoney(amount)}</div>
          <div style={{ fontSize: 14.5, color: UN_COLORS.ink2, fontWeight: 600, marginTop: 2 }}>{itemName}</div>
        </div>

        <div style={{ marginTop: 16, background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`, overflow: 'hidden' }}>
          <UnCheckoutRow label="Item" value={itemName}/>
          <UnCheckoutRow label="Amount" value={unMoney(amount)}/>
          <UnCheckoutRow label="Recurrence" value={recurring ? 'Every month until cancelled' : 'Does not repeat'}/>
          <UnCheckoutRow label="Account" value={UN_USER.email}/>
          <UnCheckoutRow label="Payment method" value="Revolut Pay" icon={<UnIconRevolut size={16}/>} isLast/>
        </div>

        <div style={{ marginTop: 16, padding: 14, background: UN_COLORS.primary50, borderRadius: 14, fontSize: 13, color: UN_COLORS.ink2, lineHeight: 1.5 }}>
          {recurring
            ? `You are about to pay ${unMoney(amount)} for ${itemName}. Your membership becomes active after payment is confirmed.`
            : `You are about to donate ${unMoney(amount)} to UNNG. This is a single charge and does not create a membership.`}
        </div>

        <label style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
            style={{ width: 20, height: 20, accentColor: UN_COLORS.primary, marginTop: 1, flexShrink: 0 }}/>
          <span style={{ fontSize: 13, color: UN_COLORS.slate, lineHeight: 1.45 }}>
            I agree to the <span style={{ color: UN_COLORS.info, fontWeight: 600 }}>Terms of Service</span> and understand {recurring ? 'this payment repeats monthly' : 'donations are non-refundable'}.
          </span>
        </label>
      </div>
      <UnStickyBar>
        <UnButton full disabled={!agree} onClick={() => proto.push('paymentProcessing', { kind, amount, plan, itemName })}>
          Confirm & pay {unMoney(amount)}
        </UnButton>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: UN_COLORS.slate, marginTop: 8 }}>
          You will be redirected to Revolut Pay to complete this payment.
        </div>
      </UnStickyBar>
    </div>
  );
};

function UnCheckoutRow({ label, value, icon, isLast }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
      borderBottom: isLast ? 'none' : `1px solid ${UN_COLORS.slate2}`,
    }}>
      <div style={{ fontSize: 13.5, color: UN_COLORS.slate, flexShrink: 0 }}>{label}</div>
      <div style={{ marginLeft: 'auto', fontSize: 13.5, fontWeight: 600, color: UN_COLORS.ink, textAlign: 'right', display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}{value}
      </div>
    </div>
  );
}

// Sticky bottom action bar used on focused/checkout screens
function UnStickyBar({ children }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40,
      padding: '14px 20px 30px', background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${UN_COLORS.slate2}`,
    }}>{children}</div>
  );
}

Object.assign(window, { UnPlanCard, UnStickyBar, UnCheckoutRow, UN_PLANS });
window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_DONATE);
