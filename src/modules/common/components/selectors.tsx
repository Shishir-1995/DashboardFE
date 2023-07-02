import styled from "@emotion/styled";

import { Tabs, Tab, TabProps } from "../components/tab";

const BORDER_RADIUS = "76px";
const TRANSITION_TIME = "300ms";

const Selectors = styled(Tabs)(({ theme }) => ({
  "&": {
    height: "36px",
    minHeight: "36px",
  },
  "& .MuiTabs-flexContainer": {
    height: "36px",

    borderRadius: BORDER_RADIUS,
    // border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey.A100,
  },
  "span.MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    borderBottom: "none",
    height: "36px",
    zIndex: 0,
    borderRadius: BORDER_RADIUS,
    top: 0,
  },
}));

const SelectorStyled = styled(Tab)(({ theme }) => ({
  borderRadius: BORDER_RADIUS,
  color: theme.palette.text.primary,
  flex: 1,
  padding: "12px 16px",

  "&.MuiButtonBase-root": {
    height: "36px",
    minHeight: "36px",
    paddingLeft: "40px",
    paddingRight: "40px",
  },

  "&.Mui-selected": {
    zIndex: 1,
    color: theme.palette.common.white,
    transition: theme.transitions.create("color", {
      duration: TRANSITION_TIME,
      easing: "ease-in-out",
    }),
  },
}));

const Selector: React.FC<TabProps> = ({ children, ...props }) => {
  return <SelectorStyled {...props}>{children}</SelectorStyled>;
};

export { Selectors, Selector };
