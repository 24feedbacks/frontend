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

import styles from "@/styles/Feedback.module.scss";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button } from "@mui/material";
import { createFeedback, listTeams } from "../../services/api";
import { UserContext } from "../../context/user";
import TinyEditor from "@/components/TinyEditor";
import EmoteSlider from "@/components/EmoteSlider";
import { useRouter } from "next/router";

type member = {
    name: string;
    id: string;
};

type teams = {
    name: string;
    id: string;
    users: any[];
    leader: member;
};

export default () => {
    const [user] = useContext<any>(UserContext);
    const [teams, setTeams] = useState([]);
    const [teamId, setTeamId] = useState<string>("");
    const [member, setMember] = useState<any>("");
    const [feedback, setFeedback] = useState<string>("");
    const [feeling, setFeeling] = useState<number>(0);

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

    const sendFeedback = () =>
        createFeedback({
            sender: user?.id,
            reciever: member?.id,
            description: feedback,
            feeling,
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

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
                            <InputLabel>Enviar feedback para:</InputLabel>
                            <Select
                                onChange={(e) => {
                                    e.preventDefault();
                                    handleChange(e.target.value, setMember);
                                }}
                            >
                                {teams
                                    ?.find((team: any) => team?.id === teamId)
                                    ?.colaborators.map((member: any) =>
                                        member.id !== user.id ? (
                                            <MenuItem
                                                key={member.id}
                                                value={member}
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
                <h3>Qual o seu sentimento sobre este feedback?</h3>
                <EmoteSlider set={setFeeling} />
                <br />
                <div>
                    <TinyEditor name={member?.name} set={setFeedback} />
                </div>
                <Button
                    onClick={sendFeedback}
                    disabled={feedback ? false : true}
                >
                    Enviar
                </Button>
            </div>
        </>
    );
};
