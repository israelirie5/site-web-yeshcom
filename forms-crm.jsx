// ══════════════════════════════════════════════════════════════════════════
// YESHCOM OS — FORMULAIRES CRM
// Client, Prospect, Contact
// ══════════════════════════════════════════════════════════════════════════

const SECTORS = [
  { value:'finance', label:'Finance & Banque', icon:'finance' },
  { value:'tech', label:'Tech & Digital', icon:'dashboard' },
  { value:'mode', label:'Mode & Beauté', icon:'services' },
  { value:'food', label:'Restauration & Food', icon:'services' },
  { value:'sante', label:'Santé & Pharma', icon:'services' },
  { value:'industrie', label:'Industrie & BTP', icon:'projects' },
  { value:'service', label:'Services aux entreprises', icon:'team' },
  { value:'public', label:'Secteur public / ONG', icon:'team' },
  { value:'media', label:'Média & Édition', icon:'templates' },
  { value:'autre', label:'Autre', icon:'folder' },
];

// ══════════════════════════════════════════════════════════════════════════
// CLIENT (entreprise cliente)
// ══════════════════════════════════════════════════════════════════════════
const ClientForm = ({ open, onClose, accent=FC.primary }) => {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('entreprise');
  const [logo, setLogo] = React.useState(null);
  const [sector, setSector] = React.useState(null);
  const [size, setSize] = React.useState('pme');
  const [country, setCountry] = React.useState('CI');
  const [city, setCity] = React.useState('Abidjan');
  const [address, setAddress] = React.useState('');
  const [rccm, setRccm] = React.useState('');
  const [ncc, setNcc] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [contacts, setContacts] = React.useState([
    { name:'', role:'', email:'', phone:'' }
  ]);
  const [accountManager, setAccountManager] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [paymentTerms, setPaymentTerms] = React.useState(30);
  const [creditLimit, setCreditLimit] = React.useState(0);
  const [color, setColor] = React.useState(accent);

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={680}
      title="Nouveau client" subtitle="Création d'une fiche client — accessible à toute l'équipe"
      headerBadge={{ icon:'clients', label:'CLIENT' }}
      footer={name ? `Fiche : ${name}` : 'Brouillon'}
      primaryLabel="Créer le client" primaryIcon="check">

      <FormSection title="Type" >
        <Field>
          <RadioCards value={type} onChange={setType} columns={3} accent={accent} options={[
            { value:'entreprise', label:'Entreprise', icon:'projects', sub:'Société, SARL, SA…' },
            { value:'particulier', label:'Particulier', icon:'user', sub:'Personne physique' },
            { value:'institution', label:'Institution', icon:'team', sub:'État, ONG, Ambassade' },
          ]}/>
        </Field>
      </FormSection>

      <FormSection title="Identité" columns={2}>
        <Field span={2}>
          <AvatarPicker value={logo} onChange={setLogo} name={name} accent={accent}/>
        </Field>
        <Field label={type==='particulier'?'Nom complet':'Raison sociale'} required span={2}>
          <Input value={name} onChange={setName} placeholder={type==='particulier'?'Ex. Marie Konan':'Ex. ENIE SA'} accent={accent}/>
        </Field>
        <Field label="Secteur d'activité">
          <Select value={sector} onChange={setSector} options={SECTORS} placeholder="Choisir un secteur" accent={accent}/>
        </Field>
        <Field label="Taille" hint="Estimation effectifs">
          <Segmented value={size} onChange={setSize} accent={accent} options={[
            {value:'tpe',label:'TPE'},{value:'pme',label:'PME'},{value:'eti',label:'ETI'},{value:'ge',label:'GE'}
          ]}/>
        </Field>
        <Field label="RCCM / SIREN" hint="Optionnel">
          <Input value={rccm} onChange={setRccm} placeholder="CI-ABJ-2024-B-12345" accent={accent}/>
        </Field>
        <Field label="N° CC (Compte Contribuable)">
          <Input value={ncc} onChange={setNcc} placeholder="0125487 K" accent={accent}/>
        </Field>
        <Field label="Couleur d'identification" hint="Pour reconnaître le client en un coup d'œil" span={2}>
          <ColorSwatch value={color} onChange={setColor}/>
        </Field>
      </FormSection>

      <FormSection title="Adresse & Coordonnées" columns={2}>
        <Field label="Pays" required>
          <Select value={country} onChange={setCountry} accent={accent} options={[
            {value:'CI',label:'🇨🇮 Côte d\'Ivoire'},
            {value:'SN',label:'🇸🇳 Sénégal'},
            {value:'BF',label:'🇧🇫 Burkina Faso'},
            {value:'ML',label:'🇲🇱 Mali'},
            {value:'TG',label:'🇹🇬 Togo'},
            {value:'BJ',label:'🇧🇯 Bénin'},
            {value:'FR',label:'🇫🇷 France'},
            {value:'autre',label:'Autre'},
          ]}/>
        </Field>
        <Field label="Ville">
          <Input value={city} onChange={setCity} placeholder="Abidjan" accent={accent}/>
        </Field>
        <Field label="Adresse complète" span={2}>
          <Textarea value={address} onChange={setAddress} rows={2} placeholder="Cocody Riviera Golf, lot 12 — Immeuble Ivoire" accent={accent}/>
        </Field>
        <Field label="Email" required>
          <Input value={email} onChange={setEmail} placeholder="contact@enie.ci" leadingIcon="mail" accent={accent}/>
        </Field>
        <Field label="Téléphone">
          <Input value={phone} onChange={setPhone} placeholder="+225 07 12 34 56 78" accent={accent}/>
        </Field>
        <Field label="Site web" span={2}>
          <Input value={website} onChange={setWebsite} placeholder="https://" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Contacts internes" subtitle="Personnes à joindre chez le client">
        <Field>
          <RepeatableRows rows={contacts} onChange={setContacts} accent={accent}
            addLabel="Ajouter un contact"
            emptyRow={{ name:'', role:'', email:'', phone:'' }}
            columns={[
              { key:'name', label:'Nom', span:2, placeholder:'Jean Kouassi' },
              { key:'role', label:'Fonction', span:2, placeholder:'Directeur Marketing' },
              { key:'email', label:'Email', span:3, placeholder:'jean@…' },
              { key:'phone', label:'Téléphone', span:2, placeholder:'+225 …' },
            ]}/>
        </Field>
      </FormSection>

      <FormSection title="Suivi & Conditions" columns={2}>
        <Field label="Account Manager" hint="Membre YESHCOM responsable" span={2}>
          <Autocomplete value={accountManager} onChange={setAccountManager} accent={accent} options={[
            { value:'israel', label:'Israel Irie', sub:'Co-fondateur · Direction', avatar:'I' },
            { value:'mamadou', label:'Mamadou Cissé', sub:'Co-fondateur · Stratégie', avatar:'M' },
            { value:'aicha', label:'Aïcha Touré', sub:'Lead Designer', avatar:'A' },
            { value:'jean', label:'Jean-Paul Kouassi', sub:'Chef de projet', avatar:'J' },
          ]}/>
        </Field>
        <Field label="Délai de paiement" suffix="jours">
          <Segmented value={paymentTerms} onChange={setPaymentTerms} accent={accent} options={[
            {value:0,label:'Comptant'},{value:15,label:'15 j'},{value:30,label:'30 j'},{value:60,label:'60 j'}
          ]}/>
        </Field>
        <Field label="Encours autorisé" suffix="FCFA">
          <MoneyInput value={creditLimit} onChange={setCreditLimit} accent={accent}/>
        </Field>
        <Field label="Étiquettes" span={2}>
          <ChipsInput value={tags} onChange={setTags} suggestions={['VIP','Récurrent','Stratégique','Sensible','International']} accent={accent}/>
        </Field>
        <Field label="Notes internes" span={2} hint="Visibles uniquement par l'équipe">
          <Textarea value={notes} onChange={setNotes} rows={3} placeholder="Préférences, historique, points d'attention…" accent={accent}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// PROSPECT (lead pré-client)
// ══════════════════════════════════════════════════════════════════════════
const ProspectForm = ({ open, onClose, accent=FC.primary }) => {
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [stage, setStage] = React.useState('contact');
  const [source, setSource] = React.useState(null);
  const [score, setScore] = React.useState(50);
  const [budget, setBudget] = React.useState('');
  const [needs, setNeeds] = React.useState([]);
  const [notes, setNotes] = React.useState('');
  const [nextAction, setNextAction] = React.useState('');
  const [nextDate, setNextDate] = React.useState('');
  const [owner, setOwner] = React.useState(null);

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={620}
      title="Nouveau prospect" subtitle="Lead à qualifier — entrera dans le pipeline commercial"
      headerBadge={{ icon:'prospect', label:'PROSPECT' }}
      footer={name ? `${name} · Score ${score}/100` : 'Brouillon'}
      primaryLabel="Ajouter au pipeline" primaryIcon="plus">

      <FormSection title="Identification" columns={2}>
        <Field label="Entreprise / Organisation" required span={2}>
          <Input value={name} onChange={setName} placeholder="Ex. Cabinet Diallo & Associés" leadingIcon="projects" accent={accent}/>
        </Field>
        <Field label="Personne contact">
          <Input value={contact} onChange={setContact} placeholder="Mme Awa Diallo" leadingIcon="user" accent={accent}/>
        </Field>
        <Field label="Fonction">
          <Input placeholder="Directrice générale" accent={accent}/>
        </Field>
        <Field label="Email" required>
          <Input value={email} onChange={setEmail} placeholder="contact@…" leadingIcon="mail" accent={accent}/>
        </Field>
        <Field label="Téléphone">
          <Input value={phone} onChange={setPhone} placeholder="+225 …" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Qualification" columns={2}>
        <Field label="Étape pipeline" required span={2}>
          <RadioCards value={stage} onChange={setStage} columns={4} accent={accent} options={[
            { value:'contact', label:'Premier contact', icon:'mail' },
            { value:'qualifie', label:'Qualifié', icon:'check' },
            { value:'proposition', label:'Proposition', icon:'invoice' },
            { value:'negociation', label:'Négociation', icon:'finance' },
          ]}/>
        </Field>
        <Field label="Source" required span={2}>
          <Select value={source} onChange={setSource} accent={accent} options={[
            {value:'site',label:'Site web — formulaire',icon:'dashboard'},
            {value:'reco',label:'Recommandation client',icon:'team'},
            {value:'instagram',label:'Instagram / Réseaux',icon:'services'},
            {value:'event',label:'Événement / Networking',icon:'calendar'},
            {value:'cold',label:'Démarchage à froid',icon:'send'},
            {value:'partenaire',label:'Partenariat',icon:'team'},
            {value:'autre',label:'Autre',icon:'folder'},
          ]}/>
        </Field>
        <Field label="Score d'intérêt" suffix={`${score}/100`} span={2} hint="Probabilité estimée de conversion">
          <input type="range" min="0" max="100" value={score} onChange={e=>setScore(Number(e.target.value))} style={{ width:'100%', accentColor:accent }}/>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:9, color:FC.t3, fontFamily:'JetBrains Mono', marginTop:2 }}>
            <span>FROID</span><span>TIÈDE</span><span>CHAUD</span>
          </div>
        </Field>
        <Field label="Budget pressenti" suffix="FCFA">
          <MoneyInput value={budget} onChange={setBudget} accent={accent}/>
        </Field>
        <Field label="Échéance">
          <Select accent={accent} options={[
            {value:'urgent',label:'Urgent (< 1 mois)'},
            {value:'court',label:'Court terme (1-3 mois)'},
            {value:'moyen',label:'Moyen terme (3-6 mois)'},
            {value:'long',label:'Long terme (6+ mois)'},
            {value:'inconnu',label:'Non défini'},
          ]}/>
        </Field>
        <Field label="Besoins identifiés" span={2}>
          <ChipsInput value={needs} onChange={setNeeds} accent={accent}
            suggestions={['Logo','Site web','App mobile','Réseaux sociaux','Vidéo','Photos','Branding','SEO','Print','Stratégie']}/>
        </Field>
      </FormSection>

      <FormSection title="Suivi commercial" columns={2}>
        <Field label="Responsable" span={2}>
          <Autocomplete value={owner} onChange={setOwner} accent={accent} options={[
            { value:'israel', label:'Israel Irie', avatar:'I' },
            { value:'mamadou', label:'Mamadou Cissé', avatar:'M' },
            { value:'jean', label:'Jean-Paul Kouassi', avatar:'J' },
          ]}/>
        </Field>
        <Field label="Prochaine action">
          <Input value={nextAction} onChange={setNextAction} placeholder="Ex. Envoyer brief & devis" leadingIcon="arrow_r" accent={accent}/>
        </Field>
        <Field label="Date prévue">
          <DateInput value={nextDate} onChange={setNextDate} accent={accent}/>
        </Field>
        <Field label="Notes & contexte" span={2}>
          <Textarea value={notes} onChange={setNotes} rows={3} placeholder="Détails de la conversation, attentes, freins éventuels…" accent={accent}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// CONTACT (interlocuteur d'un client)
