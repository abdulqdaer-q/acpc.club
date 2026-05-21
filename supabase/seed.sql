insert into public.site_settings (
  organization_name_en,
  organization_name_ar,
  tagline_en,
  tagline_ar,
  location_en,
  location_ar,
  contact_label_en,
  contact_label_ar,
  contact_value,
  whatsapp_label_en,
  whatsapp_label_ar,
  whatsapp_value,
  email,
  instagram_url,
  linkedin_url,
  is_active
)
values (
  'Aleppo CPC',
  'Aleppo CPC',
  'The official home of competitive programming at the University of Aleppo.',
  'النادي الرسمي للبرمجة التنافسية في جامعة حلب.',
  'Aleppo, Syria',
  'حلب، سوريا',
  'Official coordination',
  'التنسيق الرسمي',
  'Aleppo CPC',
  'WhatsApp',
  'واتساب',
  '+971 54 700 1658',
  'hello@acpc.club',
  'https://www.instagram.com/aleppo_cpc25/',
  'https://www.linkedin.com/company/icpc-aleppo-university-community/?viewAsMember=true',
  true
)
on conflict do nothing;

insert into public.site_pages (slug, locale, seo_title, seo_description, seo_keywords, payload, published)
values
  (
    'home',
    'en',
    'Aleppo CPC | Competitive Programming Club at the University of Aleppo',
    'Aleppo Competitive Programming Club prepares University of Aleppo students for ICPC through disciplined training, serious contests, mentorship, and partner support.',
    array['Aleppo CPC', 'University of Aleppo competitive programming club', 'University of Aleppo ICPC'],
    $$
    {
      "hero": {
        "eyebrow": "",
        "title": "Aleppo Competitive Programming Club",
        "description": "The University of Aleppo club preparing students for ICPC through disciplined training, serious contests, mentorship, and partnerships that help talent go further.",
        "primaryCta": { "label": "Partner with Aleppo CPC", "href": "/en/sponsors" },
        "secondaryCta": { "label": "Explore the ICPC pathway", "href": "/en/competition" }
      }
    }
    $$::jsonb,
    true
  ),
  (
    'home',
    'ar',
    'Aleppo CPC | نادي البرمجة التنافسية في جامعة حلب',
    'Aleppo CPC هو نادي جامعة حلب الذي يهيئ الطلاب لمسار ICPC عبر تدريب منظم ومسابقات جادة وإرشاد وشراكات داعمة.',
    array['Aleppo CPC', 'نادي البرمجة التنافسية جامعة حلب', 'جامعة حلب ICPC'],
    $$
    {
      "hero": {
        "eyebrow": "",
        "title": "نادي حلب للبرمجة التنافسية",
        "description": "نادي جامعة حلب الذي يهيئ الطلاب لمسار ICPC عبر تدريب منظم، ومسابقات جادة، وإرشاد فعلي، وشراكات تدفع المواهب إلى مدى أبعد.",
        "primaryCta": { "label": "كن شريكاً مع Aleppo CPC", "href": "/ar/sponsors" },
        "secondaryCta": { "label": "استكشف مسار ICPC", "href": "/ar/competition" }
      }
    }
    $$::jsonb,
    true
  ),
  (
    'sponsors',
    'en',
    'Sponsors and Partnerships | Aleppo CPC',
    'Partner with Aleppo CPC to support competitive programming at the University of Aleppo and reach a visible club of high-potential technical talent.',
    array['Aleppo CPC sponsors', 'ICPC sponsorship', 'support competitive programming'],
    $$
    {
      "hero": {
        "eyebrow": "Partnerships",
        "title": "Partner with the club developing Aleppo's next ICPC teams.",
        "description": "Aleppo CPC gives sponsors a credible way to support student excellence, strengthen technical education, and appear across a serious university competition season.",
        "primaryCta": { "label": "Start a Partnership Conversation", "href": "https://wa.me/971547001658" },
        "secondaryCta": { "label": "See the club structure", "href": "/en/structure" }
      }
    }
    $$::jsonb,
    true
  ),
  (
    'sponsors',
    'ar',
    'الرعاة والشراكات | Aleppo CPC',
    'شارك مع Aleppo CPC لدعم البرمجة التنافسية في جامعة حلب والوصول إلى نادٍ واضح من المواهب التقنية الواعدة.',
    array['رعاة Aleppo CPC', 'رعاية ICPC', 'دعم البرمجة التنافسية'],
    $$
    {
      "hero": {
        "eyebrow": "الشراكات",
        "title": "شاركوا النادي الذي يصنع فرق ICPC القادمة من حلب.",
        "description": "يمنح Aleppo CPC الرعاة طريقاً موثوقاً لدعم التميز الطلابي، وتعزيز التعليم التقني، والظهور ضمن موسم جامعي تنافسي جاد.",
        "primaryCta": { "label": "ابدأ محادثة شراكة", "href": "https://wa.me/971547001658" },
        "secondaryCta": { "label": "شاهد هيكل النادي", "href": "/ar/structure" }
      }
    }
    $$::jsonb,
    true
  )
