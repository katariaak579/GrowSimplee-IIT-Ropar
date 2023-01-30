import React from 'react'
import { useState, useEffect } from 'react'

function Data() {
  
    const [vehicleNum, setvehicleNum] = useState(0)
    const [CapacityArr, setCapacityArr ] = useState(new Array(vehicleNum))
    const [data, setData]=useState({
      vehicleNum:null,
      CapacityArr: null,
      dispatchAdd: null,
      pickupAdd: null
    })
    const [dispatchAdd, setDispatchAdd] = useState(null)
    const [pickupAdd, setPickUpAdd] = useState(null)
    
    function sendData(e){
      e.preventDefault()
      if(data.vehicleNum==null ||data.vehicleNum==undefined){
        return;
      }
      if(data.CapacityArr==null ||data.CapacityArr==undefined || data.CapacityArr.length==0){
        return;
      }
      if(data.dispatchAdd==null ||data.dispatchAdd==undefined){
        return;
      }
      if(data.pickupAdd==null ||data.pickupAdd==undefined){
        return;
      }

      fetch("http://localhost:8000/add_data", {
        method:'post',
        body:JSON.stringify(data),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(response=>{
        response.json().then((data)=>{
          console.log(data)
        })
      }).catch(err=>{
        console.log(err)
      })

    }

  useEffect(() => {
  }, [vehicleNum])

  const setMyTestInfo = 0

  const setVehicleNumber = (e) => {
    try {
      console.log(e.target.value)
      if (e.target.value === "" || e.target.value === null || e.target.value === NaN || e.target.value === undefined || parseInt(e.target.value) < 0) {
        setVehicleNumber(0)
      } else {
        setvehicleNum(parseInt(e.target.value))
      }
    } catch (err) {

    }
  }

  const setCapacity = (e, index) => {
    CapacityArr[index] = parseInt(e.target.value)
    setCapacityArr(CapacityArr)
    console.log(CapacityArr)
  }

  return (

    <form className="w-full max-w-lg lg:mx-auto md:mx-auto bg-orange-200 p-4 m-4 mx-auto border-8 border-orange-100 rounded"
      action="http://localhost:8000/data_form"
      method="POST" enctype="multipart/form-data"
    >
      <div className="p-2 m-2">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
          Dispatch Addresses
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="grid-first-name" type="file"
          name="dispatch_addresses"
          accept=".xls,.xlsx,.csv,.txt" />
      </div>
      <div className="p-2 m-2">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
          Dynamic Pickup Addresses
        </label>
        <input className="appearance-none bl  ock w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-last-name" type="file"
          name="pickup_addresses"
          accept=".xls,.xlsx,.csv,.txt" />
      </div>

      <div className="p-2 m-2">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Number of Vehicles
        </label>
        <input onChange={setVehicleNumber} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
        id="grid-password" type="number" name = "number_of_vehicles"/>

      </div>

      <div className="w-full px-3 mb-6 md:mb-0">
        {
          [...Array(vehicleNum)].map((item, index) => {
            return (
              <div className='p-2 m-2'>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                  Vehicle {index + 1} Capacity
                </label>
                <input onChange={(e) => { setCapacity(e, index) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="grid-city" type="number" name={"vehicle_" + index + "_capacity"}/>
              </div>
            )
          })
        }
      </div>

      <div className='w-full my-4 flex justify-center flex-col md:flex-col lg:flex-col'>
        {/* Batch menu button */}
        <label htmlFor="batchlabel" className="form-label text-bold text-3xl mx-auto inline-block mb-2 text-gray-700"
        > Select Bag Dimensions </label>
        <div className='mx-2 px-2 flex flex-row mx-auto'>
          <label className='mx-2' htmlFor="dim1">60 x 60 x 100 cms</label>
          <input type="checkbox" onChange={(e) => { }} name="Physics" id="Physics" />
        </div>


        <div className='mx-2 px-2 flex flex-row mx-auto'>
          <label htmlFor="Chem" className='mx-2'>80 x 80 x 100 cms</label>
          <input type="checkbox" onChange={(e) => { }} name="Chem" id="Chem" />
        </div>
      </div>


      <div className="flex flex-wrap -mx-3 mb-2">

        <button className='bg-blue-300 hover:bg-blue-400 active:bg-blue-300 p-4 mx-auto rounded' type='submit'>
          Add Information
        </button>

      </div>

    </form>
  )
}

export default Data