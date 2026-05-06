import { Member } from "@/lib/interfaces/team";

type TeamMemberProps = {
  member: Member;
};

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="flex flex-col text-white">
      <div className="flex space-x-2 font-bold">
        {member.region && <p>{member.region}:</p>}
        {member.organization && <p>{member.organization}</p>}
      </div>

      <div>
        <a
          href={`mailto:${member.email}`}
          className="text-white hover:underline"
        >
          • {member.email}
        </a>
      </div>
    </div>
  );
}
