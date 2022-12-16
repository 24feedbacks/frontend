import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import {
    createSector,
    createTeam,
    getCompany,
    getManangers,
} from "src/services/api";
import { Button, Paper } from "@material-ui/core";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [company, setComapny] = useState("");

    useEffect(() => {
        getCompany()
            .then((data) => setComapny(data.id))
            .catch((err) => console.log(err));
    }, []);

    const insertSector = async () =>
        createSector({ name, company })
            .then((res) => {})
            .catch((err) => console.log(err));

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
            <div>
                <TextField
                    value={name}
                    label="Nome do setor"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <Button onClick={insertSector}>Criar</Button>
            </div>
        </Paper>
    );
};
