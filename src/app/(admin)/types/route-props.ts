export type Tparams = {
  id: string;
};

export type Tedit = {
  params: Promise<Tparams> | Tparams;
};

