import { Button, MenuItem } from "@material-ui/core";
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { getCategories, getTeams, insertUser } from "../services/api";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [team, setTeam] = useState<string>("");

  const [categories, setCategories] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);

  const createUser = () => {
    insertUser({
      name,
      password,
      email,
      category,
      team: team === "" ? null : team,
    })
      .then((res) => {
        router.push("/createUser");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));

    getTeams()
      .then((data) => setTeams(data))
      .catch((err) => console.log(err));
  }, []);

  const generateCategories = categories
    ? categories?.map((category) => (
        <MenuItem value={category.id} key={category.id}>
          {category?.name}
        </MenuItem>
      ))
    : null;

  const generateTeams = teams
    ? teams?.map((team) => (
        <MenuItem value={team.id} key={team.id}>
          {team?.name}
        </MenuItem>
      ))
    : null;

  return (
    <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
      <FormControl sx={{ display: "flex", gap: 2 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <TextField
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <div style={{ display: "flex", gap: 8 }}>
        <FormControl sx={{ width: "10vw" }}>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
            defaultValue={category}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {generateCategories}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "10vw" }}>
          <InputLabel id="demo-simple-select-label">Time</InputLabel>
          <Select
            defaultValue={team}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={team}
            label="Time"
            onChange={(e) => setTeam(e.target.value)}
          >
            {generateTeams}
          </Select>
        </FormControl>
      </div>
      <Button onClick={createUser}>Criar</Button>
    </div>
  );
};
