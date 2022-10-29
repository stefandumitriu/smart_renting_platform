import {Fade, Grid, Modal, Paper, Tab, Tabs, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface UserLoginModal {
    open: boolean;
    handleClose: () => void;
}

interface TabPanelProps {
    index: number;
    value: number;
    child: React.ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
    const { index, value, child } = props;

    return (
        <div>
            {value === index &&
                child
            }
        </div>
    )
}

const UserLoginModal = (props: UserLoginModal) => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}>
            <Fade in={props.open}>
                <Paper elevation={24}>
                    <Grid container direction="column" justifyContent="flex-start"
                          sx={{
                              position: 'absolute',
                              backgroundColor: 'white',
                              alignContent: 'center',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              maxWidth: '400px',
                              height: 'fit-content',
                              minHeight: '600px',
                          }}>
                        <Grid container item justifyContent="flex-start">
                            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="secondary">
                                <Tab label="Log in" sx={{
                                    fontWeight: 'bold',
                                    '&.Mui-selected': {
                                        color: theme.palette.text.primary
                                    }
                                }}/>
                                <Tab label="Sign up" sx={{
                                    fontWeight: 'bold',
                                    '&.Mui-selected': {
                                        color: theme.palette.text.primary
                                    }
                                }}/>
                            </Tabs>
                        </Grid>
                        <Grid item mt={2} ml={2}>
                            <TabPanel index={0} value={tabValue} child={<LoginForm />} />
                            <TabPanel index={1} value={tabValue} child={<SignupForm />} />
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
        </Modal>
    );
}

export default UserLoginModal;