// un-screens-profile.jsx — M28 Profile, M29 Edit, M30 Membership,
// M31 Transactions, M32 Transaction detail, M33 Notifications, M34 Settings, M35 Delete

const UN_SCREENS_PROFILE = {};

// ─── M28 Profile Overview ─────────────────────────────────────
UN_SCREENS_PROFILE.profile = function Profile({ proto, prefs }) {
  const paid = prefs.role === 'paid';
  const m = proto.data.membership;
  const unread = proto.data.notifs.filter(n => !n.read).length;
  const myTopics = proto.data.topics.filter(t => t.mine);
  const myComments = myTopics.reduce((n, t) => n + ((proto.data.comments[t.id] || []).length), 0);
  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Profile" large/>

      <div style={{ padding: '6px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <UnAvatar name={proto.data.user.name} size={64} color={proto.data.user.avatarColor}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', color: UN_COLORS.ink }}>{proto.data.user.name}</div>
            <div style={{ fontSize: 13, color: UN_COLORS.slate, marginTop: 2 }}>{proto.data.user.username}</div>
            <div style={{ marginTop: 7 }}>
              {paid
                ? <UnBadge status="paid" icon={<UnIconStar size={10}/>}>Hero member</UnBadge>
                : <UnBadge status="unpaid">Not a member</UnBadge>}
            </div>
          </div>
          <UnButton size="sm" variant="neutral" onClick={() => proto.push('editProfile')}>Edit</UnButton>
        </div>
      </div>

      {/* Membership call-out */}
      <div style={{ padding: '0 20px 18px' }}>
        <UnCard onClick={() => proto.push(paid ? 'membership' : 'subscriptionPlans')}
          style={{ background: paid ? UN_COLORS.primary : '#fff', borderColor: paid ? 'transparent' : UN_COLORS.gold }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: paid ? 'rgba(255,255,255,0.16)' : UN_COLORS.gold50,
              color: paid ? '#fff' : '#8A6B1F',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><UnIconStar size={18}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: paid ? '#fff' : UN_COLORS.ink }}>
                {paid ? 'Membership active' : 'Become a member'}
              </div>
              <div style={{ fontSize: 12.5, color: paid ? 'rgba(255,255,255,0.8)' : UN_COLORS.slate, marginTop: 2 }}>
                {paid ? `${m.cancelAtPeriodEnd ? 'Ends' : 'Renews'} ${m.renews} · ${unMoney(m.price)}/${m.cadence}` : 'From $10/month · unlock forums'}
              </div>
            </div>
            <span style={{ color: paid ? 'rgba(255,255,255,0.7)' : UN_COLORS.slate }}><UnIconChevronRight size={18}/></span>
          </div>
        </UnCard>
      </div>

      {/* Account group */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Account</div>
        <UnCard padded={false}>
          <UnRow icon={<UnIconUser size={17}/>} title="Edit profile" subtitle="Name and photo" trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.push('editProfile')}/>
          <UnRow icon={<UnIconStar size={17}/>} title="Membership status" subtitle={paid ? `${m.plan} · ${m.cancelAtPeriodEnd ? 'Ends ' + m.renews : 'Active'}` : 'No active plan'} trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.push('membership')}/>
          <UnRow icon={<UnIconReceipt size={17}/>} title="Transactions" subtitle={`${proto.data.txs.length} payments`} trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.push('transactions')}/>
          <UnRow icon={<UnIconBell size={17}/>} title="Notifications"
            subtitle={unread ? `${unread} unread` : 'All caught up'}
            trailing={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {unread > 0 && <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: UN_COLORS.danger, color: '#fff', fontSize: 11.5, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>{unread}</span>}
              <UnIconChevronRight size={17}/>
            </div>}
            onClick={() => proto.push('notifications')} isLast/>
        </UnCard>
      </div>

      {/* Community group */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Community</div>
        <UnCard padded={false}>
          <UnRow icon={<UnIconCalendar size={17}/>} title="My events" subtitle={`${proto.data.registrations.length} upcoming registration${proto.data.registrations.length === 1 ? '' : 's'}`} trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.goTab('events')}/>
          <UnRow icon={<UnIconBuilding size={17}/>} title="Organizations" subtitle={UN_USER.organizations.join(', ')} trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.push('organizationsList')}/>
          <UnRow icon={<UnIconForum size={17}/>} title="My topics" subtitle={`${myTopics.length} topic${myTopics.length === 1 ? '' : 's'} · ${myComments} comment${myComments === 1 ? '' : 's'}`} trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.goTab('forums')} isLast/>
        </UnCard>
      </div>

      {/* Settings */}
      <div style={{ padding: '0 20px' }}>
        <UnCard padded={false}>
          <UnRow icon={<UnIconShield size={17}/>} title="Settings" subtitle="Preferences, legal, account" trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.push('settings')} isLast/>
        </UnCard>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: UN_COLORS.slate4, marginTop: 20 }}>
          Member since {proto.data.user.joinedAt} · UNNG 1.0.0
        </div>
      </div>
    </div>
  );
};

