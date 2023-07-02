import { useLocale } from "@locale";
import { Box, Card, Tab, Tabs } from "@mui/material";
import TabPanel from "modules/common/components/tab-panel";
import { PPTab } from "modules/common/enum/pp-tab.enum";
import { useState } from "react";
import UpcommingBookings from "./components/upcoming-bookings";
import HistoryBookings from "./components/history-bookings";

interface Props {
  handleToggle: () => void;
}

const PPList: React.FC<Props> = ({ handleToggle }) => {
  const [tabValue, setTabValue] = useState<PPTab>(PPTab.UpcommingEvents);
  const { formatMessage } = useLocale();

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue as PPTab);
  }

  return (
    <Card>
      <Tabs
        className="border-b"
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab
          value={PPTab.UpcommingEvents}
          label={formatMessage(PPTab.UpcommingEvents)}
        />
        <Tab value={PPTab.History} label={formatMessage(PPTab.History)} />
      </Tabs>
      <Box>
        <TabPanel value={tabValue} index={PPTab.UpcommingEvents}>
          <UpcommingBookings handleToggle={handleToggle} />
        </TabPanel>
        <TabPanel value={tabValue} index={PPTab.History}>
          <HistoryBookings />
        </TabPanel>
      </Box>
    </Card>
  );
};

export default PPList;
