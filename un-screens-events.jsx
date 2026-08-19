// un-screens-events.jsx — M09 Events List, M10-M14 Event detail/payment, My tickets

const UN_SCREENS_EVENTS = {};

const UN_EVENT_CATS = ['Summit', 'Networking', 'Workshop', 'Wellness', 'Hackathon', 'Town Hall'];
const UN_EVENT_LOCS = ['Lagos', 'Abuja', 'Online'];
const UN_EVENT_DATES = ['This week', 'This month', 'Later'];

UN_SCREENS_EVENTS.events = function EventsList({ proto, prefs }) {
  const [tab, setTab] = React.useState('upcoming');
  const [search, setSearch] = React.useState('');
  const [price, setPrice] = React.useState('all');
  const [cats, setCats] = React.useState([]);
  const [locs, setLocs] = React.useState([]);
  const [dates, setDates] = React.useState([]);
  const stateMode = prefs.stateMode;
  const activeCount = cats.length + locs.length + dates.length + (price !== 'all' ? 1 : 0);

  let events = stateMode === 'empty' ? [] : proto.data.events;
  events = events.filter(e => tab === 'past' ? e.past : !e.past);
  if (tab === 'registered') events = proto.data.events.filter(e => proto.data.registrations.includes(e.id));
  if (price === 'free') events = events.filter(e => e.free);
  if (price === 'paid') events = events.filter(e => !e.free);
  if (cats.length) events = events.filter(e => cats.includes(e.category));
  if (locs.length) events = events.filter(e => locs.some(l => e.location.includes(l)));
  if (search) events = events.filter(e => (e.title + e.location + e.category).toLowerCase().includes(search.toLowerCase()));

  const open = (e) => proto.push(e.free ? 'eventDetailFree' : 'eventDetailPaid', { event: e });
  const clearAll = () => { setPrice('all'); setCats([]); setLocs([]); setDates([]); setSearch(''); };

  const toggle = (list, setList, v) => setList(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

  const openFilters = () => proto.openSheet({
    title: 'Filter events',
    render: (close) => (
      <UnFilterSheet
        initial={{ price, cats, locs, dates }}
        onReset={() => { clearAll(); close(); proto.toast('info', 'Filters cleared', 'Showing all events.'); }}
        onApply={(v) => {
          setPrice(v.price); setCats(v.cats); setLocs(v.locs); setDates(v.dates); close();
          const n = v.cats.length + v.locs.length + v.dates.length + (v.price !== 'all' ? 1 : 0);
          proto.toast('success', n ? `${n} filter${n > 1 ? 's' : ''} applied` : 'Filters cleared', n ? 'Event list updated.' : 'Showing all events.');
        }}/>
    ),
  });

  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Events" large trailing={
        <button onClick={openFilters} aria-label="Filter events" style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: UN_COLORS.surface, color: UN_COLORS.ink, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <UnIconFilter size={17}/>
          {activeCount > 0 && <span style={{ position: 'absolute', top: -3, right: -3, minWidth: 17, height: 17, borderRadius: 9, background: UN_COLORS.primary, color: '#fff', fontSize: 10.5, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', border: '2px solid #F7F8F6' }}>{activeCount}</span>}
        </button>
      }/>
      <div style={{ padding: '4px 20px 12px' }}>
        <UnSearch value={search} onChange={setSearch} placeholder="Search events"
          rightSlot={search ? <button onClick={() => setSearch('')} aria-label="Clear search" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: UN_COLORS.slate, display: 'inline-flex' }}><UnIconX size={15}/></button> : undefined}/>
      </div>
      <div style={{ padding: '0 20px 14px' }}>
        <div style={{ display: 'flex', background: UN_COLORS.slate1, borderRadius: 12, padding: 4 }}>
          {[{id:'upcoming',label:'Upcoming'},{id:'past',label:'Past'},{id:'registered',label:`Mine${proto.data.registrations.length ? ' · ' + proto.data.registrations.length : ''}`}].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer', borderRadius: 9,
              background: tab === t.id ? '#fff' : 'transparent',
              color: tab === t.id ? UN_COLORS.ink : UN_COLORS.slate,
              fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              boxShadow: tab === t.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div className="un-scroll" style={{ padding: '0 20px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        <UnChip active={price === 'all' && !cats.length && !locs.length} onClick={clearAll}>All</UnChip>
        <UnChip active={price === 'free'} onClick={() => setPrice(price === 'free' ? 'all' : 'free')}>Free</UnChip>
        <UnChip active={price === 'paid'} onClick={() => setPrice(price === 'paid' ? 'all' : 'paid')}>Paid</UnChip>
        {UN_EVENT_LOCS.map(l => (
          <UnChip key={l} active={locs.includes(l)} onClick={() => toggle(locs, setLocs, l)}>{l}</UnChip>
        ))}
      </div>

      {activeCount > 0 && (
        <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: UN_COLORS.slate }}>{events.length} of {proto.data.events.length} events</span>
          <button onClick={clearAll} style={{ marginLeft: 'auto', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, color: UN_COLORS.primary }}>Clear filters</button>
        </div>
      )}

      {stateMode === 'loading' ? (
        <div style={{ padding: '0 20px', display: 'grid', gap: 12 }}>
          {[1,2,3].map(i => <UnSkeleton key={i} h={150} r={16}/>)}
        </div>
      ) : stateMode === 'error' ? (
        <UnEmpty icon={<UnIconAlert size={28}/>} title="Could not load events"
          body="Something went wrong reaching UNNG. Check your connection and try again."
          actionLabel="Retry" onAction={() => proto.run('Reloading events…', 1200, () => proto.toast('success', 'Events reloaded', 'Showing the latest list.'))}/>
      ) : events.length === 0 ? (
        <UnEmpty
          icon={<UnIconCalendar size={28}/>}
          title={tab === 'registered' ? 'No registrations yet' : activeCount || search ? 'No events match' : 'No upcoming events yet'}
          body={tab === 'registered'
            ? 'Events you register for will appear here with your check-in code.'
            : activeCount || search ? 'Try removing a filter or searching for something else.'
            : 'Check back soon, or browse organizations to find groups planning meetups.'}
          actionLabel={tab === 'registered' ? 'Browse events' : activeCount || search ? 'Clear filters' : 'Browse organizations'}
          onAction={() => {
            if (tab === 'registered') setTab('upcoming');
            else if (activeCount || search) clearAll();
            else proto.push('organizationsList');
          }}
        />
      ) : (
        <div style={{ padding: '0 20px', display: 'grid', gap: 12 }}>
          {events.map(e => (
            <UnEventCard key={e.id} event={e} registered={proto.data.registrations.includes(e.id)} onClick={() => open(e)}/>
          ))}
        </div>
      )}
    </div>
  );
};

function UnFilterSheet({ initial, onApply, onReset }) {
  const [price, setPrice] = React.useState(initial.price);
  const [cats, setCats] = React.useState(initial.cats);
  const [locs, setLocs] = React.useState(initial.locs);
  const [dates, setDates] = React.useState(initial.dates);
  const toggle = (list, setList, v) => setList(list.includes(v) ? list.filter(x => x !== v) : [...list, v]);
  const count = cats.length + locs.length + dates.length + (price !== 'all' ? 1 : 0);
  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Price</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['all','Any'],['free','Free'],['paid','Paid']].map(([v,l]) => (
            <UnChip key={v} active={price === v} onClick={() => setPrice(v)}>{l}</UnChip>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Category</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {UN_EVENT_CATS.map(c => <UnChip key={c} active={cats.includes(c)} onClick={() => toggle(cats, setCats, c)}>{c}</UnChip>)}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Location</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {UN_EVENT_LOCS.map(c => <UnChip key={c} active={locs.includes(c)} onClick={() => toggle(locs, setLocs, c)}>{c}</UnChip>)}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>When</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {UN_EVENT_DATES.map(c => <UnChip key={c} active={dates.includes(c)} onClick={() => toggle(dates, setDates, c)}>{c}</UnChip>)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        <UnButton variant="neutral" style={{ flex: 1 }} onClick={onReset}>Reset</UnButton>
        <UnButton style={{ flex: 2 }} onClick={() => onApply({ price, cats, locs, dates })}>
          {count ? `Show results · ${count}` : 'Show all events'}
        </UnButton>
      </div>
    </div>
  );
}

function UnEventCard({ event, onClick, registered }) {
  return (
    <div onClick={onClick} style={{ background: '#fff', borderRadius: 18, border: `1px solid ${registered ? UN_COLORS.primary : UN_COLORS.slate2}`, overflow: 'hidden', cursor: 'pointer' }}>
      <UnImage label={event.title} h={140} radius={0}/>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {event.free ? <UnBadge status="free" size="sm">Free</UnBadge> : <UnBadge status="info" size="sm">{unMoney(event.price)}</UnBadge>}
          <UnBadge status="neutral" size="sm">{event.category}</UnBadge>
          {event.soldOut && <UnBadge status="soldout" size="sm">Sold out</UnBadge>}
          {registered && <UnBadge status="success" size="sm" icon={<UnIconCheck size={9}/>}>Registered</UnBadge>}
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, color: UN_COLORS.ink, marginTop: 8, lineHeight: 1.25, textWrap: 'pretty' }}>{event.title}</div>
        <div style={{ marginTop: 8, fontSize: 13, color: UN_COLORS.slate, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><UnIconClock size={13}/>{event.date}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><UnIconLocation size={13}/>{event.location}</div>
        </div>
      </div>
    </div>
  );
}

// ─── M10 / M11 Event Detail ──────────────────────────────────
function UnEventDetail({ proto, prefs, paid }) {
  const fallback = paid ? proto.data.events[0] : proto.data.events[1];
  const base = proto.params.event || fallback;
  const ev = proto.data.events.find(e => e.id === base.id) || base;
  const remaining = ev.capacity - ev.registered;
  const soldOut = ev.soldOut || remaining <= 0;
  const isRegistered = proto.data.registrations.includes(ev.id);

  const addToCalendar = () => proto.run('Adding to calendar…', 900, () =>
    proto.toast('success', 'Added to your calendar', `${ev.title} · ${ev.date}`));

  const showDirections = () => proto.openSheet({
    title: 'Getting there',
    render: (close) => (
      <div>
        <div style={{ background: UN_COLORS.surface, borderRadius: 14, padding: 16, border: `1px solid ${UN_COLORS.slate2}` }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{ev.location}</div>
          <div style={{ fontSize: 13, color: UN_COLORS.slate, marginTop: 4, lineHeight: 1.5 }}>
            Doors open 30 minutes before the start time. Ask for the UNNG desk on arrival.
          </div>
        </div>
        <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
          <UnButton full leading={<UnIconExternal size={16}/>} onClick={() => { close(); proto.toast('info', 'Opening Maps', ev.location); }}>Open in Maps</UnButton>
          <UnButton full variant="neutral" onClick={() => { close(); proto.toast('success', 'Address copied', ev.location); }}>Copy address</UnButton>
          <UnButton full variant="ghost" onClick={close}>Close</UnButton>
        </div>
      </div>
    ),
  });

  const share = () => proto.openSheet({
    title: 'Share this event',
    render: (close) => (
      <div style={{ display: 'grid', gap: 8 }}>
        {['Copy link', 'Share to Messages', 'Share to WhatsApp', 'Invite a member'].map(l => (
          <UnButton key={l} full variant="neutral" onClick={() => { close(); proto.toast('success', l === 'Copy link' ? 'Link copied' : 'Shared', ev.title); }}>{l}</UnButton>
        ))}
        <UnButton full variant="ghost" onClick={close}>Cancel</UnButton>
      </div>
    ),
  });

  const registerFree = () => proto.confirm({
    title: 'Register for this event?',
    body: 'Your place is held immediately and the details are emailed to you.',
    rows: [['Event', ev.title], ['When', ev.date], ['Cost', 'Free'], ['Email', proto.data.user.email]],
    confirmLabel: 'Register · Free',
    onConfirm: () => proto.run('Registering…', 1300, () => {
      proto.registerEvent(ev, false);
      proto.push('eventSuccess', { event: ev, paid: false });
      proto.toast('success', 'You are registered', `${ev.title} · ${ev.date}`);
    }),
  });

  const cancelReg = () => proto.confirm({
    title: 'Cancel your registration?',
    body: 'Your place is released to the next person on the list. You can register again if space allows.',
    rows: [['Event', ev.title], ['When', ev.date]],
    confirmLabel: 'Cancel registration', danger: true,
    cancelLabel: 'Keep my place',
    onConfirm: () => proto.run('Cancelling…', 1000, () => proto.cancelRegistration(ev)),
  });

  return (
    <div style={{ paddingBottom: 130 }}>
      <div style={{ position: 'relative' }}>
        <UnImage label={ev.title} h={220} radius={0}/>
        <button onClick={() => proto.pop()} aria-label="Back" style={{ position: 'absolute', top: 14, left: 14, width: 38, height: 38, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: UN_COLORS.ink }}><UnIconChevronLeft size={18}/></button>
        <button onClick={share} aria-label="Share" style={{ position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: UN_COLORS.ink }}><UnIconShare size={18}/></button>
      </div>
      <div style={{ padding: '18px 22px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {paid ? <UnBadge status="info">{unMoney(ev.price)}</UnBadge> : <UnBadge status="free">Free</UnBadge>}
          <UnBadge status="neutral">{ev.category}</UnBadge>
          {soldOut && <UnBadge status="soldout">Sold out</UnBadge>}
          {isRegistered && <UnBadge status="success" icon={<UnIconCheck size={10}/>}>Registered</UnBadge>}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.2, margin: 0, color: UN_COLORS.ink, letterSpacing: '-0.02em', textWrap: 'balance' }}>{ev.title}</h1>

        <div style={{ marginTop: 18, background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`, overflow: 'hidden' }}>
          <UnRow icon={<UnIconClock size={18}/>} title={ev.date} subtitle="2.5 hours · Add to calendar" trailing={<UnIconCalendarPlus size={18}/>} onClick={addToCalendar}/>
          <UnRow icon={<UnIconLocation size={18}/>} title={ev.location} subtitle="Tap for directions" trailing={<UnIconChevronRight size={18}/>} onClick={showDirections}/>
          <UnRow icon={<UnIconUsers size={18}/>} title={`${ev.registered} registered · ${Math.max(0, remaining)} spots left`} subtitle={`Capacity · ${ev.capacity}`}/>
          <UnRow icon={<UnIconBuilding size={18}/>} title={ev.org} subtitle="Hosting organization" trailing={<UnIconChevronRight size={18}/>} isLast
            onClick={() => proto.push('organizationDetail', { org: UN_ORGS.find(o => o.name === ev.org) || UN_ORGS[0] })}/>
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>About this event</div>
          <p style={{ fontSize: 14.5, color: UN_COLORS.ink2, lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>
            {ev.blurb} The session will run on schedule and refreshments are included. Doors open 30 minutes before the start time so you can settle in and meet other members.
          </p>
        </div>

        {paid && (
          <div style={{ marginTop: 20, padding: 14, background: UN_COLORS.primary50, borderRadius: 14, fontSize: 13, color: UN_COLORS.primary, display: 'flex', gap: 10 }}>
            <UnIconShield size={18}/>
            <div style={{ flex: 1, lineHeight: 1.5 }}>Payment is processed securely via <strong>Revolut Pay</strong>. Full refund available up to 48 hours before the event.</div>
          </div>
        )}
      </div>

      <UnStickyBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {paid && !isRegistered && (
            <div>
              <div style={{ fontSize: 11, color: UN_COLORS.slate, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: UN_COLORS.ink, letterSpacing: '-0.02em' }}>{unMoney(ev.price)}</div>
            </div>
          )}
          <div style={{ flex: 1, display: 'grid', gap: 8 }}>
            {isRegistered ? (
              <>
                <UnButton full size="lg" leading={<UnIconQR size={18}/>} onClick={() => proto.push('eventSuccess', { event: ev, paid })}>View ticket</UnButton>
                <UnButton full variant="ghost" style={{ color: UN_COLORS.danger }} onClick={cancelReg}>Cancel registration</UnButton>
              </>
            ) : soldOut ? (
              <UnButton full size="lg" variant="secondary" leading={<UnIconBell size={17}/>}
                onClick={() => proto.confirm({
                  title: 'Join the waitlist?',
                  body: 'We will notify you as soon as a place opens up. You will not be charged now.',
                  rows: [['Event', ev.title], ['Position', 'Next in line']],
                  confirmLabel: 'Join waitlist',
                  onConfirm: () => proto.run('Joining waitlist…', 1000, () => proto.joinWaitlist(ev)),
                })}>Sold out · Join waitlist</UnButton>
            ) : paid ? (
              <UnButton full size="lg" onClick={() => proto.push('eventPayConfirm', { event: ev })}>Pay &amp; Register</UnButton>
            ) : (
              <UnButton full size="lg" onClick={registerFree}>Register · Free</UnButton>
            )}
          </div>
        </div>
      </UnStickyBar>
    </div>
  );
}

UN_SCREENS_EVENTS.eventDetailFree = function ({ proto, prefs }) { return <UnEventDetail proto={proto} prefs={prefs} paid={false}/>; };
UN_SCREENS_EVENTS.eventDetailPaid = function ({ proto, prefs }) { return <UnEventDetail proto={proto} prefs={prefs} paid={true}/>; };

// ─── M12 Event Payment Confirm ───────────────────────────────
UN_SCREENS_EVENTS.eventPayConfirm = function ({ proto, prefs }) {
  const ev = proto.params.event || proto.data.events[0];
  const [agree, setAgree] = React.useState(false);
  const [method, setMethod] = React.useState('revolut');

  const pickMethod = () => proto.openSheet({
    title: 'Payment method',
    render: (close) => (
      <div style={{ display: 'grid', gap: 8 }}>
        {[['revolut', 'Revolut Pay', '•• 4421'], ['card', 'Debit or credit card', 'Enter at checkout']].map(([v, l, sub]) => (
          <button key={v} onClick={() => { setMethod(v); close(); proto.toast('success', 'Payment method updated', l); }} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: 14, cursor: 'pointer', fontFamily: 'inherit',
            background: '#fff', borderRadius: 14, border: `1.5px solid ${method === v ? UN_COLORS.primary : UN_COLORS.slate2}`, textAlign: 'left',
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: '#15231F', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {v === 'revolut' ? <UnIconRevolut size={20}/> : <UnIconCard size={19}/>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: UN_COLORS.ink }}>{l}</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.slate }}>{sub}</div>
            </div>
            {method === v && <span style={{ color: UN_COLORS.primary }}><UnIconCheck size={18}/></span>}
          </button>
        ))}
        <UnButton full variant="ghost" onClick={close}>Cancel</UnButton>
      </div>
    ),
  });

  return (
    <div style={{ paddingBottom: 120 }}>
      <UnTopBar onBack={() => proto.pop()} title="Review payment"/>
      <div style={{ padding: '14px 20px' }}>
        <UnCard>
          <div style={{ display: 'flex', gap: 12 }}>
            <UnImage label={ev.title} w={64} h={64} radius={12}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, color: UN_COLORS.slate, fontWeight: 700, letterSpacing: '0.06em' }}>EVENT</div>
              <div style={{ fontSize: 15.5, fontWeight: 700, color: UN_COLORS.ink, lineHeight: 1.25, marginTop: 2 }}>{ev.title}</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 4 }}>{ev.date}</div>
            </div>
          </div>
        </UnCard>
        <div style={{ marginTop: 14, background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}` }}>
          {[['Event ticket', unMoney(ev.price)], ['Booking fee', unMoney(0)], ['Email', proto.data.user.email]].map(([k, v], i) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '14px 16px', borderBottom: i < 2 ? `1px solid ${UN_COLORS.slate2}` : 'none', fontSize: 14 }}>
              <div style={{ color: UN_COLORS.slate }}>{k}</div>
              <div style={{ color: UN_COLORS.ink, fontWeight: 600, textAlign: 'right' }}>{v}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', borderTop: `2px solid ${UN_COLORS.slate2}`, alignItems: 'center' }}>
            <div style={{ fontSize: 14, color: UN_COLORS.slate }}>Total</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: UN_COLORS.ink, letterSpacing: '-0.02em' }}>{unMoney(ev.price)}</div>
          </div>
        </div>

        <button onClick={pickMethod} style={{
          marginTop: 14, padding: 14, background: '#fff', borderRadius: 14, width: '100%',
          border: `1px solid ${UN_COLORS.slate2}`, display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#15231F', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {method === 'revolut' ? <UnIconRevolut size={22}/> : <UnIconCard size={20}/>}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: UN_COLORS.ink }}>{method === 'revolut' ? 'Revolut Pay' : 'Debit or credit card'}</div>
            <div style={{ fontSize: 12, color: UN_COLORS.slate }}>Tap to change · you'll be redirected to confirm</div>
          </div>
          <UnIconChevronRight size={18}/>
        </button>

        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 14, fontSize: 12.5, color: UN_COLORS.slate, lineHeight: 1.5, cursor: 'pointer' }}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ width: 18, height: 18, accentColor: UN_COLORS.primary, marginTop: 2, flexShrink: 0 }}/>
          <span>You are about to pay <strong style={{ color: UN_COLORS.ink }}>{unMoney(ev.price)}</strong> for “{ev.title}”. Your registration is confirmed once payment clears.</span>
        </label>
        {!agree && <div style={{ fontSize: 12, color: UN_COLORS.slate4, marginTop: 8, paddingLeft: 28 }}>Tick the box to enable payment.</div>}
      </div>

      <UnStickyBar>
        <div style={{ display: 'grid', gap: 8 }}>
          <UnButton full size="lg" disabled={!agree} onClick={() => proto.push('paymentProcessing', { event: ev, kind: 'event', amount: ev.price })}>Confirm &amp; Pay {unMoney(ev.price)}</UnButton>
          <UnButton full variant="ghost" onClick={() => proto.pop()}>Cancel</UnButton>
        </div>
      </UnStickyBar>
    </div>
  );
};

