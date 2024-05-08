import React, { useState } from "react";

export default function FileForm() {
    const [csv, setCsv] = useState(null);


    const handleFiles = (e) => {

        console.log(e.target.files[0])
        setCsv(e.target.files[0])
        
        

    }

    
  return (
    <div class='container'>
      <input
        type="file"
        accept=".csv"
        class="bg-warning"
        onChange={handleFiles}
      />
      <button type="submit">Upload</button>
    </div>
  );
}
