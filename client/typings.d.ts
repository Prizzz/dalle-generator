export type Post = {
  _id: string;
  name: string;
  prompt: string;
  image: string;
};

export interface RenderCardsProps {
  data?: Post[];
  title: string;
}
