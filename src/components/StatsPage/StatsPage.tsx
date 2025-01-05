import React, { useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Flex,
    Grid,
    Heading,
    VStack,
    HStack,
    Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import TeamDropdown from "./TeamDropdown";
import PeriodDropdown from "./PeriodDropdown";
import StatisticCard from "./StatisticsCard";
import TeamLogo from "../TeamLogo/TeamLogo";
import ResultsTable from "./ResultsTable";
import NextScheduledGame from "./NextScheduledGame";
import FooterComponent from "../Footer/Footer";

const StatsPage: React.FC = () => {
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [selectedPeriod, setSelectedPeriod] = useState<number>(10);
    const [results, setResults] = useState<any[]>([]);
    const [winPercentage, setWinPercentage] = useState<number | null>(null);
    const [nrfi, setNrfi] = useState<number | null>(null);
    const [over1_5F5, setOver1_5F5] = useState<number | null>(null);
    const [over2_5F5, setOver2_5F5] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchGame, setFetchGame] = useState<boolean>(false);

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/stats/${selectedTeam}/${selectedPeriod}`
            );

            const { results, win_percentage, nrfi, over1_5F5, over2_5F5 } =
                response.data;
            setResults(results);
            setWinPercentage(win_percentage);
            setNrfi(nrfi);
            setOver1_5F5(over1_5F5);
            setOver2_5F5(over2_5F5);
            setFetchGame(true);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const onFetchComplete = () => {
        setFetchGame(false);
    };

    const isDataAvailable =
        winPercentage !== null &&
        over1_5F5 !== null &&
        over2_5F5 !== null &&
        nrfi !== null;

    return (
        <Flex direction="column" minHeight="100vh" alignItems="center" bg="#2c323a">
            <Flex
                as="nav"
                justify="space-between"
                align="center"
                w="100%"
                p="1rem 2rem"
                bg="#182223"
                position="fixed"
                top={0}
                zIndex={100}
            >
                <Link to="/">
                    <Heading as="h1" size="lg" color="white">
                        Five Innings Friend
                    </Heading>
                </Link>
            </Flex>

            <VStack spacing={4} mt="6rem" w="100%" bg="#faf9f9" p="1rem">
                {selectedTeam && <TeamLogo teamId={selectedTeam} />}
                <HStack spacing={4} justify="center">
                    <TeamDropdown
                        label="Select a team"
                        selectedTeam={selectedTeam}
                        onTeamChange={setSelectedTeam}
                    />
                    <PeriodDropdown
                        selectedPeriod={selectedPeriod}
                        onPeriodChange={setSelectedPeriod}
                    />
                </HStack>
                <Button
                    isLoading={loading}
                    loadingText="Loading"
                    bg="#00ce81"
                    color="white"
                    _hover={{ bg: "#009e5c" }}
                    borderRadius="20px"
                    onClick={handleCalculate}
                    isDisabled={!selectedTeam}
                >
                    Get Stats
                </Button>
            </VStack>

            {isDataAvailable && (
                <VStack spacing={6} mt={4} w="100%" p="2rem" bg="#2c323a">
                    <Flex wrap="wrap" justify="center" gap={4}>
                        <StatisticCard id="win-percentage-card" label="ML F5" data={winPercentage} />
                        <StatisticCard id="nrfi-card" label="NRFI" data={nrfi} />
                        <StatisticCard id="over1-5f5-card" label="Over 1.5 F5 TT" data={over1_5F5} />
                        <StatisticCard id="over2-5f5-card" label="Over 2.5 F5 TT" data={over2_5F5} />
                    </Flex>
                    <NextScheduledGame
                        fetchGame={fetchGame}
                        teamId={selectedTeam}
                        onFetchComplete={onFetchComplete}
                    />
                    <ResultsTable
                        data={results}
                        displayedTeamId={selectedTeam}
                        selectedPeriod={selectedPeriod}
                    />
                </VStack>
            )}

            {/* Footer */}
            {isDataAvailable && <FooterComponent isLoading={loading} />}
        </Flex>
    );
};

export default StatsPage;