// ─── M29 Edit Profile ─────────────────────────────────────────
UN_SCREENS_PROFILE.editProfile = function EditProfile({ proto, prefs }) {
  const [name, setName] = React.useState(proto.data.user.name);
  const [uploading, setUploading] = React.useState(false);
  const dirty = name.trim() !== proto.data.user.name && name.trim().length > 0;
  const uploadErr = prefs.stateMode === 'error';

  return (
    <div style={{ paddingBottom: 110 }}>
      <UnTopBar title="Edit profile" onBack={proto.pop}/>
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <UnAvatar name={proto.data.user.name} size={92} color={proto.data.user.avatarColor}/>
            {uploading && (
              <div style={{ position: 'absolute', inset: 0, borderRadius: 46, background: 'rgba(21,35,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UnSpinner size={26} color="#fff"/>
              </div>
            )}
            <button onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1400); }} style={{
              position: 'absolute', right: -4, bottom: -4, width: 32, height: 32, borderRadius: 16,
              background: UN_COLORS.primary, color: '#fff', border: '3px solid #fff', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0,
            }}><UnIconCamera size={15}/></button>
          </div>
          {uploadErr ? (
            <div style={{ fontSize: 12.5, color: UN_COLORS.danger, display: 'flex', alignItems: 'center', gap: 5 }}>
              <UnIconAlert size={13}/> Upload failed. Try a smaller image.
            </div>
          ) : (
            <div style={{ fontSize: 12.5, color: UN_COLORS.slate }}>JPG or PNG, up to 5 MB</div>
          )}
        </div>

        <div style={{ marginTop: 26, display: 'grid', gap: 16 }}>
          <UnInput label="Full name" value={name} onChange={setName}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: UN_COLORS.ink2, marginBottom: 6 }}>Username</div>
            <div style={{
              height: 48, borderRadius: 12, border: `1.5px solid ${UN_COLORS.slate2}`,
              background: UN_COLORS.surface, display: 'flex', alignItems: 'center',
              padding: '0 14px', gap: 10, color: UN_COLORS.slate, fontSize: 15,
            }}>
              <span style={{ flex: 1 }}>{proto.data.user.username}</span><UnIconLock size={15}/>
            </div>
            <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 6 }}>Usernames cannot be changed.</div>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: UN_COLORS.ink2, marginBottom: 6 }}>Email</div>
            <div style={{
              height: 48, borderRadius: 12, border: `1.5px solid ${UN_COLORS.slate2}`,
              background: UN_COLORS.surface, display: 'flex', alignItems: 'center',
              padding: '0 14px', gap: 10, color: UN_COLORS.slate, fontSize: 15,
            }}>
              <span style={{ flex: 1 }}>{proto.data.user.email}</span><UnIconLock size={15}/>
            </div>
            <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 6 }}>Contact support to change your email.</div>
          </div>
        </div>
      </div>

      <UnStickyBar>
        <UnButton full disabled={!dirty} onClick={() => proto.run('Saving…', 600, () => {
          proto.updateProfile(name.trim());
          proto.toast('success', 'Profile updated');
          proto.pop();
        })}>Save changes</UnButton>
      </UnStickyBar>
    </div>
  );
};

