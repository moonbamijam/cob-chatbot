const SettingsNavTitle = ({ name }) => {
  return (
    <p className="w-full text-xs text-black/60 dark:text-white/50 font-semibold capitalize md:px-4 line-clamp-2 break-words">
      {name}
    </p>
  );
};

export default SettingsNavTitle;
