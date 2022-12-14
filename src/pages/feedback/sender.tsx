import { CircularProgress } from "@material-ui/core";
import Visibility from "@mui/icons-material/Visibility";
import {
    Backdrop,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user";
import { getSendingFeedbacks } from "../../services/api";
export default () => {
    const [user] = useContext<any>(UserContext);
    const [sendFeedbacks, setSendFeedbacks] = useState([]);
    const [open, setOpen] = useState([false]);

    const handleClose = (index: number, value: boolean) => {
        open[index] = value;
        setOpen([...open]);
    };

    useEffect(() => {
        getSendingFeedbacks(user?.id)
            .then((data) => {
                if (typeof data === "object") setSendFeedbacks(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Eniado para</TableCell>
                        <TableCell align="right">Data de envio</TableCell>
                        <TableCell align="right">Descrição</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sendFeedbacks.map((feedback: any, i) => {
                        const isOpen = !!open[i];
                        return (
                            <>
                                <TableRow
                                    key={i}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {feedback.reciever.name.split(" ")[0]}
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Date(
                                            feedback.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Visibility
                                            onClick={() =>
                                                handleClose(i, !isOpen)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                                <Backdrop
                                    sx={{
                                        color: "#fff",
                                        zIndex: (theme) =>
                                            theme.zIndex.drawer + 1,
                                    }}
                                    open={isOpen}
                                    onClick={() => handleClose(i, !isOpen)}
                                >
                                    <span>{feedback.description}</span>
                                </Backdrop>
                            </>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
