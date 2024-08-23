const SettingsNavSection = ({ children }) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      {children}
      <hr className="border-surface-dark dark:border-dm-surface " />
    </div>
  );
};

export default SettingsNavSection;
