import type { IconBaseProps, IconType } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Icons are resolved by their name prefix: "Si*" from Simple Icons,
// "Fa*" from Font Awesome (kept for platforms Simple Icons lacks, e.g. Deezer).
const iconSets: Record<string, Record<string, IconType>> = {
  Si: SiIcons,
  Fa: FaIcons,
};

export function resolveIcon(iconName: string, props?: IconBaseProps) {
  const prefix = iconName.slice(0, 2);
  const IconComponent = iconSets[prefix]?.[iconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in react-icons`);
    return null;
  }

  return <IconComponent {...props} />;
}

export function hasIcon(iconName: string): boolean {
  const prefix = iconName.slice(0, 2);
  return Boolean(iconSets[prefix]?.[iconName]);
}

export function getAvailableIcons(): string[] {
  return Object.values(iconSets).flatMap((set) => Object.keys(set));
}