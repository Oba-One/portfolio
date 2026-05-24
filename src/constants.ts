export const projects = {
  coop: {
    title: 'Coop',
    description:
      'A local-first browser extension and receiver PWA for capture, review, AI refinement, and shared group memory',
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
      'Coop is a browser-first, local-first system built as a Bun monorepo. The MV3 extension is the primary work surface for capture and review, the receiver PWA handles mobile and secondary-device intake, the shared package owns schemas and domain flows, and a small Hono API supports signaling and optional Yjs document sync. Raw capture stays local first; reviewed drafts, artifacts, board views, and proof material only enter shared coop state after a member chooses to publish them.',
    development:
      'The work has been about turning agentic software into a trustworthy group workflow. I shaped the capture, review, and publish loop; hardened receiver pairing and private intake; worked through local AI refinement across WebGPU, WASM, and heuristic tiers; and kept the release path honest by separating deterministic test proof from real browser and extension proof. The product is staged for browser-first use while onchain, archive, and privacy rails remain gated behind explicit modes.',
    learnings:
      'Coop has sharpened how I think about local-first AI. The hard part is not only running models near the user, it is deciding what should become shared memory at all. A useful agent has to preserve context, expose uncertainty, and make review feel lighter without removing human judgment. That has made Coop a practical bridge between my infrastructure work and the day-to-day coordination problems teams actually feel.',
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
      'An offline-first PWA bringing community and environmental actions on-chain to measure, track, and reward impact',
    cta: {
      label: 'View Green Goods',
      link: '/projects/green-goods',
    },
    platform: 'phone',
    year: 2026,
    skills: ['TypeScript', 'Solidity', 'Bun', 'Foundry', 'IPFS / Filecoin', 'EAS'],
    problem:
      'Grassroots ecological and social work happens far from reliable connectivity, and the impact of that work rarely makes it back to the funders, communities, or governance systems that should reward it. Most existing impact tools assume always-on internet and technical literacy that field operators do not have, leaving the people closest to the work without a credible way to prove what they have done.',
    architecture:
      'Green Goods is an offline-first Progressive Web App in two halves. Gardeners and community members submit regenerative actions from the field, queue them locally, and sync when a connection returns. Operators review and approve submissions, and approved results are anchored through Ethereum Attestation Service records and related on-chain modules. The Bun monorepo splits into client, admin, shared, contracts, indexer, and agent packages, with media and proof storage kept behind explicit operator paths.',
    development:
      'Built with the Greenpill Dev Guild as the field-facing layer of a four-part regen funding stack alongside Squad Staking, Allo Alliance, and GreenWill. The first alpha rolled out across global gardening communities, with v1.0.0 tagged and pilots continuing into 2026. The stack uses Vite plus TailwindCSS on the client, Bun for runtime, Foundry for contracts, and Playwright for E2E tests.',
    learnings:
      'Designing for offline-first changed how I think about data trust. Letting a phone collect attestations without a server forces the protocol layer to do the verification work the network usually does. Working in a stewarded, open collective also shifted how I scope features. Anything that demands a permanent core team to maintain is not the right shape for public-goods software, and the projects that survive are the ones a community can pick up and keep running.',
    links: [
      {
        label: 'View Site',
        link: 'https://greengoods.app',
      },
      {
        label: 'View Docs',
        link: 'https://docs.greengoods.app/builders/',
      },
      {
        label: 'View Github',
        link: 'https://github.com/greenpill-dev-guild/green-goods',
      },
    ],
  },
  greenpill: {
    title: 'Greenpill',
    description:
      'Stewarding public goods software, coordination infrastructure, and regenerative web3 work across Greenpill and the wider ecosystem',
    cta: {
      label: 'View Greenpill',
      link: '/projects/greenpill',
    },
    platform: 'laptop',
    year: 2026,
    skills: ['Astro', 'Directus', 'Hono', 'Postgres', 'Bun', 'Content Architecture'],
    problem:
      'Greenpill is not a single app. It is an ecosystem of chapters, guilds, projects, stories, events, funding experiments, and public goods tooling. That makes the work less about shipping one interface and more about keeping the public story, private operations, contributor pathways, and steward review loops aligned without leaking private context or flattening living work into a stale directory.',
    architecture:
      'The current Greenpill stack is packages-first. The public website is a static Astro site; Keystatic remains local for editorial composition; Directus and Postgres own operational content; a Fly-hosted Hono agent handles private intake, public snapshots, chapter impact payloads, and map-node workflows; and shared contracts define what is safe to expose. That same boundary thinking carries into Green Goods, GreenWill, builder spaces, grant reporting, and regen coordination work.',
    development:
      'My stewardship work has focused on making Greenpill easier to understand, safer to operate, and more useful to regenerative communities. That includes mapping content ownership across Keystatic, Directus, the static site, and the agent API; tightening plain-language themes for chapters and projects; shaping the Greenpill Garden as a low-pressure participation ramp; and aligning Green Goods, GreenWill, builder spaces, grants, and public stories into one coherent ecosystem narrative.',
    learnings:
      'Stewardship is architecture. A public network needs clean handoffs, clear source-of-truth boundaries, and language that newcomers can understand without losing the depth of the underlying ecosystem. This work has taught me to treat content, privacy, and contributor routing as product infrastructure, not as docs that sit beside the real system.',
    links: [
      {
        label: 'View Site',
        link: 'https://greenpill.network',
      },
      {
        label: 'View Github',
        link: 'https://github.com/greenpill-dev-guild/network',
      },
    ],
  },
  waves: {
    title: 'Waves',
    description: 'Fusing generative art and culture for live events',
    cta: {
      label: 'View Waves',
      link: '/projects/waves',
    },
    platform: 'phone',
    year: 2024,
    skills: ['Solidity', 'ERC-6551', 'EAS', 'React', 'PWA'],
    problem:
      'Live experiences have lost their utility. Tickets disappear, merch is overpriced and disposable, the connections made in a crowd rarely outlast the night, and nothing on-chain encapsulates the moment an artist and a room shared. Artists deserve more value for their art, and attendees deserve more than a t-shirt to remember a show by.',
    architecture:
      'Waves is built around two NFT primitives. A Synth, minted by an attendee at an event, is tied to a token-bound account (ERC-6551). A Wave, created by the gen artist for that event, is caught by attendees at the right moment through an Ethereum Attestation Service attestation, then minted into the Synth’s TBA. After the show, attendees use the Waves they collected as color input for a generative art piece printed on apparel through whitelisted art contracts.',
    development:
      'The platform is a suite of PWAs powered by account abstraction. Organizers manage Synths and Waves from a dashboard. Attendees mint Synths and catch Waves from a mobile app at the event. A digi-physical storefront handles post-event orders for NFC-embedded direct-to-garment apparel, with the option to pop up in person for live drops.',
    learnings:
      'Designing around event time changes the protocol. Waves only make sense if they can be caught in the moment they are released, so the architecture has to assume crowded, unreliable connectivity and a window of minutes, not days. Future work expands Wave properties beyond color into sound (music stems), opens token-gated features for Synth and Wave holders, and integrates Farcaster and Lens so social actions can mint Waves on their own.',
    links: [
      {
        label: 'View Site',
        link: 'https://waves.house',
      },
    ],
  },
  wefa: {
    title: 'WEFA',
    description: 'Connecting people to the environment and community in a fun way',
    cta: {
      label: 'View Project',
      link: '/projects/wefa',
    },
    platform: 'phone',
    year: 2022,
    skills: ['WebXR (Augmented Reality)', 'Typescript', 'Solidity', 'React'],
    problem:
      'Growing up I was outside all the time playing with local neighbors and using our environment to fit whatever game we were playing. During those times things like gardening or lawn care were viewed as chores and avoided activities. However, as I reflect back it was a connective tissue to my community and neighbors. I recall meeting one of my closest childhood friends through him offering to help pickup leaves. Now having a home garden and growing vegetables, herbs, and fruits has taught me the health benefits of organic food. With a greater appreciation and understanding for plants and our environment, I’m building WEFA as a way for youth to plant deeper roots and adults to reconnect or better connect with their community and nature.',
    architecture:
      'WEFA aims to make cultivating your environment fun whether it’s a single plant in a bedroom or a full garden. Many will ask how that can be fun. Many have tried and failed or downright find plants and caring for them boring. I’ll now ask how many play or have played games like Farmville, Minecraft, Pokemon Go, or WoW spending countless hours? For those who have or do, WEFA is a platform connecting nature and games with Augmented Reality, blockchains, and AI to create a symbiotic relationship between the two. Helping individuals and communities find short and long term success in health, social connection, and sustainability. I’ve told my story to WEFA, now below is the plot for the initial comic release of WEFA in correlation with the platform and initial game, think Pokemon meets Avatar: The Last Airbender.',
    development:
      'A group of college kids find themselves on an unexpected journey where worlds collide. Taking place in 2042 in a recently industrialized town in Nigeria now a part of a larger country called Wau (wa-ooo), with a newly minted university funded by a multinational corporation known as CoeUp. Known for a rare mineral finding almost 100 years ago and since then pillaging the local lands unknowingly causing an imbalance between two worlds. The brightest and most privileged students from all corners of the world are chosen to attend the university, with a few locals allowed. In an unexpected turn during a class forest exhibition the group gain a set of unique abilities when wandering off into a cave and an earthquake hits. Though all coming from different backgrounds they learn to trust each other, forging a deep connection not only to one another but to this new world and creatures they’ve found through their abilities. To address the issues caused by CoeUp, the group must lean on nature and community to find a solution and restore balance.',
    learnings:
      'WEFA’s comic release coincides with the app release. The comic is a physical and digital collectible that lets users redeem creature packs when planting their first plants, with story elements tying into gameplay for a cohesive experience between them. The wider goal is to take what we are learning on WEFA and feed it back into the public-goods stack we are building through Greenpill, so the lessons from one project carry forward into the next.',
    links: [
      {
        label: 'View Site',
        link: 'https://why.wefa.app',
      },
      {
        label: 'View Github',
        link: 'https://github.com/wefa-labs/wefa',
      },
    ],
  },
  syn: {
    title: 'Synesthesia',
    description:
      'Using generative art to map your music taste into a personal visual signature',
    cta: {
      label: 'View Synesthesia',
      link: '/projects/synesthesia',
    },
    platform: 'laptop',
    year: 2023,
    skills: ['Solidity', 'Go', 'GraphQL', 'React', 'XState'],
    problem:
      'Music driven experiences have become diluted, whether that is streaming music or going to a live show with high prices for merch that carries no utility or perks. Synesthesia uses generative art and blockchains to connect those experiences in a tangible way, turning a person’s listening history into unique generative art. The art itself has utility as an NFT that can unlock future experiences or perks like discounts on merch.',
    architecture:
      'The initial experience takes a synthesis of a person’s Sound.xyz collection and, based on the genres it contains, creates a visual output mapping genre to color. The app is built with a Go GraphQL backend that queries the Sound.xyz API to get a user’s sounds. The API is consumed by a React frontend that fetches user stats upon wallet connection. If a user has not bought sounds (NFTs), we defer to their liked sounds on the platform, and if there are none we encourage the user to first like and then purchase some. State is a combination of React hooks and XState alongside React Spring for animations. When minting, a user makes a transaction with an ArtBlocks-based contract that generates a unique hash used as the input to render the generative art.',
    development:
      'Initial development focused on determining what stats to query and what API we needed. The stats were originally more numerical, and after discussion I brought up the idea of colors and genres. A core goal of the art was to show similarity in taste and experiences while maintaining uniqueness. After settling on the stats data, I built on the API with gqlgen, a Go package, and during that time more thought went toward the blockchain integration. After the API was complete, the frontend was built in parallel with the designs. One idea I introduced was using grayscale before a user connected their wallet, then transitioning the interface to the colors mapped from the genres in their stats once they did. Other touches like the Synth card and stats reel were built with React Spring to animate the components.',
    learnings:
      'The project is still evolving as we determine the best path forward for product launch. We have ideas on how to apply this to live events, which is part of what eventually grew into Waves. I have personally learned a ton about generative art and its potential to connect music and listeners, alongside creating a deeper relationship between artists and fans.',
    links: [
      {
        label: 'View Site',
        link: 'https://beta.syn.art',
      },
    ],
  },
  freeport: {
    title: 'Freeport',
    description:
      'Ushering in a new form of art and asset ownership with Decentralized Finance and NFTs',
    cta: {
      label: 'View Project',
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
      'When joining this project it was at an early stage with only a blog page built. The first focus was building authentication. Being a web3 app we used email login and SIWE so users could authenticate via email without a password alongside a crypto wallet. Focus then shifted toward notifications, a profile page, and the art gallery, which were end-to-end features starting from the database schema using Prisma and GraphQL. In addition, I created smart contracts to enable the liquidity pool feature offered by the app, letting users access asset liquidity for DeFi protocols.',
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
    cta: {
      label: 'View Project',
      link: '/projects/mira-connect',
    },
    platform: 'laptop',
    year: 2020,
    skills: ['WebRTC', 'RabbitMQ', 'React', 'Websockets'],
    problem:
      'As one of the core products of Mira, we wanted to revamp the video chat platform to enable clients to be more productive while providing a more stable environment for headset operators in the field. In the previous version of the video platform only two people could be in a call. To enable our clients to more effectively help headset and mobile operators in the field, we updated to a multiparty call structure while adding features such as invites, guest calls, and meeting reports.',
    architecture:
      'The team spent a good amount of time determining how to architect the app given it was the next major version of a core product. To facilitate larger calls, using a provider for the turn/stun and media servers was the most optimal path for a good UX. Another key element was revamping the UI to work in a multi-call fashion, adopting a layout similar to Google Meet with an industrial aesthetic. Lastly, communication between clients that was not facilitated by the provider, such as annotations, messages, and availability, needed its own channel. We initially used polling websockets on the client, sending status every few seconds and updating a Redis store. During development we switched to a more robust messaging tool with RabbitMQ and MQTT for message reliability and faster communication.',
    development:
      'Focusing on the web client, initial UI work was done with Storybook to build components in isolation and quickly iterate on shifting designs. On the state and data side I built a new module to interface with our third-party WebRTC provider using MobX State Tree. I also created modules for internal services such as ringing and joining or leaving a room, along with post-meeting reports. After the initial alpha release we realized our message transport was unreliable on websockets, so we pivoted to a message broker using RabbitMQ which greatly improved reliability. We then continued to integrate new features such as call links and invites, exposing meetings to external guests and organizations.',
    learnings:
      'Leading a project as a sole contributor was much simpler than leading a team, in this case contracted developers based in Romania. Navigating the time difference and delegating work was challenging at times but overall a rewarding experience. It was also the first project where I led the architecture discussions, creating initial PRDs for the web, sequence and flow diagrams, and more. This taught me more about network protocols and how they transfer data in different manners along with complex state management. Lastly, cross-team collaboration across the headset, web, and API teams is not always easy, and being transparent when making changes that may affect another team is the best way to avoid friction.',
    links: [
      {
        label: 'Learn More',
        link: 'https://web.archive.org/web/20231014040214/https://www.mirareality.com/connect/',
      },
    ],
  },
  mira_flow: {
    title: 'Mira Flow',
    description:
      'Creating a companion to a handsfree app, enabling a unified platform for workflows',
    cta: {
      label: 'View Project',
      link: '/projects/mira-flow',
    },
    platform: 'phone',
    year: 2019,
    skills: ['React Native', 'Swift', 'Typescript', 'MobX'],
    problem:
      'Clients doing handsfree workflows with headsets wanted to bring all of their workflow onto the platform. To enable that, they needed another way to complete workflows that were input heavy and could be held in hand. A tablet companion app was the most ideal way to address it. This would be useful for work that was more observation than manipulation based, letting those workflows live on the same platform and adding another source of revenue for the company.',
    architecture:
      'Given this was a new platform being added to the product, it was important to pick the right tools given the team’s skill set and the urgency to release an MVP. Through discussions we settled on React Native, which let the web and unity teams contribute, with Unity writing native modules that React Native could hook into. At the business logic level we had to transfer our workflow and compliance logic into TypeScript. Within this process some differences between how workflows should function on the headset versus a mobile device emerged, with tweaks made to accommodate each platform. The final stack consisted of a Node.js API and a React Native client with Swift modules for data queueing and uploading.',
    development:
      'The first element to key in on was the workflow logic, writing it in TypeScript. This was one of the more challenging aspects because we had no documentation on our logic and only a version written in C#. After transferring logic, the next step was building the UI, which consisted of a tab based navigation with tabs to view workflows, recent workflows, and history, along with authentication views for individual and team login. The workflow tab was a directory style view where users could click into folders, which was fun to architect and optimize. Once the UI was complete, integration with the API started, and some routes needed to be updated to add a new platform (mobile) for database and analytics purposes. Lastly, to optimize the uploading of workflows which could contain images, we built a queue in Swift to offload that process from the single JavaScript thread, improving UI performance.',
    learnings:
      'This was a huge step forward for me in responsibility and leading a project. It was also my first time stepping into mobile development which, though using React Native, was a different development process with subtle differences in code. The workflow logic was a fun exercise in building complex logic and conditional flows. One thing I learned was to avoid over-optimizing too early in a project, which actually causes more performance issues. It is a lot simpler to complete the initial flow and structure, then focus on optimization.',
    links: [
      {
        label: 'Learn More',
        link: 'https://web.archive.org/web/20231014040214/https://www.mirareality.com/flow/',
      },
    ],
  },
  gentle_monster: {
    title: 'Gentle Monster',
    description:
      'Reimagining the form and presentation of a unique and eccentric eyewear brand',
    cta: {
      label: 'View Project',
      link: '/projects/gentle-monster',
    },
    platform: 'laptop',
    year: 2018,
    skills: ['E-Commerce', 'React', 'Javascript', 'GraphQL'],
    problem:
      'In 2018 Gentle Monster was looking to revamp their online presence with a more modern and performant UI. They wanted to focus on a UI/UX that was bold and minimal, letting users focus on the unique content from video promos and the glasses themselves.',
    architecture:
      'Joining the project, the stack was already set as Python on the backend and JavaScript on the front, with GraphQL connecting the two. On the frontend the initial focus was determining how GraphQL would be integrated, settling on Apollo as the client. The UI, given its emphasis on images, was architected to lazy load images and videos to improve performance.',
    development:
      'I joined the team about a week into development with the initial backend being the only work completed. The first task was integrating GraphQL with Apollo due to its comprehensive tooling. With the data layer completed I switched focus to the UI, creating the home, product detail, and products pages. The home page was mainly a use of flexbox and carousels for product viewing with bold full-screen heroes throughout. The products page was a grid layout using flexbox (at the time css-grid had partial support) with a trailing animation. The product detail page was more complex with a two column layout, the left being scrollable and the right fixed. Lastly was integrating the payment flow with the backend, which thanks to GraphQL was pretty seamless.',
    learnings:
      'This was my first full time role working in a team. Before this point I had mainly done freelance work for clients. Stepping into a team environment was invigorating and gave me a boost in confidence and peers to learn from. Initially I had imposter syndrome, having not worked in a professional software environment, and it took some time to settle into the role. It helped having a supportive team and manager in navigating the environment. One of the key takeaways is I had more to learn as a developer, from advanced methods to data structures to new languages like TypeScript.',
    links: [
      {
        label: 'View Site',
        link: 'https://gentlemonster.com',
      },
    ],
  },
}
