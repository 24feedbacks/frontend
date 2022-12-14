//React
import { createRef, useEffect, useState, useContext } from "react";

import Cookies from "js-cookie";

// Components
import Link from "next/link";
import { ListItemButton } from "@mui/material";
import { Collapse } from "@material-ui/core";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//icons
import Home from "@mui/icons-material/Home";
import Feedback from "@mui/icons-material/Feedback";
import Person from "@mui/icons-material/Person";
import ListIcon from "@mui/icons-material/List";
import Add from "@mui/icons-material/Add";
import InterpreterMode from "@mui/icons-material/InterpreterMode";
import Send from "@mui/icons-material/Send";
import Recieve from "@mui/icons-material/Mail";
import Logout from "@mui/icons-material/Logout";
import { UserContext } from "../../context/user";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    const [a, setUser] = useContext<any>(UserContext);

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const [expanded, setExpanded] = useState([false]);

    const doLogout = () => {
        Cookies.remove("userData");
        setUser(null);
        router.push("/login");
    };

    const handleExpand = (index: number, value: boolean) => {
        expanded[index] = value;
        setExpanded([...expanded]);
    };

    useEffect(() => {
        if (window) {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            };

            window.addEventListener("resize", handleResize);

            handleResize();

            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const listItens = [
        { title: "Home", Icon: Home, path: "/" },
        {
            title: "PDI",
            Icon: Person,
            path: "/pdi",
            options: [
                {
                    title: "Create",
                    path: "/pdi/create",
                    Icon: Add,
                },
                {
                    title: "List",
                    path: "/pdi/list",
                    Icon: ListIcon,
                },
            ],
        },
        {
            title: "Feedback",
            Icon: Feedback,
            path: "/feedback",
            options: [
                {
                    title: "Send",
                    path: "/feedback/send",
                    Icon: Add,
                },
                {
                    title: "Sender",
                    path: "/feedback/sender",
                    Icon: Send,
                },
                {
                    title: "Receive",
                    path: "/feedback/recieve",
                    Icon: Recieve,
                },
            ],
        },
    ];

    const list = listItens.map((item, index) => {
        const { title, Icon, path, options } = item;
        const url = `http://localhost:3000${path}`;

        const expand = !!expanded[index];

        return !options ? (
            <Link href={url}>
                <ListItem sx={{ paddingLeft: 0 }}>
                    <ListItemIcon>{<Icon />}</ListItemIcon>
                    <ListItemText primary={title} />
                </ListItem>
            </Link>
        ) : (
            <List key={index} sx={{ paddingLeft: 0 }}>
                <ListItemButton
                    onClick={() => handleExpand(index, !expand)}
                    sx={{ paddingLeft: 0 }}
                >
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={title} />
                </ListItemButton>
                <Collapse
                    in={expand}
                    timeout="auto"
                    unmountOnExit
                    ref={createRef()}
                >
                    <List
                        component="div"
                        disablePadding
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: 0,
                        }}
                    >
                        {options.map((option, index) => {
                            const { Icon, path, title } = option;
                            const url = `http://localhost:3000${path}`;

                            return (
                                <Link href={url} key={index}>
                                    <div style={{ paddingLeft: 0 }}>
                                        <ListItem sx={{ paddingLeft: 0 }}>
                                            <ListItemIcon
                                                sx={{ paddingLeft: 0 }}
                                            >
                                                {<Icon />}
                                            </ListItemIcon>
                                            <ListItemText primary={title} />
                                        </ListItem>
                                    </div>
                                </Link>
                            );
                        })}
                    </List>
                </Collapse>
            </List>
        );
    });

    return (
        <>
            <Drawer
                anchor="left"
                variant="persistent"
                open={true}
                PaperProps={{
                    sx: {
                        width: "20vw",
                        paddingRight: "1em",
                        paddingLeft: 0,
                    },
                }}
            >
                <List sx={{ paddingLeft: 0 }}>{list}</List>
                <Logout
                    fontSize="large"
                    sx={{
                        bottom: "10px",
                        position: "absolute",
                        display: "flex",
                        alignSelf: "end",
                        color: "#FF0000",
                    }}
                    onClick={doLogout}
                />
            </Drawer>
        </>
    );
};
