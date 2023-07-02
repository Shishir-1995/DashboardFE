import styled from "@emotion/styled";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import MuiTab from "@mui/material/Tab";

export interface TabsProps {
  value: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  onChange,
  value,
  children,
  fullWidth,
  ...restProps
}) => {
  return (
    <TabContext value={value}>
      <TabList
        {...(onChange && {
          onChange: (_, value): void => onChange(value as string),
        })}
        {...(fullWidth && {
          variant: "fullWidth",
        })}
        {...restProps}
      >
        {children}
      </TabList>
    </TabContext>
  );
};

const BaseTab = styled(MuiTab)(({ theme }) => ({
  textTransform: "inherit",
  fontWeight: theme.typography.fontWeightBold,
  padding: "12px 32px",

  "&.Mui-selected": {
    fontWeight: 700,
  },
}));

export interface TabProps {
  value?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
export const Tab: React.FC<TabProps> = ({ children, ...props }) => {
  return <BaseTab label={children} {...props} />;
};
