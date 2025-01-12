import React, { useState } from "react";
import {
    Box,
    Select,
} from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/react";


interface SpanDropdownProps {
    onPeriodChange: (period: number) => void;
    selectedPeriod: number;
}

const SpanDropdown: React.FC<SpanDropdownProps> = ({ onPeriodChange }) => {
    const [selectedPeriod, setSelectedPeriod] = useState<number>(10);

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        setSelectedPeriod(value);
        onPeriodChange(value);
    };

    const periods = [5, 10, 15, 20, 25, 30];

    return (
        <Box width="20%">
            <FormControl id="period-select" isRequired>
                <FormLabel>Last Days</FormLabel>
                <Select
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    bg="white"
                    focusBorderColor="teal.500">
                    {periods.map((period) => (
                        <option key={period} value={period}>
                            {period}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SpanDropdown;
