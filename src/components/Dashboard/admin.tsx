//React
import { createRef, useContext, useEffect, useState } from "react";

// Components
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//icons

import Logout from "@mui/icons-material/Logout";
import Cookies from "js-cookie";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DomainAddIcon from "@mui/icons-material/DomainAdd";

import { UserContext } from "src/context/user";
import { useRouter } from "next/router";

export default () => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const [a, setUser] = useContext<any>(UserContext);
    const [open, setOpen] = useState(true);
    const router = useRouter();

    const doLogout = () => {
        Cookies.remove("userData");
        setUser(null);
        router.push("/login");
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
        { title: "Create Team", Icon: GroupAddIcon, path: "/createTeam" },
        { title: "Create User", Icon: PersonAddIcon, path: "/createUser" },
        { title: "Create Sector", Icon: DomainAddIcon, path: "/createSector" },
    ];

    const list = listItens.map((item, index) => {
        const { title, Icon, path } = item;
        const url = `http://localhost:3000${path}`;

        return (
            <Link href={url} key={index}>
                <ListItem>
                    <ListItemIcon>{<Icon />}</ListItemIcon>
                    <ListItemText primary={title} />
                </ListItem>
            </Link>
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
