import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Pet } from '../service/api/models/pet';

interface AdoptItemProps {
  item: Pet;
}

const AdoptItem: React.FC<AdoptItemProps> = props => {
  const navigation = useNavigation();

  const { item: pet } = props;

  function to(page: string): void {
    let m = {
      name: page,
      key: page,
    };
    navigation.navigate(m);
  }

  return (
    <Card
      style={styles.card}
      onPress={() => {
        to('');
      }}
    >
      <Card.Title
        title={pet.properties.name}
        subtitle={pet.properties.temper}
      />
      <Card.Cover
        source={{
          uri: 'https://picsum.photos/700',
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
  },
});

export default AdoptItem;
