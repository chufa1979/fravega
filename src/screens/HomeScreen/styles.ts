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
});

export default styles;
