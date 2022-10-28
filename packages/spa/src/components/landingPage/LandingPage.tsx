import {
    AppBarProps as MuiAppBarProps,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import MuiAppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useCallback, useState } from "react";
import UserLoginModal from "./UserLoginModal";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface DrawerItem {
    itemName: string;
    itemIcon: JSX.Element;
    iconColor: string;
    textColor: string;
}

function buildListItem(item: DrawerItem): JSX.Element {
    return (
        <ListItem key={item.itemName}>
            <ListItemButton>
                <ListItemIcon sx={{ color: item.iconColor}}>
                    {item.itemIcon}
                </ListItemIcon>
                <ListItemText sx={{ color: item.textColor }} primary={item.itemName} />
            </ListItemButton>
        </ListItem>
    );
}

export default function LandingPage() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const theme = useTheme();

    const handleLoginOpen = useCallback(() => {
        setOpenLogin(true);
    }, [setOpenLogin]);

    const handleLoginClose = useCallback(() => {
        setOpenLogin(false);
    }, [setOpenLogin]);

    const handleDrawerOpen = useCallback(() => {
        setOpenDrawer(true);
    }, [setOpenDrawer]);

    const handleDrawerClose = useCallback(() => {
        setOpenDrawer(false);
    }, [setOpenDrawer]);

    const drawerWidth = 240;

    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    }));

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open"
    })<AppBarProps>(({ theme, open }) => ({
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        })
    }));

    const menuItems: DrawerItem[] = [
        {
            itemName: 'Apartment Rentals',
            itemIcon: <ApartmentOutlinedIcon />,
            iconColor: theme.palette.secondary.main,
            textColor: theme.palette.text.primary
        },
        {
            itemName: 'House Rentals',
            itemIcon: <HouseOutlinedIcon />,
            iconColor: theme.palette.secondary.main,
            textColor: theme.palette.text.primary
        }
    ];

    const menuItemsManagement: DrawerItem [] = [
        {
            itemName: 'List Rental',
            itemIcon: <PlaylistAddOutlinedIcon />,
            iconColor: theme.palette.secondary.main,
            textColor: theme.palette.text.primary
        },
        {
            itemName: 'My Listings',
            itemIcon: <SummarizeOutlinedIcon />,
            iconColor: theme.palette.secondary.main,
            textColor: theme.palette.text.primary
        },
        {
            itemName: 'Messages',
            itemIcon: <ChatBubbleOutlineOutlinedIcon />,
            iconColor: theme.palette.secondary.main,
            textColor: theme.palette.text.primary
        }
    ];

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    position="fixed"
                    open={openDrawer}
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={handleDrawerOpen}
                            sx={{ mr: 2, ...(openDrawer && { display: 'none'}) }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Smart Renting Platform
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleLoginOpen}
                            sx={{ ml: 'auto' }}>
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    open={openDrawer}
                    onClose={handleDrawerClose}
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItems.map(buildListItem)}
                    </List>
                    <Divider />
                    <List>
                        {menuItemsManagement.map(buildListItem)}
                    </List>
                    <Divider />
                </Drawer>
            </Box>
            <UserLoginModal open={openLogin} handleClose={handleLoginClose} />
        </div>
    )
}