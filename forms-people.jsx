// ══════════════════════════════════════════════════════════════════════════
// YESHCOM FORMS — CRM, ÉQUIPE, PRESTATAIRES, RECRUTEMENT
// ══════════════════════════════════════════════════════════════════════════

const SECTEURS = ['Banque','Assurance','Télécom','Énergie','Industrie','Public','BTP','Distribution','Hôtellerie','Santé','ONG','Autre'];
const VILLES_CI = ['Abidjan','Yamoussoukro','Bouaké','Korhogo','San-Pedro','Daloa','Man','Gagnoa'];

// ── CLIENT FORM ─────────────────────────────────────────────────────────
const ClientForm = ({ open, onClose }) => {
  const [step, setStep] = React.useState(0);
  const [type, setType] = React.useState('entreprise');
  const [secteur, setSecteur] = React.useState('Banque');
  return (
    <FormDrawer open={open} onClose={onClose} title="Nouveau client" subtitle="Création fiche · CL-2026-094" icon="clients"
      width={680} steps={['Type','Identité','Contacts','Commercial']} currentStep={step} onStepClick={setStep} savedAt="il y a 8s"
      footer={<>{step>0 && <Btn variant="ghost" icon="arrow_l" onClick={()=>setStep(step-1)}>Précédent</Btn>}<div style={{flex:1}}/><Btn variant="secondary" icon="save">Brouillon</Btn>{step<3?<Btn variant="primary" iconRight="arrow_r" onClick={()=>setStep(step+1)}>Suivant</Btn>:<Btn variant="primary" icon="check">Créer le client</Btn>}</>}>
      {step===0 && (
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          <Section title="Type de client">
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[{v:'entreprise',l:'Entreprise',i:'projects',d:'Société, marque, organisme'},{v:'particulier',l:'Particulier',i:'user',d:'Personne physique, indépendant'}].map(t=>{
                const on=type===t.v;
                return <button key={t.v} type="button" onClick={()=>setType(t.v)} style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:9,border:`1.5px solid ${on?FC.primary:FC.border}`,background:on?FC.primaryDim:FC.field,cursor:'pointer',textAlign:'left',transition:'all 0.15s'}}>
                  <div style={{width:38,height:38,borderRadius:8,background:`${FC.primary}20`,display:'flex',alignItems:'center',justifyContent:'center'}}><FI n={t.i} s={18} c={FC.primary}/></div>
                  <div><div style={{fontSize:14,fontWeight:600,color:on?FC.primary:FC.t1}}>{t.l}</div><div style={{fontSize:11,color:FC.t3,marginTop:2}}>{t.d}</div></div>
                </button>;
              })}
            </div>
          </Section>
          <Section title="Statut commercial">
            <ChipGroup value="actif" onChange={()=>{}} options={[{value:'prospect',label:'Prospect'},{value:'actif',label:'Client actif'},{value:'vip',label:'VIP / Stratégique'},{value:'dormant',label:'Dormant'}]}/>
          </Section>
          <Section title="Source d'acquisition">
            <ChipGroup value="reco" onChange={()=>{}} options={['Recommandation','Site web','LinkedIn','Salon','Cold outreach','Réseau','Autre']}/>
          </Section>
        </div>
      )}
      {step===1 && (
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          <Section title="Identité">
            <Field label="Logo / Photo" hint="Optionnel">
              <Dropzone files={[]} onChange={()=>{}} multiple={false} accept="image/*" hint="PNG, JPG · carré · 2 MB"/>
            </Field>
            <div style={{marginTop:14}}>
              <Grid cols={2} gap={14}>
                <Field label={type==='entreprise'?'Raison sociale':'Nom complet'} required span={2}><Input placeholder={type==='entreprise'?'ex : NSIA Assurances SA':'ex : Diallo Mariam'} icon="user"/></Field>
                {type==='entreprise' && <><Field label="Forme juridique"><Select value="" onChange={()=>{}} options={['SA','SARL','SAS','EI','GIE','ONG','Public']}/></Field>
                <Field label="RCCM / SIRET"><Input placeholder="CI-ABJ-2024-B-12345" icon="tag"/></Field>
                <Field label="Secteur" required><Select value={secteur} onChange={e=>setSecteur(e.target.value)} options={SECTEURS}/></Field>
                <Field label="Effectif"><Select value="" onChange={()=>{}} options={['1-10','11-50','51-200','201-500','500+']}/></Field></>}
              </Grid>
            </div>
          </Section>
          <Section title="Adresse">
            <Grid cols={2} gap={14}>
              <Field label="Adresse" span={2}><Input placeholder="Plateau, Bd Lagunaire, Imm. Alpha 2000" icon="map"/></Field>
              <Field label="Ville" required><Select value="Abidjan" onChange={()=>{}} options={VILLES_CI}/></Field>
              <Field label="Quartier"><Input placeholder="Plateau"/></Field>
            </Grid>
          </Section>
        </div>
      )}
      {step===2 && (
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          <Section title="Contact principal">
            <Grid cols={2} gap={14}>
              <Field label="Nom" required><Input placeholder="Konan" icon="user"/></Field>
              <Field label="Prénom" required><Input placeholder="Yves"/></Field>
              <Field label="Fonction" span={2}><Input placeholder="Directeur Marketing & Communication"/></Field>
              <Field label="Email pro" required><Input type="email" placeholder="y.konan@nsia.ci" icon="mail"/></Field>
              <Field label="Téléphone" required><Input placeholder="+225 07 12 34 56 78" icon="phone"/></Field>
            </Grid>
          </Section>
          <Section title="Contacts secondaires" sub="Décideurs additionnels, comptabilité…">
            <button type="button" style={{display:'flex',alignItems:'center',gap:7,background:'transparent',border:`1px dashed ${FC.border}`,color:FC.primary,padding:'10px 14px',borderRadius:7,cursor:'pointer',fontSize:12,fontWeight:600,width:'100%',justifyContent:'center'}}><FI n="plus" s={13}/>Ajouter un contact</button>
          </Section>
          <Section title="Réseaux">
            <Grid cols={2} gap={14}>
              <Field label="Site web"><Input placeholder="https://nsia.ci" icon="link"/></Field>
              <Field label="LinkedIn"><Input placeholder="company/nsia-assurances" icon="link"/></Field>
            </Grid>
          </Section>
        </div>
      )}
      {step===3 && (
        <div style={{display:'flex',flexDirection:'column',gap:20}}>
          <Section title="Suivi commercial">
            <Grid cols={2} gap={14}>
              <Field label="Commercial responsable" required><Autocomplete value={{label:'Israel Irie',sub:'Founder',avatar:'II'}} onChange={()=>{}} options={[{label:'Israel Irie',avatar:'II',sub:'Founder'},{label:'Aïsha Koné',avatar:'AK',sub:'Account'}]}/></Field>
              <Field label="Pipeline stage"><Select value="discovery" onChange={()=>{}} options={[{value:'discovery',label:'Discovery'},{value:'qualified',label:'Qualifié'},{value:'proposal',label:'Proposition'},{value:'negotiation',label:'Négociation'},{value:'won',label:'Gagné'}]}/></Field>
              <Field label="Budget annuel estimé"><Input type="number" placeholder="0" suffix="FCFA" icon="money"/></Field>
              <Field label="Probabilité"><Input type="number" placeholder="50" suffix="%" icon="percent"/></Field>
            </Grid>
          </Section>
          <Section title="Tags & notes">
            <Field label="Tags"><ChipGroup value={['fidèle']} onChange={()=>{}} multi options={['Fidèle','Stratégique','À risque','Prix sensible','Innovation','Premium']}/></Field>
            <div style={{marginTop:14}}><Field label="Notes internes"><Textarea placeholder="Préférences, historique, contexte…" rows={3} maxLength={500}/></Field></div>
          </Section>
          <Toggle value={true} onChange={()=>{}} label="Activer l'accès portail client" sub="Le client recevra un lien pour suivre ses projets"/>
        </div>
      )}
    </FormDrawer>
  );
};

