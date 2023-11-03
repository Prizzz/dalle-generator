import { RenderCardsProps } from "@/typings";
import Card from "./Card";

const RenderCards = ({ data, title }: RenderCardsProps) => {
  return data && data?.length > 0 ? (
    <>
      {data.map((post) => (
        <Card key={post._id} {...post} />
      ))}
    </>
  ) : (
    <h2 className="mt-2 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

export default RenderCards;
