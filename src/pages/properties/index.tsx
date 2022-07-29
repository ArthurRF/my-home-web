import axios from 'axios';
import Head from 'next/head'
import { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  
  const renderProperties = async () => {
    const properties = await axios.get('http://localhost:3333/properties/list'); 
    setProperties(properties.data);
  }
  renderProperties();

  return (
    <>
      <Head>
        <title>Propriedades</title>
      </Head>
      <div className='row'>
      {
        properties.map(property => {
          return (
            <div className='col-sm-4' key={property.id}>
              <Card
                style={{
                  width: '18rem'
                }}
                key={property.id}
                className='col-sm-4'
              >
                <CardBody>
                  <CardTitle tag="h5">
                    {property.name}
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    {property.negociation_type}
                  </CardSubtitle>
                </CardBody>
                <CardImg
                  alt="imagem"
                  src={`https://picsum.photos/318/180`}
                  width="100%"
                />
                <CardBody>
                  <CardText>
                    {property.description}
                  </CardText>
                </CardBody>
              </Card>
            </div>
          )
        })
      }
      </div>
    </>
  )
}
