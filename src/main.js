import './style.css'

// ---- Edit your details here ----
const CONTACT = { email: 'franktechservices0@gmail.com', phone: '+91 93634 30369', wa: '919363430369' }
const page = document.body.dataset.page
const links = [['services', 'Services'], ['solutions', 'AI Automation'], ['about', 'About'], ['contact', 'Contact']]

// ---- Logo mark: three planes (blue, violet, cyan). Same shapes as the logo, rebuilt as SVG ----
let uid = 0
const mark = (animated) => {
  const id = 'g' + uid++
  const fly = (o, x, y, k, d) => animated ? `<g class="fly" style="--o:${o};--x:${x}px;--y:${y}px"><g class="par" style="--k:${k}">${d}</g></g>` : d
  return `<svg viewBox="355 195 440 455" role="img" aria-label="FrankTech logo"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1a7bff"/><stop offset="1" stop-color="#0b5ae0"/></linearGradient></defs>
${fly(0, -240, -160, 7, `<path fill="url(#${id})" d="M485 209H745L783 248L733 303L736 283H508L418 389L373 344Z M418 389L441 411L371 485L376 441Z"/>`)}
${fly(1, 260, -110, 13, '<path fill="#7b3dff" d="M524 326H726L662 394H546L485 449L441 411Z"/>')}
${fly(2, -80, 230, 22, '<path fill="#00eeff" d="M485 449V553L411 638V521Z"/>')}</svg>`
}

// ---- Header and footer ----
document.getElementById('hdr').innerHTML = `<header class="nav"><a class="logo" href="/">${mark(false)}Frank<span>Tech</span></a>
<button class="mb" aria-expanded="false">Menu</button>
<nav>${links.map(([p, t]) => `<a href="/${p}.html" class="${p === page ? 'on' : ''}">${t}</a>`).join('')}<a class="btn s" href="/contact.html">Start your project</a></nav></header>`
const nav = document.querySelector('.nav'), mb = document.querySelector('.mb')
mb.onclick = () => mb.setAttribute('aria-expanded', nav.classList.toggle('open'))

const wa = `https://wa.me/${CONTACT.wa}`
document.getElementById('ftr').innerHTML = `<section class="cta"><h2>Have an idea? Let's turn it into reality.</h2>
<div class="actions"><a class="btn" href="/contact.html">Start your project</a><a class="btn ghost" href="${wa}" target="_blank" rel="noopener">Chat on WhatsApp</a></div></section>
<footer><div><a class="logo" href="/">${mark(false)}Frank<span>Tech</span></a><p>Building innovative software, intelligent AI solutions and automated business workflows.</p></div>
<div><h4>Company</h4>${[['', 'Home'], ...links].map(([p, t]) => `<a href="/${p ? p + '.html' : ''}">${t}</a>`).join('')}</div>
<div><h4>Services</h4><a href="/services.html">Software development</a><a href="/services.html">Web and mobile</a><a href="/solutions.html">AI agents</a><a href="/solutions.html">Business automation</a><a href="/services.html">Cloud solutions</a></div>
<div><h4>Contact</h4><a href="mailto:${CONTACT.email}">${CONTACT.email}</a><a href="tel:+${CONTACT.wa}">${CONTACT.phone}</a><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a></div>
<p class="copy">© ${new Date().getFullYear()} FrankTech Services. All rights reserved.</p></footer>`

// ---- Hero: the three planes land, then follow the cursor at different depths ----
const hm = document.getElementById('hero-mark')
if (hm) {
  hm.innerHTML = mark(true)
  const s = hm.firstElementChild
  addEventListener('pointermove', e => {
    s.style.setProperty('--px', (e.clientX / innerWidth - .5) * 2)
    s.style.setProperty('--py', (e.clientY / innerHeight - .5) * 2)
  })
}

// ---- AI automation explorer: pick a job, watch the workflow run ----
const jobs = [
  ['AI customer support', 'Assistants that answer customer questions, share information and pass complex requests to your support team.', ['Customer asks a question', 'AI reads your help content', 'Answer sent instantly', 'Hard cases go to your team']],
  ['AI recruitment agents', 'Automate candidate communication, CV collection, interview coordination, follow-ups and status tracking.', ['Candidate applies', 'CV collected and read', 'Interview time arranged', 'Status updated for you']],
  ['Sales and lead management', 'Qualify incoming leads, automate follow-ups, organise customer information and connect conversations to your CRM.', ['New lead arrives', 'AI qualifies the lead', 'Follow-up sent', 'CRM updated']],
  ['WhatsApp and Instagram', 'Messaging workflows that manage enquiries, respond to customers and automate approved communication.', ['Message arrives', 'Enquiry understood', 'Approved reply sent', 'Logged for your team']],
  ['Business workflows', 'Connect your business applications and automate repetitive tasks, notifications, approvals and reporting.', ['Trigger fires', 'Your apps connected', 'Approval requested', 'Report delivered']],
  ['Custom AI assistants', 'Assistants built around your requirements, internal documents and operational workflows.', ['Question asked', 'Your documents searched', 'Answer written', 'Source shown']]
]
const flow = document.getElementById('flow')
if (flow) {
  flow.innerHTML = `<div class="tabs" role="tablist" aria-label="Automation jobs">${jobs.map((j, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}">${j[0]}</button>`).join('')}</div>
<div class="panel" role="tabpanel"><h3></h3><p></p><ol class="nodes"></ol></div>`
  const panel = flow.querySelector('.panel'), tabs = [...flow.querySelectorAll('button')]
  const show = i => {
    tabs.forEach((b, n) => b.setAttribute('aria-selected', n === i))
    panel.querySelector('h3').textContent = jobs[i][0]
    panel.querySelector('p').textContent = jobs[i][1]
    panel.querySelector('ol').innerHTML = jobs[i][2].map((t, n) => `<li style="--i:${n}">${t}</li>`).join('')
    panel.classList.remove('run'); void panel.offsetWidth; panel.classList.add('run')
  }
  tabs.forEach((b, i) => b.addEventListener('click', () => show(i)))
  flow.addEventListener('keydown', e => {
    const c = tabs.findIndex(b => b.getAttribute('aria-selected') === 'true')
    const n = e.key === 'ArrowDown' ? c + 1 : e.key === 'ArrowUp' ? c - 1 : null
    if (n !== null && tabs[n]) { e.preventDefault(); tabs[n].focus(); show(n) }
  })
  show(0); panel.classList.remove('run')
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { panel.classList.add('run'); o.disconnect() } }, { threshold: .4 }).observe(panel)
}

// ---- Contact page ----
document.querySelector('[data-mail]')?.append(Object.assign(document.createTextNode(CONTACT.email)))
const setLink = (sel, href, text) => { const a = document.querySelector(sel); if (a) { a.href = href; if (text) a.textContent = text } }
setLink('[data-mail]', `mailto:${CONTACT.email}`); setLink('[data-tel]', `tel:+${CONTACT.wa}`, CONTACT.phone); setLink('[data-wa]', wa)
document.getElementById('form')?.addEventListener('submit', e => {
  e.preventDefault(); const f = Object.fromEntries(new FormData(e.target))
  const body = `Name: ${f.name}\nCompany: ${f.company || '-'}\nEmail: ${f.email}\nPhone: ${f.phone || '-'}\nService: ${f.service || '-'}\nBudget: ${f.budget || '-'}\n\n${f.msg}`
  location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Project enquiry from ' + f.name)}&body=${encodeURIComponent(body)}`
})
