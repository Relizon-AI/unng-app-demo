// un-screens-forums.jsx — M21 Categories, M22 Topic list, M23 Topic detail,
// M24 Create, M25 Edit, M26 Delete confirm, M27 Upgrade prompt

const UN_SCREENS_FORUMS = {};

// ─── M21 Forum Categories ─────────────────────────────────────
UN_SCREENS_FORUMS.forumsCategories = function Categories({ proto, prefs }) {
  const locked = prefs.role !== 'paid';
  return (
    <div style={{ paddingBottom: 30 }}>
      <UnTopBar title="Forums" large subtitle="Conversations across the UNNG community"/>
      <div style={{ padding: '10px 20px 16px' }}>
        <UnSearch placeholder="Search all topics"/>
      </div>

      {locked && (
        <div style={{ padding: '0 20px 16px' }}>
          <div onClick={() => proto.push('upgradePrompt')} style={{
            background: UN_COLORS.gold50, borderRadius: 16, padding: 14,
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            border: `1px solid ${UN_COLORS.gold}`,
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: '#fff', color: '#8A6B1F', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><UnIconLock size={17}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: UN_COLORS.ink }}>Reading is open to everyone</div>
              <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 2 }}>Subscribe to post and reply</div>
            </div>
            <UnIconChevronRight size={17}/>
          </div>
        </div>
      )}

      {prefs.stateMode === 'empty' ? (
        <UnEmpty icon={<UnIconForum size={28}/>} title="No forum categories yet"
          body="Categories will appear here once the UNNG team publishes them."/>
      ) : (
        <div style={{ padding: '0 20px', display: 'grid', gap: 10 }}>
          {UN_FORUM_CATEGORIES.map((c) => (
            <div key={c.id} onClick={() => proto.push('forumTopicList', { cat: c })} style={{
              background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`,
              padding: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                background: UN_COLORS.primary50, color: UN_COLORS.primary,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><UnIconForum size={20}/></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: UN_COLORS.ink }}>{c.name}</div>
                  {c.restricted && <UnBadge status="gold" size="sm" icon={<UnIconLock size={9}/>}>Members</UnBadge>}
                </div>
                <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 3 }}>{c.blurb} · {c.topics} topics</div>
              </div>
              <UnIconChevronRight size={18}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── M22 Forum Topic List ─────────────────────────────────────
UN_SCREENS_FORUMS.forumTopicList = function TopicList({ proto, prefs }) {
  const cat = proto.params.cat || UN_FORUM_CATEGORIES[1];
  const [q, setQ] = React.useState('');
  const [sort, setSort] = React.useState('recent');
  const canPost = prefs.role === 'paid';
  let topics = proto.data.topics.filter(t => t.cat === cat.name || cat.name === 'Members Lounge')
    .filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
  if (sort === 'active') topics = [...topics].sort((a, b) => (proto.data.comments[b.id] || []).length - (proto.data.comments[a.id] || []).length || b.comments - a.comments);
  else if (sort === 'unanswered') topics = topics.filter(t => t.comments === 0 && !(proto.data.comments[t.id] || []).length);
  const list = prefs.stateMode === 'empty' ? [] : topics;

  // Restricted category + unpaid user → permission denied
  if (cat.restricted && !canPost && prefs.stateMode === 'permission') {
    return (
      <div>
        <UnTopBar title={cat.name} onBack={proto.pop}/>
        <UnEmpty icon={<UnIconLock size={28}/>} title="Members only"
          body="This category is available to active members. Subscribe to read and take part in the discussion."
          actionLabel="See plans" onAction={() => proto.push('subscriptionPlans')}/>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: canPost ? 110 : 30 }}>
      <UnTopBar title={cat.name} onBack={proto.pop} subtitle={`${cat.topics} topics`}/>
      <div style={{ padding: '14px 20px 12px' }}>
        <UnSearch value={q} onChange={setQ} placeholder={`Search in ${cat.name}`}/>
      </div>
      <div className="un-scroll" style={{ display: 'flex', gap: 8, padding: '0 20px 16px', overflowX: 'auto' }}>
        {[['recent','Most recent'],['active','Most active'],['unanswered','Unanswered']].map(([v,l]) => (
          <UnChip key={v} active={sort === v} onClick={() => setSort(v)}>{l}</UnChip>
        ))}
      </div>

      {list.length === 0 ? (
        <UnEmpty icon={<UnIconForum size={28}/>} title="No topics here yet"
          body={canPost ? 'Be the first to start a conversation in this category.' : 'Nothing has been posted here yet. Check back soon.'}
          actionLabel={canPost ? 'Create topic' : undefined}
          onAction={() => proto.push('createTopic', { cat })}/>
      ) : (
        <div style={{ padding: '0 20px', display: 'grid', gap: 10 }}>
          {list.map((t) => <UnTopicCard key={t.id} topic={t} onClick={() => proto.push('forumTopicDetail', { topic: t })}/>)}
        </div>
      )}

      {canPost ? (
        <UnStickyBar>
          <UnButton full leading={<UnIconPlus size={17}/>} onClick={() => proto.push('createTopic', { cat })}>Create topic</UnButton>
        </UnStickyBar>
      ) : sort !== 'unanswered' && (
        <div style={{ padding: '20px' }}>
          <div onClick={() => proto.push('upgradePrompt')} style={{
            background: '#fff', border: `1.5px dashed ${UN_COLORS.gold}`, borderRadius: 16,
            padding: 16, textAlign: 'center', cursor: 'pointer',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: UN_COLORS.ink }}>Want to join in?</div>
            <div style={{ fontSize: 12.5, color: UN_COLORS.slate, marginTop: 4, lineHeight: 1.45 }}>
              Forum posting is available to active members. Subscribe to join the discussion.
            </div>
            <div style={{ marginTop: 12 }}><UnButton size="sm">See plans</UnButton></div>
          </div>
        </div>
      )}
    </div>
  );
};

function UnTopicCard({ topic, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`,
      padding: 14, cursor: 'pointer', display: 'flex', gap: 12,
    }}>
      <UnAvatar name={topic.deleted ? 'D U' : topic.author} size={38} color={topic.authorColor}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 5, flexWrap: 'wrap' }}>
          {topic.pinned && <UnBadge status="info" size="sm">Pinned</UnBadge>}
          {topic.deleted && <UnBadge status="neutral" size="sm">Deleted user</UnBadge>}
          {topic.restricted && <UnBadge status="gold" size="sm" icon={<UnIconLock size={9}/>}>Members</UnBadge>}
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: UN_COLORS.ink, lineHeight: 1.32, textWrap: 'pretty' }}>{topic.title}</div>
        <div style={{ fontSize: 12, color: UN_COLORS.slate, marginTop: 6, display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
          <span>{topic.author}</span><span>·</span><span>{topic.when} ago</span><span>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><UnIconForum size={11}/>{topic.comments}</span>
        </div>
      </div>
    </div>
  );
}

// ─── M23 Forum Topic Detail ───────────────────────────────────
UN_SCREENS_FORUMS.forumTopicDetail = function TopicDetail({ proto, prefs }) {
  const base = proto.params.topic || proto.data.topics[0];
  const t = proto.data.topics.find(x => x.id === base.id) || base;
  const canPost = prefs.role === 'paid';
  const isOwner = !!t.mine;
  const [draft, setDraft] = React.useState('');
  const [replyTo, setReplyTo] = React.useState(null);
  const [menu, setMenu] = React.useState(false);

  const comments = proto.data.comments[t.id] || [];

  const post = () => {
    if (!draft.trim()) return;
    proto.addComment(t.id, draft.trim());
    setDraft(''); setReplyTo(null);
    proto.toast('success', 'Comment posted');
  };

  const report = (c) => proto.confirm({
    title: 'Report this comment?', body: 'Our moderators will review it against the community guidelines.',
    confirmLabel: 'Report', danger: true,
    onConfirm: () => proto.toast('success', 'Comment reported', 'Thank you — a moderator will take a look.'),
  });

  const deleteOwnComment = (c) => proto.confirm({
    title: 'Delete this comment?', body: 'This removes your comment for everyone. This cannot be undone.',
    confirmLabel: 'Delete', danger: true,
    onConfirm: () => { proto.deleteComment(t.id, c.id); proto.toast('info', 'Comment deleted'); },
  });

  return (
    <div style={{ paddingBottom: canPost ? 120 : 90 }}>
      <UnTopBar title={t.cat} onBack={proto.pop}
        trailing={isOwner ? (
          <button onClick={() => setMenu(true)} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: UN_COLORS.surface, color: UN_COLORS.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><UnIconDots size={18}/></button>
        ) : (
          <button onClick={() => report({ body: t.title })} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: UN_COLORS.surface, color: UN_COLORS.slate, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><UnIconAlert size={17}/></button>
        )}/>

      {/* Topic body */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {t.pinned && <UnBadge status="info" size="sm">Pinned</UnBadge>}
          {t.restricted && <UnBadge status="gold" size="sm" icon={<UnIconLock size={9}/>}>Members</UnBadge>}
        </div>
        <h1 style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.25, color: UN_COLORS.ink, textWrap: 'pretty' }}>{t.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
          <UnAvatar name={t.author} size={36} color={t.authorColor}/>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: UN_COLORS.ink }}>{t.author}</div>
            <div style={{ fontSize: 12, color: UN_COLORS.slate }}>{t.when} ago</div>
          </div>
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.6, color: UN_COLORS.ink2, marginTop: 16, textWrap: 'pretty' }}>{t.body}</div>
        {!t.deleted && <div style={{ marginTop: 14 }}><UnImage label={t.title} h={160} radius={14}/></div>}
      </div>

      {/* Comments */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
          {comments.length} comments
        </div>
        <div style={{ display: 'grid', gap: 14 }}>
          {comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: 12 }}>
              <UnAvatar name={c.author} size={34} color={c.color}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${UN_COLORS.slate2}`, padding: '11px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.deleted ? UN_COLORS.slate : UN_COLORS.ink }}>{c.author}</span>
                    <span style={{ fontSize: 11.5, color: UN_COLORS.slate }}>· {c.when}</span>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, marginTop: 5, color: c.deleted ? UN_COLORS.slate : UN_COLORS.ink2, fontStyle: c.deleted ? 'italic' : 'normal' }}>{c.body}</div>
                </div>
                {!c.deleted && (
                  <div style={{ display: 'flex', gap: 16, marginTop: 7, paddingLeft: 4 }}>
                    {canPost && <button onClick={() => setReplyTo(c)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 12.5, fontWeight: 600, color: UN_COLORS.slate, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 4 }}><UnIconReply size={13}/> Reply</button>}
                    {c.mine ? (
                      <button onClick={() => deleteOwnComment(c)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 12.5, fontWeight: 600, color: UN_COLORS.danger, cursor: 'pointer', fontFamily: 'inherit' }}>Delete</button>
                    ) : (
                      <button onClick={() => report(c)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 12.5, fontWeight: 600, color: UN_COLORS.slate, cursor: 'pointer', fontFamily: 'inherit' }}>Report</button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Composer or upgrade */}
      {canPost ? (
        <UnStickyBar>
          {replyTo && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 12, color: UN_COLORS.slate }}>
              <span>Replying to <b style={{ color: UN_COLORS.ink }}>{replyTo.author}</b></span>
              <button onClick={() => setReplyTo(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: UN_COLORS.slate }}><UnIconX size={13}/></button>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <UnSearch value={draft} onChange={setDraft} placeholder={replyTo ? `Reply to ${replyTo.author}…` : 'Add a comment…'}/>
            </div>
            <UnButton size="md" disabled={!draft.trim()} style={{ width: 48, padding: 0 }} onClick={post}>
              <UnIconReply size={18}/>
            </UnButton>
          </div>
        </UnStickyBar>
      ) : (
        <UnStickyBar>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: UN_COLORS.slate, flexShrink: 0 }}><UnIconLock size={18}/></span>
            <div style={{ flex: 1, fontSize: 12.5, color: UN_COLORS.slate, lineHeight: 1.4 }}>
              Commenting is available to active members.
            </div>
            <UnButton size="sm" onClick={() => proto.push('upgradePrompt')}>Subscribe</UnButton>
          </div>
        </UnStickyBar>
      )}

      {menu && (
        <UnModal onClose={() => setMenu(false)}>
          <div style={{ display: 'grid', gap: 8 }}>
            <UnButton full variant="neutral" leading={<UnIconEdit size={16}/>} onClick={() => { setMenu(false); proto.push('editTopic', { topic: t }); }}>Edit topic</UnButton>
            <UnButton full variant="destructiveOutline" leading={<UnIconTrash size={16}/>} onClick={() => { setMenu(false); proto.push('deleteConfirm', { kind: 'topic', topic: t, commentCount: comments.length }); }}>Delete topic</UnButton>
            <UnButton full variant="ghost" onClick={() => setMenu(false)}>Cancel</UnButton>
          </div>
        </UnModal>
      )}
    </div>
  );
};

// ─── M24 Create Topic ─────────────────────────────────────────
UN_SCREENS_FORUMS.createTopic = function CreateTopic({ proto, prefs }) {
  const cat = proto.params.cat || UN_FORUM_CATEGORIES[1];
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [media, setMedia] = React.useState([]);
  const showErr = prefs.stateMode === 'error';
  const valid = title.trim().length >= 8 && body.trim().length > 0;

  return (
    <div style={{ paddingBottom: 120 }}>
      <UnTopBar title="New topic" onBack={proto.pop}/>
      <div style={{ padding: '18px 20px 0', display: 'grid', gap: 16 }}>
        {/* Rules reminder */}
        <div style={{ background: UN_COLORS.primary50, borderRadius: 14, padding: 14, display: 'flex', gap: 10 }}>
          <span style={{ color: UN_COLORS.primary, flexShrink: 0, marginTop: 1 }}><UnIconShield size={16}/></span>
          <div style={{ fontSize: 12.5, color: UN_COLORS.ink2, lineHeight: 1.5 }}>
            Keep it respectful and on topic. No personal attacks, spam, or private information.
            <span style={{ color: UN_COLORS.info, fontWeight: 600 }}> Read the full guidelines</span>
          </div>
        </div>

        <label style={{ display: 'block' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: UN_COLORS.ink2, marginBottom: 6 }}>Category</div>
          <div style={{
            height: 48, borderRadius: 12, border: `1.5px solid ${UN_COLORS.slate2}`, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, fontSize: 15,
          }}>
            <span style={{ flex: 1, fontWeight: 600 }}>{cat.name}</span>
            <UnIconChevronDown size={18}/>
          </div>
        </label>

        <UnInput label="Title" value={title} onChange={setTitle}
          placeholder="Ask a clear question or state your topic"
          error={showErr && title.length < 8 ? 'Give your topic a title of at least 8 characters.' : undefined}
          hint={!showErr ? `${title.length}/120` : undefined}/>

        <UnInput label="Body" value={body} onChange={setBody} multiline rows={6}
          placeholder="Share the details. What have you already tried or found out?"/>

        {/* Media */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: UN_COLORS.ink2, marginBottom: 8 }}>Images & video (optional)</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {media.map((m, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <UnImage label={`M${i}`} w={72} h={72} radius={12}/>
                <button onClick={() => setMedia(media.filter((_, j) => j !== i))} style={{
                  position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: 11,
                  background: UN_COLORS.ink, color: '#fff', border: '2px solid #fff', cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0,
                }}><UnIconX size={11}/></button>
              </div>
            ))}
            <button onClick={() => setMedia([...media, 1])} style={{
              width: 72, height: 72, borderRadius: 12, border: `1.5px dashed ${UN_COLORS.slate2}`,
              background: '#fff', color: UN_COLORS.slate, cursor: 'pointer',
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
            }}><UnIconImage size={18}/><span style={{ fontSize: 10.5, fontWeight: 600 }}>Add</span></button>
          </div>
        </div>
      </div>

      <UnStickyBar>
        <div style={{ display: 'flex', gap: 10 }}>
          <UnButton variant="neutral" onClick={() => proto.toast('info', 'Preview', 'Preview matches how the topic will look once published.')}>Preview</UnButton>
          <UnButton full disabled={!valid} onClick={() => proto.run('Publishing…', 800, () => {
            const created = proto.createTopic(cat, title.trim(), body.trim(), media.length);
            proto.toast('success', 'Topic published', created.title);
            proto.pop();
          })}>Publish topic</UnButton>
        </div>
      </UnStickyBar>
    </div>
  );
};

// ─── M25 Edit Topic / Comment ─────────────────────────────────
UN_SCREENS_FORUMS.editTopic = function EditTopic({ proto, prefs }) {
  const base = proto.params.topic || proto.data.topics[0];
  const t = proto.data.topics.find(x => x.id === base.id) || base;
  const [title, setTitle] = React.useState(t.title);
  const [body, setBody] = React.useState(t.body);
  const [confirmCancel, setConfirmCancel] = React.useState(false);
  const dirty = title !== t.title || body !== t.body;

  return (
    <div style={{ paddingBottom: 110 }}>
      <UnTopBar title="Edit topic" onBack={() => dirty ? setConfirmCancel(true) : proto.pop()}/>
      <div style={{ padding: '18px 20px 0', display: 'grid', gap: 16 }}>
        <div style={{ fontSize: 12.5, color: UN_COLORS.slate, background: UN_COLORS.surface, padding: 12, borderRadius: 12, lineHeight: 1.45 }}>
          Edited posts show an “edited” label. Your original publish time stays the same.
        </div>
        <UnInput label="Title" value={title} onChange={setTitle}/>
        <UnInput label="Body" value={body} onChange={setBody} multiline rows={6}/>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: UN_COLORS.ink2, marginBottom: 8 }}>Attached media</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <UnImage label={t.title} w={72} h={72} radius={12}/>
              <button style={{
                position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: 11,
                background: UN_COLORS.danger, color: '#fff', border: '2px solid #fff', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0,
              }}><UnIconX size={11}/></button>
            </div>
            <button style={{
              width: 72, height: 72, borderRadius: 12, border: `1.5px dashed ${UN_COLORS.slate2}`,
              background: '#fff', color: UN_COLORS.slate, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><UnIconPlus size={18}/></button>
          </div>
        </div>
        <button onClick={() => proto.push('deleteConfirm', { kind: 'topic', topic: t })} style={{
          background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer',
          color: UN_COLORS.danger, fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}><UnIconTrash size={15}/> Delete this topic</button>
      </div>

      <UnStickyBar>
        <UnButton full disabled={!dirty} onClick={() => proto.run('Saving…', 700, () => {
          proto.updateTopic(t.id, title.trim(), body.trim());
          proto.toast('success', 'Topic updated');
          proto.pop();
        })}>Save changes</UnButton>
      </UnStickyBar>

      {confirmCancel && (
        <UnModal title="Discard your changes?" onClose={() => setConfirmCancel(false)}>
          <div style={{ fontSize: 14, color: UN_COLORS.slate, lineHeight: 1.5 }}>
            Your edits have not been saved. Going back now will discard them.
          </div>
          <div style={{ display: 'grid', gap: 8, marginTop: 18 }}>
            <UnButton full variant="neutral" onClick={() => setConfirmCancel(false)}>Keep editing</UnButton>
            <UnButton full variant="destructiveOutline" onClick={proto.pop}>Discard changes</UnButton>
          </div>
        </UnModal>
      )}
    </div>
  );
};

// ─── M26 Delete Topic / Comment Confirmation ──────────────────
UN_SCREENS_FORUMS.deleteConfirm = function DeleteConfirm({ proto, prefs }) {
  const kind = proto.params.kind || 'topic';
  const [ack, setAck] = React.useState(false);
  const isTopic = kind === 'topic';
  const topic = proto.params.topic;
  const comment = proto.params.comment;
  const commentCount = isTopic ? (proto.params.commentCount ?? (proto.data.comments[topic && topic.id] || []).length) : 0;

  const doDelete = () => {
    if (isTopic && topic) {
      proto.deleteTopic(topic.id);
      proto.toast('info', 'Topic deleted');
      proto.reset('forumsCategories');
    } else if (topic && comment) {
      proto.deleteComment(topic.id, comment.id);
      proto.toast('info', 'Comment deleted');
      proto.popTo('forumTopicDetail');
    } else {
      proto.pop();
    }
  };

  return (
    <div style={{ paddingBottom: 110 }}>
      <UnTopBar title={`Delete ${kind}`} onBack={proto.pop}/>
      <div style={{ padding: '28px 24px 0', textAlign: 'center' }}>
        <UnStatusIcon kind="failed" size={72}/>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 18, color: UN_COLORS.ink }}>
          Delete this {kind}?
        </div>
        <div style={{ fontSize: 14.5, color: UN_COLORS.slate, lineHeight: 1.55, marginTop: 10, textWrap: 'pretty' }}>
          {isTopic
            ? 'This removes the topic and all of its comments for everyone. This cannot be undone.'
            : 'This removes your comment for everyone. This cannot be undone.'}
        </div>
      </div>

      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${UN_COLORS.slate2}`, overflow: 'hidden' }}>
          <UnCheckoutRow label={isTopic ? 'Topic' : 'Comment'} value={isTopic ? (topic ? topic.title : '') : (comment ? comment.body : '')}/>
          <UnCheckoutRow label="Comments removed" value={isTopic ? String(commentCount) : '0'}/>
          <UnCheckoutRow label="Visible to" value="No one after deletion" isLast/>
        </div>

        {isTopic && commentCount > 0 && (
          <label style={{ display: 'flex', gap: 10, marginTop: 18, alignItems: 'flex-start', cursor: 'pointer' }}>
            <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)}
              style={{ width: 20, height: 20, accentColor: UN_COLORS.danger, marginTop: 1, flexShrink: 0 }}/>
            <span style={{ fontSize: 13, color: UN_COLORS.slate, lineHeight: 1.45 }}>
              I understand the {commentCount} comments on this topic will also be permanently deleted.
            </span>
          </label>
        )}
      </div>

      <UnStickyBar>
        <div style={{ display: 'grid', gap: 8 }}>
          <UnButton full variant="destructive" disabled={isTopic && commentCount > 0 && !ack} onClick={doDelete}>
            Delete {kind}
          </UnButton>
          <UnButton full variant="ghost" onClick={proto.pop}>Cancel</UnButton>
        </div>
      </UnStickyBar>
    </div>
  );
};

