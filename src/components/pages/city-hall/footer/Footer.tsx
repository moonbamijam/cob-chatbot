import StrikeScan from "@assets/images/strike-scan.jpg";
import FbPage from "@assets/images/fb-page.png";
import HighlightTitle from "@components/pages/city-hall/ui/HighlightTitle";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="flex gap-12 px-10 mt-16">
        <div id="fb-page" className="max-w-[340px] flex flex-col mb-5">
          <HighlightTitle text={"LIKE US ON FACEBOOK:"} />
          <a
            href="https://www.facebook.com/CityGovtBacoor/?ref=embed_page"
            className="w-[200px] inline"
          >
            <img src={FbPage} alt="" width={200} height={500} />
          </a>
        </div>
        <div id="hotlines" className="max-w-[340px] flex flex-col">
          <div className="mb-5">
            <HighlightTitle text={"EMERGENCY HOTLINES:"} />
          </div>
          <div className="">
            <h1 className="text-[#ed1a3b]">
              Bacoor Disaster Risk Reduction and Management Office (BDRRMO)
            </h1>
            <p className="text-white text-sm">(046) 417-0727</p>
          </div>
          <div className="">
            <h1 className="text-[#ed1a3b]">
              Philippine National Police-Bacoor City (PNP)
            </h1>
            <p className="text-white text-sm">(046) 417-6366</p>
          </div>
          <div className="">
            <h1 className="text-[#ed1a3b]">
              Bureau of Fire Protection-Bacoor City (BFP)
            </h1>
            <p className="text-white text-sm">(046) 417-6060</p>
          </div>
          <div className="">
            <h1 className="text-[#ed1a3b]">BCity Information Office</h1>
            <p className="text-white text-sm">(046) 481-4120</p>
          </div>
        </div>
        <div id="strike-scan" className="max-w-[340px] flex flex-col">
          <div className="mb-5">
            <HighlightTitle text={"STRIKE SCAN ME"} />
          </div>
          <img src={StrikeScan} alt="" width={200} height={250} />
        </div>
      </div>
      <div
        id="main-footer"
        className="mt-[200px] w-full bg-black text-white text-sm py-3 px-5"
      >
        <p>
          © Bacoor.gov.ph |
          <a
            href="https://bacoor.gov.ph/privacy-policy/"
            className="capitalize hover:text-[#ed1a3b] ml-4"
          >
            privacy policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