// ─── M13 Payment Processing / Revolut return ─────────────────
UN_SCREENS_EVENTS.paymentProcessing = function ({ proto, prefs }) {
  const kind = proto.params.kind || 'event';
  const ev = proto.params.event || proto.data.events[0];
  const plan = proto.params.plan;
  const amount = proto.params.amount ?? (kind === 'event' ? ev.price : 0);
  const label = proto.params.itemName || (kind === 'event' ? ev.title : kind === 'subscription' ? `${plan ? plan.name : 'Hero'} Subscription` : 'One-time donation');
  const [phase, setPhase] = React.useState('processing');
  const [attempt, setAttempt] = React.useState(0);
  const ref = React.useRef('REV-' + Math.random().toString(36).slice(2, 8).toUpperCase()).current;
  const settled = React.useRef(false);

  // First attempt can be forced to fail from Tweaks; retries always succeed
  // so the user is never trapped in a loop.
  React.useEffect(() => {
    const shouldFail = prefs.failNextPayment && attempt === 0;
    const t = setTimeout(() => {
      if (shouldFail) {
        setPhase('failed');
        if (!settled.current) { settled.current = true; proto.failedTx(label, amount, kind); }
        return;
      }
      setPhase('success');
      if (settled.current) return;
      settled.current = true;
      if (kind === 'event') proto.registerEvent(ev, true);
      else if (kind === 'subscription') proto.subscribe(plan || { name: 'Hero', price: amount });
      else proto.donate(amount);
    }, 1700);
    return () => clearTimeout(t);
  }, [attempt]);

  const Ref = () => (
    <div style={{ marginTop: 14, padding: '8px 14px', background: UN_COLORS.surface, borderRadius: 999, fontSize: 11.5, color: UN_COLORS.slate, fontFamily: 'var(--un-mono)' }}>REF · {ref}</div>
  );

  if (phase === 'processing') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 10 }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, background: UN_COLORS.primary50, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <UnSpinner size={42}/>
        </div>
        <div style={{ fontSize: 19, fontWeight: 700, marginTop: 12 }}>Confirming your payment</div>
        <div style={{ fontSize: 14, color: UN_COLORS.slate, textAlign: 'center', lineHeight: 1.5, maxWidth: 280 }}>
          Hold tight. We're confirming {unMoney(amount)} with Revolut Pay. Don't close the app.
        </div>
        <Ref/>
      </div>
    );
  }

  if (phase === 'failed') {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
        <UnStatusIcon kind="failed"/>
        <div style={{ fontSize: 21, fontWeight: 800, marginTop: 8, textAlign: 'center', textWrap: 'balance' }}>Payment was not completed</div>
        <div style={{ fontSize: 14, color: UN_COLORS.slate, textAlign: 'center', lineHeight: 1.5, maxWidth: 290 }}>
          You were <strong style={{ color: UN_COLORS.ink }}>not charged</strong> by UNNG. Try again or choose another payment option.
        </div>
        <Ref/>
        <div style={{ marginTop: 22, display: 'grid', gap: 8, width: '100%' }}>
          <UnButton full size="lg" onClick={() => { setPhase('processing'); setAttempt(a => a + 1); }}>Try again</UnButton>
          <UnButton full variant="neutral" onClick={() => { proto.popTo(kind === 'event' ? 'eventPayConfirm' : 'contributionCheckout'); }}>Change payment method</UnButton>
          <UnButton full variant="ghost" onClick={() => proto.reset(kind === 'event' ? 'events' : 'donateHub')}>
            {kind === 'event' ? 'Back to events' : 'Back to support'}
          </UnButton>
        </div>
      </div>
    );
  }

  if (kind === 'event') return <UN_SCREENS_EVENTS.eventSuccess proto={proto} prefs={prefs}/>;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
      <UnStatusIcon kind="success"/>
      <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8 }}>Thank you!</div>
      <div style={{ fontSize: 14, color: UN_COLORS.slate, textAlign: 'center', lineHeight: 1.5, maxWidth: 290 }}>
        {kind === 'subscription'
          ? `Your ${plan ? plan.name : 'Hero'} membership is active. Forum posting is unlocked right away.`
          : `Your ${unMoney(amount)} donation has been received.`}
      </div>
      <Ref/>
      <div style={{ marginTop: 22, display: 'grid', gap: 8, width: '100%' }}>
        {kind === 'subscription'
          ? <UnButton full size="lg" onClick={() => proto.reset('forumsCategories')}>Go to forums</UnButton>
          : <UnButton full size="lg" onClick={() => proto.reset('home')}>Back to home</UnButton>}
        <UnButton full variant="neutral" onClick={() => { proto.reset('profile'); setTimeout(() => proto.push('transactions'), 30); }}>View receipt</UnButton>
      </div>
    </div>
  );
};

