import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    )


const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = []
    const coinTimeStamp = []
    
    for(let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in Usd',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }

    const options = {
        scales: {
            yAxes: [
                { ticks: { beginAtZero: true } }
            ]
        }
    }

    console.log('coinHistoy: ', coinHistory)
    console.log('coinName: ', coinName)
    console.log('currentPrice: ', currentPrice)

  return (
    <>
        <Row className='chart-header' style={{ marginTop: '10px' }} >
            <Typography.Title level={2} className='chart-title' >{coinName} Price Chart</Typography.Title>
            <Col className='price-container' >
                <Typography.Title level={5} className='price-change'>{coinHistory?.data?.change}%</Typography.Title>
                <Typography.Title level={5} className='current-price'>Current {coinName} Price: % {currentPrice}</Typography.Title>
            </Col>
        </Row>
        <Line data={data} options={options} />
    </>
  )
}

export default LineChart