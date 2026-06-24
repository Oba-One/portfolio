export const projectSlugs = [
  'coop',
  'green_goods',
  'greenpill',
  'waves',
  'wefa',
  'syn',
  'freeport',
  'mira_connect',
  'mira_flow',
  'gentle_monster',
] as const

export type ProjectSlug = (typeof projectSlugs)[number]

export type ProjectPlatform = 'laptop' | 'phone'

export type ProjectLink = {
  label: string
  link: string
}

export type ProjectCta = ProjectLink

export type ProjectSocialImage = {
  src: string
  alt: string
  width: number
  height: number
  type: 'image/png'
}

export type ProjectRecord = {
  title: string
  description: string
  metaDescription?: string
  cta: ProjectCta
  platform: ProjectPlatform
  year: number
  skills: readonly string[]
  problem: string
  architecture: string
  development: string
  learnings: string
  links: readonly ProjectLink[]
  socialImage?: ProjectSocialImage
}

const projectSocialImageVersion = 'project-cards-2'

const projectSocialImage = (slug: string, title: string): ProjectSocialImage => ({
  src: `/social/projects/${slug}.png?v=${projectSocialImageVersion}`,
  alt: `Social preview for the ${title} project.`,
  width: 1200,
  height: 630,
  type: 'image/png',
})

export const featuredProjectSlugs = [
  'green_goods',
  'greenpill',
  'wefa',
  'syn',
  'freeport',
  'mira_connect',
  'mira_flow',
  'gentle_monster',
] as const satisfies readonly ProjectSlug[]

