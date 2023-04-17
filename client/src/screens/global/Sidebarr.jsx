import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PointOfSaleOutlinedIcon  from "@mui/icons-material/PointOfSaleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CalendarMonthOutlinedIcon  from "@mui/icons-material/CalendarMonthOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../components/flexBetween"
//import profileImage from "assets/profile.jpeg";

const navItems = [
  {
    text:"Dashboard",
    lcText:"dashboard",
   icon:<HomeOutlinedIcon />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text:"Meals",
    lcText:"meals",
    icon:<FoodBankOutlinedIcon />,
  },
  {
    text:"Customers",
    lcText:"customers",    
    icon:<ContactsOutlinedIcon />,
  },
  {
    text:"Transactions",
    lcText:"transactions",
    icon:<ReceiptOutlinedIcon />,
  },
 
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlinedIcon />,
    lcText:"overview"
  },
  {
    text: "Daily",
    icon: <TodayOutlinedIcon />,
    lcText: "daily"
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlinedIcon />,
    lcText:"monthly"
  },
  {
    text: "Breakdown",
    icon: <BarChartOutlinedIcon />,
    lcText: "breakdown"
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlinedIcon />,
    lcText:"admin"
  },
  // {
  //   text: "Performance",
  //   icon: <TrendingUpOutlinedIcon />,
  // },
];

const Sidebarr = () => {
  const drawerWidth = "250px";
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h6" fontWeight="bold">
                    Canteen E-Ticketing System
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeftIcon />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={"../../assets/profile.jpeg"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={theme.palette.secondary[200]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Patrick
                </Typography>
                <Typography variant="h5" color={theme.palette.secondary[500]}>
                  System Admin
                </Typography>
              </Box>
            </Box>
            </FlexBetween>
            <List>
              {navItems.map(({ text,lcText, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
             

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlinedIcon sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebarr;