on conflict (slug, locale) do update
set
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  seo_keywords = excluded.seo_keywords,
  payload = excluded.payload,
  published = excluded.published;

insert into public.achievements (
  year,
  stage,
  medal,
  title_en,
  title_ar,
  summary_en,
  summary_ar,
  highlight_en,
  highlight_ar,
  sort_order,
  published
)
values
  (2016, 'regional', 'gold', 'Regional gold and World Finals qualification', 'ذهبية إقليمية وتأهل إلى النهائي العالمي', 'Aleppo teams earned regional gold and advanced to the ICPC World Finals in Thailand.', 'حققت فرق حلب ميدالية ذهبية على مستوى العرب وأفريقيا وتأهلت إلى النهائي العالمي في تايلاند.', 'Qualified to the World Finals', 'تأهل إلى النهائي العالمي', 10, true),
  (2018, 'regional', 'silver', 'Regional silver medal', 'ميدالية فضية إقليمية', 'The University of Aleppo secured a silver medal at the Arab and Africa regional contest.', 'أحرزت جامعة حلب ميدالية فضية على مستوى الإقليم العربي وأفريقيا.', 'Regional podium finish', 'منصة تتويج إقليمية', 20, true),
  (2019, 'world_finals', null, 'World Finals appearance in Portugal', 'مشاركة في النهائي العالمي في البرتغال', 'Aleppo qualified for and participated in the ICPC World Finals hosted in Portugal.', 'تأهلت حلب إلى النهائي العالمي وشاركت في النسخة التي أُقيمت في البرتغال.', 'International representation', 'حضور دولي', 30, true),
  (2021, 'regional', 'bronze', 'Regional bronze and world finals', 'برونزية إقليمية وتأهل عالمي', 'Aleppo earned bronze at the regional level and advanced to the world finals in Bangladesh.', 'حققت حلب ميدالية برونزية على مستوى الإقليم وتأهلت إلى النهائي العالمي في بنغلادش.', 'Medal plus qualification', 'ميدالية وتأهل', 40, true),
  (2023, 'regional', 'bronze', 'Regional bronze and World Finals appearance', 'برونزية إقليمية ومشاركة عالمية في مصر', 'Aleppo earned another bronze medal and reached the ICPC World Finals in Egypt.', 'أضافت الجامعة ميدالية برونزية جديدة تبعتها مشاركة في النهائي العالمي في مصر.', 'Consistent international presence', 'استمرارية دولية', 50, true),
  (2024, 'national', null, 'Champion and runner-up in Syria', 'بطل ووصيف سوريا', 'Aleppo finished as both champion and runner-up in the Syrian programming contest.', 'حققت حلب المركزين الأول والثاني في المسابقة البرمجية السورية.', 'National dominance', 'هيمنة وطنية', 60, true),
  (2025, 'national', null, 'Four Syrian medals', 'أربع ميداليات في المسابقة السورية', 'Aleppo teams won four of the ten medals awarded in the Syrian contest.', 'فازت فرق حلب بأربع ميداليات من أصل عشر في المسابقة السورية.', 'Strong national season', 'موسم وطني قوي', 70, true),
  (2025, 'regional', 'gold', 'Regional gold and bronze plus world finals qualification', 'ذهبية وبرونزية إقليميتان وتأهل عالمي', 'Aleppo added gold and bronze at the Arab and Africa level and qualified to the World Finals in Dubai.', 'أضافت حلب ميدالية ذهبية وأخرى برونزية على مستوى العرب وأفريقيا وتأهلت إلى النهائي العالمي في دبي.', 'Qualified to the World Finals in Dubai', 'تأهل إلى النهائي العالمي في دبي', 80, true)
