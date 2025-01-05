import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Icon,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FaUser, FaChartLine, FaBaseballBall, FaClock } from "react-icons/fa";
import axios from "axios";
import TeamLogo from "../TeamLogo/TeamLogo";

type Team = {
  id: string;
  name: string;
  wins: number;
  losses: number;
  probable_pitcher: {
    name: string;
    hand: string;
    wins: number;
    losses: number;
    era: number;
  };
};

type GameData = {
  away_team: Team;
  home_team: Team;
  game_datetime: string;
};

type NextScheduledGameProps = {
  teamId: string;
  fetchGame: boolean;
  onFetchComplete?: () => void;
};

const NextScheduledGame: React.FC<NextScheduledGameProps> = ({
  teamId,
  fetchGame,
  onFetchComplete,
}) => {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (fetchGame) {
      fetchScheduledGame();
    }
  }, [fetchGame]);

  const fetchScheduledGame = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<GameData[]>(
        `http://127.0.0.1:5000/schedule/${teamId}`
      );
      if (response.data.length > 0) {
        setGameData(response.data[0]);
      } else {
        setGameData(null);
      }
      if (onFetchComplete) {
        onFetchComplete();
      }
    } catch (err) {
      setError("Failed to fetch scheduled game.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100px">
        <Spinner />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  if (!gameData) {
    return null;
  }

  const { away_team, home_team, game_datetime } = gameData;
  const gameDate = new Date(game_datetime);
  const formattedDate = `${gameDate.toLocaleDateString()} ${gameDate.toLocaleTimeString()}`;

  return (
    <VStack spacing={6} width="100%">
      <Heading size="md" textAlign="center">
        Next Game
      </Heading>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        width="100%"
        maxWidth="800px"
        bg="gray.700"
        color="white"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          direction={{ base: "column", sm: "row" }}
        >
          <Flex alignItems="center">
            <TeamLogo teamId={away_team.id} />
            <Text fontSize="lg" ml={3}>
              {away_team.name} ({away_team.wins}-{away_team.losses})
            </Text>
          </Flex>
          <Text fontSize="xl" fontWeight="bold" mx={4}>
            @
          </Text>
          <Flex alignItems="center">
            <Text fontSize="lg" mr={3}>
              {home_team.name} ({home_team.wins}-{home_team.losses})
            </Text>
            <TeamLogo teamId={home_team.id} />
          </Flex>
        </Flex>

        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={4}>
          <VStack align="center">
            <Icon as={FaUser} boxSize={6} />
            <Text>{away_team.probable_pitcher.name} ({away_team.probable_pitcher.hand})</Text>
          </VStack>
          <VStack align="center">
            <Icon as={FaChartLine} boxSize={6} />
            <Text>W-L: {away_team.probable_pitcher.wins}-{away_team.probable_pitcher.losses}</Text>
          </VStack>
          <VStack align="center">
            <Icon as={FaBaseballBall} boxSize={6} />
            <Text>ERA: {away_team.probable_pitcher.era}</Text>
          </VStack>
        </Grid>

        <Text fontSize="lg" textAlign="center" my={4}>
          VS
        </Text>

        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={4}>
          <VStack align="center">
            <Icon as={FaUser} boxSize={6} />
            <Text>{home_team.probable_pitcher.name} ({home_team.probable_pitcher.hand})</Text>
          </VStack>
          <VStack align="center">
            <Icon as={FaChartLine} boxSize={6} />
            <Text>W-L: {home_team.probable_pitcher.wins}-{home_team.probable_pitcher.losses}</Text>
          </VStack>
          <VStack align="center">
            <Icon as={FaBaseballBall} boxSize={6} />
            <Text>ERA: {home_team.probable_pitcher.era}</Text>
          </VStack>
        </Grid>

        <Flex justifyContent="center" mt={4}>
          <Icon as={FaClock} mr={2} />
          <Text>{formattedDate}</Text>
        </Flex>
      </Box>
    </VStack>
  );
};

export default NextScheduledGame;
