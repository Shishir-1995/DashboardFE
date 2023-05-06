import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { eraseCookie, getCookie } from "utils/cookies/cookies";
import { useState, useEffect } from "react";
import { useLocale } from "@locale";
import { useNavigate } from "react-router-dom";
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { enqueueSnackbar } from "notistack";
import { HttpClientUtil } from "@http-client";
import { IAProfileDto, StudentProfileDto } from "modules/auth/dto/login.dto";
import { AuthRepo } from "modules/auth/service/repo";

interface props {
  children: React.ReactNode;
}

const AppWrapper: React.FC<props> = ({ children }) => {
  const theme = useTheme();
  const [userName, setUserName] = useState<string | undefined>(getCookie("userName"));
  const [profileData, setProfileData] = useState<StudentProfileDto | IAProfileDto>()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { formatMessage } = useLocale()
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  useEffect(() => {
    getName(userName ?? "user");
  }, []);

  function stringAvatar(name: string): string {
    return `${name.split(" ")[0][0].toUpperCase()}${
      name.split(" ").length > 1 ? name.split(" ")[1][0].toUpperCase() : ""
    }`;
  }

  const getName = (data: string): void => {
    let temp_userName = data;
    let firstName = temp_userName.split(" ")[0];
    const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    setUserName(capitalizedFirstName);
  };

  const handleGetDataForProfile = async() : Promise<void>=> {
      try{
        if(getCookie("role")==="Student")
        { 
          const studentProfile = await AuthRepo.getStudentProfile()
          setProfileData(studentProfile.data)
        }
        else{
          const iaProfile = await AuthRepo.getIaProfile()
          setProfileData(iaProfile.data)
        }
      }
      catch(error){
        const msg = HttpClientUtil.getErrorMsgKey(error);
        enqueueSnackbar(msg, { variant: "error" });
      }
  }

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          boxShadow: theme.shadow.shadow_5,
          bgcolor: theme.palette.common.white,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="flex justify-between">
            <img
              src="https://masaischool.com/img/navbar/logo.svg"
              loading="lazy"
            />
            {
              getCookie("role") === "Admin" && (
                <>
                  <Button variant="contained" color="secondary" onClick={()=>navigate("/ia")}>
                    {formatMessage("Student_Details")}
                  </Button>
                  <Button variant="contained" color="secondary" onClick={()=>navigate("/ia/pp")}>
                    {formatMessage("PPdashboard")}
                  </Button>
                  <Button variant="contained" color="secondary">
                    {formatMessage("Apply_Leave")}
                  </Button>
                </>
              )
            }
            <div className="flex items-center gap-2">
              <Typography color="black">Hello, {userName}</Typography>
                    <IconButton size="small" color="primary" onClick={(e)=>{
                      handleClick(e)
                      handleGetDataForProfile()
                    }}  aria-describedby={id}>
                    <Avatar className="bg-gray-500">
                      {typeof userName === "string" && stringAvatar(userName)}
                    </Avatar>
                    </IconButton>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      color="info"
                    >
                      <Typography sx={{ p: 0.5 }} textAlign={"center"} fontWeight={"shadow_5"}>{profileData?.name}</Typography>
                      <Typography sx={{ p: 1 }} fontStyle={"italic"} fontSize={"14px"}>{profileData?.email}</Typography>
                      <Typography variant="overline" display={'flex'} justifyContent={"center"} alignContent={"center"}><Button onClick={()=>{
                        eraseCookie("role")
                        eraseCookie("userName")
                        eraseCookie("accessToken")
                        navigate("/auth/login")
                      }} variant="text" >Sign Out</Button></Typography>
                    </Popover>
                </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="m-6 pb-20">{children}</div>
    </div>
  );
};

export default AppWrapper;
