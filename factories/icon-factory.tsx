import { IconBaseProps } from "react-icons";
import * as FaIcons from "react-icons/fa";

export type IconName = keyof typeof FaIcons;

export function resolveIcon(iconName: string, props?: IconBaseProps) {
  const IconComponent = FaIcons[iconName as IconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in Font Awesome icons`);
    return null;
  }

  return <IconComponent {...props} />;
}

export function hasIcon(iconName: string): boolean {
  return iconName in FaIcons;
}

export function getAvailableIcons(): string[] {
  return Object.keys(FaIcons);
}
