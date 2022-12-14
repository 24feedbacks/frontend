import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import {
    createCompany,
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

    const insertComapny = async () =>
        createCompany({ name, company })
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
                <Button onClick={insertComapny}>Criar</Button>
            </div>
        </Paper>
    );
};
