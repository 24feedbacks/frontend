import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useContext,
} from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import styles from "@/styles/Feedback.module.scss";
import { Button, Divider } from "@mui/material";
import { createGoal, createImprovements, listTeams } from "../../services/api";
import { UserContext } from "../../context/user";
import TextField from "@mui/material/TextField";

type improvement = {
    descricao: string;
};

export default () => {
    const [user] = useContext<any>(UserContext);
    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState<string>();
    const [memberId, setMemberId] = useState<string>();
    const [objective, setObjective] = useState<string>();
    const [priority, setPriority] = useState<string>();
    const [deadline, setDeadline] = useState();
    const hasRequiredInfo = objective && priority && deadline;

    const [improvements, setImprovements] = useState<improvement[]>([
        { descricao: "" },
    ]);

    const handleImprovement = (index: number, value: string) => {
        improvements[index].descricao = value;
        setImprovements([...improvements]);
    };

    const addImprovement = () => {
        const improvement: improvement = { descricao: "" };
        setImprovements([...improvements, improvement]);
    };

    const handleChange = (
        value: any,
        setState: Dispatch<SetStateAction<any | undefined>>
    ) => setState(value);
    useEffect(() => {
        listTeams(user?.team)
            .then((data) => {
                setTeams(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const saveGoals = () => {
        try {
            const goal = {
                user: user.id,
                deadline,
                priority,
                description: objective,
            };

            createGoal(goal).then((data) => {
                improvements.forEach((improvement) => {
                    const improve = {
                        goal: data.id,
                        description: improvement.descricao,
                        user: user.id,
                    };

                    createImprovements(improve)
                        .then()
                        .catch((err) => console.log(err));
                });
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.Input}>
                    <div className={styles.FormControl}>
                        <FormControl fullWidth variant="filled">
                            <InputLabel>Time</InputLabel>
                            <Select
                                onChange={(e) => {
                                    e.preventDefault();
                                    handleChange(e.target.value, setTeamId);
                                }}
                            >
                                {teams?.map((team: any) => (
                                    <MenuItem key={team.id} value={team.id}>
                                        {team.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    &nbsp;
                    <div className={styles.FormControl}>
                        <FormControl
                            fullWidth
                            variant="filled"
                            disabled={teamId ? false : true}
                            style={{ display: "flex", flex: 1 }}
                        >
                            <InputLabel>Criar pdi para:</InputLabel>
                            <Select
                                onChange={(e) => {
                                    e.preventDefault();
                                    handleChange(e.target.value, setMemberId);
                                }}
                            >
                                {teams
                                    ?.find((team: any) => team?.id === teamId)
                                    ?.colaborators.map((member: any) =>
                                        member.id !== user.id ? (
                                            <MenuItem
                                                key={member.id}
                                                value={member.name}
                                            >
                                                {member.name}
                                            </MenuItem>
                                        ) : null
                                    )}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <br />
                <br />

                <h3>Informações sobre o objetivo</h3>
                <Divider />
                <div>
                    <>
                        <FormControl
                            fullWidth
                            variant="filled"
                            disabled={teamId ? false : true}
                            style={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "row",
                                gap: 5,
                            }}
                        >
                            <TextField
                                id="filled-basic"
                                label="Objetivo"
                                disabled={!memberId ? true : false}
                                variant="filled"
                                value={objective}
                                onChange={(e) =>
                                    handleChange(e.target.value, setObjective)
                                }
                            />
                            <TextField
                                id="filled-basic"
                                variant="filled"
                                label="Prazo"
                                disabled={!objective ? true : false}
                                type={"date"}
                                value={deadline}
                                placeholder={"Data"}
                                onChange={(e) =>
                                    handleChange(e.target.value, setDeadline)
                                }
                            />
                        </FormControl>
                        <br />
                        <FormControl style={{ width: "10vw" }}>
                            <InputLabel>Prioridade</InputLabel>
                            <Select
                                disabled={!deadline ? true : false}
                                variant="filled"
                                onChange={(e) => {
                                    e.preventDefault();
                                    handleChange(e.target.value, setPriority);
                                }}
                            >
                                <MenuItem value={"low"}>Baixa</MenuItem>
                                <MenuItem value={"Medium"}>Média</MenuItem>
                                <MenuItem value={"High"}>Alta</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />

                        <h3>Melhorias necessárias para atingir o objetivo</h3>
                        <Divider />
                        <br />

                        <div
                            style={{
                                display: "flex",
                                gap: "3vw",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2vh",
                                    overflowY: "auto",
                                    height: "30vh",
                                }}
                            >
                                {improvements.map((improvements, i) => {
                                    return (
                                        <TextField
                                            variant="filled"
                                            value={improvements.descricao}
                                            disabled={!priority ? true : false}
                                            label="Descrição"
                                            onChange={(e) =>
                                                handleImprovement(
                                                    i,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    );
                                })}
                            </div>
                            <AddCircleIcon
                                sx={{
                                    display: "flex",
                                    alignSelf: "end",
                                    color: "#39ff14",
                                }}
                                fontSize="large"
                                onClick={addImprovement}
                            />
                        </div>
                    </>
                </div>
                <br></br>
                <Button
                    onClick={saveGoals}
                    disabled={hasRequiredInfo ? false : true}
                >
                    Enviar
                </Button>
            </div>
        </>
    );
};
