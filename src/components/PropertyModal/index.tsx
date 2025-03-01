import { useState } from "react";
import { Button, Card, CardBody, Collapse, List } from "reactstrap";

import Modal from "../Modal";
import Image from 'next/image';

import { formatPrice } from '../../shared/formatPrice';

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

type Props = {
  showModal: boolean;
  toggleModal: () => void;
  property: PropertyType;
};

export default function PropertyModal({
  showModal,
  toggleModal,
  property
}: Props) {
  const [showSpecific, setShowSpecific] = useState(false);

  const toggleSpecificInformations = () => {
    setShowSpecific(!showSpecific);
  };

  console.log(property.bedrooms);
  return (
    <Modal showModal={showModal} toggleModal={toggleModal} title={property.name}>
      <div>
        <Image
          style={{
            width: '100%'
          }}
          alt='Imagem da propriedade'
          // Hardcoded, deixar flexível e carrossel com múltiplas imagens
          src={`https://user-images.githubusercontent.com/60706180/188971680-2c271ee8-e104-441f-be5b-39e038732acd.png`} 
          width='200'
          height='120'
        />
        <p style={{ color: 'gray' }}>{property.description}</p>
        <Button color="primary" onClick={toggleSpecificInformations} style={{ marginBottom: '1rem' }}>
          Exibir detalhes
        </Button>
        <Collapse isOpen={showSpecific}>
          <Card>
            <CardBody>
            <List>
              {property.price ? (<li>
                Valor: {formatPrice(Number(property.price))}
              </li>) : null}
              {property.size ? (<li>
                Tamanho: {property.size}m²
              </li>) : null}
              {property.suits ? (<li>
                Suítes: {property.suits}
              </li>) : null}
              {property.bedrooms ? (<li>
                Quartos Simples: {property.bedrooms}
              </li>) : null}
              {property.bathrooms ? (<li>
                Banheiros Simples: {property.bathrooms}
              </li>) : null}
              {property.garages ? (<li>
                Garagens: {property.garages}
              </li>) : null}
              {property.views ? (<li>
                Visualizações: {property.views}
              </li>) : null}
            </List>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </Modal>
  )
}