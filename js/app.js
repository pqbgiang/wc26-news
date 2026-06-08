/* Pitch Report - Main Application Script */

/* ═════════════════════════════════════════════════════════════════════ */
/* DATA & CONFIGURATION                                                  */
/* ═════════════════════════════════════════════════════════════════════ */
const FLAGS={
  "Mexico":"🇲🇽","South Africa":"🇿🇦","South Korea":"🇰🇷","Czech Republic":"🇨🇿",
  "Canada":"🇨🇦","Bosnia and Herzegovina":"🇧🇦","Qatar":"🇶🇦","Switzerland":"🇨🇭",
  "Brazil":"🇧🇷","Morocco":"🇲🇦","Haiti":"🇭🇹","Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "USA":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Turkiye":"🇹🇷",
  "Germany":"🇩🇪","Curacao":"🇨🇼","Netherlands":"🇳🇱","Sweden":"🇸🇪",
  "Côte d'Ivoire":"🇨🇮","Ecuador":"🇪🇨","Tunisia":"🇹🇳","Japan":"🇯🇵",
  "Spain":"🇪🇸","Cabo Verde":"🇨🇻","Saudi Arabia":"🇸🇦","Uruguay":"🇺🇾",
  "Belgium":"🇧🇪","Egypt":"🇪🇬","IR Iran":"🇮🇷","New Zealand":"🇳🇿",
  "France":"🇫🇷","Senegal":"🇸🇳","Iraq":"🇮🇶","Norway":"🇳🇴",
  "Argentina":"🇦🇷","Algeria":"🇩🇿","Austria":"🇦🇹","Jordan":"🇯🇴",
  "Ghana":"🇬🇭","Panama":"🇵🇦","England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croatia":"🇭🇷",
  "Portugal":"🇵🇹","Congo DR":"🇨🇩","Uzbekistan":"🇺🇿","Colombia":"🇨🇴",
};

const GROUPS={
  A:["Mexico","South Africa","South Korea","Czech Republic"],
  B:["Canada","Bosnia and Herzegovina","Qatar","Switzerland"],
  C:["Brazil","Morocco","Haiti","Scotland"],
  D:["USA","Paraguay","Australia","Turkiye"],
  E:["Germany","Curacao","Netherlands","Sweden"],
  F:["Spain","Cabo Verde","Saudi Arabia","Uruguay"],
  G:["Belgium","Egypt","IR Iran","New Zealand"],
  H:["France","Senegal","Iraq","Norway"],
  I:["Argentina","Algeria","Austria","Jordan"],
  J:["Ghana","Panama","England","Croatia"],
  K:["Portugal","Congo DR","Uzbekistan","Colombia"],
  L:["Côte d'Ivoire","Ecuador","Tunisia","Japan"],
};

const TYPE_META={
  'daily-briefing':     {icon:'📋',label:'Daily Briefing'},
  'match-report':       {icon:'⚽',label:'Match Report'},
  'tactics':            {icon:'🧠',label:'Tactics'},
  'team-analysis':      {icon:'👥',label:'Team Analysis'},
  'team-preparation':   {icon:'🎯',label:'Match Preparation'},
  'tactical-breakdown': {icon:'📊',label:'Tactical Deep-Dive'},
  'default':            {icon:'📰',label:'Dispatch'},
};

const COUNTRY_CODES_GROUPS={
  "Mexico":"mx","South Africa":"za","South Korea":"kr","Czech Republic":"cz",
  "Canada":"ca","Bosnia and Herzegovina":"ba","Qatar":"qa","Switzerland":"ch",
  "Brazil":"br","Morocco":"ma","Haiti":"ht","Scotland":"gb-sct",
  "USA":"us","Paraguay":"py","Australia":"au","Turkiye":"tr",
  "Germany":"de","Curacao":"cw","Netherlands":"nl","Sweden":"se",
  "Côte d'Ivoire":"ci","Ecuador":"ec","Tunisia":"tn","Japan":"jp",
  "Spain":"es","Cabo Verde":"cv","Saudi Arabia":"sa","Uruguay":"uy",
  "Belgium":"be","Egypt":"eg","IR Iran":"ir","New Zealand":"nz",
  "France":"fr","Senegal":"sn","Iraq":"iq","Norway":"no",
  "Argentina":"ar","Algeria":"dz","Austria":"at","Jordan":"jo",
  "Ghana":"gh","Panama":"pa","England":"gb-eng","Croatia":"hr",
  "Portugal":"pt","Congo DR":"cd","Uzbekistan":"uz","Colombia":"co",
};

