import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState, useContext, useRef } from "react";
import {
    CardHeader,
    Collapse,
    Divider,
    IconButton,
    Skeleton,
} from "@mui/material";
import { red, green, orange } from "@mui/material/colors";
import { getGoals } from "../services/api";
import { UserContext } from "../context/user";

type improvements = {
    id: string;
    description: string;
    updated_at: string;
    created_at: string;
};

type goal = {
    id: string;
    description: string;
    priority: string;
    deadline: string;
    updated_at: string;
    created_at: string;
    improvements: improvements[];
};

export default () => {
    const [goals, setGoals] = useState<goal[]>([]);
    const [user] = useContext<any>(UserContext);
    const [expanded, setExpanded] = useState([false]);

    const handleExpand = (index: number, value: boolean) => {
        expanded[index] = value;
        setExpanded([...expanded]);
    };

    const cardColor = (priority: string) =>
        new Map([
            ["low", green[500]],
            ["medium", orange[500]],
            ["high", red[500]],
        ]).get(priority);

    useEffect(() => {
        getGoals(user?.id).then((data) => {
            setGoals(data);
        });
    }, []);

    const renderGoals = goals.map((goal, index) => {
        const expand = expanded[index];
        const showImprovementsIcon = expand ? (
            <VisibilityOff />
        ) : (
            <Visibility />
        );

        return (
            <div style={{}}>
                <Card key={index} raised>
                    <CardHeader
                        action={
                            <>
                                <Skeleton
                                    variant="circular"
                                    width={15}
                                    height={15}
                                    sx={{
                                        backgroundColor: cardColor(
                                            goal.priority
                                        ),
                                    }}
                                />
                            </>
                        }
                        title={goal.description}
                        subheader={`Criado em ${new Date(
                            goal.created_at
                        ).toLocaleDateString()}`}
                    />
                    <CardContent>
                        <Typography variant="body2">
                            {goal.description}
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions
                        onClick={() => handleExpand(index, !expand)}
                        disableSpacing
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                        }}
                    >
                        <Typography>Requisitos</Typography>
                        {showImprovementsIcon}
                    </CardActions>
                </Card>
                <Collapse
                    in={expand}
                    timeout="auto"
                    hidden={!expand}
                    orientation={"vertical"}
                >
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}
                    >
                        {goal.improvements.map((improvement, id) => (
                            <Chip label={improvement?.description} key={id} />
                        ))}
                    </CardContent>
                </Collapse>
            </div>
        );
    });

    return (
        <div
            style={{
                display: "flex",
                columnGap: 10,
                rowGap: 10,
                gridAutoRows: "minmax(100px, auto)",
            }}
        >
            {renderGoals}
        </div>
    );
};
