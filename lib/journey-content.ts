import { localizedPath, type Locale } from "@/lib/i18n";

type JourneyMetric = {
  value: string;
  label: string;
};

type JourneyMapMarker = {
  x: number;
  y: number;
  label: string;
  tone?: "muted" | "strong";
};

type JourneyMap = {
  routePath: string;
  markers: JourneyMapMarker[];
  pin: { x: number; y: number; halo: number };
};

export type JourneyLevelData = {
  id: string;
  levelLabel: string;
  title: string;
  description: string;
  proof: JourneyMetric[];
  side: "start" | "end";
  map: JourneyMap;
};

export type JourneyContent = {
  title: string;
  intro: string;
  sponsor: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  levels: JourneyLevelData[];
};

export function getJourneyContent(locale: Locale): JourneyContent {
  return locale === "ar"
    ? {
        title: "من حلب إلى العالم",
        intro:
          "يبدأ هذا المسار من قاعات التدريب والفعاليات في حلب، ثم يتوسع إلى المنافسة السورية، فالإقليمية، ثم إلى الطموح العالمي. كل خطوة هنا تبني طالباً أقوى وتمثيلاً أوسع للنادي.",
        sponsor: {
          title: "ساعد الفريق القادم على الوصول إلى المسرح العالمي",
          description:
            "رعايتك تدعم التدريب، والمسابقات، والسفر، والإرشاد، ومستقبل المواهب في البرمجة التنافسية القادمة من حلب.",
          primary: {
            label: "كن شريكاً راعياً",
            href: localizedPath(locale, "sponsors")
          },
          secondary: {
            label: "اطّلع على أثرنا",
            href: localizedPath(locale, "achievements")
          }
        },
        levels: [
          {
            id: "aleppo",
            levelLabel: "مستوى حلب",
            title: "هنا تبدأ الحكاية",
            description:
              "كل رحلة تبدأ من هنا، في حلب، حيث يلتقي الطلاب، ويتدرّبون، ويتنافسون، ويكتشفون قوة التفكير الخوارزمي والعمل الجماعي.",
            proof: [
              { value: "230", label: "مشاركاً في خطة فعالية 2025" },
              { value: "60-70", label: "فريقاً في المسابقة المحلية" },
              { value: "100+", label: "متطوع ومساهم في التشغيل" }
            ],
            side: "start",
            map: {
              routePath: "M212 418 C292 372 350 334 420 286",
              markers: [{ x: 420, y: 286, label: "حلب" }],
              pin: { x: 420, y: 286, halo: 92 }
            }
          },
          {
            id: "syria",
            levelLabel: "المستوى السوري",
            title: "من المدينة إلى الساحة الوطنية",
            description:
              "من المسابقات المحلية إلى المستوى الوطني، تحمل فرقنا روح حلب إلى المنظومة السورية للبرمجة التنافسية بثقة وتنظيم وطموح أعلى.",
            proof: [
              { value: "4", label: "ميداليات في المسابقة السورية 2025" },
              { value: "1+1", label: "بطل ووصيف على مستوى سوريا في 2024" },
              { value: "3", label: "طلاب في كل فريق ICPC" }
            ],
            side: "end",
            map: {
              routePath: "M308 224 C362 216 428 232 506 288",
              markers: [
                { x: 308, y: 224, label: "حلب" },
                { x: 506, y: 288, label: "سوريا", tone: "muted" }
              ],
              pin: { x: 308, y: 224, halo: 86 }
            }
          },
          {
            id: "region",
            levelLabel: "العرب وأفريقيا",
            title: "هناك يتغير حجم المنافسة",
            description:
              "خارج الحدود، يتنافس طلابنا ويتعاونون وينمون مع أبرز العقول في المنطقة العربية والأفريقية، وتتحول النتائج إلى حضور إقليمي حقيقي.",
            proof: [
              { value: "2", label: "ميداليتان إقليميتان موثقتان في 2025" },
              { value: "ذهب + برونز", label: "نتيجة موثقة في ACPC" },
              { value: "ACPC", label: "بوابة العبور الإقليمية" }
            ],
            side: "start",
            map: {
              routePath: "M586 244 C524 250 462 286 374 334",
              markers: [
                { x: 586, y: 244, label: "سوريا" },
                { x: 374, y: 334, label: "العرب وأفريقيا" }
              ],
              pin: { x: 586, y: 244, halo: 82 }
            }
          },
          {
            id: "world",
            levelLabel: "المستوى الدولي",
            title: "والوجهة هي المسرح العالمي",
            description:
              "وجهتنا هي العالم: بناء فرق قادرة على تمثيل حلب وسوريا والمنطقة في الساحات الدولية بثقة واستعداد ومعايير تنافسية عالية.",
            proof: [
              { value: "3", label: "ظهورات موثقة في نهائيات العالم" },
              { value: "ICPC", label: "حضور على المسرح الدولي" },
              { value: "World Finals", label: "الوجهة التي يبني لها هذا المسار" }
            ],
            side: "end",
            map: {
              routePath: "M494 292 C572 246 656 236 732 254",
              markers: [
                { x: 494, y: 292, label: "العرب وأفريقيا" },
                { x: 732, y: 254, label: "العالم" }
              ],
              pin: { x: 494, y: 292, halo: 96 }
            }
          }
        ]
      }
    : {
        title: "From Aleppo to the World",
        intro:
          "The journey starts in Aleppo's training rooms and contest halls, then expands into Syria, the Arab and Africa region, and the wider world stage. Each step turns local preparation into broader representation.",
        sponsor: {
          title: "Help the next team reach the world stage",
          description:
            "Your sponsorship supports training, contests, travel, mentorship, and the future of competitive programming talent from Aleppo.",
          primary: {
            label: "Become a Sponsor",
            href: localizedPath(locale, "sponsors")
          },
          secondary: {
            label: "See Our Impact",
            href: localizedPath(locale, "achievements")
          }
        },
        levels: [
          {
            id: "aleppo",
            levelLabel: "Aleppo Level",
            title: "This is where the journey begins",
            description:
              "Every journey begins here, in Aleppo, where students meet, train, compete, and discover the power of problem solving together.",
            proof: [
              { value: "230", label: "participants in the 2025 event plan" },
              { value: "60-70", label: "teams in the local contest plan" },
              { value: "100+", label: "volunteers and contributors" }
            ],
            side: "start",
            map: {
              routePath: "M212 418 C292 372 350 334 420 286",
              markers: [{ x: 420, y: 286, label: "Aleppo" }],
              pin: { x: 420, y: 286, halo: 92 }
            }
          },
          {
            id: "syria",
            levelLabel: "Syrian Level",
            title: "Local teams move onto the national stage",
            description:
              "From local contests to the national stage, our teams carry Aleppo's spirit into Syria's competitive programming ecosystem.",
            proof: [
              { value: "4", label: "medals in the Syrian contest in 2025" },
              { value: "1+1", label: "champion and runner-up season in 2024" },
              { value: "3", label: "students in each ICPC team" }
            ],
            side: "end",
            map: {
              routePath: "M308 224 C362 216 428 232 506 288",
              markers: [
                { x: 308, y: 224, label: "Aleppo" },
                { x: 506, y: 288, label: "Syria", tone: "muted" }
              ],
              pin: { x: 308, y: 224, halo: 86 }
            }
          },
          {
            id: "region",
            levelLabel: "Arab & Africa Level",
            title: "Regional competition raises the scale",
            description:
              "Beyond borders, our students compete, collaborate, and grow with the brightest minds across the Arab and African region.",
            proof: [
              { value: "2", label: "documented regional medals in 2025" },
              { value: "Gold + Bronze", label: "recorded ACPC result" },
              { value: "ACPC", label: "the regional gateway for the journey" }
            ],
            side: "start",
            map: {
              routePath: "M586 244 C524 250 462 286 374 334",
              markers: [
                { x: 586, y: 244, label: "Syria" },
                { x: 374, y: 334, label: "Arab & Africa" }
              ],
              pin: { x: 586, y: 244, halo: 82 }
            }
          },
          {
            id: "world",
            levelLabel: "International Level",
            title: "The destination is the world stage",
            description:
              "Our destination is the world stage, building teams capable of representing Aleppo, Syria, and the region internationally.",
            proof: [
              { value: "3", label: "documented World Finals appearances" },
              { value: "ICPC", label: "global competition platform" },
              { value: "World Finals", label: "the ambition this pathway serves" }
            ],
            side: "end",
            map: {
              routePath: "M494 292 C572 246 656 236 732 254",
              markers: [
                { x: 494, y: 292, label: "Arab & Africa" },
                { x: 732, y: 254, label: "World" }
              ],
              pin: { x: 494, y: 292, halo: 96 }
            }
          }
        ]
      };
}
