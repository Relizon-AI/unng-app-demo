// un-screens-orgs.jsx — M19 Organizations list, M20 Organization detail

const UN_SCREENS_ORGS = {};

UN_SCREENS_ORGS.organizationsList = function OrgsList({ proto, prefs }) {
  const [q, setQ] = React.useState('');
  const [cat, setCat] = React.useState('All');
  const cats = ['All', 'Technology', 'Health', 'Business', 'Arts & Culture', 'Education'];
  const list = (prefs.stateMode === 'empty' ? [] : UN_ORGS).filter(o =>
    (cat === 'All' || o.category === cat) &&
    o.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Organizations" onBack={proto.pop}
        trailing={<span style={{ fontSize: 13, color: UN_COLORS.slate, fontWeight: 600 }}>{UN_ORGS.length}</span>}/>
      <div style={{ padding: '14px 20px 12px' }}>
        <UnSearch value={q} onChange={setQ} placeholder="Search organizations"
          rightSlot={q ? <button onClick={() => setQ('')} aria-label="Clear search" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: UN_COLORS.slate, display: 'inline-flex' }}><UnIconX size={15}/></button> : undefined}/>
      </div>
      <div className="un-scroll" style={{ display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' }}>
        {cats.map(c => <UnChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</UnChip>)}
      </div>

      {prefs.stateMode === 'error' ? (
        <UnEmpty icon={<UnIconAlert size={28}/>} title="Could not load organizations"
          body="Check your connection and try again." actionLabel="Retry"
          onAction={() => proto.run('Reloading…', 1100, () => proto.toast('success', 'Organizations reloaded'))}/>
      ) : prefs.stateMode === 'loading' ? (
        <div style={{ padding: '0 20px', display: 'grid', gap: 12 }}>
          {[0,1,2,3].map(i => <UnSkeleton key={i} h={92} r={16}/>)}
        </div>
      ) : list.length === 0 ? (
        <UnEmpty icon={<UnIconBuilding size={28}/>} title="No organizations found"
          body={q ? `Nothing matches “${q}”. Try a different search or clear your filters.` : 'No organizations in this category yet. Check back soon.'}
          actionLabel="Clear filters" onAction={() => { setQ(''); setCat('All'); }}/>
      ) : (
        <div style={{ padding: '0 20px', display: 'grid', gap: 12 }}>
          {list.map(o => (
            <div key={o.id} onClick={() => proto.push('organizationDetail', { org: o })} style={{
              display: 'flex', gap: 14, alignItems: 'center', background: '#fff',
              borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`, padding: 14, cursor: 'pointer',
            }}>
              <UnImage label={o.name} w={52} h={52} radius={14}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: UN_COLORS.ink }}>{o.name}</div>
                  {!o.active && <UnBadge status="inactive" size="sm">Inactive</UnBadge>}
                </div>
                <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 3, display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span>{o.category}</span><span>·</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><UnIconUsers size={12}/>{o.members.toLocaleString()}</span>
                </div>
              </div>
              <UnIconChevronRight size={18}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

UN_SCREENS_ORGS.organizationDetail = function OrgDetail({ proto, prefs }) {
  const o = proto.params.org || UN_ORGS[0];
  const orgEvents = UN_EVENTS.filter(e => e.org === o.name).slice(0, 2);
  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title={o.name} onBack={proto.pop}
        trailing={<button aria-label="Share organization" onClick={() => proto.openSheet({ title: 'Share this organization', render: (close) => (
          <div style={{ display: 'grid', gap: 8 }}>
            {['Copy link', 'Share to Messages', 'Invite a member'].map(l => (
              <UnButton key={l} full variant="neutral" onClick={() => { close(); proto.toast('success', l === 'Copy link' ? 'Link copied' : 'Shared', o.name); }}>{l}</UnButton>
            ))}
            <UnButton full variant="ghost" onClick={close}>Cancel</UnButton>
          </div>
        ) })} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: UN_COLORS.surface, color: UN_COLORS.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><UnIconShare size={17}/></button>}/>

      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <UnImage label={o.name} w={80} h={80} radius={22}/>
        <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 14, color: UN_COLORS.ink }}>{o.name}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
          <UnBadge status="neutral">{o.category}</UnBadge>
          <UnBadge status={o.active ? 'active' : 'inactive'}>{o.active ? 'Active' : 'Inactive'}</UnBadge>
        </div>
        <div style={{ fontSize: 14.5, color: UN_COLORS.slate, lineHeight: 1.55, marginTop: 14, textWrap: 'pretty' }}>{o.blurb}</div>
      </div>

      <div style={{ padding: '18px 20px 0', display: 'flex', gap: 10 }}>
        <UnButton full leading={<UnIconExternal size={16}/>}
          onClick={() => proto.run('Opening website…', 900, () => proto.toast('info', 'Opening in Safari', o.site))}>Open website</UnButton>
        <UnButton variant="secondary" leading={<UnIconMail size={16}/>}
          onClick={() => proto.openSheet({
            title: `Contact ${o.name}`,
            render: (close) => (
              <div style={{ display: 'grid', gap: 8 }}>
                <UnButton full leading={<UnIconMail size={16}/>} onClick={() => { close(); proto.toast('success', 'Draft started', `New email to ${o.email}`); }}>Email {o.email}</UnButton>
                <UnButton full variant="neutral" onClick={() => { close(); proto.toast('success', 'Address copied', o.email); }}>Copy email address</UnButton>
                <UnButton full variant="ghost" onClick={close}>Cancel</UnButton>
              </div>
            ),
          })}>Contact</UnButton>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <UnCard padded={false}>
          <UnRow icon={<UnIconUsers size={17}/>} title={`${o.members.toLocaleString()} members`} subtitle="Across all UNNG chapters"/>
          <UnRow icon={<UnIconGlobe size={17}/>} title={o.site} subtitle="Website" trailing={<UnIconExternal size={16}/>}
            onClick={() => proto.run('Opening website…', 900, () => proto.toast('info', 'Opening in Safari', o.site))}/>
          <UnRow icon={<UnIconMail size={17}/>} title={o.email} subtitle="Contact email" isLast trailing={<UnIconChevronRight size={16}/>}
            onClick={() => proto.toast('success', 'Address copied', o.email)}/>
        </UnCard>
      </div>

      {orgEvents.length > 0 && (
        <>
          <div style={{ height: 22 }}/>
          <UnSectionHeader title="Events from this organization"/>
          <div style={{ padding: '0 20px', display: 'grid', gap: 12 }}>
            {orgEvents.map(e => (
              <UnEventCardCompact key={e.id} event={e}
                onClick={() => proto.push(e.free ? 'eventDetailFree' : 'eventDetailPaid', { event: e })}/>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_ORGS);
