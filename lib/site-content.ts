import { Locale } from "@/lib/i18n";
import { getSupabaseClient } from "@/lib/supabase";

export type SeoData = {
  title: string;
  description: string;
  keywords: string[];
};

export type LinkData = {
  label: string;
  href: string;
};

export type HeroBlock = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: LinkData;
  secondaryCta: LinkData;
};

export type StatItem = {
  value: string;
  label: string;
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type AudienceItem = {
  title: string;
  description: string;
  action: LinkData;
};

export type TimelineItem = {
  title: string;
  description: string;
};

export type SponsorTier = {
  name: string;
  audience: string;
  benefits: string[];
};

export type VolunteerTrack = {
  title: string;
  description: string;
};

export type HomeContent = {
  seo: SeoData;
  hero: HeroBlock;
  stats: StatItem[];
  audiencePaths: AudienceItem[];
  competitionPath: TimelineItem[];
  sponsorBenefits: FeatureItem[];
  editorialHighlights: FeatureItem[];
};

export type GenericPageContent = {
  seo: SeoData;
  hero: HeroBlock;
  sections: {
    title: string;
    body: string[];
  }[];
};

export type CompetitionPageContent = GenericPageContent & {
  structure: FeatureItem[];
  eventFlow: TimelineItem[];
};

export type AchievementItem = {
  year: string;
  title: string;
  description: string;
  highlight: string;
};

export type AchievementsPageContent = GenericPageContent & {
  impactMetrics: StatItem[];
};

export type EventItem = {
  slug: string;
  title: string;
  status: string;
  dateLabel: string;
  location: string;
  summary: string;
  details: string[];
};

export type EventsPageContent = GenericPageContent & {
  volunteerTracks: VolunteerTrack[];
};

export type SponsorsPageContent = GenericPageContent & {
  tiers: SponsorTier[];
  benefits: FeatureItem[];
};

export type SiteSettings = {
  organizationName: string;
  tagline: string;
  location: string;
  contactLabel: string;
  contactValue: string;
  whatsappLabel: string;
  whatsappValue: string;
  email: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
};

type SitePageRow = {
  slug: string;
  locale: Locale;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  payload: Record<string, unknown> | null;
};

type AchievementRow = {
  year: number;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  highlight_en: string;
  highlight_ar: string;
  sort_order: number;
};

type EventRow = {
  slug: string;
  status: string;
  starts_at: string | null;
  ends_at: string | null;
  venue_en: string | null;
  venue_ar: string | null;
  city_en: string | null;
  city_ar: string | null;
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  details_en: string[] | null;
  details_ar: string[] | null;
  sort_order: number;
};

type SettingsRow = {
  organization_name_en: string;
  organization_name_ar: string;
  tagline_en: string;
  tagline_ar: string;
  location_en: string;
  location_ar: string;
  contact_label_en: string;
  contact_label_ar: string;
  contact_value: string;
  whatsapp_label_en: string;
  whatsapp_label_ar: string;
  whatsapp_value: string;
  email: string;
  instagram_url: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
};

type SponsorRow = {
  name: string;
  tier: string;
  website_url: string | null;
  summary_en: string;
  summary_ar: string;
  sort_order: number;
};

const defaults: Record<
  Locale,
  {
    settings: SiteSettings;
    home: HomeContent;
    about: GenericPageContent;
    competition: CompetitionPageContent;
    achievements: AchievementsPageContent;
    events: EventsPageContent;
    sponsors: SponsorsPageContent;
    achievementsList: AchievementItem[];
    eventsList: EventItem[];
    sponsorList: SponsorRow[];
  }
> = {
  en: {
    settings: {
      organizationName: "Aleppo CPC",
      tagline: "The official home of competitive programming at the University of Aleppo.",
      location: "Aleppo, Syria",
      contactLabel: "Official coordination",
      contactValue: "Aleppo CPC",
      whatsappLabel: "WhatsApp",
      whatsappValue: "+971 54 700 1658",
      email: "hello@acpc.club",
      socialLinks: {}
    },
    home: {
      seo: {
        title: "Aleppo CPC | Competitive Programming Club at the University of Aleppo",
        description:
          "Aleppo Competitive Programming Club is the official competitive programming platform at the University of Aleppo for ICPC training, contests, achievements, and sponsor partnerships.",
        keywords: [
          "Aleppo CPC",
          "University of Aleppo competitive programming club",
          "University of Aleppo ICPC",
          "ICPC Syria",
          "Aleppo programming contest",
          "sponsor student talent Syria"
        ]
      },
      hero: {
        eyebrow: "",
        title: "Aleppo Competitive Programming Club",
        description:
          "The University of Aleppo club for ICPC training, contests, and technical partnerships.",
        primaryCta: {
          label: "Sponsor Aleppo CPC",
          href: "/en/sponsors"
        },
        secondaryCta: {
          label: "Explore the ICPC pathway",
          href: "/en/competition"
        }
      },
      stats: [
        {
          value: "230",
          label: "participants in the 2025 event plan"
        },
        {
          value: "60-70",
          label: "teams in the local contest plan"
        },
        {
          value: "100+",
          label: "volunteers and contributors"
        }
      ],
      audiencePaths: [
        {
          title: "For partners",
          description:
            "Support a visible university platform that develops high-potential technical talent and connects your brand with a serious student community.",
          action: {
            label: "Explore sponsorship value",
            href: "/en/sponsors"
          }
        },
        {
          title: "For students",
          description:
            "Follow the training path, qualification ladder, and latest competition updates.",
          action: {
            label: "Explore the pathway",
            href: "/en/competition"
          }
        },
        {
          title: "For coaches",
          description:
            "Use the site as the official reference for structure, milestones, and documented results.",
          action: {
            label: "Review the structure",
            href: "/en/about"
          }
        }
      ],
      competitionPath: [
        {
          title: "University contest",
          description:
            "Open participation at the University of Aleppo builds the local pipeline and prepares teams for national qualification."
        },
        {
          title: "Syrian contest",
          description:
            "Top university teams progress to the Syrian contest, where national performance determines the next competitive step."
        },
        {
          title: "Arab and Africa region",
          description:
            "Qualified Syrian teams meet the strongest teams in the region and compete for medals and World Finals qualification."
        },
        {
          title: "ICPC World Finals",
          description:
            "The global stage where the best university teams solve high-pressure algorithmic problems in one of the world's most respected student competitions."
        }
      ],
      sponsorBenefits: [
        {
          title: "Visible brand presence",
          description:
            "Partners are positioned across event collateral, digital coverage, announcements, and the official site."
        },
        {
          title: "Direct access to technical talent",
          description:
            "Aleppo CPC attracts students already training in algorithms, systems thinking, and team problem solving."
        },
        {
          title: "Institutional credibility",
          description:
            "The platform presents partners alongside a serious university competition community with documented results and public reach."
        }
      ],
      editorialHighlights: [
        {
          title: "Verified achievements",
          description:
            "Medals, regional results, and World Finals appearances are documented clearly."
        },
        {
          title: "Partnership-ready platform",
          description:
            "Students, coaches, and partners can all find the club's story, structure, and official contact path in one place."
        },
        {
          title: "Live content management",
          description:
            "Pages, events, achievements, and announcements are prepared for ongoing updates through Supabase without redeployment."
        }
      ]
    },
    about: {
      seo: {
        title: "About Aleppo CPC | Mission, Structure, and Community",
        description:
          "Learn how Aleppo CPC develops competitive programming talent at the University of Aleppo through training, contests, mentorship, and community leadership.",
        keywords: [
          "Aleppo CPC mission",
          "University of Aleppo programming club",
          "ICPC community Syria",
          "competitive programming training Aleppo"
        ]
      },
      hero: {
        eyebrow: "About",
        title: "The official platform behind Aleppo's competitive programming journey.",
        description:
          "Aleppo CPC brings together students, coaches, organizers, and partners to build a structured path from local training to regional and global ICPC participation.",
        primaryCta: {
          label: "See achievements",
          href: "/en/achievements"
        },
        secondaryCta: {
          label: "Explore partnership value",
          href: "/en/sponsors"
        }
      },
      sections: [
        {
          title: "Mission",
          body: [
            "Develop students' algorithmic thinking, problem-solving discipline, and teamwork through a structured competitive programming culture.",
            "Maintain an official digital platform for updates, institutional memory, public credibility, and partner communication."
          ]
        },
        {
          title: "Vision",
          body: [
            "Position the University of Aleppo as a sustained source of competitive programming talent capable of competing nationally, regionally, and globally.",
            "Build a platform that serves students today and remains credible to partners, universities, and the wider ICPC community."
          ]
        },
        {
          title: "How the club works",
          body: [
            "The broader competition effort relies on coordination across training, competition, media, operations, technical, volunteer, and judging tracks.",
            "That structure does more than run events; it teaches students how serious technical communities organize, publish, and deliver under pressure."
          ]
        }
      ]
    },
    competition: {
      seo: {
        title: "ICPC Pathway | Aleppo CPC Competition Structure",
        description:
          "Explore the Aleppo CPC competition pathway from university training and local qualification to the Syrian contest, the Arab and Africa region, and the ICPC World Finals.",
        keywords: [
          "ICPC structure",
          "University programming contest Syria",
          "Aleppo CPC competition format",
          "ICPC team rules"
        ]
      },
      hero: {
        eyebrow: "Competition",
        title: "From campus training to the ICPC World Finals.",
        description:
          "Aleppo CPC explains the full ICPC pathway clearly: team format, contest flow, qualification stages, and the preparation required to compete seriously.",
        primaryCta: {
          label: "Review achievements",
          href: "/en/achievements"
        },
        secondaryCta: {
          label: "See event operations",
          href: "/en/events"
        }
      },
      sections: [
        {
          title: "Team format",
          body: [
            "ICPC teams consist of three students working on one machine under the guidance of a coach.",
            "The contest rewards both technical depth and the ability to divide roles, manage time, debug under pressure, and make decisions together."
          ]
        },
        {
          title: "Why the format matters",
          body: [
            "Competitive programming trains algorithm design, data-structure fluency, and disciplined implementation.",
            "It also mirrors real engineering behavior: prioritization, communication, testing, and resilience when the clock is moving."
          ]
        }
      ],
      structure: [
        {
          title: "University level",
          description: "Local contests identify the strongest teams and widen participation across the campus."
        },
        {
          title: "National level",
          description: "Qualified teams represent their universities in the Syrian contest and compete for regional qualification."
        },
        {
          title: "Arab and Africa regional",
          description: "The regional stage brings together top teams from across the Arab world and Africa for medals and World Finals spots."
        },
        {
          title: "World finals",
          description: "The final stage gathers the best teams from every ICPC region in a single global championship."
        }
      ],
      eventFlow: [
        {
          title: "Practice day",
          description:
            "Teams register, receive materials, test the contest environment, and complete a rehearsal round without affecting official standings."
        },
        {
          title: "Official contest day",
          description:
            "Teams solve a set of algorithmic problems over five hours while standings update dynamically before the freeze."
        },
        {
          title: "Closing ceremony",
          description:
            "Final rankings, medals, and qualification outcomes are revealed at the ceremony, adding suspense and public recognition."
        }
      ]
    },
    achievements: {
      seo: {
        title: "Aleppo CPC Achievements | Medals, Finals, and Regional Results",
        description:
          "Explore Aleppo CPC achievements, medal history, and ICPC World Finals appearances representing the University of Aleppo.",
        keywords: [
          "Aleppo ICPC achievements",
          "University of Aleppo medals",
          "ICPC Syria achievements",
          "competitive programming Aleppo results"
        ]
      },
      hero: {
        eyebrow: "Achievements",
        title: "Results that give the club public credibility.",
        description:
          "Aleppo's record reflects sustained competitive performance across Syrian, regional, and World Finals stages.",
        primaryCta: {
          label: "Browse the timeline",
          href: "/en/achievements"
        },
        secondaryCta: {
          label: "Support future teams",
          href: "/en/sponsors"
        }
      },
      sections: [
        {
          title: "Why these results matter",
          body: [
            "Documented success helps new students believe the pathway is real and worth the effort.",
            "For partners and sponsors, the track record shows that Aleppo CPC is tied to outcomes, not only activity."
          ]
        }
      ],
      impactMetrics: [
        {
          value: "3",
          label: "documented World Finals appearances in the source archive"
        },
        {
          value: "2",
          label: "regional medals documented for the 2025 season"
        },
        {
          value: "1",
          label: "season with both champion and runner-up in Syria during 2024"
        }
      ]
    },
    events: {
      seo: {
        title: "Events | Aleppo CPC Contests, Operations, and Updates",
        description:
          "Follow Aleppo CPC events, contest operations, volunteer tracks, and official competition updates from the University of Aleppo.",
        keywords: [
          "Aleppo CPC events",
          "programming contest volunteers",
          "ICPC event operations",
          "Aleppo programming competition"
        ]
      },
      hero: {
        eyebrow: "Events",
        title: "The operational side of every serious contest.",
        description:
          "Aleppo CPC events combine programming competition, volunteer coordination, technical delivery, media, and logistics in one public-facing platform.",
        primaryCta: {
          label: "See the partnerships page",
          href: "/en/sponsors"
        },
        secondaryCta: {
          label: "Return home",
          href: "/en"
        }
      },
      sections: [
        {
          title: "Why a public events page matters",
          body: [
            "Participants need accurate updates, schedules, and practical guidance before and during each event.",
            "Sponsors and partners need a professional place to understand event scale, visibility, and organizational maturity."
          ]
        }
      ],
      volunteerTracks: [
        {
          title: "Media",
          description: "Photography, video coverage, social publishing, and branded visual output."
        },
        {
          title: "Logistics",
          description: "Venue preparation, supplies, seating, electricity backup, and accommodation coordination."
        },
        {
          title: "Operations",
          description: "Check-in, schedule control, announcements, issue handling, and participant flow."
        },
        {
          title: "Technical",
          description: "Contest machines, display setup, software readiness, and technical troubleshooting."
        },
        {
          title: "Volunteer coordination",
          description: "On-ground assistance, printed-material distribution, participant support, and venue flow."
        }
      ]
    },
    sponsors: {
      seo: {
        title: "Sponsors and Partnerships | Aleppo CPC",
        description:
          "Partner with Aleppo CPC to support competitive programming at the University of Aleppo and reach a visible community of high-potential technical talent.",
        keywords: [
          "Aleppo CPC sponsors",
          "sponsor university competition Syria",
          "support competitive programming",
          "ICPC sponsorship"
        ]
      },
      hero: {
        eyebrow: "Partnerships",
        title: "A partnership platform built on talent, visibility, and educational impact.",
        description:
          "Aleppo CPC offers partners a credible way to support student excellence, gain meaningful visibility, and align with a respected university competition community.",
        primaryCta: {
          label: "Start a partnership conversation",
          href: "https://wa.me/971547001658"
        },
        secondaryCta: {
          label: "See event operations",
          href: "/en/events"
        }
      },
      sections: [
        {
          title: "Why partnership matters",
          body: [
            "Programming contests surface disciplined, high-agency students who already work under pressure and collaborate effectively.",
            "A professional website extends partner visibility beyond a single contest day and makes the relationship legible to the full community."
          ]
        }
      ],
      tiers: [
        {
          name: "Founding Partner",
          audience: "For organizations seeking category-leading visibility.",
          benefits: [
            "Primary placement on the homepage and partnerships page",
            "Lead mention in opening and closing communications",
            "Priority logo placement on event collateral and social media"
          ]
        },
        {
          name: "Technical Sponsor",
          audience: "For companies supporting talent development and event operations.",
          benefits: [
            "Visible placement across event pages and digital materials",
            "Association with student excellence and practical training",
            "Potential participation in employer branding and recruitment moments"
          ]
        },
        {
          name: "Community Supporter",
          audience: "For institutions and partners investing in long-term educational impact.",
          benefits: [
            "Recognition on the partnerships page and selected media assets",
            "Association with volunteer, student, and university impact",
            "Eligibility for tailored collaboration packages"
          ]
        }
      ],
      benefits: [
        {
          title: "Branded presence",
          description:
            "Your name appears across the official site, partner acknowledgements, and event communication surfaces."
        },
        {
          title: "Talent proximity",
          description:
            "You align with students who are already demonstrating analytical depth, grit, and collaborative skill."
        },
        {
          title: "Public impact",
          description:
            "Your support is tied to visible educational opportunity, not only to advertising inventory."
        }
      ]
    },
    achievementsList: [
      {
        year: "2016",
        title: "Regional gold and World Finals qualification",
        description:
          "Aleppo teams earned regional gold at the Arab and Africa level and advanced to the ICPC World Finals in Thailand.",
        highlight: "Qualified to the World Finals"
      },
      {
        year: "2018",
        title: "Regional silver medal",
        description:
          "The University of Aleppo secured a silver medal at the Arab and Africa regional contest.",
        highlight: "Regional podium finish"
      },
      {
        year: "2019",
        title: "World Finals appearance in Portugal",
        description:
          "Aleppo qualified for and participated in the ICPC World Finals hosted in Portugal.",
        highlight: "International representation"
      },
      {
        year: "2021",
        title: "Regional bronze and world finals",
        description:
          "Aleppo earned bronze at the regional level and advanced to the world finals in Bangladesh.",
        highlight: "Medal plus qualification"
      },
      {
        year: "2023",
        title: "Regional bronze and World Finals appearance",
        description:
          "Another regional bronze medal was followed by participation in the ICPC World Finals in Egypt.",
        highlight: "Consistent international presence"
      },
      {
        year: "2024",
        title: "Champion and runner-up in Syria",
        description:
          "Aleppo finished as both champion and runner-up in the Syrian programming contest.",
        highlight: "National dominance"
      },
      {
        year: "2025",
        title: "Four Syrian medals plus regional gold and bronze",
        description:
          "Aleppo teams won four of the ten medals awarded in the Syrian contest, then added gold and bronze at the Arab and Africa regional level.",
        highlight: "Qualified to the World Finals in Dubai"
      }
    ],
    eventsList: [
      {
        slug: "aleppo-university-contest-2025",
        title: "University Programming Contest - Aleppo 2025",
        status: "Archive reference",
        dateLabel: "16-17 July 2025",
        location: "Central Library - Citizen Service Hall, University of Aleppo",
        summary:
          "The 2025 planning materials outline a two-day university contest with 230 total participants and multiple teams supporting media, logistics, operations, judging, and technical delivery.",
        details: [
          "The supporting documents mention approximately 210 contestants plus 20 coaches and supervisors.",
          "Volunteer and operations teams were expected to cover media, logistics, technical delivery, judging, and participant flow.",
          "The event budget emphasized venue setup, food service, print materials, awards, team shirts, and judge accommodation."
        ]
      }
    ],
    sponsorList: []
  },
  ar: {
    settings: {
      organizationName: "Aleppo CPC",
      tagline: "المنصة الرسمية للبرمجة التنافسية في جامعة حلب.",
      location: "حلب، سوريا",
      contactLabel: "التنسيق الرسمي",
      contactValue: "Aleppo CPC",
      whatsappLabel: "واتساب",
      whatsappValue: "+971 54 700 1658",
      email: "hello@acpc.club",
      socialLinks: {}
    },
    home: {
      seo: {
        title: "Aleppo CPC | نادي البرمجة التنافسية في جامعة حلب",
        description:
          "Aleppo CPC هو المنصة الرسمية للبرمجة التنافسية في جامعة حلب للتدريب على ICPC، والمسابقات، والإنجازات، والشراكات الداعمة.",
        keywords: [
          "Aleppo CPC",
          "البرمجة التنافسية في سوريا",
          "نادي البرمجة التنافسية جامعة حلب",
          "جامعة حلب ICPC",
          "المسابقة البرمجية في سوريا",
          "مسابقة جامعة حلب البرمجية",
          "رعاية المواهب التقنية الطلابية"
        ]
      },
      hero: {
        eyebrow: "",
        title: "نادي حلب للبرمجة التنافسية",
        description:
          "نادي جامعة حلب للتدريب على ICPC، والمسابقات، والشراكات التقنية الداعمة.",
        primaryCta: {
          label: "كن شريكاً مع Aleppo CPC",
          href: "/ar/sponsors"
        },
        secondaryCta: {
          label: "استكشف مسار ICPC",
          href: "/ar/competition"
        }
      },
      stats: [
        {
          value: "230",
          label: "مشارك في خطة فعالية 2025"
        },
        {
          value: "60-70",
          label: "فريق في الخطة المحلية"
        },
        {
          value: "100+",
          label: "متطوع ومساهم"
        }
      ],
      audiencePaths: [
        {
          title: "للشركاء",
          description:
            "ادعم منصة جامعية واضحة تطور المواهب التقنية وتمنح علامتك حضوراً مرتبطاً بالإنجاز.",
          action: {
            label: "اكتشف قيمة الشراكة",
            href: "/ar/sponsors"
          }
        },
        {
          title: "للطلاب",
          description:
            "تعرّف إلى التدريب، والتأهل، وآخر التحديثات المرتبطة بالمسابقات.",
          action: {
            label: "استكشف المسار",
            href: "/ar/competition"
          }
        },
        {
          title: "للمدربين",
          description:
            "مرجع رسمي لبنية المسار التنافسي، والمراحل، والنتائج الموثقة.",
          action: {
            label: "راجع الهيكل",
            href: "/ar/about"
          }
        }
      ],
      competitionPath: [
        {
          title: "على مستوى الجامعة",
          description:
            "تفتح المسابقة المحلية باب المشاركة في جامعة حلب وتبني القاعدة التي تنطلق منها الفرق إلى المراحل التالية."
        },
        {
          title: "على مستوى سوريا",
          description:
            "تتأهل أفضل الفرق لتمثيل الجامعة في المسابقة السورية، حيث تحدد النتائج الخطوة التالية في المسار التنافسي."
        },
        {
          title: "الإقليم العربي وأفريقيا",
          description:
            "تلتقي الفرق السورية المتأهلة مع نخبة المنطقة للتنافس على الميداليات والتأهل إلى النهائي العالمي."
        },
        {
          title: "النهائي العالمي",
          description:
            "المرحلة الأعلى في ICPC، حيث تتنافس أفضل الفرق الجامعية في العالم ضمن تحدٍ واحد عالي المستوى."
        }
      ],
      sponsorBenefits: [
        {
          title: "حضور بصري تقني واضح",
          description:
            "يظهر الشركاء عبر المواد الدعائية والتغطية الإعلامية والإعلانات والموقع الرسمي."
        },
        {
          title: "وصول مباشر إلى المواهب",
          description:
            "يجذب Aleppo CPC طلاباً متميزين يتدرّبون فعلياً على الخوارزميات والتحليل والعمل الجماعي تحت الضغط."
        },
        {
          title: "مصداقية مؤسسية",
          description:
            "يقدّم الموقع صورة احترافية تربط الراعي بمجتمع جامعي جاد وله إنجازات موثقة وحضور عام واضح."
        }
      ],
      editorialHighlights: [
        {
          title: "نتائج موثقة",
          description:
            "الميداليات والنتائج الإقليمية والمشاركات العالمية موثقة بوضوح."
        },
        {
          title: "منصة جاهزة للشراكات",
          description:
            "قصة النادي، وبنيته، ومسار التواصل الرسمي متاحة بوضوح للطلاب والشركاء."
        },
        {
          title: "إدارة محتوى مباشرة",
          description:
            "تتيح طبقة المحتوى تحديث الصفحات والفعاليات والإنجازات والإعلانات من Supabase دون إعادة نشر."
        }
      ]
    },
    about: {
      seo: {
        title: "عن Aleppo CPC | الرسالة والبنية والمجتمع",
        description:
          "تعرّف إلى دور Aleppo CPC في تطوير المواهب البرمجية في جامعة حلب عبر التدريب والمسابقات والإرشاد والعمل المجتمعي.",
        keywords: [
          "رسالة Aleppo CPC",
          "نادي البرمجة جامعة حلب",
          "مجتمع ICPC سوريا",
          "تدريب البرمجة التنافسية حلب"
        ]
      },
      hero: {
        eyebrow: "عن النادي",
        title: "المنصة الرسمية لمسار البرمجة التنافسية في جامعة حلب.",
        description:
          "يجمع Aleppo CPC الطلاب والمدربين والمنظمين والشركاء لبناء مسار واضح يبدأ من التدريب المحلي ويصل إلى المشاركات الإقليمية والعالمية.",
        primaryCta: {
          label: "شاهد الإنجازات",
          href: "/ar/achievements"
        },
        secondaryCta: {
          label: "اكتشف قيمة الشراكة",
          href: "/ar/sponsors"
        }
      },
      sections: [
        {
          title: "الرسالة",
          body: [
            "تنمية التفكير الخوارزمي والانضباط في حل المشكلات وروح العمل الجماعي لدى الطلاب من خلال ثقافة تدريب ومنافسة واضحة.",
            "إدارة منصة رقمية رسمية تحفظ الذاكرة المؤسسية وتسهّل التحديثات وتعزز المصداقية العامة والتواصل مع الشركاء."
          ]
        },
        {
          title: "الرؤية",
          body: [
            "ترسيخ حضور جامعة حلب كمصدر مستدام للمواهب البرمجية القادرة على المنافسة محلياً وإقليمياً وعالمياً.",
            "بناء منصة تخدم الطلاب اليوم وتبقى موثوقة للشركاء والجامعات ومجتمع ICPC الأوسع."
          ]
        },
        {
          title: "كيف يعمل النادي",
          body: [
            "يعتمد العمل حول المسابقة على تنسيق بين مسارات التدريب والمنافسة والإعلام والعمليات والفريق التقني والتطوع والتحكيم.",
            "ولا يقتصر هذا الهيكل على إدارة الفعاليات، بل يعلّم الطلاب كيف تُبنى المجتمعات التقنية الجادة وتُدار وتُنشر أعمالها تحت الضغط."
          ]
        }
      ]
    },
    competition: {
      seo: {
        title: "بنية المسابقة | من مستوى الجامعة إلى النهائي العالمي",
        description:
          "استكشف مسار Aleppo CPC التنافسي من التدريب الجامعي والتأهل المحلي إلى المسابقة السورية، ثم الإقليم العربي وأفريقيا، وصولاً إلى النهائي العالمي في ICPC.",
        keywords: [
          "بنية ICPC",
          "مسابقة برمجية جامعية سوريا",
          "هيكلية Aleppo CPC",
          "قوانين فرق ICPC"
        ]
      },
      hero: {
        eyebrow: "المسابقة",
        title: "من التدريب الجامعي إلى النهائي العالمي في ICPC.",
        description:
          "يشرح Aleppo CPC مسار ICPC كاملاً بوضوح: تشكيل الفريق، وآلية المسابقة، ومراحل التأهل، والاستعداد المطلوب للمنافسة الجادة.",
        primaryCta: {
          label: "راجع الإنجازات",
          href: "/ar/achievements"
        },
        secondaryCta: {
          label: "شاهد العمليات",
          href: "/ar/events"
        }
      },
      sections: [
        {
          title: "تشكيل الفريق",
          body: [
            "يتألف فريق ICPC من ثلاثة طلاب يعملون على جهاز واحد تحت إشراف مدرب.",
            "ولا تُقاس قوة الفريق بالمهارة الفردية فقط، بل بقدرته على توزيع الأدوار وإدارة الوقت والتواصل والتصحيح تحت الضغط."
          ]
        },
        {
          title: "لماذا هذا النمط مهم",
          body: [
            "تدرّب البرمجة التنافسية الطلاب على تصميم الخوارزميات وإتقان البنى البيانية والتنفيذ الدقيق.",
            "كما تعكس سلوكاً هندسياً حقيقياً: ترتيب الأولويات، التواصل، الاختبار، والثبات عند ضغط الوقت."
          ]
        }
      ],
      structure: [
        {
          title: "على مستوى الجامعة",
          description: "تكشف المسابقة المحلية الفرق الأقوى وتوسّع قاعدة المشاركة داخل الجامعة."
        },
        {
          title: "على مستوى البلد",
          description: "تمثل الفرق المتأهلة الجامعة في المسابقة السورية وتنافس على الوصول إلى المرحلة الإقليمية."
        },
        {
          title: "الإقليم العربي وأفريقيا",
          description: "تجتمع أقوى الفرق من المنطقة للتنافس على الميداليات والتأهل للنهائي العالمي."
        },
        {
          title: "النهائي العالمي",
          description: "المشهد الختامي الذي يجمع أفضل فرق كل الأقاليم في بطولة عالمية واحدة."
        }
      ],
      eventFlow: [
        {
          title: "اليوم التجريبي",
          description:
            "تسجّل الفرق وتستلم المواد وتجرّب بيئة المسابقة وتدخل جولة محاكاة لا تؤثر في النتائج الرسمية."
        },
        {
          title: "يوم المسابقة الرسمي",
          description:
            "تحل الفرق مجموعة من المسائل خلال خمس ساعات، مع تحديث لوحة النتائج قبل فترة التجميد الأخيرة."
        },
        {
          title: "الحفل الختامي",
          description:
            "تُعلن النتائج النهائية والميداليات والتأهل في الحفل، ما يمنح الفعالية نهاية جماهيرية مشوّقة."
        }
      ]
    },
    achievements: {
      seo: {
        title: "إنجازات Aleppo CPC | الميداليات والتأهل إلى النهائي العالمي",
        description:
          "اطلع على سجل Aleppo CPC في المسابقات البرمجية، من الميداليات الإقليمية إلى المشاركات في النهائي العالمي لجامعة حلب.",
        keywords: [
          "إنجازات Aleppo CPC",
          "ميداليات جامعة حلب",
          "نتائج ICPC سوريا",
          "إنجازات البرمجة التنافسية حلب"
        ]
      },
      hero: {
        eyebrow: "الإنجازات",
        title: "نتائج تصنع المصداقية العامة للنادي.",
        description:
          "يعكس سجل حلب التنافسي حضوراً متواصلاً عبر المراحل السورية والإقليمية والعالمية.",
        primaryCta: {
          label: "تصفح الخط الزمني",
          href: "/ar/achievements"
        },
        secondaryCta: {
          label: "ادعم الفرق القادمة",
          href: "/ar/sponsors"
        }
      },
      sections: [
        {
          title: "لماذا يهم هذا السجل",
          body: [
            "يوضح للطلاب الجدد أن الطريق حقيقي ويمكن الوصول فيه إلى نتائج كبيرة.",
            "كما يثبت للشركاء أن Aleppo CPC مرتبط بإنجازات فعلية، لا بمجرد نشاطات عابرة."
          ]
        }
      ],
      impactMetrics: [
        {
          value: "3",
          label: "مشاركات موثقة في النهائي العالمي ضمن الأرشيف"
        },
        {
          value: "2",
          label: "ميداليتان إقليميتان موثقتان في موسم 2025"
        },
        {
          value: "1",
          label: "موسم جمع لقب البطل والوصيف في سوريا خلال 2024"
        }
      ]
    },
    events: {
      seo: {
        title: "الفعاليات والعمليات | Aleppo CPC",
        description:
          "تابع فعاليات Aleppo CPC، ومسارات التشغيل، والتحديثات الرسمية الخاصة بالمسابقات البرمجية في جامعة حلب.",
        keywords: [
          "فعاليات Aleppo CPC",
          "متطوعو المسابقة البرمجية",
          "تشغيل فعاليات ICPC",
          "مسابقة حلب البرمجية"
        ]
      },
      hero: {
        eyebrow: "الفعاليات",
        title: "الجانب التشغيلي وراء كل مسابقة جادة.",
        description:
          "تجمع فعاليات Aleppo CPC بين المنافسة البرمجية والتشغيل التقني والتغطية الإعلامية واللوجستيك والتطوع ضمن منصة عامة واضحة وسهلة المتابعة.",
        primaryCta: {
          label: "صفحة الشراكات",
          href: "/ar/sponsors"
        },
        secondaryCta: {
          label: "العودة للرئيسية",
          href: "/ar"
        }
      },
      sections: [
        {
          title: "لماذا تحتاج الفعاليات إلى منصة رقمية",
          body: [
            "يحتاج المشاركون إلى تحديثات دقيقة وجداول واضحة وإرشادات عملية قبل الفعالية وخلالها.",
            "ويحتاج الشركاء إلى مساحة احترافية توضح حجم الحدث، وقدرته التنظيمية، وقيمته الإعلامية."
          ]
        }
      ],
      volunteerTracks: [
        {
          title: "الإعلام",
          description: "التصوير والفيديو والنشر على المنصات الاجتماعية وإخراج الهوية البصرية."
        },
        {
          title: "اللوجستيك",
          description: "تجهيز المكان والمواد والطاولات والكهرباء الاحتياطية والسكن والنقل."
        },
        {
          title: "العمليات",
          description: "التسجيل وإدارة الجدول والإعلانات وحل المشكلات وتنظيم حركة المشاركين."
        },
        {
          title: "الفريق التقني",
          description: "تجهيز الأجهزة والعرض البرمجي والبرمجيات وحل الأعطال التقنية."
        },
        {
          title: "المتطوعون",
          description: "المساندة الميدانية وتوزيع المواد ومساعدة المشاركين وتنظيم حركة المكان طوال الفعالية."
        }
      ]
    },
    sponsors: {
      seo: {
        title: "الشراكات والرعايات | Aleppo CPC",
        description:
          "شارك مع Aleppo CPC لدعم البرمجة التنافسية في جامعة حلب والوصول إلى مجتمع واضح من المواهب التقنية الواعدة.",
        keywords: [
          "رعاة Aleppo CPC",
          "رعاية مسابقة جامعية سوريا",
          "دعم البرمجة التنافسية",
          "رعاية ICPC"
        ]
      },
      hero: {
        eyebrow: "الشراكات",
        title: "منصة شراكة قائمة على المواهب، والظهور، والأثر التعليمي.",
        description:
          "يوفر Aleppo CPC للشركاء طريقة موثوقة لدعم التميز الطلابي، والحصول على حضور واضح، والارتباط بمجتمع جامعي يحظى باحترام ونتائج موثقة.",
        primaryCta: {
          label: "ابدأ محادثة شراكة",
          href: "https://wa.me/971547001658"
        },
        secondaryCta: {
          label: "شاهد العمليات",
          href: "/ar/events"
        }
      },
      sections: [
        {
          title: "لماذا الشراكة مهمة",
          body: [
            "تكشف المسابقات البرمجية عن طلاب يتمتعون بالانضباط والقدرة على التحليل والعمل تحت الضغط والتعاون الفعّال.",
            "ويمنح الموقع الاحترافي الشركاء حضوراً مستمراً يتجاوز يوم الفعالية الواحدة ويحوّل الشراكة إلى قصة مقروءة وواضحة."
          ]
        }
      ],
      tiers: [
        {
          name: "شريك تأسيسي",
          audience: "للجهات التي تبحث عن أعلى مستوى من الظهور والارتباط بالمنصة.",
          benefits: [
            "حضور أساسي في الصفحة الرئيسية وصفحة الشراكات",
            "ذكر بارز في الافتتاح والختام",
            "أولوية في الظهور على المواد المطبوعة والمنشورات"
          ]
        },
        {
          name: "راعٍ تقني",
          audience: "للشركات الداعمة للمواهب التقنية وتشغيل الفعاليات.",
          benefits: [
            "ظهور واضح في صفحات الفعاليات والمواد الرقمية",
            "ارتباط مباشر بتميّز الطلاب والتدريب العملي",
            "إمكانية إدماج رسائل توظيف أو بناء علامة صاحب العمل"
          ]
        },
        {
          name: "داعم مجتمعي",
          audience: "للمؤسسات والجهات الراغبة في دعم الأثر التعليمي طويل الأمد.",
          benefits: [
            "ذكر في صفحة الشراكات وبعض الأصول الإعلامية المختارة",
            "ربط العلامة بالأثر الطلابي والجامعي",
            "إمكانية تصميم حزم تعاون مخصصة"
          ]
        }
      ],
      benefits: [
        {
          title: "حضور بصري واضح",
          description: "يظهر اسم الجهة الشريكة عبر الموقع الرسمي وصفحات الشكر ورسائل الفعالية."
        },
        {
          title: "قرب من المواهب",
          description:
            "ترتبط الجهة بطلاب يثبتون بالفعل عمقاً تحليلياً وقدرة على الالتزام والعمل الجماعي."
        },
        {
          title: "أثر عام ملموس",
          description:
            "يرتبط دعمكم بفرصة تعليمية واضحة ومشهودة، وليس فقط بمساحة إعلانية عابرة."
        }
      ]
    },
    achievementsList: [
      {
        year: "2016",
        title: "ذهبية إقليمية وتأهل إلى النهائي العالمي",
        description:
          "حققت فرق حلب ميدالية ذهبية على مستوى العرب وأفريقيا وتأهلت إلى النهائي العالمي الذي أقيم في تايلاند.",
        highlight: "تأهل إلى النهائي العالمي"
      },
      {
        year: "2018",
        title: "ميدالية فضية إقليمية",
        description:
          "أحرزت جامعة حلب ميدالية فضية على مستوى الإقليم العربي وأفريقيا.",
        highlight: "منصة تتويج إقليمية"
      },
      {
        year: "2019",
        title: "مشاركة في النهائي العالمي في البرتغال",
        description:
          "تأهلت حلب إلى النهائي العالمي وشاركت في النسخة التي أُقيمت في البرتغال.",
        highlight: "حضور دولي"
      },
      {
        year: "2021",
        title: "برونزية إقليمية وتأهل عالمي",
        description:
          "حققت حلب ميدالية برونزية على مستوى الإقليم وتأهلت إلى النهائي العالمي في بنغلادش.",
        highlight: "ميدالية وتأهل"
      },
      {
        year: "2023",
        title: "برونزية إقليمية ومشاركة عالمية في مصر",
        description:
          "أضافت الجامعة ميدالية برونزية جديدة تبعتها مشاركة في النهائي العالمي الذي أُقيم في مصر.",
        highlight: "استمرارية دولية"
      },
      {
        year: "2024",
        title: "بطل ووصيف سوريا",
        description:
          "حققت حلب المركزين الأول والثاني في المسابقة البرمجية السورية.",
        highlight: "هيمنة وطنية"
      },
      {
        year: "2025",
        title: "أربع ميداليات سورية وذهبية وبرونزية إقليميتان",
        description:
          "فازت فرق حلب بأربع ميداليات من أصل عشر في المسابقة السورية، ثم أضافت ذهبية وبرونزية على مستوى العرب وأفريقيا.",
        highlight: "تأهل إلى النهائي العالمي في دبي"
      }
    ],
    eventsList: [
      {
        slug: "aleppo-university-contest-2025",
        title: "المسابقة البرمجية الجامعية - حلب 2025",
        status: "مرجع أرشيفي",
        dateLabel: "16 - 17 تموز 2025",
        location: "المكتبة المركزية - قاعة خدمة المواطن، جامعة حلب",
        summary:
          "توضح مواد التخطيط لعام 2025 فعالية جامعية على يومين مع 230 مشاركاً إجمالياً وعدة فرق تدعم الإعلام واللوجستيك والعمليات والتحكيم والتجهيز التقني.",
        details: [
          "تذكر المواد المرجعية رقماً تقريبياً يبلغ 210 متسابقين إضافة إلى 20 مدرباً ومشرفاً.",
          "توقعت الخطة وجود فرق تعمل على الإعلام واللوجستيك والتجهيز التقني والتحكيم وتنظيم حركة المشاركين.",
          "ركزت الميزانية على تجهيز المكان والطعام والمطبوعات والجوائز والكنزات وإقامة الحكام."
        ]
      }
    ],
    sponsorList: []
  }
};

function mergePagePayload<T extends { seo: SeoData }>(
  fallback: T,
  row: SitePageRow | null
): T {
  if (!row?.payload) {
    return fallback;
  }

  return {
    ...fallback,
    ...row.payload,
    seo: {
      title: row.seo_title ?? fallback.seo.title,
      description: row.seo_description ?? fallback.seo.description,
      keywords: row.seo_keywords ?? fallback.seo.keywords
    }
  } as T;
}

async function getPageRow(slug: string, locale: Locale) {
  const client = getSupabaseClient();

  if (!client) {
    return null;
  }

  const { data } = await client
    .from("site_pages")
    .select("slug, locale, seo_title, seo_description, seo_keywords, payload")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("published", true)
    .maybeSingle<SitePageRow>();

  return data ?? null;
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const fallback = defaults[locale].settings;
  const client = getSupabaseClient();

  if (!client) {
    return fallback;
  }

  const { data } = await client
    .from("site_settings")
    .select(
      [
        "organization_name_en",
        "organization_name_ar",
        "tagline_en",
        "tagline_ar",
        "location_en",
        "location_ar",
        "contact_label_en",
        "contact_label_ar",
        "contact_value",
        "whatsapp_label_en",
        "whatsapp_label_ar",
        "whatsapp_value",
        "email",
        "instagram_url",
        "linkedin_url",
        "facebook_url"
      ].join(", ")
    )
    .eq("is_active", true)
    .limit(1)
    .maybeSingle<SettingsRow>();

  if (!data) {
    return fallback;
  }

  return {
    organizationName: locale === "ar" ? data.organization_name_ar : data.organization_name_en,
    tagline: locale === "ar" ? data.tagline_ar : data.tagline_en,
    location: locale === "ar" ? data.location_ar : data.location_en,
    contactLabel: locale === "ar" ? data.contact_label_ar : data.contact_label_en,
    contactValue: data.contact_value,
    whatsappLabel: locale === "ar" ? data.whatsapp_label_ar : data.whatsapp_label_en,
    whatsappValue: data.whatsapp_value,
    email: data.email,
    socialLinks: {
      instagram: data.instagram_url ?? undefined,
      linkedin: data.linkedin_url ?? undefined,
      facebook: data.facebook_url ?? undefined
    }
  };
}

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  return mergePagePayload(defaults[locale].home, await getPageRow("home", locale));
}

