import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Card } from 'react-native-paper';
import { Pet } from '../service/api/models/pet';

interface AdoptItemProps {
  item: Pet;
}

const AdoptItem: React.FC<AdoptItemProps> = props => {
  const navigation = useNavigation();

  const { item } = props;

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  return (
    <Card
      onPress={() => {
        to('');
      }}
    >
      <Card.Title title={item.name} subtitle={item.temper} />
      <Card.Cover
        source={{
          uri: 'https://picsum.photos/700',
        }}
      />
    </Card>
  );
};

export default AdoptItem;