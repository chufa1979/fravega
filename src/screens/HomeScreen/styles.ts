import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  card: {
    marginVertical: 4,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 8,
  },
  flatListContent: {
    flexGrow: 1,  // Esto asegura que el FlatList ocupe el espacio restante.
  },
  cardContent: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  favoriteButton: {
    marginRight: 10,  // Añadir un margen a la derecha
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 24,
  },
});

export default styles;