// ─── M14 Event Registration Success / ticket ─────────────────
UN_SCREENS_EVENTS.eventSuccess = function ({ proto, prefs }) {
  const ev = proto.params.event || proto.data.events[0];
  const paid = proto.params.paid !== false;
  const code = React.useRef('UN-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + Math.floor(10 + Math.random() * 89)).current;
  return (
    <div style={{ paddingBottom: 30, display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{ padding: '40px 22px 28px', textAlign: 'center', background: 'linear-gradient(180deg, var(--un-primary-50) 0%, var(--un-surface-50) 100%)' }}>
        <UnStatusIcon kind="success"/>
        <div style={{ fontSize: 23, fontWeight: 800, marginTop: 14, letterSpacing: '-0.02em', textWrap: 'balance' }}>You're going!</div>
        <div style={{ fontSize: 14, color: UN_COLORS.slate, marginTop: 6, lineHeight: 1.5, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
          We've sent the details to {proto.data.user.email}. See you there.
        </div>
      </div>

      <div style={{ padding: '4px 22px 16px' }}>
        <UnCard padded={false}>
          <div style={{ padding: 16, borderBottom: `1px solid ${UN_COLORS.slate2}`, display: 'flex', gap: 12 }}>
            <UnImage label={ev.title} w={56} h={56} radius={12}/>
            <div>
              <div style={{ fontSize: 11.5, color: UN_COLORS.slate, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ticket</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: UN_COLORS.ink, marginTop: 2 }}>{ev.title}</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 2 }}>{ev.date} · {paid ? unMoney(ev.price) + ' paid' : 'Free'}</div>
            </div>
          </div>
          <div style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 84, height: 84, borderRadius: 14, background: UN_COLORS.surface, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: UN_COLORS.ink2, border: `1px solid ${UN_COLORS.slate2}` }}>
              <UnIconQR size={56}/>
            </div>
            <div>
              <div style={{ fontSize: 12, color: UN_COLORS.slate, fontWeight: 600 }}>Check-in code</div>
              <div style={{ fontFamily: 'var(--un-mono)', fontWeight: 700, fontSize: 18, marginTop: 4, letterSpacing: '0.05em' }}>{code}</div>
              <div style={{ fontSize: 11.5, color: UN_COLORS.slate, marginTop: 4 }}>Show at the door</div>
            </div>
          </div>
        </UnCard>
      </div>

      <div style={{ padding: '0 22px', display: 'grid', gap: 10, marginTop: 'auto' }}>
        <UnButton full size="lg" leading={<UnIconCalendarPlus size={18}/>}
          onClick={() => proto.run('Adding to calendar…', 900, () => proto.toast('success', 'Added to your calendar', `${ev.title} · ${ev.date}`))}>
          Add to calendar
        </UnButton>
        <UnButton full variant="neutral" onClick={() => { proto.reset('profile'); setTimeout(() => proto.push('transactions'), 30); }}>View in transactions</UnButton>
        <UnButton full variant="ghost" onClick={() => proto.reset('events')}>Back to events</UnButton>
      </div>
    </div>
  );
};

