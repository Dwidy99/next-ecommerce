export type TProfile = {
  name: string;
  email: string;
  image: string | null;
  created_at: Date;
};

export type ProfileResult = TProfile | { error: string };

export type FormProfileProps = {
  initialProfile: TProfile;
};

