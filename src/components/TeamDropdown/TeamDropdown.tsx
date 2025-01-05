import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import axios from "axios";

interface TeamDropdownProps {
  selectedTeam: string;
  onTeamChange: (teamId: string) => void;
}

const TeamDropdown: React.FC<TeamDropdownProps> = ({
  selectedTeam,
  onTeamChange,
}) => {
  const [teams, setTeams] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/teams");
        setTeams(response.data);
      } catch (error) {
        console.error("Failed to fetch teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTeamChange(event.target.value);
  };

  return (
    <Box width="40%">
      <FormControl>
        <FormLabel>Select a Team</FormLabel>
        <Select
          placeholder="Select a Team"
          value={selectedTeam}
          onChange={handleChange}
        >
          {Object.entries(teams).map(([teamId, teamName]) => (
            <option key={teamId} value={teamId}>
              {teamName}
            </option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TeamDropdown;
