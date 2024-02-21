import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./Statistics.css";
import Spinner from "react-bootstrap/Spinner";
import { Chart as ChartJS, ArcElement, Tooltip, Legend ,CategoryScale,
    LinearScale,
    BarElement,
    Title,} from 'chart.js';
import { Pie , Bar} from 'react-chartjs-2';
import { useState, useEffect } from "react";
const backendURL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5555";
  const options = {
    indexAxis: 'y' ,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
     
    },
  };
  
ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
    LinearScale,
    BarElement,
    Title,);

export default function Statistics() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bridges, setBridges] = useState([]);

    function getRandomColor(index, alpha = 1) {
        const hue = (index * 137.508) % 360;
        return `hsla(${hue}, 70%, 50%, ${alpha})`;
      }

    useEffect(() => {
        setLoading(true);
        axios
          .get(`${backendURL}/survey`)
          .then((response) => {
            console.log(response.data.aggregatedResponses);
            setData(response.data.aggregatedResponses);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
         
          });
          
      }, []);
      useEffect(() => {
        document.documentElement.scrollTop = 0;
        setLoading(true);
        axios
            .get(`${backendURL}/bridges`)
            .then((response) => {
                
                const sortedBridges = response.data.sort((a, b) => {
                    const ifcLinkA = a.ifcLink;
                    const ifcLinkB = b.ifcLink;
                
                    // Use localeCompare for string comparison
                    return ifcLinkA.localeCompare(ifcLinkB);
                });
                setBridges(sortedBridges);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);

            });
    }, [])



  return (
    // <>
    // </>
    <div className="d-flex flex-column">
      <Navbar />
      <div className="content d-flex flex-column">
        <h1 className="title text-center">Public Responses</h1>
    <br></br>
    
        {loading ? (
            <Spinner animation="border" variant="primary" className="mx-auto" />
          ) :  (
 <div  className="charts d-flex flex-column justify-content-between">
     <div  className="charts d-flex justify-content-between">
         <div>
                <h3>Major Concerns</h3>
                <Pie data={{
              labels: ['Pollution', 'Safety', 'Traffic'],
              datasets: data.filter((item) => item._id === "concerns" ).map(item => ({
                label: item._id + ' concerns',
                data: item.answers.map(answer => answer.count),
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(54, 162, 235, 0.2)',
                  
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                 
                ],
                borderWidth: 1,
              })),
            }} /> 
                </div>
            <div>
                <h3>Enivonmental Concerns</h3>
                <Pie data={{
              labels: ['Yes', 'No'],
              datasets: data.filter((item) => item._id === "environmental" ).map(item => ({
                label: item._id + ' concerns',
                data: item.answers.map(answer => answer.count),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
              })),
            }} /> 
                </div>
                <div >
                <h3>Have Voted for Bridge</h3>
                <Pie data={{
              labels: ['Yes', 'No'],
              datasets: data.filter((item) => item._id === "voted" ).map(item => ({
                label: item._id + ' concerns',
                data: item.answers.map(answer => answer.count),
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
              })),
            }} /> 
                </div>
     </div>
            <div className="d-flex">
                
                    <div className="bar">
                    <h3 className="text-center">Daily commute by </h3>
                    <Bar
          options={options}
          data={{
            labels: ["Transportation Modes"],
            datasets: (data.find(item => item._id === "transportation")?.answers || []).map((answer, index) => ({
                label: answer.answer,
                data: [answer.count], // Wrap count in an array to represent the data point
                borderColor: getRandomColor(index),
                backgroundColor: getRandomColor(index, 0.5),
              })) || [],
          }}
        />
                    </div>
                     <div className="bar">
                <h3  className="text-center">Most Voted Option </h3>
                <Bar
      options={options}
      data={{
        labels: ["Bridge"],
        datasets: bridges.map((bridge, index) => ({
            label: bridge.ifcLink,
            data: [bridge.reviews.length],
            borderColor: getRandomColor(index+5),
            backgroundColor: getRandomColor(index+5, 0.5),
          })) ,
      }}
    />
                </div>
            </div>
            
           
 </div> )
        }
      </div>
    <Footer />
  </div>
);
}