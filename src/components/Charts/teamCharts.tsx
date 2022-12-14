import {
    VictoryBar,
    VictoryTheme,
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryLegend,
} from "victory";
import { useState, useEffect } from "react";
import { listTeams } from "../../services/api";

type props = { user: any };

export default ({ user }: props) => {
    const [teams, setTeams] = useState<any>([]);
    const [totalColaborators, setTotalColaborators] = useState([]);
    const [teamData, setTeamData] = useState<any>([]);

    useEffect(() => {
        listTeams(user?.team)
            .then((data) => {
                setTeams(
                    data.map((team: any, i: number) => {
                        teamData.push(team);
                        setTeamData(teamData);

                        setTotalColaborators(
                            totalColaborators + team?.colaborators.length
                        );

                        return {
                            quarter: i + 1,
                            teamSize: team?.colaborators.length,
                        };
                    })
                );
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <VictoryChart
            style={{
                parent: {
                    border: "2px solid #ccc",
                },
            }}
        >
            <VictoryLabel
                text="Número de Times X Colaboradores"
                x={225}
                y={10}
                style={{ fontWeight: "bold" }}
                textAnchor={"middle"}
            />

            <VictoryLegend
                x={310}
                y={50}
                title="N° total de colaboradores"
                orientation="vertical"
                gutter={20}
                style={{ title: { fontSize: 10 } }}
                data={
                    totalColaborators
                        ? [{ name: totalColaborators.toString() }]
                        : []
                }
            />
            <VictoryAxis
                tickValues={teams.map((team: any, i: number) => i + 1)}
                tickFormat={teamData.map((team: any) => team.name)}
            />
            <VictoryBar
                theme={VictoryTheme.material}
                data={teams}
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
                labels={({ datum }) => datum.teamSize}
                height={300}
                x={"quarter"}
                y={"teamSize"}
            />
        </VictoryChart>
    );
};