// ─── M27 Upgrade Prompt ───────────────────────────────────────
UN_SCREENS_FORUMS.upgradePrompt = function Upgrade({ proto, prefs }) {
  return (
    <div style={{ paddingBottom: 130 }}>
      <UnTopBar title="" onBack={proto.pop}/>
      <div style={{ padding: '10px 24px 0', textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 22, background: UN_COLORS.gold50, color: '#8A6B1F',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
        }}><UnIconLock size={30}/></div>
        <h1 style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.25, color: UN_COLORS.ink }}>
          Forum posting is for members
        </h1>
        <p style={{ fontSize: 15, color: UN_COLORS.slate, lineHeight: 1.55, marginTop: 12, textWrap: 'pretty' }}>
          Subscribe to join the discussion. You can keep reading every public topic either way.
        </p>
      </div>

      <div style={{ padding: '24px 20px 0', display: 'grid', gap: 12 }}>
        {UN_PLANS.map(p => (
          <UnPlanCard key={p.id} plan={p} compact
            onClick={() => proto.push('contributionCheckout', { kind: 'subscription', plan: p, amount: p.price })}/>
        ))}
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: UN_COLORS.slate, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>What members get</div>
        <div style={{ display: 'grid', gap: 10 }}>
          {[
            ['Post and reply in every forum', 'forum'],
            ['Member-only event pricing', 'calendar'],
            ['Members Lounge and Job Board', 'lock'],
            ['Back grants and mentorship', 'heart'],
          ].map(([label, icon]) => (
            <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center', background: '#fff', borderRadius: 14, border: `1px solid ${UN_COLORS.slate2}`, padding: '12px 14px' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: UN_COLORS.primary50, color: UN_COLORS.primary, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {icon === 'forum' ? <UnIconForum size={16}/> : icon === 'calendar' ? <UnIconCalendar size={16}/> : icon === 'lock' ? <UnIconLock size={16}/> : <UnIconHeart size={16}/>}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: UN_COLORS.ink }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <UnStickyBar>
        <div style={{ display: 'grid', gap: 8 }}>
          <UnButton full onClick={() => proto.push('subscriptionPlans')}>See all plans</UnButton>
          <UnButton full variant="ghost" onClick={proto.pop}>Continue reading</UnButton>
        </div>
      </UnStickyBar>
    </div>
  );
};

window.UnTopicCard = UnTopicCard;
window.UN_SCREENS = Object.assign(window.UN_SCREENS || {}, UN_SCREENS_FORUMS);