export async function getAboutContent(locale: Locale): Promise<GenericPageContent> {
  return mergePagePayload(defaults[locale].about, await getPageRow("about", locale));
}

export async function getCompetitionContent(locale: Locale): Promise<CompetitionPageContent> {
  return mergePagePayload(defaults[locale].competition, await getPageRow("competition", locale));
}

export async function getAchievementsPageContent(
  locale: Locale
): Promise<AchievementsPageContent> {
  return mergePagePayload(
    defaults[locale].achievements,
    await getPageRow("achievements", locale)
  );
}

export async function getEventsPageContent(locale: Locale): Promise<EventsPageContent> {
  return mergePagePayload(defaults[locale].events, await getPageRow("events", locale));
}

export async function getSponsorsPageContent(locale: Locale): Promise<SponsorsPageContent> {
  return mergePagePayload(defaults[locale].sponsors, await getPageRow("sponsors", locale));
}

export async function getAchievements(locale: Locale): Promise<AchievementItem[]> {
  const fallback = defaults[locale].achievementsList;
  const client = getSupabaseClient();

  if (!client) {
    return fallback;
  }

  const { data } = await client
    .from("achievements")
    .select(
      "year, title_en, title_ar, summary_en, summary_ar, highlight_en, highlight_ar, sort_order"
    )
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("year", { ascending: true })
    .returns<AchievementRow[]>();

  if (!data?.length) {
    return fallback;
  }

  return data.map((item) => ({
    year: String(item.year),
    title: locale === "ar" ? item.title_ar : item.title_en,
    description: locale === "ar" ? item.summary_ar : item.summary_en,
    highlight: locale === "ar" ? item.highlight_ar : item.highlight_en
  }));
}

