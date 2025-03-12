import { Angry, Frown, Laugh, Meh, Smile } from "lucide-react";

export const STATUSES = ["Pending", "Confirmed", "Completed", "Canceled"];

export const DISCOVERIES = [
  "google",
  "social media",
  "word of mouth",
  "friend or family",
  "referral",
  "website",
  "other",
];

export const RATING_OPTIONS = [
  {
    value: "very-unsatisfied",
    label: "Very Unsatisifed",
    icon: Angry,
    hoverColor: "hover:fill-red-600",
    fillColor: "fill-red-600",
    tooltipBgColor: "bg-red-600",
  },
  {
    value: "unsatisfied",
    label: "Unsatisfied",
    icon: Frown,
    hoverColor: "hover:fill-orange-500",
    fillColor: "fill-orange-500",
    tooltipBgColor: "bg-orange-500",
  },
  {
    value: "neutral",
    label: "Neutral",
    icon: Meh,
    hoverColor: "hover:fill-yellow-500",
    fillColor: "fill-yellow-500",
    tooltipBgColor: "bg-yellow-500",
  },
  {
    value: "satisfied",
    label: "Satisfied",
    icon: Smile,
    hoverColor: "hover:fill-green-500",
    fillColor: "fill-green-500",
    tooltipBgColor: "bg-green-500",
  },
  {
    value: "very-satisfied",
    label: "Very Satisfied",
    icon: Laugh,
    hoverColor: "hover:fill-emerald-600",
    fillColor: "fill-emerald-600",
    tooltipBgColor: "bg-emerald-600",
  },
];
