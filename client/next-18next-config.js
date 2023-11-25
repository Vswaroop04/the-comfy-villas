
import { initReactI18next } from "react-i18next";

const path = require("path");

module.exports = {
  defaultLocale: "en",
  locales: ["en", "ru"],
  localePath: path.resolve("./public/translations"),
  use: [initReactI18next],   // this line did not affect the error in any way
  debug: true,
};