export async function getEvents(locale: Locale): Promise<EventItem[]> {
  const fallback = defaults[locale].eventsList;
  const client = getSupabaseClient();

  if (!client) {
    return fallback;
  }

  const { data } = await client
    .from("events")
    .select(
      [
        "slug",
        "status",
        "starts_at",
        "ends_at",
        "venue_en",
        "venue_ar",
        "city_en",
        "city_ar",
        "title_en",
        "title_ar",
        "summary_en",
        "summary_ar",
        "details_en",
        "details_ar",
        "sort_order"
      ].join(", ")
    )
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .returns<EventRow[]>();

  if (!data?.length) {
    return fallback;
  }

  return data.map((item) => {
    const locationParts =
      locale === "ar"
        ? [item.venue_ar, item.city_ar].filter(Boolean)
        : [item.venue_en, item.city_en].filter(Boolean);

    return {
      slug: item.slug,
      title: locale === "ar" ? item.title_ar : item.title_en,
      status: item.status,
      dateLabel: formatDateLabel(item.starts_at, item.ends_at, locale),
      location: locationParts.join(" - "),
      summary: locale === "ar" ? item.summary_ar : item.summary_en,
      details: locale === "ar" ? item.details_ar ?? [] : item.details_en ?? []
    };
  });
}

