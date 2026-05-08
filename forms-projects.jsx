// ══════════════════════════════════════════════════════════════════════════
// YESHCOM OS — FORMULAIRES PROJETS & ÉQUIPE
// Projet, Tâche, Membre, Prestataire, Recrutement
// ══════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════
// PROJET
// ══════════════════════════════════════════════════════════════════════════
const ProjectForm = ({ open, onClose, accent=FC.primary }) => {
  const [name, setName] = React.useState('');
  const [code, setCode] = React.useState('YC-2026-');
  const [client, setClient] = React.useState(null);
  const [type, setType] = React.useState('branding');
  const [priority, setPriority] = React.useState('normal');
  const [start, setStart] = React.useState('2026-05-05');
  const [end, setEnd] = React.useState('2026-06-30');
  const [budget, setBudget] = React.useState('');
  const [linkedDevis, setLinkedDevis] = React.useState(null);
  const [pm, setPm] = React.useState(null);
  const [team, setTeam] = React.useState([]);
  const [phases, setPhases] = React.useState([
    { name:'Brief & Recherche', duration:5, owner:null },
    { name:'Conception', duration:10, owner:null },
    { name:'Production', duration:15, owner:null },
    { name:'Livraison & Validation', duration:5, owner:null },
  ]);
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState([]);
  const [color, setColor] = React.useState(accent);
  const [confidential, setConfidential] = React.useState(false);

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={680}
      title="Nouveau projet" subtitle="Définit le périmètre, l'équipe et le planning"
      headerBadge={{ icon:'projects', label:'PROJET' }}
      footer={name ? `${code} · ${name}` : 'Brouillon'}
      primaryLabel="Lancer le projet" primaryIcon="check">

      <FormSection title="Identité" columns={2}>
        <Field label="Nom du projet" required span={2}>
          <Input value={name} onChange={setName} placeholder="Ex. Refonte identité ENIE 2026" accent={accent}/>
        </Field>
        <Field label="Code projet" hint="Auto-suggéré">
          <Input value={code} onChange={setCode} placeholder="YC-2026-XXX" leadingIcon="folder" accent={accent}/>
        </Field>
        <Field label="Couleur">
          <ColorSwatch value={color} onChange={setColor}/>
        </Field>
        <Field label="Client" required span={2}>
          <Autocomplete value={client} onChange={setClient} options={MOCK_CLIENTS} placeholder="Choisir un client" accent={accent}/>
        </Field>
        <Field label="Description" span={2}>
          <Textarea value={description} onChange={setDescription} rows={2} placeholder="Objectifs, livrables attendus, contexte…" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Type & Priorité">
        <Field label="Type de projet">
          <RadioCards value={type} onChange={setType} columns={4} accent={accent} options={[
            { value:'branding', label:'Branding', icon:'services' },
            { value:'web', label:'Web / App', icon:'dashboard' },
            { value:'social', label:'Social Media', icon:'messages' },
            { value:'video', label:'Vidéo / Photo', icon:'eye' },
            { value:'event', label:'Événement', icon:'calendar' },
            { value:'print', label:'Print', icon:'invoice' },
            { value:'strategie', label:'Stratégie', icon:'chart' },
            { value:'autre', label:'Autre', icon:'folder' },
          ]}/>
        </Field>
        <Field label="Priorité">
          <Segmented value={priority} onChange={setPriority} accent={accent} options={[
            {value:'low',label:'Basse'},{value:'normal',label:'Normale'},{value:'high',label:'Haute'},{value:'urgent',label:'🔥 Urgent'}
          ]}/>
        </Field>
      </FormSection>

      <FormSection title="Planning & Budget" columns={2}>
        <Field label="Date de début" required>
          <DateInput value={start} onChange={setStart} accent={accent}/>
        </Field>
        <Field label="Deadline" required>
          <DateInput value={end} onChange={setEnd} min={start} accent={accent}/>
        </Field>
        <Field label="Devis lié" hint="Pré-remplit le budget">
          <Autocomplete value={linkedDevis} onChange={setLinkedDevis} options={[
            { value:'dev-012', label:'DEV-2026-012', sub:'ENIE — 1 200 000 FCFA' },
            { value:'dev-011', label:'DEV-2026-011', sub:'Cabinet Diallo — 350 000' },
          ]} placeholder="Lier à un devis…" accent={accent}/>
        </Field>
        <Field label="Budget alloué" suffix="FCFA">
          <MoneyInput value={budget} onChange={setBudget} accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Équipe">
        <Field label="Chef de projet" required>
          <Autocomplete value={pm} onChange={setPm} accent={accent} options={[
            { value:'israel', label:'Israel Irie', sub:'Co-fondateur', avatar:'I' },
            { value:'mamadou', label:'Mamadou Cissé', sub:'Co-fondateur', avatar:'M' },
            { value:'jean', label:'Jean-Paul Kouassi', sub:'Chef de projet', avatar:'J' },
          ]}/>
        </Field>
        <Field label="Équipe" hint="Membres assignés au projet">
          <ChipsInput value={team} onChange={setTeam} accent={accent}
            suggestions={['Aïcha (Designer)','Yann (Dev)','Fatou (Social)','Kouamé (Vidéaste)','Awa (Copy)']}/>
        </Field>
      </FormSection>

      <FormSection title="Phases" subtitle="Étapes du projet — modifiables ensuite">
        <Field>
          <RepeatableRows rows={phases} onChange={setPhases} accent={accent}
            addLabel="Ajouter une phase"
            emptyRow={{ name:'', duration:5, owner:null }}
            columns={[
              { key:'name', label:'Nom de la phase', span:4, placeholder:'Ex. Conception' },
              { key:'duration', label:'Durée (j)', span:1, type:'number', placeholder:'5' },
              { key:'owner', label:'Responsable', span:3, type:'autocomplete', placeholder:'…',
                options:[{value:'a',label:'Aïcha',avatar:'A'},{value:'y',label:'Yann',avatar:'Y'},{value:'j',label:'Jean-Paul',avatar:'J'}] },
            ]}/>
        </Field>
      </FormSection>

      <FormSection title="Options">
        <Field>
          <Check value={confidential} onChange={setConfidential} label="Projet confidentiel" hint="Visible uniquement par les membres assignés" accent={accent}/>
        </Field>
        <Field label="Étiquettes">
          <ChipsInput value={tags} onChange={setTags} accent={accent}
            suggestions={['Stratégique','Refonte','Test','Pro bono','International']}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// TÂCHE
// ══════════════════════════════════════════════════════════════════════════
const TaskForm = ({ open, onClose, accent=FC.primary }) => {
  const [title, setTitle] = React.useState('');
  const [project, setProject] = React.useState(null);
  const [phase, setPhase] = React.useState(null);
  const [assignee, setAssignee] = React.useState(null);
  const [reviewer, setReviewer] = React.useState(null);
  const [priority, setPriority] = React.useState('normal');
  const [status, setStatus] = React.useState('todo');
  const [due, setDue] = React.useState('');
  const [estimate, setEstimate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [checklist, setChecklist] = React.useState([
    { done:false, label:'' }
  ]);
  const [files, setFiles] = React.useState([]);
  const [tags, setTags] = React.useState([]);

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={620}
      title="Nouvelle tâche" subtitle="Action concrète à suivre dans un projet"
      headerBadge={{ icon:'check', label:'TÂCHE' }}
      primaryLabel="Créer la tâche" primaryIcon="plus">

      <FormSection columns={2}>
        <Field label="Intitulé" required span={2}>
          <Input value={title} onChange={setTitle} placeholder="Ex. Concevoir 3 propositions de logo" accent={accent}/>
        </Field>
        <Field label="Projet" required>
          <Autocomplete value={project} onChange={setProject} accent={accent} options={[
            { value:'p1', label:'OTC — Audit Q2', sub:'En cours' },
            { value:'p2', label:'Cabinet Diallo — Identité', sub:'Brief' },
            { value:'p3', label:'New Sylvia — Réseaux', sub:'Production' },
          ]}/>
        </Field>
        <Field label="Phase">
          <Select value={phase} onChange={setPhase} accent={accent} options={[
            'Brief & Recherche','Conception','Production','Validation','Livraison'
          ]}/>
        </Field>
      </FormSection>

      <FormSection title="Statut & Priorité" columns={2}>
        <Field label="Statut" span={2}>
          <Segmented value={status} onChange={setStatus} accent={accent} options={[
            {value:'todo',label:'À faire'},{value:'doing',label:'En cours'},{value:'review',label:'Révision'},{value:'done',label:'Terminé'}
          ]}/>
        </Field>
        <Field label="Priorité">
          <Segmented value={priority} onChange={setPriority} accent={accent} options={[
            {value:'low',label:'Basse'},{value:'normal',label:'Normale'},{value:'high',label:'Haute'},{value:'urgent',label:'🔥'}
          ]}/>
        </Field>
        <Field label="Estimation" suffix="heures">
          <Input type="number" value={estimate} onChange={setEstimate} placeholder="4" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Affectation" columns={2}>
        <Field label="Assigné à" required>
          <Autocomplete value={assignee} onChange={setAssignee} accent={accent} options={[
            { value:'aicha', label:'Aïcha Touré', sub:'Designer', avatar:'A' },
            { value:'yann', label:'Yann Bamba', sub:'Développeur', avatar:'Y' },
            { value:'fatou', label:'Fatou Sy', sub:'Social Media', avatar:'F' },
          ]}/>
        </Field>
        <Field label="Réviseur">
          <Autocomplete value={reviewer} onChange={setReviewer} accent={accent} options={[
            { value:'israel', label:'Israel Irie', avatar:'I' },
            { value:'jean', label:'Jean-Paul', avatar:'J' },
          ]}/>
        </Field>
        <Field label="Échéance" span={2}>
          <DateInput value={due} onChange={setDue} accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Détails">
        <Field label="Description">
          <Textarea value={description} onChange={setDescription} rows={3} placeholder="Détails, contexte, exigences…" accent={accent}/>
        </Field>
        <Field label="Checklist">
          <RepeatableRows rows={checklist} onChange={setChecklist} accent={accent}
            addLabel="Ajouter une étape"
            emptyRow={{ done:false, label:'' }}
            columns={[
              { key:'done', label:'✓', span:1, render:(row,set) => (
                <div onClick={()=>set(!row.done)} style={{ width:18, height:18, borderRadius:4, border:`1.5px solid ${row.done?accent:FC.border}`, background:row.done?accent:'transparent', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                  {row.done && <FI n="check" s={11} c="#fff" sw={3}/>}
                </div>
              )},
              { key:'label', label:'Étape', span:9, placeholder:'Ex. Recherche références' },
            ]}/>
        </Field>
        <Field label="Pièces jointes">
          <Dropzone files={files} onChange={setFiles} accent={accent} hint="Brief, références, ressources…"/>
        </Field>
        <Field label="Étiquettes">
          <ChipsInput value={tags} onChange={setTags} accent={accent} suggestions={['Bloquant','Client','Interne','Recherche','Création']}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// MEMBRE D'ÉQUIPE
// ══════════════════════════════════════════════════════════════════════════
const TeamMemberForm = ({ open, onClose, accent=FC.primary }) => {
  const [photo, setPhoto] = React.useState(null);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [role, setRole] = React.useState('staff');
  const [position, setPosition] = React.useState('');
  const [department, setDepartment] = React.useState(null);
  const [contract, setContract] = React.useState('cdi');
  const [salary, setSalary] = React.useState('');
  const [startDate, setStartDate] = React.useState('2026-05-05');
  const [skills, setSkills] = React.useState([]);
  const [permissions, setPermissions] = React.useState({
    finance:false, clients:true, projects:true, drive:true, team:false, settings:false
  });
  const [sendInvite, setSendInvite] = React.useState(true);

  const togglePerm = (k) => setPermissions(p => ({...p, [k]:!p[k]}));

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={680}
      title="Nouveau membre" subtitle="Ajout d'un collaborateur à YESHCOM"
      headerBadge={{ icon:'team', label:'MEMBRE' }}
      footer={firstName||lastName ? `${firstName} ${lastName}` : 'Brouillon'}
      primaryLabel={sendInvite ? 'Créer & envoyer invitation' : 'Créer le membre'} primaryIcon="send">

      <FormSection columns={2}>
        <Field span={2}>
          <AvatarPicker value={photo} onChange={setPhoto} name={`${firstName} ${lastName}`} accent={accent}/>
        </Field>
        <Field label="Prénom" required>
          <Input value={firstName} onChange={setFirstName} placeholder="Aïcha" accent={accent}/>
        </Field>
        <Field label="Nom" required>
          <Input value={lastName} onChange={setLastName} placeholder="Touré" accent={accent}/>
        </Field>
        <Field label="Email pro" required hint="Servira d'identifiant de connexion">
          <Input value={email} onChange={setEmail} placeholder="aicha@yeshcom.ci" leadingIcon="mail" accent={accent}/>
        </Field>
        <Field label="Téléphone">
          <Input value={phone} onChange={setPhone} placeholder="+225 …" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Poste & Contrat" columns={2}>
        <Field label="Intitulé du poste" required span={2}>
          <Input value={position} onChange={setPosition} placeholder="Ex. Lead Designer" leadingIcon="user" accent={accent}/>
        </Field>
        <Field label="Département">
          <Select value={department} onChange={setDepartment} accent={accent} options={[
            {value:'creation',label:'Création',icon:'services'},
            {value:'tech',label:'Tech & Web',icon:'dashboard'},
            {value:'social',label:'Social Media',icon:'messages'},
            {value:'production',label:'Production audio/vidéo',icon:'eye'},
            {value:'gestion',label:'Gestion / Admin',icon:'invoice'},
            {value:'commercial',label:'Commercial',icon:'finance'},
          ]}/>
        </Field>
        <Field label="Type de contrat">
          <Segmented value={contract} onChange={setContract} accent={accent} options={[
            {value:'cdi',label:'CDI'},{value:'cdd',label:'CDD'},{value:'stage',label:'Stage'},{value:'alternance',label:'Alt.'}
          ]}/>
        </Field>
        <Field label="Date d'entrée">
          <DateInput value={startDate} onChange={setStartDate} accent={accent}/>
        </Field>
        <Field label="Salaire mensuel brut" suffix="FCFA" hint="Visible par RH uniquement">
          <MoneyInput value={salary} onChange={setSalary} accent={accent}/>
        </Field>
        <Field label="Compétences" span={2}>
          <ChipsInput value={skills} onChange={setSkills} accent={accent}
            suggestions={['Figma','Illustrator','Photoshop','After Effects','Premiere','Webflow','React','Copywriting','SEO','Photo','Vidéo']}/>
        </Field>
      </FormSection>

      <FormSection title="Rôle & Permissions">
        <Field label="Rôle système" required>
          <RadioCards value={role} onChange={setRole} columns={3} accent={accent} options={[
            { value:'admin', label:'Administrateur', icon:'team', sub:'Accès gestion complet' },
            { value:'staff', label:'Staff', icon:'user', sub:'Membre interne' },
            { value:'prestataire', label:'Prestataire', icon:'upload', sub:'Externe / freelance' },
          ]}/>
        </Field>
        <Field label="Modules accessibles" hint="Affine les droits par module">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, padding:'10px 12px', background:FC.s1, border:`1px solid ${FC.border}`, borderRadius:7 }}>
            {[
              {k:'finance',l:'Finance & Comptabilité',i:'finance'},
              {k:'clients',l:'Clients & Prospects',i:'clients'},
              {k:'projects',l:'Projets & Tâches',i:'projects'},
              {k:'drive',l:'Drive & Fichiers',i:'drive'},
              {k:'team',l:'Équipe & RH',i:'team'},
              {k:'settings',l:'Paramètres',i:'settings'},
            ].map(p => (
              <label key={p.k} style={{ display:'flex', alignItems:'center', gap:8, padding:'4px 0', cursor:'pointer' }}>
                <Toggle value={permissions[p.k]} onChange={()=>togglePerm(p.k)} accent={accent}/>
                <FI n={p.i} s={13} c={permissions[p.k]?accent:FC.t3}/>
                <span style={{ fontSize:11.5, color:permissions[p.k]?FC.t1:FC.t2 }}>{p.l}</span>
              </label>
            ))}
          </div>
        </Field>
      </FormSection>

      <FormSection title="Activation">
        <Field>
          <Check value={sendInvite} onChange={setSendInvite} label="Envoyer l'invitation par email" hint="Le membre recevra un lien pour définir son mot de passe" accent={accent}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// PRESTATAIRE EXTERNE
// ══════════════════════════════════════════════════════════════════════════
const ProviderForm = ({ open, onClose, accent=FC.primary }) => {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('freelance');
  const [photo, setPhoto] = React.useState(null);
  const [specialty, setSpecialty] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [country, setCountry] = React.useState('CI');
  const [tjm, setTjm] = React.useState('');
  const [currency, setCurrency] = React.useState('FCFA');
  const [skills, setSkills] = React.useState([]);
  const [portfolio, setPortfolio] = React.useState('');
  const [rib, setRib] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [notes, setNotes] = React.useState('');
  const [files, setFiles] = React.useState([]);

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={620}
      title="Nouveau prestataire" subtitle="Freelance, agence ou expert externe"
      headerBadge={{ icon:'upload', label:'PRESTATAIRE' }}
      primaryLabel="Ajouter le prestataire" primaryIcon="check">

      <FormSection title="Type">
        <Field>
          <RadioCards value={type} onChange={setType} columns={3} accent={accent} options={[
            { value:'freelance', label:'Freelance', icon:'user', sub:'Indépendant' },
            { value:'agence', label:'Agence', icon:'projects', sub:'Studio / partenaire' },
            { value:'expert', label:'Expert ponctuel', icon:'services', sub:'Consulting, légal…' },
          ]}/>
        </Field>
      </FormSection>

      <FormSection columns={2}>
        <Field span={2}>
          <AvatarPicker value={photo} onChange={setPhoto} name={name} accent={accent}/>
        </Field>
        <Field label={type==='agence'?'Nom de l\'agence':'Nom complet'} required span={2}>
          <Input value={name} onChange={setName} placeholder={type==='agence'?'Studio Pixel':'Kouamé Diaby'} accent={accent}/>
        </Field>
        <Field label="Spécialité / Métier" required span={2}>
          <Input value={specialty} onChange={setSpecialty} placeholder="Ex. Vidéaste / Motion designer" leadingIcon="services" accent={accent}/>
        </Field>
        <Field label="Email" required>
          <Input value={email} onChange={setEmail} placeholder="contact@…" leadingIcon="mail" accent={accent}/>
        </Field>
        <Field label="Téléphone">
          <Input value={phone} onChange={setPhone} placeholder="+225 …" accent={accent}/>
        </Field>
        <Field label="Pays / Localisation">
          <Select value={country} onChange={setCountry} accent={accent} options={[
            {value:'CI',label:'🇨🇮 Côte d\'Ivoire'},
            {value:'SN',label:'🇸🇳 Sénégal'},
            {value:'FR',label:'🇫🇷 France'},
            {value:'remote',label:'🌍 100% remote'},
          ]}/>
        </Field>
        <Field label="Portfolio / Site">
          <Input value={portfolio} onChange={setPortfolio} placeholder="https://…" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Conditions" columns={2}>
        <Field label="Tarif jour (TJM)">
          <MoneyInput value={tjm} onChange={setTjm} currency={currency} accent={accent}/>
        </Field>
        <Field label="Devise">
          <Segmented value={currency} onChange={setCurrency} accent={accent} options={[
            {value:'FCFA',label:'FCFA'},{value:'EUR',label:'€'},{value:'USD',label:'$'}
          ]}/>
        </Field>
        <Field label="Compétences" span={2}>
          <ChipsInput value={skills} onChange={setSkills} accent={accent}
            suggestions={['Vidéo','Motion','Photo','Illustration','3D','Voice over','Traduction','Print','Web']}/>
        </Field>
        <Field label="Notation interne" span={2}>
          <div style={{ display:'flex', gap:4 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={()=>setRating(n)} style={{ background:'none', border:'none', cursor:'pointer', padding:2 }}>
                <span style={{ fontSize:22, color:n<=rating?accent:FC.border }}>★</span>
              </button>
            ))}
            <span style={{ fontSize:11, color:FC.t3, alignSelf:'center', marginLeft:8 }}>{rating?`${rating}/5`:'Non notée'}</span>
          </div>
        </Field>
      </FormSection>

      <FormSection title="Administratif">
        <Field label="RIB / Coordonnées de paiement">
          <Textarea value={rib} onChange={setRib} rows={2} placeholder="IBAN, Wave, PayPal, Wise…" accent={accent}/>
        </Field>
        <Field label="Documents (CNI, contrat, NDA…)">
          <Dropzone files={files} onChange={setFiles} accent={accent}/>
        </Field>
        <Field label="Notes internes">
          <Textarea value={notes} onChange={setNotes} rows={2} placeholder="Disponibilités, points forts, retours d'expérience…" accent={accent}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// RECRUTEMENT (offre d'emploi)
// ══════════════════════════════════════════════════════════════════════════
const RecruitmentForm = ({ open, onClose, accent=FC.primary }) => {
  const [title, setTitle] = React.useState('');
  const [department, setDepartment] = React.useState(null);
  const [contract, setContract] = React.useState('cdi');
  const [seniority, setSeniority] = React.useState('confirme');
  const [location, setLocation] = React.useState('hybride');
  const [salaryMin, setSalaryMin] = React.useState('');
  const [salaryMax, setSalaryMax] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [skills, setSkills] = React.useState([]);
  const [deadline, setDeadline] = React.useState('');
  const [openings, setOpenings] = React.useState(1);
  const [publish, setPublish] = React.useState({ site:true, linkedin:true, instagram:false });

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={640}
      title="Nouvelle offre d'emploi" subtitle="Création d'un poste ouvert au recrutement"
      headerBadge={{ icon:'plus', label:'RECRUTEMENT' }}
      primaryLabel="Publier l'offre" primaryIcon="send"
      secondaryLabel="Brouillon" onSecondary={()=>{}}>

      <FormSection title="Le poste" columns={2}>
        <Field label="Intitulé du poste" required span={2}>
          <Input value={title} onChange={setTitle} placeholder="Ex. Designer UI/UX confirmé(e)" leadingIcon="user" accent={accent}/>
        </Field>
        <Field label="Département">
          <Select value={department} onChange={setDepartment} accent={accent} options={[
            {value:'creation',label:'Création'},
            {value:'tech',label:'Tech & Web'},
            {value:'social',label:'Social Media'},
            {value:'production',label:'Production'},
            {value:'commercial',label:'Commercial'},
          ]}/>
        </Field>
        <Field label="Postes à pourvoir" suffix="postes">
          <Input type="number" value={openings} onChange={setOpenings} placeholder="1" accent={accent}/>
        </Field>
        <Field label="Type de contrat">
          <Segmented value={contract} onChange={setContract} accent={accent} options={[
            {value:'cdi',label:'CDI'},{value:'cdd',label:'CDD'},{value:'stage',label:'Stage'},{value:'freelance',label:'Freelance'}
          ]}/>
        </Field>
        <Field label="Séniorité">
          <Segmented value={seniority} onChange={setSeniority} accent={accent} options={[
            {value:'junior',label:'Junior'},{value:'confirme',label:'Confirmé'},{value:'senior',label:'Senior'},{value:'lead',label:'Lead'}
          ]}/>
        </Field>
        <Field label="Localisation" span={2}>
          <RadioCards value={location} onChange={setLocation} columns={3} accent={accent} options={[
            { value:'presentiel', label:'Présentiel', icon:'projects', sub:'Bureau Cocody' },
            { value:'hybride', label:'Hybride', icon:'team', sub:'2-3 j / semaine' },
            { value:'remote', label:'100% remote', icon:'drive', sub:'Travail à distance' },
          ]}/>
        </Field>
      </FormSection>

      <FormSection title="Rémunération & Délai" columns={2}>
        <Field label="Salaire minimum" suffix="FCFA">
          <MoneyInput value={salaryMin} onChange={setSalaryMin} accent={accent}/>
        </Field>
        <Field label="Salaire maximum" suffix="FCFA">
          <MoneyInput value={salaryMax} onChange={setSalaryMax} accent={accent}/>
        </Field>
        <Field label="Date limite de candidature" span={2}>
          <DateInput value={deadline} onChange={setDeadline} accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Annonce">
        <Field label="Description du poste" required hint="Missions, environnement, équipe">
          <Textarea value={description} onChange={setDescription} rows={5} placeholder="Décrivez les missions, l'environnement, l'équipe et la culture YESHCOM…" accent={accent}/>
        </Field>
        <Field label="Compétences requises">
          <ChipsInput value={skills} onChange={setSkills} accent={accent}
            suggestions={['Figma','Adobe Suite','3+ ans expérience','Anglais courant','Portfolio fort','Esprit d\'équipe']}/>
        </Field>
      </FormSection>

      <FormSection title="Diffusion">
        <Field>
          <Check value={publish.site} onChange={v=>setPublish({...publish,site:v})} label="Site carrière YESHCOM" accent={accent}/>
          <Check value={publish.linkedin} onChange={v=>setPublish({...publish,linkedin:v})} label="LinkedIn" accent={accent}/>
          <Check value={publish.instagram} onChange={v=>setPublish({...publish,instagram:v})} label="Instagram (story + post)" accent={accent}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

Object.assign(window, { ProjectForm, TaskForm, TeamMemberForm, ProviderForm, RecruitmentForm });
