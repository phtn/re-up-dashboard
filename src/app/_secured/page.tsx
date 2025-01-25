import { TweetCard } from "@/components/ui/card/tweet";
import { Content } from "./content";

const Main = async () => {
  const GetTweet = () => {
    return <TweetCard id="1879605749954781511" />;
  };

  return (
    <Content>
      <GetTweet />
    </Content>
  );
};
export default Main;
