import { Team } from "@/lib/interfaces/team";

export const teamMock = {
  async getTeams(): Promise<Team[]> {
    return TeamList;
  },
};

// Mockdata
const TeamList: Team[] = [
  {
    category: "Bookings",
    members: [
      {
        region: "NL",
        name: "Jane",
        surname: "Doe",
        organization: "Example Booking Agency",
        email: "jane@example.com",
      },
      {
        region: "BE",
        name: "John",
        surname: "Smith",
        organization: "Sample Booking",
        email: "john@example.com",
      },
    ],
  },
];