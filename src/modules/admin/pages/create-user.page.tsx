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
} from "@mui/material";
import { CourseType } from "modules/common/enum/course-type.enum";
import { useSnackbar } from "notistack";
import { useGetRoles } from "../service/hooks";
import { AdminRepo } from "../service/repo";
import { CreateUserDto } from "../dto/user.dto";

const CreateUser = () => {
  const { formatMessage } = useLocale();
  const { enqueueSnackbar } = useSnackbar();
  const { data: roles } = useGetRoles();

  async function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const roleToAssign = data.get("role")?.toString();
    const userName = data.get("name")?.toString();
    const userEmail = data.get("email")?.toString();
    const userCourseType = data.get("courseType")?.toString();
    const userCourse = data.get("course")?.toString();

    if (!roleToAssign || !userName || !userEmail || !userCourse || !userCourseType) return;
  
    try {
      await AdminRepo.createUser({userName,roleToAssign,userCourse,userCourseType,userEmail}as CreateUserDto)
      enqueueSnackbar(formatMessage("user_created_msg"), { variant: "success" });
    } catch (error) {
      const msg = HttpClientUtil.getErrorMsgKey(error);
      enqueueSnackbar(msg, { variant: "error" });
    }
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <Box className="max-w-md m-auto mt-6">
          <Typography>* indicates required</Typography>
          <div className="flex flex-col gap-6 my-4">
            <FormControl required>
              <InputLabel>{formatMessage("select_role")}</InputLabel>
              <Select label={formatMessage("select_role")} name="role">
                {roles?.data.map((role) => (
                  <MenuItem value={role.type}>{formatMessage(role.type)}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label={formatMessage("name")} name="name" required />
            <TextField
              type="email"
              label={formatMessage("email")}
              name="email"
              required
            />
            <FormControl required>
              <InputLabel>{formatMessage("course_type")}</InputLabel>
              <Select label={formatMessage("course_type")} name="courseType">
                {Object.values(CourseType).map((course) => (
                  <MenuItem value={course}>{formatMessage(course)}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label={formatMessage("course")} name="course" />
            <Button
              size="large"
              type="submit"
              variant="contained"
              className="px-10 max-w-[200px] m-auto "
            >
              {formatMessage("create_user")}
            </Button>
          </div>
        </Box>
      </form>
    </>
  );
};

export default CreateUser;
