import type { StructurePageContent } from "@/lib/site-content";

type ClubStructureProps = {
  content: StructurePageContent;
};

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <rect height="14" rx="3" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
      <path d="M9 10v5.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <circle cx="9" cy="8.25" fill="currentColor" r="1" />
      <path
        d="M12.5 15.5V10m0 1.4c.6-.95 1.34-1.4 2.22-1.4 1.48 0 2.28 1 2.28 2.82v2.68"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function RoleCard({
  role,
  tone = "default"
}: {
  role: StructurePageContent["supervisor"];
  tone?: "default" | "lead";
}) {
  const initials = role.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <article className="org-role-card" data-tone={tone}>
      <span className="org-role-initials" aria-hidden="true">
        {initials}
      </span>
      <div className="org-role-body">
        <p className="section-kicker">{role.title}</p>
        <div className="org-role-heading">
          <h3>{role.name}</h3>
          {role.linkedin ? (
            <a
              aria-label={`Open LinkedIn profile for ${role.name}`}
              className="org-profile-link"
              href={role.linkedin}
              rel="noreferrer"
              target="_blank"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          ) : null}
        </div>
        <p className="item-copy">{role.responsibility}</p>
      </div>
    </article>
  );
}

export function ClubStructure({ content }: ClubStructureProps) {
  return (
    <section className="org-chart" aria-label={content.hero.title}>
      <div className="org-supervisor">
        <RoleCard role={content.supervisor} tone="lead" />
      </div>

      <div className="org-line org-line-main" aria-hidden="true" />

      <div className="org-leadership">
        {content.leadership.map((role) => (
          <RoleCard key={`${role.title}-${role.name}`} role={role} tone="lead" />
        ))}
      </div>

      <div className="org-line org-line-branches" aria-hidden="true" />

      <div className="org-groups">
        {content.groups.map((group) => (
          <section className="org-group" key={group.title}>
            <div className="org-group-head">
              <p className="section-kicker">{group.title}</p>
              <p className="item-copy">{group.description}</p>
            </div>

            <div className="org-group-roles">
              {group.roles.map((role) => (
                <RoleCard key={`${group.title}-${role.title}-${role.name}`} role={role} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