// ══════════════════════════════════════════════════════════════════════════
const ContactForm = ({ open, onClose, accent=FC.primary }) => {
  const [client, setClient] = React.useState(null);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [role, setRole] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState(false);
  const [primary, setPrimary] = React.useState(false);
  const [decisionMaker, setDecisionMaker] = React.useState(false);
  const [linkedin, setLinkedin] = React.useState('');
  const [notes, setNotes] = React.useState('');

  return (
    <FormDrawer open={open} onClose={onClose} accent={accent} width={560}
      title="Nouveau contact" subtitle="Interlocuteur rattaché à un client"
      headerBadge={{ icon:'user', label:'CONTACT' }}
      primaryLabel="Ajouter le contact" primaryIcon="check">

      <FormSection>
        <Field label="Client de rattachement" required>
          <Autocomplete value={client} onChange={setClient} options={MOCK_CLIENTS} placeholder="Choisir un client" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Identité" columns={2}>
        <Field label="Prénom" required>
          <Input value={firstName} onChange={setFirstName} placeholder="Jean" accent={accent}/>
        </Field>
        <Field label="Nom" required>
          <Input value={lastName} onChange={setLastName} placeholder="Kouassi" accent={accent}/>
        </Field>
        <Field label="Fonction / Poste" span={2}>
          <Input value={role} onChange={setRole} placeholder="Directeur Marketing" leadingIcon="user" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Joindre" columns={2}>
        <Field label="Email" required span={2}>
          <Input value={email} onChange={setEmail} placeholder="jean@…" leadingIcon="mail" accent={accent}/>
        </Field>
        <Field label="Téléphone" span={2}>
          <Input value={phone} onChange={setPhone} placeholder="+225 …" accent={accent}/>
        </Field>
        <Field span={2}>
          <Check value={whatsapp} onChange={setWhatsapp} label="Joignable sur WhatsApp" accent={accent}/>
        </Field>
        <Field label="LinkedIn" span={2}>
          <Input value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/in/…" accent={accent}/>
        </Field>
      </FormSection>

      <FormSection title="Rôle dans la relation">
        <Field>
          <Check value={primary} onChange={setPrimary} label="Contact principal" hint="Sera contacté par défaut sur ce client" accent={accent}/>
        </Field>
        <Field>
          <Check value={decisionMaker} onChange={setDecisionMaker} label="Décideur" hint="A le pouvoir de signature / validation" accent={accent}/>
        </Field>
        <Field label="Notes" hint="Préférences, anniversaire, particularités…">
          <Textarea value={notes} onChange={setNotes} rows={2} accent={accent}/>
        </Field>
      </FormSection>
    </FormDrawer>
  );
};

Object.assign(window, { ClientForm, ProspectForm, ContactForm });
