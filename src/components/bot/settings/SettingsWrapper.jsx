const SettingsWrapper = ({ children }) => {
  return (
    <div className="flex flex-col xs:items-center lg:items-start gap-8">
      {children}
    </div>
  );
};

export default SettingsWrapper;
