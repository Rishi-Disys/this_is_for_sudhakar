import React from 'react'
import Navbar from '../Components/Navbar'

export default function Visualizations() {
  return (
    <div>
        <Navbar/>


        <div class='input-group justify-content-center bg-success-subtle'>
        <div class='d-flex bg-warning-subtle justify-content-end m-3'>


<button class='btn btn-primary rounded-pill mx-3 button-center'>Left Button</button>
<button class='btn btn-primary rounded-pill mx-3'>Center Button</button>
<button class='btn btn-primary rounded-pill mx-3'>Right Button</button>
</div>

        </div>
        
    </div>
  )
}
