"use client";

import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import * as Popper from "@popperjs/core";

const BootstrapClient = () => {
  useEffect(() => {
    window.$ = window.jQuery = $;
    window.Popper = Popper;
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
};

export default BootstrapClient;
