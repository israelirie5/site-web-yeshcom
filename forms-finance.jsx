// ══════════════════════════════════════════════════════════════════════════
// YESHCOM OS — FORMULAIRES FINANCE
// Devis, Facture, Écriture journal
// ══════════════════════════════════════════════════════════════════════════

// ── DONNÉES MOCK ─────────────────────────────────────────────────────────
const MOCK_CLIENTS = [
  { value:'enie', label:'ENIE SA', sub:'CI-2024-001245', avatar:'E' },
  { value:'cabinet-diallo', label:'Cabinet Diallo', sub:'CI-2024-001892', avatar:'D' },
  { value:'bankplus', label:'BankPlus CI', sub:'CI-2023-009812', avatar:'B' },
  { value:'otc', label:'OTC Group', sub:'CI-2024-002211', avatar:'O' },
  { value:'kaag', label:'KAAG Digital', sub:'CI-2025-000118', avatar:'K' },
  { value:'newsylvia', label:'New Sylvia', sub:'CI-2024-006544', avatar:'N' },
];

const MOCK_SERVICES = [
  { value:'logo', label:'Logo & Identité visuelle', sub:'350 000 FCFA', price:350000 },
  { value:'site-vitrine', label:'Site web vitrine', sub:'800 000 FCFA', price:800000 },
  { value:'site-ecom', label:'Site e-commerce', sub:'1 500 000 FCFA', price:1500000 },
  { value:'app-mobile', label:'Application mobile', sub:'2 100 000 FCFA', price:2100000 },
  { value:'social-pack', label:'Pack social media (10 posts)', sub:'180 000 FCFA', price:180000 },
  { value:'video-promo', label:'Vidéo promotionnelle', sub:'450 000 FCFA', price:450000 },
  { value:'photoshoot', label:'Shooting photo studio', sub:'250 000 FCFA', price:250000 },
  { value:'consultation', label:'Consultation stratégie', sub:'80 000 FCFA / jour', price:80000 },
];

const fmtMoney = (n) => (Number(n)||0).toLocaleString('fr-FR').replace(/,/g,' ');

