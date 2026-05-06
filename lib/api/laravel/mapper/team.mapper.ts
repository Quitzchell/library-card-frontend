import { Member, Team } from "@/lib/interfaces/team";
import { LaravelTeamMember } from "@/lib/api/laravel/interfaces/team";

export function mapTeams(records: LaravelTeamMember[]): Team[] {
  const byCategory = new Map<string | null, Member[]>();

  for (const record of records) {
    const member: Member = {
      name: record.first_name,
      surname: record.last_name,
      organization: record.organization,
      region: record.region,
      email: record.email,
    };

    if (!byCategory.has(record.team)) {
      byCategory.set(record.team, []);
    }
    byCategory.get(record.team)!.push(member);
  }

  return Array.from(byCategory, ([category, members]) => ({
    category,
    members,
  }));
}
