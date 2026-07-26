import Link from "next/link";

type HomeSectionCtaProps = {
  href: string;
  label: string;
  icon?: string;
};

export function HomeSectionCta({ href, label, icon }: HomeSectionCtaProps) {
  return (
    <div className="section-action">
      <Link className="button button-primary" href={href}>
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        <span>{label}</span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