// ══════════════════════════════════════════════════════════════════════════
// DEVIS
// ══════════════════════════════════════════════════════════════════════════
const DevisForm = ({ open, onClose, accent=FC.primary }) => {
  const [client, setClient] = React.useState(null);
  const [ref, setRef] = React.useState('DEV-2026-013');
  const [emission, setEmission] = React.useState('2026-05-05');
  const [validity, setValidity] = React.useState(30);
  const [object, setObject] = React.useState('');
  const [lines, setLines] = React.useState([
    { service:null, label:'', qty:1, price:0, discount:0 }
  ]);
  const [tva, setTva] = React.useState(18);
  const [discount, setDiscount] = React.useState(0);
  const [acompte, setAcompte] = React.useState(50);
  const [conditions, setConditions] = React.useState('Paiement par virement bancaire. Acompte de 50% à la commande, solde à la livraison.');
  const [intro, setIntro] = React.useState('');
  const [tags, setTags] = React.useState([]);

  const subtotal = lines.reduce((s,l) => s + (Number(l.qty)||0) * (Number(l.price)||0) * (1 - (Number(l.discount)||0)/100), 0);
  const afterDiscount = subtotal * (1 - discount/100);
  const tvaAmt = afterDiscount * (tva/100);
  const total = afterDiscount + tvaAmt;
  const acompteAmt = total * (acompte/100);

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={680}
      title="Nouveau devis" subtitle="Brouillon — sera numéroté à l'enregistrement"
      headerBadge={{ icon:'invoice', label:'DEVIS' }}
      footer={`${ref} · ${fmtMoney(total)} FCFA TTC`}
      primaryLabel="Créer le devis" primaryIcon="check"
      secondaryLabel="Enregistrer brouillon" onSecondary={()=>{}}>

      <FormSection title="Client & Référence" columns={2}>
        <Field label="Client" required span={2}>
          <Autocomplete value={client} onChange={setClient} options={MOCK_CLIENTS} placeholder="Rechercher un client ou en créer un nouveau…" accent={accent} onCreate={n=>setClient(n)}/>
        </Field>
        <Field label="N° de référence" hint="Auto-généré, modifiable">
          <Input value={ref} onChange={setRef} leadingIcon="invoice" accent={accent}/>
        </Field>
        <Field label="Date d'émission" required>
          <DateInput value={emission} onChange={setEmission} accent={accent}/>
        </Field>
        <Field label="Validité" suffix="jours">
          <Segmented value={validity} onChange={setValidity} options={[
            {value:15,label:'15 j'},{value:30,label:'30 j'},{value:60,label:'60 j'},{value:90,label:'90 j'}
          ]} accent={accent}/>
        </Field>
        <Field label="Étiquettes">
          <ChipsInput value={tags} onChange={setTags} suggestions={['Urgent','Branding','Web','Vidéo','Social']} accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Objet & Introduction">
        <Field label="Objet du devis" required>
          <Input value={object} onChange={setObject} placeholder="Ex. Refonte identité visuelle + site vitrine" accent={accent}/>
        </Field>
        <Field label="Mot d'introduction" hint="Texte personnalisé en tête du devis (optionnel)">
          <Textarea value={intro} onChange={setIntro} rows={2} placeholder="Cher client, suite à notre échange du…" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Prestations" subtitle="Ajoutez les services et leurs quantités">
        <RepeatableRows rows={lines} onChange={setLines} accent={accent}
          addLabel="Ajouter une prestation"
          emptyRow={{ service:null, label:'', qty:1, price:0, discount:0 }}
          summary={`Sous-total : ${fmtMoney(subtotal)} FCFA`}
          columns={[
            { key:'service', label:'Service', span:3, type:'autocomplete', options:MOCK_SERVICES, placeholder:'Choisir…',
              render:(row, set)=> (
                <Autocomplete value={row.service} onChange={(v)=>{
                  set(v);
                  const svc = MOCK_SERVICES.find(s=>s.value===v);
                  if (svc) {
                    const idx = lines.findIndex(l=>l===row);
                    setLines(lines.map((l,i)=> i===idx ? {...l, service:v, label:svc.label, price:svc.price} : l));
                  }
                }} options={MOCK_SERVICES} placeholder="Choisir un service" accent={accent}/>
              )
            },
            { key:'qty', label:'Qté', span:1, type:'number', placeholder:'1' },
            { key:'price', label:'PU (FCFA)', span:2, type:'number', placeholder:'0' },
            { key:'discount', label:'Rem. %', span:1, type:'number', placeholder:'0' },
            { key:'total', label:'Total', span:2,
              render:(row)=> (
                <div style={{ padding:'7px 10px', background:FC.s2, borderRadius:5, fontSize:11.5, color:FC.t1, fontFamily:'JetBrains Mono', fontWeight:600, textAlign:'right' }}>
                  {fmtMoney((Number(row.qty)||0)*(Number(row.price)||0)*(1-(Number(row.discount)||0)/100))}
                </div>
              )
            },
          ]}/>
      </FormSection>

      {/* Totaux */}
      <div style={{ background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:8, padding:'14px 16px' }}>
        <div style={{ fontSize:10, fontWeight:700, color:FC.t2, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'JetBrains Mono', marginBottom:10 }}>Totaux & Conditions</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
          <Field label="Remise globale" suffix="%">
            <PercentInput value={discount} onChange={setDiscount} accent={accent}/>
          </Field>
          <Field label="TVA" suffix="%">
            <Segmented value={tva} onChange={setTva} options={[
              {value:0,label:'Exo'},{value:18,label:'18%'},{value:9,label:'9%'}
            ]} accent={accent}/>
          </Field>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:5, paddingTop:10, borderTop:`1px dashed ${FC.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:FC.t2 }}>
            <span>Sous-total</span><span style={{ fontFamily:'JetBrains Mono' }}>{fmtMoney(subtotal)} FCFA</span>
          </div>
          {discount > 0 && (
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:FC.t2 }}>
              <span>Remise ({discount}%)</span><span style={{ fontFamily:'JetBrains Mono', color:FC.danger }}>− {fmtMoney(subtotal*discount/100)}</span>
            </div>
          )}
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:FC.t2 }}>
            <span>TVA ({tva}%)</span><span style={{ fontFamily:'JetBrains Mono' }}>{fmtMoney(tvaAmt)} FCFA</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:FC.t1, fontWeight:700, paddingTop:6, marginTop:4, borderTop:`1px solid ${FC.border}` }}>
            <span>Total TTC</span><span style={{ fontFamily:'Montserrat', color:accent }}>{fmtMoney(total)} FCFA</span>
          </div>
        </div>
      </div>

      <FormSection title="Conditions de paiement" columns={2}>
        <Field label="Acompte demandé" suffix="%" span={1}>
          <Segmented value={acompte} onChange={setAcompte} options={[
            {value:0,label:'Aucun'},{value:30,label:'30%'},{value:50,label:'50%'},{value:100,label:'100%'}
          ]} accent={accent}/>
        </Field>
        <Field label="Soit" span={1}>
          <div style={{ padding:'9px 11px', background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:6, fontSize:12, fontFamily:'JetBrains Mono', color:accent, fontWeight:600 }}>
            {fmtMoney(acompteAmt)} FCFA
          </div>
        </Field>
        <Field label="Conditions générales" span={2}>
          <Textarea value={conditions} onChange={setConditions} rows={3} accent={accent}/>
        </Field>
      </FormSection>

      <Banner kind="info" accent={accent} title="Aperçu PDF disponible">
        Le devis sera généré au format PDF avec votre charte YESHCOM. Vous pourrez l'envoyer par email directement après création.
      </Banner>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// FACTURE
// ══════════════════════════════════════════════════════════════════════════
const FactureForm = ({ open, onClose, accent=FC.primary }) => {
  const [client, setClient] = React.useState(null);
  const [linkedDevis, setLinkedDevis] = React.useState(null);
  const [ref, setRef] = React.useState('FAC-2026-009');
  const [type, setType] = React.useState('acompte');
  const [emission, setEmission] = React.useState('2026-05-05');
  const [echeance, setEcheance] = React.useState('2026-06-05');
  const [project, setProject] = React.useState(null);
  const [lines, setLines] = React.useState([
    { label:'Acompte 50% — Refonte identité visuelle', qty:1, price:175000 }
  ]);
  const [tva, setTva] = React.useState(18);
  const [paymentMethod, setPaymentMethod] = React.useState('virement');
  const [bankInfo, setBankInfo] = React.useState(true);
  const [notes, setNotes] = React.useState('');

  const subtotal = lines.reduce((s,l) => s + (Number(l.qty)||0) * (Number(l.price)||0), 0);
  const tvaAmt = subtotal * (tva/100);
  const total = subtotal + tvaAmt;

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={680}
      title="Nouvelle facture" subtitle="Document comptable — la numérotation sera figée à la validation"
      headerBadge={{ icon:'invoice', label:'FACTURE' }}
      footer={`${ref} · Échéance ${echeance.split('-').reverse().join('/')} · ${fmtMoney(total)} FCFA`}
      primaryLabel="Émettre la facture" primaryIcon="send"
      secondaryLabel="Enregistrer brouillon" onSecondary={()=>{}}>

      <FormSection title="Type de facture">
        <Field>
          <RadioCards value={type} onChange={setType} columns={4} accent={accent} options={[
            { value:'acompte', label:'Acompte', icon:'down', sub:'Avance sur prestation' },
            { value:'intermediaire', label:'Intermédiaire', icon:'invoice', sub:'Étape intermédiaire' },
            { value:'solde', label:'Solde', icon:'check', sub:'Solde de prestation' },
            { value:'avoir', label:'Avoir', icon:'up', sub:'Note de crédit' },
          ]}/>
        </Field>
      </FormSection>

      <FormSection title="Client & Origine" columns={2}>
        <Field label="Client" required span={2}>
          <Autocomplete value={client} onChange={setClient} options={MOCK_CLIENTS} placeholder="Rechercher un client" accent={accent}/>
        </Field>
        <Field label="Devis lié" hint="Optionnel — pré-remplit les lignes">
          <Autocomplete value={linkedDevis} onChange={setLinkedDevis} options={[
            { value:'dev-012', label:'DEV-2026-012', sub:'ENIE SA — 1 200 000 FCFA' },
            { value:'dev-011', label:'DEV-2026-011', sub:'Cabinet Diallo — 350 000 FCFA' },
            { value:'dev-009', label:'DEV-2026-009', sub:'KAAG — 900 000 FCFA' },
          ]} placeholder="Lier à un devis…" accent={accent}/>
        </Field>
        <Field label="Projet associé">
          <Autocomplete value={project} onChange={setProject} options={[
            { value:'p1', label:'OTC — Audit Q2', sub:'En cours' },
            { value:'p2', label:'Cabinet Diallo — Identité', sub:'Brief' },
            { value:'p3', label:'New Sylvia — Réseaux mai', sub:'Production' },
          ]} placeholder="Lier à un projet…" accent={accent}/>
        </Field>
        <Field label="N° de facture" hint="Numérotation séquentielle">
          <Input value={ref} onChange={setRef} leadingIcon="invoice" accent={accent}/>
        </Field>
        <Field label="Date d'émission" required>
          <DateInput value={emission} onChange={setEmission} accent={accent}/>
        </Field>
        <Field label="Date d'échéance" required>
          <DateInput value={echeance} onChange={setEcheance} accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Lignes de facturation">
        <Field>
          <RepeatableRows rows={lines} onChange={setLines} accent={accent}
            addLabel="Ajouter une ligne"
            emptyRow={{ label:'', qty:1, price:0 }}
            summary={`Sous-total HT : ${fmtMoney(subtotal)} FCFA`}
            columns={[
              { key:'label', label:'Désignation', span:5, placeholder:'Ex. Acompte 50% — Logo & Charte' },
              { key:'qty', label:'Qté', span:1, type:'number', placeholder:'1' },
              { key:'price', label:'Prix unitaire', span:2, type:'number', placeholder:'0' },
              { key:'total', label:'Total', span:2,
                render:(row)=> (
                  <div style={{ padding:'7px 10px', background:FC.s2, borderRadius:5, fontSize:11.5, color:FC.t1, fontFamily:'JetBrains Mono', fontWeight:600, textAlign:'right' }}>
                    {fmtMoney((Number(row.qty)||0)*(Number(row.price)||0))}
                  </div>
                )
              },
            ]}/>
        </Field>
      </FormSection>

      {/* Totaux */}
      <div style={{ background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:8, padding:'14px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
          <span style={{ fontSize:10, fontWeight:700, color:FC.t2, textTransform:'uppercase', letterSpacing:'0.08em', fontFamily:'JetBrains Mono' }}>Totaux</span>
          <Segmented value={tva} onChange={setTva} options={[
            {value:0,label:'Exo TVA'},{value:18,label:'TVA 18%'},{value:9,label:'TVA 9%'}
          ]} accent={accent}/>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:FC.t2 }}>
            <span>Total HT</span><span style={{ fontFamily:'JetBrains Mono' }}>{fmtMoney(subtotal)} FCFA</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:FC.t2 }}>
            <span>TVA ({tva}%)</span><span style={{ fontFamily:'JetBrains Mono' }}>{fmtMoney(tvaAmt)} FCFA</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:15, color:FC.t1, fontWeight:700, paddingTop:8, marginTop:5, borderTop:`1px solid ${FC.border}` }}>
            <span>Total TTC</span><span style={{ fontFamily:'Montserrat', color:accent }}>{fmtMoney(total)} FCFA</span>
          </div>
        </div>
      </div>

      <FormSection title="Paiement">
        <Field label="Mode de paiement">
          <RadioCards value={paymentMethod} onChange={setPaymentMethod} columns={4} accent={accent} options={[
            { value:'virement', label:'Virement', icon:'finance' },
            { value:'wave', label:'Wave / Mobile', icon:'finance' },
            { value:'cheque', label:'Chèque', icon:'invoice' },
            { value:'especes', label:'Espèces', icon:'finance' },
          ]}/>
        </Field>
        <Field>
          <Check value={bankInfo} onChange={setBankInfo} label="Inclure les coordonnées bancaires sur la facture" accent={accent} hint="ECOBANK CI · 011 8801 — IBAN CI93..." />
        </Field>
        <Field label="Notes / Mention spéciale" hint="Visible en bas de la facture">
          <Textarea value={notes} onChange={setNotes} rows={2} placeholder="Ex. Pénalités de retard 1.5%/mois — Pas d'escompte pour paiement anticipé." accent={accent}/>
        </Field>
      </FormSection>

      <Banner kind="warning" accent={accent} title="Une fois émise, la facture est figée">
        Numérotation, montants et lignes seront verrouillés conformément à la réglementation comptable. Pour annuler, créer un avoir.
      </Banner>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// ÉCRITURE JOURNAL COMPTABLE
// ══════════════════════════════════════════════════════════════════════════
const JournalEntryForm = ({ open, onClose, accent=FC.primary }) => {
  const [date, setDate] = React.useState('2026-05-05');
  const [journal, setJournal] = React.useState('vente');
  const [piece, setPiece] = React.useState('');
  const [libelle, setLibelle] = React.useState('');
  const [lines, setLines] = React.useState([
    { compte:'411000', label:'Client — ENIE SA', debit:1416000, credit:0 },
    { compte:'706000', label:'Prestations de services', debit:0, credit:1200000 },
    { compte:'443000', label:'TVA collectée 18%', debit:0, credit:216000 },
  ]);
  const [files, setFiles] = React.useState([]);

  const totalDebit = lines.reduce((s,l) => s + (Number(l.debit)||0), 0);
  const totalCredit = lines.reduce((s,l) => s + (Number(l.credit)||0), 0);
  const balanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={760}
      title="Nouvelle écriture comptable" subtitle="Saisie manuelle — débits = crédits"
      headerBadge={{ icon:'journal', label:'ÉCRITURE' }}
      footer={`Débit ${fmtMoney(totalDebit)} · Crédit ${fmtMoney(totalCredit)} · ${balanced?'✓ Équilibrée':'⚠ Déséquilibrée'}`}
      primaryLabel={balanced ? 'Valider l\'écriture' : 'Équilibrer requis'} primaryIcon="check">

      <FormSection title="Entête" columns={3}>
        <Field label="Journal" required>
          <Select value={journal} onChange={setJournal} accent={accent} options={[
            { value:'vente', label:'Ventes', icon:'finance', sub:'JV' },
            { value:'achat', label:'Achats', icon:'finance', sub:'JA' },
            { value:'banque', label:'Banque', icon:'finance', sub:'JB' },
            { value:'caisse', label:'Caisse', icon:'finance', sub:'JC' },
            { value:'od', label:'Opérations Diverses', icon:'edit', sub:'OD' },
          ]}/>
        </Field>
        <Field label="Date d'écriture" required>
          <DateInput value={date} onChange={setDate} accent={accent}/>
        </Field>
        <Field label="N° de pièce">
          <Input value={piece} onChange={setPiece} placeholder="FAC-2026-008" leadingIcon="invoice" accent={accent}/>
        </Field>
        <Field label="Libellé général" required span={3}>
          <Input value={libelle} onChange={setLibelle} placeholder="Ex. Facture ENIE SA — Refonte site web" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Lignes d'écriture" subtitle="Plan comptable SYSCOHADA">
        <Field>
          <RepeatableRows rows={lines} onChange={setLines} accent={accent}
            addLabel="Ajouter une ligne"
            emptyRow={{ compte:'', label:'', debit:0, credit:0 }}
            summary={
              <span style={{ display:'flex', gap:14 }}>
                <span>Débit : <span style={{ color:FC.t1, fontWeight:600 }}>{fmtMoney(totalDebit)}</span></span>
                <span>Crédit : <span style={{ color:FC.t1, fontWeight:600 }}>{fmtMoney(totalCredit)}</span></span>
                <span style={{ color: balanced?FC.success:FC.danger, fontWeight:600 }}>{balanced?'✓':'≠'} {fmtMoney(Math.abs(totalDebit-totalCredit))}</span>
              </span>
            }
            columns={[
              { key:'compte', label:'Compte', span:2, placeholder:'411000' },
              { key:'label', label:'Libellé', span:4, placeholder:'Description…' },
              { key:'debit', label:'Débit', span:2, type:'number', placeholder:'0' },
              { key:'credit', label:'Crédit', span:2, type:'number', placeholder:'0' },
            ]}/>
        </Field>
      </FormSection>

      <FormSection title="Pièce justificative">
        <Field label="Justificatif" hint="Facture, ticket, relevé… Visible dans l'audit comptable">
          <Dropzone files={files} onChange={setFiles} accent={accent} hint="PDF, JPG, PNG · Max 10 MB"/>
        </Field>
      </FormSection>

      {!balanced && totalDebit + totalCredit > 0 && (
        <Banner kind="danger" accent={accent} title="Écriture déséquilibrée">
          La somme des débits ({fmtMoney(totalDebit)}) doit égaler la somme des crédits ({fmtMoney(totalCredit)}). Ajustez avant de valider.
        </Banner>
      )}
      {balanced && (
        <Banner kind="success" accent={accent} title="Écriture équilibrée">
          Prête à être validée. Une fois enregistrée, elle apparaîtra dans le grand livre et le bilan.
        </Banner>
      )}
    </FormDrawer>
  );
};

Object.assign(window, { DevisForm, FactureForm, JournalEntryForm });
