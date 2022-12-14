import {
    VictoryBar,
    VictoryTheme,
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryLegend,
} from "victory";
import { useState, useEffect } from "react";
import { getRecievedFeedbacks } from "../../services/api";

type props = { user: any };

export default ({ user }: props) => {
    const [feedback, setFeedback] = useState({
        angry: 0,
        ok: 0,
        happy: 0,
        veryHappy: 0,
        amazing: 0,
    });

    const [total, setTotal] = useState(0);

    useEffect(() => {
        getRecievedFeedbacks(user?.id)
            .then((_feedback) => {
                setTotal(_feedback.length);
                _feedback.forEach((__feedback: any) => {
                    switch (__feedback.feeling) {
                        case 0:
                            setFeedback({
                                ...feedback,
                                angry: feedback.angry + 1,
                            });
                            break;
                        case 1:
                            setFeedback({ ...feedback, ok: feedback.ok + 1 });
                            break;
                        case 2:
                            setFeedback({
                                ...feedback,
                                happy: feedback.happy + 1,
                            });
                            break;
                        case 3:
                            setFeedback({
                                ...feedback,
                                veryHappy: feedback.veryHappy + 1,
                            });
                            break;
                        case 4:
                            setFeedback({
                                ...feedback,
                                amazing: feedback.amazing + 1,
                            });
                            break;
                    }
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const charts = [
        { quarter: 1, earnings: feedback.angry },
        { quarter: 2, earnings: feedback.ok },
        { quarter: 3, earnings: feedback.happy },
        { quarter: 4, earnings: feedback.veryHappy },
        { quarter: 5, earnings: feedback.amazing },
    ];

    return (
        <VictoryChart
            style={{
                parent: {
                    border: "2px solid #ccc",
                },
            }}
        >
            <VictoryLabel
                text="Número de feedbacks X Sentimento"
                x={225}
                y={10}
                style={{ fontWeight: "bold" }}
                textAnchor={"middle"}
            />

            <VictoryLegend
                x={340}
                y={50}
                title="N° total de feedbacks"
                orientation="vertical"
                gutter={20}
                style={{ title: { fontSize: 10 } }}
                data={total ? [{ name: total.toString() }] : []}
            />
            <VictoryAxis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={["😡", "😐", "😊", "😄", "🤩"]}
            />
            <VictoryBar
                theme={VictoryTheme.material}
                data={charts}
                style={{
                    data: {
                        fillOpacity: 0.7,
                        strokeWidth: 3,
                    },
                    labels: {
                        fontSize: 15,
                        fill: ({ datum }: any) =>
                            datum.x === 3 ? "#000000" : "#c43a31",
                    },
                }}
                width={300}
                labels={({ datum }) => datum.earnings}
                height={300}
                x={"quarter"}
                y={"earnings"}
            />
        </VictoryChart>
    );
};