// ─── M30 Membership Status ────────────────────────────────────
UN_SCREENS_PROFILE.membership = function Membership({ proto, prefs }) {
  const paid = prefs.role === 'paid';
  const m = proto.data.membership;
  const failed = prefs.stateMode === 'error';
  const [cancelOpen, setCancelOpen] = React.useState(false);

  if (!paid || !m) {
    return (
      <div style={{ paddingBottom: 110 }}>
        <UnTopBar title="Membership" onBack={proto.pop}/>
        <UnEmpty icon={<UnIconStar size={28}/>} title="No active membership"
          body="You are not currently a member. Subscribe to post in forums, get member event pricing, and support UNNG's work."
          actionLabel="See plans" onAction={() => proto.push('subscriptionPlans')}/>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 110 }}>
      <UnTopBar title="Membership" onBack={proto.pop}/>

      <div style={{ padding: '18px 20px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${UN_COLORS.primary} 0%, ${UN_COLORS.primary600} 100%)`,
          color: '#fff', borderRadius: 20, padding: 20, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(203,161,53,0.22)' }}/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
            <UnIconStar size={12}/> {m.plan} Membership
          </div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10 }}>{unMoney(m.price)}<span style={{ fontSize: 15, fontWeight: 500, opacity: 0.8 }}>/{m.cadence}</span></div>
          <div style={{ marginTop: 14, display: 'flex', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Status</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 3 }}>{failed ? 'Payment failed' : m.cancelAtPeriodEnd ? 'Ending' : 'Active'}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{m.cancelAtPeriodEnd ? 'Ends' : 'Renews'}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 3 }}>{m.renews}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Since</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 3 }}>{proto.data.user.joinedAt}</div>
            </div>
          </div>
        </div>

        {m.cancelAtPeriodEnd && !failed && (
          <div style={{ marginTop: 14, background: UN_COLORS.gold50, borderRadius: 14, padding: 14, display: 'flex', gap: 10 }}>
            <span style={{ color: '#8A6B1F', flexShrink: 0, marginTop: 1 }}><UnIconAlert size={17}/></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: UN_COLORS.ink }}>Your membership will not renew</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.ink2, marginTop: 3, lineHeight: 1.45 }}>
                You keep access until {m.renews}. Change your mind any time before then.
              </div>
              <div style={{ marginTop: 10 }}>
                <UnButton size="sm" onClick={() => proto.run('Resuming…', 700, () => proto.resumeMembership())}>Resume membership</UnButton>
              </div>
            </div>
          </div>
        )}

        {failed && (
          <div style={{ marginTop: 14, background: UN_COLORS.danger50, borderRadius: 14, padding: 14, display: 'flex', gap: 10 }}>
            <span style={{ color: UN_COLORS.danger, flexShrink: 0, marginTop: 1 }}><UnIconAlert size={17}/></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: UN_COLORS.danger }}>Renewal payment was not completed</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.ink2, marginTop: 3, lineHeight: 1.45 }}>
                You were not charged by UNNG. Retry to keep your access from lapsing on June 4.
              </div>
              <div style={{ marginTop: 10 }}>
                <UnButton size="sm" variant="destructive" onClick={() => proto.push('contributionCheckout', { kind: 'subscription', plan: { name: m.plan, price: m.price }, amount: m.price })}>Retry payment</UnButton>
              </div>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4 }}>Your benefits</div>
          <UnCard>
            <div style={{ display: 'grid', gap: 10 }}>
              {(UN_PLANS.find(p => p.name === m.plan) || UN_PLANS[0]).benefits.map(b => (
                <div key={b} style={{ display: 'flex', gap: 9, fontSize: 14, color: UN_COLORS.ink2, alignItems: 'flex-start' }}>
                  <span style={{ color: UN_COLORS.success, marginTop: 1, flexShrink: 0 }}><UnIconCheck size={15}/></span>{b}
                </div>
              ))}
            </div>
          </UnCard>
        </div>

        {/* Billing */}
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4 }}>Billing</div>
          <UnCard padded={false}>
            <UnRow icon={<UnIconCard size={17}/>} title="Revolut Pay" subtitle="•• 4421" trailing={<UnIconChevronRight size={17}/>} onClick={() => {}}/>
            <UnRow icon={<UnIconReceipt size={17}/>} title="Payment history" subtitle={`${proto.data.txs.length} transactions`} trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.push('transactions')} isLast/>
          </UnCard>
        </div>

        <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
          <UnButton full variant="secondary" onClick={() => proto.push('subscriptionPlans')}>Change plan</UnButton>
          {!m.cancelAtPeriodEnd && <UnButton full variant="ghost" style={{ color: UN_COLORS.danger }} onClick={() => setCancelOpen(true)}>Cancel membership</UnButton>}
        </div>
      </div>

      {cancelOpen && (
        <UnModal title="Cancel your membership?" onClose={() => setCancelOpen(false)}>
          <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.55 }}>
            Your access continues until {m.renews}. After that you will no longer be able to post in forums or get member event pricing.
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
            <UnButton full variant="neutral" onClick={() => setCancelOpen(false)}>Keep membership</UnButton>
            <UnButton full variant="destructiveOutline" onClick={() => { setCancelOpen(false); proto.cancelMembership(); }}>Cancel at period end</UnButton>
          </div>
        </UnModal>
      )}
    </div>
  );
};

