// backend/src/routes/mock-payment.ts
import { Router, Request, Response } from "express";
import { PaymentIntentType } from "../shared/types";

interface PaymentRequestBody {
  amount: number;
  currency: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

interface PaymentErrorBody {
  error: string;
}

const router = Router();

router.post(
  "/",
  (
    req: Request<{}, {}, PaymentRequestBody>,
    res: Response<PaymentIntentType | PaymentErrorBody>
  ) => {
    const { amount, currency, cardNumber, expiry, cvc } = req.body;

    if (!cardNumber.match(/^\d{16}$/)) {
      return res.status(400).json({ error: "Invalid card number." });
    }
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      return res.status(400).json({ error: "Invalid expiry date." });
    }
    if (!cvc.match(/^\d{3,4}$/)) {
      return res.status(400).json({ error: "Invalid CVC." });
    }
    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid amount." });
    }

    const isSuccess = cardNumber === "4242424242424242";
    if (!isSuccess) {
      return res.status(400).json({ error: "Payment declined." });
    }

    const paymentIntentId = `pi_mock_${Date.now()}`;
    res.json({ paymentIntentId });
  }
);

export default router;
