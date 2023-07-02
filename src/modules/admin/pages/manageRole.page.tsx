import { HttpClientUtil } from "@http-client";
import { useLocale } from "@locale";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material";
import { useState } from "react";

import { useSnackbar } from "notistack";
import { useGetPermissions, useGetRoles } from "../service/hooks";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ManageRolePage = () => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [role, setRole] = useState<string | null>();
  const { formatMessage } = useLocale();
  const { data: allPermissions } = useGetPermissions();
  const { data: roles } = useGetRoles();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: SelectChangeEvent<typeof permissions>) => {
    const { value } = event.target;
    setPermissions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  async function handleSubmit() {
    console.log(role, permissions);
  }

  return (
    <div>
      <Box className="max-w-md m-auto mt-6">
        <Typography>* indicates required</Typography>
        <div className="flex flex-col gap-6 my-4">
          <FormControl required>
            <Autocomplete
              freeSolo
              onChange={(_event, newValue: string | null) => {
                setRole(newValue);
              }}
              options={roles?.data.map((option) => option.type) || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search or create"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              )}
            />
          </FormControl>

          <FormControl required>
            <InputLabel id="multiple-permission">
              {formatMessage("select_permissions")}
            </InputLabel>
            <Select
              labelId="multiple-permission"
              label={formatMessage("select_permission")}
              value={permissions}
              renderValue={(selected) => selected.join(", ")}
              multiple
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {allPermissions?.data.map((permission) => (
                <MenuItem key={permission} value={permission}>
                  <Checkbox checked={permissions.indexOf(permission) > -1} />
                  <ListItemText primary={permission} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            size="large"
            variant="contained"
            className="px-10 max-w-[200px] m-auto "
            onClick={handleSubmit}
          >
            {formatMessage("save")}
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default ManageRolePage;
