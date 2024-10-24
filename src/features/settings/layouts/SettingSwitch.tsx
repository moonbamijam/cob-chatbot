type SettingSwitchProps = Partial<
  Readonly<{
    children: React.ReactNode;
    className: string;
  }>
>;

const SettingSwitch = ({ children, className }: SettingSwitchProps) => {
  return <div className={`w-max ${className}`}>{children}</div>;
};

export default SettingSwitch;
