// un-screens-home.jsx — M08 Home / Discover

const UN_SCREENS_HOME = {};

UN_SCREENS_HOME.home = function Home({ proto, prefs }) {
  const role = prefs.role;
  const stateMode = prefs.stateMode;

  const retry = () => proto.run('Reloading your feed…', 1300, () => proto.toast('success', 'Feed updated', 'Showing the latest events and topics.'));

  if (stateMode === 'offline') {
    return (
      <div>
        <UnEmpty icon={<UnIconWifiOff size={28}/>} title="No internet connection" body="Reconnect to load your home feed. Anything you write will be saved as a draft." actionLabel="Try again" onAction={retry}/>
        <div style={{ padding: '0 24px', textAlign: 'center' }}>
          <UnButton variant="ghost" onClick={() => proto.push('offlineError')}>See what's saved</UnButton>
        </div>
      </div>
    );
  }
  if (stateMode === 'error') {
    return <UnEmpty icon={<UnIconAlert size={28}/>} title="Something went wrong" body="We couldn't load your home feed right now. Please try again in a moment." actionLabel="Retry" onAction={retry}/>;
  }

  const upcoming = proto.data.events.filter(e => !e.past).slice(0, 2);
  const recentTopics = proto.data.topics.slice(0, 3);
  const orgs = UN_ORGS.slice(0, 4);
  const unread = proto.data.notifs.filter(n => !n.read).length;
  const myRegs = proto.data.events.filter(e => proto.data.registrations.includes(e.id));

  // Loading skeleton
  if (stateMode === 'loading') {
    return (
      <div style={{ padding: '14px 0 30px' }}>
        <div style={{ padding: '0 20px' }}>
          <UnSkeleton w={120} h={14}/>
          <div style={{ height: 8 }}/>
          <UnSkeleton w={220} h={26}/>
        </div>
        <div style={{ height: 18 }}/>
        <div style={{ padding: '0 20px' }}>
          <UnSkeleton h={104} r={16}/>
        </div>
        <div style={{ height: 24 }}/>
        <div style={{ padding: '0 20px' }}><UnSkeleton w={140} h={18}/></div>
        <div style={{ padding: '12px 20px', display: 'grid', gap: 12 }}>
          <UnSkeleton h={130} r={16}/>
          <UnSkeleton h={130} r={16}/>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 30 }}>
      {/* Header */}
      <div style={{ padding: '14px 20px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => proto.goTab('profile')} aria-label="Open your profile" style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
          <UnAvatar name={proto.data.user.name} size={40} color={proto.data.user.avatarColor}/>
        </button>
        <div onClick={() => proto.goTab('profile')} style={{ flex: 1, cursor: 'pointer' }}>
          <div style={{ fontSize: 12.5, color: UN_COLORS.slate, fontWeight: 500 }}>Welcome back</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: UN_COLORS.ink, letterSpacing: '-0.01em' }}>{proto.data.user.firstName}</div>
        </div>
        <button onClick={() => { proto.goTab('profile'); setTimeout(() => proto.push('notifications'), 20); }} aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`} style={{
          width: 40, height: 40, borderRadius: 12, border: 'none',
          background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: UN_COLORS.ink, cursor: 'pointer', position: 'relative',
        }}>
          <UnIconBell size={20}/>
          {unread > 0 && <div style={{ position: 'absolute', top: 6, right: 6, minWidth: 17, height: 17, borderRadius: 9, background: UN_COLORS.danger, color: '#fff', fontSize: 10.5, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', border: '2px solid #fff' }}>{unread}</div>}
        </button>
      </div>

      {/* Membership status card */}
      <div style={{ padding: '6px 20px 18px' }}>
        {role === 'paid' ? (
          <div style={{
            background: `linear-gradient(135deg, ${UN_COLORS.primary} 0%, ${UN_COLORS.primary600} 100%)`,
            color: '#fff', borderRadius: 18, padding: 18, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(203,161,53,0.2)' }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
              <UnIconStar size={13}/> {proto.data.membership.plan} Member
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8, letterSpacing: '-0.02em' }}>
              {proto.data.membership.cancelAtPeriodEnd ? 'Ends June 4' : 'Membership active'}
            </div>
            <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>
              {proto.data.membership.cancelAtPeriodEnd ? 'Will not renew' : `Renews ${proto.data.membership.renews}`} · {unMoney(proto.data.membership.price)}/month
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <UnButton size="sm" variant="gold" onClick={() => { proto.goTab('profile'); setTimeout(() => proto.push('membership'), 20); }}>Manage</UnButton>
              <UnButton size="sm" variant="ghost" style={{ color: '#fff' }} onClick={() => proto.goTab('donate')}>Donate</UnButton>
            </div>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 18, padding: 18, border: `1.5px solid ${UN_COLORS.gold}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: UN_COLORS.gold50, color: '#8A6B1F', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><UnIconStar size={18}/></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: UN_COLORS.ink }}>Become a member</div>
                <div style={{ fontSize: 12.5, color: UN_COLORS.slate }}>Post in forums and back the community</div>
              </div>
            </div>
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <UnButton size="sm" onClick={() => { proto.goTab('donate'); setTimeout(() => proto.push('subscriptionPlans'), 20); }}>See plans</UnButton>
              <UnButton size="sm" variant="ghost" onClick={() => { proto.goTab('donate'); setTimeout(() => proto.push('donateOneTime'), 20); }}>Donate once</UnButton>
            </div>
          </div>
        )}
      </div>

      {myRegs.length > 0 && (
        <div style={{ padding: '0 20px 18px' }}>
          <button onClick={() => { proto.goTab('events'); setTimeout(() => proto.push('myTickets'), 20); }} style={{
            width: '100%', background: UN_COLORS.primary50, border: 'none', borderRadius: 16,
            padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            fontFamily: 'inherit', textAlign: 'left',
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: '#fff', color: UN_COLORS.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><UnIconQR size={18}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: UN_COLORS.ink }}>{myRegs.length} upcoming ticket{myRegs.length === 1 ? '' : 's'}</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 2 }}>{myRegs[0].title}</div>
            </div>
            <UnIconChevronRight size={18}/>
          </button>
        </div>
      )}

      {/* Quick actions */}
      <div style={{ padding: '0 20px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { label: 'Events', icon: <UnIconCalendar size={20}/>, go: () => proto.goTab('events') },
            { label: 'Donate', icon: <UnIconHeart size={20}/>, go: () => proto.goTab('donate') },
            { label: 'Orgs', icon: <UnIconBuilding size={20}/>, go: () => proto.push('organizationsList') },            { label: 'Forums', icon: <UnIconForum size={20}/>, go: () => proto.goTab('forums') },
          ].map((q) => (
            <button key={q.label} onClick={q.go} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '12px 0', background: '#fff', border: `1px solid ${UN_COLORS.slate2}`,
              borderRadius: 14, cursor: 'pointer', color: UN_COLORS.ink2,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: UN_COLORS.primary50, color: UN_COLORS.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{q.icon}</div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming events */}
      <UnSectionHeader title="Upcoming events" action="See all" onAction={() => proto.goTab('events')}/>
      <div style={{ padding: '0 20px 18px', display: 'grid', gap: 12 }}>
        {upcoming.map((e) => <UnEventCardCompact key={e.id} event={e} onClick={() => proto.push(e.free ? 'eventDetailFree' : 'eventDetailPaid', { event: e })}/>)}
      </div>

      {/* Forum activity */}
      <UnSectionHeader title="Latest in forums" action="Open forums" onAction={() => proto.goTab('forums')}/>
      <div style={{ padding: '0 20px 18px' }}>
        <UnCard padded={false}>
          {recentTopics.map((t, i) => (
            <div key={t.id} onClick={() => proto.push('forumTopicDetail', { topic: t })} style={{
              display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14,
              borderBottom: i === recentTopics.length - 1 ? 'none' : `1px solid ${UN_COLORS.slate2}`,
              cursor: 'pointer',
            }}>
              <UnAvatar name={t.author} size={36} color={t.authorColor}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 600, color: UN_COLORS.ink, lineHeight: 1.3, textWrap: 'pretty' }}>{t.title}</div>
                <div style={{ fontSize: 12, color: UN_COLORS.slate, marginTop: 4, display: 'flex', gap: 8 }}>
                  <span>{t.cat}</span><span>·</span><span>{t.author}</span><span>·</span><span>{t.when}</span>
                </div>
              </div>
            </div>
          ))}
        </UnCard>
      </div>

      {/* Organizations preview */}
      <UnSectionHeader title="Organizations" action="See all" onAction={() => proto.push('organizationsList')}/>
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 12, overflowX: 'auto' }} className="un-scroll">
        {orgs.map((o) => (
          <div key={o.id} onClick={() => proto.push('organizationDetail', { org: o })} style={{
            minWidth: 156, background: '#fff', borderRadius: 14, border: `1px solid ${UN_COLORS.slate2}`,
            padding: 12, cursor: 'pointer',
          }}>
            <UnImage label={o.name} h={70} radius={10}/>
            <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 10, color: UN_COLORS.ink, lineHeight: 1.25 }}>{o.name}</div>
            <div style={{ fontSize: 11.5, color: UN_COLORS.slate, marginTop: 2 }}>{o.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Compact event card used on Home
function UnEventCardCompact({ event, onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', gap: 12, background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`, padding: 12, cursor: 'pointer' }}>
      <UnImage label={event.title} w={86} h={86} radius={12}/>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {event.free ? <UnBadge status="free" size="sm">Free</UnBadge> : <UnBadge status="info" size="sm">{unMoney(event.price)}</UnBadge>}
          {event.soldOut && <UnBadge status="soldout" size="sm">Sold out</UnBadge>}
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: UN_COLORS.ink, marginTop: 6, lineHeight: 1.25, textWrap: 'pretty' }}>{event.title}</div>
        <div style={{ marginTop: 'auto', fontSize: 12, color: UN_COLORS.slate, display: 'flex', alignItems: 'center', gap: 4 }}>
          <UnIconClock size={11}/> {event.date}
        </div>
      </div>
    </div>
  );
}

window.UnEventCardCompact = UnEventCardCompact;
window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_HOME);
