// there is a really big type, declared only required/used fields
export type TEvent = {
  id: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  public: boolean;
  created_at: string;
};
