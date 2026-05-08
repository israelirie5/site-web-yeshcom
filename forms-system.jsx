// ══════════════════════════════════════════════════════════════════════════
// YESHCOM OS — FORMS SYSTEM
// Drawer latéral, champs, dropzone, autocomplete, lignes répétables
// ══════════════════════════════════════════════════════════════════════════

const FC = {
  primary: '#E8690A', primaryDim: 'rgba(232,105,10,0.12)', primaryMid: 'rgba(232,105,10,0.25)',
  bg: '#0A0A0A', s1: '#111111', s2: '#1A1A1A', s3: '#222222', border: '#2A2A2A', borderHi: '#383838',
  t1: '#F5F5F5', t2: '#888888', t3: '#555555',
  success: '#22C55E', warning: '#F59E0B', danger: '#EF4444', info: '#3B82F6', purple: '#8B5CF6',
};

// ── ICON (réutilise le système existant si chargé, sinon fallback) ───────
const FI = ({ n, s=16, c='currentColor', sw=1.8 }) => {
  if (typeof I !== 'undefined') return <I n={n} s={s} c={c} strokeWidth={sw}/>;
  return <span style={{ fontSize:s, color:c }}>·</span>;
};

// ── FORM DRAWER ──────────────────────────────────────────────────────────
const FormDrawer = ({ open, onClose, title, subtitle, accent=FC.primary, width=560, children, onSave, onSecondary, secondaryLabel, primaryLabel='Enregistrer', primaryIcon='check', headerBadge, footer, dirty }) => {
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const h = e => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);
  const handleClose = () => {
    if (dirty && !confirm('Abandonner les modifications non enregistrées ?')) return;
    setClosing(true);
    setTimeout(() => { setClosing(false); onClose && onClose(); }, 180);
  };
  if (!open) return null;
  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', justifyContent:'flex-end', pointerEvents:'auto' }}>
      {/* Overlay */}
      <div onClick={handleClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(2px)', opacity: closing ? 0 : 1, transition:'opacity 0.18s' }}/>
      {/* Drawer */}
      <div style={{
        position:'relative', width, maxWidth:'95vw', height:'100%', background:FC.bg, borderLeft:`1px solid ${FC.border}`, display:'flex', flexDirection:'column',
        transform: closing ? 'translateX(20px)' : 'translateX(0)', opacity: closing ? 0 : 1, transition:'transform 0.18s ease, opacity 0.18s ease',
        boxShadow:'-20px 0 60px rgba(0,0,0,0.5)'
      }}>
        {/* Header */}
        <div style={{ padding:'18px 22px', borderBottom:`1px solid ${FC.border}`, display:'flex', alignItems:'flex-start', gap:14, flexShrink:0, background:FC.s1 }}>
          <div style={{ width:38, height:38, borderRadius:8, background:`${accent}18`, border:`1px solid ${accent}40`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <FI n={headerBadge?.icon || 'edit'} s={17} c={accent}/>
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
              <span style={{ fontSize:15, fontWeight:700, fontFamily:'Montserrat', color:FC.t1, letterSpacing:'0.02em' }}>{title}</span>
              {headerBadge?.label && (
                <span style={{ fontSize:9, fontWeight:700, color:accent, background:`${accent}18`, padding:'2px 6px', borderRadius:3, fontFamily:'JetBrains Mono', letterSpacing:'0.06em' }}>{headerBadge.label}</span>
              )}
            </div>
            {subtitle && <div style={{ fontSize:11, color:FC.t2, lineHeight:1.45 }}>{subtitle}</div>}
          </div>
          <button onClick={handleClose} style={{ background:'none', border:'none', color:FC.t3, padding:6, borderRadius:6, cursor:'pointer' }}
            onMouseEnter={e=>{e.currentTarget.style.background=FC.s2;e.currentTarget.style.color=FC.t1;}}
            onMouseLeave={e=>{e.currentTarget.style.background='none';e.currentTarget.style.color=FC.t3;}}>
            <FI n="close" s={16}/>
          </button>
        </div>
        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px 22px 24px', display:'flex', flexDirection:'column', gap:18 }}>
          {children}
        </div>
        {/* Footer */}
        <div style={{ padding:'14px 22px', borderTop:`1px solid ${FC.border}`, display:'flex', alignItems:'center', gap:8, flexShrink:0, background:FC.s1 }}>
          {footer && <div style={{ flex:1, fontSize:10, color:FC.t3, fontFamily:'JetBrains Mono', letterSpacing:'0.04em' }}>{footer}</div>}
          {!footer && <div style={{ flex:1 }}/>}
          {onSecondary && (
            <button onClick={onSecondary} style={{ background:FC.s2, border:`1px solid ${FC.border}`, borderRadius:6, padding:'8px 14px', color:FC.t2, fontSize:12, fontWeight:500, cursor:'pointer' }}>{secondaryLabel || 'Action'}</button>
          )}
          <button onClick={handleClose} style={{ background:FC.s2, border:`1px solid ${FC.border}`, borderRadius:6, padding:'8px 14px', color:FC.t2, fontSize:12, fontWeight:500, cursor:'pointer' }}>Annuler</button>
          <button onClick={onSave} style={{ display:'flex', alignItems:'center', gap:6, background:accent, border:'none', borderRadius:6, padding:'8px 16px', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer' }}>
            <FI n={primaryIcon} s={13} c="#fff"/>{primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── FORM SECTION ─────────────────────────────────────────────────────────
const FormSection = ({ title, subtitle, children, columns=1 }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
    {title && (
      <div style={{ display:'flex', alignItems:'baseline', gap:8, paddingBottom:6, borderBottom:`1px dashed ${FC.border}` }}>
        <span style={{ fontSize:10, fontWeight:700, color:FC.t2, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'JetBrains Mono' }}>{title}</span>
        {subtitle && <span style={{ fontSize:10, color:FC.t3 }}>· {subtitle}</span>}
      </div>
    )}
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${columns}, 1fr)`, gap:'12px 12px' }}>
      {children}
    </div>
  </div>
);

// ── FIELD WRAPPER ────────────────────────────────────────────────────────
const Field = ({ label, hint, error, required, span=1, children, suffix }) => (
  <div style={{ gridColumn: `span ${span}`, display:'flex', flexDirection:'column', gap:5, minWidth:0 }}>
    {label && (
      <label style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, fontWeight:600, color:FC.t2, letterSpacing:'0.02em' }}>
        {label}
        {required && <span style={{ color:FC.primary }}>*</span>}
        {suffix && <span style={{ marginLeft:'auto', fontSize:10, color:FC.t3, fontWeight:400, fontFamily:'JetBrains Mono' }}>{suffix}</span>}
      </label>
    )}
    {children}
    {hint && !error && <div style={{ fontSize:10, color:FC.t3, lineHeight:1.4 }}>{hint}</div>}
    {error && <div style={{ fontSize:10, color:FC.danger, lineHeight:1.4, display:'flex', alignItems:'center', gap:4 }}>⚠ {error}</div>}
  </div>
);

const inputBase = {
  width:'100%', background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:6, padding:'9px 11px',
  color:FC.t1, fontSize:12, fontFamily:'DM Sans, sans-serif', outline:'none', transition:'border-color 0.15s, background 0.15s'
};

const Input = ({ value, onChange, placeholder, type='text', leadingIcon, trailing, accent=FC.primary, ...rest }) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ position:'relative', display:'flex', alignItems:'center', background:FC.s1, border:`1px solid ${focused?accent:FC.border}`, borderRadius:6, transition:'border-color 0.15s' }}>
      {leadingIcon && <div style={{ paddingLeft:10, color:FC.t3 }}><FI n={leadingIcon} s={13}/></div>}
      <input type={type} value={value||''} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ ...inputBase, background:'transparent', border:'none', padding: leadingIcon ? '9px 11px 9px 8px' : '9px 11px' }}
        {...rest}/>
      {trailing && <div style={{ paddingRight:10, color:FC.t3 }}>{trailing}</div>}
    </div>
  );
};

const Textarea = ({ value, onChange, placeholder, rows=3, accent=FC.primary }) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <textarea value={value||''} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder} rows={rows}
      onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
      style={{ ...inputBase, resize:'vertical', minHeight:60, lineHeight:1.5, borderColor: focused?accent:FC.border }}/>
  );
};

const Select = ({ value, onChange, options=[], placeholder='Choisir…', accent=FC.primary }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const selected = options.find(o => (typeof o === 'string' ? o : o.value) === value);
  const selLabel = selected ? (typeof selected === 'string' ? selected : selected.label) : null;
  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={()=>setOpen(o=>!o)} style={{ ...inputBase, display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', textAlign:'left', borderColor: open?accent:FC.border, padding:'9px 11px' }}>
        <span style={{ color: selLabel ? FC.t1 : FC.t3 }}>{selLabel || placeholder}</span>
        <FI n="down" s={11} c={FC.t3}/>
      </button>
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, right:0, background:FC.s1, border:`1px solid ${FC.borderHi}`, borderRadius:6, boxShadow:'0 8px 24px rgba(0,0,0,0.5)', zIndex:10, maxHeight:240, overflowY:'auto' }}>
          {options.map((o, i) => {
            const v = typeof o === 'string' ? o : o.value;
            const l = typeof o === 'string' ? o : o.label;
            const sub = typeof o === 'object' ? o.sub : null;
            const ic = typeof o === 'object' ? o.icon : null;
            const active = v === value;
            return (
              <button key={i} onClick={()=>{onChange&&onChange(v);setOpen(false);}}
                style={{ display:'flex', alignItems:'center', gap:8, width:'100%', padding:'8px 11px', background:active?`${accent}18`:'transparent', border:'none', color:active?accent:FC.t1, cursor:'pointer', textAlign:'left', fontSize:12 }}
                onMouseEnter={e=>{ if(!active) e.currentTarget.style.background=FC.s2; }}
                onMouseLeave={e=>{ if(!active) e.currentTarget.style.background='transparent'; }}>
                {ic && <FI n={ic} s={12}/>}
                <div style={{ flex:1 }}>
                  <div>{l}</div>
                  {sub && <div style={{ fontSize:10, color:FC.t3, marginTop:1 }}>{sub}</div>}
                </div>
                {active && <FI n="check" s={12} c={accent}/>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── SEGMENTED CONTROL ────────────────────────────────────────────────────
const Segmented = ({ value, onChange, options, accent=FC.primary }) => (
  <div style={{ display:'inline-flex', background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:6, padding:2, gap:2 }}>
    {options.map(o => {
      const v = typeof o === 'string' ? o : o.value;
      const l = typeof o === 'string' ? o : o.label;
      const ic = typeof o === 'object' ? o.icon : null;
      const active = v === value;
      return (
        <button key={v} onClick={()=>onChange&&onChange(v)}
          style={{ display:'flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:4, background:active?accent:'transparent', border:'none', color:active?'#fff':FC.t2, fontSize:11, fontWeight:active?600:500, cursor:'pointer', transition:'all 0.12s' }}>
          {ic && <FI n={ic} s={12} c={active?'#fff':FC.t2}/>}
          {l}
        </button>
      );
    })}
  </div>
);

// ── TOGGLE SWITCH ────────────────────────────────────────────────────────
const Toggle = ({ value, onChange, accent=FC.primary, label }) => (
  <button onClick={()=>onChange&&onChange(!value)} style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', padding:0 }}>
    <div style={{ width:32, height:18, borderRadius:9, background: value?accent:FC.border, position:'relative', transition:'background 0.15s' }}>
      <div style={{ position:'absolute', top:2, left: value?16:2, width:14, height:14, borderRadius:'50%', background:'#fff', transition:'left 0.15s', boxShadow:'0 1px 3px rgba(0,0,0,0.4)' }}/>
    </div>
    {label && <span style={{ fontSize:12, color:FC.t1 }}>{label}</span>}
  </button>
);

// ── CHECKBOX ─────────────────────────────────────────────────────────────
const Check = ({ value, onChange, label, accent=FC.primary, hint }) => (
  <label style={{ display:'flex', alignItems:'flex-start', gap:8, cursor:'pointer', padding:'2px 0' }}>
    <div onClick={e=>{e.preventDefault();onChange&&onChange(!value);}} style={{ width:16, height:16, borderRadius:4, border:`1.5px solid ${value?accent:FC.border}`, background: value?accent:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
      {value && <FI n="check" s={11} c="#fff" sw={3}/>}
    </div>
    <div>
      {label && <div style={{ fontSize:12, color:FC.t1 }}>{label}</div>}
      {hint && <div style={{ fontSize:10, color:FC.t3, marginTop:2 }}>{hint}</div>}
    </div>
  </label>
);

// ── RADIO CARDS ──────────────────────────────────────────────────────────
const RadioCards = ({ value, onChange, options, accent=FC.primary, columns=2 }) => (
  <div style={{ display:'grid', gridTemplateColumns:`repeat(${columns}, 1fr)`, gap:8 }}>
    {options.map(o => {
      const active = o.value === value;
      return (
        <button key={o.value} onClick={()=>onChange&&onChange(o.value)}
          style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:5, padding:'11px 12px', background: active?`${accent}10`:FC.s1, border:`1.5px solid ${active?accent:FC.border}`, borderRadius:7, cursor:'pointer', textAlign:'left', transition:'all 0.12s' }}>
          <div style={{ display:'flex', alignItems:'center', gap:7, width:'100%' }}>
            {o.icon && <FI n={o.icon} s={14} c={active?accent:FC.t2}/>}
            <span style={{ fontSize:12, fontWeight:600, color: active?accent:FC.t1, flex:1 }}>{o.label}</span>
            <div style={{ width:14, height:14, borderRadius:'50%', border:`1.5px solid ${active?accent:FC.border}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              {active && <div style={{ width:6, height:6, borderRadius:'50%', background:accent }}/>}
            </div>
          </div>
          {o.sub && <span style={{ fontSize:10, color:FC.t3, lineHeight:1.4 }}>{o.sub}</span>}
        </button>
      );
    })}
  </div>
);

// ── CHIP / TAG INPUT ─────────────────────────────────────────────────────
const ChipsInput = ({ value=[], onChange, placeholder='Ajouter…', accent=FC.primary, suggestions=[] }) => {
  const [input, setInput] = React.useState('');
  const add = (v) => {
    const t = (v||input).trim();
    if (t && !value.includes(t)) onChange && onChange([...value, t]);
    setInput('');
  };
  const remove = (t) => onChange && onChange(value.filter(x => x !== t));
  return (
    <div>
      <div style={{ background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:6, padding:6, display:'flex', flexWrap:'wrap', gap:4, alignItems:'center', minHeight:38 }}>
        {value.map(t => (
          <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:4, background:`${accent}18`, color:accent, padding:'3px 7px', borderRadius:4, fontSize:11, fontWeight:500 }}>
            {t}
            <button onClick={()=>remove(t)} style={{ background:'none', border:'none', color:accent, padding:0, cursor:'pointer', display:'flex' }}><FI n="close" s={11} c={accent}/></button>
          </span>
        ))}
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder={value.length?'':placeholder}
          onKeyDown={e=>{ if(e.key==='Enter'){e.preventDefault();add();} else if(e.key==='Backspace'&&!input&&value.length){remove(value[value.length-1]);}}}
          style={{ flex:1, minWidth:80, background:'transparent', border:'none', color:FC.t1, fontSize:12, outline:'none', padding:'4px 6px', fontFamily:'DM Sans' }}/>
      </div>
      {suggestions.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:6 }}>
          {suggestions.filter(s => !value.includes(s)).map(s => (
            <button key={s} onClick={()=>add(s)} style={{ background:'none', border:`1px dashed ${FC.border}`, color:FC.t3, padding:'2px 6px', borderRadius:4, fontSize:10, cursor:'pointer' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=accent;e.currentTarget.style.color=accent;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=FC.border;e.currentTarget.style.color=FC.t3;}}>
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── AUTOCOMPLETE / RECHERCHE ENTITÉ ──────────────────────────────────────
const Autocomplete = ({ value, onChange, options=[], placeholder='Rechercher…', accent=FC.primary, allowCreate=true, onCreate }) => {
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const selected = options.find(o => o.value === value);
  const filtered = options.filter(o => !q || o.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div ref={ref} style={{ position:'relative' }}>
      {selected && !open ? (
        <div style={{ ...inputBase, display:'flex', alignItems:'center', gap:9, padding:'7px 11px' }}>
          <div style={{ width:24, height:24, borderRadius:5, background:`${accent}18`, display:'flex', alignItems:'center', justifyContent:'center', color:accent, fontSize:11, fontWeight:700 }}>
            {selected.avatar || selected.label.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12, color:FC.t1, fontWeight:500 }}>{selected.label}</div>
            {selected.sub && <div style={{ fontSize:10, color:FC.t3, fontFamily:'JetBrains Mono' }}>{selected.sub}</div>}
          </div>
          <button onClick={()=>{onChange(null);setOpen(true);}} style={{ background:'none', border:'none', color:FC.t3, padding:4, cursor:'pointer' }}><FI n="close" s={12}/></button>
        </div>
      ) : (
        <Input value={q} onChange={v=>{setQ(v);setOpen(true);}} placeholder={placeholder} leadingIcon="search" accent={accent}
          onFocus={()=>setOpen(true)}/>
      )}
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, right:0, background:FC.s1, border:`1px solid ${FC.borderHi}`, borderRadius:6, boxShadow:'0 8px 24px rgba(0,0,0,0.5)', zIndex:10, maxHeight:280, overflowY:'auto' }}>
          {filtered.map(o => (
            <button key={o.value} onClick={()=>{onChange(o.value);setOpen(false);setQ('');}} style={{ display:'flex', alignItems:'center', gap:9, width:'100%', padding:'8px 11px', background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}
              onMouseEnter={e=>e.currentTarget.style.background=FC.s2}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{ width:24, height:24, borderRadius:5, background:`${accent}18`, display:'flex', alignItems:'center', justifyContent:'center', color:accent, fontSize:11, fontWeight:700, flexShrink:0 }}>
                {o.avatar || o.label.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, color:FC.t1 }}>{o.label}</div>
                {o.sub && <div style={{ fontSize:10, color:FC.t3, fontFamily:'JetBrains Mono' }}>{o.sub}</div>}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding:'12px', fontSize:11, color:FC.t3, textAlign:'center' }}>Aucun résultat</div>
          )}
          {allowCreate && q && (
            <button onClick={()=>{onCreate&&onCreate(q);setOpen(false);}} style={{ display:'flex', alignItems:'center', gap:7, width:'100%', padding:'10px 11px', background:`${accent}10`, border:'none', borderTop:`1px solid ${FC.border}`, color:accent, cursor:'pointer', fontSize:11, fontWeight:600 }}>
              <FI n="plus" s={12} c={accent}/> Créer "{q}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ── DROPZONE ─────────────────────────────────────────────────────────────
const Dropzone = ({ files=[], onChange, accent=FC.primary, hint='PDF, PNG, JPG, AI, PSD jusqu\'à 50 MB', multiple=true }) => {
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef(null);
  const handleFiles = (fl) => {
    const arr = Array.from(fl).map(f => ({ name:f.name, size:f.size, type:f.type, _file:f }));
    onChange && onChange(multiple ? [...files, ...arr] : arr);
  };
  const remove = (i) => onChange && onChange(files.filter((_,idx)=>idx!==i));
  const fmt = (b) => b > 1e6 ? `${(b/1e6).toFixed(1)} MB` : b > 1e3 ? `${(b/1e3).toFixed(0)} KB` : `${b} B`;
  const fileIcon = (name='') => {
    const e = name.split('.').pop().toLowerCase();
    if (['png','jpg','jpeg','gif','webp','svg'].includes(e)) return { ic:'eye', c:FC.info };
    if (['pdf'].includes(e)) return { ic:'invoice', c:FC.danger };
    if (['psd','ai','sketch','fig'].includes(e)) return { ic:'edit', c:FC.purple };
    return { ic:'folder', c:FC.t2 };
  };
  return (
    <div>
      <div onDragOver={e=>{e.preventDefault();setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={e=>{e.preventDefault();setDrag(false);handleFiles(e.dataTransfer.files);}}
        onClick={()=>inputRef.current?.click()}
        style={{ background: drag?`${accent}10`:FC.s1, border:`1.5px dashed ${drag?accent:FC.border}`, borderRadius:7, padding:'22px 16px', textAlign:'center', cursor:'pointer', transition:'all 0.15s' }}>
        <div style={{ width:38, height:38, borderRadius:9, background:`${accent}18`, margin:'0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <FI n="upload" s={18} c={accent}/>
        </div>
        <div style={{ fontSize:12, color:FC.t1, fontWeight:500, marginBottom:3 }}>Glissez vos fichiers ou <span style={{ color:accent }}>parcourez</span></div>
        <div style={{ fontSize:10, color:FC.t3 }}>{hint}</div>
        <input ref={inputRef} type="file" multiple={multiple} style={{ display:'none' }} onChange={e=>handleFiles(e.target.files)}/>
      </div>
      {files.length > 0 && (
        <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:4 }}>
          {files.map((f, i) => {
            const fi = fileIcon(f.name);
            return (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 10px', background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:6 }}>
                <div style={{ width:26, height:26, borderRadius:5, background:`${fi.c}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <FI n={fi.ic} s={13} c={fi.c}/>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:11, color:FC.t1, fontWeight:500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{f.name}</div>
                  <div style={{ fontSize:9, color:FC.t3, fontFamily:'JetBrains Mono' }}>{fmt(f.size||0)}</div>
                </div>
                <button onClick={()=>remove(i)} style={{ background:'none', border:'none', color:FC.t3, padding:4, cursor:'pointer', borderRadius:4 }}
                  onMouseEnter={e=>e.currentTarget.style.color=FC.danger}
                  onMouseLeave={e=>e.currentTarget.style.color=FC.t3}><FI n="trash" s={12}/></button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── REPEATABLE ROWS ──────────────────────────────────────────────────────
const RepeatableRows = ({ rows=[], onChange, columns, accent=FC.primary, addLabel='Ajouter une ligne', emptyRow={}, summary }) => {
  const update = (i, key, val) => {
    const next = rows.map((r, idx) => idx === i ? { ...r, [key]: val } : r);
    onChange && onChange(next);
  };
  const remove = (i) => onChange && onChange(rows.filter((_,idx)=>idx!==i));
  const add = () => onChange && onChange([...rows, {...emptyRow}]);
  const totalCols = columns.reduce((s,c) => s + (c.span||1), 0);
  return (
    <div style={{ background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:7, overflow:'hidden' }}>
      {/* Header */}
      <div style={{ display:'grid', gridTemplateColumns:`${columns.map(c => `${c.span||1}fr`).join(' ')} 32px`, gap:8, padding:'8px 12px', background:FC.s2, borderBottom:`1px solid ${FC.border}` }}>
        {columns.map(c => (
          <div key={c.key} style={{ fontSize:9, fontWeight:700, color:FC.t3, textTransform:'uppercase', letterSpacing:'0.06em', fontFamily:'JetBrains Mono' }}>{c.label}</div>
        ))}
        <div/>
      </div>
      {/* Rows */}
      {rows.length === 0 && (
        <div style={{ padding:'18px 12px', textAlign:'center', fontSize:11, color:FC.t3 }}>Aucune ligne — cliquez sur "{addLabel}" ci-dessous.</div>
      )}
      {rows.map((row, i) => (
        <div key={i} style={{ display:'grid', gridTemplateColumns:`${columns.map(c => `${c.span||1}fr`).join(' ')} 32px`, gap:8, padding:'8px 12px', borderBottom:`1px solid ${FC.border}`, alignItems:'center' }}>
          {columns.map(c => (
            <div key={c.key}>
              {c.type === 'select' ? (
                <Select value={row[c.key]} onChange={v=>update(i,c.key,v)} options={c.options} placeholder={c.placeholder} accent={accent}/>
              ) : c.type === 'autocomplete' ? (
                <Autocomplete value={row[c.key]} onChange={v=>update(i,c.key,v)} options={c.options} placeholder={c.placeholder} accent={accent}/>
              ) : c.render ? (
                c.render(row, (v) => update(i, c.key, v), i)
              ) : (
                <input type={c.type||'text'} value={row[c.key]||''} onChange={e=>update(i,c.key,e.target.value)} placeholder={c.placeholder}
                  style={{ ...inputBase, padding:'7px 10px', fontSize:11.5 }}/>
              )}
            </div>
          ))}
          <button onClick={()=>remove(i)} style={{ background:'none', border:'none', color:FC.t3, padding:6, cursor:'pointer', borderRadius:4, display:'flex', justifyContent:'center' }}
            onMouseEnter={e=>e.currentTarget.style.color=FC.danger}
            onMouseLeave={e=>e.currentTarget.style.color=FC.t3}><FI n="trash" s={13}/></button>
        </div>
      ))}
      {/* Footer */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', background:FC.s2 }}>
        <button onClick={add} style={{ display:'flex', alignItems:'center', gap:5, background:'none', border:`1px dashed ${accent}50`, color:accent, padding:'5px 10px', borderRadius:5, fontSize:11, fontWeight:600, cursor:'pointer' }}
          onMouseEnter={e=>e.currentTarget.style.background=`${accent}10`}
          onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
          <FI n="plus" s={11} c={accent}/>{addLabel}
        </button>
        {summary && <div style={{ fontSize:11, color:FC.t2, fontFamily:'JetBrains Mono' }}>{summary}</div>}
      </div>
    </div>
  );
};

// ── DATE PICKER (input simple stylé) ─────────────────────────────────────
const DateInput = ({ value, onChange, accent=FC.primary, min }) => {
  return <Input type="date" value={value} onChange={onChange} accent={accent} min={min}/>;
};

// ── MONEY INPUT ──────────────────────────────────────────────────────────
const MoneyInput = ({ value, onChange, currency='FCFA', accent=FC.primary }) => (
  <Input type="text" value={value} onChange={onChange} placeholder="0" accent={accent}
    trailing={<span style={{ fontSize:10, color:FC.t3, fontFamily:'JetBrains Mono', fontWeight:600 }}>{currency}</span>}/>
);

// ── PERCENT INPUT ────────────────────────────────────────────────────────
const PercentInput = ({ value, onChange, accent=FC.primary }) => (
  <Input type="number" value={value} onChange={onChange} placeholder="0" accent={accent}
    trailing={<span style={{ fontSize:10, color:FC.t3, fontFamily:'JetBrains Mono', fontWeight:600 }}>%</span>}/>
);

// ── COLOR PICKER ─────────────────────────────────────────────────────────
const ColorSwatch = ({ value, onChange, palette }) => {
  const colors = palette || ['#E8690A','#22C55E','#3B82F6','#8B5CF6','#F59E0B','#EF4444','#06B6D4','#EC4899','#84CC16','#6366F1'];
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
      {colors.map(c => (
        <button key={c} onClick={()=>onChange(c)} style={{ width:26, height:26, borderRadius:6, background:c, border: value===c ? `2px solid ${FC.t1}` : `1px solid ${FC.border}`, cursor:'pointer', boxShadow: value===c ? `0 0 0 2px ${c}40` : 'none' }}/>
      ))}
    </div>
  );
};

// ── AVATAR PICKER ────────────────────────────────────────────────────────
const AvatarPicker = ({ value, onChange, name='', accent=FC.primary }) => {
  const initials = (name||'').split(' ').filter(Boolean).slice(0,2).map(n => n[0]).join('').toUpperCase() || '?';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
      {value ? (
        <img src={value} alt="" style={{ width:60, height:60, borderRadius:'50%', objectFit:'cover', border:`2px solid ${accent}` }}/>
      ) : (
        <div style={{ width:60, height:60, borderRadius:'50%', background:`${accent}25`, border:`2px solid ${accent}50`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:700, color:accent, fontFamily:'Montserrat' }}>
          {initials}
        </div>
      )}
      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
        <button style={{ background:FC.s2, border:`1px solid ${FC.border}`, color:FC.t1, padding:'6px 11px', borderRadius:5, fontSize:11, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
          <FI n="upload" s={11}/>Importer une photo
        </button>
        <span style={{ fontSize:10, color:FC.t3 }}>JPG ou PNG · Max 2 MB</span>
      </div>
    </div>
  );
};

// ── INFO BANNER ──────────────────────────────────────────────────────────
const Banner = ({ kind='info', title, children, accent=FC.primary }) => {
  const colors = { info: FC.info, warning: FC.warning, success: FC.success, danger: FC.danger, primary: accent };
  const c = colors[kind];
  const icons = { info:'bell', warning:'bell', success:'check', danger:'close', primary:'bell' };
  return (
    <div style={{ display:'flex', gap:10, padding:'10px 12px', background:`${c}10`, border:`1px solid ${c}30`, borderRadius:6 }}>
      <div style={{ width:22, height:22, borderRadius:5, background:`${c}25`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <FI n={icons[kind]} s={12} c={c}/>
      </div>
      <div style={{ flex:1, fontSize:11, lineHeight:1.5, color:FC.t1 }}>
        {title && <div style={{ fontWeight:600, marginBottom:2, color:c }}>{title}</div>}
        <div style={{ color:FC.t2 }}>{children}</div>
      </div>
    </div>
  );
};

// ── EXPORT TO WINDOW ─────────────────────────────────────────────────────
Object.assign(window, {
  FC, FI, FormDrawer, FormSection, Field, Input, Textarea, Select, Segmented,
  Toggle, Check, RadioCards, ChipsInput, Autocomplete, Dropzone, RepeatableRows,
  DateInput, MoneyInput, PercentInput, ColorSwatch, AvatarPicker, Banner
});
