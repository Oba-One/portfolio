export const projects = {
  dao_squad: {
    title: 'DAO Squad',
    description:
      "DAO Squad is a community of DAO enthusiasts and builders. We're building a DAO for DAOs.",
    cta: {
      label: 'View DAO Squad',
      link: '/projects/dao-squad',
    },
    platform: 'web',
    year: 2023,
    skills: ['Solidity', 'React', 'Filecoin', 'Unity'],
    problem:
      "DAOs are hard to build and maintain. There's no community for DAO builders.",
    architecture: '',
    development: '',
    learnings: '',
    links: [
      {
        label: 'Site',
        link: 'https://daosquad.dev',
      },
      {
        label: 'Code',
        link: 'https://github.com/oba-one/dao-squad',
      },
      {
        label: 'Diagrams',
        link: 'https://miro.com/app/board/o9J_lZ2ZQqU=/',
      },
    ],
  },
  wefa: {
    title: 'WEFA',
    description:
      'Connecting people to the environment and community in a simple & fun way',
    cta: {
      label: 'View project',
      link: '/projects/wefa',
    },
    platform: 'mobile',
    year: 2021,
    skills: ['WebXR (Augmented Reality)', 'Typescript', 'Solidity', 'React'],
    problem:
      'Nowadays many people are less connected to their environment and by extension community. Lacking knowledge on nature and how to cultivate plants for both ecological and individual health. WEFA aims to build a simple and fun app to interface with nature, plant nurturing, learning and playing games.',
    architecture:
      'Built to be Web3 focused, the stack of WEFA can be broken down into three core parts, interface, logic, and data. The interface is a web based AR client using WebXR, React, and Typescript. Logic is handled by smart contracts on an ethereum based blockchain for the app and game along with AI/ML APIs for plant detection and planting. Data is also stored on a blockchain, for more assets (image. video) focused ones Filecoin’s FVM is used.',
    development: '',
    learnings: '',
    links: [
      {
        label: 'Site',
        link: 'https://wefa.app',
      },
      {
        label: 'Github',
        link: 'https://github.com/wefa-tech',
      },
      {
        label: 'Diagrams',
        link: 'https://miro.com/app/board/o9J_lZ2ZQqU=/',
      },
    ],
  },
  freeport: {
    title: 'Freeport',
    description: 'Ushering in a new form of art and asset ownership',
    cta: {
      label: 'View wesbsite',
      link: '/projects/freeport',
    },
    platform: 'web',
    year: 2022,
    skills: ['DeFi (Decentralized Finance)', 'Solidity', 'Jotai', 'Next.js'],
    problem:
      'Accessing ownership of fine arts isn’t that accessible to  many people. Freeport aims to democratize art ownership and enable users to use their shares as liquidity for DeFi uses. Opening up ownership to more people and using blockchains for user security and autonomy.',
    architecture:
      ' Given the project aim on giving art/asset ownership the SEC and regulations played a huge role in how the app could function along with the partners needed to meet compliance. The frontend focus was on creating a personal and engaging experience for the user enabling them to view their assets and have DeFi utility to take out liquidity or view them in a fun 3D manner. On the backend was a Node.js api handling authentication of users with SIWE (Sign in with Ethereum) and connecting with external providers to place buy/sell orders on assets.',
    development:
      'When joining this project it was at an extremely early age with only a blog page built. 1st focus was building authentication which being a web3 app we used email login & SIWE to enable users to use their email without a password and crypto wallet. The focus then shifted towards notifications, profile page and the art gallery which were E2E features starting from the database schema using Prisma and GraphQL. In addition I created smart contracts to enable the liquidity pool feature offered by the app. ',
    learnings:
      'Being a contract role I was able to learn a ton in a short period of time. First developing and deploying contracts to a testnet was great experience in solidity development and gave me confidence to continue building contracts. Also working on a very early project allowed me to gain the vantage point of how development is at that stage. Having full autonomy for certain functionality showed where I can improve as a developer and iterate faster. ',
    links: [
      {
        label: 'Site',
        link: 'https://freeport.app',
      },
    ],
  },
  mira_connect: {
    title: 'Mira Connect',
    description: 'Making connections more seamless and productive',
    cta: {
      label: 'View project',
      link: '/projects/mira-connect',
    },
    platform: 'web',
    year: 2020,
    skills: ['WebRTC', 'RabbitMQ', 'React', 'Websockets'],
    problem:
      'As one of the core products of Mira we wanted to revamp the video chat platform to enable clients to be more productive while providing a more stable environment to facilitate headset operators in the field. In the previous version of the video platform only two people could be in a call similar to a phone call with no add functionality. To enable our clients to more effectively help headset and mobile operators in the field we updated to a multiparty based call to room based structure while adding more features such as invites, guest calls, and meeting reports',
    architecture:
      'The team spent a good amount of time determining how to architect the app, given it was the next major version of a core product. In order to facilitate larger calls using a provider for the turn/stun and media servers was the most optimal path for a good UI. Another key element was revamping the UI to work in a multi call fashion adopting a UI similar to Google meets with an industrial aesthetic. Lastly was communication between clients that was not facilitated by the provider such as annotations, chat, and availability. We initially used polling websockets on the client who would update the status every few seconds and update a redis store on the server with our status. During development we switched to a more robust messaging tool with RabbitMQ to have message confirmation.',
    development:
      'Focusing on the web client, initial UI work was done with Storybook to build the components in isolation and quickly iterate upon shifting designs. On the state/data management side I built a new module to interface with our 3rd party provider of webRTC call services using MobX State Tree. In addition I created modules for our internal services such as ringing and joining/leaving a room along with post meeting reports. After the initial alpha release we realized our message transport was unreliable with websockets. We pivoted to integrating a message broker using RabbitMQ which greatly helped reliability. After we continued to integrate new features such as call links and invites exposing meetings to external guests and organizations.',
    learnings:
      ' Leading a project as an individual contributor was much simpler than leading a team, in this case contracted developers based in Romania. Having to traverse the time difference and delineate work at times was challenging but overall a rewarding experience. Also was the 1st project where I led the architecture discussions creating initial PRDs for the web, sequence and flow diagrams, and more. This taught me more about network protocols and how they transfer data in different manners. Lastly cross team collaboration from the headset, web and api is not always easy and being transparent is the best way to avoid friction.',
    links: [
      {
        label: 'Site',
        link: 'https://www.mirareality.com/connect',
      },
    ],
  },
  mira_flow: {
    title: 'Mira Flow',
    description: 'Creating a companion to handsfree workflows',
    cta: {
      label: 'View project',
      link: '/projects/mira-flow',
    },
    platform: 'mobile',
    year: 2019,
    skills: ['React Native', 'Swift', 'Typescript', 'MobX'],
    problem:
      'Clients doing handsfree workflow with headsets wanted to fully transfer all workflow to the platform. In order to enable that they needed another form to complete workflows that were input heavy and could be held in hand. To facilitate this a tablet companion app was seen as the most ideal way to address the issue. This would be useful for work that was more observation rather than manipulation based and allow those workflows to live on the same platform. Add another source of revenue for the platform.',
    architecture:
      "Given this was a new platform being added to the product it was important to key in on the best tools to use given the team's skills as web developers and urgency to release an MVP.. Through discussion React Native was settled upon as the best option enabling the web and unity teams to contribute, with unity being able to write native modules React Native could hook in to. At the business logic level we had to transfer our workflow/compliance logic into Typescript. Within this process some difference between how workflows should function on the headset vs mobile device emerged with tweaks being made to accommodate the platform. The final stack consisted of a Node.js API, React Native client with Swift modules for data queueing/uploading.",
    development:
      'First element to key in on was the workflow logic writing it in Typescript. This was one of the more challenging aspect having no documentation on our logic and only a version written in C#. After transferring logic, the next step was building the UI which consisted of a tab based navigation with tabs to view workflows, recent workflows, and history along with authentication views for individual and team login. The workflow tab was a directory style view where users can click into folders, this was fun to architect and optimize. Once the UI was completed integration with the API started, some routes needed to be updated to add a new platform, mobile, for database and analytical purposes. Lastly to optimize the uploading of workflows which may contain images we built a queue in Swift to offload that process from the single javascript thread improving UI performance. ',
    learnings:
      'This was a huge step forward for me in responsibility and leading a project. Along with my 1st time stepping into mobile development which though using React Native still was a different development process and subtle difference in code. Within the code the workflow logic was a fun exercise in building complex logic and conditional flows. One thing I learned to improve was over optimizing too early in a project which actually causes more performance issues, it’s a lot simpler to complete the initial flow and structure then key in on optimization. ',
    links: [
      {
        label: 'Site',
        link: 'https://www.mirareality.com/flow',
      },
    ],
  },
  gentle_monster: {
    title: 'Gentle Monster',
    description: 'Reimagining form and presentation',
    cta: {
      label: 'View project',
      link: '/projects/gentle-monster',
    },
    platform: 'web',
    year: 2018,
    skills: ['E-Commerce', 'React', 'Javascript', 'GraphQL'],
    problem:
      'In 2018 Gentle Monster was looking to revamp their online presence with a more modern and performant UI. They wanted to focus on creating a UI/UX that was bold and minimal, allowing users to focus on the unique content from video promos and glasses themselves.',
    architecture:
      'Joining the project the stack had been set as python on the backend and javascript on the front, with GraphQL connecting the two. Being focused on the frontend the initial focus was determining how GraphQL would be integrated settling with Apollo as the client along with how to be performant given the quality of images and videos being loaded.',
    development:
      ' I joined the team about a week into development with the initial backend being the only work completed. The 1st task was integrating GraphQL with Apollo due to its comprehensive tooling. With the data layer completed I switched focus to the UI creating the home, products, and product detail pages. The home page was mainly a use of flexbox and carousels for product viewing with bold full screen hero media throughout. The products page was a grid layout using flexbox at the time the grid had partial support and a trailing animation. The product detail page was the more complex with a two column layout with the left being scrollable and right fixed. Lastly was integrating the payment flow with the backend which due to graphQL was pretty seamless and simple.',
    learnings:
      'This was my 1st full time role working in a team, before this point I mainly had done freelance work for clients. Stepping into a team environment was invigorating and gave me a boost in confidence and peers to learn from. Initially I had imposter syndrome having not worked in a professional software environment and it took a week to settle into the role. It helped having a supportive team and manager in traversing the environment. One of the key things I learned is I had more to learn as a developer from advanced methods, data structures, and new languages like Typescript. ',
    links: [
      {
        label: 'Site',
        link: 'https://gentlemonster.com',
      },
    ],
  },
};