// ── PROSPECT (form simple, 1 étape) ────────────────────────────────────
const ProspectForm = ({ open, onClose }) => (
  <FormDrawer open={open} onClose={onClose} title="Nouveau prospect" subtitle="Capture rapide" icon="prospect" width={520} savedAt="auto-save"
    footer={<><Btn variant="ghost" onClick={onClose}>Annuler</Btn><div style={{flex:1}}/><Btn variant="secondary">+ Ajouter & nouveau</Btn><Btn variant="primary" icon="check">Créer le prospect</Btn></>}>
    <div style={{display:'flex',flexDirection:'column',gap:18}}>
      <Section title="Identification">
        <Grid cols={2} gap={14}>
          <Field label="Société / Nom" required span={2}><Input placeholder="ex : Carrena Group" icon="user"/></Field>
          <Field label="Contact" required><Input placeholder="Prénom Nom" icon="user"/></Field>
          <Field label="Fonction"><Input placeholder="Resp. Communication"/></Field>
          <Field label="Email" required><Input type="email" placeholder="contact@…" icon="mail"/></Field>
          <Field label="Téléphone"><Input placeholder="+225…" icon="phone"/></Field>
        </Grid>
      </Section>
      <Section title="Qualification">
        <Field label="Source"><ChipGroup value="linkedin" onChange={()=>{}} options={['LinkedIn','Site','Reco','Salon','Email entrant','Cold call']}/></Field>
        <div style={{marginTop:14}}><Field label="Intérêt exprimé" hint="Ce qu'ils cherchent"><Textarea placeholder="ex : refonte identité visuelle + production vidéo Q3" rows={2}/></Field></div>
        <div style={{marginTop:14}}><Grid cols={2} gap={14}>
          <Field label="Budget estimé"><Select value="" onChange={()=>{}} options={['<500K','500K-2M','2-5M','5-15M','15M+']}/></Field>
          <Field label="Échéance"><Select value="" onChange={()=>{}} options={['Immédiat','<1 mois','1-3 mois','3-6 mois','6 mois+']}/></Field>
        </Grid></div>
      </Section>
      <Section title="Suivi">
        <Field label="Prochaine action"><Grid cols={2} gap={14}>
          <Select value="rdv" onChange={()=>{}} options={[{value:'rdv',label:'Prendre RDV'},{value:'devis',label:'Envoyer devis'},{value:'relance',label:'Relancer'},{value:'qualifier',label:'Qualifier davantage'}]}/>
          <Input type="date" value="2026-05-12" onChange={()=>{}} icon="calendar"/>
        </Grid></Field>
      </Section>
    </div>
  </FormDrawer>
);