export async function getSponsors(
  locale: Locale
): Promise<{ name: string; tier: string; summary: string; websiteUrl?: string }[]> {
  const fallback = defaults[locale].sponsorList;
  const client = getSupabaseClient();

  if (!client) {
    return fallback.map((item) => ({
      name: item.name,
      tier: item.tier,
      summary: locale === "ar" ? item.summary_ar : item.summary_en,
      websiteUrl: item.website_url ?? undefined
    }));
  }

  const { data } = await client
    .from("sponsors")
    .select("name, tier, website_url, summary_en, summary_ar, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .returns<SponsorRow[]>();

  if (!data?.length) {
    return fallback.map((item) => ({
      name: item.name,
      tier: item.tier,
      summary: locale === "ar" ? item.summary_ar : item.summary_en,
      websiteUrl: item.website_url ?? undefined
    }));
  }

  return data.map((item) => ({
    name: item.name,
    tier: item.tier,
    summary: locale === "ar" ? item.summary_ar : item.summary_en,
    websiteUrl: item.website_url ?? undefined
  }));
}

function formatDateLabel(
  startsAt: string | null,
  endsAt: string | null,
  locale: Locale
) {
  if (!startsAt) {
    return locale === "ar" ? "سيتم التحديث لاحقاً" : "To be updated";
  }

  const formatter = new Intl.DateTimeFormat(locale === "ar" ? "ar-SY" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const start = formatter.format(new Date(startsAt));

  if (!endsAt) {
    return start;
  }

  const end = formatter.format(new Date(endsAt));
  return `${start} - ${end}`;
}
