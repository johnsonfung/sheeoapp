import { useEffect } from "react";
import $ from "jquery";

const useScript = (url, isForm, userData) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    const onScriptLoad = () => {
      if (isForm) {
        console.log("script loaded");
        $("input[name='Email']").val("test@test.com");
      }
    };

    script.addEventListener("load", onScriptLoad);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptLoad);
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
