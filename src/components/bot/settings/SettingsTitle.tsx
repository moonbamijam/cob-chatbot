const SettingsTitle = ({ text = "Settings Title" }: { text?: string }) => {
  return (
    <h1 className="capitalize text-3xl font-bold dark:text-white w-max">
      {text}
    </h1>
  );
};

export default SettingsTitle;
