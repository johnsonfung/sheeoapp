import React, { useEffect, useState } from "react";
import $ from "jquery";

export const getUrlParameter = (sParam) => {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);

  let result = params.get(sParam);
  if (result) {
    return result;
  } else {
    return "";
  }
};

export const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    const onScriptLoad = () => {
      $("form").submit(function () {
        console.log("submitted");
      });
    };

    script.addEventListener("load", onScriptLoad);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptLoad);
      document.body.removeChild(script);
    };
  }, [url]);
};
