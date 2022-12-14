import { FormControl, TextField, Select, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { createTeam, getManangers } from "src/services/api";
import { Button, MenuItem, Paper } from "@material-ui/core";
import { useRouter } from "next/router";
import { getSectors } from "../services/api";

export default () => {
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [mananger, setMananger] = useState<any>({});
    const [manangers, setManangers] = useState<any[]>([]);
    const [sector, setSector] = useState<any>({});
    const [sectors, setSectors] = useState<any[]>([]);

    useEffect(() => {
        getManangers()
            .then((data) => setManangers(data))
            .catch((err) => console.log(err));

        getSectors()
            .then((data) => setSectors(data))
            .catch((err) => console.log(err));
    });

    const insertTeam = async () =>
        createTeam({
            name,
            mananger,
        })
            .then((res) => {
                return router.push("/createTeam");
            })
            .catch((err) => console.log(err));

    const generateManangers = manangers.map((mananger) => (
        <MenuItem value={mananger.id} key={mananger.id}>
            {mananger?.name}
        </MenuItem>
    ));

    const generateSectors = sectors.map((sector) => {
        return (
            <MenuItem value={sector.id} key={sector.id}>
                {sector?.name}
            </MenuItem>
        );
    });

    return (
        <Paper
            elevation={7}
            style={{
                padding: "5em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
            }}
        >
            <div style={{ display: "flex", gap: 10 }}>
                <TextField
                    value={name}
                    label="Nome do time"
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl sx={{ width: "20vh" }}>
                    <InputLabel>Gestor do time</InputLabel>
                    <Select onChange={(e) => setMananger(e.target.value)}>
                        {generateManangers}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: "20vh" }}>
                    <InputLabel>Setor</InputLabel>
                    <Select onChange={(e) => setSector(e.target.value)}>
                        {generateSectors}
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button onClick={insertTeam}>Criar</Button>
            </div>
        </Paper>
    );
};