// ─── M31 Transactions List ────────────────────────────────────
const UN_TX_STATUS = { successful: 'paid', pending: 'pending', failed: 'failed', refunded: 'refunded', cancelled: 'inactive' };

UN_SCREENS_PROFILE.transactions = function Transactions({ proto, prefs }) {
  const [filter, setFilter] = React.useState('all');
  const filters = [['all','All'],['subscription','Subscriptions'],['donation','Donations'],['event','Events']];
  const list = prefs.stateMode === 'empty' ? []
    : proto.data.txs.filter(t => filter === 'all' || t.type === filter);

  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Transactions" onBack={proto.pop}
        trailing={<button style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: UN_COLORS.surface, color: UN_COLORS.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><UnIconFilter size={17}/></button>}/>
      <div className="un-scroll" style={{ display: 'flex', gap: 8, padding: '14px 20px 16px', overflowX: 'auto' }}>
        {filters.map(([v,l]) => <UnChip key={v} active={filter === v} onClick={() => setFilter(v)}>{l}</UnChip>)}
      </div>

      {prefs.stateMode === 'loading' ? (
        <div style={{ padding: '0 20px', display: 'grid', gap: 10 }}>{[0,1,2,3,4].map(i => <UnSkeleton key={i} h={68} r={14}/>)}</div>
      ) : list.length === 0 ? (
        <UnEmpty icon={<UnIconReceipt size={28}/>} title="You have no payments yet"
          body="Donations, subscriptions, and event payments will appear here."
          actionLabel="Support UNNG" onAction={() => proto.goTab('donate')}/>
      ) : (
        <div style={{ padding: '0 20px' }}>
          <UnCard padded={false}>
            {list.map((t, i) => (
              <div key={t.id} onClick={() => proto.push('transactionDetail', { tx: t })} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 14, cursor: 'pointer',
                borderBottom: i === list.length - 1 ? 'none' : `1px solid ${UN_COLORS.slate2}`,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                  background: t.type === 'donation' ? UN_COLORS.primary50 : t.type === 'event' ? UN_COLORS.info50 : UN_COLORS.gold50,
                  color: t.type === 'donation' ? UN_COLORS.primary : t.type === 'event' ? UN_COLORS.info : '#8A6B1F',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {t.type === 'donation' ? <UnIconHeart size={17}/> : t.type === 'event' ? <UnIconCalendar size={17}/> : <UnIconStar size={17}/>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: UN_COLORS.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: UN_COLORS.slate, marginTop: 3 }}>{t.date}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: t.status === 'failed' ? UN_COLORS.slate4 : UN_COLORS.ink, textDecoration: t.status === 'failed' ? 'line-through' : 'none' }}>
                    {t.amount === 0 ? 'Free' : unMoney(t.amount)}
                  </div>
                  <div style={{ marginTop: 4 }}><UnBadge status={UN_TX_STATUS[t.status]} size="sm">{t.status}</UnBadge></div>
                </div>
              </div>
            ))}
          </UnCard>
        </div>
      )}
    </div>
  );
};

