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
    Typography
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
import {useCallback, useState} from "react";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface DrawerItem {
    itemName: string;
    itemIcon: JSX.Element;
}

function buildListItem(item: DrawerItem): JSX.Element {
    return (
        <ListItem key={item.itemName}>
            <ListItemButton>
                <ListItemIcon>
                    {item.itemIcon}
                </ListItemIcon>
                <ListItemText primary={item.itemName} />
            </ListItemButton>
        </ListItem>
    );
}

export default function LandingPage() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleDrawerClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

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
            itemIcon: <ApartmentOutlinedIcon />
        },
        {
            itemName: 'House Rentals',
            itemIcon: <HouseOutlinedIcon />
        }
    ];

    const menuItemsManagement: DrawerItem [] = [
        {
            itemName: 'List Rental',
            itemIcon: <PlaylistAddOutlinedIcon />
        },
        {
            itemName: 'My Listings',
            itemIcon: <SummarizeOutlinedIcon />
        },
        {
            itemName: 'Messages',
            itemIcon: <ChatBubbleOutlineOutlinedIcon />
        }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                open={open}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                        sx={{ mr: 2, ...(open && { display: 'none'}) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Smart Renting Platform
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => console.log("Account button clicked!")}
                        sx={{ ml: 'auto' }}
                    >
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={open}
                onClose={handleDrawerClose}
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
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
    )
}