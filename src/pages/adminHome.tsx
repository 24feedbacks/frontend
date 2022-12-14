import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { getTeams } from "src/services/api";
import { getUsers } from "../services/api";
import { Divider } from "@mui/material";

export default () => {
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getTeams()
            .then((data) => setTeams(data))
            .catch((err) => console.log(err));

        getUsers()
            .then((data) => setUsers(data))
            .catch((err) => console.log(err));
    }, []);

    const generateTeams = teams.map((team: any, i) => (
        <TableRow key={i}>
            <TableCell component="th" scope="row">
                {team.name}
            </TableCell>
            <TableCell align="right">
                {new Date(team.created_at).toLocaleDateString()}
            </TableCell>
        </TableRow>
    ));

    const generateUsers = users.map((user: any, i) => (
        <TableRow key={i}>
            <TableCell component="th" scope="row">
                {user.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.email}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.category.name}
            </TableCell>
            <TableCell align="right">
                {new Date(user.created_at).toLocaleDateString()}
            </TableCell>
        </TableRow>
    ));

    return (
        <div style={{ display: "flex", gap: 10 }}>
            <div
                style={{
                    padding: "2em",
                    height: "20vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                }}
            >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome do time</TableCell>
                                <TableCell align="right">Criado em</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{generateTeams}</TableBody>
                    </Table>
                </TableContainer>
            </div>
            <>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{ height: "20vh" }}
                />
            </>
            <div
                style={{
                    padding: "2em",
                    height: "20vh",
                    maxHeight: "30vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                }}
            >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome do usuário</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Categoria</TableCell>
                                <TableCell align="right">Criado em</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{generateUsers}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
