// src/screens/HomeScreen/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { Appbar, Searchbar, Card } from 'react-native-paper';
import styles from './styles';
import { fetchUsers } from '../../services/userService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useContext } from 'react';
import { IconButton } from 'react-native-paper'; // para el ícono
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import Icon from 'react-native-vector-icons/MaterialIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserDetail'>;

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Podés implementar búsqueda más adelante
  };

  const handlePressUser = (username: string) => {
    navigation.navigate('UserDetail', { username });
  };

  const renderUser = ({ item }: any) => {
    const isFavorite = favorites.includes(item.login);

    return (
      <Card style={styles.card}
      onPress={() => handlePressUser(item.login)}>
        <Card.Title
          title={item.login}
          left={() => (
            <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
          )}
          right={() => (
            <Icon 
              name={isFavorite ? 'star' : 'star-outline'} // Define el nombre del icono
              size={24} // Tamaño del icono
              color={isFavorite ? '#FFD700' : '#000'} // Color dinámico
            />
          )}
          onPress={() => handlePressUser(item.login)} 
        />
      </Card>
    );
  };
//style={styles.card} onPress={() => handlePressUser(item.login)}
  const renderContent = () => (
    <View style={styles.content}>
      <Searchbar
        placeholder="Buscar usuarios"
        onChangeText={handleSearchChange}
        value={searchQuery}
      />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUser}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Fravega Tech" />
      </Appbar.Header>
      {renderContent()}
    </SafeAreaView>
  );
}

export default HomeScreen;
