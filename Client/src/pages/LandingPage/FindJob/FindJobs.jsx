import {useEffect, useState} from 'react'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Checks from './components/Checks'
import Button from '../../../utility/button'
import { main, container } from '../style/style'
import { RiArrowDownSLine } from 'react-icons/ri'
import { MdLocationOn } from 'react-icons/md'
import { filtersearch, close, SearchIcon } from '../../../data/assets'
import serverApi from "../../../utility/server";

const FindJobs = () => {
    const [selected, setSelected] = useState('Design');
    const [active, setActive] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [searchTitle, setSearchTitle] =  useState("");
    const [togggle, setTogggle] = useState(false);
    const [box1, setBox1] = useState(false);
  
    const [ jobData,setJobData ] = useState([]);
    const [ searchLocation, setSearchLocation] = useState("")
    // const [, setJobMetrics] = useState({"total": 0,
    //   "views": 0})
      
    const handleActive = () =>{
      setActive(!active)
    }

    const Options = [
      {
        id: 1,
        name:'Product Design'
      }, 
      {
        id:2,
        name:'Graphics Design'
      }, 
      {
        id:3,
        name:'UX Design', 
      }, 
      {
        id:4,
        name:'Interior Design',
      }, 
      {
        id:5,
        name:'Industrial Design'
      }];


      const handleBox1Change = (e) => {
        setBox1(e.currentTarget.checked)
      }


  const handleClick= async (e) => {
    e.preventDefault();
    const response = await serverApi.get(`/jobs/all`,
        {
          params: {
            title: encodeURIComponent(searchTitle),
            location: searchLocation,

            size: "5"
          }
        });
    if(response.status === 200){
      setJobData(response.data.data)
    } else {
      alert("No result found")
    }

  }
  

  useEffect(() => {

  //fetch data from first endpoint
  async function fetchFirstData(){
   await serverApi.get("/jobs/all")
   .then(res => {setJobData(res.data.data)})
   .catch(err => {console.error('error fetching data from endpoint 1', err)})
  }
  console.log(jobData)
      
    fetchFirstData()
  }, []);

  return (
    <div className={`${main.wraper}`}>
      <Header />
      <div className={`absolute shadow-sm right-0 left-4 mt-20 h-auto z-10 bg-white w-[85%] flex flex-col justify-start items-start ${togggle ? 'block' : 'hidden'} xl:hidden`}>
        <div className='flex justify-between items-center p-4 w-full'>
          <div className='flex p-2'>
            <img src={filtersearch} alt="icon" className='mr-3 w-6 h-6' />
            <p className='text-sm font-normal'>Filter By</p>
          </div>
          <img src={close} alt="close" onClick={()=> setTogggle(!togggle)} />
        </div>
        <div className=' border-b-[0.5px] m-auto w-[95%] mt-6 border-[#C2C7D6] mb-7'/>
        <div className='shadow-md rounded-lg  w-full p-2'>
          <div onClick={()=> setActive((prev) => !prev)} className='flex justify-between items-center p-2 cursor-pointer'>
            <h1 className='text-2xl'>{selected}</h1>
            <RiArrowDownSLine/>
          </div>
          <ul className={`${active ? 'block' : 'hidden'}`}>
            {Options.map((option, i) => (
              <li key={i} onClick={()=>{       
                setActive(false);
                setSelected(option.name)
                setTogggle(false)
              }} 
              className='text-sm p-3 pl-4 hover:bg-[#F0F4FE] rounded-md cursor-pointer'>
                {option.name}
              </li>
            ))}
          </ul>
        </div>
        <Checks box1={box1} handleBox1Change={handleBox1Change} />
      </div>
      <div className={`${container.containerGrid}`}>
        <div className={`${container.leftGrid}`}>
          <div onClick={()=>setToggle(!toggle)} className='flex justify-between items-center p-4 cursor-pointer'>
            <div className='flex justify-center'>
              <img src={filtersearch} alt="icon" className='mr-2 w-6 h-6' />
              <p className='text-sm font-normal'>Filter By</p>
            </div>
            <RiArrowDownSLine/>
          </div>
          <div className=' border-b-[0.5px] border-[#C2C7D6] mb-7'/>
          <div className={` ${toggle ? 'block' : 'hidden'} shadow-md rounded-lg p-2`}>                 
            <div onClick={()=> setActive(handleActive)} className='flex justify-between items-center p-2 cursor-pointer'>
              <h1 className='text-2xl'>{selected}</h1>
              <RiArrowDownSLine/>
            </div>
            <ul className={`${active ? 'block' : 'hidden'}`}>
              {Options.map((option, i) => (
              <li key={i} onClick={()=>{setActive(false); setSelected(option.name)}} className='text-sm p-3 pl-4 hover:bg-[#F0F4FE] rounded-md cursor-pointer'>
                {option.name}
              </li>
              ))}
            </ul>
          </div>
          <Checks box1={box1} handleBox1Change={handleBox1Change}  />
        </div>
        <div className={`${container.rightGrid}`}>
          <form className=' w-[95%] flex flex-col sm:flex-row justify-start md:justify-center items-centers gap-6 '>
            <div className='flex justify-start items-center border border-[#BDBDBD] sm:w-[80%] h-[54px] rounded-md bg-transparent pl-7 '>
              <img src={SearchIcon} alt="icon" className='h-5 w-5 md:hidden' />    
              <input type="text"
                     placeholder='Job title '
                     className='placeholder:italic placeholder:text-slate-400 focus:outline-none text-base w-full h-[100%] p-3 mr-2 focus:border-none focus:ring-[0] '
                     onChange={(e)=> setSearchTitle(e.target.value)}
              />
              <img 
                  src={filtersearch} alt="icon" onClick={()=> {setTogggle((prev) => !prev)}} className='xl:hidden block mr-2 w-6 h-6' />                  
            </div>
            <div className='flex justify-start items-center border border-[#BDBDBD] sm:w-[35%] h-[54px] rounded-md bg-transparent pl-5 ml-[-15px] '>
              <MdLocationOn className=' text-slate-400 h-8 w-8'/>
              <input type="text"
                     placeholder='Lagos NG'
                     className='placeholder:italic placeholder:text-slate-400 focus:outline-none text-base w-full h-[100%] p-3 mr-2 focus:border-none focus:ring-[0] '
                     onChange={(e)=> setSearchLocation(e.target.value)}
              />
            </div>
            <div>
                <Button name={'Search'} handleClick={handleClick}/>
            </div>                    
          </form>
          {jobData.length > 0 ? (
              <MainSection data={jobData} />
          ) : (
              <div className='text-center mt-8'>
                <h1 className='text-xl font-bold'>No job found</h1>
                <p className='text-gray-500 mt-2'>
                  Unfortunately, we couldn't find any matching jobs.
                </p>
              </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default FindJobs