// ─── M32 Transaction Detail ───────────────────────────────────
UN_SCREENS_PROFILE.transactionDetail = function TxDetail({ proto, prefs }) {
  const base = proto.params.tx || proto.data.txs[0];
  const t = proto.data.txs.find(x => x.id === base.id) || base;
  const kindMap = { successful: 'success', pending: 'pending', failed: 'failed', refunded: 'info', cancelled: 'info' };
  return (
    <div style={{ paddingBottom: 110 }}>
      <UnTopBar title="Transaction" onBack={proto.pop}/>
      <div style={{ padding: '26px 20px 0', textAlign: 'center' }}>
        <UnStatusIcon kind={kindMap[t.status]} size={68}/>
        <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', color: UN_COLORS.ink, marginTop: 16 }}>
          {t.amount === 0 ? 'Free' : unMoney(t.amount)}
        </div>
        <div style={{ fontSize: 14.5, color: UN_COLORS.ink2, fontWeight: 600, marginTop: 4 }}>{t.label}</div>
        <div style={{ marginTop: 10 }}><UnBadge status={UN_TX_STATUS[t.status]}>{t.status}</UnBadge></div>
      </div>

      {t.status === 'failed' && (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ background: UN_COLORS.danger50, borderRadius: 14, padding: 14, fontSize: 13, color: UN_COLORS.ink2, lineHeight: 1.5 }}>
            Payment was not completed. You were not charged by UNNG. Try again or choose another option.
          </div>
        </div>
      )}

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`, overflow: 'hidden' }}>
          <UnCheckoutRow label="Type" value={t.type.charAt(0).toUpperCase() + t.type.slice(1)}/>
          <UnCheckoutRow label="Related item" value={t.label}/>
          <UnCheckoutRow label="Date" value={t.date}/>
          <UnCheckoutRow label="Method" value={t.method} icon={t.amount > 0 ? <UnIconRevolut size={15}/> : undefined}/>
          <UnCheckoutRow label="Reference" value={t.ref} isLast/>
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: UN_COLORS.slate, lineHeight: 1.5, padding: '0 4px' }}>
          Keep this reference if you contact support about this payment.
        </div>
      </div>

      <UnStickyBar>
        {t.status === 'failed' ? (
          <UnButton full onClick={() => proto.push('contributionCheckout', { kind: t.type, amount: t.amount })}>Try again</UnButton>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <UnButton full variant="neutral" leading={<UnIconShare size={16}/>} onClick={() => proto.openSheet({
              title: 'Share this receipt',
              render: (close) => (
                <div style={{ display: 'grid', gap: 8 }}>
                  {['Copy link', 'Share to Messages', 'Share to Email'].map(l => (
                    <UnButton key={l} full variant="neutral" onClick={() => { close(); proto.toast('success', l === 'Copy link' ? 'Link copied' : 'Shared', t.label); }}>{l}</UnButton>
                  ))}
                  <UnButton full variant="ghost" onClick={close}>Cancel</UnButton>
                </div>
              ),
            })}>Share</UnButton>
            <UnButton full leading={<UnIconReceipt size={16}/>} onClick={() => proto.run('Preparing receipt…', 800, () => proto.toast('success', 'Receipt sent', `Emailed to ${proto.data.user.email}`))}>Receipt</UnButton>
          </div>
        )}
      </UnStickyBar>
    </div>
  );
};

// ─── M33 Notifications ────────────────────────────────────────
UN_SCREENS_PROFILE.notifications = function Notifications({ proto, prefs }) {
  const items = proto.data.notifs;
  const unread = items.filter(n => !n.read).length;
  const list = prefs.stateMode === 'empty' ? [] : items;

  const iconFor = (kind) => {
    if (kind === 'payment_success') return { icon: <UnIconCheck size={16}/>, bg: UN_COLORS.success50, fg: UN_COLORS.success };
    if (kind === 'payment_failed') return { icon: <UnIconAlert size={16}/>, bg: UN_COLORS.danger50, fg: UN_COLORS.danger };
    if (kind === 'event_reminder') return { icon: <UnIconCalendar size={16}/>, bg: UN_COLORS.info50, fg: UN_COLORS.info };
    return { icon: <UnIconForum size={16}/>, bg: UN_COLORS.primary50, fg: UN_COLORS.primary };
  };

  const openNotif = (n) => {
    proto.markRead(n.id);
    if (n.kind === 'payment_success' || n.kind === 'payment_failed') proto.push('membership');
    else if (n.kind === 'event_reminder') proto.goTab('events');
    else proto.goTab('forums');
  };

  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Notifications" onBack={proto.pop}
        trailing={unread > 0 ? (
          <button onClick={() => proto.markAllRead()} style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: UN_COLORS.primary, fontFamily: 'inherit',
          }}>Mark all read</button>
        ) : undefined}/>

      {list.length === 0 ? (
        <UnEmpty icon={<UnIconBell size={28}/>} title="No notifications yet"
          body="Replies, event reminders, and payment updates will show up here."/>
      ) : (
        <div style={{ padding: '14px 20px 0', display: 'grid', gap: 10 }}>
          {list.map((n) => {
            const ic = iconFor(n.kind);
            return (
              <div key={n.id} onClick={() => openNotif(n)} style={{
                display: 'flex', gap: 12, padding: 14, cursor: 'pointer',
                background: n.read ? '#fff' : UN_COLORS.primary50,
                borderRadius: 16, border: `1px solid ${n.read ? UN_COLORS.slate2 : 'transparent'}`,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: n.read ? ic.bg : '#fff', color: ic.fg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ic.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: n.read ? 600 : 700, color: UN_COLORS.ink, lineHeight: 1.35, textWrap: 'pretty' }}>{n.title}</div>
                  <div style={{ fontSize: 13, color: UN_COLORS.slate, marginTop: 3, lineHeight: 1.4 }}>{n.body}</div>
                  <div style={{ fontSize: 11.5, color: UN_COLORS.slate4, marginTop: 5 }}>{n.when} ago</div>
                </div>
                {!n.read && <div style={{ width: 8, height: 8, borderRadius: 4, background: UN_COLORS.primary, flexShrink: 0, marginTop: 5 }}/>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── M34 Settings ─────────────────────────────────────────────
UN_SCREENS_PROFILE.settings = function Settings({ proto, prefs }) {
  const [push, setPush] = React.useState(true);
  const [email, setEmail] = React.useState(true);
  const [logoutOpen, setLogoutOpen] = React.useState(false);

  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Settings" onBack={proto.pop}/>

      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Notifications</div>
        <UnCard padded={false}>
          <UnRow icon={<UnIconBell size={17}/>} title="Push notifications" subtitle="Replies, reminders, payments" trailing={<UnToggle on={push} onChange={setPush}/>}/>
          <UnRow icon={<UnIconMail size={17}/>} title="Email updates" subtitle="Monthly community digest" trailing={<UnToggle on={email} onChange={setEmail}/>} isLast/>
        </UnCard>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Legal</div>
        <UnCard padded={false}>
          <UnRow icon={<UnIconShield size={17}/>} title="Privacy Policy" trailing={<UnIconExternal size={16}/>} onClick={() => proto.openSheet({ title: 'Privacy Policy', body: (
            <div style={{ fontSize: 13.5, color: UN_COLORS.ink2, lineHeight: 1.6 }}>UNNG collects only what is needed to run memberships, events, and forums, and never sells member data. Full policy available at unng.org/privacy.</div>
          ) })}/>
          <UnRow icon={<UnIconReceipt size={17}/>} title="Terms of Service" trailing={<UnIconExternal size={16}/>} onClick={() => proto.openSheet({ title: 'Terms of Service', body: (
            <div style={{ fontSize: 13.5, color: UN_COLORS.ink2, lineHeight: 1.6 }}>By using UNNG you agree to participate respectfully, keep payment details accurate, and follow community guidelines. Full terms available at unng.org/terms.</div>
          ) })}/>
          <UnRow icon={<UnIconForum size={17}/>} title="Community guidelines" trailing={<UnIconExternal size={16}/>} onClick={() => proto.openSheet({ title: 'Community guidelines', body: (
            <div style={{ fontSize: 13.5, color: UN_COLORS.ink2, lineHeight: 1.6 }}>Be respectful, stay on topic, and avoid spam or personal attacks. Posts that break these rules may be removed by moderators.</div>
          ) })} isLast/>
        </UnCard>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, paddingLeft: 4 }}>Account</div>
        <UnCard padded={false}>
          <UnRow icon={<UnIconLogout size={17}/>} title="Log out" onClick={() => setLogoutOpen(true)}/>
          <UnRow icon={<UnIconTrash size={17}/>} title="Delete profile" subtitle="Deactivate your account" danger
            trailing={<UnIconChevronRight size={17}/>} onClick={() => proto.push('deleteProfile')} isLast/>
        </UnCard>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: UN_COLORS.slate4, marginTop: 22 }}>UNNG for iOS · Version 1.0.0 (241)</div>
      </div>

      {logoutOpen && (
        <UnModal title="Log out of UNNG?" onClose={() => setLogoutOpen(false)}>
          <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.5 }}>
            You will need to sign in again to register for events or post in forums.
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
            <UnButton full variant="neutral" onClick={() => setLogoutOpen(false)}>Cancel</UnButton>
            <UnButton full variant="destructiveOutline" onClick={() => proto.signOut()}>Log out</UnButton>
          </div>
        </UnModal>
      )}
    </div>
  );
};

// ─── M35 Delete Profile ───────────────────────────────────────
UN_SCREENS_PROFILE.deleteProfile = function DeleteProfile({ proto, prefs }) {
  const [ack, setAck] = React.useState(false);
  const [confirm, setConfirm] = React.useState('');
  const ready = ack && confirm.trim().toUpperCase() === 'DELETE';

  return (
    <div style={{ paddingBottom: 120 }}>
      <UnTopBar title="Delete profile" onBack={proto.pop}/>
      <div style={{ padding: '24px 24px 0', textAlign: 'center' }}>
        <UnStatusIcon kind="failed" size={68}/>
        <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 16, color: UN_COLORS.ink }}>Delete your account?</div>
        <div style={{ fontSize: 14.5, color: UN_COLORS.slate, lineHeight: 1.55, marginTop: 10, textWrap: 'pretty' }}>
          This will deactivate your account and log you out. Your previous forum posts may remain as “Deleted User”.
        </div>
      </div>

      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`, overflow: 'hidden' }}>
          <UnCheckoutRow label="Membership" value="Cancelled immediately"/>
          <UnCheckoutRow label="Event registrations" value="Released"/>
          <UnCheckoutRow label="Forum posts" value="Shown as Deleted User"/>
          <UnCheckoutRow label="Payment records" value="Kept for accounting" isLast/>
        </div>

        <div style={{ marginTop: 18, background: UN_COLORS.danger50, borderRadius: 14, padding: 14, fontSize: 12.5, color: UN_COLORS.ink2, lineHeight: 1.5 }}>
          Your active Hero membership will be cancelled and will not be refunded for the current period.
        </div>

        <label style={{ display: 'flex', gap: 10, marginTop: 18, alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)}
            style={{ width: 20, height: 20, accentColor: UN_COLORS.danger, marginTop: 1, flexShrink: 0 }}/>
          <span style={{ fontSize: 13, color: UN_COLORS.slate, lineHeight: 1.45 }}>
            I understand this deactivates my account and cancels my membership.
          </span>
        </label>

        <div style={{ marginTop: 16 }}>
          <UnInput label="Type DELETE to confirm" value={confirm} onChange={setConfirm} placeholder="DELETE"/>
        </div>
      </div>

      <UnStickyBar>
        <div style={{ display: 'grid', gap: 8 }}>
          <UnButton full variant="destructive" disabled={!ready} onClick={() => proto.run('Deleting account\u2026', 900, () => proto.deleteAccount())}>Delete account</UnButton>
          <UnButton full variant="ghost" onClick={proto.pop}>Keep my account</UnButton>
        </div>
      </UnStickyBar>
    </div>
  );
};

window.UN_TX_STATUS = UN_TX_STATUS;
window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_PROFILE);
