export enum NavigationRoute {
  HOME = "/",
  TOUR = "/tour",
  MUSIC = "/music",
  VIDEO = "/video",
  ABOUT = "/about",
}

export enum NavigationLabel {
  HOME = "Home",
  TOUR = "Tour",
  MUSIC = "Music",
  VIDEO = "Video",
  ABOUT = "About",
}

export const navItems = [
  { name: NavigationLabel.TOUR, href: NavigationRoute.TOUR },
  { name: NavigationLabel.MUSIC, href: NavigationRoute.MUSIC },
  { name: NavigationLabel.VIDEO, href: NavigationRoute.VIDEO },
  { name: NavigationLabel.ABOUT, href: NavigationRoute.ABOUT },
];

export const homeItem = {
  name: NavigationLabel.HOME,
  href: NavigationRoute.HOME,
};