// ─── My tickets — keeps "My events" from dead-ending ─────────
UN_SCREENS_EVENTS.myTickets = function MyTickets({ proto, prefs }) {
  const mine = proto.data.events.filter(e => proto.data.registrations.includes(e.id));
  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar onBack={() => proto.pop()} title="My tickets" subtitle={`${mine.length} registration${mine.length === 1 ? '' : 's'}`}/>
      {mine.length === 0 ? (
        <UnEmpty icon={<UnIconQR size={28}/>} title="No tickets yet"
          body="Register for an event and your check-in code will appear here."
          actionLabel="Browse events" onAction={() => proto.reset('events')}/>
      ) : (
        <div style={{ padding: '16px 20px', display: 'grid', gap: 12 }}>
          {mine.map(e => (
            <div key={e.id} onClick={() => proto.push('eventSuccess', { event: e, paid: !e.free })} style={{
              background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`,
              padding: 14, display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'center',
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 13, background: UN_COLORS.surface, border: `1px solid ${UN_COLORS.slate2}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: UN_COLORS.ink2, flexShrink: 0 }}>
                <UnIconQR size={28}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: UN_COLORS.ink, lineHeight: 1.3 }}>{e.title}</div>
                <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 3 }}>{e.date}</div>
              </div>
              <UnIconChevronRight size={18}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { UnEventCard, UnFilterSheet });
window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_EVENTS);
