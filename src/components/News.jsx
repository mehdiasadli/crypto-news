import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useState } from 'react'

import { useGetNewsQuery } from '../services/newsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Text, Title } = Typography
const { Option } = Select
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({ simplified }) => {
    const [ newsCat, setNewsCat ] = useState('Cryptocurrency')
    const { data } = useGetCryptosQuery(100)
    const { data: news } = useGetNewsQuery({ newsCategory: newsCat, count: simplified ? 6 : 19 })    
    if(!news?.value) return 'Loading ...'
    
    return (
      <Row gutter={[ 24, 24 ]} >
        { !simplified && (
          <Col span={24} >
            <Select
              showSearch
              className='select-news'
              placeholder='Select a Category'
              optionFilterProp='children'
              onChange={value => setNewsCat(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value='Cryptocurrency' >Crypto Currency</Option>
              { data?.data?.coins?.map(coin => (
                <Option value={coin?.name} >{coin?.name}</Option>
              )) }
            </Select>
          </Col>
        ) }
        { news?.value?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i} >
            <Card hoverable className='news-card' >
              <a href={news.url} target='_blank' rel='noreferrer' >
                <div className="news-image-container">
                  <Title className='news-title' level={4} >{news.name}</Title>
                  <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                </div>
                <p>
                  {news?.description > 100 ? `${news?.description.subString(0, 100)}...` : news?.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='provider' />
                    <Text className='provider-name' >{news?.provider[0]?.name}</Text>
                  </div>
                    <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        )) }
      </Row>
    )
  }
  
  export default News