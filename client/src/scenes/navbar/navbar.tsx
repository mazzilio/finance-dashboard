import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import TollIcon from "@mui/icons-material/Toll";
import FlexBetween from "@/components/FlexBetween";

const Navbar = () => {
    const { palette } = useTheme();
    const [selectedPage, setSelectedPage] = useState("dashboard");
    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            {/* LEFT */}
            <FlexBetween gap="0.75rem">
                <TollIcon sx={{ fontSize: "35px" }} />
                <Typography variant="h4" fontSize="16px">
                    Financier
                </Typography>
            </FlexBetween>

            {/* RIGHT */}
            <FlexBetween gap="2rem">
                <Box sx={{ "&:hover:": { color: palette.primary[100] } }}>
                    <Link
                        to="/"
                        onClick={() => setSelectedPage("dashboard")}
                        style={{
                            color: selectedPage === "dashboard" ? "inherit" : palette.grey[700],
                            textDecoration: "inherit"
                        }}
                    >
                        dashboard
                    </Link>
                </Box>
                <Box sx={{ "&:hover:": { color: palette.primary[100] } }}>
                    <Link
                        to="/predictions"
                        onClick={() => setSelectedPage("predictions")}
                        style={{
                            color: selectedPage === "predictions" ? "inherit" : palette.grey[700],
                            textDecoration: "inherit"
                        }}
                    >
                        predictions
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );
};

export default Navbar;
