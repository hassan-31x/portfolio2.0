export type ClientProject = {
  title: string
  slug: string
  href: string
  category: string
  description: string
  capabilities: string[]
}

export type ClientProjectGroup = {
  id: string
  title: string
  description: string
  projects: ClientProject[]
}

export const clientProjectGroups: ClientProjectGroup[] = [
  {
    id: 'automotive',
    title: 'Automotive & dealership platforms',
    description: 'Connected software and individual showroom experiences for the UK motor trade.',
    projects: [
      {
        title: 'MyDealershipView',
        slug: 'mydealershipview',
        href: 'https://mydealershipview.com/',
        category: 'Dealer management system',
        description:
          'A dealership operations platform connecting vehicle stock, customer enquiries, sales, invoicing, and workshop workflows in one place.',
        capabilities: ['Stock management', 'CRM & sales', 'Invoicing'],
      },
      {
        title: 'MYDV Marketing',
        slug: 'mydv-marketing',
        href: 'https://marketing.mydealershipview.com/',
        category: 'Marketing automation',
        description:
          'Inventory connected marketing for car dealers, with scheduled stock posts, social channels, and vehicle listings managed from a central workspace.',
        capabilities: ['Social scheduling', 'Stock feeds', 'Listings'],
      },
      {
        title: 'MWA Autos',
        slug: 'mwa-autos',
        href: 'https://mwaautosltd.co.uk/',
        category: 'Dealership website',
        description:
          'An online showroom for a family run Nottingham dealership, bringing searchable used car stock, vehicle details, finance, and part exchange enquiries together.',
        capabilities: ['Vehicle search', 'Finance enquiries', 'Part exchange'],
      },
      {
        title: 'Ideal Car',
        slug: 'ideal-car',
        href: 'https://idealcarltd.co.uk/',
        category: 'Dealership website',
        description:
          'A vehicle browsing experience for a Nottingham showroom, with make and model search, featured stock, and a finance calculator to help buyers plan their next car.',
        capabilities: ['Stock catalogue', 'Finance calculator', 'Enquiries'],
      },
      {
        title: 'Empire Autos',
        slug: 'empire-autos',
        href: 'https://empire-autos.co.uk/',
        category: 'Dealership website',
        description:
          'A digital forecourt for a Nottinghamshire used car specialist, presenting current stock alongside finance options, part exchange, and dealership information.',
        capabilities: ['Vehicle listings', 'Buyer enquiries', 'Finance'],
      },
      {
        title: 'Autoprestige Cars',
        slug: 'auto-prestige',
        href: 'https://autoprestigecars.co.uk/',
        category: 'Prestige automotive website',
        description:
          'A showroom for prestige and performance cars, pairing vehicle discovery with finance applications, warranty information, and a sell your car enquiry journey.',
        capabilities: ['Online showroom', 'Car finance', 'Vehicle sourcing'],
      },
      {
        title: 'BuyBrand Car Centre',
        slug: 'buy-brand',
        href: 'https://buybrandcarcentre.co.uk/',
        category: 'Dealership website',
        description:
          'A distinctive showroom site built around a Chatham warehouse car centre, with searchable stock, detailed vehicle pages, and a clear route to arranging a visit.',
        capabilities: ['Stock search', 'Vehicle details', 'Visit enquiries'],
      },
      {
        title: 'Al Harthy Motor Group',
        slug: 'al-harthy',
        href: 'https://alharthymotorgroup.co.uk/',
        category: 'Dealership website',
        description:
          'A considered, appointment led showroom for an independent Leeds dealer, highlighting vehicle specifications, recent arrivals, and part exchange enquiries.',
        capabilities: ['Vehicle catalogue', 'Viewing enquiries', 'Part exchange'],
      },
    ],
  },
  {
    id: 'business-commerce',
    title: 'Business platforms & commerce',
    description:
      'Customer portals, growth websites, and storefronts for service and retail businesses.',
    projects: [
      {
        title: 'Useryze',
        slug: 'useryze',
        href: 'https://www.useryze.com/',
        category: 'Growth agency website',
        description:
          'A conversion focused agency website presenting growth, SEO, and paid media services, connecting service discovery, customer journeys, and consultation booking.',
        capabilities: ['Service pages', 'Lead capture', 'CMS'],
      },
      {
        title: 'PostalNook',
        slug: 'postalnook',
        href: 'https://postalnook.com/',
        category: 'Virtual mailbox platform',
        description:
          'A digital mail platform with customer and operator workflows for mailbox rentals, mail management, recipient onboarding, and subscription billing.',
        capabilities: ['Customer portal', 'Mail operations', 'Subscriptions'],
      },
      {
        title: 'Marc Robinson Jewelers',
        slug: 'marc-robinson',
        href: 'https://www.marcrobinsonjewelers.com/',
        category: 'Jewelry commerce',
        description:
          'A jewelry and luxury watch shopping experience with collection browsing, engagement ring discovery, and appointment enquiries for a personal showroom visit.',
        capabilities: ['Jewelry catalogue', 'Ring discovery', 'Appointments'],
      },
      {
        title: 'M Robinson Fine Jewelers',
        slug: 'm-robinson',
        href: 'https://www.mrobinsonjewelers.com/',
        category: 'Luxury retail website',
        description:
          'A brand led website for an Austin fine jeweler, showcasing designer jewelry, distinguished watchmakers, and the personal experience of its Bee Cave showroom.',
        capabilities: ['Brand collections', 'Showroom discovery', 'Shopify'],
      },
      {
        title: 'Sijara Jewelry',
        slug: 'sijara',
        href: 'https://sijarajewelry.com/',
        category: 'Brand launch experience',
        description:
          'A jewelry launch experience with product imagery and an email signup journey, giving visitors a first look at the brand ahead of its collection release.',
        capabilities: ['Launch page', 'Email signup', 'Shopify'],
      },
      {
        title: 'Treasures Jewelers',
        slug: 'treasures',
        href: 'https://treasuresjeweler.com/',
        category: 'Jewelry storefront',
        description:
          'A jewelry storefront for diamonds, gold, and everyday pieces, with category browsing, collection discovery, and email signup for new releases and offers.',
        capabilities: ['Collections', 'Shopping cart', 'Shopify'],
      },
      {
        title: 'GT Solutions USA',
        slug: 'gt-solutions',
        href: 'https://gtsolutionsusa.com/',
        category: 'Digital agency website',
        description:
          'A service focused website introducing a digital agency’s web development, mobile applications, marketing, and branding work, with direct contact paths for new clients.',
        capabilities: ['Service discovery', 'Agency portfolio', 'Contact enquiries'],
      },
    ],
  },
  {
    id: 'freelance',
    title: 'Freelance projects',
    description: 'Independent website work for retail and hospitality businesses.',
    projects: [
      {
        title: 'Chairlaxed',
        slug: 'chairlaxed',
        href: 'https://chairlaxed.com/',
        category: 'Massage chair retail',
        description:
          'A retail website for luxury massage chairs and recliners, helping customers explore products, discover rental options, and read customer experiences.',
        capabilities: ['Product discovery', 'Chair rentals', 'Customer reviews'],
      },
      {
        title: 'Bordsteinschwalbe',
        slug: 'bordsteinschwalbe',
        href: 'https://www.bordsteinschwalbefoodtruck.com/',
        category: 'Food truck & event catering',
        description:
          'A German language catering website showcasing street food menus, event packages, and mobile bars, with an enquiry journey for weddings, festivals, and corporate events.',
        capabilities: ['Catering packages', 'Menu showcase', 'Event enquiries'],
      },
    ],
  },
]

export const clientProjects = clientProjectGroups.flatMap((group) => group.projects)
