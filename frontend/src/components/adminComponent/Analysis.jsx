import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { host } from '../../host'
import axios from 'axios'
import io from "socket.io-client";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

// Function to count reviews with defaulting unknown values to "Neutral"
const countReviews = (data) => {
    return data.reduce((acc, curr) => {
        const reviewLabel = ["Positive", "Negative"].includes(curr.review) ? curr.review : "Neutral";
        acc[reviewLabel] = (acc[reviewLabel] || 0) + 1;
        return acc;
    }, {});
};



const ReviewCharts = () => {
    const [reviewsData, setReviewsData] = useState([])
    const reviewCounts = countReviews(reviewsData);
    const labels = Object.keys(reviewCounts);
    const dataValues = Object.values(reviewCounts);

    var socket
    const ENDPOINT = host;
    socket = io(ENDPOINT);
    socket.on("getCustomerFeedbback", (reviews) => {
        setReviewsData(reviews)});

    useEffect(() => {
        axios.get(`${host}/api/order/getFeedback`)
            .then(res => {
                socket.emit("customerFeedback", res.data.message);
            })
            .catch(error => {
                console.log(error);
            })

    }, [])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Count',
                data: dataValues,
                backgroundColor: labels.map((label) => {
                    if (label === "Positive") return 'rgba(0, 255, 0, 0.6)'; // Green for Positive
                    if (label === "Negative") return 'rgba(255, 0, 0, 0.6)'; // Red for Negative
                    // if (label === "Neutral") return 'rgba(75, 192, 192, 0.6)'; // Cyan for Neutral
                    return 'rgba(200, 200, 200, 0.6)'; // Default color for any unexpected labels
                }),
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <h2 className='flex items-center justify-center font-semibold p-5'>Customer Feedback</h2>
            <Doughnut data={data} options={chartOptions} height={400} width={600} />
        </div>
    );
};

export default ReviewCharts;
