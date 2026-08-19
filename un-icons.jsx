// un-icons.jsx — Lucide-style stroke icons for UNNG

const UN_S = (n) => ({ width: n, height: n, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' });

function UnIconHome({ size = 22, filled }) { return <svg {...UN_S(size)}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>{filled && <path fill="currentColor" stroke="none" d="M5 10l7-6 7 6v10H5z"/>}</svg>; }
function UnIconCalendar({ size = 22, filled }) { return <svg {...UN_S(size)}><rect x="3.5" y="5" width="17" height="15" rx="2.5" fill={filled ? 'currentColor' : 'none'}/><path stroke={filled ? '#fff' : 'currentColor'} d="M8 3v4M16 3v4M3.5 10h17"/></svg>; }
function UnIconHeart({ size = 22, filled }) { return <svg {...UN_S(size)}><path fill={filled ? 'currentColor' : 'none'} d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>; }
function UnIconForum({ size = 22, filled }) { return <svg {...UN_S(size)}><path fill={filled ? 'currentColor' : 'none'} d="M21 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" transform="translate(-1 -1) scale(0.8)"/><path d="M3 18l1.4-3.4A8 8 0 1 1 8 19l-5 -1z" fill={filled ? 'currentColor' : 'none'}/></svg>; }
function UnIconUser({ size = 22, filled }) { return <svg {...UN_S(size)}><circle cx="12" cy="9" r="4" fill={filled ? 'currentColor' : 'none'}/><path d="M4 21c0-4 4-6 8-6s8 2 8 6" fill={filled ? 'currentColor' : 'none'}/></svg>; }
function UnIconBuilding({ size = 22 }) { return <svg {...UN_S(size)}><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/></svg>; }
function UnIconBell({ size = 22 }) { return <svg {...UN_S(size)}><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>; }
function UnIconBellDot({ size = 22 }) { return <svg {...UN_S(size)}><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7z"/><path d="M10 19a2 2 0 0 0 4 0"/><circle cx="18" cy="6" r="3" fill="#B42318" stroke="none"/></svg>; }
function UnIconSearch({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/></svg>; }
function UnIconChevronLeft({ size = 22 }) { return <svg {...UN_S(size)}><path d="m15 6-6 6 6 6"/></svg>; }
function UnIconChevronRight({ size = 22 }) { return <svg {...UN_S(size)}><path d="m9 6 6 6-6 6"/></svg>; }
function UnIconChevronDown({ size = 22 }) { return <svg {...UN_S(size)}><path d="m6 9 6 6 6-6"/></svg>; }
function UnIconCheck({ size = 22 }) { return <svg {...UN_S(size)} strokeWidth={2.4}><path d="M5 12.5 10 17l9-10"/></svg>; }
function UnIconX({ size = 22 }) { return <svg {...UN_S(size)} strokeWidth={2.2}><path d="M6 6l12 12M18 6 6 18"/></svg>; }
function UnIconPlus({ size = 22 }) { return <svg {...UN_S(size)} strokeWidth={2}><path d="M12 5v14M5 12h14"/></svg>; }
function UnIconClock({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>; }
function UnIconLocation({ size = 22 }) { return <svg {...UN_S(size)}><path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>; }
function UnIconAlert({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17v.01"/></svg>; }
function UnIconInfo({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 8v.01"/></svg>; }
function UnIconLock({ size = 22 }) { return <svg {...UN_S(size)}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>; }
function UnIconMail({ size = 22 }) { return <svg {...UN_S(size)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>; }
function UnIconEye({ size = 22 }) { return <svg {...UN_S(size)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>; }
function UnIconEyeOff({ size = 22 }) { return <svg {...UN_S(size)}><path d="M3 3l18 18"/><path d="M10 5.5A10 10 0 0 1 22 12s-1 2-3.3 4M14.5 18.5A10 10 0 0 1 2 12s1.5-3 4.7-5"/><path d="M9.5 9.5a3 3 0 0 0 4 4"/></svg>; }
function UnIconCamera({ size = 22 }) { return <svg {...UN_S(size)}><rect x="3" y="7" width="18" height="13" rx="2.5"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7l1.5-3h3L15 7"/></svg>; }
function UnIconApple({ size = 22 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.5c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.6-.2-3.2 1-4.1 1-.9 0-2.2-1-3.6-1-1.8 0-3.6 1.1-4.5 2.7-1.9 3.4-.5 8.4 1.4 11.1.9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9s2.2.9 3.6.9c1.5 0 2.5-1.3 3.4-2.7 1.1-1.5 1.5-3 1.6-3.1-.1 0-3.3-1.3-3.3-4.6zM13.7 5.7c.7-.9 1.2-2.1 1.1-3.3-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.5-.6 3.2-1.5z"/></svg>; }
function UnIconGoogle({ size = 22 }) { return <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.3z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3v2.6A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3a10 10 0 0 0 0 9l3.4-2.5z"/><path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 2.9 14.7 2 12 2A10 10 0 0 0 3 7.5L6.4 10c.8-2.4 3-4.1 5.6-4.1z"/></svg>; }
function UnIconExternal({ size = 22 }) { return <svg {...UN_S(size)}><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M20 14v6H4V4h6"/></svg>; }
function UnIconShare({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>; }
function UnIconWifi({ size = 22 }) { return <svg {...UN_S(size)}><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/></svg>; }
function UnIconWifiOff({ size = 22 }) { return <svg {...UN_S(size)}><path d="M3 3l18 18"/><path d="M5 12.5a10 10 0 0 1 4-3"/><path d="M19 12.5a10 10 0 0 0-7-2.9"/><path d="M8.5 16a5 5 0 0 1 5.5-1"/><circle cx="12" cy="19.5" r="1" fill="currentColor"/></svg>; }
function UnIconLogout({ size = 22 }) { return <svg {...UN_S(size)}><path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4"/><path d="M10 8l-4 4 4 4"/><path d="M6 12h11"/></svg>; }
function UnIconCard({ size = 22 }) { return <svg {...UN_S(size)}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>; }
function UnIconReceipt({ size = 22 }) { return <svg {...UN_S(size)}><path d="M5 3v18l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5 2 1.5V3z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>; }
function UnIconStar({ size = 22, filled }) { return <svg {...UN_S(size)}><path fill={filled ? 'currentColor' : 'none'} d="m12 3 2.6 6 6.4.6-4.8 4.4 1.4 6.5L12 17l-5.6 3.5 1.4-6.5L3 9.6 9.4 9z"/></svg>; }
function UnIconUsers({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="9" cy="9" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><path d="M15 19c0-2 2-4 4-4"/></svg>; }
function UnIconFilter({ size = 22 }) { return <svg {...UN_S(size)}><path d="M4 5h16l-6 8v6l-4-2v-4z"/></svg>; }
function UnIconImage({ size = 22 }) { return <svg {...UN_S(size)}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m4 19 5-5 4 4 3-3 4 4"/></svg>; }
function UnIconTrash({ size = 22 }) { return <svg {...UN_S(size)}><path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7"/><path d="M10 11v6M14 11v6"/></svg>; }
function UnIconEdit({ size = 22 }) { return <svg {...UN_S(size)}><path d="M4 20h4l10-10-4-4L4 16z"/><path d="m14 6 4 4"/></svg>; }
function UnIconDots({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="6" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="18" cy="12" r="1.5" fill="currentColor"/></svg>; }
function UnIconReply({ size = 22 }) { return <svg {...UN_S(size)}><path d="M9 5 3 11l6 6"/><path d="M3 11h11a6 6 0 0 1 6 6v2"/></svg>; }
function UnIconRevolut({ size = 22 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M5 4h7a4.5 4.5 0 0 1 0 9h-2l5 7h-3.5l-5-7H8v7H5V4zm3 2.6v3.8h3.8a1.9 1.9 0 0 0 0-3.8H8z"/></svg>; }
function UnIconSparkles({ size = 22 }) { return <svg {...UN_S(size)}><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 17l.7 1.8L21.5 19.5l-1.8.7L19 22l-.7-1.8L16.5 19.5l1.8-.7z"/></svg>; }
function UnIconShield({ size = 22 }) { return <svg {...UN_S(size)}><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6z"/></svg>; }
function UnIconQR({ size = 22 }) { return <svg {...UN_S(size)}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M21 14v3M14 21h7"/></svg>; }
function UnIconRefund({ size = 22 }) { return <svg {...UN_S(size)}><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v5l3 2"/></svg>; }
function UnIconBookmark({ size = 22 }) { return <svg {...UN_S(size)}><path d="M6 3h12v18l-6-4-6 4z"/></svg>; }
function UnIconGlobe({ size = 22 }) { return <svg {...UN_S(size)}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>; }
function UnIconCalendarPlus({ size = 22 }) { return <svg {...UN_S(size)}><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17M12 13v5M9.5 15.5h5"/></svg>; }
function UnIconPaperclip({ size = 22 }) { return <svg {...UN_S(size)}><path d="M21 12.5 12.5 21a5 5 0 0 1-7-7L14 5.5a3.5 3.5 0 0 1 5 5L11 18a2 2 0 0 1-3-3l7-7"/></svg>; }

function UnTabIcon({ name, active }) {
  const size = 24;
  const map = { home: UnIconHome, calendar: UnIconCalendar, heart: UnIconHeart, forum: UnIconForum, user: UnIconUser };
  const C = map[name] || UnIconHome;
  return <C size={size} filled={active}/>;
}

Object.assign(window, {
  UnIconHome, UnIconCalendar, UnIconHeart, UnIconForum, UnIconUser, UnIconBuilding,
  UnIconBell, UnIconBellDot, UnIconSearch, UnIconChevronLeft, UnIconChevronRight, UnIconChevronDown,
  UnIconCheck, UnIconX, UnIconPlus, UnIconClock, UnIconLocation, UnIconAlert, UnIconInfo,
  UnIconLock, UnIconMail, UnIconEye, UnIconEyeOff, UnIconCamera, UnIconApple, UnIconGoogle,
  UnIconExternal, UnIconShare, UnIconWifi, UnIconWifiOff, UnIconLogout, UnIconCard, UnIconReceipt,
  UnIconStar, UnIconUsers, UnIconFilter, UnIconImage, UnIconTrash, UnIconEdit, UnIconDots,
  UnIconReply, UnIconRevolut, UnIconSparkles, UnIconShield, UnIconQR, UnIconRefund,
  UnIconBookmark, UnIconGlobe, UnIconCalendarPlus, UnIconPaperclip, UnTabIcon,
});
