import React from "react";
import {
    Box,
    Grid,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    Card,
    CardBody,
    CardHeader,
} from "@chakra-ui/react";

interface Team {
    id: number;
    name: string;
    probable_pitcher: {
        name: string;
    };
    runs: number[];
    total_runs: number;
}

interface Game {
    away_team: Team;
    home_team: Team;
}

interface ResultsTableProps {
    data: Game[];
    displayedTeamId: number;
    selectedPeriod: number;
}

const getTextColor = (condition: boolean): string =>
    condition ? "lime" : condition === false ? "red" : "white";

const ResultsTable: React.FC<ResultsTableProps> = ({
    data,
    displayedTeamId,
    selectedPeriod,
}) => {
    const reversedData = [...data].reverse();
    const isDataAvailable = data && data.length > 0;

    return (
        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
            {isDataAvailable && (
                <GridItem colSpan={12}>
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        textAlign="center"
                        mb={4}
                        color="white"
                    >
                        Last {selectedPeriod} Days First 5 Innings Game Log
                    </Text>
                </GridItem>
            )}

            {reversedData.map((game, index) => (
                <Card key={index} bg="#004736" color="white">
                    <CardHeader fontSize="lg" fontWeight="bold" textAlign="center">
                        Game {index + 1}
                    </CardHeader>
                    <CardBody>
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th color="white" py={2}>
                                            Teams
                                        </Th>
                                        {[...Array(5)].map((_, inning) => (
                                            <Th key={inning} color="white" py={2}>
                                                {inning + 1}
                                            </Th>
                                        ))}
                                        <Th color="white" py={2}>
                                            Total
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {/* Away Team Row */}
                                    <Tr>
                                        <Td
                                            fontWeight="bold"
                                            color={
                                                displayedTeamId === game.away_team.id
                                                    ? "#ffa000"
                                                    : "white"
                                            }
                                        >
                                            {game.away_team.name}
                                            <br />
                                            ({game.away_team.probable_pitcher.name})
                                        </Td>
                                        {game.away_team.runs.map((runs, inning) => (
                                            <Td key={inning} color="white">
                                                {runs}
                                            </Td>
                                        ))}
                                        <Td color={getTextColor(
                                            game.away_team.total_runs > game.home_team.total_runs
                                        )}>
                                            {game.away_team.total_runs}
                                        </Td>
                                    </Tr>

                                    {/* Home Team Row */}
                                    <Tr>
                                        <Td
                                            fontWeight="bold"
                                            color={
                                                displayedTeamId === game.home_team.id
                                                    ? "#ffa000"
                                                    : "white"
                                            }
                                        >
                                            {game.home_team.name}
                                            <br />
                                            ({game.home_team.probable_pitcher.name})
                                        </Td>
                                        {game.home_team.runs.map((runs, inning) => (
                                            <Td key={inning} color="white">
                                                {runs}
                                            </Td>
                                        ))}
                                        <Td color={getTextColor(
                                            game.home_team.total_runs > game.away_team.total_runs
                                        )}>
                                            {game.home_team.total_runs}
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
            ))}
        </Grid>
    );
};

export default ResultsTable;
