import React from 'react'
import { Doughnut, Line } from "react-chartjs-2";

export default function Charts() {
  return (
    <div class='container'>
        <Line
          class='mx-5'
            datasetIdKey="id"
            data={{
              labels: ["Jun", "Jul", "Aug", "Sept"],
              datasets: [
                {
                  id: 1,
                  label: "BLUE   ",
                  data: [5, 6, 7, 3],
                },
                {
                  id: 2,
                  label: "RED   ",
                  data: [3, 2, 1, 9],
                },
                {
                  id: 3,
                  label: "ORANGE    ",
                  data: [3, 4, 5, 8],
                },
                {
                    id: 4,
                    label: "GREY    ",
                    data: [15, 3 , 16, 6],
                  },
              ],
            }}
          />
        
    </div>
  )
}
