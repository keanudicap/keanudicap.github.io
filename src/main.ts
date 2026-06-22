import './style.css'
import {
  featuredPublications,
  newsItems,
  profileLinks,
  publicationGroups,
  quickFacts,
  researchAreas,
  type ProfileLink,
  type Publication,
} from './data'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Application root was not found.')
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character]
  })

const renderExternalLink = (link: ProfileLink, className = 'link') => `
  <a class="${className}" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">
    ${escapeHtml(link.label)}
  </a>
`

const renderPublicationVisual = (publication: Publication) => {
  if (publication.imageUrl) {
    return `
      <img
        class="publication-image"
        src="${escapeHtml(publication.imageUrl)}"
        alt="${escapeHtml(publication.imageAlt ?? publication.title)}"
        loading="lazy"
      />
    `
  }

  return `
    <div class="publication-mark" aria-hidden="true">
      <span>${escapeHtml(publication.year)}</span>
      <strong>${escapeHtml(publication.venue)}</strong>
    </div>
  `
}

const renderPublication = (publication: Publication, isFeatured = false) => `
  <article class="publication-card${isFeatured ? ' featured-card' : ''}">
    ${renderPublicationVisual(publication)}
    <div class="publication-body">
      <div class="publication-meta">
        <span>${escapeHtml(publication.category)}</span>
        <span>${escapeHtml(publication.year)}</span>
      </div>
      <h3><a href="${escapeHtml(publication.href)}" target="_blank" rel="noreferrer">${escapeHtml(publication.title)}</a></h3>
      <p>${escapeHtml(publication.summary)}</p>
      <a class="paper-link" href="${escapeHtml(publication.href)}" target="_blank" rel="noreferrer">Paper</a>
    </div>
  </article>
`

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Fangkai Yang homepage">Fangkai Yang</a>
    <nav aria-label="Primary navigation">
      <a href="#research">Research</a>
      <a href="#publications">Publications</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Microsoft Research Asia / KTH Royal Institute of Technology</p>
        <h1 id="hero-title">Fangkai Yang</h1>
        <p class="lead">
          I work on agentic AI systems, retrieval-augmented reasoning, code intelligence,
          and learning-based automation for cloud systems, with earlier KTH-facing work in
          human-aware robotics and social navigation.
        </p>
        <div class="profile-links" aria-label="Scholarly and professional links">
          ${profileLinks.map((link) => renderExternalLink(link)).join('')}
        </div>
      </div>
      <aside class="profile-panel" aria-label="Profile summary">
        <img
          class="portrait"
          src="/profile.jpg"
          alt="Fangkai Yang"
          width="240"
          height="240"
        />
        <dl>
          ${quickFacts
            .map(
              (fact) => `
                <div>
                  <dt>${escapeHtml(fact.label)}</dt>
                  <dd>${escapeHtml(fact.value)}</dd>
                </div>
              `,
            )
            .join('')}
        </dl>
      </aside>
    </section>

    <section class="section split-section" aria-labelledby="about-title">
      <div>
        <p class="section-kicker">About</p>
        <h2 id="about-title">Research at the intersection of agents, systems, and decision making.</h2>
      </div>
      <div class="prose">
        <p>
          My recent publications study large language model agents, GUI and desktop automation,
          retrieval-augmented question answering, code translation, and self-improving model behavior.
          In parallel, my cloud systems work develops learning-based methods for reliability,
          capacity management, failure prediction, and operational automation at Microsoft scale.
        </p>
        <p>
          Earlier KTH-facing work explored social navigation and human-agent interaction,
          including robot behavior in groups and crowds.
        </p>
      </div>
    </section>

    <section id="research" class="section" aria-labelledby="research-title">
      <div class="section-heading">
        <p class="section-kicker">Research Themes</p>
        <h2 id="research-title">Three connected lines of work</h2>
      </div>
      <div class="research-grid">
        ${researchAreas
          .map(
            (area) => `
              <article class="research-card">
                <h3>${escapeHtml(area.title)}</h3>
                <p>${escapeHtml(area.summary)}</p>
                <ul>
                  ${area.keywords.map((keyword) => `<li>${escapeHtml(keyword)}</li>`).join('')}
                </ul>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="section" aria-labelledby="featured-title">
      <div class="section-heading compact-heading">
        <p class="section-kicker">Selected Work</p>
        <h2 id="featured-title">Recent featured publications</h2>
      </div>
      <div class="featured-grid">
        ${featuredPublications.map((publication) => renderPublication(publication, true)).join('')}
      </div>
    </section>

    <section id="publications" class="section" aria-labelledby="publications-title">
      <div class="section-heading">
        <p class="section-kicker">Publications</p>
        <h2 id="publications-title">Categorized publication list</h2>
        <p>
          This draft uses the KTH profile, Google Scholar, and ORCID as primary identity anchors,
          then groups selected papers by research direction.
        </p>
      </div>
      <div class="publication-groups">
        ${publicationGroups
          .map(
            (group) => `
              <section class="publication-group" aria-labelledby="${escapeHtml(group.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase())}">
                <div class="group-heading">
                  <h3 id="${escapeHtml(group.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase())}">${escapeHtml(group.title)}</h3>
                  <p>${escapeHtml(group.description)}</p>
                </div>
                <div class="publication-list">
                  ${group.publications.map((publication) => renderPublication(publication)).join('')}
                </div>
              </section>
            `,
          )
          .join('')}
      </div>
    </section>

    <section class="section split-section" aria-labelledby="news-title">
      <div>
        <p class="section-kicker">News</p>
        <h2 id="news-title">Recent updates</h2>
      </div>
      <ol class="news-list">
        ${newsItems
          .map(
            (item) => `
              <li>
                <time>${escapeHtml(item.date)}</time>
                <span>${escapeHtml(item.text)}</span>
              </li>
            `,
          )
          .join('')}
      </ol>
    </section>

    <section id="contact" class="section contact-section" aria-labelledby="contact-title">
      <div>
        <p class="section-kicker">Contact</p>
        <h2 id="contact-title">Scholarly profiles and code</h2>
      </div>
      <div class="contact-links">
        ${profileLinks.map((link) => renderExternalLink(link, 'contact-link')).join('')}
      </div>
    </section>
  </main>
`