on conflict do nothing;

insert into public.events (
  slug,
  status,
  starts_at,
  ends_at,
  venue_en,
  venue_ar,
  city_en,
  city_ar,
  title_en,
  title_ar,
  summary_en,
  summary_ar,
  details_en,
  details_ar,
  contestant_count,
  coach_count,
  volunteer_count,
  published,
  sort_order
)
values (
  'aleppo-university-contest-2025',
  'archive reference',
  '2025-07-16',
  '2025-07-17',
  'Central Library - Citizen Service Hall',
  'المكتبة المركزية - قاعة خدمة المواطن',
  'University of Aleppo',
  'جامعة حلب',
  'University Programming Contest - Aleppo 2025',
  'المسابقة البرمجية الجامعية - حلب 2025',
  'The 2025 planning materials outline a two-day university contest with 230 total participants and multiple support teams.',
  'توضح مواد التخطيط لعام 2025 فعالية جامعية على يومين مع 230 مشاركاً إجمالياً وعدة فرق داعمة.',
  array[
    'The supporting documents mention approximately 210 contestants plus 20 coaches and supervisors.',
    'Operational coverage included media, logistics, technical delivery, judging, and participant flow.',
    'The budget emphasized venue setup, food, printed materials, awards, team shirts, and judge accommodation.'
  ],
  array[
    'تذكر المواد المرجعية رقماً تقريبياً يبلغ 210 متسابقين إضافة إلى 20 مدرباً ومشرفاً.',
    'شملت الخطة الإعلام واللوجستيك والتجهيز التقني والتحكيم وتنظيم حركة المشاركين.',
    'ركزت الميزانية على تجهيز المكان والطعام والمطبوعات والجوائز والكنزات وإقامة الحكام.'
  ],
  210,
  20,
  100,
  true,
  10
)
on conflict (slug) do update
set
  status = excluded.status,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  venue_en = excluded.venue_en,
  venue_ar = excluded.venue_ar,
  city_en = excluded.city_en,
  city_ar = excluded.city_ar,
  title_en = excluded.title_en,
  title_ar = excluded.title_ar,
  summary_en = excluded.summary_en,
  summary_ar = excluded.summary_ar,
  details_en = excluded.details_en,
  details_ar = excluded.details_ar,
  contestant_count = excluded.contestant_count,
  coach_count = excluded.coach_count,
  volunteer_count = excluded.volunteer_count,
  published = excluded.published,
  sort_order = excluded.sort_order;

insert into public.event_workstreams (
  event_id,
  code,
  title_en,
  title_ar,
  summary_en,
  summary_ar,
  sort_order
)
select
  e.id,
  v.code,
  v.title_en,
  v.title_ar,
  v.summary_en,
  v.summary_ar,
  v.sort_order
from public.events e
cross join (
  values
    ('media', 'Media', 'الإعلام', 'Photography, video coverage, and publishing.', 'التصوير والفيديو والنشر الإعلامي.', 10),
    ('logistics', 'Logistics', 'اللوجستيك', 'Venue, supplies, seating, power, and accommodation coordination.', 'تجهيز المكان والمواد والكهرباء والسكن والنقل.', 20),
    ('ops', 'Operations', 'العمليات', 'Check-in, schedule control, participant flow, and issue handling.', 'التسجيل وإدارة الجدول وتنظيم حركة المشاركين وحل المشكلات.', 30),
    ('tech', 'Technical', 'الفريق التقني', 'Contest devices, screens, software setup, and troubleshooting.', 'تجهيز الأجهزة والعرض البرمجي والبرمجيات وحل الأعطال.', 40),
    ('volunteers', 'Volunteers', 'المتطوعون', 'On-ground assistance, printed material delivery, and participant support.', 'المساندة الميدانية وتوزيع المطبوعات ودعم المشاركين.', 50)
) as v(code, title_en, title_ar, summary_en, summary_ar, sort_order)
where e.slug = 'aleppo-university-contest-2025'
  and not exists (
    select 1
    from public.event_workstreams ew
    where ew.event_id = e.id
      and ew.code = v.code
  );