const COUNTRY_CODES_MATCHES={
  "Mexico":"mx","South Africa":"za","South Korea":"kr","Czech Republic":"cz",
  "Canada":"ca","Bosnia and Herzegovina":"ba","Qatar":"qa","Switzerland":"ch",
  "Brazil":"br","Morocco":"ma","Haiti":"ht","Scotland":"gb-sct",
  "USA":"us","Paraguay":"py","Australia":"au","Turkiye":"tr",
  "Germany":"de","Curacao":"cw","Netherlands":"nl","Sweden":"se",
  "Côte d'Ivoire":"ci","Ecuador":"ec","Tunisia":"tn","Japan":"jp",
  "Spain":"es","Cabo Verde":"cv","Saudi Arabia":"sa","Uruguay":"uy",
  "Belgium":"be","Egypt":"eg","IR Iran":"ir","New Zealand":"nz",
  "France":"fr","Senegal":"sn","Iraq":"iq","Norway":"no",
  "Argentina":"ar","Algeria":"dz","Austria":"at","Jordan":"jo",
  "Ghana":"gh","Panama":"pa","England":"gb-eng","Croatia":"hr",
  "Portugal":"pt","Congo DR":"cd","Uzbekistan":"uz","Colombia":"co",
};

const STANDINGS={
  A:{teams:[{name:"Mexico",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"South Africa",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"South Korea",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Czech Republic",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  B:{teams:[{name:"Canada",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Bosnia and Herzegovina",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Qatar",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Switzerland",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  C:{teams:[{name:"Brazil",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Morocco",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Haiti",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Scotland",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  D:{teams:[{name:"USA",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Paraguay",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Australia",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Turkiye",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  E:{teams:[{name:"Germany",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Curacao",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Netherlands",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Sweden",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  F:{teams:[{name:"Spain",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Cabo Verde",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Saudi Arabia",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Uruguay",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  G:{teams:[{name:"Belgium",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Egypt",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"IR Iran",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"New Zealand",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  H:{teams:[{name:"France",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Senegal",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Iraq",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Norway",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  I:{teams:[{name:"Argentina",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Algeria",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Austria",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Jordan",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  J:{teams:[{name:"Ghana",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Panama",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"England",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Croatia",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  K:{teams:[{name:"Portugal",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Congo DR",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Uzbekistan",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Colombia",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
  L:{teams:[{name:"Côte d'Ivoire",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Ecuador",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Tunisia",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},{name:"Japan",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}]},
};

/* ═════════════════════════════════════════════════════════════════════ */
/* STATE                                                                  */
/* ═════════════════════════════════════════════════════════════════════ */
let allEntries=[],activeType='all',activeTeam=null,tagsExpanded=false;

/* ═════════════════════════════════════════════════════════════════════ */
/* UTILITIES                                                              */
/* ═════════════════════════════════════════════════════════════════════ */
function parseType(slug, type){
  if(type==='team-analysis') return 'team-analysis';
  if(type==='team-preparation') return 'team-preparation';
  if(type==='tactical-breakdown') return 'tactical-breakdown';
  if(type==='match-report') return 'match-report';
  if(type==='tactics') return 'tactics';
  if(type==='daily-briefing') return 'daily-briefing';
  if(!slug) return 'daily-briefing';
  if(slug.includes('team-analysis')) return 'team-analysis';
  if(slug.includes('team-preparation')) return 'team-preparation';
  if(slug.includes('tactical-breakdown')) return 'tactical-breakdown';
  if(slug.includes('match-report')) return 'match-report';
  if(slug.includes('match')) return 'match-report';
  if(slug.includes('tactics') || slug.includes('tactic')) return 'tactics';
  return 'daily-briefing';
}

function fmtDate(d){
  try{return new Date(d+'T12:00:00Z').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});}
  catch(e){return d;}
}

function isToday(d){return new Date().toISOString().split('T')[0]===d;}

/* ═════════════════════════════════════════════════════════════════════ */
/* RENDERING: GROUPS                                                     */
/* ═════════════════════════════════════════════════════════════════════ */
function renderGroups(){
  document.getElementById('groupsList').innerHTML=
    Object.entries(STANDINGS).map(([g,data])=>
      `<div style="margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:10px">Group ${g}</div>
        ${data.teams.map(team=>{
          const code=COUNTRY_CODES_GROUPS[team.name]||'xx';
          return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;font-size:12px;border-bottom:1px solid var(--border);last:border-bottom:none">
            <img src="https://flagcdn.com/h24/${code}.png" alt="${team.name}" style="width:24px;height:auto;border-radius:2px"/>
            <span style="flex:1;color:var(--text2);font-weight:500">${team.name}</span>
            <span style="color:var(--text3);width:24px;text-align:center" title="Matches">${team.p}</span>
            <span style="color:var(--text3);width:30px;text-align:center;font-weight:600" title="W-D-L">${team.w}-${team.d}-${team.l}</span>
            <span style="color:var(--gold);width:24px;text-align:right;font-weight:700" title="Points">${team.pts}</span>
          </div>`;
        }).join('')}
      </div>`).join('');
}

/* ═════════════════════════════════════════════════════════════════════ */
/* RENDERING: LEAD STORY                                                 */
/* ═════════════════════════════════════════════════════════════════════ */
function renderLead(e){
  if(!e){
    document.getElementById('leadSlot').innerHTML=`<div class="empty"><div class="empty-icon">⏳</div>First dispatch coming soon.</div>`;
    return;
  }
  const type=parseType(e.file||e.type, e.type);
  const meta=TYPE_META[type]||TYPE_META['default'];
  const teamFlags=(e.teams||[]).slice(0,5).map(t=>FLAGS[t]||'').join(' ');
  document.getElementById('leadSlot').innerHTML=`
    <div class="lead fadein">
      <div class="lead-kicker">${meta.icon} ${meta.label} · Lead Story</div>
      <h2 class="lead-headline">${e.title||'WC26 Daily Dispatch'}</h2>
      <p class="lead-deck">${e.summary||''}</p>
      <div class="lead-meta">
        <span>By <strong>🐻 Polar Bear</strong> &amp; <strong>🐱 FootballLoverKitty</strong></span>
        <span class="lead-dot"></span>
        <span>${fmtDate(e.date)}</span>
        ${teamFlags?`<span class="lead-dot"></span><span class="lead-team-flags">${teamFlags}</span>`:''}
      </div>
      <a href="${e.file||'#'}" class="lead-cta">
        Read full dispatch
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    </div>`;
}

/* ═════════════════════════════════════════════════════════════════════ */
/* RENDERING: TEAM TAGS                                                  */
/* ═════════════════════════════════════════════════════════════════════ */
function buildCounts(){
  const c={};
  allEntries.forEach(e=>(e.teams||[]).forEach(t=>{c[t]=(c[t]||0)+1;}));
  return c;
}

function renderTeamTags(){
  const counts=buildCounts();
  const sorted=Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const slot=document.getElementById('teamTags');
  if(!sorted.length){
    slot.innerHTML='<span style="font-size:12px;color:var(--text3);font-style:italic">Team tags appear after the first dispatch.</span>';
    return;
  }
  slot.innerHTML=sorted.map(([team,cnt])=>
    `<button class="team-tag ${activeTeam===team?'active':''}" data-team="${team}">
      ${FLAGS[team]||'🏳️'} ${team} <span class="cnt">${cnt}</span>
    </button>`).join('')+
    `<button class="tags-more" id="tagsMore">${tagsExpanded?'Show less ▲':'More ▼'}</button>`;

  document.querySelectorAll('.team-tag').forEach(btn=>{
    btn.addEventListener('click',function(){
      activeTeam=activeTeam===this.dataset.team?null:this.dataset.team;
      renderTeamTags();renderFeed();
    });
  });
  const more=document.getElementById('tagsMore');
  if(more) more.addEventListener('click',function(){
    tagsExpanded=!tagsExpanded;
    document.getElementById('teamTags').classList.toggle('expanded',tagsExpanded);
    this.textContent=tagsExpanded?'Show less ▲':'More ▼';
  });
  document.getElementById('teamTags').classList.toggle('expanded',tagsExpanded);
}

/* ═════════════════════════════════════════════════════════════════════ */
/* RENDERING: FEED                                                       */
/* ═════════════════════════════════════════════════════════════════════ */
function getFiltered(){
  return allEntries.filter(e=>{
    const typeOk=activeType==='all'||parseType(e.file||e.type, e.type)===activeType;
    const teamOk=!activeTeam||(e.teams||[]).includes(activeTeam);
    return typeOk&&teamOk;
  });
}

function renderFeed(){
  const slot=document.getElementById('feedSlot');
  const entries=getFiltered();
  if(!entries.length){
    slot.innerHTML=`<div class="empty"><div class="empty-icon">📭</div>No dispatches match this filter yet.</div>`;
    return;
  }
  const byDate={};
  entries.forEach(e=>{if(!byDate[e.date])byDate[e.date]=[];byDate[e.date].push(e);});
  slot.innerHTML=Object.entries(byDate).map(([date,items],gi)=>{
    const today=isToday(date);
    const cards=items.map((e,ci)=>{
      const type=parseType(e.file||e.type, e.type);
      const meta=TYPE_META[type]||TYPE_META['default'];
      const chips=(e.teams||[]).slice(0,4).map(t=>
        `<span class="rcard-chip">${FLAGS[t]||''} ${t}</span>`).join('');
      return `
        <a href="${e.file||'#'}" class="rcard fadein" data-type="${type}" style="animation-delay:${(gi*4+ci)*.04}s">
          <div class="rcard-type"><span class="rcard-dot"></span>${meta.label}</div>
          <div class="rcard-headline">${e.title||'WC26 Dispatch'}</div>
          <div class="rcard-summary">${e.summary||''}</div>
          <div class="rcard-footer">
            <span>🐻 &amp; 🐱</span>
            <span>·</span>
            <span>${fmtDate(date)}</span>
            ${chips?`<span>·</span><div class="rcard-chips">${chips}</div>`:''}
          </div>
        </a>`;
    }).join('');
    return `
      <div class="date-group">
        <div class="date-strip">
          <span class="date-lbl ${today?'today':''}">${today?'Today · ':''}${fmtDate(date)}</span>
          <span class="date-cnt">${items.length} dispatch${items.length>1?'es':''}</span>
          <div class="date-line"></div>
        </div>
        ${cards}
      </div>`;
  }).join('');
}

/* ═════════════════════════════════════════════════════════════════════ */
/* LOADING & INIT                                                         */
/* ═════════════════════════════════════════════════════════════════════ */
async function loadData(){
  try{
    const res=await fetch('data/index.json?'+Date.now());
    if(!res.ok)throw new Error('missing');
    allEntries=await res.json();
    if(!Array.isArray(allEntries))allEntries=[];
    renderLead(allEntries[0]||null);
    renderTeamTags();
    renderFeed();
    const n=allEntries.length;
    const dispatchEl=document.getElementById('dispatchCount');
    if(dispatchEl)dispatchEl.textContent=n+' dispatch'+(n!==1?'es':'');
    document.getElementById('sidebarCount').textContent=n;
    document.getElementById('pbCount').textContent=allEntries.filter((_,i)=>i%2===0).length;
    document.getElementById('flkCount').textContent=allEntries.filter((_,i)=>i%2!==0).length;
  }catch(e){
    document.getElementById('leadSlot').innerHTML=`<div class="empty"><div class="empty-icon">🐻</div>Polar Bear is filing the first dispatch. Check back soon.</div>`;
    document.getElementById('feedSlot').innerHTML=`<div class="empty"><div class="empty-icon">🐱</div>FootballLoverKitty is sharpening her pen.</div>`;
    document.getElementById('teamTags').innerHTML='<span style="font-size:12px;color:var(--text3);font-style:italic">Teams appear after the first dispatch.</span>';
  }
}

/* ═════════════════════════════════════════════════════════════════════ */
/* EVENT HANDLERS: FILTERS                                               */
/* ═════════════════════════════════════════════════════════════════════ */
document.querySelectorAll('.filt').forEach(btn=>{
  btn.addEventListener('click',function(){
    document.querySelectorAll('.filt').forEach(b=>b.classList.remove('active'));
    this.classList.add('active');
    activeType=this.dataset.filter;
    renderFeed();
  });
});

/* ═════════════════════════════════════════════════════════════════════ */
/* EVENT HANDLERS: GROUPS TOGGLE                                         */
/* ═════════════════════════════════════════════════════════════════════ */
document.getElementById('groupsToggle').addEventListener('click',function(){
  const body=document.getElementById('groupsBody');
  const arr=document.getElementById('groupsArr');
  const open=body.classList.toggle('open');
  arr.style.transform=open?'rotate(180deg)':'';
});

/* ═════════════════════════════════════════════════════════════════════ */
/* EVENT HANDLERS: THEME TOGGLE                                          */
/* ═════════════════════════════════════════════════════════════════════ */
const themeBtn=document.getElementById('themeBtn');
function getTheme(){return document.documentElement.getAttribute('data-theme');}
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem('wc26-theme',t);
  themeBtn.textContent=t==='dark'?'☀️':'🌙';
}
themeBtn.addEventListener('click',()=>setTheme(getTheme()==='dark'?'light':'dark'));
const saved=localStorage.getItem('wc26-theme');
if(saved)setTheme(saved);
else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme:light)').matches)setTheme('light');
else setTheme('dark');

/* ═════════════════════════════════════════════════════════════════════ */
/* NEXT MATCHES                                                           */
/* ═════════════════════════════════════════════════════════════════════ */
async function loadNextMatches(){
  try{
    const res=await fetch('data/match.json?'+Date.now());
    if(!res.ok)throw new Error('Failed to fetch matches');
    const data=await res.json();
    const today=new Date().toISOString().split('T')[0];
    const upcoming=data.matches.filter(m=>m.date>=today&&m.status==='scheduled'&&m.stage==='Group Stage').slice(0,3);
    if(!upcoming.length){
      document.getElementById('nextMatches').innerHTML='<div style="font-size:12px;color:var(--text3);text-align:center;padding:20px 0;font-style:italic">Tournament concluded.</div>';
      return;
    }
    const html=upcoming.map((m,idx)=>{
      const mDate=new Date(m.kickoff_utc);
      const isToday=m.date===today;
      const dLabel=isToday?'Today':new Date(m.date+'T12:00:00Z').toLocaleDateString('en-GB',{month:'short',day:'numeric'});
      const time=mDate.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
      const homeTeam=m.home_team.name;
      const awayTeam=m.away_team.name;
      const homeCode=COUNTRY_CODES_MATCHES[homeTeam]||'xx';
      const awayCode=COUNTRY_CODES_MATCHES[awayTeam]||'xx';
      const colors=['#ff6b6b','#4ecdc4','#ffe66d'];
      const bgColor=colors[idx%3];
      const groupLabel=m.group||m.stage||'';
      const stadiumLabel=m.stadium||'';
      return `<div class="next-matches-item" style="border-color:${bgColor}40">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
          <div>
            <div class="match-date-label" style="color:${bgColor}">${isToday?'⚡ Today':'📅 '+dLabel}</div>
            ${groupLabel?`<div class="match-group">${groupLabel}</div>`:''}
            ${stadiumLabel?`<div class="match-stadium">📍 ${stadiumLabel}</div>`:''}
          </div>
          <span class="match-time" style="color:${document.documentElement.getAttribute('data-theme')==='dark'?'#fff':'#0f0f12'}">${time}</span>
        </div>
        <div class="match-teams">
          <div class="match-team">
            <img src="https://flagcdn.com/h48/${homeCode}.png" alt="${homeTeam}" class="match-team-flag"/>
            <div class="match-team-name">${homeTeam}</div>
          </div>
          <div class="match-vs" style="color:${bgColor}">VS</div>
          <div class="match-team">
            <img src="https://flagcdn.com/h48/${awayCode}.png" alt="${awayTeam}" class="match-team-flag"/>
            <div class="match-team-name">${awayTeam}</div>
          </div>
        </div>
      </div>`;
    }).join('');
    document.getElementById('nextMatches').innerHTML=html;
  }catch(e){
    document.getElementById('nextMatches').innerHTML='<div style="font-size:12px;color:var(--text3);text-align:center;padding:20px 0;font-style:italic">Unable to load matches.</div>';
  }
}

/* ═════════════════════════════════════════════════════════════════════ */
/* BOOTSTRAP                                                              */
/* ═════════════════════════════════════════════════════════════════════ */
document.getElementById('footerYear').textContent=new Date().getFullYear();
renderGroups();
loadData();
loadNextMatches();
