import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRef} from 'react';



function App() {

  const [data,setdata]=useState([]);
  const [images,setimage]=useState('')
  const [error,seterror]=useState('')
  const inputimage=useRef(null)

  const base=()=>{
     const reader=new FileReader();
     reader.readAsDataURL(inputimage.current.files[0]);
     reader.onload=()=>{
      console.log(reader.result)
      setimage(reader.result)
      seterror('')

     }
  }

  useEffect(()=>{
    axios.get('http://localhost:8000/getitem').then(item=>setdata(item.data)).catch(err=>console.log(err))
})

  const uploading= async()=>{
    if(images===''||images===null)
    {
      seterror("please select file and submit!!")
    }
    else{
    await axios.post('http://localhost:8000/upload',{images}).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
  })

  }
  inputimage.current.value=null;
  setimage('')
  }

  return (
    <div className="App">
    <div className='header'>
    <h1 className='inner' style={{color:"blue"}}>IMAGE GALLERY</h1>
     <div className='inner' ><input type="file" onChange={base} ref={inputimage} style={{marginLeft:'100px'}} name='images'/></div>
      <div className='inner'><button  onClick={uploading}>upload</button></div>
      {
        error?(<div className='inner' style={{color:'red'}}>{error}</div>):(null)
      }

    </div>
    <div className='output'>
    {
    data.map(item=>{
      return(
          <img className='outputitem' src={item.images} alt="image" />
      )
    })
    }
    </div>

    </div>
  );
}

export default App;