export const projects = {
  coop: {
    title: 'Coop',
    description:
      'A local-first browser extension and receiver PWA for capture, review, AI refinement, and shared group memory',
    socialImage: projectSocialImage('coop', 'Coop'),
    cta: {
      label: 'View Coop',
      link: '/projects/coop',
    },
    platform: 'laptop',
    year: 2026,
    skills: ['TypeScript', 'WebExtensions', 'Yjs', 'WebRTC', 'WebGPU', 'Bun'],
    problem:
      'Groups doing serious work lose important context across browser tabs, voice notes, photos, files, links, and private conversations. Most collaboration tools either centralize raw context on hosted platforms or jump straight from capture to AI output without enough human review. Coop starts from a different premise: the shared memory of a group should be earned through explicit review, not assumed by default.',
    architecture:
      'Coop is a browser-first, local-first system built as a Bun monorepo. The MV3 extension is the primary work surface for capture and review, the receiver PWA handles mobile and secondary device intake, the shared package owns schemas and domain flows, and a small Hono API supports signaling and optional Yjs document sync. Raw capture stays local first; reviewed drafts, artifacts, board views, and proof material only enter shared coop state after a member chooses to publish them.',
    development:
      'The work has been about turning agentic software into a trustworthy group workflow. I shaped the capture, review, and publish loop; hardened receiver pairing and private intake; worked through local AI refinement across WebGPU, WASM, and heuristic tiers; and kept the release path honest by separating deterministic test proof from real browser and extension proof. The product is staged for browser-first use while onchain, archive, and privacy rails remain gated behind explicit modes.',
    learnings:
      'Coop has sharpened how I think about local-first AI. The hard part is not only running models near the user, it is deciding what should become shared memory at all. A useful agent has to preserve context, expose uncertainty, and make review feel lighter without removing human judgment. That has made Coop a practical bridge between my infrastructure work and the daily coordination problems teams actually feel.',
    links: [
      {
        label: 'View Site',
        link: 'https://coop.town',
      },
      {
        label: 'View Docs',
        link: 'https://docs.coop.town',
      },
    ],
  },
  green_goods: {
    title: 'Green Goods',
    description:
      'A reporting and funding platform for regenerative communities turning local work into trusted evidence and capital',
    socialImage: projectSocialImage('green-goods', 'Green Goods'),
    cta: {
      label: 'View Green Goods',
      link: '/projects/green-goods',
    },
    platform: 'phone',
    year: 2026,
    skills: [
      'Impact Reporting Methodologies',
      'Funding Infrastructure',
      'Regenerative Finance',
      'PWA Architecture',
      'Ethereum',
      'TypeScript',
    ],
    problem:
      'Regenerative work is not only planting trees. It can mean keeping a solar hub running, tracking waste recovery, restoring agroforestry systems, or teaching people how to steward a shared space. The evidence for that work is usually scattered across phones, chats, spreadsheets, and memory. At the same time, many impact reporting tools keep records inside isolated platforms that are hard for local teams to access and hard for funders to verify. The result is a gap between people doing credible work and the capital that could support them. Green Goods connects evidence, review, reporting, direct support, and local endowments so communities can prove progress and funders can allocate with more context and confidence.',
    architecture:
      'Green Goods has three main product surfaces: a public web app for discovery, evidence, and funding; an installed client PWA for field submissions; and an admin dashboard for operator review, assessments, roles, action catalogs, and capital flows. Those surfaces run on Arbitrum, a layer two network on Ethereum, where attestations record work, approvals, and assessments, while smart contracts manage garden accounts, permissions, actions, and funding modules. Indexers turn that protocol activity back into usable app data. On the capital side, gardens can receive direct support or endowment deposits, giving funders a withdrawable position while routed yield supports operations, contributor compensation, and future community work.',
    development:
      'Green Goods is being developed as both a product and a methodology system. The work is not just building screens or contracts; it is translating solar, agroforestry, waste, and education projects into evidence flows that people can use in the field and funders can understand. My role spans product leadership and core engineering across the client PWA, public web app, admin workflows, documentation, onboarding, and support. A lot of the work is turning community research and operator feedback into action definitions, review patterns, funding pathways, and guidance that are practical enough for real teams to keep using. The hard part is that each context needs different evidence: solar teams may need uptime and maintenance records, waste teams may need kilograms diverted, agroforestry teams may need planting and survival checks, and education teams may need attendance, curriculum, and learning signals.',
    learnings:
      'Building from the ground up with a distributed, grant funded team has taught me how much product work is coordination work. Funding is uneven, contributors are global, and many people put in hours that are not fully compensated, so the architecture has to respect human capacity as much as technical correctness. The lesson is to keep the stack practical, keep the methodology close to communities, and build proof systems that people can actually understand, operate, and sustain.',
    links: [
      {
        label: 'View Site',
        link: 'https://greengoods.app',
      },
      {
        label: 'View Docs',
        link: 'https://docs.greengoods.app',
      },
      {
        label: 'View GitHub',
        link: 'https://github.com/greenpill-dev-guild/green-goods',
      },
    ],
  },
  greenpill: {
    title: 'Greenpill',
    description:
      'Building a global regenerative network through community strategy, developer programs, public learning, and partnerships',
    socialImage: projectSocialImage('greenpill', 'Greenpill'),
    cta: {
      label: 'View Greenpill',
      link: '/projects/greenpill',
    },
    platform: 'laptop',
    year: 2026,
    skills: [
      'Community Building',
      'Ecosystem Strategy',
      'Technical Program Leadership',
      'Developer Relations',
      'Workshop Facilitation',
      'Partnership Development',
    ],
    problem:
      'Greenpill is trying to solve a coordination problem that shows up across public goods, regenerative crypto, and local impact work. People have energy, skills, and shared values, but they are spread across cultures, time zones, funding systems, technical complexity, and local contexts. The network gives that energy a shared identity and a place to gather, learn, build trust, find collaborators, and turn ideas into useful work.',
    architecture:
      'The architecture is human first. Chapters ground the work in place. Guilds like the Dev Guild give builders a focused home. Stewards create rhythm through syncs, review, and shared decision making. Monthly calls, workshops, podcasts, books, field notes, and public resources move knowledge across the network. The website, live map, and Garden act as public orientation layers, helping people find the network, understand where they fit, and make chapter and steward work more legible, verifiable, and easier to support.',
    development:
      'I first came into Greenpill from the developer side, looking for people to build with around WEFA. I quickly realized there was more to learn inside a shared identity than I could by keeping everything as my own project. As the Dev Guild grew, my role expanded into community and ecosystem leadership. I lead product and tooling direction, contributor pathways, community calls, workshops, partnerships, and the public story around what the Dev Guild and wider network are building.',
    learnings:
      'Greenpill has taught me what it really means to build community across cultures, time zones, and limited resources. That is a different kind of work than building solo or joining a team with an established culture and rhythm. Trust has to be earned slowly. Communication has to make room for different contexts. The human moments matter, like bringing people together at ETHDenver 2025 for Greenpill House, cooking meals, learning from one another, and remembering that the network is not only tools and calls. It is relationships. This work has stretched me from an engineer and individual contributor into a team builder, community builder, and steward where the network needs one.',
    links: [
      {
        label: 'View Site',
        link: 'https://greenpill.network',
      },
      {
        label: 'View Github',
        link: 'https://github.com/greenpill-dev-guild/network',
      },
      {
        label: 'Watch Videos',
        link: 'https://www.youtube.com/@GreenpillNet',
      },
    ],
  },
  waves: {
    title: 'Waves',
    description: 'Fusing generative art and culture for live events',
    metaDescription:
      'A live-event and generative-art project exploring how artists, audiences, culture, and onchain collectibles can carry the memory of a show beyond the night',
    socialImage: projectSocialImage('waves', 'Waves'),
    cta: {
      label: 'View Waves',
      link: '/projects/waves',
    },
    platform: 'phone',
    year: 2024,
    skills: ['Solidity', 'ERC-6551', 'EAS', 'React', 'PWA'],
    problem:
      'Live experiences have lost their utility. Tickets disappear, merch is overpriced and disposable, the connections made in a crowd rarely outlast the night, and nothing onchain encapsulates the moment an artist and a room shared. Artists deserve more value for their art, and attendees deserve more than a shirt to remember a show by.',
    architecture:
      'Waves is built around two NFT primitives. A Synth, minted by an attendee at an event, is tied to a token bound account (ERC-6551). A Wave, created by the gen artist for that event, is caught by attendees at the right moment through an Ethereum Attestation Service attestation, then minted into the Synth’s TBA. After the show, attendees use the Waves they collected as color input for a generative art piece printed on apparel through whitelisted art contracts.',
    development:
      'The platform is a suite of PWAs powered by account abstraction. Organizers manage Synths and Waves from a dashboard. Attendees mint Synths and catch Waves from a mobile app at the event. A digital and physical storefront handles after event orders for NFC embedded apparel, with the option to pop up in person for live drops.',
    learnings:
      'Designing around event time changes the protocol. Waves only make sense if they can be caught in the moment they are released, so the architecture has to assume crowded, unreliable connectivity and a window of minutes, not days. Future work expands Wave properties beyond color into sound (music stems), opens gated features for Synth and Wave holders, and integrates Farcaster and Lens so social actions can mint Waves on their own.',
    links: [],
  },
  wefa: {
    title: 'WEFA',
    description:
      'Connecting people to nature and community through play, storytelling, and plant care',
    socialImage: projectSocialImage('wefa', 'WEFA'),
    cta: {
      label: 'View WEFA',
      link: '/projects/wefa',
    },
    platform: 'phone',
    year: 2022,
    skills: ['WebXR (Augmented Reality)', 'Typescript', 'Solidity', 'React'],
    problem:
      'Growing up, I was outside constantly, playing with neighbors and turning whatever environment we had into the game for that day. Gardening and lawn care felt like chores then, but looking back, they were part of the connective tissue of my community. I met one of my closest childhood friends when he offered to help pick up leaves. Now, having a home garden and growing vegetables, herbs, and fruit has given me a deeper appreciation for organic food, local ecology, and the patience plants require. WEFA comes from that reflection: a way for young people to plant deeper roots and for adults to reconnect with nature, community, and the places they live.',
    architecture:
      'WEFA turns plant care into a loop between physical plants, digital creatures, and local community action. The app uses augmented reality to make the real environment part of play, blockchain primitives to give people ownership over creatures and progress, and AI to support plant identification, care, and creature generation. The goal is not to make nature feel like a screen. It is to use familiar game patterns from Farmville, Minecraft, Pokemon Go, and MMOs to help people build short and long term habits around health, social connection, and sustainability.',
    development:
      'The story world for WEFA is still being shaped alongside the product. The current direction follows four college students in 2042, in a newly industrialized town in Nigeria that is now part of a larger country called Wau. Their university is funded by CoeUp, a multinational corporation built around a rare mineral discovery that has slowly damaged the local land and created an imbalance between two worlds. During a forest exhibition, the group wanders into a cave just as an earthquake opens a hidden passage to underground aquifers. Seeking safety, they follow the water deeper underground, bathe in it, and come out changed, fused with elemental powers they do not yet understand. Coming from different backgrounds, they have to learn trust, community, and stewardship as they work to understand what has been damaged and what restoration could look like.',
    learnings:
      'WEFA has helped me see storytelling as product infrastructure. The characters, comic direction, and game mechanics are still developing, but the goal is for the story to give the product emotional weight rather than sit beside it as marketing. As the world takes shape, I’m thinking through how physical and digital collectibles, creature packs, and planting milestones could connect without forcing the product to pretend it is further along than it is. The wider goal is to take what I learn from WEFA and feed it back into the public goods stack we are building through Greenpill, so lessons from one project can carry into the next.',
    links: [
      {
        label: 'View Site',
        link: 'https://www.wefa.world',
      },
      {
        label: 'View GitHub',
        link: 'https://github.com/wefa-labs',
      },
      {
        label: 'View Blog',
        link: 'https://blog.wefa.world',
      },
    ],
  },
  syn: {
    title: 'Synesthesia',
    description:
      'Using generative art to map your music taste into a personal visual signature',
    metaDescription:
      'A generative-art case study translating music history and Sound.xyz collection data into a personal visual signature',
    socialImage: projectSocialImage('synesthesia', 'Synesthesia'),
    cta: {
      label: 'View Synesthesia',
      link: '/projects/synesthesia',
    },
    platform: 'laptop',
    year: 2023,
    skills: ['Solidity', 'Go', 'GraphQL', 'React', 'XState'],
    problem:
      'Music experiences can feel flattened. Streaming turns taste into a feed, live shows often end with expensive merch that carries little utility, and the connection between artist, listener, and moment rarely becomes something lasting. Synesthesia explored a more personal bridge between listening and ownership: turning a person’s music history into generative art that could also unlock future perks, access, or experiences.',
    architecture:
      'The initial experience mapped a person’s Sound.xyz collection into a visual output, using genre as the bridge between music and color. A Go GraphQL backend queried Sound.xyz for a user’s sounds, while the React frontend fetched stats after wallet connection. If someone had not collected any sounds, the app fell back to liked tracks, and if there were none, it guided them back toward listening and collecting first. State lived across React hooks and XState, with React Spring handling transitions. Minting used an Art Blocks contract to generate a unique hash that became the input for the final generative artwork.',
    development:
      'My work started with figuring out which stats were worth querying and what the API needed to support. The early direction was more numerical, but I pushed the concept toward color and genre so the output could show similarity in taste without losing uniqueness. I built the API with gqlgen, helped shape the blockchain integration, and then worked on the frontend in parallel with design. One interaction I introduced was a grayscale interface before wallet connection that shifted into the user’s mapped colors once their stats loaded. Details like the Synth card and stats reel used React Spring to make the experience feel more alive without overpowering the art.',
    learnings:
      'Synesthesia taught me how much meaning can come from the translation layer between data and art. The project also made the live event opportunity clearer: if a listening history can become visual identity, an event can become a collectible memory with future utility. That thread eventually fed into Waves, and it sharpened how I think about generative art as a way to deepen the relationship between artists and fans.',
    links: [],
  },
  freeport: {
    title: 'Freeport',
    description:
      'Ushering in a new form of art and asset ownership with Decentralized Finance and NFTs',
    metaDescription:
      'A fine-art ownership platform case study about building authentication, asset galleries, notifications, and DeFi utility for an early web3 product',
    socialImage: projectSocialImage('freeport', 'Freeport'),
    cta: {
      label: 'View Freeport',
      link: '/projects/freeport',
    },
    platform: 'laptop',
    year: 2022,
    skills: ['DeFi (Decentralized Finance)', 'Solidity', 'Jotai', 'Next.js'],
    problem:
      'Ownership of fine art is not accessible to most people. Freeport aims to democratize art ownership and let users use their shares as liquidity for DeFi, opening up ownership to more people while leaning on blockchains for user security and autonomy.',
    architecture:
      'Given the project’s aim of giving art and asset ownership, the SEC and regulations played a huge role in how the app could function along with the partners needed to meet compliance. The frontend focus was on creating a personal and engaging experience that let users view their assets and use DeFi utility to take out liquidity or view assets in a 3D gallery. The backend was a Node.js API handling authentication with SIWE (Sign in with Ethereum) and connecting with external providers to place buy and sell orders on assets.',
    development:
      'When joining this project it was at an early stage with only a blog page built. The first focus was building authentication. Being a web3 app we used email login and SIWE so users could authenticate via email without a password alongside a crypto wallet. Focus then shifted toward notifications, a profile page, and the art gallery, which were complete features starting from the database schema using Prisma and GraphQL. In addition, I created smart contracts to enable the liquidity pool feature offered by the app, letting users access asset liquidity for DeFi protocols.',
    learnings:
      'Being a contract role, I was able to learn a ton in a short period of time. Developing and deploying contracts to a testnet was great experience in Solidity development and gave me confidence to keep building contracts. Working on a very early project also gave me a vantage point on how development looks at that stage. Having full autonomy for certain functionality showed where I can improve as a developer and iterate faster.',
    links: [
      {
        label: 'View Site',
        link: 'https://freeport.app',
      },
    ],
  },
  mira_connect: {
    title: 'Mira Connect',
    description:
      'Making connections more seamless and productive for field operators and office experts',
    socialImage: projectSocialImage('mira-connect', 'Mira Connect'),
    cta: {
      label: 'View Mira Connect',
      link: '/projects/mira-connect',
    },
    platform: 'laptop',
    year: 2020,
    skills: ['WebRTC', 'RabbitMQ', 'React', 'Websockets'],
    problem:
      'Mira Connect was one of Mira’s core products, but the existing video platform was limited to one expert and one headset operator at a time. Clients needed a more stable way to support field teams, bring in the right people, and keep a record of what happened during a call. The product needed to move from a two person call tool into a multiparty collaboration surface for industrial support.',
    architecture:
      'Because this was the next major version of a core product, the architecture had to balance reliability, speed, and the reality of field conditions. We used an external provider for TURN/STUN and media servers so larger calls could feel stable for clients. The UI shifted toward a multiparty meeting model with an industrial aesthetic, while product specific events like annotations, messages, ringing, and availability needed their own channel. We started with polling websockets and Redis, then moved to RabbitMQ and MQTT when reliability became the higher priority.',
    development:
      'I focused on the web client and used Storybook to build UI components in isolation while designs were still moving. On the state and data side, I built a MobX State Tree module for the external WebRTC provider and created modules for ringing, room join and leave flows, guest access, and meeting reports. After the alpha release exposed reliability issues in our websocket transport, I helped pivot the client toward a RabbitMQ backed message flow. From there we added call links, invites, guest calls, and meeting reports so external collaborators and organizations could join the workflow.',
    learnings:
      'This was the first project where I led architecture discussions, wrote initial PRDs for the web client, and created sequence and flow diagrams for team alignment. It also taught me the difference between leading as a sole contributor and leading a distributed team of contracted developers. The time zone gap made delegation and clarity more important. Technically, the project deepened my understanding of network protocols, complex state, and the need to be transparent when web, headset, and API changes affect one another.',
    links: [
      {
        label: 'Apple Acquisition Article',
        link: 'https://www.theverge.com/2023/6/6/23751350/apple-mira-ar-headset-startup',
      },
      {
        label: 'Mira LinkedIn',
        link: 'https://www.linkedin.com/company/miralabs',
      },
    ],
  },
  mira_flow: {
    title: 'Mira Flow',
    description:
      'Creating a companion to a handsfree app, enabling a unified platform for workflows',
    metaDescription:
      'A tablet workflow companion for Mira that brought forms, photos, review, and field-operator activity into the same industrial support platform',
    socialImage: projectSocialImage('mira-flow', 'Mira Flow'),
    cta: {
      label: 'View Mira Flow',
      link: '/projects/mira-flow',
    },
    platform: 'phone',
    year: 2019,
    skills: ['React Native', 'Swift', 'Typescript', 'MobX'],
    problem:
      'Mira’s headset workflows worked well for handsfree tasks, but clients also had workflows that were too input heavy for a headset alone. They needed a companion surface that could handle observation, forms, photos, and review while still belonging to the same workflow platform. A tablet app gave the company a way to support more use cases, keep more client work inside the product, and open a new revenue path.',
    architecture:
      'The stack needed to move quickly without splitting the team too far from its existing strengths. We chose React Native so web engineers could contribute and the Unity team could expose native modules where the app needed platform specific support. The harder architectural work was moving workflow and compliance logic from C# into TypeScript while respecting the differences between headset and tablet use. The final stack paired a Node.js API with a React Native client and Swift modules for queueing and uploading heavier workflow data.',
    development:
      'I started by rebuilding the workflow logic in TypeScript from an undocumented C# implementation. Once that foundation was working, I built the main app UI: authentication for individual and team login, tab navigation for workflows, recents, and history, and a directory style workflow browser that needed to feel fast on tablet. I then integrated the app with the API, including route updates so mobile activity could be tracked correctly in the database and analytics. For workflows with images, we moved uploads into a Swift queue so heavy file work did not block the JavaScript thread.',
    learnings:
      'Mira Flow was a big step forward in responsibility and my first real move into mobile development. React Native made the transition approachable, but the development rhythm and platform details were different enough to stretch me. The workflow engine also taught me how much clarity matters when translating complex conditional logic across platforms. One lesson that stuck was to avoid optimizing too early: it is usually better to get the full flow working clearly, then optimize the parts that are actually under pressure.',
    links: [
      {
        label: 'Apple Acquisition Article',
        link: 'https://www.theverge.com/2023/6/6/23751350/apple-mira-ar-headset-startup',
      },
      {
        label: 'Mira LinkedIn',
        link: 'https://www.linkedin.com/company/miralabs',
      },
    ],
  },
  gentle_monster: {
    title: 'Gentle Monster',
    description:
      'Reimagining the form and presentation of a unique and eccentric eyewear brand',
    socialImage: projectSocialImage('gentle-monster', 'Gentle Monster'),
    cta: {
      label: 'View Gentle Monster',
      link: '/projects/gentle-monster',
    },
    platform: 'laptop',
    year: 2018,
    skills: ['E-Commerce', 'React', 'Javascript', 'GraphQL'],
    problem:
      'In 2018, Gentle Monster needed an online store that felt closer to the brand’s physical world: bold, minimal, visual, and strange in the right ways. The site had to let campaign videos, product imagery, and the glasses themselves carry the experience while still behaving like a fast, usable ecommerce platform.',
    architecture:
      'The backend stack was already set in Python, with JavaScript on the frontend and GraphQL connecting the two. My early frontend focus was deciding how the GraphQL layer should be consumed, which led us to Apollo for its client tooling. Because the UI depended heavily on large images and video, the frontend architecture also had to account for lazy loading and performance so the brand direction did not come at the cost of usability.',
    development:
      'I joined about a week into development, when the initial backend work was in place and the frontend still needed to come together. I integrated GraphQL with Apollo, then moved into the core shopping surfaces: the home page, product listing page, product detail page, and payment flow. The home page used bold full screen heroes and carousels, the listing page used a flexbox grid with trailing animation because CSS Grid support was still partial, and the product detail page used a two column layout with scrollable imagery and fixed product information. GraphQL made the final payment integration with the backend much smoother than it would have been otherwise.',
    learnings:
      'This was my first full time role on a product team after mostly doing freelance client work. Stepping into that environment was energizing, but I also had to work through imposter syndrome and learn how professional software teams actually move. Having a supportive team and manager helped me settle in. The project gave me confidence, while also making it clear how much more I wanted to learn: stronger data structures, more advanced frontend patterns, and eventually TypeScript.',
    links: [
      {
        label: 'View Site',
        link: 'https://www.gentlemonster.com/',
      },
    ],
  },
} satisfies Record<ProjectSlug, ProjectRecord>
