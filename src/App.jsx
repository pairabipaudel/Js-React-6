import React, { useEffect, useState,useRef } from 'react'
import './App.css'


const App = () => {
  const [collection, setCollection] = useState([]);
  const [country1,setCountry1]=useState('USA')
  const [country2,setCountry2]=useState('USA')
  const input_money = useRef(0);
  const [converted_money,setConverted_money]=useState(0);

  useEffect(() => { 
    async function fetchData() {
      try{
        const request= await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await request.json();
        setCollection(data.rates);
       
      }
      catch(error){
        console.error(error);
      }
    }
    fetchData();
    
  },[])

  
  let collection_country=['USD','NPR','AUD','BRL','CAD','EUR'];

  function convertFunction(){
       console.log(collection[country1]);
       setConverted_money(Number(input_money.current.value) * (collection[country2]/collection[country1]));  
  }

  return (
    <div className='full_container'>
       <div className='container'>
         <p className='title_exchange'>Exchange Your Currency</p>

         <div className="exchange_btn_container">
          <div className='exchange_country'>
            <div className='initial_country'>

                  <select onClick={(e)=>setCountry1(e.target.value)}  name="Country" id="country1">
                    {
                   collection_country.map((item)=>{
                    return(
                      <option key={item} value={item}>{item}</option>
                    )
                   })
                  }
                  </select>
            </div>

            <div className='equalsTo'>
              <button>=</button>
            </div>

            <div className="final_country">

              <select onClick={(e)=>setCountry2(e.target.value)}  name="Country" id="country1">
                    
                    {
                   collection_country.map((item)=>{
                    return(
                      <option key={item} value={item}>{item}</option>
                    )
                   })
                  }
                  </select>
            </div>

          </div>
         
            <div className='money_exchange_input'>
              <p>Amount:</p>
              <input ref={input_money} type="number" />
              <button onClick={convertFunction}>Convert</button>
            </div>

            <div className="money_exchange_display">
              {converted_money ?<p>Converted Amount: {converted_money.toFixed(2)} {country2}</p>: <p></p>}
            </div>
         </div>


       </div>
    </div>
  )
}

export default App
