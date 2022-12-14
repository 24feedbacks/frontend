//React
import { createRef, useContext, useEffect, useState } from "react";

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
import Send from "@mui/icons-material/Send";
import Recieve from "@mui/icons-material/Mail";
import Person from "@mui/icons-material/Person";
import InterpreterMode from "@mui/icons-material/InterpreterMode";
import Add from "@mui/icons-material/Add";
import Logout from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

import { UserContext } from "src/context/user";
import { useRouter } from "next/router";

export default () => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const [a, setUser] = useContext<any>(UserContext);
    const [open, setOpen] = useState(true);
    const [expanded, setExpanded] = useState([false]);
    const router = useRouter();

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
        { title: "PDI", Icon: Person, path: "/pdi" },
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
            <Link href={url} key={index}>
                <ListItem>
                    <ListItemIcon>{<Icon />}</ListItemIcon>
                    <ListItemText primary={title} />
                </ListItem>
            </Link>
        ) : (
            <List key={index}>
                <ListItemButton onClick={() => handleExpand(index, !expand)}>
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
                        }}
                    >
                        {options.map((option, index) => {
                            const { Icon, path, title } = option;
                            const url = `http://localhost:3000${path}`;

                            return (
                                <Link href={url} key={index} style={{}}>
                                    <div style={{}}>
                                        <ListItem>
                                            <ListItemIcon>
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
                open={open}
                PaperProps={{
                    sx: {
                        width: "20vw",
                        paddingRight: "1em",
                        height: "100%",
                    },
                }}
            >
                <List>{list}</List>
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
