import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Spinner } from 'reactstrap';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const renderProperties = async () => {
    try {
      setLoading(true);
      const properties = await axios.get('http://localhost:3333/properties/list'); 
      setProperties(properties.data);
      setLoading(false);
    } catch(err) {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    renderProperties();
  }, []);

  return (
    <>
      <Head>
        <title>Propriedades</title>
      </Head>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        width: '100vw',
        flexWrap: 'wrap'
      }}>
      {
        !loading ? (properties.map(property => {
          return (
            <div key={property.id}>
              <Card
                style={{
                  width: '18rem'
                }}
                key={property.id}
              >
                <CardBody>
                  <CardTitle tag="h5">
                    {property.name}
                  </CardTitle>
                  <CardSubtitle
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
        })) : (
          <Spinner />
        )
      }
      </div>
    </>
  )
}
