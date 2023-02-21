import { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";

export const SettingsAddress = (props) => {
  const [values, setValues] = useState({
    address: "localhost",
    port: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update edge server's address" title="Edge Server Address" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Address"
            margin="normal"
            name="address"
            defaultValue="localhost"
            onChange={handleChange}
            // type="password"
            // value={values.address}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Port"
            margin="normal"
            name="port"
            onChange={handleChange}
            // type="password"
            value={values.port}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};
