import { useLocale } from "@locale";
import { Box, Card, Tab, Tabs } from "@mui/material";
import TabPanel from "modules/common/components/tab-panel";
import { PPTab } from "modules/common/enum/pp-tab.enum";
import { useState } from "react";
import UpcommingBookings from "./components/upcoming-bookings";
import HistoryBookings from "./components/history-bookings";
import AdhocSessions from "./components/adhoc-sessions";

interface Props {}

const PPList: React.FC<Props> = ({}) => {
  const [tabValue, setTabValue] = useState<PPTab>(PPTab.UpcommingEvents);
  const { formatMessage } = useLocale();

  function handleTabChange(event: React.SyntheticEvent, newValue: string) {
    setTabValue(newValue as PPTab);
  }

  return (
    <Card>
      <Tabs className="border-b" value={tabValue} onChange={handleTabChange} variant="fullWidth">
        <Tab value={PPTab.UpcommingEvents} label={formatMessage(PPTab.UpcommingEvents)} />
        <Tab value={PPTab.History} label={formatMessage(PPTab.History)} />
        <Tab value={PPTab.AdhocSessions} label={formatMessage(PPTab.AdhocSessions)} />
      </Tabs>
      <Box>
        <TabPanel value={tabValue} index={PPTab.UpcommingEvents}>
          <UpcommingBookings />
        </TabPanel>
        <TabPanel value={tabValue} index={PPTab.History}>
          <HistoryBookings />
        </TabPanel>
        <TabPanel value={tabValue} index={PPTab.AdhocSessions}>
          <AdhocSessions/>
        </TabPanel>
      </Box>
    </Card>
  );
};

export default PPList;
