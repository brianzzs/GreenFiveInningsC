import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

interface StatisticCardProps {
    data: number;
    id: string;
    label: string;
}

const getColor = (data: number): string => {
    if (data > 70) {
        return "#02ff4d";
    } else if (data >= 40 && data <= 70) {
        return "#ffee02";
    } else {
        return "#ff2102";
    }
};

const StatisticCard: React.FC<StatisticCardProps> = ({ data, id, label }) => {
    const backgroundColor = getColor(data);
    const textColor = useColorModeValue("gray.800", "white");

    return (
        <Box
            id={id}
            bg={backgroundColor}
            color="white"
            p={4}
            borderRadius="md"
            textAlign="center"
            width="100%"
            boxShadow="lg"
        >
            <Text fontSize="lg" fontWeight="bold">
                {label}: {data}%
            </Text>
        </Box>
    );
};

export default StatisticCard;
