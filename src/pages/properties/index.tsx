import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Spinner, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  
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

  const toggleModal = () => setModal(!modal);

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
                  onClick={toggleModal}
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
              <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
                <ModalBody>
                  bla
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={toggleModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
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
