export interface NavSubItem {
  title: string;
  href: string;
}

export interface NavSubGroup {
  title: string;
  items: NavSubItem[];
}

export interface NavItem {
  title: string;
  href: string;
  megaMenu?: NavSubGroup[];
  badge?: string;
}

export const navigationItems: NavItem[] = [
  {
    title: "Infant",
    href: "/category/infant",
    megaMenu: [
      {
        title: "Infant (0–2 Years)",
        items: [
          { title: "Cotton Wear", href: "/category/infant/cotton-wear" },
          { title: "Rompers", href: "/category/infant/rompers" },
          { title: "Sets & Suits", href: "/category/infant/sets-suits" },
          { title: "Night Dresses", href: "/category/infant/night-dresses" },
          { title: "Party Wear", href: "/category/infant/party-wear" },
        ],
      },
    ],
  },
  {
    title: "Boys",
    href: "/category/boys",
    megaMenu: [
      {
        title: "Boys (1–12 Years)",
        items: [
          { title: "Shirts", href: "/category/boys/shirts" },
          { title: "Sets & Suits", href: "/category/boys/sets-suits" },
          { title: "Night Dresses", href: "/category/boys/night-dresses" },
        ],
      },
    ],
  },
  {
    title: "Girls",
    href: "/category/girls",
    megaMenu: [
      {
        title: "Girls",
        items: [
          { title: "Party Dresses / Gowns", href: "/category/girls/party-dresses" },
          { title: "Frocks", href: "/category/girls/frocks" },
          { title: "Cotton Wear (0–5 Years)", href: "/category/girls/cotton-wear" },
          { title: "Casual & Daily Wear", href: "/category/girls/casual-wear" },
          { title: "Night Dresses", href: "/category/girls/night-dresses" },
          { title: "Sets & Suits", href: "/category/girls/sets-suits" },
        ],
      },
    ],
  },
  {
    title: "Ethnic Wear",
    href: "/category/ethnic-wear",
    megaMenu: [
      {
        title: "Boys (6–14 Years)",
        items: [
          { title: "Kurta Pyjama Set", href: "/category/ethnic-wear/kurta-pyjama" },
          { title: "Kurta with Jacket", href: "/category/ethnic-wear/kurta-jacket" },
          { title: "Kurta Dhoti", href: "/category/ethnic-wear/kurta-dhoti" },
          { title: "Short Kurta", href: "/category/ethnic-wear/short-kurta" },
        ],
      },
      {
        title: "Girls (6–14 Years)",
        items: [
          { title: "Kurta Set", href: "/category/ethnic-wear/kurta-set" },
          { title: "Lehenga Choli", href: "/category/ethnic-wear/lehenga-choli" },
          { title: "Dupatta Set", href: "/category/ethnic-wear/dupatta-set" },
          { title: "Dhoti Set", href: "/category/ethnic-wear/dhoti-set" },
          { title: "Sharara Set", href: "/category/ethnic-wear/sharara-set" },
        ],
      },
    ],
  },
  {
    title: "Western Wear",
    href: "/category/western-wear",
    megaMenu: [
      {
        title: "Boys",
        items: [
          { title: "Jacket", href: "/category/western-wear/boys-jacket" },
          { title: "T-Shirt", href: "/category/western-wear/boys-tshirt" },
        ],
      },
      {
        title: "Girls",
        items: [
          { title: "Top", href: "/category/western-wear/girls-top" },
        ],
      },
    ],
  },
  {
    title: "Best Seller",
    href: "/category/best-seller",
  },
  {
    title: "Sale",
    href: "/category/sale",
  },
  {
    title: "Festive Collection",
    href: "/category/festive",
  },
];
