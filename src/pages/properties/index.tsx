import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Spinner } from 'reactstrap';
import ModalProperty from '../../components/Modal';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string>()
  
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

  const toggleModal = () => setShowModal(!showModal);
  const selectProperty = (title: string) => {
    setSelectedProperty(title);
    toggleModal();
  };

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
        flexWrap: 'wrap',
        marginTop: '10px'
      }}>
      {
        !loading ? (properties.map(property => {
          return (
            <>
              <div key={property.id}>
                <Card
                  style={{
                    width: '18rem'
                  }}
                  color='primary'
                  outline
                  key={property.id}
                  onClick={() => selectProperty(property.name)}
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
              <ModalProperty showModal={showModal} toggleModal={toggleModal} title={selectedProperty}>
                <p>ble</p>
              </ModalProperty>
            </>
          )
        })) : (
          <Spinner />
        )
      }
      </div>
    </>
  )
}
