import { React, useCallback, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDropzone } from "react-dropzone";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import FileForm from "../Components/FileForm";
import Charts from "../Components/Charts";
import Visualizations from "./Visualizations";

export default function Home() {
  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  //   console.log(acceptedFiles)
  // }, [])

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  // const [csv, setCsv] = useState([]);
  // console.log(csv);

  // const data = [
  //   { year: 2010, count: 10 },
  //   { year: 2011, count: 20 },
  //   { year: 2012, count: 15 },
  //   { year: 2013, count: 25 },
  //   { year: 2014, count: 22 },
  //   { year: 2015, count: 30 },
  //   { year: 2016, count: 28 },
  // ];

  // const chart = new Chart(ctx, {
  //   type: 'line',
  //   data: data,
  //   options: {
  //     onClick: (e) => {
  //       const canvasPosition = getRelativePosition(e, chart);

  //       // Substitute the appropriate scale IDs
  //       const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
  //       const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
  //     }
  //   }
  // });

  // const handleCSV = (e) => {

  // }

  return (
    <div class="mx-auto">
      <Navbar />

      <div class="row bg-danger-subtle">
        <div class="col-6 bg-success-subtle">{/* <FileForm/> */}</div>
        <div class="col-6 bg-warning-subtle">
          <Charts class="" />
        </div>
      </div>

      <div class="input-group justify-content-center">
        <Link to="visual" element={<Visualizations />}>
          <button class="btn bg-info-subtle m-3">Click to Visualize</button>
        </Link>
      </div>
    </div>
  );
}
