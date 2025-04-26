declare module "react-credit-cards-2" {
  import { FC } from "react";

  interface CardsProps {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focused?: "number" | "expiry" | "cvc" | "name" | "";
    issuer?: string;
    preview?: boolean;
    locale?: { valid: string };
    placeholders?: {
      name?: string;
      number?: string;
      expiry?: string;
      cvc?: string;
    };
  }

  const Cards: FC<CardsProps>;
  export default Cards;
}
