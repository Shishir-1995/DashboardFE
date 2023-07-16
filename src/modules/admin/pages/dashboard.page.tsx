import { Box, IconButton, Typography } from "@mui/material";
import StaticsCard from "../components/statics-card";
import EmailIcon from "@mui/icons-material/Email";
import LineChart from "../components/LineChart";
import { theme, tokens } from "styles/theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useGetStatistics } from "../service/hooks";
import { Leaderboard } from "../components/leader-board";

const DashboardPage = () => {
  const colors = tokens(theme.palette.mode);
  const { data } = useGetStatistics();

  return (
    <div className="mt-10">
      <div className="flex justify-between item-center gap-10 max-h-96 ">
        <div className="w-full">
          <StaticsCard
            icon={<EmailIcon color="info" />}
            increase={data?.data.bookedOccupancy.value || ""}
            progress={data?.data.bookedOccupancy?.data || 0}
            subtitle={data?.data.bookedOccupancy?.desc || ""}
            title={data?.data.bookedOccupancy?.title || ""}
          />
          <StaticsCard
            icon={<EmailIcon color="info" />}
            increase={data?.data.bookedOccupancy.value || ""}
            progress={data?.data.bookedOccupancy?.data || 0}
            subtitle={data?.data.bookedOccupancy?.desc || ""}
            title={data?.data.bookedOccupancy?.title || ""}
          />
          <StaticsCard
            icon={<EmailIcon color="info" />}
            increase={data?.data.bookedOccupancy.value || ""}
            progress={data?.data.bookedOccupancy?.data || 0}
            subtitle={data?.data.bookedOccupancy?.desc || ""}
            title={data?.data.bookedOccupancy?.title || ""}
          />
        </div>

        <Box
          overflow="auto"
          sx={{
            backgroundColor: colors.primary[400],
            width: "650px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="15px"
            sx={{
              borderBottom: `4px solid ${colors.primary[500]}`,
              colors: colors.grey[100],
            }}
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Leaderboard
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Total PP Booked
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Occupancy
            </Typography>
          </Box>
          {data?.data.leaderboard
            .sort((a, b) => b.occupancy - a.occupancy)
            .map((leaderboard, i) => (
              <Box
                key={`${leaderboard.name}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Typography color={colors.grey[100]}>{leaderboard.name}</Typography>

                <Box color={colors.grey[100]}>{leaderboard.bookedSlot}</Box>

                <Box
                  p="5px 10px"
                  borderRadius="4px"
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                  }}
                >
                  {leaderboard.occupancy}%
                </Box>
              </Box>
            ))}
        </Box>
      </div>
      <Leaderboard data={data?.data.leaderboardData || []} />
      <Box
        className="mt-10"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          sx={{
            backgroundColor: colors.primary[400],
            flex: 1,
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Pair Programming Graph
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={data?.data.leaderGraph || []} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardPage;
