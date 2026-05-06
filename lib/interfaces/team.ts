export interface Team {
  category: string | null;
  members: Array<Member>;
}

export interface Member {
  region: string | null;
  name: string;
  surname: string;
  organization: string | null;
  email: string;
}
