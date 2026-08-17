import { Locale } from "@/lib/i18n";

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

export type VolunteersPageContent = GenericPageContent & {
  volunteerTracks: VolunteerTrack[];
};

export type ClubStructureRole = {
  title: string;
  name: string;
  responsibility: string;
  linkedin?: string;
};

export type ClubStructureGroup = {
  title: string;
  description: string;
  roles: ClubStructureRole[];
};

export type StructurePageContent = GenericPageContent & {
  supervisor: ClubStructureRole;
  leadership: ClubStructureRole[];
  groups: ClubStructureGroup[];
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
    telegram?: string;
  };
};

export type SponsorItem = {
  name: string;
  tier: string;
  summary: string;
  websiteUrl?: string;
};

const defaults: Record<
  Locale,
  {
    settings: SiteSettings;
    home: HomeContent;
    about: GenericPageContent;
    structure: StructurePageContent;
    competition: CompetitionPageContent;
    achievements: AchievementsPageContent;
    volunteers: VolunteersPageContent;
    sponsors: SponsorsPageContent;
    achievementsList: AchievementItem[];
    eventsList: EventItem[];
    sponsorList: SponsorItem[];
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
      email: "hello@aleppo.icpc.club",
      socialLinks: {
        instagram: "https://www.instagram.com/aleppo_cpc25/",
        linkedin: "https://www.linkedin.com/company/icpc-aleppo-university-community/?viewAsMember=true",
        telegram: "https://t.me/+JP44405xZnIxM2Vk"
      }
    },
    home: {
      seo: {
        title: "Aleppo CPC | Competitive Programming Club at the University of Aleppo",
        description:
          "Aleppo Competitive Programming Club prepares University of Aleppo students for ICPC through disciplined training, serious contests, mentorship, and partner support.",
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
        title: "Aleppo CPC",
        description:
          "The University of Aleppo club preparing students for ICPC through disciplined training, serious contests, mentorship, and partnerships that help talent go further.",
        primaryCta: {
          label: "Partner with Aleppo CPC",
          href: "/en/sponsors"
        },
        secondaryCta: {
          label: "Explore the ICPC pathway",
          href: "/en/competition"
        }
      },
      stats: [
        {
          value: "500",
          label: "registered contestants in the 2026 contest"
        },
        {
          value: "135",
          label: "teams in the 2026 contest"
        },
        {
          value: "100",
          label: "volunteers and organizers"
        }
      ],
      audiencePaths: [
        {
          title: "For partners",
          description:
            "Partner with a university club that develops high-potential technical students and gives your brand credible visibility around achievement, training, and public impact.",
          action: {
            label: "Explore sponsorship value",
            href: "/en/sponsors"
          }
        },
        {
          title: "For students",
          description:
            "Find the training path, contest structure, qualification stages, and the proof that Aleppo teams can reach national, regional, and world stages.",
          action: {
            label: "Explore the pathway",
            href: "/en/competition"
          }
        },
        {
          title: "For coaches",
          description:
            "Use the club as a clear reference for training structure, team preparation, milestones, and documented results.",
          action: {
            label: "Review the structure",
            href: "/en/structure"
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
            "The club presents partners beside a serious university competition season with documented results and public reach."
        }
      ],
      editorialHighlights: [
        {
          title: "Verified achievements",
          description:
            "Medals, regional results, and World Finals appearances are documented clearly."
        },
        {
          title: "Partnership-ready club",
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
        title: "About Aleppo CPC | Mission, Structure, and Club Work",
        description:
          "Learn how Aleppo CPC develops competitive programming talent at the University of Aleppo through training, contests, mentorship, and clear club leadership.",
        keywords: [
          "Aleppo CPC mission",
          "University of Aleppo programming club",
          "ICPC club Syria",
          "competitive programming training Aleppo"
        ]
      },
      hero: {
        eyebrow: "About",
        title: "Built for ICPC training",
        description:
          "Aleppo CPC gives students a structured path into ICPC: training, team formation, contest practice, operations, documentation, and leadership that can carry from one season to the next.",
        primaryCta: {
          label: "See the club structure",
          href: "/en/structure"
        },
        secondaryCta: {
          label: "Explore the ICPC pathway",
          href: "/en/competition"
        }
      },
      sections: [
        {
          title: "Mission",
          body: [
            "Build disciplined problem-solvers through regular training, contest practice, mentorship, and team-based competition.",
            "Maintain a clear club structure so students, mentors, partners, and the university can understand the work and trust its continuity."
          ]
        },
        {
          title: "Vision",
          body: [
            "Make the University of Aleppo a lasting source of ICPC talent, technical leadership, and regional competitive presence.",
            "Grow a club that remains useful to students, trusted by partners, and legible to the wider ICPC ecosystem."
          ]
        },
        {
          title: "How the club works",
          body: [
            "Aleppo CPC is not only a contest team. It is a student club with training, contests, media, documentation, operations, and volunteer coordination.",
            "That structure helps the club scale from one event to the next and gives students practical experience in ownership, delivery, and collaboration."
          ]
        }
      ]
    },
    structure: {
      seo: {
        title: "Club Structure | Aleppo CPC",
        description:
          "Explore the Aleppo CPC organizational structure, leadership roles, and operating teams behind training, media, operations, development, and contest delivery.",
        keywords: [
          "Aleppo CPC structure",
          "Aleppo ICPC club leadership",
          "University of Aleppo programming club structure",
          "ICPC operations Aleppo"
        ]
      },
      hero: {
        eyebrow: "Club Structure",
        title: "Club structure",
        description:
          "The club is organized around supervision, leadership, operations, scientific training, development, media, and room coordination so each season can move with clarity.",
        primaryCta: {
          label: "Partner with the club",
          href: "/en/sponsors"
        },
        secondaryCta: {
          label: "See how the club operates",
          href: "/en/volunteers"
        }
      },
      sections: [
        {
          title: "How the Club Works",
          body: [
            "Clear teams keep the season moving: training, competition, media, documentation, operations, logistics, and technical support.",
            "The structure below turns the club from a loose activity into a repeatable operating system for students, mentors, and partners."
          ]
        }
      ],
      supervisor: {
        title: "General Supervisor",
        name: "AbdulQader Qassab",
        responsibility: "Keeps the club aligned with its mission, university relationships, and long-term continuity.",
        linkedin: "https://www.linkedin.com/in/abdulqader-qassab"
      },
      leadership: [
        {
          title: "Club President",
          name: "Bassam Suleiman",
          responsibility: "Coordinates the season plan, team leads, priorities, and official club rhythm.",
          linkedin: "https://www.linkedin.com/in/bassam-sulaiman/?skipRedirect=true"
        },
        {
          title: "Vice President",
          name: "AbdulKarim Jammal",
          responsibility: "Supports execution across teams and keeps internal coordination moving."
        }
      ],
      groups: [
        {
          title: "Technical and Development",
          description: "The technical side keeps systems, contest infrastructure, and digital tools reliable.",
          roles: [
            {
              title: "Technical Systems Manager",
              name: "Mohammad Mortakli",
              responsibility: "Owns contest machines, infrastructure readiness, and technical operating standards.",
              linkedin: "https://www.linkedin.com/in/mohamad-mazkatli-763715251/"
            },
            {
              title: "Head of Development",
              name: "Mohammad Bitar",
              responsibility: "Builds and maintains software, website surfaces, and digital support tools.",
              linkedin: "https://www.linkedin.com/in/muhammad-bitar-maatoq/?skipRedirect=true"
            }
          ]
        },
        {
          title: "Club Operations",
          description: "Operations turns plans into an executable contest and training season.",
          roles: [
            {
              title: "Head of Operations",
              name: "Mohammad Rasoul Daryas",
              responsibility: "Coordinates logistics, check-in, materials, schedules, and on-ground flow.",
              linkedin: "https://www.linkedin.com/in/muhammed-rasoul-derbas-a71643283/?skipRedirect=true"
            },
            {
              title: "Operations Coordinator",
              name: "Mohammad Bitar",
              responsibility: "Handles room bookings and approvals with the university, and keeps the register of rooms and equipment assigned to the club.",
              linkedin: "https://www.linkedin.com/in/muhammad-bitar-maatoq/?skipRedirect=true"
            }
          ]
        },
        {
          title: "Scientific and Media",
          description: "Training quality and public communication make the club credible from inside and outside.",
          roles: [
            {
              title: "Head of Scientific Committee",
              name: "Mohammad Ward Kayali",
              responsibility: "Leads training direction, problem practice, scientific review, and team preparation.",
              linkedin: "https://www.linkedin.com/in/mohammed-ward-kayali-496a7b357/?skipRedirect=true"
            },
            {
              title: "Media Manager",
              name: "Baraa Nayyal",
              responsibility: "Shapes coverage, announcements, visual consistency, and the public record of the club."
            }
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
        title: "The ICPC pathway",
        description:
          "Aleppo CPC explains the full ICPC pathway clearly: team format, contest flow, qualification stages, and the preparation required to compete seriously.",
        primaryCta: {
          label: "Review achievements",
          href: "/en/achievements"
        },
        secondaryCta: {
          label: "See volunteers and operations",
          href: "/en/volunteers"
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
        title: "Results with proof",
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
    volunteers: {
      seo: {
        title: "Volunteer Teams | Aleppo CPC",
        description:
          "Meet the Aleppo CPC volunteer teams behind media, logistics, operations, technical support, and participant experience at the University of Aleppo.",
        keywords: [
          "Aleppo CPC volunteer teams",
          "programming contest volunteers Syria",
          "ICPC operations Aleppo",
          "University of Aleppo volunteers"
        ]
      },
      hero: {
        eyebrow: "Volunteers",
        title: "Volunteer teams",
        description:
          "Aleppo CPC relies on small volunteer teams that handle media, logistics, operations, technical setup, and participant support across training days and contest events.",
        primaryCta: {
          label: "See the partnerships page",
          href: "/en/sponsors"
        },
        secondaryCta: {
          label: "Explore the competition path",
          href: "/en/competition"
        }
      },
      sections: [
        {
          title: "Why these teams matter",
          body: [
            "Volunteering at Aleppo CPC is not a side task. It is one of the ways students learn responsibility, coordination, delivery, and calm decision-making under pressure.",
            "For partners, strong volunteer teams are a sign that the club can organize serious public events and sustain growth beyond a single contest day."
          ]
        }
      ],
      volunteerTracks: [
        {
          title: "Media team",
          description: "Photography, short-form video, live coverage, and the public record of club activity."
        },
        {
          title: "Logistics team",
          description: "Hall setup, supplies, seating flow, signage, and the practical details that keep the day stable."
        },
        {
          title: "Operations team",
          description: "Check-in, schedule control, announcements, issue handling, and the movement of participants through the day."
        },
        {
          title: "Technical team",
          description: "Contest machines, scoreboard screens, software readiness, printing, and fast troubleshooting when something breaks."
        },
        {
          title: "Support team",
          description: "On-ground assistance, printed materials, hospitality, and a smoother experience for students, coaches, and guests."
        }
      ]
    },
    sponsors: {
      seo: {
        title: "Sponsors and Partnerships | Aleppo CPC",
        description:
          "Partner with Aleppo CPC to support competitive programming at the University of Aleppo and reach a visible club of high-potential technical talent.",
        keywords: [
          "Aleppo CPC sponsors",
          "sponsor university competition Syria",
          "support competitive programming",
          "ICPC sponsorship"
        ]
      },
      hero: {
        eyebrow: "Partnerships",
        title: "Partner with the club",
        description:
          "Aleppo CPC gives sponsors a credible way to support student excellence, strengthen technical education, and appear across a serious university competition season.",
        primaryCta: {
          label: "Start a Partnership Conversation",
          href: "https://wa.me/971547001658"
        },
        secondaryCta: {
          label: "See the club structure",
          href: "/en/structure"
        }
      },
      sections: [
        {
          title: "Why partnership matters",
          body: [
            "ICPC training reveals students who can think under pressure, work in teams, and solve difficult technical problems with discipline.",
            "Sponsorship helps the club expand training, improve events, support teams, and document achievement with the standard it deserves."
          ]
        }
      ],
      tiers: [
        {
          name: "Lead Club Partner",
          audience: "For organizations seeking category-leading visibility.",
          benefits: [
            "Primary placement on the homepage and partnerships page",
            "Lead mention in opening and closing communications",
            "Priority logo placement on event collateral and social media"
          ]
        },
        {
          name: "Technical Partner",
          audience: "For companies supporting talent development and event operations.",
          benefits: [
            "Visible placement across event pages and digital materials",
            "Association with student excellence and practical training",
            "Potential participation in employer branding and recruitment moments"
          ]
        },
        {
          name: "Education Supporter",
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
        slug: "aleppo-university-contest-2026",
        title: "University Programming Contest - Aleppo 2026",
        status: "Upcoming",
        dateLabel: "1-2 September 2026",
        location: "University of Aleppo",
        summary:
          "135 teams registered for the 2026 university contest, with roughly 500 registered contestants, up from 66 teams in 2025.",
        details: [
          "Team participation grew by roughly 105% against the 2025 edition.",
          "Around 100 volunteers run the contest over two days at the University of Aleppo."
        ]
      },
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
      tagline: "النادي الرسمي للبرمجة التنافسية في جامعة حلب.",
      location: "حلب، سوريا",
      contactLabel: "التنسيق الرسمي",
      contactValue: "Aleppo CPC",
      whatsappLabel: "واتساب",
      whatsappValue: "+971 54 700 1658",
      email: "hello@aleppo.icpc.club",
      socialLinks: {
        instagram: "https://www.instagram.com/aleppo_cpc25/",
        linkedin: "https://www.linkedin.com/company/icpc-aleppo-university-community/?viewAsMember=true",
        telegram: "https://t.me/+JP44405xZnIxM2Vk"
      }
    },
    home: {
      seo: {
        title: "Aleppo CPC | نادي البرمجة التنافسية في جامعة حلب",
        description:
          "Aleppo CPC هو نادي جامعة حلب الذي يهيئ الطلاب لمسار ICPC عبر تدريب منظم ومسابقات جادة وإرشاد وشراكات داعمة.",
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
        title: "Aleppo CPC",
        description:
          "نادي جامعة حلب الذي يهيئ الطلاب لمسار ICPC عبر تدريب منظم، ومسابقات جادة، وإرشاد فعلي، وشراكات تدفع المواهب إلى مدى أبعد.",
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
          value: "500",
          label: "متسابق مسجّل في مسابقة 2026"
        },
        {
          value: "135",
          label: "فريق في مسابقة 2026"
        },
        {
          value: "100",
          label: "متطوع ومنظّم"
        }
      ],
      audiencePaths: [
        {
          title: "للشركاء",
          description:
            "ادعموا نادياً جامعياً يطور طلاباً تقنيين واعدين ويمنح علامتكم حضوراً موثوقاً مرتبطاً بالإنجاز والتدريب والأثر العام.",
          action: {
            label: "اكتشف قيمة الشراكة",
            href: "/ar/sponsors"
          }
        },
        {
          title: "للطلاب",
          description:
            "تعرفوا إلى مسار التدريب، وبنية المسابقات، ومراحل التأهل، وما يثبت أن فرق حلب قادرة على الوصول وطنياً وإقليمياً وعالمياً.",
          action: {
            label: "استكشف المسار",
            href: "/ar/competition"
          }
        },
        {
          title: "للمدربين",
          description:
            "اعتمدوا النادي كمرجع واضح لبنية التدريب، وتحضير الفرق، والمراحل، والنتائج الموثقة.",
          action: {
            label: "راجع الهيكل",
            href: "/ar/structure"
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
            "يقدم النادي صورة احترافية تربط الراعي بموسم جامعي جاد له إنجازات موثقة وحضور عام واضح."
        }
      ],
      editorialHighlights: [
        {
          title: "نتائج موثقة",
          description:
            "الميداليات والنتائج الإقليمية والمشاركات العالمية موثقة بوضوح."
        },
        {
          title: "نادٍ جاهز للشراكات",
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
        title: "عن Aleppo CPC | الرسالة وبنية النادي",
        description:
          "تعرف إلى دور Aleppo CPC في تطوير المواهب البرمجية في جامعة حلب عبر التدريب والمسابقات والإرشاد وبنية نادي واضحة.",
        keywords: [
          "رسالة Aleppo CPC",
          "نادي البرمجة جامعة حلب",
          "نادي ICPC سوريا",
          "تدريب البرمجة التنافسية حلب"
        ]
      },
      hero: {
        eyebrow: "عن النادي",
        title: "نادي مبني لمسار ICPC",
        description:
          "يوفر Aleppo CPC للطلاب مساراً منظماً إلى ICPC: تدريباً، وتشكيل فرق، وممارسة تنافسية، وتشغيلاً، وتوثيقاً، وقيادة تنتقل من موسم إلى آخر.",
        primaryCta: {
          label: "شاهد هيكل النادي",
          href: "/ar/structure"
        },
        secondaryCta: {
          label: "استكشف مسار ICPC",
          href: "/ar/competition"
        }
      },
      sections: [
        {
          title: "الرسالة",
          body: [
            "بناء طلاب منضبطين في حل المشكلات عبر تدريب منتظم، وممارسة تنافسية، وإرشاد، وعمل جماعي.",
            "ترسيخ بنية واضحة للنادي تجعل عمله مفهوماً وموثوقاً للطلاب والمدربين والشركاء والجامعة."
          ]
        },
        {
          title: "الرؤية",
          body: [
            "ترسيخ جامعة حلب كمصدر مستدام لمواهب ICPC والقيادة التقنية والحضور التنافسي الإقليمي.",
            "تنمية نادٍ يبقى مفيداً للطلاب وموثوقاً للشركاء ومفهوماً داخل منظومة ICPC الأوسع."
          ]
        },
        {
          title: "كيف يعمل النادي",
          body: [
            "Aleppo CPC ليس فريق مسابقة فقط، بل نادٍ طلابي يعمل عبر التدريب، والمسابقات، والإعلام، والتوثيق، والعمليات، والتطوع.",
            "يساعد هذا الهيكل النادي على التوسع من فعالية إلى أخرى، ويمنح الطلاب خبرة عملية في المسؤولية والتنفيذ والتعاون."
          ]
        }
      ]
    },
    structure: {
      seo: {
        title: "هيكل النادي | Aleppo CPC",
        description:
          "تعرف إلى الهيكل التنظيمي لنادي Aleppo CPC وأدوار القيادة والفرق المسؤولة عن التدريب والإعلام والعمليات والتطوير وتنفيذ المسابقات.",
        keywords: [
          "هيكل Aleppo CPC",
          "نادي البرمجة التنافسية جامعة حلب",
          "قيادة Aleppo CPC",
          "تشغيل مسابقات ICPC حلب"
        ]
      },
      hero: {
        eyebrow: "هيكل النادي",
        title: "هيكل النادي",
        description:
          "ينظم النادي عمله عبر الإشراف، والقيادة، والعمليات، والتدريب العلمي، والتطوير، والإعلام، وتنسيق القاعات حتى يتحرك كل موسم بوضوح.",
        primaryCta: {
          label: "شاركوا النادي",
          href: "/ar/sponsors"
        },
        secondaryCta: {
          label: "تعرفوا إلى تشغيل النادي",
          href: "/ar/volunteers"
        }
      },
      sections: [
        {
          title: "كيف يعمل النادي",
          body: [
            "تبقي الفرق الواضحة الموسم متماسكاً: التدريب، المسابقة، الإعلام، التوثيق، العمليات، اللوجستيك، والدعم التقني.",
            "الهيكل أدناه يحول النادي من نشاط متفرق إلى نظام عمل قابل للتكرار للطلاب والمدربين والشركاء."
          ]
        }
      ],
      supervisor: {
        title: "المشرف العام",
        name: "عبد القادر قصاب",
        responsibility: "يحافظ على اتساق النادي مع رسالته وعلاقاته الجامعية واستمراريته طويلة المدى.",
        linkedin: "https://www.linkedin.com/in/abdulqader-qassab"
      },
      leadership: [
        {
          title: "رئيس النادي",
          name: "بسام سليمان",
          responsibility: "ينسق خطة الموسم وقادة الفرق والأولويات والإيقاع الرسمي للنادي.",
          linkedin: "https://www.linkedin.com/in/bassam-sulaiman/?skipRedirect=true"
        },
        {
          title: "نائب الرئيس",
          name: "عبد الكريم جمل",
          responsibility: "يدعم التنفيذ بين الفرق ويحافظ على حركة التنسيق الداخلي."
        }
      ],
      groups: [
        {
          title: "التقنية والتطوير",
          description: "يحافظ المسار التقني على جاهزية الأنظمة وبنية المسابقة والأدوات الرقمية.",
          roles: [
            {
              title: "مدير الأنظمة التقنية",
              name: "محمد مرتكلي",
              responsibility: "يتابع أجهزة المسابقة وجاهزية البنية التقنية ومعايير التشغيل.",
              linkedin: "https://www.linkedin.com/in/mohamad-mazkatli-763715251/"
            },
            {
              title: "رئيس التطوير",
              name: "محمد بيطار",
              responsibility: "يطور الموقع والأدوات البرمجية والواجهات الرقمية الداعمة للنادي.",
              linkedin: "https://www.linkedin.com/in/muhammad-bitar-maatoq/?skipRedirect=true"
            }
          ]
        },
        {
          title: "عمليات النادي",
          description: "تحول العمليات الخطط إلى موسم تدريبي ومسابقة قابلة للتنفيذ.",
          roles: [
            {
              title: "رئيس العمليات",
              name: "محمد رسول درياس",
              responsibility: "ينسق اللوجستيك والتسجيل والمواد والجداول وحركة المشاركين.",
              linkedin: "https://www.linkedin.com/in/muhammed-rasoul-derbas-a71643283/?skipRedirect=true"
            },
            {
              title: "منسق العمليات",
              name: "محمد بيطار",
              responsibility: "يتابع حجوزات القاعات والموافقات الإدارية، ويحفظ سجل الغرف والتجهيزات المسجلة للنادي.",
              linkedin: "https://www.linkedin.com/in/muhammad-bitar-maatoq/?skipRedirect=true"
            }
          ]
        },
        {
          title: "العلمي والإعلام",
          description: "جودة التدريب والتواصل العام يجعلان النادي موثوقاً من الداخل والخارج.",
          roles: [
            {
              title: "رئيس اللجنة العلمية",
              name: "محمد ورد كيالي",
              responsibility: "يقود اتجاه التدريب وممارسة المسائل والمراجعة العلمية وتحضير الفرق.",
              linkedin: "https://www.linkedin.com/in/mohammed-ward-kayali-496a7b357/?skipRedirect=true"
            },
            {
              title: "مدير الإعلام",
              name: "براء نيال",
              responsibility: "يشكل التغطية والإعلانات والاتساق البصري والسجل العام للنادي."
            }
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
        title: "مسار ICPC",
        description:
          "يشرح Aleppo CPC مسار ICPC كاملاً بوضوح: تشكيل الفريق، وآلية المسابقة، ومراحل التأهل، والاستعداد المطلوب للمنافسة الجادة.",
        primaryCta: {
          label: "راجع الإنجازات",
          href: "/ar/achievements"
        },
        secondaryCta: {
          label: "شاهد المتطوعين والتشغيل",
          href: "/ar/volunteers"
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
        title: "نتائج موثقة",
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
    volunteers: {
      seo: {
        title: "فرق المتطوعين | Aleppo CPC",
        description:
          "تعرّف إلى فرق المتطوعين في Aleppo CPC التي تقود الإعلام واللوجستيك والعمليات والدعم التقني وتجربة المشاركين داخل جامعة حلب.",
        keywords: [
          "فرق متطوعي Aleppo CPC",
          "التطوع في المسابقة البرمجية",
          "تشغيل فعاليات ICPC",
          "التطوع جامعة حلب"
        ]
      },
      hero: {
        eyebrow: "المتطوعون",
        title: "فرق الموسم",
        description:
          "يعتمد Aleppo CPC على فرق تطوعية صغيرة تتولى الإعلام، واللوجستيك، والعمليات، والتجهيز التقني، ودعم المشاركين في أيام التدريب والمسابقة.",
        primaryCta: {
          label: "صفحة الشراكات",
          href: "/ar/sponsors"
        },
        secondaryCta: {
          label: "استكشف مسار المسابقة",
          href: "/ar/competition"
        }
      },
      sections: [
        {
          title: "لماذا تهم هذه الفرق",
          body: [
            "التطوع في Aleppo CPC ليس مهمة جانبية، بل مساحة يتعلم فيها الطلاب المسؤولية، والتنسيق، والتنفيذ، واتخاذ القرار بهدوء تحت الضغط.",
            "كما يرى الشركاء في هذه الفرق دليلاً واضحاً على أن النادي قادر على تنظيم فعاليات جادة وبناء نمو مستمر يتجاوز يوم المسابقة نفسه."
          ]
        }
      ],
      volunteerTracks: [
        {
          title: "فريق الإعلام",
          description: "التصوير، والفيديو القصير، والتغطية المباشرة، وبناء السجل العام لأنشطة النادي."
        },
        {
          title: "فريق اللوجستيك",
          description: "تهيئة القاعات، والمواد، والطاولات، واللافتات، والتفاصيل التي تحفظ استقرار اليوم."
        },
        {
          title: "فريق العمليات",
          description: "التسجيل، وإدارة الجدول، والإعلانات، وحل المشكلات، وتنظيم حركة المشاركين طوال اليوم."
        },
        {
          title: "الفريق التقني",
          description: "تجهيز الأجهزة، وشاشات العرض والسكوربورد، والبرمجيات، والمعالجة السريعة للأعطال عند الحاجة."
        },
        {
          title: "فريق الدعم",
          description: "المساندة الميدانية، وتوزيع المواد، والضيافة، وتقديم تجربة أكثر سلاسة للطلاب والمدربين والضيوف."
        }
      ]
    },
    sponsors: {
      seo: {
        title: "الشراكات والرعايات | Aleppo CPC",
        description:
          "شارك مع Aleppo CPC لدعم البرمجة التنافسية في جامعة حلب والوصول إلى نادٍ واضح من المواهب التقنية الواعدة.",
        keywords: [
          "رعاة Aleppo CPC",
          "رعاية مسابقة جامعية سوريا",
          "دعم البرمجة التنافسية",
          "رعاية ICPC"
        ]
      },
      hero: {
        eyebrow: "الشراكات",
        title: "شراكة مع النادي",
        description:
          "يمنح Aleppo CPC الرعاة طريقاً موثوقاً لدعم التميز الطلابي، وتعزيز التعليم التقني، والظهور ضمن موسم جامعي تنافسي جاد.",
        primaryCta: {
          label: "ابدأ محادثة شراكة",
          href: "https://wa.me/971547001658"
        },
        secondaryCta: {
          label: "شاهد هيكل النادي",
          href: "/ar/structure"
        }
      },
      sections: [
        {
          title: "لماذا الشراكة مهمة",
          body: [
            "يكشف تدريب ICPC عن طلاب قادرين على التفكير تحت الضغط، والعمل ضمن فرق، وحل مشكلات تقنية صعبة بانضباط.",
            "تساعد الرعاية النادي على توسيع التدريب، وتحسين الفعاليات، ودعم الفرق، وتوثيق الإنجاز بالمستوى الذي يستحقه."
          ]
        }
      ],
      tiers: [
        {
          name: "الشريك الرئيسي للنادي",
          audience: "للجهات التي تبحث عن أعلى مستوى من الظهور والارتباط بالنادي.",
          benefits: [
            "حضور أساسي في الصفحة الرئيسية وصفحة الشراكات",
            "ذكر بارز في الافتتاح والختام",
            "أولوية في الظهور على المواد المطبوعة والمنشورات"
          ]
        },
        {
          name: "الشريك التقني",
          audience: "للشركات الداعمة للمواهب التقنية وتشغيل الفعاليات.",
          benefits: [
            "ظهور واضح في صفحات الفعاليات والمواد الرقمية",
            "ارتباط مباشر بتميّز الطلاب والتدريب العملي",
            "إمكانية إدماج رسائل توظيف أو بناء علامة صاحب العمل"
          ]
        },
        {
          name: "داعم التعليم",
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
        slug: "aleppo-university-contest-2026",
        title: "المسابقة البرمجية الجامعية - حلب 2026",
        status: "قادمة",
        dateLabel: "1 - 2 أيلول 2026",
        location: "جامعة حلب",
        summary:
          "سجّل في مسابقة الجامعة لعام 2026 مئة وخمسة وثلاثون فريقاً، بنحو 500 متسابق مسجّل، مقارنة بـ66 فريقاً في 2025.",
        details: [
          "نمت مشاركة الفرق بنسبة تقارب 105% مقارنة بنسخة 2025.",
          "ينفّذ نحو 100 متطوع المسابقة على مدى يومين في جامعة حلب."
        ]
      },
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

/**
 * Content accessors.
 *
 * Everything the site renders is the bilingual data above — there is no CMS and
 * no runtime fetch, so every page is fully static. These stay `async` because
 * the pages `await` them, and because that is the seam a CMS would slot into
 * later without touching a single call site.
 */

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  return defaults[locale].settings;
}

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  return defaults[locale].home;
}

export async function getAboutContent(locale: Locale): Promise<GenericPageContent> {
  return defaults[locale].about;
}

export async function getStructureContent(locale: Locale): Promise<StructurePageContent> {
  return defaults[locale].structure;
}

export async function getCompetitionContent(locale: Locale): Promise<CompetitionPageContent> {
  return defaults[locale].competition;
}

export async function getAchievementsPageContent(
  locale: Locale
): Promise<AchievementsPageContent> {
  return defaults[locale].achievements;
}

export async function getVolunteersPageContent(locale: Locale): Promise<VolunteersPageContent> {
  return defaults[locale].volunteers;
}

export async function getSponsorsPageContent(locale: Locale): Promise<SponsorsPageContent> {
  return defaults[locale].sponsors;
}

export async function getAchievements(locale: Locale): Promise<AchievementItem[]> {
  return defaults[locale].achievementsList;
}

export async function getEvents(locale: Locale): Promise<EventItem[]> {
  return defaults[locale].eventsList;
}

export async function getSponsors(locale: Locale): Promise<SponsorItem[]> {
  return defaults[locale].sponsorList;
}
