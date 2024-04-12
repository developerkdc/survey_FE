import * as React from "react";
import { useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import BasicSelect from "../components/mui/Selects/BasicSelect";
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import BasicTable from "./Table";
import axios from "axios";
import Swal from "sweetalert2";

export default function MapQuestion() {
  const [data, setData] = React.useState([]);
  const [mall, setMall] = React.useState([]);

  // for question and answer
  React.useEffect(() => {
    (async () => {
      let data = await axios.get(
        `https://feedbackreviewbackend.onrender.com/questions`
      );
      // let data = await axios.get(`https://feedbackreviewbackend.onrender.com/questions`);
      let mallList = await axios.get(
        `https://feedbackreviewbackend.onrender.com/mall`
      );
      // let mallList = await axios.get(`https://feedbackreviewbackend.onrender.com/mall`);
      setMall(mallList.data.data);
      setData(data.data.question);
    })();
  }, []);

  return (
    <>
      <JumboDemoCard
        title={"Questions List"}
        wrapperSx={{ backgroundColor: "background.paper", pt: 0 }}
      >
        <BasicTable data={data} mall={mall} />
      </JumboDemoCard>
    </>
  );
}
