import { Paper } from "@material-ui/core";
import Backdrop from "@mui/material/Backdrop";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/context/user";
import { excludeUser, getUsers } from "src/services/api";

import Clear from "@mui/icons-material/Clear";
import { useRouter } from "next/router";

export default () => {
  const [users, setUsers] = useState<any>([]);
  const [user] = useContext<any>(UserContext);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = (userId: string) =>
    excludeUser(userId).then((data) => {
        useRouter().reload()
    }).catch((err) => console.log(err));

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, textAlign: "center" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Categoria</TableCell>
            <TableCell align="center">Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            ? users?.map((_user: any, i: number) => {
                if (user.id !== _user?.id)
                  return (
                    <TableRow key={i} sx={{ textAlign: "center" }}>
                      <TableCell align="center">{_user?.name}</TableCell>
                      <TableCell align="center">
                        {_user?.category?.name}
                      </TableCell>
                      <TableCell align="center">
                        <Clear color="error"  onClick={() => deleteUser(_user?.id)}/>
                      </TableCell>
                    </TableRow>
                  );
              })
            : []}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
