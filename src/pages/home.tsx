import FeedbacksCharts from "@/components/Charts/feedbacksCharts";
import TeamCharts from "@/components/Charts/teamCharts";
import { useContext, useEffect, useState } from "react";
import { getRecievedFeedbacks, listTeams } from "src/services/api";
import { UserContext } from "../context/user";
import { Divider } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

export default () => {
    const [user] = useContext<any>(UserContext);
    const [team, setTeam] = useState<any>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        listTeams(user?.team)
            .then((data) => setTeam(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    gap: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FeedbacksCharts user={user} />
                <TeamCharts user={user} />
            </div>
            <Divider style={{ width: "40", marginTop: "5vh" }} />
        </div>
    );
};
