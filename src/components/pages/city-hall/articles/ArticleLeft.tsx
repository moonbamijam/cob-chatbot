import ArticleImageOne from "../../../../assets/articles/article-image-1.jpg";
import ArticleImageTwo from "../../../../assets/articles/article-image-2.png";
import ArticleImageThree from "../../../../assets/articles/article-image-3.png";
import ArticleImageFour from "../../../../assets/articles/article-image-4.png";

const ArticleLeft = () => {
  return (
    <article
      id="left"
      className="min-w-[680px] h-full flex flex-col items-center"
    >
      <img
        src={ArticleImageOne}
        alt=""
        width={600}
        height={480}
        className="p-5"
      />
      <div className="text-sm p-5">
        <a
          href="https://bacoor.gov.ph/latest-news/parent-leaders-ng-zapote-3-nagbigay-ng-liham-para-kay-mayor-strike-b-revilla/"
          className="mb-2"
        >
          <img src={ArticleImageTwo} alt="" width={680} height={415} />
        </a>
        <p>
          Nabasa ni Mayor Strike B. Revilla ang pinadalang message sa kanya ng
          Parent Leaders ng Longos Zapote 3 sa kanyang opisina sa Bacoor City
          Hall. Masaya po naming nasaksihan ang naramdamang saya at lakas ng
          ating Mayor kanina. Nakakatuwa po...
        </p>
      </div>
      <div className="text-sm p-5">
        <a
          href="https://bacoor.gov.ph/latest-news/tignan-unang-araw-ng-senakulo-ginanap-sa-san-nicolas-3/"
          className="mb-2"
        >
          <img src={ArticleImageThree} alt="" width={680} height={415} />
        </a>
        <p>
          Noong March 25, 2024, isinagawa ang unang araw ng Senakulo na ginanap
          sa San Nicolas 3. Dumalo rin naman sa unang araw si Fr. Ramoncito
          Tadepa na nanguna sa pagbibigay ng Banal na Misa na nilahukan naman
          ito na Senakulista...
        </p>
      </div>
      <div className="text-sm p-5">
        <a
          href="https://bacoor.gov.ph/latest-news/parent-leaders-ng-zapote-3-nagbigay-ng-liham-para-kay-mayor-strike-b-revilla/"
          className="mb-2"
        >
          <img src={ArticleImageFour} alt="" width={680} height={415} />
        </a>
        <p>
          In a remarkable display of unity and collaboration, the City of Bacoor
          witnessed the launch of a groundbreaking partnership between private
          and public schools. The event, titled "Strike As 1 Ng Mga Nagkakaisang
          Paaralan," was organized by Mayor Strike...
        </p>
      </div>
    </article>
  );
};

export default ArticleLeft;
