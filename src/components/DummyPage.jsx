import Section from "./common/Section";

const DummyPage = () => {
  return (
    <>
      <div
        id="main-logo"
        className="my-4 rounded-full w-[100px] h-[100px] bg-dummyhighlight"
      ></div>
      <Section>
        <div
          id="header-wrapper"
          className="flex justify-between items-center px-8 lg:px-14 pb-8"
        >
          <div
            id="sub-logo"
            className="rounded-md w-16 h-12 bg-dummyhighlight"
          ></div>
          <div id="menu" className="w-[350px] h-[40px] bg-dummysecondary"></div>
          <div
            id="search"
            className="rounded-xl w-[120px] h-[20px] bg-dummyextra"
          ></div>
        </div>
        <div
          id="content-panel-main"
          className="w-full h-[450px] bg-dummyprimary"
        ></div>
        <div
          id="sub-content-panel-wrapper"
          className="flex justify-evenly px-8 lg:px-14 mt-12"
        >
          <div
            id="content-panel-2"
            className="w-[450px] h-[250px] bg-dummysecondary"
          ></div>
          <div
            id="content-panel-2"
            className="w-[220px] h-[250px] bg-dummyprimary"
          ></div>
        </div>
      </Section>
    </>
  );
};

export default DummyPage;
