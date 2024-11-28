import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";

import "@styles/markdown.css";
import SkeletonScreen from "@/src/components/ui/SkeletonScreen";

const SecuritySection = () => {
  const file_name = "SECURITY";
  const [post, setPost] = useState("");

  useEffect(() => {
    import(`../../../../../docs/${file_name}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <section id="security">
      {post ? (
        <Markdown className="max-w-[90%] dark:text-white/70">{post}</Markdown>
      ) : (
        <div>
          <SkeletonScreen className="max-w-[35%] h-[48px] mb-4" />
          <SkeletonScreen className="max-w-[90%] h-[100px] mb-8" />
          <SkeletonScreen className="max-w-[40%] h-[48px] mb-4" />
          <SkeletonScreen className="max-w-[50%] h-[100px] mb-4" />
          <SkeletonScreen className="max-w-[90%] h-[70px]" />
        </div>
      )}
    </section>
  );
};

export default SecuritySection;
