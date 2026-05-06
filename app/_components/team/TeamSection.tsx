import { Member, Team } from "@/lib/interfaces/team";
import { services } from "@/lib/services.config";
import TeamMember from "@/app/_components/team/TeamMember";

export default async function TeamSection() {
  let teams: Team[];
  try {
    teams = await services.team.getTeams();
  } catch (error) {
    console.error("TeamSection failed:", error);
    return;
  }

  return (
    <div className="grid gap-y-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
      {teams.map((team: Team, index: number) => (
        <div className="space-y-2" key={index}>
          <p className="mb-2 font-bold text-white capitalize">
            {team.category}
          </p>
          {team.members.map((member: Member, index: number) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
      ))}
    </div>
  );
}