// ── MEMBRE ÉQUIPE ───────────────────────────────────────────────────────
const MembreForm = ({ open, onClose }) => (
  <FormDrawer open={open} onClose={onClose} title="Ajouter un membre" subtitle="Équipe interne" icon="team" width={620}
    footer={<><Btn variant="ghost" onClick={onClose}>Annuler</Btn><div style={{flex:1}}/><Btn variant="primary" icon="send">Inviter & créer</Btn></>}>
    <div style={{display:'flex',flexDirection:'column',gap:20}}>
      <Section title="Photo & identité">
        <div style={{display:'flex',gap:14,alignItems:'flex-start'}}>
          <div style={{width:88,height:88,borderRadius:'50%',background:`${FC.primary}20`,border:`2px dashed ${FC.border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.borderColor=FC.primary} onMouseLeave={e=>e.currentTarget.style.borderColor=FC.border}>
            <FI n="upload" s={22} c={FC.primary}/>
          </div>
          <div style={{flex:1}}><Grid cols={2} gap={12}>
            <Field label="Prénom" required><Input placeholder="Aïsha"/></Field>
            <Field label="Nom" required><Input placeholder="Koné"/></Field>
            <Field label="Email pro" required span={2}><Input type="email" placeholder="aisha@yeshcom.ci" icon="mail"/></Field>
          </Grid></div>
        </div>
      </Section>
      <Section title="Rôle & accès">
        <Field label="Rôle dans l'OS" required>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            {[{v:'admin',l:'Admin',i:'📋',d:'Gestion complète'},{v:'staff',l:'Staff',i:'🎨',d:'Création & livrables'},{v:'commercial',l:'Commercial',i:'💼',d:'Pipeline & devis'},{v:'observer',l:'Observateur',i:'👁',d:'Lecture seule'}].map(r=>(
              <button key={r.v} type="button" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:7,border:`1px solid ${r.v==='staff'?FC.primary:FC.border}`,background:r.v==='staff'?FC.primaryDim:FC.field,cursor:'pointer',textAlign:'left'}}>
                <span style={{fontSize:18}}>{r.i}</span>
                <div><div style={{fontSize:12,fontWeight:600,color:FC.t1}}>{r.l}</div><div style={{fontSize:10,color:FC.t3}}>{r.d}</div></div>
              </button>
            ))}
          </div>
        </Field>
        <div style={{marginTop:14}}><Field label="Poste / titre"><Input placeholder="Account Manager Senior"/></Field></div>
        <div style={{marginTop:14}}><Field label="Département"><ChipGroup value="creation" onChange={()=>{}} options={['Direction','Création','Production','Commercial','Admin','Tech']}/></Field></div>
      </Section>
      <Section title="Modules accessibles">
        <div style={{display:'flex',flexDirection:'column',gap:6}}>
          {['Dashboard','Finance','CRM Clients','Projets','Équipe','Stock','Drive','Messagerie'].map(m=>(
            <Toggle key={m} value={['Dashboard','Projets','Drive','Messagerie'].includes(m)} onChange={()=>{}} label={m} sub={`Module : ${m.toLowerCase()}`}/>
          ))}
        </div>
      </Section>
      <Toggle value={true} onChange={()=>{}} label="Envoyer l'email d'invitation maintenant" sub="Avec lien d'activation valable 48h"/>
    </div>
  </FormDrawer>
);

// ── PRESTATAIRE ─────────────────────────────────────────────────────────
const PrestataireForm = ({ open, onClose }) => {
  const [step,setStep] = React.useState(0);
  return (
    <FormDrawer open={open} onClose={onClose} title="Nouveau prestataire" subtitle="Freelance / Agence partenaire" icon="services" width={680}
      steps={['Profil','Compétences','Tarifs','Documents']} currentStep={step} onStepClick={setStep} savedAt="il y a 18s"
      footer={<>{step>0 && <Btn variant="ghost" icon="arrow_l" onClick={()=>setStep(step-1)}>Précédent</Btn>}<div style={{flex:1}}/>{step<3?<Btn variant="primary" iconRight="arrow_r" onClick={()=>setStep(step+1)}>Suivant</Btn>:<Btn variant="primary" icon="check">Créer la fiche</Btn>}</>}>
      {step===0 && <div style={{display:'flex',flexDirection:'column',gap:20}}>
        <Section title="Type">
          <ChipGroup value="freelance" onChange={()=>{}} options={[{value:'freelance',label:'Freelance',icon:'user'},{value:'agence',label:'Agence',icon:'projects'},{value:'studio',label:'Studio',icon:'image'}]}/>
        </Section>
        <Section title="Identité">
          <Grid cols={2} gap={14}>
            <Field label="Nom complet / Raison sociale" required span={2}><Input placeholder="ex : Karim Bamba — DOP" icon="user"/></Field>
            <Field label="Email" required><Input type="email" icon="mail"/></Field>
            <Field label="Téléphone" required><Input icon="phone"/></Field>
            <Field label="Ville"><Select value="Abidjan" onChange={()=>{}} options={VILLES_CI}/></Field>
            <Field label="Disponibilité"><Select value="full" onChange={()=>{}} options={[{value:'full',label:'Plein temps'},{value:'part',label:'Mi-temps'},{value:'projet',label:'Au projet'}]}/></Field>
          </Grid>
        </Section>
      </div>}
      {step===1 && <div style={{display:'flex',flexDirection:'column',gap:20}}>
        <Section title="Spécialité principale">
          <ChipGroup value="video" onChange={()=>{}} options={[{value:'video',label:'Vidéo / DOP'},{value:'photo',label:'Photo'},{value:'design',label:'Design / DA'},{value:'son',label:'Son'},{value:'rédac',label:'Rédaction'},{value:'web',label:'Dev web'},{value:'social',label:'Social media'},{value:'régie',label:'Régie'}]}/>
        </Section>
        <Section title="Compétences détaillées">
          <Field label="Tags" hint="Tape pour ajouter">
            <ChipGroup value={['Cinéma','Drone','Aerial','Color grading']} multi onChange={()=>{}} options={['Cinéma','Drone','Aerial','Color grading','Studio','Reportage','Portrait','Documentaire','Motion','3D']}/>
          </Field>
          <div style={{marginTop:14}}><Field label="Bio / Présentation"><Textarea placeholder="Parcours, projets phares, style…" rows={4} maxLength={500}/></Field></div>
        </Section>
        <Section title="Portfolio">
          <Grid cols={2} gap={14}>
            <Field label="Site / Behance"><Input placeholder="https://…" icon="link"/></Field>
            <Field label="Showreel"><Input placeholder="Vimeo / YouTube" icon="link"/></Field>
          </Grid>
        </Section>
      </div>}
      {step===2 && <div style={{display:'flex',flexDirection:'column',gap:20}}>
        <Section title="Tarification">
          <Grid cols={2} gap={14}>
            <Field label="TJM" required><Input type="number" placeholder="250000" suffix="F/jour" icon="money"/></Field>
            <Field label="Taux horaire"><Input type="number" placeholder="35000" suffix="F/h"/></Field>
            <Field label="Forfait demi-journée"><Input type="number" placeholder="150000" suffix="F"/></Field>
            <Field label="Mode de facturation"><Select value="month" onChange={()=>{}} options={[{value:'mission',label:'À la mission'},{value:'month',label:'Mensuel'},{value:'project',label:'Au projet'}]}/></Field>
          </Grid>
        </Section>
        <Section title="Coordonnées bancaires">
          <Grid cols={2} gap={14}>
            <Field label="Mode préféré" span={2}><ChipGroup value="mobile" onChange={()=>{}} options={[{value:'virement',label:'Virement'},{value:'mobile',label:'Mobile Money'},{value:'cheque',label:'Chèque'}]}/></Field>
            <Field label="Banque / Opérateur"><Input placeholder="Wave / Orange Money / BICICI"/></Field>
            <Field label="Numéro de compte"><Input placeholder="••••••••"/></Field>
          </Grid>
        </Section>
      </div>}
      {step===3 && <div style={{display:'flex',flexDirection:'column',gap:20}}>
        <Section title="Documents légaux" sub="Conformité fiscale et juridique">
          <Field label="CV / Profil société"><Dropzone files={[{name:'cv-karim-bamba-2026.pdf',size:'2.4 MB',type:'application/pdf'}]} onChange={()=>{}}/></Field>
          <div style={{marginTop:14}}><Field label="Pièce d'identité / RCCM"><Dropzone files={[]} onChange={()=>{}} hint="CNI ou passeport · 5 MB"/></Field></div>
          <div style={{marginTop:14}}><Field label="RIB / Attestation Mobile Money"><Dropzone files={[]} onChange={()=>{}}/></Field></div>
          <div style={{marginTop:14}}><Field label="NDA signé" hint="Confidentialité"><Dropzone files={[]} onChange={()=>{}}/></Field></div>
        </Section>
        <Toggle value={true} onChange={()=>{}} label="Activer l'accès portail prestataire" sub="Le prestataire pourra voir ses missions et déposer ses livrables"/>
      </div>}
    </FormDrawer>
  );
};

// ── RECRUTEMENT (offre + candidature combiné) ───────────────────────────
const RecrutementForm = ({ open, onClose }) => {
  const [mode, setMode] = React.useState('offre');
  return (
    <FormDrawer open={open} onClose={onClose} title="Recrutement" subtitle={mode==='offre'?'Nouvelle offre':'Nouvelle candidature'} icon="user" width={640}
      footer={<><Btn variant="ghost" onClick={onClose}>Annuler</Btn><div style={{flex:1}}/><Btn variant="secondary" icon="save">Brouillon</Btn><Btn variant="primary" icon="check">{mode==='offre'?'Publier l\'offre':'Enregistrer'}</Btn></>}>
      <div style={{display:'flex',flexDirection:'column',gap:20}}>
        <Section title="Que créer ?">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[{v:'offre',l:'Offre d\'emploi',i:'invoice',d:'Publier un poste à pourvoir'},{v:'cand',l:'Candidature',i:'user',d:'Ajouter un candidat reçu'}].map(t=>{
              const on=mode===t.v;
              return <button key={t.v} type="button" onClick={()=>setMode(t.v)} style={{display:'flex',alignItems:'center',gap:12,padding:'14px',borderRadius:9,border:`1.5px solid ${on?FC.primary:FC.border}`,background:on?FC.primaryDim:FC.field,cursor:'pointer',textAlign:'left'}}>
                <FI n={t.i} s={18} c={on?FC.primary:FC.t2}/>
                <div><div style={{fontSize:13,fontWeight:600,color:on?FC.primary:FC.t1}}>{t.l}</div><div style={{fontSize:10,color:FC.t3,marginTop:2}}>{t.d}</div></div>
              </button>;
            })}
          </div>
        </Section>
        {mode==='offre' ? (
          <>
            <Section title="Poste">
              <Grid cols={2} gap={14}>
                <Field label="Intitulé" required span={2}><Input placeholder="ex : Account Manager Senior" icon="user"/></Field>
                <Field label="Type contrat"><ChipGroup value="cdi" onChange={()=>{}} options={['CDI','CDD','Stage','Alternance','Freelance']}/></Field>
                <Field label="Mode"><ChipGroup value="hybrid" onChange={()=>{}} options={['Présentiel','Hybride','Remote']}/></Field>
                <Field label="Salaire min" hint="Optionnel public"><Input type="number" suffix="F"/></Field>
                <Field label="Salaire max"><Input type="number" suffix="F"/></Field>
              </Grid>
            </Section>
            <Section title="Description">
              <Field label="Mission"><Textarea placeholder="Décris la mission, contexte, équipe…" rows={4} maxLength={1500}/></Field>
              <div style={{marginTop:14}}><Field label="Profil recherché"><Textarea placeholder="Compétences, expérience, soft skills…" rows={3} maxLength={1000}/></Field></div>
            </Section>
            <Section title="Diffusion">
              <Field label="Canaux"><ChipGroup value={['site','linkedin']} multi onChange={()=>{}} options={['Site Yeshcom','LinkedIn','Indeed','EmploisCI','Réseau interne']}/></Field>
              <div style={{marginTop:14}}><Field label="Date limite candidature"><Input type="date" icon="calendar"/></Field></div>
            </Section>
          </>
        ) : (
          <>
            <Section title="Candidat">
              <Grid cols={2} gap={14}>
                <Field label="Prénom" required><Input icon="user"/></Field>
                <Field label="Nom" required><Input/></Field>
                <Field label="Email" required><Input type="email" icon="mail"/></Field>
                <Field label="Téléphone"><Input icon="phone"/></Field>
                <Field label="Poste visé" required span={2}><Autocomplete value={null} onChange={()=>{}} options={[{label:'Account Manager Senior',sub:'OFF-2026-007 · 4 candidats'},{label:'Motion Designer',sub:'OFF-2026-005 · 12 candidats'}]} placeholder="Lier à une offre…"/></Field>
              </Grid>
            </Section>
            <Section title="Documents">
              <Field label="CV" required><Dropzone files={[]} onChange={()=>{}} hint="PDF · 5 MB"/></Field>
              <div style={{marginTop:14}}><Field label="Lettre de motivation"><Dropzone files={[]} onChange={()=>{}}/></Field></div>
            </Section>
            <Section title="Évaluation initiale">
              <Field label="Statut"><ChipGroup value="new" onChange={()=>{}} options={[{value:'new',label:'Nouveau'},{value:'review',label:'À évaluer'},{value:'inter',label:'Entretien'},{value:'offer',label:'Offre'},{value:'reject',label:'Refusé'}]}/></Field>
              <div style={{marginTop:14}}><Field label="Notes"><Textarea placeholder="Première impression, points forts, doutes…" rows={3}/></Field></div>
            </Section>
          </>
        )}
      </div>
    </FormDrawer>
  );
};

Object.assign(window, { ClientForm, ProspectForm, MembreForm, PrestataireForm, RecrutementForm });
