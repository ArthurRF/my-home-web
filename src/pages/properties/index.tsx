import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg, Spinner } from 'reactstrap';
import PropertyModal from '../../components/PropertyModal';

type PropertyType = {
  address?: any;
  bathrooms?: number;
  bedrooms?: number;
  description?: string;
  enabled: boolean;
  garages?: number;
  id: string;
  name: string;
  negociation_type: number;
  price: number;
  property_images: any[];
  property_type_slug: string;
  size?: number;
  suits?: number;
  views: number;
};

export default function Properties() {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyType>()
  
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
  const selectProperty = (property: PropertyType) => {
    setSelectedProperty(property);
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
                    width: '18rem',
                    cursor: 'pointer',
                  }}
                  color='secondary'
                  key={property.id}
                  onClick={() => selectProperty(property)}
                >
                  <CardBody>
                    <CardTitle tag="h5" style={{ color: 'white' }}>
                      {property.name.length > 23 ? `${property.name.slice(0, 23)}..` : property.name}
                    </CardTitle>
                    <CardSubtitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <CardText style={{ all: 'unset' }}>{property.negociation_type}</CardText>
                      <CardText>Visto {property.views} vezes</CardText>
                    </CardSubtitle>
                  </CardBody>
                  <CardImg
                    alt="Imagem da propriedade"
                    src={`https://user-images.githubusercontent.com/60706180/188971680-2c271ee8-e104-441f-be5b-39e038732acd.png`}
                    width="100%"
                  />
                  <CardBody>
                    <CardText>
                      {property.description}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
              {selectedProperty && (<PropertyModal showModal={showModal} toggleModal={toggleModal} property={selectedProperty} />)}
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
