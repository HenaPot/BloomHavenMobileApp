import { TextStyle } from "react-native";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "p" | "ps";

const TypographyVariantMap: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontSize: 28,
    lineHeight: 34,
  },
  h2: {
    fontSize: 25,
    lineHeight: 34,
  },
  h3: {
    fontSize: 21,
    lineHeight: 31,
  },
  h4: {
    fontSize: 17,
    lineHeight: 26,
  },
  p: {
    fontSize: 15,
    lineHeight: 23,
  },
  ps: {
    fontSize: 13,
    lineHeight: 20,
  },
};

export default TypographyVariantMap;