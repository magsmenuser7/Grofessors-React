export interface Venture {
  id: string;
  name: string;
  tagline: string;
  shortDescription: string;
  heroImage: string;
  logo: string;
  primaryCTA: {
    label: string;
    url: string;
  };
  secondaryCTA?: {
    label: string;
    url: string;
  };
  kpis: Array<{
    label: string;
    value: string;
  }>;
  pillars: Array<{
    title: string;
    outcome: string;
  }>;
  gallery: string[];
  pressLinks: Array<{
    title: string;
    outlet: string;
    url: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  teaserSummary: string;
  heroImage: string;
  category: 'Innovation' | 'Strategy' | 'Ecosystem' | "Founder's Note";
  author: string;
  date: string;
  readTime: string;
  relatedVentures?: string[];
}

export interface PressItem {
  id: string;
  title: string;
  outlet: string;
  date: string;
  url: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedinUrl: string;
}