import { useEffect, useState } from "react";

export const useCurrentPrice = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        ).then((res) => res.json());
        setCurrentPrice(res.rates.RUB);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrice();
  }, []);

  return currentPrice;
};
