import millify from "millify"
import { Typography, Row, Col, Statistic } from "antd"
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from "../services/cryptoApi"

import { CryptoCurrencies, News } from '../components'
const { Title } = Typography


const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats

  if(isFetching) return 'Loading ...'
  return (
      <>
        <Title level={2} className='heading' >Global Crypto Stats</Title>
        <Row>
            <Col span={12} >
                <Statistic title='Total Crypto Currencies' value={globalStats?.total} />
            </Col>
            <Col span={12} >
                <Statistic title='Total Exchanges' value={globalStats?.totalExchanges ? millify(globalStats?.totalExchanges) : ''} />
            </Col>
            <Col span={12} >
                <Statistic title='Total Market Cap' value={globalStats?.totalMarketCap ? millify(globalStats?.totalMarketCap) : ''} />
            </Col>
            <Col span={12} >
                <Statistic title='Total 24 Hour Volume' value={globalStats?.total24hVolume ? millify(globalStats?.total24hVolume) : ''} />
            </Col>
            <Col span={12} >
                <Statistic title='Total Markets' value={globalStats?.totalMarkets ? millify(globalStats?.totalMarkets) : ''} />
            </Col>
        </Row>
        <div className="home-heading-container">
            <Title level={2} className='home-title' >Top 10 Crypto Currencies In The World</Title>
            <Title level={3} className='show_more' >
                <Link to='/cryptocurrencies' >Show More</Link>
            </Title>
        </div>
        <CryptoCurrencies simplified />
        <div className="home-heading-container">
            <Title level={2} className='home-title' >Latest Crypto News</Title>
            <Title level={3} className='show_more' >
                <Link to='/news' >Show More</Link>
            </Title>
        </div>
        <News simplified />
      </>
  )
}

export default HomePage