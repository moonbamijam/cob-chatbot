const SettingsMiniTitle = ({
  text = "Settings Mini Title",
}: {
  text?: string;
}) => {
  return (
    <h3 className="capitalize text-lg font-semibold mb-2 text-black/60 dark:text-white/50">
      {text}
    </h3>
  );
};

export default SettingsMiniTitle;
