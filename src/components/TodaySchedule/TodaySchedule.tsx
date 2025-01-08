import React from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    SimpleGrid,
    Spinner,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdPerson, MdAccessTime } from "react-icons/md";
import axios from "axios";
import TeamLogo from "../TeamLogo/TeamLogo";

interface Team {
    id: number;
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
}

interface Game {
    game_datetime: string;
    away_team: Team;
    home_team: Team;
}

interface TodayScheduleProps {
    setIsLoading: (loading: boolean) => void;
}

interface TodayScheduleState {
    gamesData: Game[];
    isLoading: boolean;
    error: string | null;
}

class TodaySchedule extends React.Component<TodayScheduleProps, TodayScheduleState> {
    constructor(props: TodayScheduleProps) {
        super(props);
        this.state = {
            gamesData: [],
            isLoading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchTodaySchedule();
    }

    fetchTodaySchedule() {
        this.setState({
            isLoading: true,
            error: null,
        });

        axios
            .get<Game[]>("http://127.0.0.1:5000/schedule_today")
            .then((response) => {
                this.setState({
                    gamesData: response.data,
                    isLoading: false,
                });
                this.props.setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching today's games:", error);
                this.setState({
                    gamesData: [],
                    isLoading: false,
                    error: "Failed to fetch today's games.",
                });
                this.props.setIsLoading(false);
            });
    }

    render() {
        const { gamesData, isLoading, error } = this.state;

        if (isLoading) {
            return (
                <Flex
                    justify="center"
                    align="center"
                    position="absolute"
                    top="50%"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="#2c323a"
                >
                    <Spinner size="xl" color="white" />
                </Flex>
            );
        }

        if (gamesData.length === 0) {
            return (
                <Flex direction="column" justify="center" align="center" height="50vh" bg="#2c323a">
                    <Text fontSize="2xl" color="white" mb={4}>
                        No MLB games scheduled for today!
                    </Text>
                    <Text fontSize="xl" color="white">
                        Check ANY team stats here:
                    </Text>
                    <Link to="/stats">
                        <Button mt={4} bg="#00ce81" _hover={{ bg: "#009e5c" }} borderRadius="20px">
                            Check team stats
                        </Button>
                    </Link>
                </Flex>
            );
        }

        if (error) {
            return <Box color="red.500" textAlign="center">{error}</Box>;
        }

        return (
            <SimpleGrid columns={[1, 1, 2]} spacing={6} mt={4} p={4}>
                <Box textAlign="center" mb={6}>
                    <Text fontSize="2xl" fontWeight="bold">
                        Next Scheduled Games
                    </Text>
                </Box>
                {gamesData.map((game, index) => {
                    const gameDate = new Date(game.game_datetime);
                    const formattedDate = `${gameDate.toLocaleDateString()} ${gameDate.toLocaleTimeString()}`;

                    return (
                        <Box
                            key={index}
                            p={4}
                            bg="#2c323a"
                            borderRadius="md"
                            shadow="md"
                            textAlign="center"
                        >
                            <Flex direction={{ base: "column", md: "row" }} justify="space-between" mb={4}>
                                <HStack>
                                    <TeamLogo teamId={game.away_team.id} />
                                    <Text fontSize="lg">
                                        {game.away_team.name}{" "}
                                        <span>
                                            ({game.away_team.wins}-{game.away_team.losses})
                                        </span>
                                    </Text>
                                </HStack>
                                <Text fontSize="xl">@</Text>
                                <HStack>
                                    <Text fontSize="lg">
                                        {game.home_team.name}{" "}
                                        <span>
                                            ({game.home_team.wins}-{game.home_team.losses})
                                        </span>
                                    </Text>
                                    <TeamLogo teamId={game.home_team.id} />
                                </HStack>
                            </Flex>
                            <SimpleGrid columns={[1, 2]} spacing={4}>
                                <VStack>
                                    <MdPerson size="24px" />
                                    <Text>
                                        {game.away_team.probable_pitcher.name} ({game.away_team.probable_pitcher.hand})
                                    </Text>
                                    <Text>
                                        W-L: {game.away_team.probable_pitcher.wins}-
                                        {game.away_team.probable_pitcher.losses}
                                    </Text>
                                    <Text>ERA: {game.away_team.probable_pitcher.era}</Text>
                                </VStack>
                                <Text fontSize="lg" fontWeight="bold" alignSelf="center">
                                    VS
                                </Text>
                                <VStack>
                                    <MdPerson size="24px" />
                                    <Text>
                                        {game.home_team.probable_pitcher.name} ({game.home_team.probable_pitcher.hand})
                                    </Text>
                                    <Text>
                                        W-L: {game.home_team.probable_pitcher.wins}-
                                        {game.home_team.probable_pitcher.losses}
                                    </Text>
                                    <Text>ERA: {game.home_team.probable_pitcher.era}</Text>
                                </VStack>
                            </SimpleGrid>
                            <Box mt={4}>
                                <HStack justify="center" align="center">
                                    <MdAccessTime size="20px" />
                                    <Text>{formattedDate}</Text>
                                </HStack>
                            </Box>
                        </Box>
                    );
                })}
            </SimpleGrid>
        );
    }
}

export default TodaySchedule;
