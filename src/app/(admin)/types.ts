export interface ActionResult {
  error: string;
  redirectUrl?: string;
  code?: string;
  message?: string;
}

export type Tparams = {
  id: string;
};

export type Tedit = {
  params: Tparams;
};

