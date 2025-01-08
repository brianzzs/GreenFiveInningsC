import React, { useState } from "react";
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import TodaySchedule from "../TodaySchedule/TodaySchedule";
import FooterComponent from "../Footer/Footer";
import Bg from "../../img/bg.jpg";

const StartPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <Box position="relative">

            <Flex
                as="nav"
                justify="space-between"
                align="center"
                p="1rem 2rem"
                bg="#182223"
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={100}
            >
                <Heading as="h1" size="lg" color="white">
                    Five Innings Friend
                </Heading>
                <ChakraLink
                    as={Link}
                    to="/stats"
                    textDecoration="none"
                    color="white"
                    fontSize="lg"
                >
                    Statistics
                </ChakraLink>
            </Flex>
            <Box
                backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${Bg})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={-2}
            />
            <Grid templateColumns="repeat(12, 1fr)" gap={4} mt="4rem">
                <GridItem colSpan={12} mt="4rem">
                    <VStack spacing={6} align="center" textAlign="center">
                        <Heading
                            as="h2"
                            fontSize={["2xl", "4xl", "6xl"]}
                            color="white"
                            textAlign="center"
                        >
                            Unlock the Power of BETTING Data
                        </Heading>
                        <Text color="white" fontSize={["md", "lg"]}>
                            Our comprehensive statistics provide detailed insights for those
                            who love to bet on First 5 Innings including:
                        </Text>
                        <VStack align="flex-start" color="white" spacing={2}>
                            <Text>- Over 1.5</Text>
                            <Text>- Over 2.5</Text>
                            <Text>- NRFI</Text>
                            <Text>- First 5 Innings Money Line</Text>
                            <Text>
                                - Game History for 5 innings up to the last{" "}
                                <strong>30 Days</strong>
                            </Text>
                        </VStack>
                        <VStack spacing={4}>
                            <Text color="white" fontSize={["md", "lg"]}>
                                Empower your decision-making with our data-driven approach.
                                Ready to explore?
                            </Text>
                            <ChakraLink as={Link} to="/stats" textDecoration="none">
                                <Button
                                    bg="#00ce81"
                                    _hover={{ bg: "#009e5c" }}
                                    borderRadius="30px"
                                    size="lg"
                                >
                                    EXPLORE
                                </Button>
                            </ChakraLink>
                        </VStack>
                    </VStack>
                </GridItem>

                {/* Schedule Section */}
                <GridItem colSpan={12}>
                    <Flex
                        justify="center"
                        align="center"
                        bg="#2c323a"
                        overflowX="auto"
                        p="1rem"
                    >
                        <TodaySchedule
                            placeholder={
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="50vh"
                                >
                                    <Text color="white" fontSize="lg">
                                        Loading today's schedule...
                                    </Text>
                                </Box>
                            }
                            setIsLoading={setIsLoading}
                        />
                    </Flex>
                </GridItem>
            </Grid>
            <FooterComponent isLoading={isLoading} />

        </Box>
    );
};

export default StartPage;
