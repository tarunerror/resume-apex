declare interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: any) => void;
}

declare interface Razorpay {
  new (options: RazorpayOptions): Razorpay;
  open: () => void;
}

declare const Razorpay: Razorpay; 